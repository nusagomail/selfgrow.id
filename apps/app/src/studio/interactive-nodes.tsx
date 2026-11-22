import type {
  AnimChartAttrs,
  InteractiveAttrsOf,
  InteractiveKind,
  QuizAttrs,
  ToolEmbedAttrs,
} from "@selfgrow/shared";
import {
  ANIM_CHART_FORMATS,
  ANIM_CHART_KINDS,
  DEFAULT_INTERACTIVE_ATTRS,
  finalizeInteractive,
  INTERACTIVE_KEYS,
  INTERACTIVE_SCHEMAS,
  interactiveSlug,
  pickInteractive,
} from "@selfgrow/shared";
import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, type ReactNodeViewProps, ReactNodeViewRenderer } from "@tiptap/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { api } from "../lib/api";

/**
 * Unsur interaktif bab di Studio (D42): kuis, tool tertanam, grafik bergerak.
 * Disimpan sebagai node atom; isinya diubah lewat formulir dan divalidasi skema yang sama
 * dengan API sebelum masuk dokumen.
 */
const KIND_LABEL: Record<InteractiveKind, string> = {
  quiz: "Kuis",
  toolEmbed: "Tool",
  animChart: "Grafik",
};

function summary(kind: InteractiveKind, a: Record<string, unknown>): string {
  if (kind === "quiz") {
    const n = Array.isArray(a.questions) ? a.questions.length : 0;
    return `${a.title || "(tanpa judul)"} · ${n} pertanyaan`;
  }
  if (kind === "toolEmbed") return `${a.title || a.slug || "(belum dipilih)"}`;
  const n = Array.isArray(a.items) ? a.items.length : 0;
  return `${a.title || "(tanpa judul)"} · ${a.kind === "counter" ? "angka" : "batang"} · ${n} data`;
}

function makeNode(kind: InteractiveKind) {
  const tag = `div[data-sg-${kind.toLowerCase()}]`;
  return Node.create({
    name: kind,
    group: "block",
    atom: true,
    selectable: true,
    draggable: true,
    addAttributes() {
      const attrs: Record<string, { default: unknown; rendered: false }> = {};
      for (const k of INTERACTIVE_KEYS[kind]) {
        attrs[k] = {
          default: (DEFAULT_INTERACTIVE_ATTRS[kind] as Record<string, unknown>)[k] ?? null,
          rendered: false,
        };
      }
      return attrs;
    },
    parseHTML() {
      return [
        {
          tag,
          getAttrs: (el) => {
            try {
              const raw = JSON.parse((el as HTMLElement).getAttribute("data-attrs") ?? "");
              const r = INTERACTIVE_SCHEMAS[kind].safeParse(raw);
              return r.success ? (r.data as Record<string, unknown>) : false;
            } catch {
              return false;
            }
          },
        },
      ];
    },
    renderHTML({ node, HTMLAttributes }) {
      return [
        "div",
        mergeAttributes(HTMLAttributes, {
          [`data-sg-${kind.toLowerCase()}`]: "",
          "data-attrs": JSON.stringify(pickInteractive(kind, node.attrs)),
        }),
        `${KIND_LABEL[kind]}: ${summary(kind, node.attrs)}`,
      ];
    },
    addNodeView() {
      return ReactNodeViewRenderer((props: ReactNodeViewProps) => (
        <InteractiveCard kind={kind} {...props} />
      ));
    },
  });
}

export const QuizNode = makeNode("quiz");
export const ToolEmbedNode = makeNode("toolEmbed");
export const AnimChartNode = makeNode("animChart");

