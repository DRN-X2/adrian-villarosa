let ctx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;
let soundEnabled = true;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function getNoiseBuffer(audio: AudioContext): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === audio.sampleRate) {
    return noiseBuffer;
  }
  const length = Math.floor(audio.sampleRate * 0.06);
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (length * 0.25));
  }
  noiseBuffer = buffer;
  return buffer;
}

/**
 * Synthesized PBT mechanical keyboard "thock" on key-down.
 * Zero network fetches, 0ms latency, subtle pitch variance per press.
 */
export function playKeyDown(weight: 'heavy' | 'normal' = 'normal'): void {
  if (!soundEnabled) return;
  const audio = getAudioContext();
  if (!audio) return;

  const now = audio.currentTime;
  const jitter = 0.96 + Math.random() * 0.08;
  const isHeavy = weight === 'heavy';

  // 1. Deep resonant keycap housing "thock"
  const osc = audio.createOscillator();
  const oscGain = audio.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime((isHeavy ? 185 : 230) * jitter, now);
  osc.frequency.exponentialRampToValueAtTime((isHeavy ? 52 : 72) * jitter, now + (isHeavy ? 0.055 : 0.038));

  oscGain.gain.setValueAtTime(isHeavy ? 0.32 : 0.22, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + (isHeavy ? 0.065 : 0.045));

  osc.connect(oscGain);
  oscGain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + 0.07);

  // 2. Crisp tactile switch stem transient
  const noise = audio.createBufferSource();
  noise.buffer = getNoiseBuffer(audio);

  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime((isHeavy ? 1450 : 1950) * jitter, now);
  filter.Q.setValueAtTime(1.6, now);

  const noiseGain = audio.createGain();
  noiseGain.gain.setValueAtTime(isHeavy ? 0.38 : 0.26, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audio.destination);
  noise.start(now);
  noise.stop(now + 0.032);
}

/**
 * Lighter mechanical switch top-out "clack" on key-up.
 */
export function playKeyUp(): void {
  if (!soundEnabled) return;
  const audio = getAudioContext();
  if (!audio) return;

  const now = audio.currentTime;
  const jitter = 0.96 + Math.random() * 0.08;

  const noise = audio.createBufferSource();
  noise.buffer = getNoiseBuffer(audio);

  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2800 * jitter, now);
  filter.Q.setValueAtTime(2.0, now);

  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  noise.start(now);
  noise.stop(now + 0.022);
}
