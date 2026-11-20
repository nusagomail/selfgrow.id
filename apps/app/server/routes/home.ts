import { and, asc, count, desc, eq, inArray, like, schema } from "@selfgrow/db";
import { currentProgramDay } from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireAuth } from "../middleware/guards";
import { getAccessStatus } from "../services/entitlements";
import { inChunks } from "../services/programs";
import { currentPeriod } from "../services/usage";

type Db = AppEnv["Variables"]["db"];
const MAX_ITEMS = 500;

/** Bab terbit per ebook (urut), untuk menghitung progres baca. */
async function publishedChapters(db: Db, ebookIds: string[]) {
  const rows = await inChunks(ebookIds, (chunk) =>
    db
      .select({
        id: schema.ebookChapters.id,
        contentId: schema.ebookChapters.contentId,
        title: schema.ebookChapters.title,
      })
      .from(schema.ebookChapters)
      .where(
        and(
          inArray(schema.ebookChapters.contentId, chunk),
          eq(schema.ebookChapters.status, "published"),
        ),
      )
      .orderBy(asc(schema.ebookChapters.order)),
  );
  const byEbook = new Map<string, { id: string; title: string }[]>();
  for (const r of rows) {
    const list = byEbook.get(r.contentId) ?? [];
    list.push({ id: r.id, title: r.title });
    byEbook.set(r.contentId, list);
  }
  return byEbook;
}

/** Progres baca milik user (difilter user_id sesi), terbaru dulu. */
async function readingList(db: Db, userId: string, limit: number) {
  const rows = await db
    .select({
      contentId: schema.readingProgress.contentId,
      chapterId: schema.readingProgress.chapterId,
      position: schema.readingProgress.position,
      updatedAt: schema.readingProgress.updatedAt,
      slug: schema.contentItems.slug,
      title: schema.contentItems.title,
    })
    .from(schema.readingProgress)
    .innerJoin(schema.contentItems, eq(schema.contentItems.id, schema.readingProgress.contentId))
    .where(
      and(eq(schema.readingProgress.userId, userId), eq(schema.contentItems.status, "published")),
    )
    .orderBy(desc(schema.readingProgress.updatedAt))
    .limit(limit);
  const chapters = await publishedChapters(
    db,
    rows.map((r) => r.contentId),
  );
  return rows.map((r) => {
    const list = chapters.get(r.contentId) ?? [];
    const idx = Math.max(
      0,
      list.findIndex((ch) => ch.id === r.chapterId),
    );
    // Posisi gulir disimpan dalam persen x100 (0..10000) di bab yang sedang dibaca.
    const within = Math.min(1, Math.max(0, r.position / 10000));
    const percent = list.length ? Math.round(((idx + within) / list.length) * 100) : 0;
    return {
      slug: r.slug,
      title: r.title,
      chapterId: list[idx]?.id ?? r.chapterId,
      chapterTitle: list[idx]?.title ?? null,
      chapterNumber: idx + 1,
      totalChapters: list.length,
      percent,
      updatedAt: r.updatedAt.toISOString(),
    };
  });
}

/**
 * Beranda setelah login: katalog konten terbit per kategori dengan status terkunci/gratis sesuai
 * akses user, plus "Lanjutkan" membaca. Tidak ada isi berbayar di respons ini (hanya judul).
 */
export const home = new Hono<AppEnv>()
  .use(requireAuth)
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .get("/", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const [access, categories, items, freeRows, reading] = await Promise.all([
      getAccessStatus(c.env.KV, c.var.db, user),
      c.var.db
        .select({
          id: schema.categories.id,
          parentId: schema.categories.parentId,
          slug: schema.categories.slug,
          name: schema.categories.name,
          hook: schema.categories.hook,
        })
        .from(schema.categories)
        .orderBy(asc(schema.categories.order)),
      c.var.db
        .select({
          id: schema.contentItems.id,
          type: schema.contentItems.type,
          slug: schema.contentItems.slug,
          title: schema.contentItems.title,
          summary: schema.contentItems.summary,
          categoryId: schema.contentItems.categoryId,
          publishedAt: schema.contentItems.publishedAt,
        })
        .from(schema.contentItems)
        .where(eq(schema.contentItems.status, "published"))
        .orderBy(desc(schema.contentItems.publishedAt))
        .limit(MAX_ITEMS),
      // Ebook yang punya bab gratis terbit: bisa dibuka sebagian tanpa langganan.
      c.var.db
        .selectDistinct({ contentId: schema.ebookChapters.contentId })
        .from(schema.ebookChapters)
        .where(
          and(
            eq(schema.ebookChapters.isFreePreview, true),
            eq(schema.ebookChapters.status, "published"),
          ),
        ),
      readingList(c.var.db, user.id, 3),
    ]);

    const free = new Set(freeRows.map((r) => r.contentId));
    const rootOf = new Map<string, string>();
    for (const cat of categories) rootOf.set(cat.id, cat.parentId ?? cat.id);
    const view = items.map((i) => {
      const freePreview = i.type === "ebook" && free.has(i.id);
      return {
        type: i.type,
        slug: i.slug,
        title: i.title,
        summary: i.summary,
        freePreview,
        // Terkunci = belum berlangganan dan tidak ada bagian gratis.
        locked: !access.active && !freePreview,
        category: i.categoryId ? (rootOf.get(i.categoryId) ?? null) : null,
      };
    });
    const roots = categories.filter((cat) => !cat.parentId);
    const sections = roots.map((r) => ({
      slug: r.slug,
      name: r.name,
      hook: r.hook,
      items: view.filter((v) => v.category === r.id).map(({ category: _, ...v }) => v),
    }));
    const uncategorized = view.filter((v) => !v.category).map(({ category: _, ...v }) => v);

    return c.json({
      firstName: user.name.split(" ")[0] ?? user.name,
      subscription: access,
      continueReading: reading,
      sections,
      uncategorized,
    });
  });

