import { env } from "cloudflare:test";
import { createDb } from "@selfgrow/db";
import { describe, expect, it } from "vitest";
import { call, createUser, testEnv } from "../../test/helpers";
import { canCreateSession, isAdminEmail, resolveAppUrl, shouldBeAdmin } from "./auth";
import { deviceLabelFromUserAgent } from "./device";
import { enforceSessionLimit } from "./session-limit";

describe("batas 2 perangkat", () => {
  it("sesi terlama dikeluarkan saat sesi ketiga dibuat", async () => {
    const u = await createUser();
    const now = Date.now();
    const exp = now + 86_400_000;
    for (const [i, t] of [now + 1000, now + 2000].entries()) {
      await env.DB.prepare(
        "INSERT INTO sessions (id, user_id, token, expires_at, created_at, last_seen_at) VALUES (?, ?, ?, ?, ?, ?)",
      )
        .bind(`s${i}-${u.id}`, u.id, `t${i}-${u.id}`, exp, t, t)
        .run();
    }
    const removed = await enforceSessionLimit(createDb(env.DB), u.id);
    expect(removed).toHaveLength(1);
    // Sesi pertama (dari createUser) paling lama, jadi itu yang keluar.
    expect((await call("/api/v1/me", { token: u.token })).status).toBe(401);
    const left = await env.DB.prepare("SELECT COUNT(*) AS n FROM sessions WHERE user_id = ?")
      .bind(u.id)
      .first<{ n: number }>();
    expect(left?.n).toBe(2);
  });
});

describe("login Google", () => {
  it("endpoint sign-in Google mengarahkan ke accounts.google.com", async () => {
    const res = await call("/api/v1/auth/sign-in/social", {
      method: "POST",
      headers: { "content-type": "application/json", origin: testEnv.APP_URL },
      body: JSON.stringify({ provider: "google", callbackURL: "/" }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { url: string };
    expect(new URL(body.url).hostname).toBe("accounts.google.com");
  });

  it("login email + password tidak tersedia (D4)", async () => {
    const res = await call("/api/v1/auth/sign-up/email", {
      method: "POST",
      headers: { "content-type": "application/json", origin: testEnv.APP_URL },
      body: JSON.stringify({ email: "a@example.com", password: "rahasia123", name: "A" }),
    });
    expect(res.status).not.toBe(200);
  });
});

describe("perbaikan review keamanan", () => {
  it("admin otomatis hanya bila email sudah diverifikasi", () => {
    const env = { ADMIN_EMAILS: "pemilik@example.com" };
    expect(shouldBeAdmin(env, { email: "pemilik@example.com", emailVerified: true })).toBe(true);
    expect(shouldBeAdmin(env, { email: "pemilik@example.com", emailVerified: false })).toBe(false);
    expect(shouldBeAdmin(env, { email: "pemilik@example.com" })).toBe(false);
  });

  it("akun yang dihapus tidak bisa membuat sesi baru", async () => {
    const u = await createUser();
    const db = createDb(env.DB);
    expect(await canCreateSession(db, u.id)).toBe(true);
    await env.DB.prepare("UPDATE users SET deleted_at = ? WHERE id = ?")
      .bind(Date.now(), u.id)
      .run();
    expect(await canCreateSession(db, u.id)).toBe(false);
    expect(await canCreateSession(db, "tidak-ada")).toBe(false);
  });
});

describe("resolveAppUrl", () => {
  it("memakai APP_URL bila diset", () => {
    expect(resolveAppUrl({ APP_URL: "https://app.selfgrow.id", ENVIRONMENT: "production" })).toBe(
      "https://app.selfgrow.id",
    );
  });
  it("staging tanpa APP_URL memakai origin request", () => {
    expect(
      resolveAppUrl(
        { APP_URL: "", ENVIRONMENT: "staging" },
        "https://selfgrow-app-staging.contoh.workers.dev/api/v1/me",
      ),
    ).toBe("https://selfgrow-app-staging.contoh.workers.dev");
  });
  it("production tanpa APP_URL ditolak", () => {
    expect(() =>
      resolveAppUrl({ APP_URL: "", ENVIRONMENT: "production" }, "https://jahat.example/x"),
    ).toThrow();
  });
});

describe("helper", () => {
  it("ADMIN_EMAILS tidak peka huruf besar dan spasi", () => {
    expect(
      isAdminEmail({ ADMIN_EMAILS: " Pemilik@Example.com , x@y.z" }, "pemilik@example.com"),
    ).toBe(true);
    expect(isAdminEmail({ ADMIN_EMAILS: "" }, "pemilik@example.com")).toBe(false);
  });

  it("label perangkat dari User-Agent", () => {
    expect(
      deviceLabelFromUserAgent(
        "Mozilla/5.0 (Linux; Android 14; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36",
      ),
    ).toBe("Chrome di Android");
    expect(
      deviceLabelFromUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
      ),
    ).toBe("Safari di iPhone");
    expect(deviceLabelFromUserAgent(null)).toBe("Perangkat tidak dikenal");
  });
});
