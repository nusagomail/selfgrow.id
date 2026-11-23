import { createDb } from "@selfgrow/db";
import { API_BASE_PATH } from "@selfgrow/shared";
import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { AUTH_BASE_PATH, createAuth } from "../auth/auth";
import type { AppEnv } from "../env";

const CATALOG_BASE_PATH = `${API_BASE_PATH}/catalog`;
const ASSETS_BASE_PATH = `${API_BASE_PATH}/assets`;
const VIDEOS_BASE_PATH = `${API_BASE_PATH}/videos`;

/** Menyiapkan db, auth, dan sesi (cookie atau bearer) untuk setiap request API. */
export const contextMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const db = createDb(c.env.DB);
  const auth = createAuth(c.env, c.req.url);
  c.set("db", db);
  c.set("auth", auth);

  // Endpoint Better Auth membaca sesinya sendiri; katalog publik dan gambar isi konten tidak
  // butuh sesi (respons sama untuk semua orang dan di-cache, review keamanan PR #14 & D38).
  if (
    c.req.path.startsWith(AUTH_BASE_PATH) ||
    c.req.path.startsWith(CATALOG_BASE_PATH) ||
    c.req.path.startsWith(ASSETS_BASE_PATH) ||
    c.req.path.startsWith(VIDEOS_BASE_PATH)
  ) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  await loadSession(c);
  await next();
});

/**
 * Baca sesi (cookie atau bearer) ke `c.var.user`/`c.var.session`. Dipanggil otomatis untuk
 * semua route kecuali yang publik di atas; route video memanggilnya sendiri hanya untuk
 * Video Edukasi berbayar (D54), supaya video publik tetap tanpa pencarian sesi.
 */
export async function loadSession(c: Context<AppEnv>) {
  const session = await c.var.auth.api.getSession({ headers: c.req.raw.headers });
  const user = session?.user ?? null;
  // Akun yang dihapus diperlakukan seperti tidak login.
  const usable = user && !user.deletedAt ? session : null;
  c.set("user", usable?.user ?? null);
  c.set("session", usable?.session ?? null);
}
