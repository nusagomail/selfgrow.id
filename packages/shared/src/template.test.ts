import { describe, expect, it } from "vitest";
import type { EbookDoc } from "./ebook";
import {
  buildFileName,
  checkTemplate,
  fillTemplate,
  parseTemplateInput,
  STARTER_TEMPLATE,
  TemplateTooLargeError,
  templateConfigSchema,
} from "./template";

const cfg = templateConfigSchema.parse(STARTER_TEMPLATE.config);
const para = (text: string) => ({
  type: "paragraph" as const,
  content: [{ type: "text" as const, text }],
});
const texts = (doc: EbookDoc): string[] => {
  const out: string[] = [];
  const walk = (nodes: unknown[]) => {
    for (const n of nodes as { type: string; text?: string; content?: unknown[] }[]) {
      if (n.type === "text") out.push(n.text as string);
      if (n.content) walk(n.content);
    }
  };
  walk(doc.content);
  return out;
};

describe("template", () => {
  it("contoh valid dan tanpa masalah", () => {
    expect(checkTemplate(STARTER_TEMPLATE.body, cfg.variables)).toEqual([]);
  });

  it("mengganti placeholder, termasuk di dalam tabel", () => {
    const input = parseTemplateInput(cfg, {
      nama: "Dhuha",
      minggu: 3,
      target: "Lari 5K",
      catatan: null,
    });
    const out = texts(fillTemplate(STARTER_TEMPLATE.body, cfg, input));
    expect(out).toContain("Rencana Mingguan Dhuha");
    expect(out).toContain("Minggu ke-3 · Target: Lari 5K");
    expect(out).toContain("Senin");
  });

  it("bagian bersyarat dibuang bila isian kosong, tampil bila terisi", () => {
    const empty = parseTemplateInput(cfg, { nama: "A", minggu: 1, target: "B", catatan: null });
    expect(texts(fillTemplate(STARTER_TEMPLATE.body, cfg, empty)).join("|")).not.toContain(
      "Catatan:",
    );
    const filled = parseTemplateInput(cfg, {
      nama: "A",
      minggu: 1,
      target: "B",
      catatan: "tidur cukup",
    });
    const out = texts(fillTemplate(STARTER_TEMPLATE.body, cfg, filled));
    expect(out).toContain("Catatan: tidur cukup");
    expect(out.join("|")).not.toContain("{{");
  });

  it("isian berisi placeholder tidak dikembangkan lagi", () => {
    const input = parseTemplateInput(cfg, {
      nama: "{{target}}",
      minggu: 1,
      target: "RAHASIA",
      catatan: null,
    });
    expect(texts(fillTemplate(STARTER_TEMPLATE.body, cfg, input))).toContain(
      "Rencana Mingguan {{target}}",
    );
  });

  it("checkTemplate melaporkan kunci tak dikenal dan blok if yang tidak seimbang", () => {
    const doc: EbookDoc = {
      type: "doc",
      content: [para("Halo {{tidak_ada}}"), para("{{#if nama}}")],
    };
    const problems = checkTemplate(doc, cfg.variables);
    expect(problems.some((p) => p.includes("tidak_ada"))).toBe(true);
    expect(problems.some((p) => p.includes("belum ditutup"))).toBe(true);
  });

  it("hasil template yang meledak ukurannya ditolak", () => {
    const big: EbookDoc = {
      type: "doc",
      content: Array.from({ length: 300 }, () => para("{{nama}}".repeat(1000))),
    };
    const input = parseTemplateInput(cfg, {
      nama: "x".repeat(2000),
      minggu: 1,
      target: "t",
      catatan: null,
    });
    expect(() => fillTemplate(big, cfg, input)).toThrow(TemplateTooLargeError);
  });

  it("teks hasil dipotong 20.000 karakter tanpa membangun string raksasa", () => {
    const doc: EbookDoc = { type: "doc", content: [para("{{nama}}".repeat(4000))] };
    const input = parseTemplateInput(cfg, {
      nama: "y".repeat(2000),
      minggu: 1,
      target: "t",
      catatan: null,
    });
    expect(texts(fillTemplate(doc, cfg, input))[0]?.length).toBe(20_000);
  });

  it("nama file aman", () => {
    const input = parseTemplateInput(cfg, {
      nama: "../../etc/passwd",
      minggu: 1,
      target: "x",
      catatan: null,
    });
    const name = buildFileName(cfg, "Judul", input, "pdf");
    expect(name).toBe("Rencana Mingguan etcpasswd.pdf");
  });

  it("isian tidak valid ditolak", () => {
    expect(() => parseTemplateInput(cfg, { nama: "A", minggu: 99, target: "x" })).toThrow();
    expect(() => parseTemplateInput(cfg, { nama: "A", minggu: 1, target: "x", lain: 1 })).toThrow();
  });
});
