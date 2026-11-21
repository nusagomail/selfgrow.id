/**
 * Musik latar video pengantar (D43), disintesis dari nol: tanpa sampel, tanpa lisensi pihak ketiga.
 * Pad akor lembut + arpeggio petik + bass + shaker tipis, dengan gema sederhana.
 *   writeMusic(path, { seconds, bpm, mood, seed })
 * Mood memilih progresi akor dan warna; tiap buku boleh memilih yang cocok dengan rasanya.
 */
import { writeFileSync } from "node:fs";

const SR = 44100;

const MOODS = {
  // I–V–vi–IV di C: hangat, optimis.
  hangat: {
    chords: [
      [48, 52, 55, 60],
      [43, 50, 55, 59],
      [45, 52, 57, 60],
      [41, 48, 53, 57],
    ],
    arp: 0.16,
    shaker: 0.035,
    bright: 0.5,
  },
  // vi–IV–I–V di A minor: reflektif, tenang.
  tenang: {
    chords: [
      [45, 52, 57, 60],
      [41, 48, 53, 57],
      [48, 52, 55, 60],
      [43, 50, 55, 59],
    ],
    arp: 0.11,
    shaker: 0,
    bright: 0.3,
  },
  // I–IV–vi–V di D: bersemangat.
  semangat: {
    chords: [
      [50, 54, 57, 62],
      [43, 50, 55, 59],
      [47, 54, 59, 62],
      [45, 52, 57, 61],
    ],
    arp: 0.2,
    shaker: 0.05,
    bright: 0.7,
  },
};

const hz = (m) => 440 * 2 ** ((m - 69) / 12);

/** PRNG kecil agar hasil sama setiap render. */
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) / 4294967296) * 2 - 1;
  };
}

export function synthMusic({ seconds, bpm = 84, mood = "hangat", seed = 7 }) {
  const M = MOODS[mood] ?? MOODS.hangat;
  const n = Math.ceil(seconds * SR);
  const L = new Float32Array(n);
  const R = new Float32Array(n);
  const beat = 60 / bpm;
  const bar = beat * 4;
  const noise = rng(seed);

  // Pad: tiap akor 2 birama, sinus + harmonik lemah, sedikit detune kiri/kanan.
  const chordLen = bar * 2;
  for (let c = 0; c * chordLen < seconds; c++) {
    const notes = M.chords[c % M.chords.length];
    const t0 = c * chordLen;
    const i0 = Math.floor(t0 * SR);
    const i1 = Math.min(n, Math.floor((t0 + chordLen + 1.2) * SR));
    for (const note of notes) {
      const f = hz(note + 12);
      for (let i = i0; i < i1; i++) {
        const t = (i - i0) / SR;
        const env = Math.min(1, t / 0.9) * Math.min(1, Math.max(0, (chordLen + 1.2 - t) / 1.2));
        const ph = 2 * Math.PI * f * (i / SR);
        const v =
          (Math.sin(ph) + M.bright * 0.25 * Math.sin(2 * ph) + 0.08 * Math.sin(3 * ph)) *
          env *
          0.045;
        L[i] += v * (1 + 0.15 * Math.sin(ph * 0.003));
        R[i] += 0.045 * env * Math.sin(2 * Math.PI * f * 1.003 * (i / SR));
      }
    }
    // Bass: akar akor pada ketukan 1 dan 3.
    const root = hz(notes[0] - 12);
    for (let b = 0; b < 8; b += 2) {
      const s0 = Math.floor((t0 + b * beat) * SR);
      const len = Math.floor(beat * 1.8 * SR);
      for (let j = 0; j < len && s0 + j < n; j++) {
        const t = j / SR;
        const v =
          Math.sin(2 * Math.PI * root * t) * Math.exp(-t * 2.2) * Math.min(1, t / 0.01) * 0.12;
        L[s0 + j] += v;
        R[s0 + j] += v;
      }
    }
    // Arpeggio petik seperdelapan ketuk, pola naik-turun.
    const pattern = [0, 1, 2, 3, 2, 1, 2, 3];
    for (let k = 0; k < 16; k++) {
      const note = notes[pattern[k % 8]] + 24;
      const f = hz(note);
      const s0 = Math.floor((t0 + (k * beat) / 2) * SR);
      const len = Math.floor(0.9 * SR);
      const pan = 0.5 + 0.35 * Math.sin(k * 0.9);
      for (let j = 0; j < len && s0 + j < n; j++) {
        const t = j / SR;
        const v =
          (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t) * Math.exp(-t * 9)) *
          Math.exp(-t * 4.5) *
          Math.min(1, t / 0.004) *
          M.arp;
        L[s0 + j] += v * (1 - pan);
        R[s0 + j] += v * pan;
      }
    }
    // Shaker: derau pendek di ketukan lemah.
    if (M.shaker > 0) {
      for (let k = 0; k < 16; k++) {
        if (k % 2 === 0) continue;
        const s0 = Math.floor((t0 + (k * beat) / 2) * SR);
        const len = Math.floor(0.06 * SR);
        let prev = 0;
        for (let j = 0; j < len && s0 + j < n; j++) {
          const w = noise();
          const hp = w - prev; // tapis lolos-tinggi kasar
          prev = w;
          const v = hp * Math.exp((-j / SR) * 60) * M.shaker;
          L[s0 + j] += v * 0.8;
          R[s0 + j] += v;
        }
      }
    }
  }

  // Gema: dua tunda berumpan balik, silang kiri-kanan.
  const d1 = Math.floor(0.31 * SR);
  const d2 = Math.floor(0.47 * SR);
  for (let i = d2; i < n; i++) {
    L[i] += 0.22 * R[i - d1] + 0.12 * L[i - d2];
    R[i] += 0.22 * L[i - d1] + 0.12 * R[i - d2];
  }

  // Fade masuk/keluar dan normalisasi.
  const fadeIn = 1.5 * SR;
  const fadeOut = 3 * SR;
  let peak = 0;
  for (let i = 0; i < n; i++) {
    const g = Math.min(1, i / fadeIn, (n - i) / fadeOut);
    L[i] *= g;
    R[i] *= g;
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  const norm = peak > 0 ? 0.7 / peak : 1;
  for (let i = 0; i < n; i++) {
    L[i] *= norm;
    R[i] *= norm;
  }
  return { L, R };
}

/** Tulis WAV 16-bit stereo. */
export function writeMusic(path, opts) {
  const { L, R } = synthMusic(opts);
  const n = L.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write("WAVEfmt ", 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i])) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i])) * 32767), 46 + i * 4);
  }
  writeFileSync(path, buf);
}
