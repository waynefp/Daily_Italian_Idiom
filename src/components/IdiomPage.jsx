import { useRef, useState } from 'react';
import { THEMES } from '../data/idioms';
import { speak, canSpeak } from '../lib/speech';
import { toRoman, formatLongIt, formatLongEn, isoLocal } from '../lib/format';
import { exportSummaryPng } from '../lib/exportPng';
import { toggleFavorite, useFavorites } from '../lib/favorites';
import Sketch from './Sketch';
import SummaryCard from './SummaryCard';
import { Corner, Fleuron, Mirror, Rule } from './Ornaments';
import { IconDownload, IconShare, IconSpeaker, IconStar } from './Icons';

function Title({ text }) {
  const first = text.charAt(0);
  return (
    <h1 className="idiom-title" lang="it">
      <span className="initial">{first}</span>
      {text.slice(1)}
    </h1>
  );
}

function Example({ ex }) {
  return (
    <div className="example-line">
      <p className="ex-it" lang="it">{ex.it}</p>
      <p className="ex-en">{ex.en}</p>
      {ex.reply && (
        <>
          <p className="ex-it ex-reply" lang="it">{ex.reply.it}</p>
          <p className="ex-en">{ex.reply.en}</p>
        </>
      )}
    </div>
  );
}

export default function IdiomPage({ idiom, date, isToday, children, eyebrow }) {
  const favorites = useFavorites();
  const isFav = favorites.includes(idiom.id);
  const [status, setStatus] = useState('idle');
  const [shareNote, setShareNote] = useState('');
  const cardRef = useRef(null);
  const theme = THEMES[idiom.theme];
  const [first, ...more] = idiom.examples;

  const download = async () => {
    if (status === 'working') return;
    setStatus('working');
    try {
      const stamp = date ? isoLocal(date) : `n${idiom.number}`;
      const result = await exportSummaryPng(cardRef.current, `modi-di-dire_${idiom.id}_${stamp}.png`);
      setStatus(result === 'cancelled' ? 'idle' : 'done');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 2200);
  };

  const share = async () => {
    const url = `${location.origin}${location.pathname}#/detto/${idiom.id}`;
    const text = `${idiom.idiom} — ${idiom.meaning.split(/(?<=[.!?])\s/)[0]}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Modi di Dire', text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShareNote('Link copiato');
    } catch {
      return;
    }
    setTimeout(() => setShareNote(''), 2000);
  };

  const downloadLabel = {
    idle: 'Scarica PNG',
    working: 'Disegno…',
    done: 'Salvato',
    error: 'Riprova',
  }[status];

  return (
    <article className="idiom-page">
      <div className="idiom-layout">
        <section className="folio folio-main" aria-labelledby="idiom-heading">
          <Corner className="c-tl" />
          <Corner className="c-tr" />
          <Corner className="c-bl" />
          <Corner className="c-br" />

          <header className="folio-head">
            <span className="caps eyebrow">{eyebrow || (isToday ? 'Il detto del giorno' : 'Dal codice')}</span>
            <span className="caps folio-no" title={`Number ${idiom.number}`}>
              Folio {toRoman(idiom.number)}
            </span>
          </header>
          {date && (
            <p className="folio-date">
              <span lang="it">{formatLongIt(date)}</span>
              <span className="en"> · {formatLongEn(date)}</span>
            </p>
          )}

          <div id="idiom-heading">
            <Title text={idiom.idiom} />
          </div>

          <div className="say-row">
            {canSpeak && (
              <button className="listen" onClick={() => speak(idiom.idiom)} aria-label={`Listen: ${idiom.idiom}`}>
                <IconSpeaker />
                <span>Ascolta</span>
              </button>
            )}
            {idiom.pronunciation && <span className="pron">{idiom.pronunciation}</span>}
          </div>

          <Rule />

          <dl className="gloss">
            <div>
              <dt className="caps">Letteralmente</dt>
              <dd className="literal">“{idiom.literal}”</dd>
            </div>
            <div>
              <dt className="caps">Significa</dt>
              <dd className="meaning">{idiom.meaning}</dd>
            </div>
          </dl>

          <figure className="example">
            <Fleuron className="example-mark" />
            <Example ex={first} />
          </figure>

          <footer className="folio-foot">
            <Mirror>{idiom.idiom.replace(/[!?.]$/, '')}</Mirror>
            <span className="caps theme-tag">
              {theme.it} <span className="en">· {theme.en}</span>
            </span>
          </footer>
          <Sketch theme={idiom.theme} className="folio-sketch" />
        </section>

        <div className="actions">
          <button
            className={`btn btn-ghost btn-compact ${isFav ? 'is-on' : ''}`}
            onClick={() => toggleFavorite(idiom.id)}
            aria-pressed={isFav}
            aria-label={isFav ? 'Saved' : 'Save idiom'}
          >
            <IconStar filled={isFav} />
            <span>{isFav ? 'Salvato' : 'Salva'}</span>
          </button>
          <button className="btn btn-primary" onClick={download} disabled={status === 'working'}>
            <IconDownload />
            <span>{downloadLabel}</span>
          </button>
          <button className="btn btn-ghost btn-compact" onClick={share} aria-label={shareNote || 'Share'}>
            <IconShare />
            <span>{shareNote || 'Condividi'}</span>
          </button>
        </div>

        <aside className="side">
          <figure className="plate" aria-hidden="true">
            <Sketch theme={idiom.theme} className="plate-sketch" />
            <figcaption>
              <Mirror>{theme.it.toLowerCase()} · studio</Mirror>
              <span className="caps">Tav. {toRoman(idiom.number)}</span>
            </figcaption>
          </figure>

          {children}

          {(more.length > 0 || idiom.situations || idiom.origin) && (
            <div className="notes">
              {more.length > 0 && (
                <section className="note">
                  <h2 className="note-title">
                    <span className="caps">In conversazione</span>
                    <span className="en">more examples</span>
                  </h2>
                  {more.map((ex, i) => (
                    <Example key={i} ex={ex} />
                  ))}
                </section>
              )}
              {idiom.situations && (
                <section className="note">
                  <h2 className="note-title">
                    <span className="caps">Quando usarlo</span>
                    <span className="en">when to use it</span>
                  </h2>
                  <ol className="situations">
                    {idiom.situations.map((s, i) => (
                      <li key={i}>
                        <span className="num">{toRoman(i + 1).toLowerCase()}.</span> {s}
                      </li>
                    ))}
                  </ol>
                  {(idiom.register || idiom.level) && (
                    <p className="register">{[idiom.level, idiom.register].filter(Boolean).join(' · ')}</p>
                  )}
                </section>
              )}
              {idiom.origin && (
                <section className="note">
                  <h2 className="note-title">
                    <span className="caps">Origine</span>
                    <span className="en">where it comes from</span>
                  </h2>
                  <p className="origin">{idiom.origin}</p>
                </section>
              )}
            </div>
          )}
        </aside>
      </div>

      <div className="render-stage" aria-hidden="true">
        <SummaryCard ref={cardRef} idiom={idiom} date={date} />
      </div>
    </article>
  );
}
