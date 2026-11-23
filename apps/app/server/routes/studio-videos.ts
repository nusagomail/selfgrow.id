import { and, eq, schema } from "@selfgrow/db";
import {
  createVideoBodySchema,
  sniffVideo,
  updateVideoMetaBodySchema,
  VIDEO_MAX_BYTES,
  type z,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAccess, requireAdmin } from "../middleware/guards";
import { writeAudit } from "../services/audit";
import { COVER_MAX_BYTES, removeCoverAsset, sniffImage } from "../services/covers";
import { contentImageKey } from "./assets";
import { contentVideoKey, serveVideoObject } from "./videos";

async function parseBody<S extends z.ZodTypeAny>(req: Request, s: S) {
  const parsed = s.safeParse(await req.json().catch(() => null));
  return parsed.success ? (parsed.data as z.infer<S>) : null;
}

const IMAGE_EXT = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" } as const;

/** Path unggah berkas video, dikecualikan dari batas body 2 MB global (app.ts). */
export const VIDEO_UPLOAD_PATH = /^\/api\/v1\/studio\/videos\/[^/]+\/file$/;

async function loadVideo(db: AppEnv["Variables"]["db"], id: string) {
  const [item, def] = await Promise.all([
    db.query.contentItems.findFirst({
      where: and(eq(schema.contentItems.id, id), eq(schema.contentItems.type, "video")),
    }),
    db.query.videoDefinitions.findFirst({ where: eq(schema.videoDefinitions.contentId, id) }),
  ]);
  return item && def ? { item, def } : null;
}

/**
 * Byte pertama body (untuk cek jenis berkas) + aliran utuh yang mengulang byte itu, supaya
 * berkas besar langsung dialirkan ke R2 tanpa ditampung seluruhnya di memori Worker.
 */
