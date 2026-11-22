import { describe, expect, it } from "vitest";
import { TOOL_KINDS, toolKind, toolTone } from "./tool-card";

describe("toolKind", () => {
  it("menebak jenis dari judul", () => {
    expect(toolKind("Kalkulator Jatah Harian")).toBe("hitung");
    expect(toolKind("Penyusun Kartu Presentasi")).toBe("susun");
    expect(toolKind("Perakit Kalimat Menolak")).toBe("susun");
    expect(toolKind("Cek Tiga Tanda Burnout")).toBe("cek");
    expect(toolKind("Jadwal Lari 8 Minggu")).toBe("jadwal");
    expect(toolKind("Kapan Dana Daruratku Tercapai?")).toBe("jadwal");
    expect(toolKind("Catatan Setahun Terakhir")).toBe("catat");
    expect(toolKind("Kompas Nilai")).toBe("catat");
  });
  it("bawaan hitung untuk judul yang tidak dikenali", () => {
    expect(toolKind("Sesuatu yang Baru")).toBe("hitung");
    expect(TOOL_KINDS).toContain(toolKind(""));
  });
});

describe("toolTone", () => {
  it("stabil dan dalam rentang", () => {
    expect(toolTone("jatah-harian")).toBe(toolTone("jatah-harian"));
    for (const s of ["a", "kompas-nilai", "kalkulator-pace-5k"]) {
      const t = toolTone(s, 6);
      expect(t).toBeGreaterThanOrEqual(0);
      expect(t).toBeLessThan(6);
    }
  });
});
