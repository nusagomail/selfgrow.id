import { desc, schema } from "@selfgrow/db";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAccess, requireAdmin } from "../middleware/guards";

/** Studio: dilindungi Cloudflare Access + role admin. Editor konten menyusul di Fase 1B. */
export const studio = new Hono<AppEnv>()
  .use(requireAccess, requireAdmin)
  .get("/content", async (c) => {
    const rows = await c.var.db
      .select({
        id: schema.contentItems.id,
        type: schema.contentItems.type,
        slug: schema.contentItems.slug,
        title: schema.contentItems.title,
        status: schema.contentItems.status,
        updatedAt: schema.contentItems.updatedAt,
      })
      .from(schema.contentItems)
      .orderBy(desc(schema.contentItems.updatedAt))
      .limit(200);
    return c.json({ items: rows });
  });
