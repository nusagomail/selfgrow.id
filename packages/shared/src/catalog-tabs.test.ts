import { describe, expect, it } from "vitest";
import { activeTypeTab, availableTypeTabs } from "./catalog-tabs";

const items = [{ type: "ebook" }, { type: "ebook" }, { type: "tool" }, { type: "template" }];

describe("tab jenis katalog (D44)", () => {
  it("hanya jenis yang punya konten, urut tetap, dengan jumlah", () => {
    expect(availableTypeTabs(items).map((t) => [t.param, t.count])).toEqual([
      ["ebook", 2],
      ["tools", 1],
      ["template", 1],
    ]);
  });

  it("parameter dikenal dipakai; selain itu jatuh ke tab pertama", () => {
    expect(activeTypeTab("tools", items)?.type).toBe("tool");
    expect(activeTypeTab("program", items)?.type).toBe("ebook");
    expect(activeTypeTab("aneh", items)?.type).toBe("ebook");
    expect(activeTypeTab(null, [{ type: "tool" }])?.type).toBe("tool");
    expect(activeTypeTab(null, [])).toBeNull();
  });

  it("tab Video baru tampil setelah minimal 3 video terbit (D54)", () => {
    const two = [...items, { type: "video" }, { type: "video" }];
    expect(availableTypeTabs(two).some((t) => t.type === "video")).toBe(false);
    expect(activeTypeTab("video", two)?.type).toBe("ebook");
    const three = [...two, { type: "video" }];
    expect(availableTypeTabs(three).at(-1)).toMatchObject({ param: "video", count: 3 });
    expect(activeTypeTab("video", three)?.type).toBe("video");
    // Halaman kategori & hasil cari: satu video pun tetap dikelompokkan.
    expect(availableTypeTabs([{ type: "video" }], { anyCount: true })).toHaveLength(1);
  });
});
