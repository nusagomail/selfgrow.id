import {
  fillTemplate,
  parseTemplateInput,
  STARTER_TEMPLATE,
  templateConfigSchema,
} from "@selfgrow/shared";
import { strFromU8, unzipSync } from "fflate";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { renderDocument } from "./index";
import { toWinAnsi } from "./pdf";
import { sanitizeCell } from "./xlsx";

const cfg = templateConfigSchema.parse(STARTER_TEMPLATE.config);
const meta = {
  title: "Rencana Mingguan",
  userId: "user-123",
  generatedAt: new Date("2026-11-20T00:00:00Z"),
};
const filled = (nama: string, catatan: string | null = null) =>
  fillTemplate(
    STARTER_TEMPLATE.body,
    cfg,
    parseTemplateInput(cfg, { nama, minggu: 2, target: "Lari 5K 🏃", catatan }),
  );

describe("generator dokumen", () => {
  it("DOCX: isi terisi dan ID pelanggan di metadata", async () => {
    const bytes = await renderDocument("docx", filled("Dhuha"), meta);
    const zip = unzipSync(bytes);
    const body = strFromU8(zip["word/document.xml"] as Uint8Array);
    expect(body).toContain("Rencana Mingguan Dhuha");
    expect(body).toContain("Senin");
    expect(strFromU8(zip["docProps/core.xml"] as Uint8Array)).toContain("selfgrow:user-123");
  });

  it("PDF: valid, metadata berisi ID pelanggan, emoji tidak membuat gagal", async () => {
    const bytes = await renderDocument("pdf", filled("Dhuha", "tidur cukup"), meta);
    expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe("%PDF-");
    const loaded = await PDFDocument.load(bytes);
    expect(loaded.getKeywords()).toContain("selfgrow:user-123");
    expect(loaded.getSubject()).toContain("user-123");
    expect(loaded.getPageCount()).toBeGreaterThan(0);
  });

  it("XLSX: tabel jadi sheet, metadata, dan sel berbahaya dinetralkan", async () => {
    const cell = (text: string) => ({
      type: "tableCell" as const,
      content: [{ type: "paragraph" as const, content: [{ type: "text" as const, text }] }],
    });
    const doc = {
      type: "doc" as const,
      content: [
        {
          type: "table" as const,
          content: [
            { type: "tableRow" as const, content: [cell("Senin"), cell("=1+1"), cell("1500")] },
          ],
        },
      ],
    };
    const zip = unzipSync(await renderDocument("xlsx", doc, meta));
    const sheet = strFromU8(zip["xl/worksheets/sheet1.xml"] as Uint8Array);
    expect(sheet).toContain("Senin");
    expect(sheet).toContain('<t xml:space="preserve">\'=1+1</t>');
    expect(sheet).toContain("<v>1500</v>");
    expect(sheet).not.toContain("<f>");
    expect(strFromU8(zip["docProps/core.xml"] as Uint8Array)).toContain("selfgrow:user-123");
    const full = unzipSync(await renderDocument("xlsx", filled("Dhuha"), meta));
    expect(Object.keys(full).filter((n) => n.startsWith("xl/worksheets/"))).toHaveLength(2);
  });

  it("sanitizeCell menetralkan awalan formula", () => {
    for (const v of ["=1+1", "+1", "-1", "@SUM(A1)", "\t=x", "\r=x"]) {
      expect(sanitizeCell(v).startsWith("'")).toBe(true);
    }
    expect(sanitizeCell("Senin")).toBe("Senin");
  });

  it("toWinAnsi membuang karakter di luar font standar", () => {
    expect(toWinAnsi("Lari 5K 🏃 – “ok”")).toBe("Lari 5K  – “ok”");
  });
});
