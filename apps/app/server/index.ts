import { api } from "./app";
import type { Env } from "./env";

export default {
  fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api" || pathname.startsWith("/api/")) {
      return api.fetch(request, env, ctx);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
