import type { Database } from "@selfgrow/db";
import { and, eq, inArray, schema } from "@selfgrow/db";
import type { ProgramDay, ProgramItemView } from "@selfgrow/shared";

export const programKeys = {
  published: (id: string) => `programs/${id}/published.json`,
};

export interface PublishedProgram {
  durationDays: number;
  steps: ProgramDay[];
}

/** Ambil judul & status konten yang dirujuk langkah program (sekali query per tabel). */
export async function resolveRefs(db: Database, steps: ProgramDay[]) {
  const contentIds = new Set<string>();
  const chapterIds = new Set<string>();
  for (const s of steps) {
    for (const it of s.items) {
      if (it.type !== "task") contentIds.add(it.contentId);
      if (it.type === "chapter") chapterIds.add(it.chapterId);
    }
  }
  const contents = contentIds.size
    ? await db
        .select({
          id: schema.contentItems.id,
          type: schema.contentItems.type,
          slug: schema.contentItems.slug,
          title: schema.contentItems.title,
          status: schema.contentItems.status,
        })
        .from(schema.contentItems)
        .where(inArray(schema.contentItems.id, [...contentIds]))
    : [];
  const chapters = chapterIds.size
    ? await db
        .select({
          id: schema.ebookChapters.id,
          contentId: schema.ebookChapters.contentId,
          title: schema.ebookChapters.title,
          status: schema.ebookChapters.status,
        })
        .from(schema.ebookChapters)
        .where(inArray(schema.ebookChapters.id, [...chapterIds]))
    : [];
  return {
    contents: new Map(contents.map((c) => [c.id, c])),
    chapters: new Map(chapters.map((c) => [c.id, c])),
  };
}

/** Masalah rujukan yang menghalangi penerbitan program. */
export async function checkProgramRefs(db: Database, steps: ProgramDay[]): Promise<string[]> {
  const { contents, chapters } = await resolveRefs(db, steps);
  const problems: string[] = [];
  for (const s of steps) {
    for (const it of s.items) {
      if (it.type === "task") continue;
      const c = contents.get(it.contentId);
      const expected = it.type === "chapter" ? "ebook" : it.type;
      if (!c || c.type !== expected) {
        problems.push(`Hari ke-${s.day}: ${it.type} yang dirujuk tidak ditemukan`);
      } else if (c.status !== "published") {
        problems.push(`Hari ke-${s.day}: "${c.title}" belum diterbitkan`);
      }
      if (it.type === "chapter") {
        const ch = chapters.get(it.chapterId);
        if (!ch || ch.contentId !== it.contentId) {
          problems.push(`Hari ke-${s.day}: bab yang dirujuk tidak ada di ebook itu`);
        } else if (ch.status !== "published") {
          problems.push(`Hari ke-${s.day}: bab "${ch.title}" belum diterbitkan`);
        }
      }
    }
  }
  return problems;
}

/** Ubah langkah menjadi tampilan: judul + tautan; konten yang kini tidak terbit tidak ditautkan. */
export function itemViews(
  day: ProgramDay,
  refs: Awaited<ReturnType<typeof resolveRefs>>,
): ProgramItemView[] {
  return day.items.map((it) => {
    if (it.type === "task") return { type: "task", title: it.text, href: null };
    const c = refs.contents.get(it.contentId);
    const live = c && c.status === "published";
    if (it.type === "chapter") {
      const ch = refs.chapters.get(it.chapterId);
      const ok = live && ch && ch.contentId === it.contentId && ch.status === "published";
      return {
        type: "chapter",
        title: ok ? `${c.title} — ${ch.title}` : "Bab tidak tersedia",
        href: ok ? `/baca/${c.slug}/${ch.id}` : null,
      };
    }
    const base = it.type === "tool" ? "/tools" : "/template";
    return {
      type: it.type,
      title: live ? c.title : "Konten tidak tersedia",
      href: live ? `${base}/${c.slug}` : null,
    };
  });
}

export async function findEnrollment(db: Database, userId: string, programId: string) {
  return db.query.programEnrollments.findFirst({
    where: and(
      eq(schema.programEnrollments.userId, userId),
      eq(schema.programEnrollments.programId, programId),
    ),
  });
}
