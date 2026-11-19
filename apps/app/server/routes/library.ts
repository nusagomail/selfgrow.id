import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireActiveSubscription } from "../middleware/guards";

/**
 * Perpustakaan pelanggan. Isi konten dibangun di Fase 1B; route ini sudah memakai
 * requireActiveSubscription supaya aturan aksesnya teruji sejak awal.
 */
export const library = new Hono<AppEnv>()
  .use(requireActiveSubscription)
  .get("/", (c) => c.json({ items: [] }));
