import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function createDb(d1: Parameters<typeof drizzle>[0]) {
  return drizzle(d1, { schema });
}

export type Database = ReturnType<typeof createDb>;

// Operator query diekspor dari sini supaya seluruh repo memakai satu salinan drizzle-orm.
export { and, asc, desc, eq, gt, gte, inArray, isNull, lt, lte, ne, or, sql } from "drizzle-orm";
export { schema };
