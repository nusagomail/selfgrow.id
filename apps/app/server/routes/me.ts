import { and, desc, eq, gt, schema } from "@selfgrow/db";
import type { DeviceSession, MeResponse } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAuth } from "../middleware/guards";
import { getSubscriptionStatus } from "../services/entitlements";

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
      subscription: await getSubscriptionStatus(c.env.KV, c.var.db, user.id),
    };
    return c.json(body);
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
