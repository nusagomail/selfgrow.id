import { and, desc, eq, gte, schema } from "@selfgrow/db";
import {
  addDays,
  DEFAULT_TOOL_RUN_QUOTA,
  isEntryDateAllowed,
  isoDateSchema,
  type PublicToolDefinition,
  runToolBodySchema,
  runToolConfig,
  TRACKER_MAX_HISTORY_DAYS,
  type TrackerEntry,
  todayWib,
  toolConfigSchema,
  toPublicDefinition,
  trackerEntryBodySchema,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { FREE_TIER, requireActiveSubscriptionUnlessFree, requireAuth } from "../middleware/guards";
import { getAccessStatus } from "../services/entitlements";
import { rateLimit } from "../services/protection";
import { readStreak, recomputeStreak } from "../services/streaks";
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
 * Tool berdasarkan slug TANPA syarat terbit/tracker. Hanya untuk membaca & menghapus data milik
 * user sendiri: data tetap milik user walau tool ditarik atau mode tracker dimatikan (UU PDP).
 */
async function findToolForOwnData(db: AppEnv["Variables"]["db"], slug: string) {
  return db.query.contentItems.findFirst({
    where: and(eq(schema.contentItems.type, "tool"), eq(schema.contentItems.slug, slug)),
    columns: { id: true },
  });
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
    const sub = await getAccessStatus(c.env.KV, c.var.db, user);
    return c.json({
      tool: {
        id: tool.item.id,
        slug: tool.item.slug,
        title: tool.item.title,
        summary: tool.item.summary,
      },
      definition,
      // Konten gratis (D35) terbuka untuk semua user login.
      locked: !sub.active && tool.item.tier !== FREE_TIER,
      free: tool.item.tier === FREE_TIER,
      tracker:
        tool.def.storesUserData && !tool.custom
          ? { today: todayWib(), streak: await readStreak(c.var.db, user.id, tool.item.id) }
          : null,
    });
  })

  .post("/:slug/run", requireActiveSubscriptionUnlessFree("tool"), rateLimit("tool"), async (c) => {
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
  })

  /** Simpan/ganti entri tracker untuk satu tanggal (D13). Butuh langganan aktif. */
  .put(
    "/:slug/entries",
    requireActiveSubscriptionUnlessFree("tool"),
    rateLimit("tool"),
    async (c) => {
      // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
      const user = c.var.user!;
      const body = trackerEntryBodySchema.safeParse(await c.req.json().catch(() => null));
      if (!body.success) return c.json({ error: "invalid_body" }, 400);
      if (!isEntryDateAllowed(body.data.date)) return c.json({ error: "date_out_of_range" }, 400);

      const tool = await loadPublishedTool(c.var.db, c.req.param("slug"));
      if (!tool) return c.json({ error: "not_found" }, 404);
      if (!tool.def.storesUserData || !tool.config) return c.json({ error: "not_a_tracker" }, 400);

      let result: ReturnType<typeof runToolConfig>;
      try {
        result = runToolConfig(tool.config, body.data.input);
      } catch (e) {
        const issues = (e as { issues?: { path: PropertyKey[]; message: string }[] }).issues;
        if (issues) {
          return c.json(
            {
              error: "invalid_input",
              issues: issues.map((i) => ({
                path: i.path.map(String).join("."),
                message: i.message,
              })),
            },
            400,
          );
        }
        throw e;
      }

      const limit = tool.def.quotaPerMonth ?? DEFAULT_TOOL_RUN_QUOTA;
      const used = await consumeQuota(c.var.db, user.id, `tool_runs:${tool.item.id}`, limit);
      if (used === null) return c.json({ error: "quota_exceeded", limit }, 429);

      // Simpan isian yang sudah tervalidasi + hasil hitung, supaya riwayat tidak perlu dihitung ulang.
      const entry: Omit<TrackerEntry, "date"> = {
        input: Object.fromEntries(
          tool.config.inputs.map((i) => [i.key, body.data.input[i.key] ?? null]),
        ),
        results: result.results,
      };
      await c.var.db
        .insert(schema.toolEntries)
        .values({
          id: crypto.randomUUID(),
          userId: user.id,
          toolId: tool.item.id,
          entryDate: body.data.date,
          dataJson: JSON.stringify(entry),
        })
        .onConflictDoUpdate({
          target: [
            schema.toolEntries.userId,
            schema.toolEntries.toolId,
            schema.toolEntries.entryDate,
          ],
          set: { dataJson: JSON.stringify(entry) },
        });
      const streak = await recomputeStreak(c.var.db, user.id, tool.item.id);
      return c.json({ ...result, date: body.data.date, streak, usage: { used, limit } });
    },
  )

  /**
   * Riwayat entri milik user sendiri. Cukup login (tanpa langganan): data milik user tetap bisa
   * dilihat & diekspor setelah langganan berakhir (BLUEPRINT bagian 5, UU PDP).
   */
  .get("/:slug/entries", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const tool = await findToolForOwnData(c.var.db, c.req.param("slug"));
    if (!tool) return c.json({ error: "not_found" }, 404);

    const days = Math.min(
      Math.max(Number(c.req.query("days") ?? 30) || 30, 1),
      TRACKER_MAX_HISTORY_DAYS,
    );
    const from = addDays(todayWib(), -(days - 1));
    const rows = await c.var.db
      .select({ date: schema.toolEntries.entryDate, data: schema.toolEntries.dataJson })
      .from(schema.toolEntries)
      .where(
        and(
          eq(schema.toolEntries.userId, user.id),
          eq(schema.toolEntries.toolId, tool.id),
          gte(schema.toolEntries.entryDate, from),
        ),
      )
      .orderBy(desc(schema.toolEntries.entryDate))
      .limit(TRACKER_MAX_HISTORY_DAYS);
    const entries: TrackerEntry[] = rows.map((r) => ({ date: r.date, ...JSON.parse(r.data) }));
    return c.json({
      from,
      to: todayWib(),
      entries,
      streak: await readStreak(c.var.db, user.id, tool.id),
    });
  })

  .delete("/:slug/entries/:date", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const date = isoDateSchema.safeParse(c.req.param("date"));
    if (!date.success) return c.json({ error: "invalid_date" }, 400);
    const tool = await findToolForOwnData(c.var.db, c.req.param("slug"));
    if (!tool) return c.json({ error: "not_found" }, 404);
    const deleted = await c.var.db
      .delete(schema.toolEntries)
      .where(
        and(
          eq(schema.toolEntries.userId, user.id),
          eq(schema.toolEntries.toolId, tool.id),
          eq(schema.toolEntries.entryDate, date.data),
        ),
      )
      .returning({ id: schema.toolEntries.id });
    if (deleted.length === 0) return c.json({ error: "not_found" }, 404);
    const streak = await recomputeStreak(c.var.db, user.id, tool.id);
    return c.json({ streak });
  });
