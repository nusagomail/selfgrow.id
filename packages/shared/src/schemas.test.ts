import { describe, expect, it } from "vitest";
import { slugSchema } from "./schemas";

describe("slugSchema", () => {
  it("menerima slug yang rapi", () => {
    expect(slugSchema.safeParse("kalkulator-anggaran").success).toBe(true);
  });

  it("menolak huruf besar, spasi, dan karakter aneh", () => {
    for (const bad of ["Kalkulator", "dua kata", "a--b", "-awal", "<script>"]) {
      expect(slugSchema.safeParse(bad).success).toBe(false);
    }
  });
});