function InteractiveCard({
  kind,
  node,
  updateAttributes,
  deleteNode,
  selected,
}: ReactNodeViewProps & { kind: InteractiveKind }) {
  const [open, setOpen] = useState(false);
  const attrs = pickInteractive(kind, node.attrs);
  return (
    <NodeViewWrapper
      className={`sg-inode sg-inode-${kind}${selected ? " is-selected" : ""}`}
      data-drag-handle
    >
      <div className="sg-inode-head" contentEditable={false}>
        <span className="sg-inode-kind">
          {kind === "quiz" ? "❓" : kind === "toolEmbed" ? "🧮" : "📈"} {KIND_LABEL[kind]}
        </span>
        <span className="sg-inode-sum">{summary(kind, attrs)}</span>
        <button type="button" className="tb" onClick={() => setOpen(true)}>
          Ubah
        </button>
        <button type="button" className="tb" onClick={() => deleteNode()}>
          Hapus
        </button>
      </div>
      {open && (
        <InteractiveDialog
          kind={kind}
          initial={attrs as InteractiveAttrsOf[typeof kind]}
          onCancel={() => setOpen(false)}
          onSave={(a) => {
            updateAttributes(a as Record<string, unknown>);
            setOpen(false);
          }}
        />
      )}
    </NodeViewWrapper>
  );
}