/**
 * Profil: ringkasan pemakaian milik user sendiri (semua query difilter user_id sesi).
 * Riwayat pembayaran menyusul bersama fase pembayaran (D29).
 */
export const profile = new Hono<AppEnv>()
  .use(requireAuth)
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .get("/", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const db = c.var.db;
    const [access, reading, trackers, toolRuns, enrollments, downloads] = await Promise.all([
      getAccessStatus(c.env.KV, db, user),
      readingList(db, user.id, 20),
      db
        .select({
          slug: schema.contentItems.slug,
          title: schema.contentItems.title,
          current: schema.streaks.current,
          longest: schema.streaks.longest,
          lastEntryDate: schema.streaks.lastEntryDate,
        })
        .from(schema.streaks)
        .innerJoin(schema.contentItems, eq(schema.contentItems.id, schema.streaks.toolId))
        .where(eq(schema.streaks.userId, user.id))
        .orderBy(desc(schema.streaks.lastEntryDate))
        .limit(20),
      db
        .select({ metric: schema.usageCounters.metric, count: schema.usageCounters.count })
        .from(schema.usageCounters)
        .where(
          and(
            eq(schema.usageCounters.userId, user.id),
            eq(schema.usageCounters.period, currentPeriod()),
            like(schema.usageCounters.metric, "tool_runs:%"),
          ),
        )
        .limit(50),
      db
        .select({
          programId: schema.programEnrollments.programId,
          startedAt: schema.programEnrollments.startedAt,
          completedAt: schema.programEnrollments.completedAt,
          slug: schema.contentItems.slug,
          title: schema.contentItems.title,
          durationDays: schema.programs.durationDays,
        })
        .from(schema.programEnrollments)
        .innerJoin(
          schema.contentItems,
          eq(schema.contentItems.id, schema.programEnrollments.programId),
        )
        .innerJoin(
          schema.programs,
          eq(schema.programs.contentId, schema.programEnrollments.programId),
        )
        .where(eq(schema.programEnrollments.userId, user.id))
        .orderBy(desc(schema.programEnrollments.startedAt))
        .limit(20),
      db
        .select({
          fileName: schema.templateDownloads.fileName,
          format: schema.templateDownloads.format,
          createdAt: schema.templateDownloads.createdAt,
          slug: schema.contentItems.slug,
          title: schema.contentItems.title,
        })
        .from(schema.templateDownloads)
        .innerJoin(
          schema.contentItems,
          eq(schema.contentItems.id, schema.templateDownloads.contentId),
        )
        .where(eq(schema.templateDownloads.userId, user.id))
        .orderBy(desc(schema.templateDownloads.createdAt))
        .limit(20),
    ]);

    // Nama tool yang dipakai bulan ini (dari penghitung kuota per tool).
    const runIds = toolRuns.map((r) => r.metric.slice("tool_runs:".length));
    const toolRows = await inChunks(runIds, (chunk) =>
      db
        .select({
          id: schema.contentItems.id,
          slug: schema.contentItems.slug,
          title: schema.contentItems.title,
        })
        .from(schema.contentItems)
        .where(inArray(schema.contentItems.id, chunk)),
    );
    const toolById = new Map(toolRows.map((t) => [t.id, t]));
    const tools = toolRuns
      .map((r) => {
        const t = toolById.get(r.metric.slice("tool_runs:".length));
        return t ? { slug: t.slug, title: t.title, runsThisMonth: r.count } : null;
      })
      .filter((t) => t !== null)
      .sort((a, b) => b.runsThisMonth - a.runsThisMonth);

    // Hari selesai per program (milik user sendiri).
    const doneRows = enrollments.length
      ? await db
          .select({ programId: schema.programDayCompletions.programId, n: count() })
          .from(schema.programDayCompletions)
          .where(eq(schema.programDayCompletions.userId, user.id))
          .groupBy(schema.programDayCompletions.programId)
      : [];
    const doneBy = new Map(doneRows.map((r) => [r.programId, r.n]));

    return c.json({
      user: { name: user.name, email: user.email, image: user.image ?? null, role: user.role },
      subscription: access,
      reading,
      trackers,
      tools,
      programs: enrollments.map((e) => ({
        slug: e.slug,
        title: e.title,
        durationDays: e.durationDays,
        currentDay: Math.min(currentProgramDay(e.startedAt), e.durationDays),
        completedDays: doneBy.get(e.programId) ?? 0,
        finished: Boolean(e.completedAt),
      })),
      downloads: downloads.map((d) => ({
        slug: d.slug,
        title: d.title,
        fileName: d.fileName,
        format: d.format,
        createdAt: d.createdAt.toISOString(),
      })),
    });
  });
