import { and, desc, eq, gt, schema } from "@selfgrow/db";
import { adminViewBodySchema, type DeviceSession, type MeResponse } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAdmin, requireAuth } from "../middleware/guards";
import { writeAudit } from "../services/audit";
import { adminViewKey, getAccessStatus } from "../services/entitlements";

/** Data akun milik user yang sedang login. Semua query difilter user_id dari sesi. */
export const me = new Hono<AppEnv>()
  .use(requireAuth)
  .get("/", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const body: MeResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image ?? null,
        role: user.role === "admin" ? "admin" : "member",
      },
      subscription: await getAccessStatus(c.env.KV, c.var.db, user),
    };
    return c.json(body);
  })
  /** Admin: ganti tampilan aplikasi antara pelanggan dan pengunjung tanpa langganan. */
  .put("/admin-view", requireAdmin, async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const body = adminViewBodySchema.safeParse(await c.req.json().catch(() => null));
    if (!body.success) return c.json({ error: "invalid_body" }, 400);
    if (body.data.view === "visitor") await c.env.KV.put(adminViewKey(user.id), "visitor");
    else await c.env.KV.delete(adminViewKey(user.id));
    await writeAudit(c, { action: "admin.view", target: `user:${user.id}`, after: body.data });
    return c.json({ view: body.data.view });
  })
  .get("/sessions", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const rows = await c.var.db
      .select()
      .from(schema.sessions)
      .where(and(eq(schema.sessions.userId, user.id), gt(schema.sessions.expiresAt, new Date())))
      .orderBy(desc(schema.sessions.updatedAt));
    const body: DeviceSession[] = rows.map((s) => ({
      id: s.id,
      deviceLabel: s.deviceLabel,
      lastSeenAt: s.updatedAt.toISOString(),
      createdAt: s.createdAt.toISOString(),
      current: s.id === c.var.session?.id,
    }));
    return c.json({ sessions: body });
  })
  .delete("/sessions/:id", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const deleted = await c.var.db
      .delete(schema.sessions)
      .where(and(eq(schema.sessions.id, c.req.param("id")), eq(schema.sessions.userId, user.id)))
      .returning({ id: schema.sessions.id });
    if (deleted.length === 0) return c.json({ error: "not_found" }, 404);
    return c.body(null, 204);
  });
