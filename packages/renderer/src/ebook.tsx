import type { EbookDoc, EbookMark, EbookNode } from "@selfgrow/shared";
import type { ReactNode } from "react";

/**
 * Render isi bab (JSON yang sudah lolos `ebookDocSchema`) menjadi elemen React.
 * WAJIB tanpa innerHTML (BLUEPRINT bagian 5): setiap node dipetakan ke elemen yang dikenal,
 * node lain diabaikan. Tautan & gambar diverifikasi ulang di sini sebagai lapisan kedua.
 */
export interface RenderOptions {
  /** Ubah teks sebelum ditampilkan (dipakai watermark forensik). */
  transformText?: (text: string) => string;
}

const SAFE_HREF = /^(https?:\/\/|mailto:)/i;
const SAFE_IMG = /^(https:\/\/[^\s]+|\/api\/v1\/assets\/[A-Za-z0-9_-]+)$/;

function applyMarks(content: ReactNode, marks: EbookMark[] | undefined, key: string): ReactNode {
  let out = content;
  for (const [i, mark] of (marks ?? []).entries()) {
    const k = `${key}-m${i}`;
    switch (mark.type) {
      case "bold":
        out = <strong key={k}>{out}</strong>;
        break;
      case "italic":
        out = <em key={k}>{out}</em>;
        break;
      case "underline":
        out = <u key={k}>{out}</u>;
        break;
      case "strike":
        out = <s key={k}>{out}</s>;
        break;
      case "code":
        out = <code key={k}>{out}</code>;
        break;
      case "link":
        if (SAFE_HREF.test(mark.attrs.href)) {
          out = (
            <a key={k} href={mark.attrs.href} target="_blank" rel="noopener noreferrer nofollow">
              {out}
            </a>
          );
        }
        break;
    }
  }
  return out;
}

function renderNodes(
  nodes: EbookNode[] | undefined,
  opts: RenderOptions,
  key: string,
): ReactNode[] {
  return (nodes ?? []).map((n, i) => renderNode(n, opts, `${key}.${i}`));
}

function renderNode(node: EbookNode, opts: RenderOptions, key: string): ReactNode {
  switch (node.type) {
    case "text": {
      const text = opts.transformText ? opts.transformText(node.text) : node.text;
      return <span key={key}>{applyMarks(text, node.marks, key)}</span>;
    }
    case "paragraph":
      return <p key={key}>{renderNodes(node.content, opts, key)}</p>;
    case "heading": {
      const children = renderNodes(node.content, opts, key);
      if (node.attrs.level === 2) return <h2 key={key}>{children}</h2>;
      if (node.attrs.level === 3) return <h3 key={key}>{children}</h3>;
      return <h4 key={key}>{children}</h4>;
    }
    case "bulletList":
      return <ul key={key}>{renderNodes(node.content, opts, key)}</ul>;
    case "orderedList":
      return (
        <ol key={key} start={node.attrs?.start}>
          {renderNodes(node.content, opts, key)}
        </ol>
      );
    case "listItem":
      return <li key={key}>{renderNodes(node.content, opts, key)}</li>;
    case "blockquote":
      return <blockquote key={key}>{renderNodes(node.content, opts, key)}</blockquote>;
    case "horizontalRule":
      return <hr key={key} />;
    case "hardBreak":
      return <br key={key} />;
    case "image":
      if (!SAFE_IMG.test(node.attrs.src)) return null;
      return (
        <figure key={key}>
          <img
            src={node.attrs.src}
            alt={node.attrs.alt ?? ""}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          {node.attrs.title ? <figcaption>{node.attrs.title}</figcaption> : null}
        </figure>
      );
    case "callout":
      return (
        <aside key={key} className={`callout callout-${node.attrs.variant}`} role="note">
          {renderNodes(node.content, opts, key)}
        </aside>
      );
    default:
      return null;
  }
}

export function EbookContent({ doc, options = {} }: { doc: EbookDoc; options?: RenderOptions }) {
  return <div className="ebook-content">{renderNodes(doc.content, options, "n")}</div>;
}
