/**
 * Akses admin (pemilik): akses penuh tanpa langganan untuk meninjau konten sebagai pelanggan,
 * atau tampilan pengunjung tanpa langganan. Member tidak terpengaruh dan tidak bisa memakainya.
 */
import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { call, createUser } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

async function paidChapter() {
  const admin = await createUser({ role: "admin" });
  const slug = `adm-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Ebook", slug }),
    })
  ).json()) as { id: string };
  const { id: chapterId } = (await (
    await call(`/api/v1/studio/content/${id}/chapters`, {
      method: "POST",
      token: admin.token,
      ...json({ title: "Bab berbayar" }),
    })
  ).json()) as { id: string };
  await call(`/api/v1/studio/chapters/${chapterId}`, {
    method: "PUT",
    token: admin.token,
    ...json({
      status: "published",
      doc: {
        type: "doc",
        content: [{ type: "paragraph", content: [{ type: "text", text: "isi" }] }],
      },
    }),
  });
  await call(`/api/v1/studio/content/${id}`, {
    method: "PATCH",
    token: admin.token,
    ...json({ status: "published" }),
  });
  return { admin, url: `/api/v1/ebooks/${slug}/chapters/${chapterId}` };
}

type Me = { subscription: { active: boolean; adminAccess?: boolean; adminView?: string } };

describe("akses admin", () => {
  it("admin membaca bab berbayar tanpa langganan, tanpa mengubah data langganan", async () => {
    const { admin, url } = await paidChapter();
    expect((await call(url, { token: admin.token })).status).toBe(200);
    const me = (await (await call("/api/v1/me", { token: admin.token })).json()) as Me;
    expect(me.subscription).toMatchObject({
      active: true,
      adminAccess: true,
      adminView: "subscriber",
    });
    const ent = await env.DB.prepare("SELECT count(*) AS n FROM entitlements WHERE user_id = ?")
      .bind(admin.id)
      .first<{ n: number }>();
    expect(ent?.n).toBe(0);
  });

  it("tampilan pengunjung membuat admin melihat paywall, lalu bisa dikembalikan", async () => {
    const { admin, url } = await paidChapter();
    const set = (view: string) =>
      call("/api/v1/me/admin-view", { method: "PUT", token: admin.token, ...json({ view }) });
    expect((await set("visitor")).status).toBe(200);
    expect((await call(url, { token: admin.token })).status).toBe(403);
    const me = (await (await call("/api/v1/me", { token: admin.token })).json()) as Me;
    expect(me.subscription).toMatchObject({ active: false, adminView: "visitor" });
    expect((await set("subscriber")).status).toBe(200);
    expect((await call(url, { token: admin.token })).status).toBe(200);
    expect((await set("lainnya")).status).toBe(400);
  });

  it("member tanpa langganan tetap ditolak dan tidak bisa memakai tampilan admin", async () => {
    const { url } = await paidChapter();
    const m = await createUser();
    expect((await call(url, { token: m.token })).status).toBe(403);
    expect(
      (
        await call("/api/v1/me/admin-view", {
          method: "PUT",
          token: m.token,
          ...json({ view: "subscriber" }),
        })
      ).status,
    ).toBe(403);
    const me = (await (await call("/api/v1/me", { token: m.token })).json()) as Me;
    expect(me.subscription.active).toBe(false);
    expect(me.subscription.adminAccess).toBeUndefined();
  });
});
