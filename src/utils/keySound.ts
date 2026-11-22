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
 * Authentic Game Boy DMG 8-bit pulse wave (25% duty cycle) sound effects:
 * - 'heavy' (Dino / Portrait): Iconic 2-note retro confirm/chime (B5 -> E6)
 * - 'normal' (CTA buttons): Crisp Game Boy menu blip (E5 -> A5)
 */
function synthGameBoySfx(type: 'heavy' | 'normal'): string {
  const sr = 44100;
  const dur = type === 'heavy' ? 0.135 : 0.068;
  const len = Math.floor(sr * dur);
  const samples = new Float32Array(len);

  const duty = 0.25; // Classic Game Boy 25% pulse wave
  let phase = 0;
  let lp = 0;

  for (let i = 0; i < len; i++) {
    const t = i / sr;

    let freq: number;
    let env: number;

    if (type === 'heavy') {
      // Iconic 2-step Game Boy A-button / coin chime: B5 (987.77 Hz) -> E6 (1318.51 Hz)
      const split = 0.042;
      freq = t < split ? 987.77 : 1318.51;
      const localT = t < split ? t : t - split;
      env = t < split ? Math.exp(-localT * 10) : Math.exp(-localT * 24);
    } else {
      // Snappy Game Boy D-pad / UI select blip: E5 (659.25 Hz) -> A5 (880 Hz)
      const split = 0.022;
      freq = t < split ? 659.25 : 880.0;
      env = Math.exp(-t * 36);
    }

    phase = (phase + freq / sr) % 1;
    const pulse = phase < duty ? 1 : -1;

    // Gentle low-pass to match warm Game Boy speaker roll-off (no harsh aliasing)
    lp += 0.35 * (pulse - lp);

    // Tiny 1.5ms fade-in/out to prevent speaker pop
    const fadeIn = Math.min(1, t / 0.0015);
    const fadeOut = Math.min(1, (dur - t) / 0.003);
    samples[i] = lp * env * fadeIn * fadeOut * 0.42;
  }

  return encodeWavDataUri(samples, sr);
}

class SoundPool {
  private pool: HTMLAudioElement[] = [];
  private idx = 0;
  private uri: string | null = null;
  private type: 'heavy' | 'normal';

  constructor(type: 'heavy' | 'normal') {
    this.type = type;
  }

  play() {
    if (typeof window === 'undefined' || !soundEnabled) return;
    if (!this.uri) {
      this.uri = synthGameBoySfx(this.type);
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
      const p = audio.play();
      if (p) p.catch(() => {});
    } catch {
      // ignore
    }
  }
}

const heavyPool = new SoundPool('heavy');
const normalPool = new SoundPool('normal');

export function playKeyDown(weight: 'heavy' | 'normal' = 'normal'): void {
  if (weight === 'heavy') heavyPool.play();
  else normalPool.play();
}

export function playKeyUp(): void {
  // Game Boy buttons chime cleanly on press only
}
