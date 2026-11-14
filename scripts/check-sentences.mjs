// Renders every sentence-frame combination, lints the grammar, and compares
// the output with the reviewed snapshot. Run with --update after reviewing
// intentional changes.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { FRAMES, GROUPS, SENTENCE_COUNT } from '../src/data/sentences/frames.js';
import { def, indef, prep, that, noun, plural } from '../src/data/sentences/grammar.js';

const SNAPSHOT = new URL('./sentences.snapshot.txt', import.meta.url);
const errors = [];
const fail = (msg) => errors.push(msg);

// ———— Grammar unit checks
const cases = [
  [def(noun('caffè', 'm')), 'il caffè'],
  [def(noun('zaino', 'm')), 'lo zaino'],
  [def(noun('stesso', 'm')), 'lo stesso'],
  [def(noun('gnocco', 'm')), 'lo gnocco'],
  [def(noun('psicologo', 'm')), 'lo psicologo'],
  [def(noun('yogurt', 'm')), 'lo yogurt'],
  [def(noun('amico', 'm')), "l'amico"],
  [def(noun('hotel', 'm')), "l'hotel"],
  [def(noun('uscita', 'f')), "l'uscita"],
  [def(noun('casa', 'f')), 'la casa'],
  [def(plural('libri', 'm')), 'i libri'],
  [def(plural('amici', 'm')), 'gli amici'],
  [def(plural('studenti', 'm')), 'gli studenti'],
  [def(plural('zii', 'm')), 'gli zii'],
  [def(plural('amiche', 'f')), 'le amiche'],
  [indef(noun('amico', 'm')), 'un amico'],
  [indef(noun('amica', 'f')), "un'amica"],
  [indef(noun('studente', 'm')), 'uno studente'],
  [indef(noun('zaino', 'm')), 'uno zaino'],
  [indef(noun('casa', 'f')), 'una casa'],
  [indef(plural('cartoline', 'f')), 'delle cartoline'],
  [indef(plural('libri', 'm')), 'dei libri'],
  [indef(plural('amici', 'm')), 'degli amici'],
  [prep('di', noun('pane', 'm')), 'del pane'],
  [prep('di', noun('zucchero', 'm')), 'dello zucchero'],
  [prep('di', noun('olio', 'm')), "dell'olio"],
  [prep('a', noun('stazione', 'f')), 'alla stazione'],
  [prep('a', noun('aeroporto', 'm')), "all'aeroporto"],
  [prep('a', plural('Uffizi', 'm')), 'agli Uffizi'],
  [prep('a', plural('negozi', 'm')), 'ai negozi'],
  [prep('in', noun('borsa', 'f')), 'nella borsa'],
  [prep('in', plural('stati', 'm')), 'negli stati'],
  [prep('da', noun('medico', 'm')), 'dal medico'],
  [prep('su', plural('tavoli', 'm')), 'sui tavoli'],
  [prep('di', plural('scarpe', 'f')), 'delle scarpe'],
  [that(noun('cappello', 'm')), 'quel cappello'],
  [that(noun('specchio', 'm')), 'quello specchio'],
  [that(noun('ombrello', 'm')), "quell'ombrello"],
  [that(plural('occhiali', 'm')), 'quegli occhiali'],
  [that(plural('libri', 'm')), 'quei libri'],
];
for (const [got, want] of cases) if (got !== want) fail(`grammar: got "${got}", want "${want}"`);

