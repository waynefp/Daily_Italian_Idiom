import { toBlob, getFontEmbedCSS } from 'html-to-image';

const WIDTH = 1080;
const HEIGHT = 1350;
let fontCSS = null;

const isWebKitSafari = () =>
  /AppleWebKit/.test(navigator.userAgent) && !/Chrome|CriOS|Chromium|Edg|FxiOS/.test(navigator.userAgent);
const isTouch = () => window.matchMedia?.('(pointer: coarse)').matches;

/** Shrinks the type (via --fit) until the body copy fits inside the frame. */
function fit(node) {
  const body = node.querySelector('.sc-body');
  if (!body) return;
  let f = 1;
  node.style.setProperty('--fit', f);
  while (body.scrollHeight > body.clientHeight + 1 && f > 0.62) {
    f = Math.round((f - 0.04) * 100) / 100;
    node.style.setProperty('--fit', f);
  }
}

async function render(node) {
  await document.fonts?.ready;
  fit(node);
  if (!fontCSS) fontCSS = await getFontEmbedCSS(node);
  const opts = {
    width: WIDTH,
    height: HEIGHT,
    pixelRatio: 1,
    cacheBust: false,
    fontEmbedCSS: fontCSS,
    style: { transform: 'none', left: '0', top: '0' },
  };
  // WebKit sometimes paints embedded fonts/images only from the second pass.
  if (isWebKitSafari()) await toBlob(node, opts);
  return toBlob(node, opts);
}

/**
 * Renders the summary card to a PNG. On phones the share sheet is used when
 * available so the image can be saved straight to Photos.
 */
export async function exportSummaryPng(node, filename) {
  const blob = await render(node);
  if (!blob) throw new Error('Render failed');
  const file = new File([blob], filename, { type: 'image/png' });

  if (isTouch() && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: filename.replace(/\.png$/, '') });
      return 'shared';
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled';
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return 'downloaded';
}
