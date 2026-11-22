let soundEnabled = true;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
}

/**
 * Encodes mono Float32 PCM samples into a base64 WAV data URI.
 * Uses native HTMLAudioElement playback so it works reliably in Brave,
 * Chrome, Safari, and mobile browsers with zero AudioContext resume races.
 */
function encodeWavDataUri(samples: Float32Array, sampleRate: number): string {
  const numSamples = samples.length;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:audio/wav;base64,' + btoa(binary);
}

function synthMechanicalKey(type: 'heavy' | 'normal' | 'up'): string {
  const sr = 44100;
  const dur = type === 'heavy' ? 0.085 : type === 'normal' ? 0.065 : 0.04;
  const len = Math.floor(sr * dur);
  const samples = new Float32Array(len);

  // Deterministic pseudo-random noise for crisp plastic click
  let seed = type === 'heavy' ? 1337 : type === 'normal' ? 7331 : 4242;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed / 2147483647) * 2 - 1;
  };

  let lp = 0;
  let phaseBody = 0;
  let phaseSnap = 0;

  for (let i = 0; i < len; i++) {
    const t = i / sr;

    if (type === 'up') {
      // Crisp lighter top-out clack
      const env = Math.exp(-t * 140);
      const n = rand();
      lp = lp * 0.45 + n * 0.55;
      phaseSnap += (2 * Math.PI * (1600 * Math.exp(-t * 35) + 420)) / sr;
      samples[i] = (lp * 0.65 + Math.sin(phaseSnap) * 0.35) * env;
    } else {
      // Rich PBT mechanical bottom-out "thock"
      const fStart = type === 'heavy' ? 210 : 260;
      const fEnd = type === 'heavy' ? 58 : 78;
      const freqBody = fEnd + (fStart - fEnd) * Math.exp(-t * 65);
      phaseBody += (2 * Math.PI * freqBody) / sr;
      const bodyEnv = Math.exp(-t * (type === 'heavy' ? 42 : 55));
      const body = Math.sin(phaseBody) * bodyEnv * 0.78;

      // Tactile stem click transient (first 12ms)
      const clickEnv = Math.exp(-t * 240);
      const n = rand();
      lp = lp * 0.5 + n * 0.5;
      phaseSnap += (2 * Math.PI * (type === 'heavy' ? 1250 : 1650)) / sr;
      const click = (lp * 0.6 + Math.sin(phaseSnap) * 0.4) * clickEnv * 0.85;

      samples[i] = body + click;
    }
  }

  // Normalize peak so it is crisp & audible on laptop/phone speakers
  let peak = 0;
  for (let i = 0; i < len; i++) {
    const a = Math.abs(samples[i]);
    if (a > peak) peak = a;
  }
  const targetPeak = type === 'up' ? 0.55 : 0.92;
  if (peak > 0) {
    const gain = targetPeak / peak;
    for (let i = 0; i < len; i++) samples[i] *= gain;
  }

  return encodeWavDataUri(samples, sr);
}

class SoundPool {
  private pool: HTMLAudioElement[] = [];
  private idx = 0;
  private uri: string | null = null;
  private type: 'heavy' | 'normal' | 'up';

  constructor(type: 'heavy' | 'normal' | 'up') {
    this.type = type;
  }

  play() {
    if (typeof window === 'undefined' || !soundEnabled) return;
    if (!this.uri) {
      this.uri = synthMechanicalKey(this.type);
      for (let i = 0; i < 6; i++) {
        const a = new Audio(this.uri);
        a.preload = 'auto';
        this.pool.push(a);
      }
    }
    const audio = this.pool[this.idx];
    this.idx = (this.idx + 1) % this.pool.length;
    try {
      audio.currentTime = 0;
      audio.playbackRate = 0.96 + Math.random() * 0.08;
      const p = audio.play();
      if (p) p.catch(() => {});
    } catch {
      // ignore
    }
  }
}

const heavyPool = new SoundPool('heavy');
const normalPool = new SoundPool('normal');
const upPool = new SoundPool('up');

export function playKeyDown(weight: 'heavy' | 'normal' = 'normal'): void {
  if (weight === 'heavy') heavyPool.play();
  else normalPool.play();
}

export function playKeyUp(): void {
  upPool.play();
}
