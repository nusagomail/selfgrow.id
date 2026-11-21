import "@selfgrow/renderer/book.css";
import { EbookContent } from "@selfgrow/renderer";
import { createPager, type Pager, type PagerState } from "@selfgrow/renderer/pager";
import type { EbookDoc } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { ApiError, api } from "../lib/api";

type Chapter = {
  id: string;
  title: string;
  order: number;
  isFreePreview: boolean;
  locked: boolean;
  wordCount?: number;
};
type EbookMeta = {
  ebook: {
    id: string;
    slug: string;
    title: string;
    summary: string | null;
    coverUrl: string | null;
  };
  chapters: Chapter[];
  progress: { chapterId: string; position: number } | null;
  subscribed: boolean;
};

/** Posisi baca disimpan sebagai fraksi x10000 (0 = awal bab, 10000 = akhir bab). */
const POSITION_SCALE = 10000;

function useAuthRedirect(err: unknown) {
  const navigate = useNavigate();
  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk", replace: true });
  }, [err, navigate]);
}

// ---------------------------------------------------------------------------
// Preferensi baca (per perangkat): ukuran huruf & warna kertas.
// ---------------------------------------------------------------------------

/** Ukuran huruf (px). Bawaan 16px, setara buku saku di layar HP. */
const SIZES = [14, 15, 16, 17.5, 19, 21] as const;
const DEFAULT_SIZE = 2;
const THEMES = [
  { id: "paper", label: "Putih" },
  { id: "sepia", label: "Krem" },
  { id: "night", label: "Gelap" },
] as const;
type Theme = (typeof THEMES)[number]["id"];
type Prefs = { size: number; theme: Theme };
const PREFS_KEY = "sg-book-v2";

function loadPrefs(): Prefs {
  try {
    const raw = JSON.parse(localStorage.getItem(PREFS_KEY) ?? "null") as Partial<Prefs> | null;
    const size = typeof raw?.size === "number" && raw.size >= 0 && raw.size < SIZES.length;
    const theme = THEMES.some((t) => t.id === raw?.theme);
    return {
      size: size ? (raw?.size as number) : DEFAULT_SIZE,
      theme: theme ? (raw?.theme as Theme) : "paper",
    };
  } catch {
    return { size: DEFAULT_SIZE, theme: "paper" };
  }
}

function useBookPrefs() {
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const update = useCallback((p: Partial<Prefs>) => {
    setPrefs((old) => {
      const next = { ...old, ...p };
      try {
        localStorage.setItem(PREFS_KEY, JSON.stringify(next));
      } catch {
        // Penyimpanan diblokir: preferensi berlaku sampai halaman ditutup.
      }
      return next;
    });
  }, []);
  return [prefs, update] as const;
}

// ---------------------------------------------------------------------------
// /baca/$slug  (sampul buku + daftar isi)
// ---------------------------------------------------------------------------

