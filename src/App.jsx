import { useEffect, useSyncExternalStore } from 'react';
import Today from './views/Today';
import Flashcards from './views/Flashcards';
import Archive from './views/Archive';
import IdiomDetail from './views/IdiomDetail';
import { Seal } from './components/Ornaments';
import { IconBook, IconCards, IconSun } from './components/Icons';

const subscribe = (cb) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};
const getHash = () => window.location.hash;

function parse(hash) {
  const path = hash.replace(/^#\/?/, '');
  const [head, ...rest] = path.split('/');
  if (head === 'carte') return { name: 'cards' };
  if (head === 'archivio') return { name: 'archive' };
  if (head === 'detto' && rest[0]) return { name: 'idiom', id: decodeURIComponent(rest[0]) };
  return { name: 'today' };
}

const NAV = [
  { name: 'today', href: '#/', it: 'Oggi', en: 'Today', Icon: IconSun },
  { name: 'cards', href: '#/carte', it: 'Carte', en: 'Flashcards', Icon: IconCards },
  { name: 'archive', href: '#/archivio', it: 'Archivio', en: 'Archive', Icon: IconBook },
];

const TITLES = {
  today: 'Modi di Dire · Il detto del giorno',
  cards: 'Carte · Modi di Dire',
  archive: 'Archivio · Modi di Dire',
  idiom: 'Modi di Dire',
};

export default function App() {
  const route = parse(useSyncExternalStore(subscribe, getHash, () => ''));
  const active = route.name === 'idiom' ? 'archive' : route.name;

  useEffect(() => {
    document.title = TITLES[route.name];
    window.scrollTo(0, 0);
  }, [route.name, route.id]);

  let view;
  if (route.name === 'cards') view = <Flashcards />;
  else if (route.name === 'archive') view = <Archive />;
  else if (route.name === 'idiom') view = <IdiomDetail id={route.id} />;
  else view = <Today />;

  return (
    <div className="app">
      <header className="masthead">
        <a href="#/" className="brand" aria-label="Modi di Dire — home">
          <Seal size={38} />
          <span className="brand-text">
            <span className="brand-name">Modi di Dire</span>
            <span className="brand-sub">Codice di lingua italiana</span>
          </span>
        </a>
        <nav className="topnav" aria-label="Sections">
          {NAV.map(({ name, href, it, en }) => (
            <a key={name} href={href} className={active === name ? 'on' : ''} aria-current={active === name ? 'page' : undefined}>
              {it}
              <small>{en}</small>
            </a>
          ))}
        </nav>
      </header>

      <main className="main">{view}</main>

      <footer className="colophon">
        <Seal size={22} />
        <span>
          Modi di Dire · un detto al giorno, e le parole che servono.
        </span>
      </footer>

      <nav className="tabbar" aria-label="Sections">
        {NAV.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={active === item.name ? 'on' : ''}
            aria-current={active === item.name ? 'page' : undefined}
          >
            <item.Icon />
            <span>{item.it}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
