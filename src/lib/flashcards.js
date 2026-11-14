// Spaced-repetition logic ported from the standalone Italiano Flashcards app.
// State shape and storage key are unchanged so progress stays compatible.
import CARDS from '../data/cards.json';

export { CARDS };

export const STORAGE_KEY = 'itfc.v1';
const DAY = 864e5;
export const today = () => Math.floor(Date.now() / DAY);
export const INTERVALS = [0, 1, 3, 7, 14, 30, 60];

export const DECKS = {
  focus: { label: 'Key 8', f: (c) => c.l === 'A' && !c.cog },
  a: { label: 'Top 100', f: (c) => c.l === 'A' },
  b: { label: '101–200', f: (c) => c.l === 'B' },
  new: { label: 'Non-cognates', f: (c) => !c.cog },
  all: { label: 'All 200', f: () => true },
};

export const DIRS = { it: 'Italian → English', en: 'English → Italian', mix: 'Mixed' };
export const SIZES = { 5: 10, 10: 20, 20: 5 };

export function loadState() {
  let s = {};
  try {
    s = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    s = {};
  }
  s.p = s.p || {};
  s.deck = DECKS[s.deck] ? s.deck : 'focus';
  s.dir = DIRS[s.dir] ? s.dir : 'it';
  s.size = s.size || 5;
  s.streak = s.streak || { last: null, n: 0 };
  return s;
}

export function saveState(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore quota / private mode */
  }
}

export const cardState = (s, c) => s.p[c.r] || { box: 0, due: 0, seen: 0, miss: 0 };

export function deckPool(s) {
  return CARDS.filter(DECKS[s.deck].f);
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Due cards first, then unseen cards in frequency order, then the soonest-due. */
export function buildQueue(s) {
  const pool = deckPool(s);
  const t = today();
  const st = (c) => cardState(s, c);
  const due = pool
    .filter((c) => st(c).seen && st(c).due <= t)
    .sort((a, b) => st(a).due - st(b).due || st(a).box - st(b).box);
  const fresh = pool.filter((c) => !st(c).seen).sort((a, b) => a.r - b.r);
  const later = pool.filter((c) => st(c).seen && st(c).due > t).sort((a, b) => st(a).due - st(b).due);
  return shuffle([...due, ...fresh, ...later].slice(0, s.size));
}

/** grade: 0 = again, 1 = hard, 2 = got it. Returns a new state object. */
export function applyGrade(s, card, grade) {
  const st = { ...cardState(s, card) };
  st.seen++;
  if (grade === 0) {
    st.box = 0;
    st.miss++;
    st.due = today();
  } else if (grade === 1) {
    st.box = Math.max(1, st.box);
    st.due = today() + INTERVALS[st.box];
  } else {
    st.box = Math.min(INTERVALS.length - 1, st.box + 1);
    st.due = today() + INTERVALS[st.box];
  }
  const t = today();
  let streak = s.streak;
  if (streak.last !== t) streak = { n: streak.last === t - 1 ? streak.n + 1 : 1, last: t };
  return { ...s, p: { ...s.p, [card.r]: st }, streak };
}

export function deckStats(s) {
  const pool = deckPool(s);
  const t = today();
  return {
    total: pool.length,
    learned: pool.filter((c) => cardState(s, c).box >= 3).length,
    due: pool.filter((c) => cardState(s, c).seen && cardState(s, c).due <= t).length,
    fresh: pool.filter((c) => !cardState(s, c).seen).length,
  };
}

/** The streak only counts if the last session was today or yesterday. */
export function liveStreak(s) {
  const t = today();
  return s.streak.last === t || s.streak.last === t - 1 ? s.streak.n : 0;
}
