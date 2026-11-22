import {
  EBOOK_CALLOUT_STYLES,
  EBOOK_HEADING_FONTS,
  EBOOK_ORNAMENTS,
  EBOOK_PAPERS,
  type EbookTheme,
  ebookThemeAttrs,
  ebookThemeSchema,
} from "@selfgrow/shared";
import "@selfgrow/renderer/book.css";
import { type CSSProperties, useEffect, useState } from "react";
import { api } from "../lib/api";

const LABEL: Record<string, string> = {
  sans: "Sans (bawaan)",
  serif: "Serif klasik",
  hand: "Tulisan tangan",
  mono: "Mesin ketik",
  condensed: "Tegak sempit",
  soft: "Lembut (bawaan)",
  outline: "Garis tepi",
  card: "Kartu berbayang",
  tape: "Selotip",
  bar: "Garis atas",
  line: "Garis (bawaan)",
  dots: "Titik-titik",
  wave: "Gelombang",
  star: "Bintang",
  none: "Tanpa ornamen",
  plain: "Polos (bawaan)",
  grid: "Kotak-kotak",
  lined: "Bergaris",
};

const DEFAULT: EbookTheme = {
  accent: "#1d7a34",
  heading: "sans",
  callout: "soft",
  ornament: "line",
  paper: "plain",
};

/**
 * Tema baca ebook (D51): aksen, huruf judul, gaya kotak, ornamen, dan kertas. Pratinjau memakai
 * CSS reader yang sama supaya yang terlihat di Studio sama dengan yang dibaca pelanggan.
 */
export function ThemePicker({ contentId }: { contentId: string }) {
  const id = encodeURIComponent(contentId);
  const [theme, setTheme] = useState<EbookTheme | null>(null);
  const [draft, setDraft] = useState<EbookTheme>(DEFAULT);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    api<{ theme: EbookTheme | null }>(`/studio/content/${id}/category`)
      .then((r) => {
        setTheme(r.theme);
        if (r.theme) setDraft(r.theme);
      })
      .catch(() => setState("error"));
  }, [id]);

  const save = async (next: EbookTheme | null) => {
    if (next && !ebookThemeSchema.safeParse(next).success) {
      setState("error");
      return;
    }
    setState("saving");
    try {
      await api(`/studio/content/${id}/theme`, {
        method: "PUT",
        body: JSON.stringify({ theme: next }),
      });
      setTheme(next);
      if (!next) setDraft(DEFAULT);
      setState("saved");
    } catch {
      setState("error");
    }
  };

  const set = (patch: Partial<EbookTheme>) => setDraft((d) => ({ ...d, ...patch }));
  const preview = ebookThemeAttrs(draft);
  const select = (
    key: "heading" | "callout" | "ornament" | "paper",
    label: string,
    options: readonly string[],
  ) => (
    <label className="field">
      <span>{label}</span>
      <select
        value={draft[key]}
        onChange={(e) => set({ [key]: e.target.value } as Partial<EbookTheme>)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {LABEL[o] ?? o}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <section className="card theme-picker">
      <h3>Tema baca</h3>
      <p className="muted small">
        Supaya isi buku ini terasa punya wajah sendiri. Latar dan warna teks tetap mengikuti pilihan
        pembaca (terang, sepia, malam).
      </p>
      <div className="theme-grid">
        <label className="field">
          <span>Warna utama</span>
          <input
            type="color"
            value={draft.accent}
            onChange={(e) => set({ accent: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Warna kedua (kotak fakta, kuis)</span>
          <input
            type="color"
            value={draft.second ?? draft.accent}
            onChange={(e) => set({ second: e.target.value })}
          />
        </label>
        {select("heading", "Huruf judul", EBOOK_HEADING_FONTS)}
        {select("callout", "Gaya kotak", EBOOK_CALLOUT_STYLES)}
        {select("ornament", "Ornamen judul bab", EBOOK_ORNAMENTS)}
        {select("paper", "Kertas", EBOOK_PAPERS)}
      </div>

      <div
        className="book theme-preview"
        data-theme="paper"
        {...preview.data}
        style={preview.vars as CSSProperties}
      >
        <div className="book-viewport">
          <div className="book-flow">
            <header className="book-chapter-head">
              <p className="book-chapter-num">Bab 1</p>
              <h2 className="book-chapter-title">Contoh judul bab</h2>
              <span className="book-ornament" />
            </header>
            <aside className="callout callout-tip">
              <span className="callout-label">Tips</span>
              <p>Contoh kotak catatan dengan gaya yang dipilih.</p>
            </aside>
            <aside className="callout callout-fact">
              <span className="callout-label">Fakta</span>
              <p>Kotak fakta memakai warna kedua.</p>
            </aside>
          </div>
        </div>
      </div>

      <div className="row">
        <button
          type="button"
          className="btn"
          disabled={state === "saving"}
          onClick={() => save(draft)}
        >
          Simpan tema
        </button>
        {theme && (
          <button type="button" className="btn btn-ghost" onClick={() => save(null)}>
            Pakai tampilan bawaan
          </button>
        )}
        <span className="muted small" aria-live="polite">
          {state === "saving"
            ? "Menyimpan…"
            : state === "saved"
              ? "Tersimpan."
              : state === "error"
                ? "Gagal menyimpan."
                : theme
                  ? ""
                  : "Belum ada tema; memakai tampilan bawaan."}
        </span>
      </div>
    </section>
  );
}
