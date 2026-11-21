import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";

const ID = /^[0-9a-f-]{36}$/;

/**
 * Gambar isi konten (D38) dilayani dari domain etalase sendiri (bukan langsung dari app) supaya gambar
 * selalu boleh dimuat halaman ini dan ikut cache edge. Data diambil lewat service binding APP.
 */
export const GET: APIRoute = async ({ params }) => {
  const id = params.id ?? "";
  if (!ID.test(id)) return new Response("Not found", { status: 404 });
  const path = `/api/v1/assets/${id}`;
  const res = env.LOCAL_API_ORIGIN
    ? await fetch(`${env.LOCAL_API_ORIGIN}${path}`)
    : env.APP
      ? await env.APP.fetch(new Request(`https://app.internal${path}`))
      : null;
  if (!res?.ok) return new Response("Not found", { status: 404 });
  const type = res.headers.get("Content-Type") ?? "";
  if (!/^image\/(png|jpeg|webp)$/.test(type)) return new Response("Not found", { status: 404 });
  return new Response(res.body, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
