import { useMemo } from 'react';
import IdiomPage from '../components/IdiomPage';
import { getIdiomForDate, getPastIdioms } from '../data/idioms';
import { loadState, deckStats, liveStreak, DECKS } from '../lib/flashcards';
import { formatShortIt } from '../lib/format';
import { IconArrow, IconCards, IconFlame } from '../components/Icons';

function ReviewPrompt() {
  const s = useMemo(() => loadState(), []);
  const stats = deckStats(s);
  const streak = liveStreak(s);
  const line = stats.due
    ? `${stats.due} ${stats.due === 1 ? 'card' : 'cards'} due for review`
    : stats.fresh
      ? `${Math.min(s.size, stats.fresh)} new words waiting`
      : 'Everything reviewed — keep it fresh';

  return (
    <a className="review-card" href="#/carte">
      <span className="review-icon">
        <IconCards />
      </span>
      <span className="review-text">
        <span className="caps">Ripasso · Carte</span>
        <span className="review-line">{line}</span>
        <span className="review-meta">
          {DECKS[s.deck].label} · {s.size} cards · about {Math.max(1, Math.round(s.size * 0.4))} min
          {streak > 0 && (
            <span className="streak">
              <IconFlame /> {streak}
            </span>
          )}
        </span>
      </span>
      <span className="review-go">
        <IconArrow />
      </span>
    </a>
  );
}

function Recent({ today }) {
  const past = getPastIdioms(today).slice(1, 5);
  if (!past.length) return null;
  return (
    <section className="recent">
      <h2 className="note-title">
        <span className="caps">Giorni passati</span>
        <a href="#/archivio" className="link-more">
          Archivio <IconArrow />
        </a>
      </h2>
      <ul>
        {past.map(({ idiom, date }) => (
          <li key={idiom.id}>
            <a href={`#/detto/${idiom.id}`}>
              <span className="recent-date caps">{formatShortIt(date)}</span>
              <span className="recent-idiom" lang="it">{idiom.idiom}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Today() {
  const today = useMemo(() => new Date(), []);
  const idiom = getIdiomForDate(today);
  return (
    <IdiomPage idiom={idiom} date={today} isToday>
      <ReviewPrompt />
      <Recent today={today} />
    </IdiomPage>
  );
}
