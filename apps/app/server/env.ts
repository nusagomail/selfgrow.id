/** Binding & variabel Worker. Secret tidak pernah ditulis di sini, hanya via `wrangler secret`. */
export interface Env {
  ENVIRONMENT: "local" | "staging" | "production";
  APP_URL: string;
  SITE_URL: string;
  ASSETS: Fetcher;
}

export type AppBindings = { Bindings: Env };
