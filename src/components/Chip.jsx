import { P } from '../data/palette';

export default function Chip({ children, tone = 'mute' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: P.mono,
        fontSize: 11,
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        padding: '4px 10px',
        borderRadius: 999,
        border: `1px solid ${P.line}`,
        color: tone === 'accent' ? P.accent : P.mute,
        background: tone === 'accent' ? '#FBEAE3' : 'transparent',
      }}
    >
      {children}
    </span>
  );
}
