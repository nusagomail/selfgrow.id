import type { QuizAttrs, QuizMode } from "./ebook";

/** Label, petunjuk, dan poin kuis per bentuk (D50). Dipakai renderer app dan site. */
const DEFAULT_LABEL: Record<QuizMode, string> = {
  score: "Tes diri",
  scale: "Tes diri",
  knowledge: "Uji pengetahuan",
  scenario: "Apa yang kamu lakukan?",
};

const HINT: Record<QuizMode, string> = {
  score: "Jawab semua pertanyaan untuk melihat hasilmu.",
  scale: "Geser pilihanmu di setiap baris untuk melihat hasilmu.",
  knowledge: "Jawab semua untuk melihat berapa yang benar.",
  scenario: "Pilih jawabanmu untuk melihat tanggapannya.",
};

export function quizMode(attrs: Pick<QuizAttrs, "mode">): QuizMode {
  return attrs.mode ?? "score";
}

export function quizLabel(attrs: Pick<QuizAttrs, "mode" | "label">): string {
  return attrs.label?.trim() || DEFAULT_LABEL[quizMode(attrs)];
}

export function quizHint(attrs: Pick<QuizAttrs, "mode">): string {
  return HINT[quizMode(attrs)];
}

/** Poin satu pilihan: bentuk knowledge memakai benar = 1, salah = 0. */
export function quizOptionPoints(
  attrs: Pick<QuizAttrs, "mode">,
  option: { points: number; correct?: boolean },
): number {
  return quizMode(attrs) === "knowledge" ? (option.correct ? 1 : 0) : option.points;
}
