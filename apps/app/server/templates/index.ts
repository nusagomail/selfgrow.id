import type { EbookDoc, TemplateFormat } from "@selfgrow/shared";
import { renderDocx } from "./docx";
import { renderPdf } from "./pdf";
import type { DocMeta } from "./walk";
import { renderXlsx } from "./xlsx";

export const CONTENT_TYPES: Record<TemplateFormat, string> = {
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export function renderDocument(format: TemplateFormat, doc: EbookDoc, meta: DocMeta) {
  if (format === "docx") return renderDocx(doc, meta);
  if (format === "pdf") return renderPdf(doc, meta);
  return Promise.resolve(renderXlsx(doc, meta));
}

export type { DocMeta };
