import type { EbookDoc, EbookNode } from "@selfgrow/shared";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EbookContent } from "./ebook";
import { tableLayout } from "./table";

const p = (t: string): EbookNode => ({ type: "paragraph", content: [{ type: "text", text: t }] });
const row = (type: "tableHeader" | "tableCell", cells: string[]): EbookNode => ({
  type: "tableRow",
  content: cells.map((c) => ({ type, content: [p(c)] })),
});
const table = (head: string[] | null, rows: string[][]): EbookNode => ({
  type: "table",
  content: [...(head ? [row("tableHeader", head)] : []), ...rows.map((r) => row("tableCell", r))],
});

describe("tabel di buku", () => {
  it("4+ kolom dengan baris judul = lebar, label dari judul kolom", () => {
    const t = table(["Utang", "Sisa", "Cicilan", "Biaya"], [["Kartu", "Rp1", "Rp2", "3%"]]);
    expect(tableLayout(t)).toEqual({ wide: true, labels: ["Utang", "Sisa", "Cicilan", "Biaya"] });
  });

  it("3 kolom atau tanpa baris judul tetap tabel biasa", () => {
    expect(tableLayout(table(["A", "B", "C"], [["1", "2", "3"]])).wide).toBe(false);
    expect(tableLayout(table(null, [["1", "2", "3", "4"]]))).toEqual({ wide: false, labels: [] });
  });

  it("sel gabungan tidak dijadikan kartu", () => {
    const t = table(["A", "B", "C", "D"], [["1", "2", "3", "4"]]);
    const first = (t as { content: { content: { attrs?: unknown }[] }[] }).content[1]?.content[0];
    if (first) first.attrs = { colspan: 2 };
    expect(tableLayout(t).wide).toBe(false);
  });

  it("renderer menandai tabel lebar dan memberi label di setiap sel", () => {
    const doc: EbookDoc = {
      type: "doc",
      content: [table(["Utang", "Sisa", "Cicilan", "Biaya"], [["Kartu", "Rp1", "Rp2", "3%"]])],
    };
    const out = renderToStaticMarkup(<EbookContent doc={doc} />);
    expect(out).toContain('<table class="wide">');
    expect(out).toContain('<td data-label="Sisa">');
    expect(out).toContain('<th data-label="Utang">');
  });
});
