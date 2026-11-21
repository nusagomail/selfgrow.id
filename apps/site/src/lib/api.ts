import { env } from "cloudflare:workers";
import type { EbookDoc } from "@selfgrow/shared";

export type ContentType = "ebook" | "tool" | "template" | "program";

export interface Topic {
  slug: string;
  name: string;
  count: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string | null;
  hook: string | null;
  count: number;
  topics: Topic[];
}

/** `free` = gratis, `preview` = ebook dengan bab gratis, `premium` = khusus pelanggan. */
export type Access = "free" | "preview" | "premium";

export interface CatalogItem {
  type: ContentType;
  slug: string;
  title: string;
  summary: string | null;
  topic: string | null;
  access: Access;
  /** Ebook terbit yang isinya belum ada (D38). */
  comingSoon?: boolean;
  coverUrl: string | null;
  publishedAt: string | null;
}

export interface FeedItem {
  type: ContentType;
  slug: string;
  title: string;
  summary: string | null;
  access: Access;
  comingSoon?: boolean;
  coverUrl: string | null;
  category: { slug: string; name: string } | null;
  publishedAt: string | null;
}

export interface ContentDetail {
  type: ContentType;
  slug: string;
  title: string;
  summary: string | null;
  access: Access;
  comingSoon?: boolean;
  coverUrl: string | null;
  category: { slug: string; name: string } | null;
  topic: { slug: string; name: string } | null;
  publishedAt: string | null;
  updatedAt: string;
  ebook: { chapters: { id: string; title: string; free: boolean }[] } | null;
  program: { durationDays: number; days: { day: number; title: string }[] } | null;
}

export interface CategoryDetail {
  category: Omit<Category, "count" | "topics">;
  topic: { slug: string; name: string } | null;
  topics: Topic[];
  items: CatalogItem[];
}

/** Ambil katalog publik dari Worker app (service binding) atau server dev lokal. */
async function getJson<T>(path: string): Promise<T | null> {
  const url = `/api/v1/catalog${path}`;
  const res = env.LOCAL_API_ORIGIN
    ? await fetch(`${env.LOCAL_API_ORIGIN}${url}`)
    : env.APP
      ? await env.APP.fetch(new Request(`https://app.internal${url}`))
      : null;
  if (!res || res.status === 404) return null;
  if (!res.ok) throw new Error(`Katalog gagal dimuat (${res.status})`);
  return (await res.json()) as T;
}

export async function getCategories(): Promise<Category[]> {
  return (await getJson<{ categories: Category[] }>("/categories"))?.categories ?? [];
}

export function getCategory(slug: string, topic?: string) {
  const q = topic ? `?topik=${encodeURIComponent(topic)}` : "";
  return getJson<CategoryDetail>(`/categories/${encodeURIComponent(slug)}${q}`);
}

export async function getItems(): Promise<FeedItem[]> {
  return (await getJson<{ items: FeedItem[] }>("/items"))?.items ?? [];
}

export function getContent(type: ContentType, slug: string) {
  return getJson<ContentDetail>(`/content/${type}/${encodeURIComponent(slug)}`);
}

export function getPreview(slug: string) {
  return getJson<{ chapter: { id: string; title: string }; doc: EbookDoc }>(
    `/ebooks/${encodeURIComponent(slug)}/preview`,
  );
}

export const ACCESS_LABEL: Record<Access, string> = {
  free: "Gratis",
  preview: "Bab gratis",
  premium: "Premium",
};

/** Halaman publik konten di etalase (BLUEPRINT bagian 10: /ebook/{slug}, /tools/{slug}, ...). */
export const SITE_PATH: Record<ContentType, string> = {
  ebook: "/ebook",
  tool: "/tools",
  template: "/template",
  program: "/program",
};
export const contentPath = (i: { type: ContentType; slug: string }) =>
  `${SITE_PATH[i.type]}/${encodeURIComponent(i.slug)}`;

/** Alamat sampul di etalase: /sampul/{id} (proxy ke katalog app). */
export function siteCover(coverUrl: string | null | undefined): string | null {
  const id = coverUrl?.split("/").pop();
  return id ? `/sampul/${id}` : null;
}

/** Tautan ke aplikasi (login, baca, pakai tool). */
export function appUrl(path = "/"): string {
  return new URL(path, env.APP_URL || "http://localhost:5173").toString();
}

/** Cache edge singkat untuk halaman publik (isi sama untuk semua pengunjung). */
export function setPublicCache(headers: Headers, seconds = 120) {
  headers.set("Cache-Control", `public, max-age=60, s-maxage=${seconds}`);
}
