import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../env";

/** Gambar immutable disimpan di edge paling lama 1 jam supaya penghapusan cepat berlaku. */
const IMMUTABLE_EDGE_SECONDS = 3600;
/** 404 gambar disimpan sebentar supaya id acak berulang tidak selalu mengenai D1. */
const NOT_FOUND_EDGE_SECONDS = 60;

export type EdgeCacheOptions = {
  ttlSeconds: number;
  defaultCacheControl: string;
  /**
   * Path gambar: kunci cache tanpa query string (mencegah cache-busting `?r=acak`) dan 404
   * ikut di-cache sebentar.
   */
  isImage?: (path: string) => boolean;
};

/**
 * Cache edge (Cache API) untuk respons publik yang sama bagi semua orang. Kunci hanya URL
 * (tanpa cookie/header). `Cache-Control` milik route (mis. `immutable`) dipertahankan untuk
 * browser. Dipasang SEBELUM rate limit: hanya permintaan yang meleset yang dihitung.
 */
export function edgeCache(opts: EdgeCacheOptions) {
  return createMiddleware<AppEnv>(async (c, next) => {
    const image = opts.isImage?.(c.req.path) ?? false;
    const useCache =
      c.env.ENVIRONMENT !== "test" && typeof caches !== "undefined" && c.req.method === "GET";
    const url = new URL(c.req.url);
    if (image) url.search = "";
    const key = new Request(url.toString(), { method: "GET" });
    if (useCache) {
      const hit = await caches.default.match(key);
      // Salinan: respons dari cache tidak bisa diubah, sedangkan middleware lain menambah header.
      if (hit) return new Response(hit.body, hit);
    }
    await next();
    if (c.req.method !== "GET") return;
    const status = c.res.status;
    if (status === 200 && !c.res.headers.has("Cache-Control")) {
      c.header("Cache-Control", opts.defaultCacheControl);
    }
    const store = status === 200 || (image && status === 404);
    if (!useCache || !store) return;
    const copy = c.res.clone();
    const headers = new Headers(copy.headers);
    const immutable = (headers.get("Cache-Control") ?? "").includes("immutable");
    const ttl =
      status === 404
        ? NOT_FOUND_EDGE_SECONDS
        : immutable
          ? IMMUTABLE_EDGE_SECONDS
          : opts.ttlSeconds;
    headers.set("Cache-Control", `public, max-age=${ttl}`);
    c.executionCtx.waitUntil(caches.default.put(key, new Response(copy.body, { status, headers })));
  });
}
