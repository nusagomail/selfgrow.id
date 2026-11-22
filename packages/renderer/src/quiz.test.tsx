import { quizAttrsSchema } from "@selfgrow/shared";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EbookContent } from "./ebook";

const html = (attrs: unknown) =>
  renderToStaticMarkup(
    <EbookContent
      doc={{ type: "doc", content: [{ type: "quiz", attrs: quizAttrsSchema.parse(attrs) }] }}
    />,
  );

const q = (options: unknown[], extra: Record<string, unknown> = {}) => ({
  id: "k",
  title: "Kuis",
  questions: [{ q: "Pertanyaan?", options, ...extra }],
  results: [{ min: 0, max: 5, title: "Hasil", text: "" }],
  ...{},
});

describe("Quiz markup (D50)", () => {
  it("kuis lama: label Tes diri, poin apa adanya", () => {
    const out = html(
      q([
        { label: "Ya", points: 2 },
        { label: "Tidak", points: 0 },
      ]),
    );
    expect(out).toContain('data-mode="score"');
    expect(out).toContain("Tes diri");
    expect(out).toContain('data-points="2"');
  });
  it("knowledge: poin dari jawaban benar, penjelasan tersembunyi", () => {
    const out = html({
      ...q(
        [
          { label: "A", points: 9, correct: true },
          { label: "B", points: 9 },
        ],
        { explain: "Sebab A." },
      ),
      mode: "knowledge",
    });
    expect(out).toContain("Uji pengetahuan");
    expect(out).toContain('data-points="1"');
    expect(out).toContain('data-points="0"');
    expect(out).toContain('data-correct="1"');
    expect(out).toMatch(/class="quiz-explain" hidden="">Sebab A\./);
  });
  it("scenario: tanggapan per pilihan tersembunyi dan label kustom", () => {
    const out = html({
      ...q([
        { label: "A", points: 0, feedback: "Bagus." },
        { label: "B", points: 0 },
      ]),
      mode: "scenario",
      label: "Kalau kamu Raka",
    });
    expect(out).toContain("Kalau kamu Raka");
    expect(out).toMatch(/class="quiz-fb" data-for="0" hidden="">Bagus\./);
    expect(out).not.toContain('data-for="1"');
  });
  it("scale: label ujung tampil", () => {
    const out = html({
      ...q([
        { label: "1", points: 1 },
        { label: "2", points: 2 },
      ]),
      mode: "scale",
      ends: ["Jarang", "Selalu"],
    });
    expect(out).toContain("quiz-scale");
    expect(out).toContain("Jarang");
    expect(out).toContain("Selalu");
  });
});
