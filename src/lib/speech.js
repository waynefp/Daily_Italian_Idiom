export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

if (canSpeak) {
  // Some browsers only populate voices after this event fires once.
  window.speechSynthesis.onvoiceschanged = () => {};
}

export function speak(text, { rate = 0.9 } = {}) {
  if (!canSpeak || !text) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[—–]/g, ','));
    u.lang = 'it-IT';
    u.rate = rate;
    const voice = synth.getVoices().find((v) => /^it/i.test(v.lang));
    if (voice) u.voice = voice;
    synth.speak(u);
  } catch {
    /* speech is a nicety; never break the UI over it */
  }
}

// Auto-play preference shared by Flashcards and Sentences.
const SOUND_KEY = 'mdd.cardSound';

export function getAutoSpeak() {
  try {
    return localStorage.getItem(SOUND_KEY) !== 'off';
  } catch {
    return true;
  }
}

export function setAutoSpeak(on) {
  try {
    localStorage.setItem(SOUND_KEY, on ? 'on' : 'off');
  } catch {
    /* private mode */
  }
  if (!on && canSpeak) window.speechSynthesis.cancel();
}
