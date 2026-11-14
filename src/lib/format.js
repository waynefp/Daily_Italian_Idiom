const ROMAN = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function toRoman(n) {
  let out = '';
  for (const [value, glyph] of ROMAN) {
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  }
  return out;
}

const longIt = new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const shortIt = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short' });
const dayMonthIt = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long' });
const longEn = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

export const formatLongIt = (d) => longIt.format(d);
export const formatShortIt = (d) => shortIt.format(d).replace('.', '');
export const formatDayMonthIt = (d) => dayMonthIt.format(d);
export const formatLongEn = (d) => longEn.format(d);

const pad = (n) => String(n).padStart(2, '0');
export const isoLocal = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
