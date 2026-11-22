import { describe, expect, it } from "vitest";
import { ebookThemeAttrs, ebookThemeSchema, parseEbookTheme } from "./ebook-theme";

describe("ebook theme (D51)", () => {
  it("mengisi bawaan", () => {
    const t = ebookThemeSchema.parse({ accent: "#b3261e" });
    expect(t).toMatchObject({ heading: "sans", callout: "soft", ornament: "line", paper: "plain" });
  });
  it("menolak warna dan pilihan yang tidak dikenal", () => {
    expect(ebookThemeSchema.safeParse({ accent: "red" }).success).toBe(false);
    expect(ebookThemeSchema.safeParse({ accent: "#000000", heading: "comic" }).success).toBe(false);
    // Nilai yang bisa menyelinap ke CSS ditolak.
    expect(ebookThemeSchema.safeParse({ accent: "#000000;background:url(x)" }).success).toBe(false);
  });
  it("membaca JSON tersimpan dengan aman", () => {
    expect(parseEbookTheme(null)).toBeNull();
    expect(parseEbookTheme("bukan json")).toBeNull();
    expect(parseEbookTheme('{"accent":"#123"}')).toBeNull();
    expect(parseEbookTheme('{"accent":"#123456","heading":"serif"}')?.heading).toBe("serif");
  });
  it("atribut dan variabel CSS", () => {
    expect(ebookThemeAttrs(null)).toEqual({ data: {}, vars: {} });
    const a = ebookThemeAttrs(ebookThemeSchema.parse({ accent: "#123456", callout: "tape" }));
    expect(a.data["data-callout"]).toBe("tape");
    expect(a.vars["--theme-accent"]).toBe("#123456");
    expect(a.vars["--theme-second"]).toBe("#123456");
  });
});
