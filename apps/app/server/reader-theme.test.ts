/**
 * Tema baca per ebook (D51): hanya admin yang mengubah, nilai divalidasi ketat (tidak bisa
 * menyelipkan CSS), dan tema ikut dikirim ke reader serta halaman publik.
 */
import { describe, expect, it } from "vitest";
import { call, createUser, grantSubscription } from "../test/helpers";

const json = (body: unknown) => ({
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

async function setup() {
  const admin = await createUser({ role: "admin" });
  const slug = `tema-${crypto.randomUUID().slice(0, 8)}`;
  const { id } = (await (
    await call("/api/v1/studio/ebooks", {
      method: "POST",
      token: admin.token,
      ...json({ title: "Bertema", slug }),
    })
  ).json()) as { id: string };
  return { admin, id, slug };
}

const putTheme = (id: string, token: string, theme: unknown) =>
  call(`/api/v1/studio/content/${id}/theme`, { method: "PUT", token, ...json({ theme }) });

const THEME = { accent: "#b3261e", heading: "serif", callout: "tape", ornament: "star" };

describe("tema baca ebook", () => {
  it("hanya admin yang boleh mengubah tema", async () => {
    const { id } = await setup();
    const member = await createUser();
    expect((await putTheme(id, member.token, THEME)).status).toBe(403);
    expect(
      (
        await call(`/api/v1/studio/content/${id}/theme`, {
          method: "PUT",
          ...json({ theme: THEME }),
        })
      ).status,
    ).toBe(401);
  });

  it("menolak nilai yang tidak valid", async () => {
    const { admin, id } = await setup();
    expect((await putTheme(id, admin.token, { accent: "red" })).status).toBe(400);
    expect((await putTheme(id, admin.token, { accent: "#000000;}body{x" })).status).toBe(400);
    expect((await putTheme(id, admin.token, { accent: "#000000", heading: "comic" })).status).toBe(
      400,
    );
  });

  it("tema tersimpan, terbaca Studio, reader, dan halaman publik; null menghapus", async () => {
    const { admin, id, slug } = await setup();
    const r = await putTheme(id, admin.token, THEME);
    expect(r.status).toBe(200);
    const meta = (await (
      await call(`/api/v1/studio/content/${id}/category`, { token: admin.token })
    ).json()) as { theme: { accent: string; paper: string } };
    expect(meta.theme).toMatchObject({ accent: "#b3261e", paper: "plain" });

    await call(`/api/v1/studio/content/${id}`, {
      method: "PATCH",
      token: admin.token,
      ...json({ status: "published" }),
    });
    const reader = await createUser();
    await grantSubscription(reader.id);
    const book = (await (await call(`/api/v1/ebooks/${slug}`, { token: reader.token })).json()) as {
      ebook: { theme: { callout: string } | null };
    };
    expect(book.ebook.theme?.callout).toBe("tape");
    const pub = (await (await call(`/api/v1/catalog/content/ebook/${slug}`)).json()) as {
      theme: { heading: string } | null;
    };
    expect(pub.theme?.heading).toBe("serif");

    expect((await putTheme(id, admin.token, null)).status).toBe(200);
    const after = (await (
      await call(`/api/v1/ebooks/${slug}`, { token: reader.token })
    ).json()) as {
      ebook: { theme: unknown };
    };
    expect(after.ebook.theme).toBeNull();
  });
});