/** Formulir dalam <dialog> modal. Dipakai saat menyisipkan (toolbar) dan mengubah (kartu). */
export function InteractiveDialog<K extends InteractiveKind>({
  kind,
  initial,
  onSave,
  onCancel,
}: {
  kind: K;
  initial: InteractiveAttrsOf[K];
  onSave: (attrs: InteractiveAttrsOf[K]) => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<InteractiveAttrsOf[K]>(() => structuredClone(initial));
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  const save = () => {
    const r = finalizeInteractive(kind, draft);
    if (r.ok) onSave(r.attrs);
    else setErrors(r.errors);
  };

  return (
    <dialog
      ref={ref}
      className="sg-dialog"
      aria-label={`${KIND_LABEL[kind]} interaktif`}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <h3>{KIND_LABEL[kind]}</h3>
      <div className="sg-dialog-body">
        {kind === "quiz" && (
          <QuizForm
            value={draft as QuizAttrs}
            onChange={(v) => setDraft(v as InteractiveAttrsOf[K])}
          />
        )}
        {kind === "toolEmbed" && (
          <ToolForm
            value={draft as ToolEmbedAttrs}
            onChange={(v) => setDraft(v as InteractiveAttrsOf[K])}
          />
        )}
        {kind === "animChart" && (
          <ChartForm
            value={draft as AnimChartAttrs}
            onChange={(v) => setDraft(v as InteractiveAttrsOf[K])}
          />
        )}
      </div>
      {errors.length > 0 && (
        <ul className="sg-dialog-errors" role="alert">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      <div className="sg-dialog-actions">
        <button type="button" className="tb" onClick={onCancel}>
          Batal
        </button>
        <button type="button" className="tb tb-on" onClick={save}>
          Simpan
        </button>
      </div>
    </dialog>
  );
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: kontrol isian diberikan lewat children
    <label className="sg-field">
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function replaceAt<T>(list: T[], i: number, v: T): T[] {
  return list.map((x, j) => (j === i ? v : x));
}
const removeAt = <T,>(list: T[], i: number) => list.filter((_, j) => j !== i);
const num = (s: string) => (s === "" ? 0 : Number(s));

function QuizForm({ value, onChange }: { value: QuizAttrs; onChange: (v: QuizAttrs) => void }) {
  const set = (patch: Partial<QuizAttrs>) => onChange({ ...value, ...patch });
  const mode = value.mode ?? "score";
  const knowledge = mode === "knowledge";
  const maxScore = knowledge
    ? value.questions.length
    : value.questions.reduce((s, q) => s + Math.max(0, ...q.options.map((o) => o.points)), 0);
  const setQ = (qi: number, q: QuizAttrs["questions"][number]) =>
    set({ questions: replaceAt(value.questions, qi, q) });
  return (
    <>
      <Field
        label="Bentuk kuis"
        hint="Pilih bentuk yang paling cocok dengan isi bab, supaya kuis tiap ebook tidak seragam."
      >
        <select value={mode} onChange={(e) => set({ mode: e.target.value as QuizAttrs["mode"] })}>
          <option value="score">Tes diri berpoin</option>
          <option value="scale">Skala (pilihan mendatar)</option>
          <option value="knowledge">Uji pengetahuan (ada jawaban benar)</option>
          <option value="scenario">Skenario (tanggapan per pilihan)</option>
        </select>
      </Field>
      <Field label="Label kecil (opsional)" hint="Contoh: Cek dompetmu, Kalau kamu Raka.">
        <input
          value={value.label ?? ""}
          maxLength={40}
          onChange={(e) => set({ label: e.target.value })}
        />
      </Field>
      <Field label="Judul kuis">
        <input value={value.title} onChange={(e) => set({ title: e.target.value })} />
      </Field>
      {mode === "scale" && (
        <div className="sg-row">
          <input
            aria-label="Label ujung kiri"
            placeholder="Ujung kiri, mis. Jarang"
            value={value.ends?.[0] ?? ""}
            onChange={(e) => set({ ends: [e.target.value, value.ends?.[1] ?? ""] })}
          />
          <input
            aria-label="Label ujung kanan"
            placeholder="Ujung kanan, mis. Selalu"
            value={value.ends?.[1] ?? ""}
            onChange={(e) => set({ ends: [value.ends?.[0] ?? "", e.target.value] })}
          />
        </div>
      )}
      <Field
        label="Id kuis"
        hint="Kosongkan agar dibuat dari judul. Pakai id yang sama di bab lain untuk tes ulang."
      >
        <input
          value={value.id}
          placeholder={interactiveSlug(value.title)}
          onChange={(e) => set({ id: e.target.value })}
        />
      </Field>
      <Field label="Pengantar (opsional)">
        <textarea
          rows={2}
          value={value.intro ?? ""}
          onChange={(e) => set({ intro: e.target.value })}
        />
      </Field>

      <h4>Pertanyaan</h4>
      {value.questions.map((q, qi) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: baris isian tanpa id; nilainya terkendali state
        <fieldset key={`q${qi}`} className="sg-group">
          <legend>Pertanyaan {qi + 1}</legend>
          <input
            aria-label={`Pertanyaan ${qi + 1}`}
            value={q.q}
            onChange={(e) =>
              set({ questions: replaceAt(value.questions, qi, { ...q, q: e.target.value }) })
            }
          />
          {q.options.map((o, oi) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: baris isian tanpa id; nilainya terkendali state
            <div key={`o${oi}`} className="sg-row">
              <input
                aria-label="Pilihan"
                value={o.label}
                onChange={(e) =>
                  set({
                    questions: replaceAt(value.questions, qi, {
                      ...q,
                      options: replaceAt(q.options, oi, { ...o, label: e.target.value }),
                    }),
                  })
                }
              />
              {knowledge ? (
                <label className="sg-unit">
                  <input
                    type="radio"
                    name={`benar-${qi}`}
                    checked={Boolean(o.correct)}
                    onChange={() =>
                      setQ(qi, {
                        ...q,
                        options: q.options.map((x, j) => ({ ...x, correct: j === oi })),
                      })
                    }
                  />{" "}
                  benar
                </label>
              ) : (
                <>
                  <input
                    aria-label="Poin"
                    type="number"
                    min={0}
                    max={100}
                    className="sg-num"
                    value={o.points}
                    onChange={(e) =>
                      setQ(qi, {
                        ...q,
                        options: replaceAt(q.options, oi, { ...o, points: num(e.target.value) }),
                      })
                    }
                  />
                  <span className="sg-unit">poin</span>
                </>
              )}
              {q.options.length > 2 && (
                <button
                  type="button"
                  className="tb"
                  aria-label="Hapus pilihan"
                  onClick={() =>
                    set({
                      questions: replaceAt(value.questions, qi, {
                        ...q,
                        options: removeAt(q.options, oi),
                      }),
                    })
                  }
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {(mode === "scenario" || knowledge) &&
            q.options.map((o, oi) => (
              <input
                // biome-ignore lint/suspicious/noArrayIndexKey: baris isian tanpa id; nilainya terkendali state
                key={`fb${oi}`}
                aria-label={`Tanggapan untuk pilihan ${oi + 1}`}
                placeholder={`Tanggapan saat memilih "${o.label || `pilihan ${oi + 1}`}" (opsional)`}
                value={o.feedback ?? ""}
                onChange={(e) =>
                  setQ(qi, {
                    ...q,
                    options: replaceAt(q.options, oi, { ...o, feedback: e.target.value }),
                  })
                }
              />
            ))}
          <textarea
            aria-label="Penjelasan setelah menjawab"
            rows={2}
            placeholder="Penjelasan yang muncul setelah menjawab (opsional)"
            value={q.explain ?? ""}
            onChange={(e) => setQ(qi, { ...q, explain: e.target.value })}
          />
          <div className="sg-row">
            {q.options.length < 6 && (
              <button
                type="button"
                className="tb"
                onClick={() =>
                  set({
                    questions: replaceAt(value.questions, qi, {
                      ...q,
                      options: [...q.options, { label: "", points: 0 }],
                    }),
                  })
                }
              >
                + Pilihan
              </button>
            )}
            {value.questions.length > 1 && (
              <button
                type="button"
                className="tb"
                onClick={() => set({ questions: removeAt(value.questions, qi) })}
              >
                Hapus pertanyaan
              </button>
            )}
          </div>
        </fieldset>
      ))}
      {value.questions.length < 20 && (
        <button
          type="button"
          className="tb"
          onClick={() => {
            const last = value.questions[value.questions.length - 1];
            set({
              questions: [
                ...value.questions,
                { q: "", options: (last?.options ?? []).map((o) => ({ ...o })) },
              ],
            });
          }}
        >
          + Pertanyaan
        </button>
      )}

      <h4>Hasil (skor maksimal {maxScore})</h4>
      {value.results.map((r, ri) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: baris isian tanpa id; nilainya terkendali state
        <fieldset key={`r${ri}`} className="sg-group">
          <legend>Hasil {ri + 1}</legend>
          <div className="sg-row">
            <span className="sg-unit">Skor</span>
            <input
              aria-label="Skor minimal"
              type="number"
              min={0}
              className="sg-num"
              value={r.min}
              onChange={(e) =>
                set({ results: replaceAt(value.results, ri, { ...r, min: num(e.target.value) }) })
              }
            />
            <span className="sg-unit">sampai</span>
            <input
              aria-label="Skor maksimal"
              type="number"
              min={0}
              className="sg-num"
              value={r.max}
              onChange={(e) =>
                set({ results: replaceAt(value.results, ri, { ...r, max: num(e.target.value) }) })
              }
            />
            {value.results.length > 1 && (
              <button
                type="button"
                className="tb"
                aria-label="Hapus hasil"
                onClick={() => set({ results: removeAt(value.results, ri) })}
              >
                ×
              </button>
            )}
          </div>
          <input
            aria-label="Judul hasil"
            placeholder="Judul hasil, mis. Zona aman"
            value={r.title}
            onChange={(e) =>
              set({ results: replaceAt(value.results, ri, { ...r, title: e.target.value }) })
            }
          />
          <textarea
            aria-label="Penjelasan hasil"
            rows={2}
            placeholder="Apa artinya, dan apa langkah berikutnya"
            value={r.text}
            onChange={(e) =>
              set({ results: replaceAt(value.results, ri, { ...r, text: e.target.value }) })
            }
          />
        </fieldset>
      ))}
      {value.results.length < 6 && (
        <button
          type="button"
          className="tb"
          onClick={() => {
            const last = value.results[value.results.length - 1];
            const start = last ? last.max + 1 : 0;
            set({
              results: [...value.results, { min: start, max: start, title: "", text: "" }],
            });
          }}
        >
          + Hasil
        </button>
      )}
    </>
  );
}

type ToolOption = { slug: string; title: string; status: string };

function ToolForm({
  value,
  onChange,
}: {
  value: ToolEmbedAttrs;
  onChange: (v: ToolEmbedAttrs) => void;
}) {
  const [tools, setTools] = useState<ToolOption[] | null>(null);
  useEffect(() => {
    let alive = true;
    api<{ items: (ToolOption & { type: string })[] }>("/studio/content")
      .then((r) => {
        if (alive) setTools(r.items.filter((x) => x.type === "tool"));
      })
      .catch(() => {
        if (alive) setTools([]);
      });
    return () => {
      alive = false;
    };
  }, []);
  const set = (patch: Partial<ToolEmbedAttrs>) => onChange({ ...value, ...patch });
  return (
    <>
      <Field label="Tool" hint="Hanya tool yang sudah terbit yang bisa dipakai pembaca.">
        <select value={value.slug} onChange={(e) => set({ slug: e.target.value })}>
          <option value="">{tools === null ? "Memuat…" : "Pilih tool…"}</option>
          {(tools ?? []).map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.title}
              {t.status === "published" ? "" : " (belum terbit)"}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Judul di bab (opsional)">
        <input value={value.title ?? ""} onChange={(e) => set({ title: e.target.value })} />
      </Field>
      <Field label="Pengantar (opsional)">
        <textarea
          rows={2}
          value={value.intro ?? ""}
          onChange={(e) => set({ intro: e.target.value })}
        />
      </Field>
    </>
  );
}

const KIND_TEXT: Record<(typeof ANIM_CHART_KINDS)[number], string> = {
  bars: "Batang (perbandingan)",
  counter: "Angka berhitung",
};
const FORMAT_TEXT: Record<(typeof ANIM_CHART_FORMATS)[number], string> = {
  number: "Angka",
  rupiah: "Rupiah",
  percent: "Persen",
};

function ChartForm({
  value,
  onChange,
}: {
  value: AnimChartAttrs;
  onChange: (v: AnimChartAttrs) => void;
}) {
  const set = (patch: Partial<AnimChartAttrs>) => onChange({ ...value, ...patch });
  return (
    <>
      <Field label="Judul grafik">
        <input value={value.title} onChange={(e) => set({ title: e.target.value })} />
      </Field>
      <div className="sg-row">
        <Field label="Bentuk">
          <select
            value={value.kind}
            onChange={(e) => set({ kind: e.target.value as AnimChartAttrs["kind"] })}
          >
            {ANIM_CHART_KINDS.map((k) => (
              <option key={k} value={k}>
                {KIND_TEXT[k]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Satuan">
          <select
            value={value.format}
            onChange={(e) => set({ format: e.target.value as AnimChartAttrs["format"] })}
          >
            {ANIM_CHART_FORMATS.map((f) => (
              <option key={f} value={f}>
                {FORMAT_TEXT[f]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <h4>Data</h4>
      {value.items.map((it, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: baris isian tanpa id; nilainya terkendali state
        <div key={`i${i}`} className="sg-row">
          <input
            aria-label="Label"
            placeholder="Label"
            value={it.label}
            onChange={(e) =>
              set({ items: replaceAt(value.items, i, { ...it, label: e.target.value }) })
            }
          />
          <input
            aria-label="Nilai"
            type="number"
            min={0}
            className="sg-num sg-num-wide"
            value={it.value}
            onChange={(e) =>
              set({ items: replaceAt(value.items, i, { ...it, value: num(e.target.value) }) })
            }
          />
          <input
            aria-label="Warna"
            type="color"
            value={it.color ?? "#b0570f"}
            onChange={(e) =>
              set({ items: replaceAt(value.items, i, { ...it, color: e.target.value }) })
            }
          />
          {value.items.length > 1 && (
            <button
              type="button"
              className="tb"
              aria-label="Hapus data"
              onClick={() => set({ items: removeAt(value.items, i) })}
            >
              ×
            </button>
          )}
        </div>
      ))}
      {value.items.length < 12 && (
        <button
          type="button"
          className="tb"
          onClick={() => set({ items: [...value.items, { label: "", value: 0 }] })}
        >
          + Data
        </button>
      )}
      <Field label="Catatan/sumber (opsional)">
        <input value={value.note ?? ""} onChange={(e) => set({ note: e.target.value })} />
      </Field>
    </>
  );
}
