import type { EbookDoc, EbookMark, EbookNode } from "@selfgrow/shared";

/**
 * Bersihkan teks untuk semua format file: buang karakter kontrol (kecuali baris baru),
 * U+FFFE/U+FFFF, dan separuh karakter (surrogate tunggal) yang membuat Word/Excel menolak file.
 */
export function cleanText(s: string): string {
  return (
    s
      // biome-ignore lint/suspicious/noControlCharactersInRegex: karakter kontrol sengaja dibuang
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\uFFFE\uFFFF]/g, "")
      .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, "")
  );
}

/** Potong teks per karakter utuh (tidak membelah emoji). */
export function sliceChars(s: string, max: number): string {
  const chars = Array.from(s);
  return chars.length <= max ? s : chars.slice(0, max).join("");
}

/** Potongan teks berformat untuk generator dokumen. */
export interface Run {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
}

export type Block =
  | { kind: "heading"; level: 2 | 3 | 4; runs: Run[] }
  | { kind: "paragraph"; runs: Run[]; indent?: number; quote?: boolean; callout?: boolean }
  | { kind: "listItem"; runs: Run[]; ordered: boolean; index: number; depth: number }
  | { kind: "rule" }
  | { kind: "table"; rows: { header: boolean; cells: string[] }[] };

const markFlags = (marks: EbookMark[] | undefined) => ({
  bold: marks?.some((m) => m.type === "bold"),
  italic: marks?.some((m) => m.type === "italic"),
  underline: marks?.some((m) => m.type === "underline"),
  strike: marks?.some((m) => m.type === "strike"),
});

function runsOf(nodes: EbookNode[] | undefined): Run[] {
  const out: Run[] = [];
  for (const n of nodes ?? []) {
    if (n.type === "text") out.push({ text: cleanText(n.text), ...markFlags(n.marks) });
    else if (n.type === "hardBreak") out.push({ text: "\n" });
    else if (n.type === "image")
      out.push({ text: `[Gambar${n.attrs.alt ? `: ${n.attrs.alt}` : ""}]` });
  }
  return out;
}

export const plain = (nodes: EbookNode[] | undefined): string =>
  (nodes ?? [])
    .map((n) =>
      n.type === "text"
        ? n.text
        : "content" in n && Array.isArray(n.content)
          ? plain(n.content)
          : "",
    )
    .join(paragraphSeparator(nodes));
const paragraphSeparator = (nodes: EbookNode[] | undefined) =>
  nodes?.some((n) => n.type === "paragraph") ? "\n" : "";

/** Ratakan dokumen JSON menjadi blok sederhana yang mudah ditulis ke DOCX/PDF/XLSX. */
export function toBlocks(doc: EbookDoc): Block[] {
  const blocks: Block[] = [];
  const visit = (
    nodes: EbookNode[] | undefined,
    ctx: { quote?: boolean; callout?: boolean; depth: number },
  ) => {
    for (const n of nodes ?? []) {
      switch (n.type) {
        case "heading":
          blocks.push({ kind: "heading", level: n.attrs.level, runs: runsOf(n.content) });
          break;
        case "paragraph":
          blocks.push({
            kind: "paragraph",
            runs: runsOf(n.content),
            quote: ctx.quote,
            callout: ctx.callout,
          });
          break;
        case "blockquote":
          visit(n.content, { ...ctx, quote: true });
          break;
        case "callout":
          visit(n.content, { ...ctx, callout: true });
          break;
        case "horizontalRule":
          blocks.push({ kind: "rule" });
          break;
        case "image":
          blocks.push({ kind: "paragraph", runs: runsOf([n]) });
          break;
        case "bulletList":
        case "orderedList": {
          let i = n.type === "orderedList" ? (n.attrs?.start ?? 1) : 1;
          for (const item of n.content) {
            if (item.type !== "listItem") continue;
            const [first, ...rest] = item.content;
            blocks.push({
              kind: "listItem",
              ordered: n.type === "orderedList",
              index: i++,
              depth: ctx.depth,
              runs: first && first.type === "paragraph" ? runsOf(first.content) : [],
            });
            visit(rest, { ...ctx, depth: ctx.depth + 1 });
          }
          break;
        }
        case "table":
          blocks.push({
            kind: "table",
            rows: n.content
              .filter((r) => r.type === "tableRow")
              .map((r) => {
                const cells = (r as { content: EbookNode[] }).content;
                return {
                  header: cells.every((c) => c.type === "tableHeader"),
                  cells: cells.map((c) => ("content" in c ? plain(c.content as EbookNode[]) : "")),
                };
              }),
          });
          break;
        default:
          break;
      }
    }
  };
  visit(doc.content, { depth: 0 });
  return blocks;
}

export interface DocMeta {
  title: string;
  /** ID pelanggan disisipkan di metadata file (BLUEPRINT bagian 5 & 8). */
  userId: string;
  generatedAt: Date;
}
