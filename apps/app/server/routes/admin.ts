import { desc, eq, inArray, schema } from "@selfgrow/db";
import { extractWatermarks, setRoleBodySchema, traceLeakBodySchema } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAccess, requireAdmin } from "../middleware/guards";
import { writeAudit } from "../services/audit";
import { invalidateEntitlementCache } from "../services/entitlements";
import { getFreeze, listFrozen, unfreezeUser } from "../services/protection";

/** Admin: dilindungi Cloudflare Access + role admin (BLUEPRINT bagian 8, D17). */
export const admin = new Hono<AppEnv>()
  .use(requireAccess, requireAdmin)
  .get("/users", async (c) => {
    const limit = Math.min(Number(c.req.query("limit") ?? 50) || 50, 200);
    const rows = await c.var.db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        role: schema.users.role,
        createdAt: schema.users.createdAt,
      })
      .from(schema.users)
      .orderBy(desc(schema.users.createdAt))
      .limit(limit);
    return c.json({ users: rows });
  })
  .patch("/users/:id/role", async (c) => {
    const parsed = setRoleBodySchema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return c.json({ error: "invalid_body" }, 400);

    const id = c.req.param("id");
    if (id === c.var.user?.id) return c.json({ error: "cannot_change_own_role" }, 400);

    const before = await c.var.db.query.users.findFirst({
      where: eq(schema.users.id, id),
      columns: { id: true, role: true },
    });
    if (!before) return c.json({ error: "not_found" }, 404);

    await c.var.db
      .update(schema.users)
      .set({ role: parsed.data.role, updatedAt: new Date() })
      .where(eq(schema.users.id, id));
    await writeAudit(c, {
      action: "user.role.update",
      target: `user:${id}`,
      before: { role: before.role },
      after: { role: parsed.data.role },
    });
    await invalidateEntitlementCache(c.env.KV, id);
    return c.json({ id, role: parsed.data.role });
  })
  /** Akun yang sedang dibekukan sementara karena terdeteksi scraping. */
  .get("/frozen", async (c) => {
    const frozen = await listFrozen(c.env.KV);
    const users = frozen.length
      ? await c.var.db
          .select({ id: schema.users.id, name: schema.users.name, email: schema.users.email })
          .from(schema.users)
          .where(
            inArray(
              schema.users.id,
              frozen.slice(0, 90).map((f) => f.userId),
            ),
          )
      : [];
    const byId = new Map(users.map((u) => [u.id, u]));
    return c.json({
      frozen: frozen.map((f) => ({
        ...f,
        name: byId.get(f.userId)?.name ?? null,
        email: byId.get(f.userId)?.email ?? null,
      })),
    });
  })
  .delete("/users/:id/freeze", async (c) => {
    const id = c.req.param("id");
    const before = await getFreeze(c.env.KV, id);
    if (!before) return c.json({ error: "not_found" }, 404);
    await unfreezeUser(c.env, id);
    await writeAudit(c, { action: "security.unfreeze", target: `user:${id}`, before });
    return c.body(null, 204);
  })
  /** Lacak teks ebook yang bocor: cari kode watermark tak terlihat dan pemiliknya. */
  .post("/watermark/trace", async (c) => {
    const body = traceLeakBodySchema.safeParse(await c.req.json().catch(() => null));
    if (!body.success) return c.json({ error: "invalid_body" }, 400);
    const found = extractWatermarks(body.data.text).slice(0, 20);
    const rows = found.length
      ? await c.var.db
          .select({
            code: schema.userWatermarks.code,
            userId: schema.users.id,
            name: schema.users.name,
            email: schema.users.email,
          })
          .from(schema.userWatermarks)
          .innerJoin(schema.users, eq(schema.users.id, schema.userWatermarks.userId))
          .where(
            inArray(
              schema.userWatermarks.code,
              found.map((f) => f.code),
            ),
          )
      : [];
    const byCode = new Map(rows.map((r) => [r.code, r]));
    await writeAudit(c, { action: "security.trace", after: { codes: found.map((f) => f.code) } });
    return c.json({
      matches: found.map((f) => ({
        code: f.code,
        count: f.count,
        user: byCode.get(f.code)
          ? {
              id: byCode.get(f.code)?.userId,
              name: byCode.get(f.code)?.name,
              email: byCode.get(f.code)?.email,
            }
          : null,
      })),
    });
  })
  .get("/audit-log", async (c) => {
    const rows = await c.var.db
      .select()
      .from(schema.auditLog)
      .orderBy(desc(schema.auditLog.createdAt))
      .limit(100);
    return c.json({ entries: rows });
  });
