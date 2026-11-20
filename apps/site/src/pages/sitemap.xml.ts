import type { APIRoute } from "astro";
import { getCategories } from "../lib/api";

/** Sitemap otomatis dari katalog (BLUEPRINT bagian 10). */
export const GET: APIRoute = async ({ site, url }) => {
  const categories = await getCategories();
  const paths = [
    "/",
    "/kategori",
    "/harga",
    "/tentang",
    ...categories.flatMap((c) => [
      `/kategori/${c.slug}`,
      ...c.topics.map((t) => `/kategori/${c.slug}/${t.slug}`),
    ]),
  ];
  const urls = paths.map((p) => `<url><loc>${new URL(p, site ?? url.origin)}</loc></url>`).join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
};
