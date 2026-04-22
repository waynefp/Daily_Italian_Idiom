import { P } from '../data/palette';

export default function SummaryCard({ idiom: T }) {
  return (
    <div
      id="summary-card"
      style={{
        width: 1080,
        height: 1350,
        background: P.bg,
        color: P.ink,
        fontFamily: P.sans,
        padding: 64,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 10, background: P.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: P.serif, fontWeight: 700, fontSize: 24, fontStyle: 'italic',
            }}
          >
            I
          </div>
          <div>
            <div style={{ fontFamily: P.serif, fontSize: 22, fontWeight: 600, lineHeight: 1 }}>Modi di Dire</div>
            <div style={{ fontFamily: P.mono, fontSize: 12, color: P.mute, letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 4 }}>
              One Italian idiom, every day.
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: P.mono, fontSize: 12, color: P.mute, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            {T.dateShort}
          </div>
          <div style={{ fontFamily: P.mono, fontSize: 11, color: P.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 4, fontWeight: 600 }}>
            Day {T.dayNumber} / 365
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: P.card, border: `1px solid ${P.line}`, borderRadius: 24, padding: 40, marginBottom: 20 }}>
        <div style={{ fontFamily: P.mono, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: P.mute, marginBottom: 18 }}>
          Today's Italian idiom
        </div>
        <div
          style={{
            fontFamily: P.serif, fontWeight: 500, fontSize: 140, lineHeight: 0.95,
            letterSpacing: -4, fontStyle: 'italic', margin: 0,
          }}
        >
          {(() => {
            const words = T.idiom.replace(/[!?.]$/, '').split(' ');
            const punct = T.idiom.match(/[!?.]$/)?.[0] || '';
            const last = words.pop();
            return <>{words.join(' ')}{words.length ? ' ' : ''}<span style={{ color: P.accent }}>{last}</span>{punct}</>;
          })()}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 18 }}>
          <span style={{ fontFamily: P.mono, fontSize: 16, color: P.mute }}>{T.pronunciation}</span>
          <span style={{ width: 4, height: 4, borderRadius: 4, background: P.mute, opacity: 0.5 }} />
          <span style={{ fontFamily: P.mono, fontSize: 14, color: P.mute, letterSpacing: 0.8 }}>{T.syllables}</span>
        </div>
      </div>

      {/* Meaning row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        <div style={{ padding: 26, background: P.card, border: `1px solid ${P.line}`, borderRadius: 18 }}>
          <div style={{ fontFamily: P.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: P.mute, marginBottom: 10 }}>
            Literal
          </div>
          <div style={{ fontFamily: P.serif, fontSize: 26, fontStyle: 'italic', lineHeight: 1.25, color: P.ink }}>
            {T.literal}
          </div>
        </div>
        <div style={{ padding: 26, background: P.accent, color: '#FBF4E2', borderRadius: 18 }}>
          <div style={{ fontFamily: P.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', opacity: 0.8, marginBottom: 10 }}>
            Actually means
          </div>
          <div style={{ fontFamily: P.serif, fontSize: 26, lineHeight: 1.25 }}>
            {T.actual.split('.')[0]}.
          </div>
        </div>
      </div>

      {/* Examples */}
      <div style={{ flex: 1, background: P.card, border: `1px solid ${P.line}`, borderRadius: 18, padding: 28, marginBottom: 20 }}>
        <div style={{ fontFamily: P.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: P.accent, marginBottom: 14, fontWeight: 600 }}>
          In conversation
        </div>
        {T.examples.slice(0, 2).map((ex, i) => (
          <div
            key={i}
            style={{
              marginBottom: i === 0 ? 16 : 0,
              paddingBottom: i === 0 ? 16 : 0,
              borderBottom: i === 0 ? `1px dashed ${P.line}` : 'none',
            }}
          >
            <div style={{ fontFamily: P.serif, fontSize: 22, fontStyle: 'italic', lineHeight: 1.3, color: P.ink }}>
              {ex.it}
            </div>
            <div style={{ fontFamily: P.sans, fontSize: 14, color: P.mute, marginTop: 4 }}>{ex.en}</div>
            {ex.reply && (
              <>
                <div style={{ fontFamily: P.serif, fontSize: 22, fontStyle: 'italic', fontWeight: 500, color: P.accent, marginTop: 8 }}>
                  {ex.reply.it}
                </div>
                <div style={{ fontFamily: P.sans, fontSize: 14, color: P.mute, marginTop: 4 }}>{ex.reply.en}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['B1 \u00b7 Intermediate', 'Sarcastic', 'All regions'].map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: P.mono, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
                padding: '6px 12px', borderRadius: 999, border: `1px solid ${P.line}`, color: P.mute,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ fontFamily: P.mono, fontSize: 11, color: P.mute, letterSpacing: 1.2, textTransform: 'uppercase' }}>
          modididire.app \u00b7 No. {String(T.dayNumber).padStart(3, '0')}
        </div>
      </div>
    </div>
  );
}