// ———— Lint every sentence
const IMPURE = "(s[^aeiouàèéìòóù\\s]|z|gn|ps|pn|x|y)";
const VOWEL = '[aeiouàèéìòóùh]';
const italianRules = [
  [/\b(di|a|da|in|su) (il|lo|la|i|gli|le|l')(\s|$)/i, 'uncontracted preposition + article'],
  [/\b(di|a|da|in|su) l'/i, 'uncontracted preposition + article'],
  [new RegExp(`\\b(il|del|al|dal|nel|sul|un|i|dei|ai|dai|nei|sui|quel|quei) ${IMPURE}`, 'i'), 'needs lo/gli/uno before s+consonant, z, gn…'],
  [new RegExp(`\\b(il|del|al|dal|nel|sul|la|della|alla|dalla|nella|sulla|i|dei|ai|dai|nei|sui|una|quel|quella|quei) ${VOWEL}`, 'i'), 'needs elision or gli before a vowel'],
  [new RegExp(`\\b(gli|degli|agli|dagli|negli|sugli|quegli) (?!${IMPURE}|${VOWEL})`, 'i'), 'gli only before a vowel or s+consonant, z, gn…'],
  // "quello" alone is also a pronoun (quello rosso = the red one), so only the contracted forms are checked.
  [new RegExp(`\\b(uno|dello|allo|dallo|nello|sullo) (?!${IMPURE})\\S`, 'i'), 'lo/uno only before s+consonant, z, gn…'],
  [/\bun'[^aeiouàèéìòóùh]/i, "un' only before a vowel"],
  [/\bun [aeiou]\S*a\b/i, "feminine noun after un (un'?)"],
  [/\bDov'è (i|gli|le) /, "Dov'è with a plural"],
  [/\b(Mi|Ti) piace (i|gli|le) /, 'piace with a plural'],
  [/\bC'è (dei|degli|delle) /, "C'è with a plural"],
];
const commonRules = [
  [/\s{2,}/, 'double space'],
  [/\s[.,?!]/, 'space before punctuation'],
  [/^[^A-ZÀ-Ý]/, 'does not start with a capital'],
  [/[^.?!)]$/, 'no final punctuation'],
  [/undefined|null|NaN/, 'missing value'],
];
const englishRules = [
  [/\ba [aeiou]/i, 'a → an'],
  [/\ban [^aeiouh]/i, 'an → a'],
];

const lines = [];
const seen = new Set();
for (const g of GROUPS) {
  const frames = FRAMES.filter((f) => f.group === g.id);
  if (!frames.length) fail(`group ${g.id} has no frames`);
  for (const f of frames) {
    if (f.sentences.length < 6 || f.sentences.length > 12) fail(`${f.id}: ${f.sentences.length} swaps (want 6–12)`);
    for (const s of f.sentences) {
      const { it, en } = s.raw;
      if (seen.has(it)) fail(`duplicate sentence: ${it}`);
      seen.add(it);
      for (const [re, msg] of [...italianRules, ...commonRules]) if (re.test(it)) fail(`${s.id} IT ${msg}: ${it}`);
      for (const [re, msg] of [...englishRules, ...commonRules]) if (re.test(en)) fail(`${s.id} EN ${msg}: ${en}`);
      if (!s.it[1].trim()) fail(`${s.id}: empty slot`);
      lines.push(`${f.id.padEnd(16)} ${it}  =  ${en}`);
    }
  }
}
for (const f of FRAMES) if (!GROUPS.some((g) => g.id === f.group)) fail(`${f.id}: unknown group ${f.group}`);

const snapshot = lines.join('\n') + '\n';
if (process.argv.includes('--update')) {
  writeFileSync(SNAPSHOT, snapshot);
  console.log('Snapshot updated.');
} else if (!existsSync(SNAPSHOT)) {
  fail('missing snapshot: run with --update after reviewing the output');
} else if (readFileSync(SNAPSHOT, 'utf8') !== snapshot) {
  const old = new Set(readFileSync(SNAPSHOT, 'utf8').split('\n'));
  const changed = lines.filter((l) => !old.has(l));
  fail(`output differs from the reviewed snapshot (${changed.length} new/changed lines):\n  ${changed.slice(0, 20).join('\n  ')}`);
}

console.log(`${FRAMES.length} frames in ${GROUPS.length} groups, ${SENTENCE_COUNT} sentences`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('OK');
