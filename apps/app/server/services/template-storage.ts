import type { EbookDoc, TemplateConfig } from "@selfgrow/shared";

/** Lokasi template di R2: draft (Studio) dan versi terbit (dipakai pelanggan). */
export const templateKeys = {
  draft: (id: string) => `templates/${id}/body.json`,
  published: (id: string) => `templates/${id}/published.json`,
};

export interface PublishedTemplate {
  config: TemplateConfig;
  body: EbookDoc;
}

export async function readJson<T>(bucket: R2Bucket, key: string): Promise<T | null> {
  const obj = await bucket.get(key);
  return obj ? ((await obj.json()) as T) : null;
}
