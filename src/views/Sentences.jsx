import { useCallback, useEffect, useRef, useState } from 'react';
import { FRAMES, FRAME_BY_ID, GROUPS, SENTENCE_COUNT } from '../data/sentences/frames';
import { PRACTICE_SIZES, buildPractice, frameOf, loadPrefs, savePrefs } from '../lib/sentences';
import { speak, canSpeak, getAutoSpeak, setAutoSpeak } from '../lib/speech';
import { toRoman } from '../lib/format';
import { Corner, Fleuron, Mirror, Seal } from '../components/Ornaments';
import { IconChevron, IconShuffle, IconSound, IconSpeaker } from '../components/Icons';

const GROUP_BY_ID = new Map(GROUPS.map((g) => [g.id, g]));

/** Renders [before, slot, after] with the slot marked. */
function Line({ parts, lang, className = '', onSlot }) {
  const [a, slot, b] = parts;
  if (!a && !b) {
    return (
      <span className={className} lang={lang}>
        {slot}
      </span>
    );
  }
  return (
    <span className={className} lang={lang}>
      {a}
      {onSlot ? (
        // A real <button> is always laid out as inline-block, which strands the
        // following punctuation on its own line; this keeps the sentence flowing.
        <span
          className="slot slot-tap"
          role="button"
          tabIndex={0}
          onClick={onSlot}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSlot();
            }
          }}
          aria-label={`${slot}: next word`}
        >
          {slot}
        </span>
      ) : (
        <span className="slot">{slot}</span>
      )}
      {b}
    </span>
  );
}

/** A frame pattern with its ___ drawn as a ruled blank. */
function Pattern({ text }) {
  return text.split('___').map((part, i) => (
    <span key={i}>
      {i > 0 && <span className="blank" role="img" aria-label="blank" />}
      {part}
    </span>
  ));
}

