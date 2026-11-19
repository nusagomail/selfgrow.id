/**
 * Test otorisasi WAJIB (BLUEPRINT bagian 8 & 14, Fase 1A "Selesai bila"):
 * tanpa langganan -> 403, user A tidak bisa membaca/menghapus data user B, admin-only -> 403 untuk member.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";

describe("konten berbayar (requireActiveSubscription)", () => {
  it("401 tanpa login", async () => {
    const res = await call("/api/v1/library");
    expect(res.status).toBe(401);
  });

  it("token palsu diperlakukan seperti tidak login", async () => {
    const res = await call("/api/v1/library", { token: "tok_palsu" });
    expect(res.status).toBe(401);
  });

  it("403 untuk user login tanpa langganan", async () => {
    const u = await createUser();
    const res = await call("/api/v1/library", { token: u.token });
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "subscription_required" });
  });

  it("200 untuk pelanggan aktif", async () => {
    const u = await createUser();
    await grantSubscription(u.id);
    const res = await call("/api/v1/library", { token: u.token });
    expect(res.status).toBe(200);
  });

  it("masih boleh di masa tenggang 3 hari setelah jatuh tempo", async () => {
    const u = await createUser();
    await grantSubscription(u.id, { periodEndOffsetDays: -2 });
    expect((await call("/api/v1/library", { token: u.token })).status).toBe(200);
  });

  it("403 setelah masa tenggang habis", async () => {
    const u = await createUser();
    await grantSubscription(u.id, { periodEndOffsetDays: -4 });
    expect((await call("/api/v1/library", { token: u.token })).status).toBe(403);
  });

  it("langganan dibatalkan tidak mendapat masa tenggang", async () => {
    const u = await createUser();
    await grantSubscription(u.id, { status: "cancelled", periodEndOffsetDays: -1 });
    expect((await call("/api/v1/library", { token: u.token })).status).toBe(403);
  });

  it("status expired selalu 403", async () => {
    const u = await createUser();
    await grantSubscription(u.id, { status: "expired", periodEndOffsetDays: 10 });
    expect((await call("/api/v1/library", { token: u.token })).status).toBe(403);
  });

  it("status langganan di-cache di KV dengan kunci ent:{user_id}", async () => {
    const u = await createUser();
    await grantSubscription(u.id);
    await call("/api/v1/library", { token: u.token });
    expect(await env.KV.get(`ent:${u.id}`)).not.toBeNull();
  });

  it("akun yang dihapus tidak bisa masuk", async () => {
    const u = await createUser();
    await grantSubscription(u.id);
    await env.DB.prepare("UPDATE users SET deleted_at = ? WHERE id = ?")
      .bind(Date.now(), u.id)
      .run();
    expect((await call("/api/v1/library", { token: u.token })).status).toBe(401);
  });
});

describe("data milik user (cegah IDOR)", () => {
  it("/me hanya mengembalikan data pemilik token", async () => {
    const a = await createUser();
    const b = await createUser();
    const res = await call("/api/v1/me", { token: a.token });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { user: { id: string } };
    expect(body.user.id).toBe(a.id);
    expect(body.user.id).not.toBe(b.id);
  });

  it("user A tidak melihat sesi user B", async () => {
    const a = await createUser();
    const b = await createUser();
    const res = await call("/api/v1/me/sessions", { token: a.token });
    const body = (await res.json()) as { sessions: { id: string }[] };
    const bSessions = await env.DB.prepare("SELECT id FROM sessions WHERE user_id = ?")
      .bind(b.id)
      .all<{ id: string }>();
    const ids = body.sessions.map((s) => s.id);
    for (const s of bSessions.results) expect(ids).not.toContain(s.id);
    expect(body.sessions).toHaveLength(1);
  });

  it("user A tidak bisa mengeluarkan sesi user B", async () => {
    const a = await createUser();
    const b = await createUser();
    const bSession = await env.DB.prepare("SELECT id FROM sessions WHERE user_id = ?")
      .bind(b.id)
      .first<{ id: string }>();
    const res = await call(`/api/v1/me/sessions/${bSession?.id}`, {
      method: "DELETE",
      token: a.token,
    });
    expect(res.status).toBe(404);
    expect((await call("/api/v1/me", { token: b.token })).status).toBe(200);
  });

  it("user bisa mengeluarkan sesinya sendiri", async () => {
    const a = await createUser();
    const s = await env.DB.prepare("SELECT id FROM sessions WHERE user_id = ?")
      .bind(a.id)
      .first<{ id: string }>();
    const res = await call(`/api/v1/me/sessions/${s?.id}`, { method: "DELETE", token: a.token });
    expect(res.status).toBe(204);
    expect((await call("/api/v1/me", { token: a.token })).status).toBe(401);
  });
});

describe("admin & Studio", () => {
  for (const path of ["/api/v1/admin/users", "/api/v1/admin/audit-log", "/api/v1/studio/content"]) {
    it(`${path}: 401 tanpa login, 403 untuk member, 200 untuk admin`, async () => {
      expect((await call(path)).status).toBe(401);
      const member = await createUser();
      await grantSubscription(member.id);
      expect((await call(path, { token: member.token })).status).toBe(403);
      const adm = await createUser({ role: "admin" });
      expect((await call(path, { token: adm.token })).status).toBe(200);
    });
  }

  it("member tidak bisa menjadikan dirinya admin", async () => {
    const m = await createUser();
    const res = await call(`/api/v1/admin/users/${m.id}/role`, {
      method: "PATCH",
      token: m.token,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    });
    expect(res.status).toBe(403);
    const row = await env.DB.prepare("SELECT role FROM users WHERE id = ?")
      .bind(m.id)
      .first<{ role: string }>();
    expect(row?.role).toBe("member");
  });

  it("perubahan role oleh admin tercatat di audit_log", async () => {
    const adm = await createUser({ role: "admin" });
    const m = await createUser();
    const res = await call(`/api/v1/admin/users/${m.id}/role`, {
      method: "PATCH",
      token: adm.token,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    });
    expect(res.status).toBe(200);
    const log = await env.DB.prepare(
      "SELECT actor_id, action, target, before_json, after_json FROM audit_log WHERE target = ?",
    )
      .bind(`user:${m.id}`)
      .first<Record<string, string>>();
    expect(log).toMatchObject({
      actor_id: adm.id,
      action: "user.role.update",
      before_json: JSON.stringify({ role: "member" }),
      after_json: JSON.stringify({ role: "admin" }),
    });
  });

  it("input role tidak valid ditolak (Zod)", async () => {
    const adm = await createUser({ role: "admin" });
    const m = await createUser();
    const res = await call(`/api/v1/admin/users/${m.id}/role`, {
      method: "PATCH",
      token: adm.token,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role: "superadmin" }),
    });
    expect(res.status).toBe(400);
  });

  it("di staging, admin tetap ditolak tanpa JWT Cloudflare Access", async () => {
    const { api } = await import("./app");
    const adm = await createUser({ role: "admin" });
    const res = await api.request(
      "/api/v1/admin/users",
      { headers: { authorization: `Bearer ${adm.token}` } },
      {
        ...env,
        ENVIRONMENT: "staging",
        ACCESS_TEAM_DOMAIN: "x.cloudflareaccess.com",
        ACCESS_AUD: "aud",
      },
    );
    expect(res.status).toBe(403);
  });

  it("ENVIRONMENT=local di domain publik tidak melewati Access", async () => {
    const { api } = await import("./app");
    const adm = await createUser({ role: "admin" });
    const res = await api.request(
      "https://selfgrow-app.workers.dev/api/v1/admin/users",
      { headers: { authorization: `Bearer ${adm.token}` } },
      { ...env, ENVIRONMENT: "local" },
    );
    expect(res.status).toBe(403);
  });

  it("ENVIRONMENT=local di localhost boleh tanpa Access (dev lokal)", async () => {
    const { api } = await import("./app");
    const adm = await createUser({ role: "admin" });
    const res = await api.request(
      "http://localhost:5173/api/v1/admin/users",
      { headers: { authorization: `Bearer ${adm.token}` } },
      { ...env, ENVIRONMENT: "local" },
    );
    expect(res.status).toBe(200);
  });

  it("mutasi form lintas origin berbasis cookie ditolak (CSRF)", async () => {
    const m = await createUser();
    const res = await call(`/api/v1/admin/users/${m.id}/role`, {
      method: "PATCH",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        origin: "https://jahat.example",
      },
      body: "role=admin",
    });
    expect(res.status).toBe(403);
  });

  it("di staging tanpa konfigurasi Access, admin ditolak (gagal tertutup)", async () => {
    const { api } = await import("./app");
    const adm = await createUser({ role: "admin" });
    const res = await api.request(
      "/api/v1/admin/users",
      { headers: { authorization: `Bearer ${adm.token}` } },
      { ...env, ENVIRONMENT: "staging" },
    );
    expect(res.status).toBe(403);
  });
});
