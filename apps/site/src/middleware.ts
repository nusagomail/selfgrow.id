import { defineMiddleware } from "astro:middleware";
import { env } from "cloudflare:workers";

/**
 * - Selain production: `X-Robots-Tag: noindex` (staging tidak boleh terindeks Google).
 * - Halaman publik di-cache di edge lewat Cache API (BLUEPRINT bagian 10), kunci = URL saja.
 */
/** Cache edge Cloudflare (tipe DOM tidak mengenal `caches.default`). */
const edgeCache = () => (caches as unknown as { default: Cache }).default;

export const onRequest = defineMiddleware(async (ctx, next) => {
  // Permintaan rentang (pemutar video) tidak boleh dijawab salinan utuh dari cache (D41).
  const cacheable =
    ctx.request.method === "GET" &&
    !ctx.request.headers.has("range") &&
    // Video tidak disimpan di cache halaman: berkas besar dan harus segera hilang bila dicabut.
    !ctx.url.pathname.startsWith("/video/") &&
    env.ENVIRONMENT !== "local" &&
    typeof caches !== "undefined";
  const key = new Request(ctx.url.toString(), { method: "GET" });
  if (cacheable) {
    const hit = await edgeCache().match(key);
    // Salinan: respons dari cache tidak bisa diubah.
    if (hit) return new Response(hit.body, hit);
  }
  const res = await next();
  if (env.ENVIRONMENT !== "production") res.headers.set("X-Robots-Tag", "noindex, nofollow");
  if (cacheable && res.status === 200 && res.headers.get("Cache-Control")?.includes("public")) {
    ctx.locals.cfContext?.waitUntil(edgeCache().put(key, res.clone()));
  }
  return res;
});
