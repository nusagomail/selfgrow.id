import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";

const ID = /^[0-9a-f-]{36}$/;

/**
 * Video pengantar ebook (D41) dilayani dari domain etalase sendiri lewat service binding APP.
 * Header Range diteruskan supaya pemutar (termasuk Safari/iPhone) bisa memutar per potongan.
 */
export const GET: APIRoute = async ({ params, request }) => {
  const id = params.id ?? "";
  if (!ID.test(id)) return new Response("Not found", { status: 404 });
  const path = `/api/v1/videos/${id}`;
  const headers = new Headers();
  const range = request.headers.get("range");
  if (range) headers.set("range", range);
  const res = env.LOCAL_API_ORIGIN
    ? await fetch(`${env.LOCAL_API_ORIGIN}${path}`, { headers })
    : env.APP
      ? await env.APP.fetch(new Request(`https://app.internal${path}`, { headers }))
      : null;
  if (!res || (res.status !== 200 && res.status !== 206 && res.status !== 416)) {
    return new Response("Not found", { status: 404 });
  }
  const type = res.headers.get("Content-Type") ?? "";
  if (res.status !== 416 && !/^video\/(mp4|webm)$/.test(type)) {
    return new Response("Not found", { status: 404 });
  }
  const out = new Headers({
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
  });
  if (type) out.set("Content-Type", type);
  for (const h of ["Content-Range", "Content-Length"]) {
    const v = res.headers.get(h);
    if (v) out.set(h, v);
  }
  return new Response(res.body, { status: res.status, headers: out });
};
