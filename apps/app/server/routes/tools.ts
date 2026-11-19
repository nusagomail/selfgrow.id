import { and, eq, schema } from "@selfgrow/db";
import {
  DEFAULT_TOOL_RUN_QUOTA,
  type PublicToolDefinition,
  runToolBodySchema,
  runToolConfig,
  toolConfigSchema,
  toPublicDefinition,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireActiveSubscription, requireAuth } from "../middleware/guards";
import { getSubscriptionStatus } from "../services/entitlements";
import { consumeQuota } from "../services/usage";
import { getCustomTool } from "../tools/registry";

/** Tool terbit + definisinya. Selalu memakai konfigurasi TERBIT, bukan draft Studio. */
async function loadPublishedTool(db: AppEnv["Variables"]["db"], slug: string) {
  const item = await db.query.contentItems.findFirst({
    where: and(
      eq(schema.contentItems.type, "tool"),
      eq(schema.contentItems.slug, slug),
      eq(schema.contentItems.status, "published"),
    ),
  });
  if (!item) return null;
  const def = await db.query.toolDefinitions.findFirst({
    where: eq(schema.toolDefinitions.contentId, item.id),
  });
  if (!def) return null;
  if (def.kind === "custom") {
    const custom = getCustomTool(def.moduleSlug);
    return custom ? { item, def, custom, config: null } : null;
  }
  const parsed = toolConfigSchema.safeParse(JSON.parse(def.publishedConfigJson ?? "null"));
  return parsed.success ? { item, def, custom: null, config: parsed.data } : null;
}

/**
 * Tools pelanggan (BLUEPRINT bagian 5 & 8): browser hanya mengirim input dan menerima output.
 * `config_json` (rumus & aturan) tidak pernah dikirim ke klien (D8).
 */
export const tools = new Hono<AppEnv>()
  .use(requireAuth)
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .get("/:slug", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const tool = await loadPublishedTool(c.var.db, c.req.param("slug"));
    if (!tool) return c.json({ error: "not_found" }, 404);
    const definition: PublicToolDefinition = tool.custom
      ? tool.custom.definition
      : toPublicDefinition(tool.config);
    const sub = await getSubscriptionStatus(c.env.KV, c.var.db, user.id);
    return c.json({
      tool: {
        id: tool.item.id,
        slug: tool.item.slug,
        title: tool.item.title,
        summary: tool.item.summary,
      },
      definition,
      locked: !sub.active,
    });
  })

  .post("/:slug/run", requireActiveSubscription, async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const body = runToolBodySchema.safeParse(await c.req.json().catch(() => null));
    if (!body.success) return c.json({ error: "invalid_body" }, 400);

    const tool = await loadPublishedTool(c.var.db, c.req.param("slug"));
    if (!tool) return c.json({ error: "not_found" }, 404);

    // Hitung dulu (input tidak valid tidak memotong kuota), lalu potong kuota sebelum hasil dikirim.
    let result: Awaited<ReturnType<typeof runToolConfig>>;
    try {
      result = tool.custom
        ? await tool.custom.run(body.data.input)
        : runToolConfig(tool.config, body.data.input);
    } catch (e) {
      const issues = (e as { issues?: { path: PropertyKey[]; message: string }[] }).issues;
      if (issues) {
        return c.json(
          {
            error: "invalid_input",
            issues: issues.map((i) => ({ path: i.path.map(String).join("."), message: i.message })),
          },
          400,
        );
      }
      throw e;
    }

    const limit = tool.def.quotaPerMonth ?? DEFAULT_TOOL_RUN_QUOTA;
    // Kuota dihitung per tool (review keamanan PR #8): limit besar satu tool tidak membuka tool lain.
    const used = await consumeQuota(c.var.db, user.id, `tool_runs:${tool.item.id}`, limit);
    if (used === null) return c.json({ error: "quota_exceeded", limit }, 429);
    return c.json({ ...result, usage: { used, limit } });
  });
