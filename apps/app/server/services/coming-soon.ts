import { and, eq, inArray, schema } from "@selfgrow/db";
import type { AppEnv } from "../env";
import { inChunks } from "./programs";

/**
 * Ebook terbit yang belum punya bab terbit ditampilkan "Segera" di etalase (D38): sampul dan
 * judul sudah tampil, isinya menyusul. Mengembalikan id ebook yang SUDAH punya bab terbit.
 */
export async function ebooksWithChapters(
  db: AppEnv["Variables"]["db"],
  items: { id: string; type: string }[],
): Promise<Set<string>> {
  const ids = items.filter((i) => i.type === "ebook").map((i) => i.id);
  const rows = await inChunks(ids, (chunk) =>
    db
      .selectDistinct({ contentId: schema.ebookChapters.contentId })
      .from(schema.ebookChapters)
      .where(
        and(
          inArray(schema.ebookChapters.contentId, chunk),
          eq(schema.ebookChapters.status, "published"),
        ),
      ),
  );
  return new Set(rows.map((r) => r.contentId));
}

export const isComingSoon = (item: { id: string; type: string }, filled: Set<string>) =>
  item.type === "ebook" && !filled.has(item.id);
