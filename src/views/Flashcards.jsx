import { useCallback, useEffect, useState } from 'react';
import {
  DECKS,
  DIRS,
  SIZES,
  applyGrade,
  buildQueue,
  deckStats,
  liveStreak,
  loadState,
  saveState,
} from '../lib/flashcards';
import { speak, canSpeak } from '../lib/speech';
import { toRoman } from '../lib/format';
import { Corner, Fleuron, Mirror, Seal } from '../components/Ornaments';
import { IconFlame, IconSound, IconSpeaker } from '../components/Icons';

const GRADES = [
  { g: 0, label: 'Again', sub: 'missed it', cls: 'grade-again' },
  { g: 1, label: 'Hard', sub: 'got it slowly', cls: 'grade-hard' },
  { g: 2, label: 'Got it', sub: 'easy', cls: 'grade-good' },
];
const SOUND_KEY = 'mdd.cardSound';

const pickDir = (dir) => (dir === 'mix' ? (Math.random() < 0.5 ? 'it' : 'en') : dir);

function genderLabel(g) {
  if (!g) return '';
  return ` · ${g === 'm' ? 'masc.' : g === 'f' ? 'fem.' : g}`;
}

export default function Flashcards() {
  const [s, setS] = useState(loadState);
  const [session, setSession] = useState(() => {
    const st = loadState();
    const queue = buildQueue(st);
    return { queue, idx: 0, results: [], dir: pickDir(st.dir) };
  });
  const [flipped, setFlipped] = useState(false);
  const [sound, setSound] = useState(() => localStorage.getItem(SOUND_KEY) !== 'off');

  const { queue, idx, results, dir } = session;
  const card = queue[idx];
  const done = idx >= queue.length;
  const stats = deckStats(s);
  const streak = liveStreak(s);

  const say = useCallback((text) => sound && speak(text), [sound]);

  const update = (next) => {
    saveState(next);
    setS(next);
  };

  const build = (missOnly = false, base = s) => {
    const list = missOnly ? results.filter((x) => x.g === 0).map((x) => x.c) : buildQueue(base);
    setSession({ queue: list, idx: 0, results: [], dir: pickDir(base.dir) });
    setFlipped(false);
  };

  // Read the Italian aloud whenever a new Italian-side card appears.
  useEffect(() => {
    if (!card || dir !== 'it') return;
    const t = setTimeout(() => say(card.it), 250);
    return () => clearTimeout(t);
  }, [card, dir, say]);

  const flip = useCallback(() => {
    if (!card) return;
    if (!flipped) say(card.it);
    setFlipped(!flipped);
  }, [card, flipped, say]);

  const grade = useCallback(
    (g) => {
      if (!card) return;
      const next = applyGrade(s, card, g);
      saveState(next);
      setS(next);
      setFlipped(false);
      setSession({ queue, idx: idx + 1, results: [...results, { c: card, g }], dir: pickDir(next.dir) });
    },
    [card, s, queue, idx, results],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea')) return;
      if (e.key === ' ') {
        e.preventDefault();
        if (!flipped) flip();
      } else if (flipped && ['1', '2', '3'].includes(e.key)) {
        grade(Number(e.key) - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flipped, flip, grade]);

  const setDeck = (deck) => {
    const next = { ...s, deck };
    update(next);
    build(false, next);
  };
  const setDir = (d) => {
    const next = { ...s, dir: d };
    update(next);
    build(false, next);
  };
  const cycleSize = () => {
    const next = { ...s, size: SIZES[s.size] || 5 };
    update(next);
    build(false, next);
  };
  const reset = () => {
    if (!confirm('Reset all progress?')) return;
    const next = { ...s, p: {}, streak: { last: null, n: 0 } };
    update(next);
    build(false, next);
  };
  const toggleSound = () => {
    const on = !sound;
    setSound(on);
    localStorage.setItem(SOUND_KEY, on ? 'on' : 'off');
    if (!on) window.speechSynthesis?.cancel();
  };

  const progress = queue.length ? (done ? 100 : (idx / queue.length) * 100) : 0;
  const ok = results.filter((r) => r.g > 0).length;
  const misses = results.filter((r) => r.g === 0).map((r) => r.c.it);

  const front = card && (dir === 'it' ? card.it : card.en);
  const back = card && (dir === 'it' ? card.en : card.it);
  const frontSize = !card ? '' : dir === 'it' ? (card.it.length > 9 ? 'is-long' : '') : card.en.length > 14 ? 'is-xlong' : 'is-en';

  return (
    <div className="cards-page">
      <header className="cards-head">
        <div>
          <p className="caps eyebrow">Carte · Le parole più usate</p>
          <h1 className="page-title">
            Flashcards <span className="en">· high-frequency words</span>
          </h1>
        </div>
        <div className="cards-stats" aria-live="polite">
          <span className="streak" title="Days in a row">
            <IconFlame /> {streak}
          </span>
          <span>
            {stats.learned}/{stats.total} solid
          </span>
        </div>
      </header>

      <div className="chip-rows">
        <div className="chips" role="group" aria-label="Deck">
          {Object.entries(DECKS).map(([k, d]) => (
            <button key={k} className={`chip ${s.deck === k ? 'on' : ''}`} onClick={() => setDeck(k)} aria-pressed={s.deck === k}>
              {d.label}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Direction">
          {Object.entries(DIRS).map(([k, d]) => (
            <button key={k} className={`chip ${s.dir === k ? 'on' : ''}`} onClick={() => setDir(k)} aria-pressed={s.dir === k}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="ruler" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <b style={{ width: `${progress}%` }} />
      </div>

      {!done && card ? (
        <div className="stage">
          <div
            className={`flashcard ${flipped ? 'flip' : ''}`}
            onClick={(e) => !e.target.closest('.spk') && flip()}
            role="button"
            tabIndex={0}
            aria-label={flipped ? 'Card answer' : 'Flip card'}
          >
            <div className="face front folio">
              <Corner className="c-tl" />
              <Corner className="c-br" />
              <span className="tag caps">
                {idx + 1}/{queue.length} · #{card.r}
              </span>
              {dir === 'it' && canSpeak && (
                <button
                  className="spk"
                  aria-label="Hear it"
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(card.it);
                  }}
                >
                  <IconSpeaker />
                </button>
              )}
              <div className={`word ${frontSize}`} lang={dir === 'it' ? 'it' : 'en'}>
                {front}
              </div>
              <div className="hint">{dir === 'it' ? 'What does it mean?' : 'Say it in Italian'}</div>
              <Mirror className="card-mirror">{card.it}</Mirror>
            </div>
            <div className="face back folio">
              <Corner className="c-tl" />
              <Corner className="c-br" />
              <span className="tag caps">
                {idx + 1}/{queue.length} · #{card.r}
              </span>
              {canSpeak && (
                <button
                  className="spk"
                  aria-label="Hear it"
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(card.it);
                  }}
                >
                  <IconSpeaker />
                </button>
              )}
              <div className="small" lang={dir === 'it' ? 'it' : 'en'}>
                {front}
              </div>
              <div className="answer" lang={dir === 'it' ? 'en' : 'it'}>
                {back}
              </div>
              <div className="pos">
                {card.pos}
                {genderLabel(card.g)}
              </div>
              <div className="card-ex">
                <Fleuron className="card-fleuron" />
                <div className="ex-it" lang="it">{card.ex}</div>
                <div className="ex-en">{card.exen}</div>
              </div>
            </div>
          </div>

          {!flipped ? (
            <button className="btn btn-primary btn-wide" onClick={flip}>
              Show answer
            </button>
          ) : (
            <div className="grades">
              {GRADES.map((x) => (
                <button key={x.g} className={`grade ${x.cls}`} onClick={() => grade(x.g)}>
                  {x.label}
                  <small>{x.sub}</small>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="stage done folio">
          <Corner className="c-tl" />
          <Corner className="c-br" />
          <Seal size={54} className="done-seal" />
          <h2 className="done-title">Fatto!</h2>
          {results.length > 0 ? (
            <>
              <p className="done-sum">
                {ok}/{results.length} right.
              </p>
              <p className="done-miss">
                {misses.length ? `Misses: ${misses.join(', ')}. They’ll come back first next time.` : 'No misses. Bravo!'}
              </p>
            </>
          ) : (
            <p className="done-sum">Nothing to review in this deck.</p>
          )}
          <div className="row">
            <button className="btn btn-ghost" onClick={() => build()}>
              {s.size} more
            </button>
            {misses.length > 0 && (
              <button className="btn btn-primary" onClick={() => build(true)}>
                Redo misses
              </button>
            )}
          </div>
          <p className="done-note">
            <Mirror>{toRoman(ok || 1)} · bene</Mirror>
          </p>
        </div>
      )}

      <footer className="cards-foot">
        <span>{stats.due ? `${stats.due} due for review` : 'Nothing overdue'}</span>
        <span className="cards-foot-actions">
          <button onClick={cycleSize}>Cards: {s.size}</button>
          {canSpeak && (
            <button onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Mute auto-play' : 'Turn on auto-play'}>
              <IconSound off={!sound} /> {sound ? 'Sound on' : 'Sound off'}
            </button>
          )}
          <button onClick={reset}>Reset progress</button>
        </span>
      </footer>
      <p className="kbd-hint">Space to flip · 1 2 3 to grade</p>
    </div>
  );
}
