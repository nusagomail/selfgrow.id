import { describe, expect, it } from "vitest";
import { currentProgramDay, programDayDate, saveProgramBodySchema } from "./program";

describe("program", () => {
  it("hari program mengikuti kalender WIB, bukan 24 jam", () => {
    // Daftar 23:30 WIB (16:30 UTC); 30 menit kemudian sudah hari ke-2.
    const start = new Date("2026-11-20T16:30:00Z");
    expect(currentProgramDay(start, new Date("2026-11-20T16:45:00Z"))).toBe(1);
    expect(currentProgramDay(start, new Date("2026-11-20T17:05:00Z"))).toBe(2);
    expect(currentProgramDay(start, new Date("2026-11-29T17:05:00Z"))).toBe(11);
  });

  it("tanggal buka hari ke-N", () => {
    const start = new Date("2026-11-20T03:00:00Z");
    expect(programDayDate(start, 1)).toBe("2026-11-20");
    expect(programDayDate(start, 30)).toBe("2026-12-19");
  });

  it("validasi langkah: hari ganda & melebihi durasi ditolak", () => {
    const day = (d: number) => ({
      day: d,
      title: `Hari ${d}`,
      items: [{ type: "task", text: "x" }],
    });
    expect(
      saveProgramBodySchema.safeParse({ durationDays: 30, steps: [day(1), day(2)] }).success,
    ).toBe(true);
    expect(
      saveProgramBodySchema.safeParse({ durationDays: 30, steps: [day(1), day(1)] }).success,
    ).toBe(false);
    expect(saveProgramBodySchema.safeParse({ durationDays: 7, steps: [day(8)] }).success).toBe(
      false,
    );
  });
});
