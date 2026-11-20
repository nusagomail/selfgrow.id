import { and, eq, schema } from "@selfgrow/db";
import {
  currentProgramDay,
  enrollBodySchema,
  type ProgramDayView,
  programDayDate,
} from "@selfgrow/shared";
import { Hono } from "hono";
import type { AppEnv } from "../env";
import { requireActiveSubscription, requireAuth } from "../middleware/guards";
import { getAccessStatus } from "../services/entitlements";
import {
  findEnrollment,
  itemViews,
  type PublishedProgram,
  programKeys,
  resolveRefs,
} from "../services/programs";
import { readJson } from "../services/template-storage";

async function loadPublishedProgram(db: AppEnv["Variables"]["db"], bucket: R2Bucket, slug: string) {
  const item = await db.query.contentItems.findFirst({
    where: and(
      eq(schema.contentItems.type, "program"),
      eq(schema.contentItems.slug, slug),
      eq(schema.contentItems.status, "published"),
    ),
  });
  if (!item) return null;
  const published = await readJson<PublishedProgram>(bucket, programKeys.published(item.id));
  return published ? { item, ...published } : null;
}

async function completedDays(db: AppEnv["Variables"]["db"], userId: string, programId: string) {
  const rows = await db
    .select({ day: schema.programDayCompletions.day })
    .from(schema.programDayCompletions)
    .where(
      and(
        eq(schema.programDayCompletions.userId, userId),
        eq(schema.programDayCompletions.programId, programId),
      ),
    );
  return new Set(rows.map((r) => r.day));
}

/**
 * Program bertahap untuk pelanggan (BLUEPRINT bagian 5, D13). Hari terbuka sesuai kalender WIB
 * sejak mendaftar. Data progres selalu difilter user_id dari sesi.
 */
