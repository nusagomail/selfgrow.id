import { desc, eq, schema } from "@selfgrow/db";
import { setRoleBodySchema } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAccess, requireAdmin } from "../middleware/guards";
import { writeAudit } from "../services/audit";
import { invalidateEntitlementCache } from "../services/entitlements";

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
  .get("/audit-log", async (c) => {
    const rows = await c.var.db
      .select()
      .from(schema.auditLog)
      .orderBy(desc(schema.auditLog.createdAt))
      .limit(100);
    return c.json({ entries: rows });
  });
