// Validates the idiom collection: shape, duplicates, near-duplicates and the
// daily rotation. Run with `npm run check:idioms`.
import { IDIOMS, THEMES, getIdiomForDate, idiomIndexForDate } from '../src/data/idioms/index.js';

const errors = [];
const warn = [];

const STOP = new Set(
  'a ad al alla alle ai agli all che chi ci col con da dal dalla dei del della di e è essere fare avere il in la le lo l gli i mi ne non o per qualcuno qualcosa se si su sul sulla ti tra un una uno va un\''.split(' '),
);
const words = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, ' ')
    .replace(/[^a-z ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w));

for (const x of IDIOMS) {
  for (const field of ['idiom', 'literal', 'meaning', 'theme']) {
    if (!x[field] || typeof x[field] !== 'string') errors.push(`${x.idiom || '?'}: missing ${field}`);
  }
  if (!THEMES[x.theme]) errors.push(`${x.idiom}: unknown theme ${x.theme}`);
  if (!x.examples?.length || !x.examples[0].it || !x.examples[0].en) errors.push(`${x.idiom}: missing example`);
  if (/\s{2,}|\s[,.!?:;]/.test(x.idiom + x.meaning + x.examples[0].it)) warn.push(`${x.idiom}: odd spacing`);
  if (x.meaning.length > 260) warn.push(`${x.idiom}: long meaning (${x.meaning.length})`);
}

const seen = new Map();
for (const x of IDIOMS) {
  if (seen.has(x.id)) errors.push(`duplicate id/idiom: "${x.idiom}" vs "${seen.get(x.id).idiom}"`);
  seen.set(x.id, x);
}

// Near-duplicates: same core content words.
for (let i = 0; i < IDIOMS.length; i++) {
  const a = new Set(words(IDIOMS[i].idiom));
  for (let j = i + 1; j < IDIOMS.length; j++) {
    const b = new Set(words(IDIOMS[j].idiom));
    const inter = [...a].filter((w) => b.has(w)).length;
    const union = new Set([...a, ...b]).size;
    if (union && inter / union >= 0.6 && inter >= 2) {
      warn.push(`similar: "${IDIOMS[i].idiom}" ~ "${IDIOMS[j].idiom}"`);
    }
  }
}

// Rotation: N consecutive days must show N distinct idioms, and a date must
// always map to the same idiom.
const N = IDIOMS.length;
const start = new Date(2026, 0, 1);
const ids = new Set();
for (let d = 0; d < N; d++) {
  const date = new Date(start);
  date.setDate(start.getDate() + d);
  ids.add(getIdiomForDate(date).id);
}
if (ids.size !== N) errors.push(`rotation repeats within a cycle: ${ids.size}/${N}`);
const y = new Date(2027, 2, 28, 1, 30);
const y2 = new Date(2027, 2, 28, 23, 30);
if (idiomIndexForDate(y) !== idiomIndexForDate(y2)) errors.push('rotation changes within a day (DST?)');
for (let year = 2026; year <= 2030; year++) {
  const dates = new Set();
  for (let d = new Date(year, 0, 1); d.getFullYear() === year; d.setDate(d.getDate() + 1)) dates.add(getIdiomForDate(d).id);
  const days = (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 86400000;
  if (dates.size !== days) errors.push(`${year}: only ${dates.size} distinct idioms over ${days} days`);
}

const counts = {};
for (const x of IDIOMS) counts[x.theme] = (counts[x.theme] || 0) + 1;

console.log(`Idioms: ${N} (${IDIOMS.filter((x) => x.rich).length} with extended notes)`);
console.log('By theme:', counts);
const today = getIdiomForDate();
console.log(`Today (${new Date().toDateString()}): #${today.number} ${today.idiom}`);
if (warn.length) console.log(`\nWarnings (${warn.length}):\n  ` + warn.join('\n  '));
if (errors.length) {
  console.error(`\nErrors (${errors.length}):\n  ` + errors.join('\n  '));
  process.exit(1);
}
if (N < 366) {
  console.error('Need at least 366 idioms so no day repeats within a calendar year.');
  process.exit(1);
}
console.log('\nOK');