export const programs = new Hono<AppEnv>()
  .use(requireAuth)
  .use(async (c, next) => {
    await next();
    c.header("Cache-Control", "private, no-store");
  })

  .get("/:slug", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const program = await loadPublishedProgram(c.var.db, c.env.CONTENT, c.req.param("slug"));
    if (!program) return c.json({ error: "not_found" }, 404);
    const [enrollment, sub] = await Promise.all([
      findEnrollment(c.var.db, user.id, program.item.id),
      getAccessStatus(c.env.KV, c.var.db, user),
    ]);
    const done = enrollment
      ? await completedDays(c.var.db, user.id, program.item.id)
      : new Set<number>();
    const today = enrollment ? currentProgramDay(enrollment.startedAt) : 0;
    const isUnlocked = (day: number) => Boolean(enrollment) && day <= today && sub.active;
    // Rujukan hanya di-resolve untuk hari yang terbuka.
    const refs = await resolveRefs(
      c.var.db,
      program.steps.filter((s) => isUnlocked(s.day)),
    );
    const days: ProgramDayView[] = program.steps.map((s) => {
      const unlocked = isUnlocked(s.day);
      return {
        day: s.day,
        title: s.title,
        description: unlocked ? s.description : undefined,
        unlocked,
        unlockDate: enrollment ? programDayDate(enrollment.startedAt, s.day) : null,
        completed: done.has(s.day),
        // Isi langkah hanya dikirim untuk hari yang sudah terbuka.
        items: unlocked ? itemViews(s, refs) : [],
      };
    });
    return c.json({
      program: {
        slug: program.item.slug,
        title: program.item.title,
        summary: program.item.summary,
        durationDays: program.durationDays,
      },
      locked: !sub.active,
      enrollment: enrollment
        ? {
            startedAt: enrollment.startedAt.toISOString(),
            currentDay: today,
            completedAt: enrollment.completedAt?.toISOString() ?? null,
            completedCount: done.size,
          }
        : null,
      days,
    });
  })

  .post("/:slug/enroll", requireActiveSubscription, async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const body = enrollBodySchema.safeParse(await c.req.json().catch(() => ({})));
    if (!body.success) return c.json({ error: "invalid_body" }, 400);
    const program = await loadPublishedProgram(c.var.db, c.env.CONTENT, c.req.param("slug"));
    if (!program) return c.json({ error: "not_found" }, 404);
    const existing = await findEnrollment(c.var.db, user.id, program.item.id);
    const now = new Date();
    if (existing && !body.data.restart) return c.json({ ok: true, alreadyEnrolled: true });
    if (existing) {
      await c.var.db.batch([
        c.var.db
          .update(schema.programEnrollments)
          .set({ startedAt: now, currentStep: 0, completedAt: null })
          .where(eq(schema.programEnrollments.id, existing.id)),
        c.var.db
          .delete(schema.programDayCompletions)
          .where(
            and(
              eq(schema.programDayCompletions.userId, user.id),
              eq(schema.programDayCompletions.programId, program.item.id),
            ),
          ),
      ]);
    } else {
      await c.var.db.insert(schema.programEnrollments).values({
        id: crypto.randomUUID(),
        userId: user.id,
        programId: program.item.id,
        startedAt: now,
      });
    }
    return c.json({ ok: true }, existing ? 200 : 201);
  })

  .post("/:slug/days/:day/complete", requireActiveSubscription, async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const day = Number(c.req.param("day"));
    if (!Number.isInteger(day) || day < 1) return c.json({ error: "invalid_day" }, 400);
    const program = await loadPublishedProgram(c.var.db, c.env.CONTENT, c.req.param("slug"));
    if (!program) return c.json({ error: "not_found" }, 404);
    const enrollment = await findEnrollment(c.var.db, user.id, program.item.id);
    if (!enrollment) return c.json({ error: "not_enrolled" }, 409);
    if (!program.steps.some((s) => s.day === day)) return c.json({ error: "not_found" }, 404);
    if (day > currentProgramDay(enrollment.startedAt)) return c.json({ error: "day_locked" }, 403);

    await c.var.db
      .insert(schema.programDayCompletions)
      .values({ userId: user.id, programId: program.item.id, day, completedAt: new Date() })
      .onConflictDoNothing();
    // Hanya hari yang masih ada di langkah terbit yang dihitung (review keamanan PR #12).
    const stepDays = new Set(program.steps.map((s) => s.day));
    const done = await completedDays(c.var.db, user.id, program.item.id);
    const n = [...done].filter((d) => stepDays.has(d)).length;
    const finished = n >= stepDays.size;
    await c.var.db
      .update(schema.programEnrollments)
      .set({
        currentStep: n,
        completedAt: finished ? (enrollment.completedAt ?? new Date()) : null,
      })
      .where(eq(schema.programEnrollments.id, enrollment.id));
    return c.json({ completedCount: n, finished });
  })

  .delete("/:slug/days/:day/complete", async (c) => {
    // biome-ignore lint/style/noNonNullAssertion: dijamin requireAuth
    const user = c.var.user!;
    const day = Number(c.req.param("day"));
    if (!Number.isInteger(day) || day < 1) return c.json({ error: "invalid_day" }, 400);
    const item = await c.var.db.query.contentItems.findFirst({
      where: and(
        eq(schema.contentItems.type, "program"),
        eq(schema.contentItems.slug, c.req.param("slug")),
      ),
      columns: { id: true },
    });
    // Selalu 204 agar keberadaan slug program yang belum terbit tidak terbocorkan.
    if (!item) return c.body(null, 204);
    await c.var.db
      .delete(schema.programDayCompletions)
      .where(
        and(
          eq(schema.programDayCompletions.userId, user.id),
          eq(schema.programDayCompletions.programId, item.id),
          eq(schema.programDayCompletions.day, day),
        ),
      );
    await c.var.db
      .update(schema.programEnrollments)
      .set({ completedAt: null })
      .where(
        and(
          eq(schema.programEnrollments.userId, user.id),
          eq(schema.programEnrollments.programId, item.id),
        ),
      );
    return c.body(null, 204);
  });
