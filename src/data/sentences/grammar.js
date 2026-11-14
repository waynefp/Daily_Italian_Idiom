// Minimal Italian noun-phrase grammar for the sentence frames: articles,
// elision, s-impura, articulated prepositions, demonstratives and agreement.
// Everything works on the first word of the phrase, so "il mio zaino",
// "un'altra birra" and "lo stesso" come out right.

const VOWEL = /^[aeiouàèéìòóùh]/i;
// lo / gli / uno: s + consonant, z, gn, ps, pn, x, y, i + vowel
const IMPURE = /^(s[^aeiouàèéìòóù]|z|gn|ps|pn|x|y|i[aeiou])/i;

const join = (art, word) => (art.endsWith("'") ? art + word : `${art} ${word}`);

/** A noun phrase. g: 'm' | 'f'. Options: pl, en, enA/enThe overrides, mass. */
export const noun = (it, g, en, opts = {}) => ({ it, g, pl: false, en, ...opts });
export const plural = (it, g, en, opts = {}) => noun(it, g, en, { ...opts, pl: true });

export function defArticle({ it, g, pl }) {
  const vowel = VOWEL.test(it);
  if (pl) return g === 'f' ? 'le' : vowel || IMPURE.test(it) ? 'gli' : 'i';
  if (vowel) return "l'";
  if (g === 'f') return 'la';
  return IMPURE.test(it) ? 'lo' : 'il';
}

/** il caffè, lo zaino, l'uscita, gli Uffizi, le chiavi */
export const def = (n) => join(defArticle(n), n.it);

/** un caffè, uno zaino, un'acqua, una birra; plural → partitive (dei, degli, delle) */
export function indef(n) {
  if (n.pl) return di(n);
  if (n.g === 'f') return join(VOWEL.test(n.it) ? "un'" : 'una', n.it);
  return join(IMPURE.test(n.it) ? 'uno' : 'un', n.it);
}

const PREP_BASE = { di: 'de', a: 'a', da: 'da', in: 'ne', su: 'su' };
const PREP_TAIL = { il: 'l', lo: 'llo', "l'": "ll'", la: 'lla', i: 'i', gli: 'gli', le: 'lle' };

/** Articulated preposition + phrase: di+il → del, a+l' → all', in+gli → negli */
export function prep(p, n) {
  return join(PREP_BASE[p] + PREP_TAIL[defArticle(n)], n.it);
}

export const di = (n) => prep('di', n);

/**
 * Place phrase for "going to" and "being at", which share prepositions in
 * Italian. loc: 'a' (a casa, a Roma), 'in' (in centro, in farmacia),
 * 'da' (dal medico); default is a + article (alla stazione, all'aeroporto).
 */
export function place(n) {
  if (n.loc === 'a') return `a ${n.it}`;
  if (n.loc === 'in') return `in ${n.it}`;
  if (n.loc === 'da') return prep('da', n);
  return prep('a', n);
}

const THAT = { il: 'quel', lo: 'quello', "l'": "quell'", la: 'quella', i: 'quei', gli: 'quegli', le: 'quelle' };
/** quel cappello, quell'ombrello, quegli occhiali */
export const that = (n) => join(THAT[defArticle(n)], n.it);
/** questo libro, questa borsa, questi, queste scarpe */
export const thisOne = (n) => `${agree('questo', n)} ${n.it}`;

/** Agree an adjective given in the masculine singular (-o or -e). */
export function agree(adj, { g, pl }) {
  if (adj.endsWith('o')) return adj.slice(0, -1) + (g === 'f' ? (pl ? 'e' : 'a') : pl ? 'i' : 'o');
  if (adj.endsWith('e')) return adj.slice(0, -1) + (pl ? 'i' : 'e');
  return adj;
}

/** English article helpers */
const AN = /^(?!eu|uni|use|one)[aeiou]|^hour/i;
export const enA = (n) => n.enA ?? (n.mass || n.pl ? n.en : `${AN.test(n.en) ? 'an' : 'a'} ${n.en}`);
export const enThe = (n) => n.enThe ?? `the ${n.en}`;
