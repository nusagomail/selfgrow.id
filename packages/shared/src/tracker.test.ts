import { describe, expect, it } from "vitest";
import { TOOL_PRESETS, toolConfigSchema } from "./tool";
import { addDays, computeStreak, isEntryDateAllowed, todayWib } from "./tracker";

describe("tanggal WIB", () => {
  it("hari ini menurut WIB, bukan UTC", () => {
    // 2026-11-19 20:00 UTC = 2026-11-20 03:00 WIB
    expect(todayWib(new Date("2026-11-19T20:00:00Z"))).toBe("2026-11-20");
  });

  it("rentang tanggal entri: hari ini sampai 7 hari ke belakang", () => {
    const now = new Date("2026-11-20T05:00:00Z");
    expect(isEntryDateAllowed("2026-11-20", now)).toBe(true);
    expect(isEntryDateAllowed("2026-11-13", now)).toBe(true);
    expect(isEntryDateAllowed("2026-11-12", now)).toBe(false);
    expect(isEntryDateAllowed("2026-11-21", now)).toBe(false);
    expect(isEntryDateAllowed("2026-02-30", now)).toBe(false);
    expect(isEntryDateAllowed("20261120", now)).toBe(false);
  });

  it("addDays melewati batas bulan/tahun", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });
});

describe("computeStreak", () => {
  const today = "2026-11-20";
  it("kosong", () => {
    expect(computeStreak([], today)).toEqual({ current: 0, longest: 0, lastEntryDate: null });
  });
  it("berturut-turut sampai hari ini", () => {
    expect(computeStreak(["2026-11-18", "2026-11-20", "2026-11-19"], today)).toMatchObject({
      current: 3,
      longest: 3,
    });
  });
  it("masih berjalan bila terakhir kemarin", () => {
    expect(computeStreak(["2026-11-18", "2026-11-19"], today).current).toBe(2);
  });
  it("putus bila terakhir 2 hari lalu, rekor tetap tersimpan", () => {
    expect(computeStreak(["2026-11-10", "2026-11-11", "2026-11-12", "2026-11-18"], today)).toEqual({
      current: 0,
      longest: 3,
      lastEntryDate: "2026-11-18",
    });
  });
  it("mengisi hari yang terlewat menyambung streak", () => {
    expect(computeStreak(["2026-11-18", "2026-11-20"], today).current).toBe(1);
    expect(computeStreak(["2026-11-18", "2026-11-19", "2026-11-20"], today).current).toBe(3);
  });
});

describe("preset tracker", () => {
  it("valid", () => {
    expect(toolConfigSchema.safeParse(TOOL_PRESETS.habit_daily).success).toBe(true);
  });
});
