import { useDeferredValue, useMemo, useState } from 'react';
import { IDIOMS, THEMES, getPastIdioms } from '../data/idioms';
import { useFavorites } from '../lib/favorites';
import { formatShortIt } from '../lib/format';
import { IconSearch, IconStar } from '../components/Icons';
import Sketch from '../components/Sketch';

const fold = (t) =>
  t
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, "'")
    .toLowerCase();

const SEGMENTS = [
  { k: 'past', label: 'Passati', en: 'So far' },
  { k: 'all', label: 'Tutti', en: 'All' },
  { k: 'fav', label: 'Preferiti', en: 'Saved' },
];
const PAGE = 60;

export default function Archive() {
  const [segment, setSegment] = useState('past');
  const [theme, setTheme] = useState('');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const q = useDeferredValue(query);
  const favorites = useFavorites();
  const past = useMemo(() => getPastIdioms(new Date()), []);

  const rows = useMemo(() => {
    let list;
    if (segment === 'past') list = past;
    else if (segment === 'fav') list = IDIOMS.filter((i) => favorites.includes(i.id)).map((idiom) => ({ idiom }));
    else list = IDIOMS.map((idiom) => ({ idiom }));
    if (theme) list = list.filter(({ idiom }) => idiom.theme === theme);
    const needle = fold(q.trim());
    if (needle) {
      list = list.filter(({ idiom }) => fold(`${idiom.idiom} ${idiom.literal} ${idiom.meaning}`).includes(needle));
    }
    return list;
  }, [segment, theme, q, past, favorites]);

  const change = (fn) => (v) => {
    fn(v);
    setLimit(PAGE);
  };

  return (
    <div className="archive">
      <header className="archive-head">
        <div>
          <p className="caps eyebrow">Archivio · {IDIOMS.length} detti</p>
          <h1 className="page-title">
            Il codice <span className="en">· every idiom, one per day</span>
          </h1>
        </div>
        <label className="search">
          <IconSearch />
          <input
            type="search"
            value={query}
            onChange={(e) => change(setQuery)(e.target.value)}
            placeholder="Cerca… / search"
            aria-label="Search idioms"
          />
        </label>
      </header>

      <div className="segments" role="tablist">
        {SEGMENTS.map((sg) => (
          <button
            key={sg.k}
            role="tab"
            aria-selected={segment === sg.k}
            className={`segment ${segment === sg.k ? 'on' : ''}`}
            onClick={() => change(setSegment)(sg.k)}
          >
            {sg.label} <small>{sg.en}</small>
          </button>
        ))}
      </div>

      <div className="chips themes" role="group" aria-label="Theme">
        <button className={`chip ${!theme ? 'on' : ''}`} onClick={() => change(setTheme)('')}>
          Tutti i temi
        </button>
        {Object.entries(THEMES).map(([k, t]) => (
          <button key={k} className={`chip ${theme === k ? 'on' : ''}`} onClick={() => change(setTheme)(theme === k ? '' : k)} title={t.en}>
            {t.it}
          </button>
        ))}
      </div>

      <p className="archive-count caps">
        {rows.length} {rows.length === 1 ? 'detto' : 'detti'}
      </p>

      {rows.length ? (
        <ol className="index">
          {rows.slice(0, limit).map(({ idiom, date }) => (
            <li key={idiom.id}>
              <a href={`#/detto/${idiom.id}`} className="index-row">
                <span className="index-no">{idiom.number}</span>
                <span className="index-main">
                  <span className="index-idiom" lang="it">
                    {idiom.idiom}
                    {favorites.includes(idiom.id) && <IconStar filled />}
                  </span>
                  <span className="index-meaning">{idiom.meaning}</span>
                </span>
                <span className="index-side">
                  {date ? <span className="caps">{formatShortIt(date)}</span> : <span className="caps">{THEMES[idiom.theme].it}</span>}
                </span>
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <div className="empty">
          <Sketch theme={segment === 'fav' ? 'oggetti' : 'parole'} className="empty-sketch" />
          <p>{segment === 'fav' ? 'No saved idioms yet. Tap “Salva” on any idiom to keep it here.' : 'Nothing matches that search.'}</p>
        </div>
      )}

      {rows.length > limit && (
        <button className="btn btn-ghost btn-wide" onClick={() => setLimit(limit + PAGE * 2)}>
          Mostra altri · show more ({rows.length - limit})
        </button>
      )}
    </div>
  );
}
