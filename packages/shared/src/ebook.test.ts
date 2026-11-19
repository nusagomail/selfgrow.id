import { describe, expect, it } from "vitest";
import { countWords, ebookDocSchema } from "./ebook";

const doc = (content: unknown[]) => ({ type: "doc", content });

describe("ebookDocSchema", () => {
  it("menerima dokumen yang valid", () => {
    const d = doc([
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Judul" }] },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Halo ", marks: [{ type: "bold" }] },
          {
            type: "text",
            text: "tautan",
            marks: [{ type: "link", attrs: { href: "https://selfgrow.id" } }],
          },
        ],
      },
      {
        type: "callout",
        attrs: { variant: "tip" },
        content: [{ type: "paragraph", content: [{ type: "text", text: "Tips" }] }],
      },
      { type: "image", attrs: { src: "/api/v1/assets/abc", alt: "x" } },
    ]);
    expect(ebookDocSchema.safeParse(d).success).toBe(true);
  });

  it("menolak tautan javascript:", () => {
    const d = doc([
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "x",
            marks: [{ type: "link", attrs: { href: "javascript:alert(1)" } }],
          },
        ],
      },
    ]);
    expect(ebookDocSchema.safeParse(d).success).toBe(false);
  });

  it("menolak node yang tidak dikenal (mis. HTML mentah)", () => {
    expect(ebookDocSchema.safeParse(doc([{ type: "html", html: "<script>" }])).success).toBe(false);
  });

  it("menolak gambar dari skema data:/http", () => {
    for (const src of ["data:image/png;base64,xx", "http://contoh.com/a.png"]) {
      expect(ebookDocSchema.safeParse(doc([{ type: "image", attrs: { src } }])).success).toBe(
        false,
      );
    }
  });

  it("menolak heading level 1 (judul bab dipegang sistem)", () => {
    const d = doc([{ type: "heading", attrs: { level: 1 }, content: [] }]);
    expect(ebookDocSchema.safeParse(d).success).toBe(false);
  });
});

describe("countWords", () => {
  it("menghitung kata di seluruh node", () => {
    const d = ebookDocSchema.parse(
      doc([
        { type: "paragraph", content: [{ type: "text", text: "satu dua  tiga" }] },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "empat" }] }],
            },
          ],
        },
      ]),
    );
    expect(countWords(d)).toBe(4);
  });
});
