import { env } from "cloudflare:test";
import { createDb } from "@selfgrow/db";
import { describe, expect, it } from "vitest";
import { call, createUser } from "../../test/helpers";
import { softDeleteUser } from "./users";

describe("softDeleteUser", () => {
  it("menandai akun terhapus dan mencabut semua sesinya", async () => {
    const u = await createUser();
    await softDeleteUser(createDb(env.DB), u.id);
    const row = await env.DB.prepare("SELECT deleted_at FROM users WHERE id = ?")
      .bind(u.id)
      .first<{ deleted_at: number | null }>();
    expect(row?.deleted_at).not.toBeNull();
    const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM sessions WHERE user_id = ?")
      .bind(u.id)
      .first<{ n: number }>();
    expect(n?.n).toBe(0);
    expect((await call("/api/v1/auth/get-session", { token: u.token })).status).toBe(200);
    const body = await (await call("/api/v1/auth/get-session", { token: u.token })).json();
    expect(body).toBeNull();
  });
});