async function peekStream(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let got = 0;
  let done = false;
  while (got < 16 && !done) {
    const r = await reader.read();
    if (r.done) done = true;
    else {
      chunks.push(r.value);
      got += r.value.length;
    }
  }
  const head = new Uint8Array(got);
  let o = 0;
  for (const ch of chunks) {
    head.set(ch, o);
    o += ch.length;
  }
  const stream = new ReadableStream<Uint8Array>({
    start(ctrl) {
      if (head.length) ctrl.enqueue(head);
      if (done) ctrl.close();
    },
    async pull(ctrl) {
      const r = await reader.read();
      if (r.done) ctrl.close();
      else ctrl.enqueue(r.value);
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
  return { head, stream };
}

/** Video Edukasi di Studio (D54): buat, unggah berkas & poster, catat durasi. */
export const studioVideos = new Hono<AppEnv>()
  .use(requireAccess, requireAdmin)
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .post("/", async (c) => {
    const body = await parseBody(c.req.raw, createVideoBodySchema);
    if (!body) return c.json({ error: "invalid_body" }, 400);
    const exists = await c.var.db.query.contentItems.findFirst({
      where: and(eq(schema.contentItems.type, "video"), eq(schema.contentItems.slug, body.slug)),
      columns: { id: true },
    });
    if (exists) return c.json({ error: "slug_taken" }, 409);
    const id = crypto.randomUUID();
    await c.var.db.batch([
      c.var.db.insert(schema.contentItems).values({
        id,
        type: "video",
        slug: body.slug,
        title: body.title,
        summary: body.summary ?? null,
        status: "draft",
      }),
      c.var.db.insert(schema.videoDefinitions).values({ contentId: id }),
    ]);
    await writeAudit(c, { action: "video.create", target: `content:${id}`, after: body });
    return c.json({ id }, 201);
  })

  .get("/:id", async (c) => {
    const v = await loadVideo(c.var.db, c.req.param("id"));
    if (!v) return c.json({ error: "not_found" }, 404);
    const file = v.def.videoAssetId
      ? await c.var.db.query.assets.findFirst({
          where: eq(schema.assets.id, v.def.videoAssetId),
          columns: { mime: true, size: true },
        })
      : null;
    return c.json({
      item: {
        id: v.item.id,
        slug: v.item.slug,
        title: v.item.title,
        summary: v.item.summary,
        status: v.item.status,
      },
      durationSeconds: v.def.durationSeconds,
      file: file ? { ...file, previewUrl: `/api/v1/studio/videos/${v.item.id}/file` } : null,
      posterUrl: v.def.posterAssetId ? `/api/v1/studio/videos/${v.item.id}/poster` : null,
    });
  })

  .put("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await parseBody(c.req.raw, updateVideoMetaBodySchema);
    if (!body) return c.json({ error: "invalid_body" }, 400);
    const v = await loadVideo(c.var.db, id);
    if (!v) return c.json({ error: "not_found" }, 404);
    await c.var.db.batch([
      c.var.db
        .update(schema.videoDefinitions)
        .set({ durationSeconds: body.durationSeconds })
        .where(eq(schema.videoDefinitions.contentId, id)),
      c.var.db
        .update(schema.contentItems)
        .set({ updatedAt: new Date() })
        .where(eq(schema.contentItems.id, id)),
    ]);
    await writeAudit(c, {
      action: "video.update",
      target: `content:${id}`,
      before: { durationSeconds: v.def.durationSeconds },
      after: body,
    });
    return c.json({ ok: true });
  })

  /** Pratinjau berkas untuk admin (juga saat masih draft), mendukung Range. */
  .get("/:id/file", async (c) => {
    const v = await loadVideo(c.var.db, c.req.param("id"));
    const asset = v?.def.videoAssetId
      ? await c.var.db.query.assets.findFirst({ where: eq(schema.assets.id, v.def.videoAssetId) })
      : null;
    if (!asset) return c.json({ error: "not_found" }, 404);
    return serveVideoObject(
      c.env.CONTENT,
      asset.r2Key,
      asset.mime,
      "private, no-store",
      c.req.header("range"),
    );
  })

  /**
   * Unggah berkas video (body = MP4/WebM mentah, maks VIDEO_MAX_BYTES). Jenis dicek dari byte
   * awal, bukan dari header klien. Menggantikan berkas lama.
   */
  .put("/:id/file", async (c) => {
    const id = c.req.param("id");
    const v = await loadVideo(c.var.db, id);
    if (!v) return c.json({ error: "not_found" }, 404);
    const length = Number(c.req.header("content-length") ?? "");
    if (!Number.isSafeInteger(length) || length <= 0) {
      return c.json({ error: "length_required" }, 411);
    }
    if (length > VIDEO_MAX_BYTES) return c.json({ error: "file_too_large" }, 413);
    const body = c.req.raw.body;
    if (!body) return c.json({ error: "empty_file" }, 400);
    const { head, stream } = await peekStream(body);
    const mime = sniffVideo(head);
    if (!mime) {
      await stream.cancel();
      return c.json({ error: "unsupported_video" }, 415);
    }

    const assetId = crypto.randomUUID();
    const key = contentVideoKey(id, assetId, mime === "video/mp4" ? "mp4" : "webm");
    // Panjang tetap: R2 butuh ukuran pasti, dan body yang tidak sesuai Content-Length ditolak.
    const fixed = new FixedLengthStream(length);
    const piping = stream.pipeTo(fixed.writable);
    try {
      await Promise.all([
        c.env.CONTENT.put(key, fixed.readable, { httpMetadata: { contentType: mime } }),
        piping,
      ]);
    } catch {
      await c.env.CONTENT.delete(key);
      return c.json({ error: "upload_failed" }, 400);
    }
    await c.var.db.batch([
      c.var.db.insert(schema.assets).values({
        id: assetId,
        r2Key: key,
        mime,
        size: length,
        uploadedBy: c.var.user?.id ?? null,
      }),
      c.var.db
        .update(schema.videoDefinitions)
        .set({ videoAssetId: assetId })
        .where(eq(schema.videoDefinitions.contentId, id)),
      c.var.db
        .update(schema.contentItems)
        .set({ updatedAt: new Date() })
        .where(eq(schema.contentItems.id, id)),
    ]);
    await removeCoverAsset(c.var.db, c.env.CONTENT, v.def.videoAssetId);
    await writeAudit(c, {
      action: "video.file",
      target: `content:${id}`,
      before: { videoAssetId: v.def.videoAssetId },
      after: { videoAssetId: assetId, size: length, mime },
    });
    return c.json({ ok: true, size: length, mime });
  })

  .get("/:id/poster", async (c) => {
    const v = await loadVideo(c.var.db, c.req.param("id"));
    const asset = v?.def.posterAssetId
      ? await c.var.db.query.assets.findFirst({ where: eq(schema.assets.id, v.def.posterAssetId) })
      : null;
    const obj = asset ? await c.env.CONTENT.get(asset.r2Key) : null;
    if (!asset || !obj) return c.json({ error: "not_found" }, 404);
    return new Response(obj.body, {
      headers: {
        "Content-Type": asset.mime,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  })

  /** Unggah poster (PNG/JPEG/WebP, maks 1,5 MB). Disimpan sebagai gambar konten (D38). */
  .put("/:id/poster", async (c) => {
    const id = c.req.param("id");
    const v = await loadVideo(c.var.db, id);
    if (!v) return c.json({ error: "not_found" }, 404);
    const bytes = new Uint8Array(await c.req.arrayBuffer());
    if (bytes.length === 0) return c.json({ error: "empty_file" }, 400);
    if (bytes.length > COVER_MAX_BYTES) return c.json({ error: "file_too_large" }, 413);
    const mime = sniffImage(bytes);
    if (!mime) return c.json({ error: "unsupported_image" }, 415);
    const assetId = crypto.randomUUID();
    const key = contentImageKey(id, assetId, IMAGE_EXT[mime]);
    await c.env.CONTENT.put(key, bytes, { httpMetadata: { contentType: mime } });
    await c.var.db.batch([
      c.var.db.insert(schema.assets).values({
        id: assetId,
        r2Key: key,
        mime,
        size: bytes.length,
        uploadedBy: c.var.user?.id ?? null,
      }),
      c.var.db
        .update(schema.videoDefinitions)
        .set({ posterAssetId: assetId })
        .where(eq(schema.videoDefinitions.contentId, id)),
    ]);
    await removeCoverAsset(c.var.db, c.env.CONTENT, v.def.posterAssetId);
    await writeAudit(c, {
      action: "video.poster",
      target: `content:${id}`,
      before: { posterAssetId: v.def.posterAssetId },
      after: { posterAssetId: assetId },
    });
    return c.json({ posterUrl: `/api/v1/studio/videos/${id}/poster` });
  });

/** Syarat terbit video: berkasnya sudah diunggah. */
export async function canPublishVideo(db: AppEnv["Variables"]["db"], id: string) {
  const def = await db.query.videoDefinitions.findFirst({
    where: eq(schema.videoDefinitions.contentId, id),
    columns: { videoAssetId: true },
  });
  return Boolean(def?.videoAssetId);
}
