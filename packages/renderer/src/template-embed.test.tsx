import { type EbookDoc, ebookDocSchema } from "@selfgrow/shared";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EbookContent } from "./ebook";

const doc = (attrs: Record<string, unknown>) => ({
  type: "doc",
  content: [{ type: "toolEmbed", attrs }],
});

describe("kartu template di bab (D53)", () => {
  it("lolos skema dan menautkan ke halaman template, bukan merender tool", () => {
    const d = doc({ slug: "anggaran-bulanan", title: "Anggaran Bulanan", kind: "template" });
    expect(ebookDocSchema.safeParse(d).success).toBe(true);
    const out = renderToStaticMarkup(
      <EbookContent
        doc={d as EbookDoc}
        options={{
          renderTool: () => <div>TOOL</div>,
          templateHref: (s) => `/template/${s}`,
        }}
      />,
    );
    expect(out).toContain("Template siap unduh");
    expect(out).toContain('href="/template/anggaran-bulanan"');
    expect(out).not.toContain("TOOL");
  });

  it("tanpa templateHref tampil tanpa tautan", () => {
    const d = doc({ slug: "anggaran-bulanan", title: "Anggaran", kind: "template" });
    const out = renderToStaticMarkup(<EbookContent doc={d as EbookDoc} />);
    expect(out).not.toContain("href=");
  });

  it("jenis tak dikenal dan slug berbahaya ditolak skema", () => {
    expect(ebookDocSchema.safeParse(doc({ slug: "x", kind: "video" })).success).toBe(false);
    expect(
      ebookDocSchema.safeParse(doc({ slug: "javascript:alert(1)", kind: "template" })).success,
    ).toBe(false);
  });
});
