import type { D1Migration } from "cloudflare:test";
import type { Env } from "../server/env";

declare global {
  namespace Cloudflare {
    interface Env extends Omit<import("../server/env").Env, "ASSETS"> {
      TEST_MIGRATIONS: D1Migration[];
    }
  }
}

export type { Env };
