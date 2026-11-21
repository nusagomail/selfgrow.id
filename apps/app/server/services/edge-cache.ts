import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../env";

/**
 * Cache edge (Cache API) untuk respons publik yang sama bagi semua orang. Kunci hanya URL
 * (tanpa cookie/header). Hanya respons 200 yang disimpan; `Cache-Control` milik route
 * (mis. `immutable` untuk gambar) dipertahankan untuk browser.
 */
export function edgeCache(ttlSeconds: number, defaultCacheControl: string) {
  return createMiddleware<AppEnv>(async (c, next) => {
    const useCache = c.env.ENVIRONMENT !== "test" && typeof caches !== "undefined";
    const key = new Request(c.req.url, { method: "GET" });
    if (useCache && c.req.method === "GET") {
      const hit = await caches.default.match(key);
      // Salinan: respons dari cache tidak bisa diubah, sedangkan middleware lain menambah header.
      if (hit) return new Response(hit.body, hit);
    }
    await next();
    if (c.res.status !== 200 || c.req.method !== "GET") return;
    if (!c.res.headers.has("Cache-Control")) c.header("Cache-Control", defaultCacheControl);
    if (useCache) {
      const copy = c.res.clone();
      const headers = new Headers(copy.headers);
      // Gambar immutable boleh disimpan lama di edge; data JSON hanya sebentar.
      const immutable = (headers.get("Cache-Control") ?? "").includes("immutable");
      headers.set("Cache-Control", `public, max-age=${immutable ? 86400 : ttlSeconds}`);
      c.executionCtx.waitUntil(
        caches.default.put(key, new Response(copy.body, { status: 200, headers })),
      );
    }
  });
}
