import { THEMES, IDIOMS } from '../data/idioms';
import { toRoman, formatLongIt } from '../lib/format';
import Sketch from './Sketch';
import { Corner, Fleuron, Mirror, Rule, Seal } from './Ornaments';

const pick = (len, steps) => steps.find(([max]) => len <= max)?.[1] ?? steps[steps.length - 1][1];
// Scaled by --fit, which the exporter lowers if the copy would overflow.
const px = (n) => `calc(var(--fit, 1) * ${n}px)`;

/** The 1080×1350 page that is rendered to PNG. */
export default function SummaryCard({ ref, idiom, date }) {
  const ex = idiom.examples[0];
  const theme = THEMES[idiom.theme];
  const titleSize = pick(idiom.idiom.length, [[12, 140], [18, 124], [24, 112], [32, 98], [42, 86], [56, 74], [999, 64]]);
  const meaningSize = pick(idiom.meaning.length, [[70, 44], [120, 41], [170, 38], [999, 35]]);
  const exSize = pick(ex.it.length + ex.en.length, [[110, 40], [170, 37], [240, 34], [999, 31]]);
  const literalSize = pick(idiom.literal.length, [[40, 42], [70, 38], [999, 34]]);

  return (
    <div ref={ref} className="sc" style={{ width: 1080, height: 1350 }}>
      <div className="sc-frame" />
      <div className="sc-frame-inner" />
      <Corner className="sc-corner c-tl" />
      <Corner className="sc-corner c-tr" />
      <Corner className="sc-corner c-bl" />
      <Corner className="sc-corner c-br" />
      <Sketch theme={idiom.theme} className="sc-sketch" />

      <header className="sc-head">
        <div className="sc-brand">
          <Seal size={72} />
          <div>
            <div className="sc-wordmark">Modi di Dire</div>
            <div className="sc-caps">Un detto italiano al giorno</div>
          </div>
        </div>
        <div className="sc-meta">
          <div className="sc-caps">{date ? formatLongIt(date) : `${theme.it} · ${theme.en}`}</div>
          <div className="sc-caps sc-folio">Folio {toRoman(idiom.number)}</div>
        </div>
      </header>

      <Rule className="sc-rule" />

      <main className="sc-body">
        <div className="sc-inner">
        <div className="sc-caps sc-eyebrow">{date ? 'Il detto del giorno' : 'Dal codice'}</div>
        <h1 className="sc-title" style={{ fontSize: px(titleSize) }}>
          <span className="initial">{idiom.idiom.charAt(0)}</span>
          {idiom.idiom.slice(1)}
        </h1>

        <section className="sc-block">
          <div className="sc-caps sc-label">Letteralmente</div>
          <p className="sc-literal" style={{ fontSize: px(literalSize) }}>“{idiom.literal}”</p>
        </section>

        <section className="sc-block">
          <div className="sc-caps sc-label">Significa</div>
          <p className="sc-meaning" style={{ fontSize: px(meaningSize) }}>{idiom.meaning}</p>
        </section>

        <section className="sc-example">
          <Fleuron className="sc-fleuron" />
          <div>
            <p className="sc-ex-it" style={{ fontSize: px(exSize) }}>{ex.it}</p>
            <p className="sc-ex-en" style={{ fontSize: px(Math.round(exSize * 0.8)) }}>{ex.en}</p>
          </div>
        </section>
        </div>
      </main>

      <footer className="sc-foot">
        <Mirror className="sc-mirror">{idiom.idiom.replace(/[!?.]$/, '')}</Mirror>
        <div className="sc-caps sc-site">
          italian-idiom.vercel.app <span className="sc-dot">·</span> N. {idiom.number} di {IDIOMS.length}
        </div>
      </footer>
    </div>
  );
}