export function EbookToc() {
  const { slug } = useParams({ from: "/baca/$slug" });
  const s = encodeURIComponent(slug);
  const [meta, setMeta] = useState<EbookMeta | null>(null);
  const [err, setErr] = useState<unknown>(null);
  useAuthRedirect(err);

  useEffect(() => {
    api<EbookMeta>(`/ebooks/${s}`).then(setMeta).catch(setErr);
  }, [s]);

  if (!meta) {
    return (
      <main className="page">
        {err ? <p className="error">Ebook tidak ditemukan.</p> : <p className="muted">Memuat…</p>}
      </main>
    );
  }

  const savedIdx = meta.progress
    ? meta.chapters.findIndex((c) => c.id === meta.progress?.chapterId && !c.locked)
    : -1;
  // Bab terakhir dibaca sudah tamat: lanjutkan dari bab berikutnya bila terbuka.
  const finished = savedIdx >= 0 && (meta.progress?.position ?? 0) >= POSITION_SCALE * 0.95;
  const after = finished ? meta.chapters[savedIdx + 1] : undefined;
  const resumeIdx = after && !after.locked ? savedIdx + 1 : savedIdx;
  const startIdx = resumeIdx >= 0 ? resumeIdx : meta.chapters.findIndex((c) => !c.locked);
  const start = startIdx >= 0 ? meta.chapters[startIdx] : undefined;
  const percent =
    resumeIdx === savedIdx && meta.progress && !finished
      ? Math.round((meta.progress.position / POSITION_SCALE) * 100)
      : 0;
  const lockedCount = meta.chapters.filter((c) => c.locked).length;

  return (
    <main className="page page-wide book-intro">
      <p>
        <Link to="/">← Beranda</Link>
      </p>
      <div className="book-intro-grid">
        <div className="book-intro-cover">
          {meta.ebook.coverUrl ? (
            <img src={meta.ebook.coverUrl} alt={`Sampul ${meta.ebook.title}`} />
          ) : (
            <span className="book-intro-fallback">{meta.ebook.title}</span>
          )}
        </div>
        <div className="book-intro-text">
          <p className="eyebrow-sm">Ebook · {meta.chapters.length} bab</p>
          <h1>{meta.ebook.title}</h1>
          {meta.ebook.summary && <p className="muted">{meta.ebook.summary}</p>}
          {start && (
            <Link
              to="/baca/$slug/$chapterId"
              params={{ slug, chapterId: start.id }}
              className="btn btn-primary"
            >
              {resumeIdx >= 0
                ? `Lanjut membaca · Bab ${resumeIdx + 1}${percent > 0 ? ` (${percent}%)` : ""}`
                : "Mulai membaca"}
            </Link>
          )}
          {meta.chapters.length === 0 && (
            <p className="banner">
              <b>Segera terbit.</b> Isi ebook ini sedang ditulis. Kamu akan menemukannya di sini
              begitu bab pertama terbit.
            </p>
          )}
          {lockedCount > 0 && (
            <p className="muted small">
              {lockedCount} bab terbuka setelah berlangganan. Bab berlabel Gratis bisa dibaca
              sekarang.
            </p>
          )}
        </div>
      </div>
      <section className="card book-toc">
        <h2>Daftar isi</h2>
        <ol>
          {meta.chapters.map((ch, i) => (
            <li key={ch.id} className={ch.locked ? "is-locked" : undefined}>
              <span className="toc-num">{i + 1}</span>
              {ch.locked ? (
                <span className="toc-title">{ch.title}</span>
              ) : (
                <Link
                  className="toc-title"
                  to="/baca/$slug/$chapterId"
                  params={{ slug, chapterId: ch.id }}
                >
                  {ch.title}
                </Link>
              )}
              {ch.isFreePreview ? (
                <span className="badge">Gratis</span>
              ) : ch.locked ? (
                <span className="badge">🔒 Langganan</span>
              ) : meta.progress?.chapterId === ch.id ? (
                <span className="badge">Sedang dibaca</span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Watermark terlihat (BLUEPRINT bagian 8): email pelanggan samar menutupi layar sehingga
// ikut terekam di tangkapan layar. Tidak bisa diklik dan diabaikan pembaca layar.
function Watermark({ label }: { label: string }) {
  return (
    <div className="watermark" aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: daftar statis
        <span key={i}>{label}</span>
      ))}
    </div>
  );
}

function frozenUntil(err: ApiError): string | null {
  const until = (err.body as { until?: string } | undefined)?.until;
  if (!until) return null;
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(until));
}

/** Membalik mundur dari awal bab membuka bab sebelumnya di halaman terakhirnya. */
let openAtEnd: string | null = null;

// /baca/$slug/$chapterId  (reader buku digital, D37)
// ---------------------------------------------------------------------------

export function ChapterReader() {
  const { slug, chapterId } = useParams({ from: "/baca/$slug/$chapterId" });
  const navigate = useNavigate();
  const s = encodeURIComponent(slug);
  const ch = encodeURIComponent(chapterId);
  const [meta, setMeta] = useState<EbookMeta | null>(null);
  const [chapter, setChapter] = useState<{
    id: string;
    title: string;
    doc: EbookDoc;
    watermark: string;
  } | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const [page, setPage] = useState<PagerState | null>(null);
  const [chrome, setChrome] = useState(true);
  const [settings, setSettings] = useState(false);
  const [prefs, setPrefs] = useBookPrefs();
  const viewportRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const pagerRef = useRef<Pager | null>(null);
  useAuthRedirect(err);

  useEffect(() => {
    api<EbookMeta>(`/ebooks/${s}`).then(setMeta).catch(setErr);
  }, [s]);

  useEffect(() => {
    setChapter(null);
    setPage(null);
    setErr(null);
    api<{ chapter: { id: string; title: string }; doc: EbookDoc; watermark: { label: string } }>(
      `/ebooks/${s}/chapters/${ch}`,
    )
      .then((r) =>
        setChapter({
          id: chapterId,
          title: r.chapter.title,
          doc: r.doc,
          watermark: r.watermark.label,
        }),
      )
      .catch(setErr);
  }, [ch, s, chapterId]);

  const idx = meta?.chapters.findIndex((c) => c.id === chapterId) ?? -1;
  const prev = idx > 0 ? meta?.chapters[idx - 1] : undefined;
  const next = meta && idx >= 0 ? meta.chapters[idx + 1] : undefined;
  const ready = Boolean(meta && chapter && chapter.id === chapterId);

  // Layar penuh seperti buku: halaman di belakang tidak ikut bergulir.
  useEffect(() => {
    if (!ready) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [ready]);

  // Simpan progres paling sering tiap 4 detik, dan sekali lagi saat bab ditutup.
  const lastSent = useRef<{ at: number; position: number } | null>(null);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sendProgress = useCallback(
    (state: PagerState, now = false) => {
      const position = Math.round(
        state.screens <= 1 ? 0 : (state.screen / (state.screens - 1)) * POSITION_SCALE,
      );
      const send = () => {
        pending.current = null;
        lastSent.current = { at: Date.now(), position };
        void api(`/ebooks/${s}/progress`, {
          method: "PUT",
          body: JSON.stringify({ chapterId, position }),
        }).catch(() => {});
      };
      if (lastSent.current?.position === position) return;
      if (pending.current) clearTimeout(pending.current);
      const wait = now ? 0 : Math.max(0, 4000 - (Date.now() - (lastSent.current?.at ?? 0)));
      pending.current = setTimeout(send, wait);
    },
    [chapterId, s],
  );

  const goChapter = useCallback(
    (target: Chapter | undefined, atEnd: boolean) => {
      if (!target || target.locked) return;
      openAtEnd = atEnd ? target.id : null;
      navigate({ to: "/baca/$slug/$chapterId", params: { slug, chapterId: target.id } });
    },
    [navigate, slug],
  );

  // Pasang mesin halaman setelah isi bab tampil.
  useEffect(() => {
    const viewport = viewportRef.current;
    const flow = flowRef.current;
    if (!ready || !viewport || !flow || !meta) return;
    const saved = meta.progress;
    const startAt =
      openAtEnd === chapterId
        ? ("end" as const)
        : saved && saved.chapterId === chapterId && saved.position < POSITION_SCALE * 0.95
          ? { fraction: saved.position / POSITION_SCALE }
          : 0;
    openAtEnd = null;
    lastSent.current = null;
    const pager = createPager(viewport, flow, {
      startAt,
      onChange: (st) => {
        setPage(st);
        sendProgress(st);
      },
      onEdge: (dir) => goChapter(dir === "next" ? next : prev, dir === "prev"),
      onTapCenter: () => setChrome((c) => !c),
      verticalSwipe: true,
    });
    pagerRef.current = pager;
    return () => {
      sendProgress(pager.state(), true);
      pager.destroy();
      pagerRef.current = null;
    };
  }, [ready, meta, chapterId, next, prev, goChapter, sendProgress]);

  // Ukuran huruf berubah: tata ulang halaman (posisi baca dipertahankan).
  // biome-ignore lint/correctness/useExhaustiveDependencies: dipicu perubahan ukuran huruf
  useEffect(() => {
    pagerRef.current?.relayout();
  }, [prefs.size]);

  // Penghalang dasar (BLUEPRINT bagian 8): salin, klik kanan, dan cetak dimatikan di reader.
  const block = (e: { preventDefault: () => void }) => e.preventDefault();

  if (err || !ready || !chapter || !meta) {
    return (
      <main className="page">
        <p>
          <Link to="/baca/$slug" params={{ slug }}>
            ← {meta?.ebook.title ?? "Daftar isi"}
          </Link>
        </p>
        {err instanceof ApiError && err.status === 403 ? (
          <div className="card stack">
            <h2>Bab ini untuk pelanggan</h2>
            <p className="muted">Berlangganan untuk membuka semua bab, tools, dan template.</p>
          </div>
        ) : err instanceof ApiError && err.status === 423 ? (
          <div className="card stack">
            <h2>Akses baca dijeda sementara</h2>
            <p className="muted">
              Kami mendeteksi pembukaan bab yang sangat cepat dari akun ini, sehingga akses dijeda
              untuk melindungi konten. Akses terbuka lagi otomatis
              {frozenUntil(err) ? ` pada ${frozenUntil(err)}` : " dalam beberapa jam"}. Hubungi kami
              bila ini keliru.
            </p>
          </div>
        ) : err instanceof ApiError && err.status === 429 ? (
          <div className="card stack">
            <h2>Pelan-pelan dulu</h2>
            <p className="muted">
              Terlalu banyak bab dibuka dalam satu menit. Coba lagi sebentar lagi.
            </p>
          </div>
        ) : err ? (
          <p className="error">Bab tidak ditemukan.</p>
        ) : (
          <div className="skeleton" aria-busy="true">
            <div />
            <div />
            <div />
          </div>
        )}
      </main>
    );
  }

  const number = idx + 1;
  const total = meta.chapters.length;
  const percent = page ? Math.round((page.last / page.pages) * 100) : 0;
  const pageLabel = page
    ? page.first === page.last
      ? `Hal. ${page.first} dari ${page.pages}`
      : `Hal. ${page.first}–${page.last} dari ${page.pages}`
    : "";

  return (
    <div
      className={`book reader-book${chrome ? "" : " chrome-off"}`}
      data-theme={prefs.theme}
      style={{ "--book-size": `${SIZES[prefs.size]}px` } as CSSProperties}
    >
      <header className="book-bar">
        <Link to="/baca/$slug" params={{ slug }} className="book-icon" aria-label="Daftar isi">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        </Link>
        <div className="book-bar-title">
          <span className="book-bar-ebook">{meta.ebook.title}</span>
          <span className="book-bar-chapter">
            Bab {number} dari {total} · {chapter.title}
          </span>
        </div>
        <button
          type="button"
          className="book-icon"
          aria-label="Pengaturan tampilan"
          aria-expanded={settings}
          onClick={() => setSettings((v) => !v)}
        >
          <span className="book-aa" aria-hidden="true">
            Aa
          </span>
        </button>
      </header>

      {settings && (
        <div className="book-settings" role="dialog" aria-label="Pengaturan tampilan">
          <div className="book-settings-row">
            <span>Ukuran huruf</span>
            <div className="book-seg">
              <button
                type="button"
                disabled={prefs.size === 0}
                onClick={() => setPrefs({ size: prefs.size - 1 })}
                aria-label="Perkecil huruf"
              >
                A−
              </button>
              <button
                type="button"
                disabled={prefs.size === SIZES.length - 1}
                onClick={() => setPrefs({ size: prefs.size + 1 })}
                aria-label="Perbesar huruf"
              >
                A+
              </button>
            </div>
          </div>
          <div className="book-settings-row">
            <span>Warna kertas</span>
            <div className="book-seg">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`swatch swatch-${t.id}`}
                  aria-pressed={prefs.theme === t.id}
                  onClick={() => setPrefs({ theme: t.id })}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <article
        className="book-stage no-select"
        onCopy={block}
        onCut={block}
        onContextMenu={block}
        onDragStart={block}
      >
        <div className="book-viewport" ref={viewportRef}>
          <div className="book-flow" ref={flowRef}>
            <header className="book-chapter-head">
              <p className="book-chapter-num">Bab {number}</p>
              <h1 className="book-chapter-title">{chapter.title}</h1>
              <span className="book-ornament" />
            </header>
            <EbookContent doc={chapter.doc} />
            <section className="book-end">
              <p className="book-end-title">{next ? `Akhir Bab ${number}` : "Tamat"}</p>
              {next && !next.locked ? (
                <>
                  <p>
                    Berikutnya: Bab {number + 1} · {next.title}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => goChapter(next, false)}
                  >
                    Lanjut ke Bab {number + 1} →
                  </button>
                </>
              ) : next?.locked ? (
                <>
                  <p>
                    Bab {number + 1} · {next.title} dan bab berikutnya terbuka untuk pelanggan.
                  </p>
                  <Link to="/akun" className="btn btn-primary">
                    Lihat cara berlangganan
                  </Link>
                </>
              ) : (
                <>
                  <p>Kamu sudah menyelesaikan {meta.ebook.title}.</p>
                  <Link to="/" className="btn btn-primary">
                    Cari bacaan berikutnya
                  </Link>
                </>
              )}
              <span className="book-marker" />
            </section>
          </div>
        </div>
      </article>

      <footer className="book-foot">
        <button
          type="button"
          className="book-icon"
          aria-label="Halaman sebelumnya"
          onClick={() => pagerRef.current?.prev()}
          disabled={!page || (page.screen === 0 && (!prev || prev.locked))}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        </button>
        <div className="book-progress">
          <span
            className="progress"
            role="progressbar"
            aria-label="Posisi dalam bab"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${percent}%` }} />
          </span>
          <span className="small" aria-live="polite">
            {pageLabel}
          </span>
        </div>
        <button
          type="button"
          className="book-icon"
          aria-label="Halaman berikutnya"
          onClick={() => pagerRef.current?.next()}
          disabled={!page || (page.screen === page.screens - 1 && (!next || next.locked))}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        </button>
      </footer>
      <Watermark label={chapter.watermark} />
    </div>
  );
}
