import {
  type AnimChartAttrs,
  CALLOUT_LABELS,
  type EbookDoc,
  type EbookMark,
  type EbookNode,
  type QuizAttrs,
  quizHint,
  quizLabel,
  quizMode,
  quizOptionPoints,
  type ToolEmbedAttrs,
} from "@selfgrow/shared";
import type React from "react";
import type { ReactNode } from "react";
import { barWidths, formatChartValue } from "./interactive-format";
import { tableLayout } from "./table";

/**
 * Render isi bab (JSON yang sudah lolos `ebookDocSchema`) menjadi elemen React.
 * WAJIB tanpa innerHTML (BLUEPRINT bagian 5): setiap node dipetakan ke elemen yang dikenal,
 * node lain diabaikan. Tautan & gambar diverifikasi ulang di sini sebagai lapisan kedua.
 */
export interface RenderOptions {
  /** Ubah teks sebelum ditampilkan (dipakai watermark forensik). */
  transformText?: (text: string) => string;
  /** Tool yang ditanam di bab (D42). Tanpa ini tampil kartu ajakan statis. */
  renderTool?: (attrs: ToolEmbedAttrs, key: string) => ReactNode;
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
    case "blockquote": {
      const cite = node.attrs?.cite?.trim();
      if (!cite) return <blockquote key={key}>{renderNodes(node.content, opts, key)}</blockquote>;
      // Kutipan bertokoh (D40): nama tokoh tampil di bawah kutipan.
      return (
        <figure key={key} className="quote">
          <blockquote>{renderNodes(node.content, opts, key)}</blockquote>
          <figcaption>{cite}</figcaption>
        </figure>
      );
    }
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
    case "table": {
      // Label kolom di tiap sel supaya tabel lebar bisa tampil sebagai kartu di layar sempit.
      const layout = tableLayout(node);
      return (
        <div key={key} className="table-wrap">
          <table className={layout.wide ? "wide" : undefined}>
            <tbody>
              {node.content.map((row, r) => {
                const rk = `${key}.${r}`;
                if (row.type !== "tableRow") return renderNode(row, opts, rk);
                return (
                  <tr key={rk}>
                    {row.content.map((cell, ci) => {
                      const ck = `${rk}.${ci}`;
                      if (cell.type !== "tableCell" && cell.type !== "tableHeader") {
                        return renderNode(cell, opts, ck);
                      }
                      const Tag = cell.type === "tableHeader" ? "th" : "td";
                      return (
                        <Tag
                          key={ck}
                          colSpan={cell.attrs?.colspan}
                          rowSpan={cell.attrs?.rowspan}
                          data-label={layout.labels[ci] || undefined}
                        >
                          {renderNodes(cell.content, opts, ck)}
                        </Tag>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    case "tableRow":
      return <tr key={key}>{renderNodes(node.content, opts, key)}</tr>;
    case "tableHeader":
    case "tableCell": {
      const Tag = node.type === "tableHeader" ? "th" : "td";
      return (
        <Tag key={key} colSpan={node.attrs?.colspan} rowSpan={node.attrs?.rowspan}>
          {renderNodes(node.content, opts, key)}
        </Tag>
      );
    }
    case "callout":
      return (
        <aside
          key={key}
          className={`callout callout-${node.attrs.variant}`}
          role="note"
          aria-label={CALLOUT_LABELS[node.attrs.variant]}
        >
          <span className="callout-label" aria-hidden="true">
            {CALLOUT_LABELS[node.attrs.variant]}
          </span>
          {renderNodes(node.content, opts, key)}
        </aside>
      );
    case "quiz":
      return <Quiz key={key} attrs={node.attrs} t={opts.transformText ?? ((x) => x)} />;
    case "toolEmbed":
      return opts.renderTool ? (
        <div key={key} className="tool-embed">
          {opts.renderTool(node.attrs, key)}
        </div>
      ) : (
        <aside key={key} className="tool-embed tool-embed-static">
          <span className="callout-label">Coba langsung</span>
          <b>{node.attrs.title ?? "Kalkulator interaktif"}</b>
          {node.attrs.intro ? <p>{node.attrs.intro}</p> : null}
          <p className="tool-embed-note">
            Kalkulator ini bisa diisi langsung di aplikasi SelfGrow.
          </p>
        </aside>
      );
    case "animChart":
      return <AnimChart key={key} attrs={node.attrs} />;
    default:
      return null;
  }
}

/**
 * Kuis (D42, bentuk D50). Markup statis yang dihidupkan oleh `enhanceInteractive`: pilihan
 * berupa radio asli, poin di `data-points`, tanggapan dan penjelasan tersembunyi sampai dijawab,
 * pita hasil disalin dari daftar tersembunyi.
 */
function Quiz({ attrs, t }: { attrs: QuizAttrs; t: (x: string) => string }) {
  const mode = quizMode(attrs);
  return (
    <form
      className={`quiz quiz-${mode}`}
      data-quiz-id={attrs.id}
      data-mode={mode}
      aria-label={attrs.title}
    >
      <span className="callout-label">{t(quizLabel(attrs))}</span>
      <p className="quiz-title">{t(attrs.title)}</p>
      {attrs.intro ? <p className="quiz-intro">{t(attrs.intro)}</p> : null}
      <ol className="quiz-qs">
        {attrs.questions.map((q, qi) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: urutan pertanyaan tetap
          <li key={qi}>
            <fieldset>
              <legend>{t(q.q)}</legend>
              <div className="quiz-opts">
                {q.options.map((o, oi) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: urutan pilihan tetap
                  <label key={oi} className="quiz-opt">
                    <input
                      type="radio"
                      name={`q${qi}`}
                      value={oi}
                      data-points={quizOptionPoints(attrs, o)}
                      data-correct={o.correct ? "1" : undefined}
                    />
                    <span>{t(o.label)}</span>
                  </label>
                ))}
              </div>
              {mode === "scale" && attrs.ends ? (
                <p className="quiz-ends" aria-hidden="true">
                  <span>{t(attrs.ends[0])}</span>
                  <span>{t(attrs.ends[1])}</span>
                </p>
              ) : null}
              {q.options.map((o, oi) =>
                o.feedback ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: urutan pilihan tetap
                  <p key={oi} className="quiz-fb" data-for={oi} hidden>
                    {t(o.feedback)}
                  </p>
                ) : null,
              )}
              {q.explain ? (
                <p className="quiz-explain" hidden>
                  {t(q.explain)}
                </p>
              ) : null}
            </fieldset>
          </li>
        ))}
      </ol>
      <ul className="quiz-bands" hidden>
        {attrs.results.map((r, ri) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: urutan hasil tetap
          <li key={ri} data-min={r.min} data-max={r.max}>
            <b>{t(r.title)}</b>
            {r.text ? <span>{t(r.text)}</span> : null}
          </li>
        ))}
      </ul>
      <div className="quiz-result" aria-live="polite" hidden />
      <p className="quiz-hint">{quizHint(attrs)}</p>
    </form>
  );
}

/** Grafik bergerak (D42): batang tumbuh dan angka berhitung saat halaman terlihat. */
function AnimChart({ attrs }: { attrs: AnimChartAttrs }) {
  const widths = barWidths(attrs.items);
  return (
    <figure
      className={`anim-chart anim-kind-${attrs.kind}`}
      data-anim=""
      data-format={attrs.format}
    >
      <figcaption className="anim-title">{attrs.title}</figcaption>
      {attrs.kind === "bars" ? (
        <div className="anim-bars">
          {attrs.items.map((it, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: urutan data tetap
            <div key={i} className="anim-row">
              <span className="anim-label">{it.label}</span>
              <span className="anim-track">
                <span
                  className="anim-bar"
                  style={
                    {
                      "--w": `${widths[i]}%`,
                      "--c": it.color ?? undefined,
                      "--i": i,
                    } as React.CSSProperties
                  }
                />
              </span>
              <span className="anim-num" data-value={it.value}>
                {formatChartValue(it.value, attrs.format)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="anim-counters">
          {attrs.items.map((it, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: urutan data tetap
              key={i}
              className="anim-counter"
              style={{ "--c": it.color ?? undefined } as React.CSSProperties}
            >
              <b className="anim-num" data-value={it.value}>
                {formatChartValue(it.value, attrs.format)}
              </b>
              <span>{it.label}</span>
            </div>
          ))}
        </div>
      )}
      {attrs.note ? <p className="anim-note">{attrs.note}</p> : null}
    </figure>
  );
}

export function EbookContent({ doc, options = {} }: { doc: EbookDoc; options?: RenderOptions }) {
  return <div className="ebook-content">{renderNodes(doc.content, options, "n")}</div>;
}
