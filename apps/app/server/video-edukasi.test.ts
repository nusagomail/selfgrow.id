/**
 * Video Edukasi (D54): Studio (admin saja), syarat terbit, dan aturan tonton gratis/berbayar
 * yang sama dengan ebook. Berkas berbayar hanya untuk pelanggan aktif, tanpa cache publik.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";

const json = (body: unknown) => ({
  body: JSON.stringify(body),
  headers: { "content-type": "application/json" },
});

// MP4 mini: kotak `ftyp` lalu isi acak.
const MP4 = new Uint8Array([
  0,
  0,
  0,
  0x18,
  0x66,
  0x74,
  0x79,
  0x70,
  0x69,
  0x73,
  0x6f,
  0x6d,
  ...Array.from({ length: 88 }, (_, i) => i),
]);
const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4]);

type Admin = Awaited<ReturnType<typeof createUser>>;

async function createVideo(admin: Admin) {
  const slug = `vid-${crypto.randomUUID().slice(0, 8)}`;
  const r = await call("/api/v1/studio/videos", {
    method: "POST",
    token: admin.token,
    ...json({ title: "Atur Gaji dalam 5 Menit", slug, summary: "Video singkat." }),
  });
  expect(r.status).toBe(201);
  const { id } = (await r.json()) as { id: string };
  return { id, slug };
}

const upload = (admin: Admin, id: string, bytes: Uint8Array) =>
  call(`/api/v1/studio/videos/${id}/file`, {
    method: "PUT",
    token: admin.token,
    body: bytes,
    headers: { "content-type": "video/mp4", "content-length": String(bytes.length) },
  });

const publish = (admin: Admin, id: string, extra: Record<string, unknown> = {}) =>
  call(`/api/v1/studio/content/${id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ status: "published", ...extra }),
  });

/** Video terbit lengkap dengan berkas & poster. */
async function publishedVideo(tier: "all" | "free" = "all") {
  const admin = await createUser({ role: "admin" });
  const v = await createVideo(admin);
  expect((await upload(admin, v.id, MP4)).status).toBe(200);
  const poster = await call(`/api/v1/studio/videos/${v.id}/poster`, {
    method: "PUT",
    token: admin.token,
    body: PNG,
  });
  expect(poster.status).toBe(200);
  await call(`/api/v1/studio/videos/${v.id}`, {
    method: "PUT",
    token: admin.token,
    ...json({ durationSeconds: 305 }),
  });
  expect((await publish(admin, v.id, { tier })).status).toBe(200);
  const def = await env.DB.prepare(
    "SELECT video_asset_id AS v, poster_asset_id AS p FROM video_definitions WHERE content_id = ?",
  )
    .bind(v.id)
    .first<{ v: string; p: string }>();
  return {
    admin,
    ...v,
    streamUrl: `/api/v1/videos/${def?.v}`,
    posterUrl: `/api/v1/assets/${def?.p}`,
  };
}

describe("Studio video (D54)", () => {
  it("hanya admin yang bisa membuat dan mengunggah", async () => {
    const member = await createUser();
    const r = await call("/api/v1/studio/videos", {
      method: "POST",
      token: member.token,
      ...json({ title: "X", slug: "x-video" }),
    });
    expect(r.status).toBe(403);
    const admin = await createUser({ role: "admin" });
    const v = await createVideo(admin);
    expect((await upload(member, v.id, MP4)).status).toBe(403);
    expect((await call(`/api/v1/studio/videos/${v.id}`)).status).toBe(401);
  });

  it("slug ganda ditolak, berkas bukan video ditolak dari byte awalnya", async () => {
    const admin = await createUser({ role: "admin" });
    const v = await createVideo(admin);
    const dup = await call("/api/v1/studio/videos", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Lagi", slug: v.slug }),
    });
    expect(dup.status).toBe(409);
    const html = new TextEncoder().encode("<html><script>alert(1)</script></html>");
    expect((await upload(admin, v.id, html)).status).toBe(415);
  });

  it("tidak bisa terbit sebelum berkas diunggah; unggah ulang mengganti berkas lama", async () => {
    const admin = await createUser({ role: "admin" });
    const v = await createVideo(admin);
    const early = await publish(admin, v.id);
    expect(early.status).toBe(400);
    expect(((await early.json()) as { error: string }).error).toBe("invalid_video");

    expect((await upload(admin, v.id, MP4)).status).toBe(200);
    const first = await env.DB.prepare(
      "SELECT video_asset_id AS v FROM video_definitions WHERE content_id = ?",
    )
      .bind(v.id)
      .first<{ v: string }>();
    expect((await upload(admin, v.id, MP4)).status).toBe(200);
    const gone = await env.DB.prepare("SELECT id FROM assets WHERE id = ?").bind(first?.v).first();
    expect(gone).toBeNull();

    const detail = (await (
      await call(`/api/v1/studio/videos/${v.id}`, { token: admin.token })
    ).json()) as { file: { size: number; mime: string } | null };
    expect(detail.file).toMatchObject({ size: MP4.length, mime: "video/mp4" });
    // Pratinjau admin jalan walau masih draft; publik belum bisa.
    const preview = await call(`/api/v1/studio/videos/${v.id}/file`, {
      token: admin.token,
      headers: { range: "bytes=0-11" },
    });
    expect(preview.status).toBe(206);
    expect((await publish(admin, v.id)).status).toBe(200);
  });

  it("berkas di atas batas ditolak 413 sebelum dibaca", async () => {
    const admin = await createUser({ role: "admin" });
    const v = await createVideo(admin);
    const r = await call(`/api/v1/studio/videos/${v.id}/file`, {
      method: "PUT",
      token: admin.token,
      body: MP4,
      headers: { "content-length": String(200 * 1024 * 1024) },
    });
    expect(r.status).toBe(413);
  });
});

