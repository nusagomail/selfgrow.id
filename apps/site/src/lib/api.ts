import { env } from "cloudflare:workers";

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

export interface CatalogItem {
  type: ContentType;
  slug: string;
  title: string;
  summary: string | null;
  topic: string | null;
  publishedAt: string | null;
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

/** Tautan ke aplikasi (login, baca, pakai tool). */
export function appUrl(path = "/"): string {
  return new URL(path, env.APP_URL || "http://localhost:5173").toString();
}

export const TYPE_LABEL: Record<ContentType, string> = {
  ebook: "Ebook",
  tool: "Tool",
  template: "Template",
  program: "Program",
};

const TYPE_PATH: Record<ContentType, string> = {
  ebook: "/baca",
  tool: "/tools",
  template: "/template",
  program: "/program",
};

export function itemUrl(item: Pick<CatalogItem, "type" | "slug">): string {
  return appUrl(`${TYPE_PATH[item.type]}/${encodeURIComponent(item.slug)}`);
}

/** Cache edge singkat untuk halaman publik (isi sama untuk semua pengunjung). */
export function setPublicCache(headers: Headers, seconds = 120) {
  headers.set("Cache-Control", `public, max-age=60, s-maxage=${seconds}`);
}
