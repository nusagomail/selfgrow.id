import { and, eq, schema } from "@selfgrow/db";
import {
  buildFileName,
  DEFAULT_DOWNLOAD_QUOTA,
  fillTemplate,
  generateTemplateBodySchema,
  parseTemplateInput,
  TemplateTooLargeError,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireActiveSubscription, requireAuth } from "../middleware/guards";
import { getSubscriptionStatus } from "../services/entitlements";
import { rateLimit } from "../services/protection";
import { type PublishedTemplate, readJson, templateKeys } from "../services/template-storage";
import { consumeQuota, currentPeriod } from "../services/usage";

// Generator DOCX/PDF/XLSX (library besar) dimuat hanya saat dibutuhkan, supaya route lain tetap ringan.
const loadGenerators = () => import("../templates");

/** Header unduhan: lampiran, nama file aman (RFC 5987), tanpa cache publik. */
export function attachmentHeaders(contentType: string, fileName: string): HeadersInit {
  const ascii = fileName.replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "_");
  return {
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  };
}

async function loadPublishedTemplate(
  db: AppEnv["Variables"]["db"],
  bucket: R2Bucket,
  slug: string,
) {
  const item = await db.query.contentItems.findFirst({
    where: and(
      eq(schema.contentItems.type, "template"),
      eq(schema.contentItems.slug, slug),
      eq(schema.contentItems.status, "published"),
    ),
  });
  if (!item) return null;
  const published = await readJson<PublishedTemplate>(bucket, templateKeys.published(item.id));
  return published ? { item, ...published } : null;
}

async function downloadsUsed(db: AppEnv["Variables"]["db"], userId: string) {
  const row = await db.query.usageCounters.findFirst({
    where: and(
      eq(schema.usageCounters.userId, userId),
      eq(schema.usageCounters.period, currentPeriod()),
      eq(schema.usageCounters.metric, "downloads"),
    ),
  });
  return row?.count ?? 0;
}

/**
 * Template pelanggan (BLUEPRINT bagian 5, D25): isi form, server membuat DOCX/PDF/XLSX dan
 * langsung mengirimkannya sebagai lampiran (tidak ada URL publik). Kuota unduh per bulan.
 */
export const templates = new Hono<AppEnv>()
  .use(requireAuth)

  .get("/:slug", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const tpl = await loadPublishedTemplate(c.var.db, c.env.CONTENT, c.req.param("slug"));
    if (!tpl) return c.json({ error: "not_found" }, 404);
    const sub = await getSubscriptionStatus(c.env.KV, c.var.db, user.id);
    c.header("Cache-Control", "private, no-store");
    return c.json({
      template: { slug: tpl.item.slug, title: tpl.item.title, summary: tpl.item.summary },
      variables: tpl.config.variables,
      formats: tpl.config.outputFormats,
      locked: !sub.active,
      usage: { used: await downloadsUsed(c.var.db, user.id), limit: DEFAULT_DOWNLOAD_QUOTA },
    });
  })

  .post("/:slug/generate", requireActiveSubscription, rateLimit("template"), async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const body = generateTemplateBodySchema.safeParse(await c.req.json().catch(() => null));
    if (!body.success) return c.json({ error: "invalid_body" }, 400);
    const tpl = await loadPublishedTemplate(c.var.db, c.env.CONTENT, c.req.param("slug"));
    if (!tpl) return c.json({ error: "not_found" }, 404);
    if (!tpl.config.outputFormats.includes(body.data.format)) {
      return c.json({ error: "format_not_available" }, 400);
    }

    let values: ReturnType<typeof parseTemplateInput>;
    try {
      values = parseTemplateInput(tpl.config, body.data.input);
    } catch (e) {
      const issues = (e as { issues?: { path: PropertyKey[]; message: string }[] }).issues ?? [];
      return c.json(
        {
          error: "invalid_input",
          issues: issues.map((i) => ({ path: i.path.map(String).join("."), message: i.message })),
        },
        400,
      );
    }

    // Tolak lebih awal bila kuota habis, sebelum membuat file (hemat CPU, review keamanan PR #11).
    if ((await downloadsUsed(c.var.db, user.id)) >= DEFAULT_DOWNLOAD_QUOTA) {
      return c.json({ error: "quota_exceeded", limit: DEFAULT_DOWNLOAD_QUOTA }, 429);
    }

    let filled: ReturnType<typeof fillTemplate>;
    try {
      filled = fillTemplate(tpl.body, tpl.config, values);
    } catch (e) {
      if (e instanceof TemplateTooLargeError) return c.json({ error: "template_too_large" }, 413);
      throw e;
    }
    const meta = { title: tpl.item.title, userId: user.id, generatedAt: new Date() };
    const { CONTENT_TYPES, renderDocument } = await loadGenerators();
    const bytes = await renderDocument(body.data.format, filled, meta);

    // Potong kuota hanya bila file berhasil dibuat.
    const used = await consumeQuota(c.var.db, user.id, "downloads", DEFAULT_DOWNLOAD_QUOTA);
    if (used === null)
      return c.json({ error: "quota_exceeded", limit: DEFAULT_DOWNLOAD_QUOTA }, 429);

    return new Response(bytes, {
      headers: {
        ...attachmentHeaders(
          CONTENT_TYPES[body.data.format],
          buildFileName(tpl.config, tpl.item.title, values, body.data.format),
        ),
        "X-Downloads-Used": String(used),
        "X-Downloads-Limit": String(DEFAULT_DOWNLOAD_QUOTA),
      },
    });
  });
