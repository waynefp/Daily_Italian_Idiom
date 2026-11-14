// Generates public/paper.png: a seamless, transparent paper-grain tile
// (mottling + fibres + specks) that is layered over the parchment colour.
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';

const SIZE = 512;
let seed = 1489;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

function periodicNoise(cells) {
  const grid = Array.from({ length: cells * cells }, rand);
  const at = (x, y) => grid[((y + cells) % cells) * cells + ((x + cells) % cells)];
  const smooth = (t) => t * t * (3 - 2 * t);
  return (px, py) => {
    const fx = (px / SIZE) * cells;
    const fy = (py / SIZE) * cells;
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const tx = smooth(fx - x0);
    const ty = smooth(fy - y0);
    const a = at(x0, y0) + (at(x0 + 1, y0) - at(x0, y0)) * tx;
    const b = at(x0, y0 + 1) + (at(x0 + 1, y0 + 1) - at(x0, y0 + 1)) * tx;
    return a + (b - a) * ty;
  };
}

const octaves = [4, 8, 16, 32, 64, 128].map((c) => periodicNoise(c));
const weights = [0.32, 0.24, 0.18, 0.12, 0.08, 0.06];
const alpha = new Float32Array(SIZE * SIZE);

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    let n = 0;
    octaves.forEach((o, i) => (n += o(x, y) * weights[i]));
    alpha[y * SIZE + x] = Math.max(0, n - 0.42) * 70;
  }
}

// Laid-paper fibres: short, faint, mostly horizontal strokes.
for (let i = 0; i < 1400; i++) {
  let x = rand() * SIZE;
  let y = rand() * SIZE;
  const len = 6 + rand() * 26;
  const angle = (rand() - 0.5) * 0.9;
  const strength = 6 + rand() * 12;
  for (let t = 0; t < len; t++) {
    const px = Math.round(x + Math.cos(angle) * t + SIZE) % SIZE;
    const py = Math.round(y + Math.sin(angle) * t + SIZE) % SIZE;
    alpha[py * SIZE + px] += strength;
  }
}

// Foxing specks.
for (let i = 0; i < 260; i++) {
  const cx = rand() * SIZE;
  const cy = rand() * SIZE;
  const r = 0.6 + rand() * (rand() < 0.08 ? 3.2 : 1.2);
  const strength = 25 + rand() * 50;
  for (let dy = -4; dy <= 4; dy++) {
    for (let dx = -4; dx <= 4; dx++) {
      const d = Math.hypot(dx, dy);
      if (d > r) continue;
      const px = Math.round(cx + dx + SIZE) % SIZE;
      const py = Math.round(cy + dy + SIZE) % SIZE;
      alpha[py * SIZE + px] += strength * (1 - d / (r + 0.01));
    }
  }
}

const raw = Buffer.alloc((SIZE * 4 + 1) * SIZE);
for (let y = 0; y < SIZE; y++) {
  raw[y * (SIZE * 4 + 1)] = 0;
  for (let x = 0; x < SIZE; x++) {
    const o = y * (SIZE * 4 + 1) + 1 + x * 4;
    raw[o] = 92;
    raw[o + 1] = 62;
    raw[o + 2] = 30;
    raw[o + 3] = Math.min(110, Math.round(alpha[y * SIZE + x]));
  }
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8;
ihdr[9] = 6;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);
writeFileSync(new URL('../public/paper.png', import.meta.url), png);
console.log(`public/paper.png ${png.length} bytes`);
