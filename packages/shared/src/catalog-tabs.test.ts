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
});
