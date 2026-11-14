# Modi di Dire

An Italian idiom a day, plus quick flashcards for the 200 most-used Italian words, designed like a page from a Renaissance notebook.

- **Oggi** (`#/`): today's idiom, with its literal translation, meaning, an example, audio, and a downloadable 1080×1350 PNG. Below it are a shortcut into today's flashcard review and the last few days' idioms.
- **Carte** (`#/carte`): spaced-repetition flashcards, ported from Italiano Flashcards. It has decks, three directions, Again / Hard / Got it grading, a streak, Italian audio, and keyboard shortcuts (Space to flip, 1 2 3 to grade). Progress stays in `localStorage` under the original `itfc.v1` key.
- **Archivio** (`#/archivio`): every idiom so far, the full set, and saved favourites, with search and theme filters. Each idiom has its own page at `#/detto/<id>`.

## Idioms

The idioms live in `src/data/idioms/`. The 59 entries in `classic.js` include extended notes: usage situations, register and origin. The rest are compact rows of `[idiom, literal, meaning, example, translation]`.

The daily order is fixed: day 1 is 1 January 2026, and the set repeats only after every idiom has been shown once. Themes are interleaved so consecutive days rarely share a theme.

```bash
npm run check:idioms   # required fields, duplicates, rotation over several years
```

## Development

```bash
npm install
npm run dev
npm run build    # static output in dist/
npm run lint
```

Fonts (Cormorant Garamond, EB Garamond, IM Fell English) are self-hosted via `@fontsource`, so the PNG export can embed them.

## Deploying

This is a plain Vite static build. On Vercel the defaults work: framework "Vite", build command `npm run build`, output directory `dist`. Routing is hash-based, so no rewrites are needed.
