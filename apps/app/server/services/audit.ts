import { schema } from "@selfgrow/db";
import type { Context } from "hono";
import type { AppEnv } from "../env";

/** Catat aksi admin/Studio ke `audit_log` (BLUEPRINT bagian 8). */
export async function writeAudit(
  c: Context<AppEnv>,
  entry: {
    action: string;
    target?: string;
    before?: unknown;
    after?: unknown;
    /** `null` untuk aksi otomatis sistem (bukan dilakukan user yang sedang login). */
    actorId?: string | null;
  },
) {
  await c.var.db.insert(schema.auditLog).values({
    id: crypto.randomUUID(),
    actorId: entry.actorId !== undefined ? entry.actorId : (c.var.user?.id ?? null),
    action: entry.action,
    target: entry.target ?? null,
    beforeJson: entry.before === undefined ? null : JSON.stringify(entry.before),
    afterJson: entry.after === undefined ? null : JSON.stringify(entry.after),
    ip: c.req.header("cf-connecting-ip") ?? null,
  });
}
