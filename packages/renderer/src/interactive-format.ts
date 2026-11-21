import type { AnimChartAttrs } from "@selfgrow/shared";

/** Format angka grafik (D42) untuk tampilan Indonesia. Dipakai renderer dan skrip interaktif. */
export function formatChartValue(value: number, format: AnimChartAttrs["format"]): string {
  if (format === "rupiah") return `Rp${Math.round(value).toLocaleString("id-ID")}`;
  if (format === "percent") {
    return `${value.toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`;
  }
  return value.toLocaleString("id-ID", { maximumFractionDigits: 1 });
}

/** Lebar batang (persen) relatif terhadap nilai terbesar. */
export function barWidths(items: { value: number }[]): number[] {
  const max = Math.max(...items.map((i) => i.value), 0);
  return items.map((i) => (max > 0 ? Math.max(2, (i.value / max) * 100) : 0));
}

/** Skor kuis dan pita hasilnya. */
export function scoreQuiz(
  points: number[],
  maxPerQuestion: number[],
  results: { min: number; max: number }[],
): { score: number; max: number; band: number } {
  const score = points.reduce((a, b) => a + b, 0);
  const max = maxPerQuestion.reduce((a, b) => a + b, 0);
  const band = results.findIndex((r) => score >= r.min && score <= r.max);
  return { score, max, band };
}
