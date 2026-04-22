export default function IdiomIllustration({ width = '100%', height = 320 }) {
  const palette = {
    bg: '#EFE5D3',
    ink: '#2B241B',
    accent: '#C9553C',
    accent2: '#7B8E6F',
    paper: '#F7EEDB',
    shadow: 'rgba(43,36,27,0.12)',
  };

  return (
    <svg
      viewBox="0 0 600 320"
      width={width}
      height={height}
      style={{ display: 'block', borderRadius: 'inherit' }}
    >
      <defs>
        <pattern
          id="stripes-ed"
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="8" fill={palette.bg} />
          <line x1="0" y1="0" x2="0" y2="8" stroke={palette.ink} strokeOpacity="0.06" strokeWidth="3" />
        </pattern>
        <linearGradient id="ice-ed" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={palette.paper} />
          <stop offset="1" stopColor={palette.bg} />
        </linearGradient>
      </defs>

      <rect width="600" height="320" fill="url(#stripes-ed)" />
      <line x1="0" y1="230" x2="600" y2="230" stroke={palette.ink} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 4" />

      {/* Sun */}
      <circle cx="500" cy="80" r="34" fill="none" stroke={palette.accent} strokeWidth="1.5" />
      <circle cx="500" cy="80" r="22" fill={palette.accent} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 500 + Math.cos(a) * 44;
        const y1 = 80 + Math.sin(a) * 44;
        const x2 = 500 + Math.cos(a) * 56;
        const y2 = 80 + Math.sin(a) * 56;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={palette.accent} strokeWidth="2" strokeLinecap="round" />;
      })}

      {/* Mountains */}
      <path
        d="M 0 230 L 80 170 L 140 210 L 220 150 L 300 220 L 380 180 L 480 215 L 600 180 L 600 230 Z"
        fill={palette.accent2}
        fillOpacity="0.35"
      />

      {/* Ice cube */}
      <g transform="translate(180 150)">
        <polygon points="0,40 100,0 240,30 140,70" fill={palette.paper} stroke={palette.ink} strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="0,40 140,70 140,150 0,120" fill="url(#ice-ed)" stroke={palette.ink} strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="140,70 240,30 240,110 140,150" fill={palette.bg} stroke={palette.ink} strokeWidth="1.5" strokeLinejoin="round" />
        <g stroke={palette.accent} strokeWidth="1.5" strokeLinecap="round">
          <line x1="40" y1="85" x2="40" y2="95" />
          <line x1="35" y1="90" x2="45" y2="90" />
          <line x1="180" y1="60" x2="180" y2="68" />
          <line x1="176" y1="64" x2="184" y2="64" />
        </g>
      </g>

      {/* Deck chair + figure */}
      <g transform="translate(230 85)">
        <line x1="90" y1="10" x2="90" y2="95" stroke={palette.ink} strokeWidth="2" strokeLinecap="round" />
        <path d="M 30 40 Q 90 -10 150 40 Z" fill={palette.accent} />
        <path d="M 45 35 Q 90 10 90 40 Z" fill={palette.paper} fillOpacity="0.9" />
        <path d="M 90 40 Q 90 10 135 35 Z" fill={palette.paper} fillOpacity="0.9" />
        <path d="M 30 40 Q 90 -10 150 40" fill="none" stroke={palette.ink} strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="60" y1="22" x2="60" y2="42" stroke={palette.ink} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="120" y1="22" x2="120" y2="42" stroke={palette.ink} strokeWidth="1" strokeOpacity="0.4" />

        <ellipse cx="70" cy="78" rx="28" ry="10" fill={palette.accent} stroke={palette.ink} strokeWidth="1.5" />
        <path d="M 95 78 L 140 72 L 140 80 L 96 84 Z" fill={palette.ink} opacity="0.85" />
        <circle cx="42" cy="72" r="10" fill={palette.paper} stroke={palette.ink} strokeWidth="1.5" />
        <rect x="36" y="68" width="14" height="4" rx="1" fill={palette.ink} />
        <path d="M 40 76 Q 43 79 47 76" stroke={palette.ink} strokeWidth="1" fill="none" strokeLinecap="round" />
        <rect x="22" y="65" width="6" height="9" fill={palette.accent2} stroke={palette.ink} strokeWidth="1" />
        <line x1="25" y1="62" x2="25" y2="69" stroke={palette.ink} strokeWidth="1" />
      </g>

      {/* Cold wisps */}
      <g stroke={palette.ink} strokeOpacity="0.3" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M 170 130 Q 165 120 172 110 Q 178 100 172 92" />
        <path d="M 440 140 Q 445 130 438 120 Q 432 110 438 100" />
      </g>

      <text x="20" y="305" fontFamily="ui-monospace, monospace" fontSize="10" fill={palette.ink} opacity="0.5" letterSpacing="1">
        Fig. 1 — stare al fresco, letteralmente
      </text>
    </svg>
  );
}