describe("tonton video berbayar (D54)", () => {
  it("tanpa login 401, tanpa langganan 403, pelanggan aktif 200 tanpa cache publik", async () => {
    const v = await publishedVideo("all");
    expect((await call(v.streamUrl)).status).toBe(401);
    const member = await createUser();
    expect((await call(v.streamUrl, { token: member.token })).status).toBe(403);
    const expired = await createUser();
    await grantSubscription(expired.id, { status: "expired", periodEndOffsetDays: -10 });
    expect((await call(v.streamUrl, { token: expired.token })).status).toBe(403);

    const sub = await createUser();
    await grantSubscription(sub.id);
    const ok = await call(v.streamUrl, { token: sub.token });
    expect(ok.status).toBe(200);
    expect(ok.headers.get("cache-control")).toBe("private, no-store");
    expect(new Uint8Array(await ok.arrayBuffer())).toEqual(MP4);
    const part = await call(v.streamUrl, { token: sub.token, headers: { range: "bytes=4-7" } });
    expect(part.status).toBe(206);
  });

  it("akun beku 423 walau berlangganan", async () => {
    const v = await publishedVideo("all");
    const sub = await createUser();
    await grantSubscription(sub.id);
    await env.KV.put(
      `frozen:${sub.id}`,
      JSON.stringify({
        until: new Date(Date.now() + 3_600_000).toISOString(),
        reason: "scraping",
        chaptersPerHour: 99,
        chaptersPerDay: 99,
      }),
    );
    expect((await call(v.streamUrl, { token: sub.token })).status).toBe(423);
  });

  it("halaman tonton app: terkunci tanpa alamat berkas untuk non-pelanggan", async () => {
    const v = await publishedVideo("all");
    expect((await call(`/api/v1/watch/${v.slug}`)).status).toBe(401);
    const member = await createUser();
    const locked = (await (
      await call(`/api/v1/watch/${v.slug}`, { token: member.token })
    ).json()) as {
      locked: boolean;
      streamUrl: string | null;
      video: { durationSeconds: number; posterUrl: string };
    };
    expect(locked).toMatchObject({ locked: true, streamUrl: null });
    expect(locked.video.durationSeconds).toBe(305);
    const sub = await createUser();
    await grantSubscription(sub.id);
    const open = (await (await call(`/api/v1/watch/${v.slug}`, { token: sub.token })).json()) as {
      locked: boolean;
      streamUrl: string;
    };
    expect(open).toEqual(expect.objectContaining({ locked: false, streamUrl: v.streamUrl }));
  });

  it("katalog publik tidak membuka alamat berkas berbayar, poster tetap tampil", async () => {
    const v = await publishedVideo("all");
    const detail = (await (await call(`/api/v1/catalog/content/video/${v.slug}`)).json()) as {
      access: string;
      video: { streamUrl: string | null; posterUrl: string; durationSeconds: number };
    };
    expect(detail.access).toBe("premium");
    expect(detail.video).toEqual({ streamUrl: null, posterUrl: v.posterUrl, durationSeconds: 305 });
    expect((await call(v.posterUrl)).status).toBe(200);
  });
});

describe("tonton video gratis (D54)", () => {
  it("siapa saja boleh memutar, katalog memberi alamat berkas", async () => {
    const v = await publishedVideo("free");
    const r = await call(v.streamUrl);
    expect(r.status).toBe(200);
    expect(r.headers.get("cache-control")).toContain("public");
    const detail = (await (await call(`/api/v1/catalog/content/video/${v.slug}`)).json()) as {
      access: string;
      video: { streamUrl: string | null };
    };
    expect(detail).toMatchObject({ access: "free", video: { streamUrl: v.streamUrl } });
    const member = await createUser();
    const page = (await (
      await call(`/api/v1/watch/${v.slug}`, { token: member.token })
    ).json()) as {
      locked: boolean;
    };
    expect(page.locked).toBe(false);
  });

  it("video kembali ke draft → berkas & halaman tonton 404", async () => {
    const v = await publishedVideo("free");
    await call(`/api/v1/studio/content/${v.id}`, {
      method: "PATCH",
      token: v.admin.token,
      ...json({ status: "draft" }),
    });
    expect((await call(v.streamUrl)).status).toBe(404);
    const member = await createUser();
    expect((await call(`/api/v1/watch/${v.slug}`, { token: member.token })).status).toBe(404);
  });
});
