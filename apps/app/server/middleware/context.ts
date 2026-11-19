import { createDb } from "@selfgrow/db";
import { createMiddleware } from "hono/factory";
import { AUTH_BASE_PATH, createAuth } from "../auth/auth";
import type { AppEnv } from "../env";

/** Menyiapkan db, auth, dan sesi (cookie atau bearer) untuk setiap request API. */
export const contextMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const db = createDb(c.env.DB);
  const auth = createAuth(c.env);
  c.set("db", db);
  c.set("auth", auth);

  // Endpoint Better Auth membaca sesinya sendiri.
  if (c.req.path.startsWith(AUTH_BASE_PATH)) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  const user = session?.user ?? null;
  // Akun yang dihapus diperlakukan seperti tidak login.
  const usable = user && !user.deletedAt ? session : null;
  c.set("user", usable?.user ?? null);
  c.set("session", usable?.session ?? null);
  await next();
});
