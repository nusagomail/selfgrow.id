/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    ENVIRONMENT: "local" | "staging" | "production";
    /** Alamat aplikasi (login, reader, tools) untuk tautan dari etalase. */
    APP_URL: string;
    /** Hanya lokal: ambil katalog dari server dev app, bukan service binding. */
    LOCAL_API_ORIGIN?: string;
    APP?: Fetcher;
  }
}
