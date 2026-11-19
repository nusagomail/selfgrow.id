import { type EbookDoc, EMPTY_EBOOK_DOC } from "@selfgrow/shared";

/**
 * Lokasi isi ebook di R2 (BLUEPRINT bagian 5). Draft adalah salinan kerja Studio (autosave);
 * published adalah yang dibaca pelanggan. Snapshot versi dibuat setiap ebook diterbitkan.
 */
export const ebookKeys = {
  draft: (contentId: string, chapterId: string) => `ebooks/${contentId}/chapters/${chapterId}.json`,
  published: (contentId: string, chapterId: string) =>
    `ebooks/${contentId}/published/${chapterId}.json`,
  version: (contentId: string, version: number) => `ebooks/${contentId}/versions/${version}.json`,
};

const JSON_META = { httpMetadata: { contentType: "application/json" } };

export async function readDoc(bucket: R2Bucket, key: string): Promise<EbookDoc | null> {
  const obj = await bucket.get(key);
  if (!obj) return null;
  return (await obj.json()) as EbookDoc;
}

export function writeDoc(bucket: R2Bucket, key: string, doc: EbookDoc) {
  return bucket.put(key, JSON.stringify(doc), JSON_META);
}

export async function readDraftOrEmpty(bucket: R2Bucket, contentId: string, chapterId: string) {
  return (await readDoc(bucket, ebookKeys.draft(contentId, chapterId))) ?? EMPTY_EBOOK_DOC;
}

export function writeJson(bucket: R2Bucket, key: string, value: unknown) {
  return bucket.put(key, JSON.stringify(value), JSON_META);
}
