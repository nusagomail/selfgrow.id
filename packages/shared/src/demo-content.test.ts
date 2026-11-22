/**
 * Konten demo staging (scripts/demo) harus lolos skema dokumen ebook yang sama dengan Studio,
 * supaya reader tidak menolak bab yang diisi lewat skrip seed.
 */
import { describe, expect, it } from "vitest";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { toDoc as toDocJs } from "../../../scripts/demo/blocks.mjs";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { FULL_BOOKS as FULL_JS } from "../../../scripts/demo/books/index.mjs";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { catalogBooks as catalogJs } from "../../../scripts/demo/catalog.mjs";
// @ts-expect-error -- modul JS di luar paket, tanpa deklarasi tipe
import { DEMO_TOOLS as TOOLS_JS } from "../../../scripts/demo/tools.mjs";
import { ebookDocSchema } from "./ebook";
import { ebookThemeSchema } from "./ebook-theme";
import { toolConfigSchema } from "./tool";

type Book = { slug: string; title: string; category: string; topic: string };
type Full = Record<
  string,
  { chapters: { title: string; blocks: unknown[] }[]; figures: Record<string, { alt: string }> }
>;
const books = (catalogJs as () => Book[])();
const FULL = FULL_JS as Full;
const toDoc = toDocJs as (
  blocks: unknown[],
  ctx?: { image?: (n: string) => string; alt?: (n: string) => string | undefined },
) => unknown;

describe("katalog demo", () => {
  it("100 judul, 10 per kategori, slug unik", () => {
    expect(books).toHaveLength(100);
    expect(new Set(books.map((b) => b.slug)).size).toBe(100);
    const perCat = new Map<string, number>();
    for (const b of books) perCat.set(b.category, (perCat.get(b.category) ?? 0) + 1);
    expect([...perCat.values()]).toEqual(Array(10).fill(10));
    for (const b of books) expect(b.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    for (const b of books) expect(b.topic).toMatch(/^top_[a-z0-9-]+$/);
  });

  for (const [slug, full] of Object.entries(FULL)) {
    it(`${slug}: semua bab lolos skema, gambar memakai alamat aset`, () => {
      expect(books.some((b) => b.slug === slug)).toBe(true);
      const used = new Set<string>();
      for (const ch of full.chapters) {
        const doc = toDoc(ch.blocks, {
          image: (n) => {
            expect(full.figures[n], `gambar ${n}`).toBeDefined();
            used.add(n);
            return "/api/v1/assets/00000000-0000-4000-a000-000000000000";
          },
          alt: (n) => full.figures[n]?.alt,
        });
        const r = ebookDocSchema.safeParse(doc);
        expect(r.success, `${slug} / ${ch.title}`).toBe(true);
      }
      expect(used.size).toBe(Object.keys(full.figures).length);
    });
  }

  it("setiap ebook punya tema baca sendiri yang valid (D51)", () => {
    const combos = new Set<string>();
    for (const [slug, full] of Object.entries(FULL as Record<string, { theme?: unknown }>)) {
      const r = ebookThemeSchema.safeParse(full.theme);
      expect(r.success, `tema ${slug}`).toBe(true);
      if (r.success) {
        const { heading, callout, ornament, paper, accent } = r.data;
        const key = `${heading}/${callout}/${ornament}/${paper}`;
        expect(combos.has(key), `kombinasi tema ${slug} sama dengan buku lain`).toBe(false);
        combos.add(key);
        expect(accent).toMatch(/^#[0-9a-f]{6}$/i);
      }
    }
  });

  it("tool demo valid dan setiap tool yang ditanam di ebook tersedia", () => {
    const tools = TOOLS_JS as { slug: string; config: unknown }[];
    for (const t of tools) {
      const r = toolConfigSchema.safeParse(t.config);
      expect(r.success, `${t.slug}: ${JSON.stringify(r.error?.issues)}`).toBe(true);
    }
    const slugs = new Set(tools.map((t) => t.slug));
    const embedded = JSON.stringify(FULL).match(/"tool","([a-z0-9-]+)"/g) ?? [];
    for (const m of embedded) expect(slugs.has(m.split('"')[3] ?? "")).toBe(true);
    expect(embedded.length).toBeGreaterThan(0);
  });

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
