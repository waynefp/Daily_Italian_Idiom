import IdiomPage from '../components/IdiomPage';
import { getIdiomById, idiomIndexForDate, dateForIndex, IDIOMS } from '../data/idioms';
import { formatDayMonthIt } from '../lib/format';
import { IconBack } from '../components/Icons';

export default function IdiomDetail({ id }) {
  const idiom = getIdiomById(id);
  if (!idiom) {
    return (
      <div className="empty folio">
        <p className="caps">Detto non trovato</p>
        <a className="btn btn-ghost" href="#/archivio">
          Archivio
        </a>
      </div>
    );
  }
  const now = new Date();
  const index = idiom.number - 1;
  const todayIndex = idiomIndexForDate(now);
  const date = index <= todayIndex ? dateForIndex(index, now) : null;
  const isToday = index === todayIndex;
  const eyebrow = isToday
    ? 'Il detto del giorno'
    : date
      ? `Detto del ${formatDayMonthIt(date)}`
      : `N. ${idiom.number} di ${IDIOMS.length}`;

  return (
    <>
      <a className="back-link" href="#/archivio">
        <IconBack /> Archivio
      </a>
      <IdiomPage key={idiom.id} idiom={idiom} date={date} isToday={isToday} eyebrow={eyebrow} />
    </>
  );
}
