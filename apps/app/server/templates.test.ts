/**
 * Template Builder (Fase 1B): Studio membuat & menerbitkan, pelanggan mengunduh DOCX/PDF/XLSX.
 * WAJIB: butuh langganan, kuota unduh 20/bulan, draft tidak dipakai, ID pelanggan di metadata.
 */
import { env } from "cloudflare:test";
import { STARTER_TEMPLATE } from "@selfgrow/shared";
import { strFromU8, unzipSync } from "fflate";
import { beforeAll, describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";

// Generator DOCX/PDF/XLSX dimuat lazy di aplikasi. Muat sekali di awal (waktu import library
// besar di runner CI yang sibuk bisa melewati batas 5 detik per test).
beforeAll(async () => {
  await import("./templates");
}, 60_000);

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const INPUT = { nama: "Dhuha", minggu: 3, target: "Lari 5K", catatan: null };

async function setupTemplate(opts: { publish?: boolean } = {}) {
  const admin = await createUser({ role: "admin" });
  const slug = `tpl-${crypto.randomUUID().slice(0, 8)}`;
  const r = await call("/api/v1/studio/templates", {
    method: "POST",
    token: admin.token,
    ...json({ title: "Rencana Mingguan", slug }),
  });
  expect(r.status).toBe(201);
  const { id } = (await r.json()) as { id: string };
  if (opts.publish !== false) {
    const p = await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    expect(p.status).toBe(200);
  }
  return { admin, id, slug };
}

async function subscriber() {
  const u = await createUser();
  await grantSubscription(u.id);
  return u;
}

const generate = (slug: string, token: string, format = "docx", input: unknown = INPUT) =>
  call(`/api/v1/templates/${slug}/generate`, { method: "POST", token, ...json({ format, input }) });

describe("Studio Template Builder", () => {
  it("member tidak bisa membuat atau membaca template di Studio", async () => {
    const { id } = await setupTemplate();
    const m = await subscriber();
    expect(
      (
        await call("/api/v1/studio/templates", {
          method: "POST",
          token: m.token,
          ...json({ title: "x", slug: "x" }),
        })
      ).status,
    ).toBe(403);
    expect((await call(`/api/v1/studio/templates/${id}`, { token: m.token })).status).toBe(403);
  });

  it("template dengan placeholder tak dikenal tidak bisa diterbitkan", async () => {
    const { admin, id } = await setupTemplate({ publish: false });
    const bad = {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "Halo {{tidak_ada}}" }] }],
    };
    const save = await call(`/api/v1/studio/templates/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({ config: STARTER_TEMPLATE.config, body: bad }),
    });
    expect(save.status).toBe(200);
    expect(((await save.json()) as { problems: string[] }).problems.length).toBe(1);
    const pub = await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    expect(pub.status).toBe(400);
    const row = await env.DB.prepare("SELECT status FROM content_items WHERE id = ?")
      .bind(id)
      .first<{ status: string }>();
    expect(row?.status).toBe("draft");
  });

  it("pratinjau di Studio menghasilkan file tanpa memotong kuota", async () => {
    const { admin, id } = await setupTemplate({ publish: false });
    const r = await call(`/api/v1/studio/templates/${id}/preview`, {
      method: "POST",
      token: admin.token,
      ...json({ ...STARTER_TEMPLATE, format: "pdf", input: INPUT }),
    });
    expect(r.status).toBe(200);
    expect(r.headers.get("content-type")).toBe("application/pdf");
    const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM usage_counters WHERE user_id = ?")
      .bind(admin.id)
      .first<{ n: number }>();
    expect(n?.n).toBe(0);
  });
});

describe("unduh template", () => {
  it("info template untuk pelanggan tidak memuat isi template", async () => {
    const { slug } = await setupTemplate();
    const u = await subscriber();
    const r = await call(`/api/v1/templates/${slug}`, { token: u.token });
    expect(r.status).toBe(200);
    const text = await r.text();
    expect(text).toContain("Target utama minggu ini");
    expect(text).not.toContain("{{#if");
    expect(text).not.toContain("Selesai?");
  });

  it("tanpa login 401, tanpa langganan 403", async () => {
    const { slug } = await setupTemplate();
    expect(
      (
        await call(`/api/v1/templates/${slug}/generate`, {
          method: "POST",
          ...json({ format: "docx", input: INPUT }),
        })
      ).status,
    ).toBe(401);
    const u = await createUser();
    expect((await generate(slug, u.token)).status).toBe(403);
  });

  it("pelanggan mengunduh DOCX berisi isian dan ID-nya di metadata", async () => {
    const { slug } = await setupTemplate();
    const u = await subscriber();
    const r = await generate(slug, u.token, "docx");
    expect(r.status).toBe(200);
    expect(r.headers.get("content-disposition")).toContain(
      'filename="Rencana Mingguan Dhuha.docx"',
    );
    expect(r.headers.get("cache-control")).toBe("private, no-store");
    expect(r.headers.get("x-downloads-used")).toBe("1");
    // Riwayat unduhan untuk halaman Profil (D33).
    const hist = await env.DB.prepare(
      "SELECT file_name, format FROM template_downloads WHERE user_id = ?",
    )
      .bind(u.id)
      .all<{ file_name: string; format: string }>();
    expect(hist.results).toEqual([{ file_name: "Rencana Mingguan Dhuha.docx", format: "docx" }]);
    const zip = unzipSync(new Uint8Array(await r.arrayBuffer()));
    expect(strFromU8(zip["word/document.xml"] as Uint8Array)).toContain("Rencana Mingguan Dhuha");
    expect(strFromU8(zip["docProps/core.xml"] as Uint8Array)).toContain(`selfgrow:${u.id}`);
  });

  it("gagal mencatat riwayat unduhan tidak menggagalkan unduhan (kuota sudah terpotong)", async () => {
    const { slug } = await setupTemplate();
    const u = await subscriber();
    await env.DB.prepare("ALTER TABLE template_downloads RENAME TO template_downloads_off").run();
    try {
      const r = await generate(slug, u.token, "pdf");
      expect(r.status).toBe(200);
      expect(r.headers.get("x-downloads-used")).toBe("1");
    } finally {
      await env.DB.prepare("ALTER TABLE template_downloads_off RENAME TO template_downloads").run();
    }
  });

  it("format yang tidak diaktifkan ditolak", async () => {
    const { admin, id, slug } = await setupTemplate({ publish: false });
    await call(`/api/v1/studio/templates/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({
        config: { ...STARTER_TEMPLATE.config, outputFormats: ["pdf"] },
        body: STARTER_TEMPLATE.body,
      }),
    });
    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    const u = await subscriber();
    expect((await generate(slug, u.token, "docx")).status).toBe(400);
    expect((await generate(slug, u.token, "pdf")).status).toBe(200);
  });

  it("isian tidak valid 400 dan tidak memotong kuota", async () => {
    const { slug } = await setupTemplate();
    const u = await subscriber();
    expect(
      (await generate(slug, u.token, "pdf", { nama: "A", minggu: 999, target: "x" })).status,
    ).toBe(400);
    const ok = await generate(slug, u.token, "pdf");
    expect(ok.headers.get("x-downloads-used")).toBe("1");
  });

  it("kuota unduh 20 per bulan, ke-21 ditolak 429", async () => {
    const { slug } = await setupTemplate();
    const u = await subscriber();
    const period = new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 7);
    await env.DB.prepare(
      "INSERT INTO usage_counters (user_id, period, metric, count) VALUES (?, ?, 'downloads', 20)",
    )
      .bind(u.id, period)
      .run();
    const r = await generate(slug, u.token, "xlsx");
    expect(r.status).toBe(429);
    expect(((await r.json()) as { error: string }).error).toBe("quota_exceeded");
  });

  it("draft Studio tidak dipakai sampai diterbitkan ulang", async () => {
    const { admin, id, slug } = await setupTemplate();
    const changed = structuredClone(STARTER_TEMPLATE.body);
    (changed.content[0] as { content: { text: string }[] }).content[0] = {
      text: "JUDUL BARU {{nama}}",
    } as never;
    (changed.content[0] as { content: { type: string; text: string }[] }).content[0] = {
      type: "text",
      text: "JUDUL BARU {{nama}}",
    };
    await call(`/api/v1/studio/templates/${id}`, {
      method: "PUT",
      token: admin.token,
      ...json({ config: STARTER_TEMPLATE.config, body: changed }),
    });
    const u = await subscriber();
    const docText = async () => {
      const r = await generate(slug, u.token, "docx");
      return strFromU8(
        unzipSync(new Uint8Array(await r.arrayBuffer()))["word/document.xml"] as Uint8Array,
      );
    };
    expect(await docText()).not.toContain("JUDUL BARU");
    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    expect(await docText()).toContain("JUDUL BARU Dhuha");
  });

  it("template draft tidak bisa diakses", async () => {
    const { slug } = await setupTemplate({ publish: false });
    const u = await subscriber();
    expect((await call(`/api/v1/templates/${slug}`, { token: u.token })).status).toBe(404);
    expect((await generate(slug, u.token)).status).toBe(404);
  });
});
