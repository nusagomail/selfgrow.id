import type { EbookDoc } from "@selfgrow/shared";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { type Block, type DocMeta, type Run, toBlocks } from "./walk";

const textRuns = (runs: Run[]) =>
  runs.flatMap((r) =>
    r.text.split("\n").map(
      (part, i) =>
        new TextRun({
          text: part,
          break: i > 0 ? 1 : undefined,
          bold: r.bold,
          italics: r.italic,
          underline: r.underline ? {} : undefined,
          strike: r.strike,
        }),
    ),
  );

const HEADING = {
  2: HeadingLevel.HEADING_1,
  3: HeadingLevel.HEADING_2,
  4: HeadingLevel.HEADING_3,
} as const;

function blockToDocx(b: Block): (Paragraph | Table)[] {
  switch (b.kind) {
    case "heading":
      return [new Paragraph({ heading: HEADING[b.level], children: textRuns(b.runs) })];
    case "paragraph":
      return [
        new Paragraph({
          children: textRuns(b.runs),
          indent: b.quote ? { left: 480 } : undefined,
          shading: b.callout
            ? { type: ShadingType.CLEAR, fill: "E8F3E9", color: "auto" }
            : undefined,
          spacing: { after: 120 },
        }),
      ];
    case "listItem":
      return [
        new Paragraph({
          children: [new TextRun(b.ordered ? `${b.index}. ` : "• "), ...textRuns(b.runs)],
          indent: { left: 360 + b.depth * 360, hanging: 240 },
        }),
      ];
    case "rule":
      return [
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 1 } },
        }),
      ];
    case "table":
      return [
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: b.rows.map(
            (row) =>
              new TableRow({
                tableHeader: row.header,
                children: row.cells.map(
                  (cell) =>
                    new TableCell({
                      shading: row.header
                        ? { type: ShadingType.CLEAR, fill: "E8F3E9", color: "auto" }
                        : undefined,
                      children: cell.split("\n").map(
                        (line) =>
                          new Paragraph({
                            children: [new TextRun({ text: line, bold: row.header })],
                          }),
                      ),
                    }),
                ),
              }),
          ),
        }),
        new Paragraph({ text: "" }),
      ];
  }
}

export async function renderDocx(doc: EbookDoc, meta: DocMeta): Promise<Uint8Array> {
  const document = new Document({
    creator: "SelfGrow",
    title: meta.title,
    description: `Dibuat oleh SelfGrow untuk pelanggan ${meta.userId}`,
    keywords: `selfgrow:${meta.userId}`,
    lastModifiedBy: "SelfGrow",
    sections: [
      {
        children: [
          ...toBlocks(doc).flatMap(blockToDocx),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 240 },
            children: [new TextRun({ text: "Dibuat dengan SelfGrow", size: 16, color: "888888" })],
          }),
        ],
      },
    ],
  });
  return new Uint8Array(await Packer.toArrayBuffer(document));
}
