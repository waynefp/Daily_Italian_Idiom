// Small typographic ornaments: rules, fleurons, the compass seal.
// Styling is set with presentation attributes so it survives PNG export.

const SANGUINE = '#9e3d22';

export function Seal({ size = 34, className = '' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`seal ${className}`}
      fill="none"
      stroke={SANGUINE}
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="29" />
      <circle cx="32" cy="32" r="25.5" strokeWidth="0.8" opacity="0.7" />
      <path d="M14 14H50V50H14Z" />
      <path d="M32 3V61M3 32H61M11 11L53 53M53 11L11 53" strokeWidth="0.8" opacity="0.7" />
      <circle cx="32" cy="32" r="3.2" fill={SANGUINE} stroke="none" />
      <path d="M32 9L35 32L32 55L29 32Z" fill="rgba(158,61,34,0.18)" strokeWidth="1" />
    </svg>
  );
}

export function Fleuron({ className = '' }) {
  return (
    <svg
      viewBox="0 0 40 24"
      className={`fleuron ${className}`}
      fill="none"
      stroke={SANGUINE}
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 18C9 18 13 15 15 10C17 4 23 2 27 5C31 8 30 14 25 15C21 16 19 12 22 10" />
      <path
        d="M15 10C19 13 25 20 37 19C31 22 22 22 15 18C11 16 7 17 3 18Z"
        fill={SANGUINE}
        stroke="none"
        opacity="0.8"
      />
    </svg>
  );
}

export function Rule({ className = '' }) {
  return (
    <div className={`rule ${className}`} aria-hidden="true">
      <span className="rule-line" />
      <svg viewBox="0 0 48 16" className="rule-knot" fill="none" stroke="#6e5236" strokeWidth="1">
        <path d="M24 2L30 8L24 14L18 8Z" />
        <circle cx="24" cy="8" r="1.8" fill={SANGUINE} stroke="none" />
        <path d="M2 8H14M34 8H46" />
        <circle cx="10" cy="8" r="1.2" fill={SANGUINE} stroke="none" />
        <circle cx="38" cy="8" r="1.2" fill={SANGUINE} stroke="none" />
      </svg>
      <span className="rule-line" />
    </div>
  );
}

export function Corner({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={`corner ${className}`} fill="none" stroke="#6e5236" strokeWidth="1.3" aria-hidden="true">
      <path d="M2 38V2H38" />
      <path d="M7 38V7H38" strokeWidth="0.7" />
      <path d="M7 7C14 7 17 11 17 17C11 17 7 14 7 7Z" fill="rgba(158,61,34,0.55)" stroke="none" />
    </svg>
  );
}

/** Leonardo's right-to-left mirror script, purely decorative. */
export function Mirror({ children, className = '' }) {
  return (
    <span className={`mirror ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}
