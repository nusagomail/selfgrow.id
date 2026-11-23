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
  if (kind === "quote") {
    // ["quote", teks] atau ["quote", teks, tokoh] (kutipan bertokoh, D40).
    const cite = b[2] ?? null;
    return {
      type: "blockquote",
      ...(cite ? { attrs: { cite } } : {}),
      content: [para(value)],
    };
  }
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
  // Unsur interaktif (D42):
  //   ["quiz", attrs]                    → kuis/tes diri dengan skor langsung
  //   ["tool", slug, judul?, pengantar?] → tool yang ditanam
  //   ["chart", attrs]                   → grafik bergerak
  if (kind === "quiz") return { type: "quiz", attrs: value };
  if (kind === "tool")
    return { type: "toolEmbed", attrs: { slug: value, title: b[2] ?? null, intro: b[3] ?? null } };
  //   ["template", slug, judul, pengantar?] → kartu template siap unduh (D53)
  if (kind === "template")
    return {
      type: "toolEmbed",
      attrs: { slug: value, title: b[2] ?? null, intro: b[3] ?? null, kind: "template" },
    };
  if (kind === "chart") return { type: "animChart", attrs: value };
  // Unsur buku (D40):
  //   ["reflect", [pertanyaan..]]        → kotak Renungkan
  //   ["fact", teks, sumber]             → kotak Fakta, sumber di baris terakhir
  //   ["summary", [poin..]]              → kotak Intisari
  //   ["exercise", [langkah..], pengantar?] → kotak Latihan
  if (kind === "reflect" || kind === "summary") {
    return {
      type: "callout",
      attrs: { variant: kind },
      content: [
        {
          type: "bulletList",
          content: value.map((v) => ({ type: "listItem", content: [para(v)] })),
        },
      ],
    };
  }
  if (kind === "exercise") {
    const intro = b[2];
    return {
      type: "callout",
      attrs: { variant: "exercise" },
      content: [
        ...(intro ? [para(intro)] : []),
        {
          type: "orderedList",
          content: value.map((v) => ({ type: "listItem", content: [para(v)] })),
        },
      ],
    };
  }
  if (kind === "fact") {
    const source = b[2];
    return {
      type: "callout",
      attrs: { variant: "fact" },
      content: [para(value), ...(source ? [para(`Sumber: ${source}`)] : [])],
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
