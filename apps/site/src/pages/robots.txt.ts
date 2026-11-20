import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";

/** Staging tidak boleh diindeks; production membuka semua halaman publik + sitemap. */
export const GET: APIRoute = ({ site, url }) => {
  const body =
    env.ENVIRONMENT === "production"
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site ?? url.origin)}\n`
      : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
