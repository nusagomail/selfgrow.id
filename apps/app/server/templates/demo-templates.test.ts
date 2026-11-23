import { fillTemplate, parseTemplateInput, saveTemplateBodySchema } from "@selfgrow/shared";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { DEMO_TEMPLATES } from "../../../../scripts/demo/templates.mjs";
import { renderDocument } from "./index";

type Demo = { slug: string; title: string; config: unknown; body: unknown };
const meta = { title: "Demo", userId: "user-1", generatedAt: new Date("2026-11-23T00:00:00Z") };

/** Template demo (D53) harus benar-benar bisa dibuat menjadi file di setiap format yang ditawarkan. */
describe("template demo menjadi file", () => {
  for (const t of DEMO_TEMPLATES as Demo[]) {
    it(t.slug, async () => {
      const { config, body } = saveTemplateBodySchema.parse({ config: t.config, body: t.body });
      // Semua isian terisi, termasuk opsional dan ya/tidak, supaya semua bagian bersyarat ikut.
      const input: Record<string, unknown> = {};
      for (const v of config.variables) {
        input[v.key] =
          v.type === "number"
            ? (v.min ?? 1)
            : v.type === "select"
              ? v.options?.[0]?.value
              : v.type === "boolean"
                ? true
                : "Isian contoh";
      }
      const doc = fillTemplate(body, config, parseTemplateInput(config, input));
      for (const format of config.outputFormats) {
        const bytes = await renderDocument(format, doc, meta);
        expect(bytes.byteLength, `${t.slug}.${format}`).toBeGreaterThan(1000);
        if (format === "pdf") {
          const pdf = await PDFDocument.load(bytes);
          expect(pdf.getPageCount()).toBeGreaterThan(0);
        }
      }
    });
  }
});
