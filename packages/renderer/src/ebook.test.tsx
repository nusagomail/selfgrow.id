import type { EbookDoc } from "@selfgrow/shared";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { EbookContent } from "./ebook";

const html = (doc: EbookDoc, transformText?: (t: string) => string) =>
  renderToStaticMarkup(<EbookContent doc={doc} options={{ transformText }} />);

describe("EbookContent", () => {
  it("merender heading, paragraf, mark, dan callout", () => {
    const out = html({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Bab" }] },
        {
          type: "paragraph",
          content: [{ type: "text", text: "tebal", marks: [{ type: "bold" }] }],
        },
        {
          type: "callout",
          attrs: { variant: "tip" },
          content: [{ type: "paragraph", content: [{ type: "text", text: "tips" }] }],
        },
      ],
    });
    expect(out).toContain("<h2><span>Bab</span></h2>");
    expect(out).toContain("<strong>tebal</strong>");
    expect(out).toContain('class="callout callout-tip"');
  });

  it("teks berisi HTML ditampilkan sebagai teks, bukan dieksekusi", () => {
    const out = html({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "<img src=x onerror=alert(1)>" }] },
      ],
    });
    expect(out).not.toContain("<img");
    expect(out).toContain("&lt;img");
  });

  it("tautan tidak aman tidak dirender sebagai <a>", () => {
    const out = html({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            // Lapisan kedua: data yang lolos skema secara keliru tetap tidak menjadi tautan.
            {
              type: "text",
              text: "x",
              marks: [{ type: "link", attrs: { href: "javascript:alert(1)" } }],
            },
          ],
        },
      ],
    } as EbookDoc);
    expect(out).not.toContain("<a");
  });

  it("tautan aman diberi rel noopener", () => {
    const out = html({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "x", marks: [{ type: "link", attrs: { href: "https://a.id" } }] },
          ],
        },
      ],
    });
    expect(out).toContain('rel="noopener noreferrer nofollow"');
  });

  it("transformText dipakai untuk setiap teks", () => {
    const out = html(
      { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "abc" }] }] },
      (t) => t.toUpperCase(),
    );
    expect(out).toContain("ABC");
  });
});
