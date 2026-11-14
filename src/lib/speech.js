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
