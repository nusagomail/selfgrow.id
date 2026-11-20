/**
 * Konten demo staging (scripts/demo) harus lolos skema dokumen ebook yang sama dengan Studio,
 * supaya reader tidak menolak bab yang diisi lewat skrip seed.
 */
import { describe, expect, it } from "vitest";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { toDoc as toDocJs } from "../../../scripts/demo/blocks.mjs";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { EBOOKS as EBOOKS_JS } from "../../../scripts/demo/ebooks.mjs";
import { ebookDocSchema } from "./ebook";

type Demo = { slug: string; chapters: { title: string; blocks: unknown[] }[] };
const EBOOKS = EBOOKS_JS as Demo[];
const toDoc = toDocJs as (blocks: unknown[]) => unknown;

describe("konten demo", () => {
  it("slug unik dan setiap ebook punya bab", () => {
    expect(new Set(EBOOKS.map((e) => e.slug)).size).toBe(EBOOKS.length);
    for (const e of EBOOKS) expect(e.chapters.length).toBeGreaterThan(0);
  });

  for (const e of EBOOKS) {
    it(`${e.slug}: semua bab lolos skema`, () => {
      for (const ch of e.chapters) {
        const r = ebookDocSchema.safeParse(toDoc(ch.blocks));
        expect(r.success, `${e.slug} / ${ch.title}`).toBe(true);
      }
    });
  }

  it("teks tebal dan tabel diubah ke node yang benar", () => {
    const doc = toDoc([
      "a **b** c",
      [
        "table",
        [
          ["x", "y"],
          ["1", "2"],
        ],
      ],
    ]) as {
      content: { type: string; content: { type: string; marks?: unknown[] }[] }[];
    };
    const [para, table] = doc.content;
    expect(para?.content.map((n) => n.marks?.length ?? 0)).toEqual([0, 1, 0]);
    expect(table?.type).toBe("table");
    expect(table?.content).toHaveLength(2);
  });
});
