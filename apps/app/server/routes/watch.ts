import { and, eq, inArray, schema } from "@selfgrow/db";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { FREE_TIER, requireAuth } from "../middleware/guards";
import { getAccessStatus } from "../services/entitlements";
import { inChunks } from "../services/programs";

/** Alamat poster & berkas Video Edukasi (D54). Poster = gambar konten publik (D38). */
export const videoMedia = (def: { videoAssetId: string | null; posterAssetId: string | null }) => ({
  streamUrl: def.videoAssetId ? `/api/v1/videos/${def.videoAssetId}` : null,
  posterUrl: def.posterAssetId ? `/api/v1/assets/${def.posterAssetId}` : null,
});

/** Durasi & poster Video Edukasi (D54) untuk kartu katalog. */
export async function videoInfo(
  db: AppEnv["Variables"]["db"],
  items: { id: string; type: string }[],
) {
  const ids = items.filter((i) => i.type === "video").map((i) => i.id);
  const rows = await inChunks(ids, (chunk) =>
    db
      .select()
      .from(schema.videoDefinitions)
      .where(inArray(schema.videoDefinitions.contentId, chunk)),
  );
  return new Map(
    rows.map((r) => [
      r.contentId,
      { durationSeconds: r.durationSeconds, posterUrl: videoMedia(r).posterUrl },
    ]),
  );
}

/**
 * Halaman tonton di app (D54): `GET /api/v1/watch/:slug`. Alamat berkas hanya diberikan bila
 * pengguna boleh menonton (gratis atau langganan aktif); berkasnya sendiri tetap dijaga di
 * `/api/v1/videos/:id`, jadi alamat yang bocor tidak membuka video berbayar.
 */
export const watch = new Hono<AppEnv>().use(requireAuth).get("/:slug", async (c) => {
  // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
  const user = c.var.user!;
  const item = await c.var.db.query.contentItems.findFirst({
    where: and(
      eq(schema.contentItems.type, "video"),
      eq(schema.contentItems.slug, c.req.param("slug")),
      eq(schema.contentItems.status, "published"),
    ),
  });
  const def = item
    ? await c.var.db.query.videoDefinitions.findFirst({
        where: eq(schema.videoDefinitions.contentId, item.id),
      })
    : null;
  if (!item || !def?.videoAssetId) return c.json({ error: "not_found" }, 404);
  const free = item.tier === FREE_TIER;
  const sub = await getAccessStatus(c.env.KV, c.var.db, user);
  const locked = !free && !sub.active;
  const media = videoMedia(def);
  c.header("Cache-Control", "private, no-store");
  return c.json({
    video: {
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      durationSeconds: def.durationSeconds,
      posterUrl: media.posterUrl,
    },
    free,
    locked,
    streamUrl: locked ? null : media.streamUrl,
  });
});
