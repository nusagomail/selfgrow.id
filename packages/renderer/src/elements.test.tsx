import { type EbookDoc, ebookDocSchema } from "@selfgrow/shared";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EbookContent } from "./ebook";

const para = (t: string) => ({
  type: "paragraph" as const,
  content: [{ type: "text" as const, text: t }],
});

describe("unsur buku (D40)", () => {
  it("kotak baru lolos skema dan tampil dengan label", () => {
    const doc = {
      type: "doc",
      content: (["reflect", "fact", "summary", "exercise"] as const).map((variant) => ({
        type: "callout",
        attrs: { variant },
        content: [para(variant)],
      })),
    };
    expect(ebookDocSchema.safeParse(doc).success).toBe(true);
    const out = renderToStaticMarkup(<EbookContent doc={doc as EbookDoc} />);
    for (const label of ["Renungkan", "Fakta", "Intisari", "Latihan"]) {
      expect(out).toContain(`<span class="callout-label" aria-hidden="true">${label}</span>`);
    }
    expect(out).toContain('aria-label="Renungkan"');
  });

  it("varian tak dikenal ditolak skema", () => {
    const doc = {
      type: "doc",
      content: [{ type: "callout", attrs: { variant: "promo" }, content: [para("x")] }],
    };
    expect(ebookDocSchema.safeParse(doc).success).toBe(false);
  });

  it("kutipan bertokoh tampil sebagai figure dengan nama tokoh", () => {
    const doc = {
      type: "doc",
      content: [
        {
          type: "blockquote",
          attrs: { cite: "Seneca" },
          content: [para("Kita lebih sering menderita dalam bayangan.")],
        },
        { type: "blockquote", attrs: { cite: null }, content: [para("tanpa tokoh")] },
        { type: "blockquote", content: [para("lama")] },
      ],
    };
    expect(ebookDocSchema.safeParse(doc).success).toBe(true);
    const out = renderToStaticMarkup(<EbookContent doc={doc as EbookDoc} />);
    expect(out).toContain('<figure class="quote"><blockquote>');
    expect(out).toContain("<figcaption>Seneca</figcaption>");
    expect(out.match(/<figure class="quote">/g)).toHaveLength(1);
  });

  it("nama tokoh terlalu panjang ditolak", () => {
    const doc = {
      type: "doc",
      content: [{ type: "blockquote", attrs: { cite: "x".repeat(201) }, content: [para("a")] }],
    };
    expect(ebookDocSchema.safeParse(doc).success).toBe(false);
  });
});