/** Horizontal swipe → callback(+1 | -1); leaves vertical scrolling alone. */
function useSwipe(onSwipe) {
  const start = useRef(null);
  const swiped = useRef(false);
  return {
    onClickCapture: (e) => {
      if (swiped.current) {
        swiped.current = false;
        e.stopPropagation();
      }
    },
    onPointerDown: (e) => {
      swiped.current = false;
      start.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: (e) => {
      if (!start.current) return;
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      start.current = null;
      swiped.current = Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4;
      if (swiped.current) onSwipe(dx < 0 ? 1 : -1);
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}

function SoundToggle({ sound, setSound }) {
  if (!canSpeak) return null;
  return (
    <button
      onClick={() => {
        setSound(!sound);
        setAutoSpeak(!sound);
      }}
      aria-pressed={sound}
      aria-label={sound ? 'Mute auto-play' : 'Turn on auto-play'}
    >
      <IconSound off={!sound} /> {sound ? 'Sound on' : 'Sound off'}
    </button>
  );
}

export default function Sentences({ mode = 'frames', scope }) {
  const [sound, setSound] = useState(getAutoSpeak);
  return (
    <div className="sentences-page">
      <header className="sentences-head">
        <div>
          <p className="caps eyebrow">Frasi · Schemi per parlare</p>
          <h1 className="page-title">
            Sentences <span className="en">· swap a word, say it whole</span>
          </h1>
        </div>
        <nav className="seg" aria-label="Mode">
          <a href="#/frasi" className={mode === 'frames' ? 'on' : ''} aria-current={mode === 'frames' ? 'page' : undefined}>
            Schemi
            <small>Frames</small>
          </a>
          <a
            href="#/frasi/pratica"
            className={mode === 'practice' ? 'on' : ''}
            aria-current={mode === 'practice' ? 'page' : undefined}
          >
            Pratica
            <small>Practice</small>
          </a>
        </nav>
      </header>
      {mode === 'practice' ? (
        <Practice key={scope || 'all'} initialScope={scope || 'all'} sound={sound} setSound={setSound} />
      ) : (
        <Frames sound={sound} setSound={setSound} />
      )}
    </div>
  );
}

// ———————————————————————————————— Frames (explore)

function Frames({ sound, setSound }) {
  const [{ frameId, swap }, setSel] = useState(() => {
    const p = loadPrefs();
    return { frameId: p.frame, swap: p.swap };
  });
  const frame = FRAME_BY_ID.get(frameId);
  const n = frame.sentences.length;
  const idx = ((swap % n) + n) % n;
  const sentence = frame.sentences[idx];
  const group = GROUP_BY_ID.get(frame.group);
  const groupFrames = FRAMES.filter((f) => f.group === frame.group);
  const cardRef = useRef(null);

  const select = useCallback((id, s = 0, { scroll = false } = {}) => {
    setSel({ frameId: id, swap: s });
    savePrefs({ frame: id, swap: s });
    if (scroll && cardRef.current && cardRef.current.getBoundingClientRect().top < 0) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const go = useCallback(
    (step) => {
      const next = (idx + step + n) % n;
      select(frame.id, next);
      if (sound) speak(frame.sentences[next].text);
    },
    [idx, n, frame, select, sound],
  );

  const pick = (i) => {
    select(frame.id, i);
    if (sound) speak(frame.sentences[i].text);
  };

  const swipe = useSwipe(go);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea')) return;
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const frameIndex = groupFrames.indexOf(frame);

  return (
    <>
      <div className="chip-rows">
        <div className="chips" role="group" aria-label="Situation">
          {GROUPS.map((g) => {
            const on = g.id === frame.group;
            return (
              <button
                key={g.id}
                className={`chip ${on ? 'on' : ''}`}
                aria-pressed={on}
                onClick={() => !on && select(FRAMES.find((f) => f.group === g.id).id)}
              >
                {g.en}
              </button>
            );
          })}
        </div>
      </div>

      <div className="frames-layout">
        <section className="frame-col" ref={cardRef}>
          <article className="frame-card folio" {...swipe}>
            <Corner className="c-tl" />
            <Corner className="c-br" />
            <div className="frame-top">
              <span className="caps frame-group">
                {group.it} · <span className="en">{group.en}</span>
              </span>
              <span className="caps frame-no">
                {toRoman(frameIndex + 1)} / {toRoman(groupFrames.length)}
              </span>
            </div>

            <p className="frame-pattern" lang="it">
              <Pattern text={frame.pattern.it} />
            </p>
            <p className="frame-pattern-en">
              <Pattern text={frame.pattern.en} />
            </p>

            <div className="frame-sentence" aria-live="polite">
              <Line parts={sentence.it} lang="it" className="frame-it" onSlot={() => go(1)} />
              <Line parts={sentence.en} lang="en" className="frame-en" />
            </div>

            <div className="frame-controls">
              <button className="round" onClick={() => go(-1)} aria-label="Previous word">
                <IconChevron dir="left" />
              </button>
              <span className="frame-count">
                {idx + 1} <i>of</i> {n}
              </span>
              <button className="round" onClick={() => go(1)} aria-label="Next word">
                <IconChevron dir="right" />
              </button>
              {canSpeak && (
                <button className="round round-say" onClick={() => speak(sentence.text)} aria-label="Hear the sentence">
                  <IconSpeaker />
                </button>
              )}
            </div>

            {frame.tip && (
              <p className="frame-tip">
                <Fleuron className="frame-tip-fleuron" />
                {frame.tip}
              </p>
            )}
          </article>

          <div className="swaps">
            <p className="caps swaps-label">
              Cambia la parola <span className="en">· tap, swipe or use the arrows</span>
            </p>
            <div className="swap-list" role="group" aria-label="Swap word">
              {frame.sentences.map((s, i) => (
                <button key={s.id} className={`swap ${i === idx ? 'on' : ''}`} aria-pressed={i === idx} onClick={() => pick(i)} lang="it">
                  {s.it[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="frame-actions">
            <a className="btn btn-ghost" href={`#/frasi/pratica/${frame.id}`}>
              Practise this frame
            </a>
            <a className="btn btn-primary" href="#/frasi/pratica">
              <IconShuffle /> Shuffle all
            </a>
          </div>
        </section>

        <section className="frame-index" aria-label={`${group.en} frames`}>
          <h2 className="note-title">
            <span className="caps">{group.it}</span>
            <span className="en">{groupFrames.length} frames</span>
          </h2>
          <ol>
            {groupFrames.map((f, i) => (
              <li key={f.id}>
                <button
                  className={f.id === frame.id ? 'on' : ''}
                  aria-current={f.id === frame.id ? 'true' : undefined}
                  onClick={() => select(f.id, 0, { scroll: true })}
                >
                  <span className="fi-num">{toRoman(i + 1)}</span>
                  <span className="fi-it" lang="it">
                    <Pattern text={f.pattern.it} />
                  </span>
                  <span className="fi-en">
                    <Pattern text={f.pattern.en} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <footer className="cards-foot">
        <span>
          {FRAMES.length} frames · {SENTENCE_COUNT} sentences
        </span>
        <span className="cards-foot-actions">
          <SoundToggle sound={sound} setSound={setSound} />
        </span>
      </footer>
      <p className="kbd-hint">← → to swap the word</p>
    </>
  );
}

// ———————————————————————————————— Practice

function Practice({ initialScope, sound, setSound }) {
  const [size, setSize] = useState(() => loadPrefs().size);
  const [scope, setScope] = useState(initialScope);
  const [session, setSession] = useState(() => ({ queue: buildPractice(initialScope, loadPrefs().size), idx: 0, results: [] }));
  const [revealed, setRevealed] = useState(false);
  const [showFrame, setShowFrame] = useState(false);

  const { queue, idx, results } = session;
  const item = queue[idx];
  const done = idx >= queue.length;
  const frame = item && frameOf(item);
  const scopedFrame = FRAME_BY_ID.get(scope);
  const launchFrame = FRAME_BY_ID.get(initialScope);

  const start = (nextScope = scope, nextSize = size, list) => {
    setSession({ queue: list || buildPractice(nextScope, nextSize), idx: 0, results: [] });
    setRevealed(false);
    setShowFrame(false);
  };

  const reveal = useCallback(() => {
    if (!item || revealed) return;
    setRevealed(true);
    if (sound) speak(item.text);
  }, [item, revealed, sound]);

  const grade = useCallback(
    (ok) => {
      if (!item) return;
      setRevealed(false);
      setShowFrame(false);
      setSession({ queue, idx: idx + 1, results: [...results, { s: item, ok }] });
      if (idx + 1 >= queue.length) savePrefs({ done: loadPrefs().done + 1 });
    },
    [item, queue, idx, results],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea')) return;
      if (e.key === ' ') {
        e.preventDefault();
        reveal();
      } else if (revealed && (e.key === '1' || e.key === '2')) {
        grade(e.key === '2');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reveal, revealed, grade]);

  const pickScope = (s) => {
    setScope(s);
    start(s);
  };
  const cycleSize = () => {
    const next = PRACTICE_SIZES[size];
    setSize(next);
    savePrefs({ size: next });
    start(scope, next);
  };

  const progress = queue.length ? (done ? 100 : (idx / queue.length) * 100) : 0;
  const right = results.filter((r) => r.ok).length;
  const misses = results.filter((r) => !r.ok).map((r) => r.s);

  return (
    <>
      <div className="chip-rows">
        <div className="chips" role="group" aria-label="Practice set">
          <button className={`chip ${scope === 'all' ? 'on' : ''}`} aria-pressed={scope === 'all'} onClick={() => pickScope('all')}>
            <IconShuffle /> All frames
          </button>
          {launchFrame && (
            <button
              className={`chip ${scope === launchFrame.id ? 'on' : ''}`}
              aria-pressed={scope === launchFrame.id}
              onClick={() => pickScope(launchFrame.id)}
              lang="it"
            >
              <Pattern text={launchFrame.pattern.it.split(' · ')[0]} />
            </button>
          )}
          {GROUPS.map((g) => (
            <button key={g.id} className={`chip ${scope === g.id ? 'on' : ''}`} aria-pressed={scope === g.id} onClick={() => pickScope(g.id)}>
              {g.en}
            </button>
          ))}
        </div>
      </div>

      <div className="ruler" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <b style={{ width: `${progress}%` }} />
      </div>

      {!done && item ? (
        <div className="stage">
          <div
            className={`flashcard sentence-card ${revealed ? 'flip' : ''}`}
            onClick={(e) => !e.target.closest('button') && reveal()}
            role="button"
            tabIndex={0}
            aria-label={revealed ? 'Answer' : 'Reveal the Italian'}
          >
            <div className="face front folio">
              <Corner className="c-tl" />
              <Corner className="c-br" />
              <span className="tag caps">
                {idx + 1}/{queue.length} · {GROUP_BY_ID.get(frame.group).en}
              </span>
              <div className="prompt-en" lang="en">
                {item.english}
              </div>
              <div className="hint">Say it in Italian</div>
              <button
                className={`frame-hint ${showFrame ? 'on' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFrame(true);
                }}
                aria-label="Show the frame as a hint"
              >
                {showFrame ? (
                  <span lang="it">
                    <Pattern text={frame.pattern.it} />
                  </span>
                ) : (
                  <>
                    Hint <i>· show the frame</i>
                  </>
                )}
              </button>
            </div>
            <div className="face back folio">
              <Corner className="c-tl" />
              <Corner className="c-br" />
              <span className="tag caps">
                {idx + 1}/{queue.length} · {GROUP_BY_ID.get(frame.group).en}
              </span>
              {canSpeak && (
                <button className="spk" aria-label="Hear it" onClick={() => speak(item.text)}>
                  <IconSpeaker />
                </button>
              )}
              <div className="small" lang="en">
                {item.english}
              </div>
              <Line parts={item.it} lang="it" className="answer-it" />
              <div className="pos" lang="it">
                <Pattern text={frame.pattern.it} />
              </div>
              {frame.tip && (
                <div className="card-ex">
                  <Fleuron className="card-fleuron" />
                  <div className="ex-en">{frame.tip}</div>
                </div>
              )}
            </div>
          </div>

          {!revealed ? (
            <button className="btn btn-primary btn-wide" onClick={reveal}>
              Show Italian
            </button>
          ) : (
            <div className="grades grades-2">
              <button className="grade grade-again" onClick={() => grade(false)}>
                Again
                <small>missed it</small>
              </button>
              <button className="grade grade-good" onClick={() => grade(true)}>
                Got it
                <small>said it right</small>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="stage done folio">
          <Corner className="c-tl" />
          <Corner className="c-br" />
          <Seal size={54} className="done-seal" />
          <h2 className="done-title">Fatto!</h2>
          <p className="done-sum">
            {right}/{results.length} said right.
          </p>
          {misses.length > 0 ? (
            <ul className="done-list">
              {misses.map((s) => (
                <li key={s.id}>
                  <Line parts={s.it} lang="it" className="dl-it" />
                  <span className="dl-en">{s.english}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="done-miss">No misses. Bravissimo!</p>
          )}
          <div className="row">
            <button className="btn btn-ghost" onClick={() => start()}>
              <IconShuffle /> {size} more
            </button>
            {misses.length > 0 && (
              <button className="btn btn-primary" onClick={() => start(scope, size, misses)}>
                Redo misses
              </button>
            )}
          </div>
          <p className="done-note">
            <Mirror>{toRoman(right || 1)} · bene</Mirror>
          </p>
        </div>
      )}

      <footer className="cards-foot">
        <span>{scopedFrame ? `Frame: ${scopedFrame.sentences.length} sentences` : 'Shuffled across frames'}</span>
        <span className="cards-foot-actions">
          <button onClick={cycleSize}>Sentences: {size}</button>
          <SoundToggle sound={sound} setSound={setSound} />
        </span>
      </footer>
      <p className="kbd-hint">Space to reveal · 1 again · 2 got it</p>
    </>
  );
}
