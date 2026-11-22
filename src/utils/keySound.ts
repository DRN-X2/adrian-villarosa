let soundEnabled = true;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
}

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
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
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

/**
 * Acoustic synthesis of a lubed, PE-foam "creamy / thocky" PBT mechanical switch:
 * - Warm low case thump (140Hz -> 60Hz)
 * - Marbly PE-foam mid formant pop (480Hz -> 240Hz)
 * - Heavily low-passed soft stem impact (no harsh static)
 * - Smooth 1.2ms attack envelope to eliminate digital clicks
 */
function synthMechanicalKey(type: 'heavy' | 'normal' | 'up'): string {
  const sr = 44100;
  const dur = type === 'heavy' ? 0.095 : type === 'normal' ? 0.075 : 0.048;
  const len = Math.floor(sr * dur);
  const samples = new Float32Array(len);

  let seed = type === 'heavy' ? 2026 : type === 'normal' ? 4096 : 8192;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed / 2147483647) * 2 - 1;
  };

  // 2-stage low-pass filter state for warm, creamy (zero-hiss) transient
  let lp1 = 0;
  let lp2 = 0;
  let phaseThock = 0;
  let phaseMarble = 0;

  for (let i = 0; i < len; i++) {
    const t = i / sr;
    // Soft 1.2ms attack ramp for creamy rounded impact
    const attack = Math.min(1, t / 0.0012);

    const n = rand();
    // Heavy low-pass (~950Hz cutoff) -> warm wood/PBT knock, zero harsh hiss
    const alpha = type === 'up' ? 0.22 : 0.16;
    lp1 += alpha * (n - lp1);
    lp2 += alpha * (lp1 - lp2);

    if (type === 'up') {
      // Creamy muted top-out "tock"
      const fMarble = 290 + 360 * Math.exp(-t * 110);
      phaseMarble += (2 * Math.PI * fMarble) / sr;
      const marble = Math.sin(phaseMarble) * Math.exp(-t * 115) * 0.65;
      const tap = lp2 * Math.exp(-t * 150) * 0.55;
      samples[i] = (marble + tap) * attack;
    } else {
      const isHeavy = type === 'heavy';

      // 1. Deep damped case thock (PBT + deskmat resonance)
      const fThock = (isHeavy ? 54 : 68) + (isHeavy ? 95 : 115) * Math.exp(-t * 58);
      phaseThock += (2 * Math.PI * fThock) / sr;
      const thock = Math.sin(phaseThock) * Math.exp(-t * (isHeavy ? 34 : 44)) * 0.85;

      // 2. Signature "creamy / marbly" PE-foam mid-pop (440-580Hz)
      const fMarble = (isHeavy ? 210 : 250) + (isHeavy ? 320 : 390) * Math.exp(-t * 135);
      phaseMarble += (2 * Math.PI * fMarble) / sr;
      const marble = Math.sin(phaseMarble) * Math.exp(-t * (isHeavy ? 88 : 105)) * 0.68;

      // 3. Soft lubed stem bottom-out knock
      const knock = lp2 * Math.exp(-t * 145) * 0.52;

      // Subtle warm saturation (soft-clip) for analog creaminess
      const raw = (thock + marble + knock) * attack;
      samples[i] = Math.tanh(raw * 1.15);
    }
  }

  let peak = 0;
  for (let i = 0; i < len; i++) {
    const a = Math.abs(samples[i]);
    if (a > peak) peak = a;
  }
  const targetPeak = type === 'up' ? 0.45 : 0.9;
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
      audio.playbackRate = 0.97 + Math.random() * 0.06;
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
