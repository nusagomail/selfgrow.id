/** Konversi blok sederhana konten demo (lihat ebooks.mjs) ke dokumen Tiptap. Murni, tanpa efek samping. */

/** Teks dengan **tebal** sederhana → node text Tiptap. */
export const text = (t) =>
  t
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**")
        ? { type: "text", text: part.slice(2, -2), marks: [{ type: "bold" }] }
        : { type: "text", text: part },
    );
const para = (t) => ({ type: "paragraph", content: text(t) });

/** Blok sederhana → node Tiptap yang lolos ebookDocSchema. */
export function toNode(b, ctx = {}) {
  if (typeof b === "string") return para(b);
  const [kind, value] = b;
  if (kind === "h") return { type: "heading", attrs: { level: 2 }, content: text(value) };
  if (kind === "h3") return { type: "heading", attrs: { level: 3 }, content: text(value) };
  if (kind === "quote") return { type: "blockquote", content: [para(value)] };
  if (kind === "hr") return { type: "horizontalRule" };
  if (kind === "img") {
    // ["img", nama, keterangan]: infografis isi buku, alamatnya dibuat oleh seed (D38).
    if (!ctx.image) throw new Error("Blok gambar butuh ctx.image");
    const [, name, caption] = b;
    return {
      type: "image",
      attrs: {
        src: ctx.image(name),
        alt: ctx.alt?.(name) ?? caption ?? "",
        title: caption ?? null,
      },
    };
  }
  if (kind === "table") {
    const [head, ...rows] = value;
    const row = (cells, cellType) => ({
      type: "tableRow",
      content: cells.map((c) => ({ type: cellType, content: [para(String(c))] })),
    });
    return {
      type: "table",
      content: [row(head, "tableHeader"), ...rows.map((r) => row(r, "tableCell"))],
    };
  }
  if (kind === "ul" || kind === "ol") {
    return {
      type: kind === "ul" ? "bulletList" : "orderedList",
      content: value.map((v) => ({
        type: "listItem",
        content: [para(v)],
      })),
    };
  }
  if (kind === "tip" || kind === "info" || kind === "warn") {
    return {
      type: "callout",
      attrs: { variant: kind === "warn" ? "warning" : kind },
      content: [para(value)],
    };
  }
  throw new Error(`Blok tidak dikenal: ${kind}`);
}
export const words = (blocks) =>
  JSON.stringify(blocks)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean).length;

export const toDoc = (blocks, ctx = {}) => ({
  type: "doc",
  content: blocks.map((b) => toNode(b, ctx)),
});
