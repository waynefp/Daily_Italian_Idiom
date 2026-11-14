import { classic } from './classic.js';
import { animali, cibo } from './animali-cibo.js';
import { corpo } from './corpo.js';
import { persone, oggetti } from './persone-oggetti.js';
import { natura, parole, fortuna, proverbi } from './natura-parole-proverbi.js';

export const THEMES = {
  animali: { it: 'Animali', en: 'Animals' },
  cibo: { it: 'Cucina', en: 'Food & table' },
  corpo: { it: 'Corpo', en: 'The body' },
  natura: { it: 'Natura', en: 'Nature & sky' },
  oggetti: { it: 'Bottega', en: 'Things & tools' },
  persone: { it: 'Carattere', en: 'People & ways' },
  parole: { it: 'Parole', en: 'Speech' },
  fortuna: { it: 'Fortuna', en: 'Luck & money' },
  proverbi: { it: 'Proverbi', en: 'Proverbs' },
};

const COMPACT = { animali, cibo, corpo, persone, oggetti, natura, parole, fortuna, proverbi };

export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function fromCompact([idiom, literal, meaning, exIt, exEn], theme) {
  return { idiom, literal, meaning, examples: [{ it: exIt, en: exEn }], theme };
}

const byTheme = {};
for (const key of Object.keys(THEMES)) {
  const rich = classic.filter((c) => c.theme === key).map((c) => ({ ...c, rich: true }));
  const plain = (COMPACT[key] || []).map((row) => fromCompact(row, key));
  // Spread the richer classic entries evenly through each theme's list.
  const merged = [];
  const step = rich.length ? Math.max(1, Math.floor(plain.length / rich.length)) : Infinity;
  let r = 0;
  plain.forEach((p, i) => {
    if (r < rich.length && i % step === 0) merged.push(rich[r++]);
    merged.push(p);
  });
  while (r < rich.length) merged.push(rich[r++]);
  byTheme[key] = merged;
}

// Calendar order: weighted round-robin so consecutive days rarely share a theme
// and every theme is spread across the whole cycle.
function buildCalendar() {
  const queues = Object.entries(byTheme).map(([key, list]) => ({ key, list, used: 0 }));
  const order = [];
  let prev = null;
  const total = queues.reduce((n, q) => n + q.list.length, 0);
  while (order.length < total) {
    let best = null;
    for (const q of queues) {
      if (q.used >= q.list.length) continue;
      const remaining = (q.list.length - q.used) / q.list.length;
      const score = remaining - (q.key === prev ? 1 : 0);
      if (!best || score > best.score) best = { q, score };
    }
    order.push(best.q.list[best.q.used++]);
    prev = best.q.key;
  }
  return order;
}

export const IDIOMS = buildCalendar().map((entry, index) => ({
  ...entry,
  id: slugify(entry.idiom),
  number: index + 1,
}));

const BY_ID = new Map(IDIOMS.map((x) => [x.id, x]));
export const getIdiomById = (id) => BY_ID.get(id);

// Day 1 of the cycle. The calendar is keyed on the local date, so the idiom
// changes at the user's own midnight and is identical all day long.
const EPOCH_UTC = Date.UTC(2026, 0, 1);
const DAY_MS = 86400000;

export function dayIndex(date = new Date()) {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((utc - EPOCH_UTC) / DAY_MS);
}

export function idiomIndexForDate(date = new Date()) {
  const n = IDIOMS.length;
  return ((dayIndex(date) % n) + n) % n;
}

export function getIdiomForDate(date = new Date()) {
  return IDIOMS[idiomIndexForDate(date)];
}

export function dateForIndex(index, today = new Date()) {
  const offset = index - idiomIndexForDate(today);
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  d.setDate(d.getDate() + offset);
  return d;
}

/** Idioms already shown in the current cycle, newest first. */
export function getPastIdioms(today = new Date()) {
  const idx = idiomIndexForDate(today);
  const out = [];
  for (let i = idx; i >= 0; i--) out.push({ idiom: IDIOMS[i], date: dateForIndex(i, today) });
  return out;
}
