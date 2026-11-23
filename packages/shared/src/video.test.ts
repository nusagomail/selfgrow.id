import { describe, expect, it } from "vitest";
import {
  createVideoBodySchema,
  formatDuration,
  sniffVideo,
  updateVideoMetaBodySchema,
} from "./video";

describe("Video Edukasi (D54)", () => {
  it("format durasi", () => {
    expect(formatDuration(365)).toBe("6:05");
    expect(formatDuration(59)).toBe("0:59");
    expect(formatDuration(3723)).toBe("1:02:03");
    expect(formatDuration(0)).toBeNull();
    expect(formatDuration(null)).toBeNull();
  });

  it("mengenali MP4 dan WebM dari byte awal, menolak selainnya", () => {
    const mp4 = new Uint8Array([0, 0, 0, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]);
    expect(sniffVideo(mp4)).toBe("video/mp4");
    expect(sniffVideo(new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 1]))).toBe("video/webm");
    expect(
      sniffVideo(new Uint8Array([0x3c, 0x68, 0x74, 0x6d, 0x6c, 0x3e, 0, 0, 0, 0, 0, 0])),
    ).toBeNull();
    expect(sniffVideo(new Uint8Array())).toBeNull();
  });

  it("validasi body Studio", () => {
    expect(createVideoBodySchema.safeParse({ title: "A", slug: "a-b" }).success).toBe(true);
    expect(createVideoBodySchema.safeParse({ title: "A", slug: "A B" }).success).toBe(false);
    expect(updateVideoMetaBodySchema.safeParse({ durationSeconds: 300 }).success).toBe(true);
    expect(updateVideoMetaBodySchema.safeParse({ durationSeconds: -1 }).success).toBe(false);
    expect(updateVideoMetaBodySchema.safeParse({ durationSeconds: null }).success).toBe(true);
  });
});
