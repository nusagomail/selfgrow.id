import { describe, expect, it } from "vitest";
import { quizAttrsSchema } from "./ebook";
import { quizHint, quizLabel, quizMode, quizOptionPoints } from "./quiz";

const base = {
  id: "uji",
  title: "Uji",
  questions: [
    {
      q: "Pertanyaan?",
      options: [
        { label: "A", points: 0, correct: true, feedback: "Tepat." },
        { label: "B", points: 0 },
      ],
      explain: "Karena A.",
    },
  ],
  results: [{ min: 0, max: 1, title: "Hasil", text: "" }],
};

describe("quiz modes (D50)", () => {
  it("kuis lama tetap valid dan bawaan score", () => {
    const r = quizAttrsSchema.parse({
      ...base,
      questions: [
        {
          q: "x",
          options: [
            { label: "Ya", points: 1 },
            { label: "Tidak", points: 0 },
          ],
        },
      ],
    });
    expect(r.mode).toBe("score");
    expect(quizLabel(r)).toBe("Tes diri");
  });
  it("knowledge butuh tepat satu jawaban benar per pertanyaan", () => {
    expect(quizAttrsSchema.safeParse({ ...base, mode: "knowledge" }).success).toBe(true);
    const noneCorrect = {
      ...base,
      mode: "knowledge",
      questions: [
        {
          q: "x",
          options: [
            { label: "A", points: 0 },
            { label: "B", points: 0 },
          ],
        },
      ],
    };
    expect(quizAttrsSchema.safeParse(noneCorrect).success).toBe(false);
  });
  it("label kustom dan label ujung skala", () => {
    const r = quizAttrsSchema.parse({
      ...base,
      mode: "scale",
      label: "Cek dompet",
      ends: ["Jarang", "Selalu"],
    });
    expect(quizLabel(r)).toBe("Cek dompet");
    expect(r.ends).toEqual(["Jarang", "Selalu"]);
    expect(quizHint(r)).toMatch(/hasilmu/);
  });
  it("menolak mode tidak dikenal dan tanggapan terlalu panjang", () => {
    expect(quizAttrsSchema.safeParse({ ...base, mode: "lain" }).success).toBe(false);
    const long = {
      ...base,
      questions: [
        {
          q: "x",
          options: [
            { label: "A", points: 0, feedback: "a".repeat(501) },
            { label: "B", points: 0 },
          ],
        },
      ],
    };
    expect(quizAttrsSchema.safeParse(long).success).toBe(false);
  });
  it("poin pilihan per bentuk", () => {
    expect(quizOptionPoints({ mode: "knowledge" }, { points: 5, correct: true })).toBe(1);
    expect(quizOptionPoints({ mode: "knowledge" }, { points: 5 })).toBe(0);
    expect(quizOptionPoints({ mode: "score" }, { points: 5, correct: true })).toBe(5);
    expect(quizMode({ mode: undefined as never })).toBe("score");
  });
});
