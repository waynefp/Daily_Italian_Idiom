import { FRAMES, FRAME_BY_ID, GROUPS } from '../data/sentences/frames.js';

const KEY = 'mdd.sentences.v1';
export const PRACTICE_SIZES = { 5: 10, 10: 15, 15: 5 };

export function loadPrefs() {
  let p = {};
  try {
    p = JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    p = {};
  }
  return {
    frame: FRAME_BY_ID.has(p.frame) ? p.frame : FRAMES[0].id,
    swap: Number.isInteger(p.swap) ? p.swap : 0,
    size: PRACTICE_SIZES[p.size] ? p.size : 10,
    done: p.done || 0,
  };
}

export function savePrefs(patch) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...loadPrefs(), ...patch }));
  } catch {
    /* private mode */
  }
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** scope: 'all', a group id, or a frame id */
export function framesInScope(scope) {
  if (FRAME_BY_ID.has(scope)) return [FRAME_BY_ID.get(scope)];
  if (GROUPS.some((g) => g.id === scope)) return FRAMES.filter((f) => f.group === scope);
  return FRAMES;
}

/** Round-robin across shuffled frames so consecutive prompts use different frames. */
export function buildPractice(scope, size) {
  const frames = shuffle(framesInScope(scope));
  const pools = frames.map((f) => shuffle(f.sentences));
  const out = [];
  while (out.length < size && pools.some((p) => p.length)) {
    for (const pool of pools) {
      if (out.length >= size) break;
      if (pool.length) out.push(pool.pop());
    }
  }
  return out;
}

export const frameOf = (sentence) => FRAME_BY_ID.get(sentence.frame);
