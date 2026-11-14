import { useId } from 'react';

// Pen-and-ink studies in the manner of Leonardo's notebooks. Hatching runs
// top-left to bottom-right, as a left-handed draughtsman's does.

function hatch(x0, y0, x1, y1, gap = 6, len = 12) {
  const lines = [];
  for (let x = x0; x <= x1; x += gap) {
    for (let y = y0; y <= y1; y += len * 1.6) lines.push(`M${x} ${y}l${len * 0.7} ${len * 0.7}`);
  }
  return lines.join('');
}

function spiral(cx, cy, turns, a, b) {
  const pts = [];
  for (let t = 0; t <= Math.PI * 2 * turns; t += 0.12) {
    const r = a + b * t;
    pts.push(`${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`);
  }
  return 'M' + pts.join('L');
}

function gear(cx, cy, r, teeth, depth) {
  const pts = [];
  const step = (Math.PI * 2) / (teeth * 4);
  for (let i = 0; i < teeth * 4; i++) {
    const rr = i % 4 < 2 ? r : r - depth;
    const a = i * step;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return 'M' + pts.join('L') + 'Z';
}

const PEAR =
  'M100 52C92 52 88 62 88 74C88 88 72 98 70 122C68 150 86 170 102 170C120 170 136 152 132 124C130 100 114 88 113 74C112 62 108 52 100 52Z';

const ART = {
  animali: () => (
    <>
      <path d="M20 154C60 132 112 176 188 140" className="sk-guide" />
      <path d="M62 112C80 102 112 98 140 104C150 106 158 103 163 98" />
      <path d="M62 112C84 121 118 121 140 110C148 106 156 103 163 98" />
      <circle cx="167" cy="96" r="5" />
      <path d="M172 95l9-2-8 6" />
      <path d="M62 112L38 102M62 112L36 113M62 112L40 124M48 106l-2 12" />
      <path d="M112 103C104 80 92 58 68 38C88 46 108 56 124 72C131 81 133 92 130 102" />
      <path d="M74 44l8 18M84 50l8 20M96 57l6 21M108 64l5 22M119 72l3 22" className="sk-fine" />
      <path d="M118 109C125 127 128 147 120 168C113 152 107 137 104 117" />
      <path d="M110 122l11 2M108 134l14 3M110 146l12 4M114 157l8 3" className="sk-fine" />
      <path d={hatch(82, 112, 128, 118, 6, 7)} className="sk-hatch" />
    </>
  ),
  cibo: (clip) => (
    <>
      <defs>
        <clipPath id={clip}>
          <path d={PEAR} />
        </clipPath>
      </defs>
      <path d={PEAR} />
      <g clipPath={`url(#${clip})`}>
        <path d={hatch(108, 92, 140, 172, 5, 10)} className="sk-hatch" />
        <path d={hatch(92, 146, 112, 172, 6, 8)} className="sk-hatch" />
      </g>
      <path d="M101 52C101 44 104 38 110 31" />
      <path d="M106 40C116 30 132 28 141 34C131 42 116 45 106 40Z" />
      <path d="M107 40C119 36 129 34 141 34" className="sk-fine" />
      <path d="M60 172C88 180 132 180 154 170" />
      <path d={hatch(112, 171, 146, 175, 5, 5)} className="sk-hatch" />
      <path d="M84 96C80 104 78 112 78 120" className="sk-fine" />
    </>
  ),
  corpo: () => (
    <>
      <path d="M18 100H182" className="sk-guide" />
      <circle cx="100" cy="98" r="36" className="sk-guide" />
      <path d="M40 100C70 66 130 66 160 100" />
      <path d="M40 100C70 126 130 126 160 100" />
      <path d="M50 86C80 58 124 58 152 84" className="sk-fine" />
      <path d="M44 62C76 40 130 40 162 58" />
      <path d="M58 54l-4-6M72 48l-3-7M88 44l-2-7M104 43l0-7M120 44l2-7M136 48l3-6M150 53l4-6" className="sk-fine" />
      <circle cx="100" cy="98" r="22" />
      <circle cx="100" cy="98" r="9" className="sk-fill" />
      <circle cx="94" cy="92" r="3" className="sk-light" />
      <path d={hatch(80, 80, 120, 112, 4, 6)} className="sk-hatch" />
      <path d="M56 78l-5-5M70 71l-4-6M86 68l-2-7M116 68l2-7M132 71l4-6M146 78l5-5" className="sk-fine" />
    </>
  ),
  natura: () => (
    <>
      <path d={spiral(96, 104, 3.2, 2, 3.4)} />
      <path d={spiral(96, 104, 2.6, 6, 3.4)} className="sk-fine" />
      <path d="M14 162C34 150 54 172 76 160S116 150 136 162S172 172 190 156" />
      <path d="M14 178C34 168 56 186 78 176S118 168 140 178S174 186 190 172" className="sk-fine" />
      <path d="M160 26A20 20 0 1 0 176 58A16 16 0 1 1 160 26Z" />
      <path d={hatch(148, 34, 160, 56, 4, 6)} className="sk-hatch" />
      <path d="M30 40l6 0M33 37l0 6M50 24l4 0M52 22l0 4" className="sk-fine" />
    </>
  ),
  oggetti: () => (
    <>
      <circle cx="92" cy="110" r="58" className="sk-guide" />
      <path d={gear(92, 110, 46, 14, 7)} />
      <circle cx="92" cy="110" r="30" />
      <circle cx="92" cy="110" r="8" />
      <path d="M92 80V102M92 118V140M62 110H84M100 110H122" />
      <path d={gear(152, 54, 22, 8, 6)} />
      <circle cx="152" cy="54" r="6" />
      <path d={hatch(64, 120, 90, 136, 5, 6)} className="sk-hatch" />
      <path d="M24 176L52 40M52 40L80 176M38 108H66" className="sk-fine" />
    </>
  ),
  persone: () => (
    <>
      <circle cx="100" cy="104" r="72" />
      <path d="M38 52H162V176H38Z" />
      <circle cx="100" cy="68" r="10" />
      <path d="M100 78C98 96 98 112 100 128" />
      <path d="M100 90C82 89 60 90 38 91M100 90C118 89 140 90 162 91" />
      <path d="M99 88C82 80 62 70 44 61M101 88C118 80 138 70 156 61" className="sk-fine" />
      <path d="M100 128C96 146 92 162 88 176M100 128C104 146 108 162 112 176" />
      <path d="M100 128C88 142 74 156 62 167M100 128C112 142 126 156 138 167" className="sk-fine" />
      <path d="M100 32V176M38 104H162" className="sk-guide" />
    </>
  ),
  parole: () => (
    <>
      <path d="M58 172C88 132 128 82 168 28" />
      <path d="M168 28C150 36 122 58 100 94C92 108 82 124 76 138" />
      <path d="M168 28C160 50 140 80 116 108C104 122 92 134 82 144" />
      <path d="M150 42l-4 20M138 54l-6 22M126 66l-7 22M114 80l-8 20M102 96l-8 18" className="sk-fine" />
      <path d="M58 172l-6 12" />
      <path d="M18 182C26 176 34 184 42 178S56 176 62 180" className="sk-fine" />
      <path d="M20 150c6-4 10 2 16-2s10 2 16-2M20 136c6-4 10 2 16-2s10 2 16-2M20 122c6-4 10 2 14-2" className="sk-fine" />
    </>
  ),
  fortuna: () => (
    <>
      <path d="M100 40V170M70 172H130M84 172C88 163 112 163 116 172" />
      <circle cx="100" cy="35" r="5" />
      <path d="M40 64L160 60" />
      <path d="M44 63L28 118M44 63L60 118M156 61L140 112M156 61L172 112" className="sk-fine" />
      <path d="M22 118C28 133 58 133 64 118Z" />
      <path d="M134 112C140 127 170 127 176 112Z" />
      <ellipse cx="38" cy="114" rx="8" ry="3" />
      <ellipse cx="48" cy="110" rx="8" ry="3" />
      <ellipse cx="42" cy="106" rx="8" ry="3" />
      <path d={hatch(92, 70, 100, 160, 4, 8)} className="sk-hatch" />
    </>
  ),
  proverbi: () => (
    <>
      <path d="M100 70C80 60 50 58 26 64V150C50 144 80 146 100 156Z" />
      <path d="M100 70C120 60 150 58 174 64V150C150 144 120 146 100 156Z" />
      <path d="M100 70V156" />
      <path d="M36 80C52 76 70 76 88 82M36 92C52 88 70 88 88 94M36 104C52 100 70 100 88 106M36 116C52 112 66 112 80 116" className="sk-fine" />
      <path d="M112 82C130 76 148 76 164 80M112 94C130 88 148 88 164 92M112 106C130 100 148 100 164 104M120 118C134 112 150 112 164 116" className="sk-fine" />
      <path d="M120 154L118 184L124 178L129 186L127 152" />
      <path d="M100 52V40M84 56l-6-9M116 56l6-9M70 64l-9-6M130 64l9-6" className="sk-fine" />
    </>
  ),
};

// Styles live inside the SVG (scoped by id) so they survive PNG export, which
// clones SVGs without their document styles. Colour comes from CSS `color`.
const sheet = (id) => `
#${id} .sk{fill:none;stroke:currentColor;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round}
#${id} .sk-guide{stroke-width:.6;stroke-dasharray:2 4;opacity:.6}
#${id} .sk-fine{stroke-width:.7}
#${id} .sk-hatch{stroke-width:.5;opacity:.7}
#${id} .sk-light{stroke-width:.5;opacity:.5}
#${id} .sk-fill{fill:currentColor;stroke:none;opacity:.12}`;

export default function Sketch({ theme, className = '', title }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const draw = ART[theme] || ART.proverbi;
  return (
    <svg
      id={`sketch-${uid}`}
      viewBox="0 0 200 200"
      className={`sketch ${className}`}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <style>{sheet(`sketch-${uid}`)}</style>
      <defs>
        <filter id={`rough-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      </defs>
      <g filter={`url(#rough-${uid})`} className="sk">
        {draw(`clip-${uid}`)}
      </g>
    </svg>
  );
}
