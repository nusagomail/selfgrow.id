/** Data video pengantar dan musik latar (D43): adegan dikenal template, musik tidak pecah. */
import { describe, expect, it } from "vitest";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { synthMusic as synthJs } from "../../../scripts/demo/intro-video/music.mjs";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { PAYLATER_INTRO as introJs } from "../../../scripts/demo/intro-video/paylater.mjs";
// @ts-expect-error -- impor teks mentah lewat Vite
import templateRaw from "../../../scripts/demo/intro-video/template.html?raw";

type Scene = { type: string; say?: string };
const intro = introJs as { slug: string; scenes: Scene[] };
const synthMusic = synthJs as (o: { seconds: number; bpm?: number; mood?: string }) => {
  L: Float32Array;
  R: Float32Array;
};

const template = templateRaw as string;

describe("video pengantar", () => {
  it("semua jenis adegan dikenal template; diakhiri ajakan", () => {
    for (const s of intro.scenes) expect(template).toContain(`\n  ${s.type}: {`);
    expect(intro.scenes.at(-1)?.type).toBe("cta");
    expect(intro.scenes.every((s) => !s.say || s.say.length < 300)).toBe(true);
  });

  it.each(["hangat", "tenang", "semangat"])("musik %s: panjang tepat, tanpa clipping", (mood) => {
    const { L, R } = synthMusic({ seconds: 6, mood });
    expect(L.length).toBe(6 * 44100);
    let peak = 0;
    for (let i = 0; i < L.length; i++)
      peak = Math.max(peak, Math.abs(L[i] ?? 0), Math.abs(R[i] ?? 0));
    expect(peak).toBeGreaterThan(0.5);
    expect(peak).toBeLessThanOrEqual(0.7001);
  });
});
