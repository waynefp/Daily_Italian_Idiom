import { P } from '../data/palette';

export default function SectionLabel({ children, num }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 10,
        fontFamily: P.mono,
        fontSize: 11,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: P.mute,
        marginBottom: 12,
      }}
    >
      {num && <span style={{ color: P.accent, fontWeight: 600 }}>{num}</span>}
      <span>{children}</span>
      <span style={{ flex: 1, height: 1, background: P.line, marginLeft: 4 }} />
    </div>
  );
}
