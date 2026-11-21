import { describe, expect, it } from "vitest";
import { DEFAULT_INTERACTIVE_ATTRS, finalizeInteractive } from "./interactive-form";

describe("formulir unsur interaktif (D42)", () => {
  it("nilai awal kosong ditolak dengan pesan berbahasa Indonesia", () => {
    for (const kind of ["quiz", "toolEmbed", "animChart"] as const) {
      const r = finalizeInteractive(kind, DEFAULT_INTERACTIVE_ATTRS[kind]);
      expect(r.ok).toBe(false);
      if (!r.ok) for (const e of r.errors) expect(e).not.toMatch(/expected|Too small/);
    }
    const t = finalizeInteractive("toolEmbed", DEFAULT_INTERACTIVE_ATTRS.toolEmbed);
    expect(!t.ok && t.errors).toEqual(["Tool: belum dipilih"]);
  });

  it("kuis: id dibuat dari judul, pengantar kosong jadi null", () => {
    const r = finalizeInteractive("quiz", {
      ...DEFAULT_INTERACTIVE_ATTRS.quiz,
      title: "Skor Jerat Paylater!",
      questions: [
        {
          q: "Punya 3 cicilan?",
          options: [
            { label: "Ya", points: 1 },
            { label: "Tidak", points: 0 },
          ],
        },
      ],
      results: [
        { min: 0, max: 0, title: "Aman", text: "" },
        { min: 1, max: 1, title: "Waspada", text: "" },
      ],
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.attrs.id).toBe("skor-jerat-paylater");
      expect(r.attrs.intro).toBeNull();
    }
  });

  it("kuis: rentang hasil terbalik ditolak", () => {
    const r = finalizeInteractive("quiz", {
      ...DEFAULT_INTERACTIVE_ATTRS.quiz,
      title: "X",
      questions: [
        {
          q: "A?",
          options: [
            { label: "Ya", points: 1 },
            { label: "Tidak", points: 0 },
          ],
        },
      ],
      results: [{ min: 3, max: 1, title: "Salah", text: "" }],
    });
    expect(r.ok).toBe(false);
  });

  it("tool & grafik: isian opsional kosong jadi null, nilai valid lolos", () => {
    const t = finalizeInteractive("toolEmbed", { slug: "kalkulator-rasio", title: " ", intro: "" });
    expect(t).toEqual({ ok: true, attrs: { slug: "kalkulator-rasio", title: null, intro: null } });
    const c = finalizeInteractive("animChart", {
      ...DEFAULT_INTERACTIVE_ATTRS.animChart,
      title: "Hemat",
      items: [{ label: "Kopi", value: 300000 }],
    });
    expect(c.ok && c.attrs.note).toBeNull();
    const bad = finalizeInteractive("animChart", {
      ...DEFAULT_INTERACTIVE_ATTRS.animChart,
      title: "Hemat",
      items: [{ label: "Kopi", value: -1 }],
    });
    expect(bad.ok).toBe(false);
  });
});
