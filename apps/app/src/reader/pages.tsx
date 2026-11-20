import { EbookContent } from "@selfgrow/renderer";
import type { EbookDoc } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ApiError, api } from "../lib/api";

type LibraryItem = {
  id: string;
  type: string;
  slug: string;
  title: string;
  summary: string | null;
};

type EbookMeta = {
  ebook: { id: string; slug: string; title: string; summary: string | null };
  chapters: { id: string; title: string; order: number; isFreePreview: boolean; locked: boolean }[];
  progress: { chapterId: string; position: number } | null;
  subscribed: boolean;
};

const TYPE_LABEL: Record<string, string> = {
  ebook: "Ebook",
  tool: "Tool",
  template: "Template",
  program: "Program",
};

function useAuthRedirect(err: unknown) {
  const navigate = useNavigate();
  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk" });
  }, [err, navigate]);
}

// ---------------------------------------------------------------------------
// /perpustakaan
// ---------------------------------------------------------------------------

export function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[] | null>(null);
  const [err, setErr] = useState<unknown>(null);
  useAuthRedirect(err);

  useEffect(() => {
    api<{ items: LibraryItem[] }>("/library")
      .then((r) => setItems(r.items))
      .catch(setErr);
  }, []);

  return (
    <main className="page">
      <p>
        <Link to="/">← Beranda</Link>
      </p>
      <h1>Perpustakaan</h1>
      {err instanceof ApiError && err.status === 403 && (
        <p className="card">Perpustakaan lengkap terbuka setelah berlangganan.</p>
      )}
      {!items && !err && <p className="muted">Memuat…</p>}
      {items?.length === 0 && <p className="muted">Belum ada konten.</p>}
      {items?.map((it) => (
        <div key={it.id} className="card">
          <span className="badge">{TYPE_LABEL[it.type] ?? it.type}</span>
          <h2 style={{ marginTop: 8 }}>{it.title}</h2>
          {it.summary && <p className="muted">{it.summary}</p>}
          {it.type === "ebook" && (
            <Link to="/baca/$slug" params={{ slug: it.slug }} className="btn btn-primary">
              Baca
            </Link>
          )}
          {it.type === "tool" && (
            <Link to="/tools/$slug" params={{ slug: it.slug }} className="btn btn-primary">
              Pakai
            </Link>
          )}
          {it.type === "template" && (
            <Link to="/template/$slug" params={{ slug: it.slug }} className="btn btn-primary">
              Gunakan
            </Link>
          )}
          {it.type === "program" && (
            <Link to="/program/$slug" params={{ slug: it.slug }} className="btn btn-primary">
              Ikuti
            </Link>
          )}
        </div>
      ))}
    </main>
  );
}

// ---------------------------------------------------------------------------
// /baca/$slug  (daftar isi)
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

  const resume = meta.progress?.chapterId ?? meta.chapters.find((c) => !c.locked)?.id;
  return (
    <main className="page">
      <p>
        <Link to="/perpustakaan">← Perpustakaan</Link>
      </p>
      <h1>{meta.ebook.title}</h1>
      {meta.ebook.summary && <p className="muted">{meta.ebook.summary}</p>}
      {resume && (
        <Link
          to="/baca/$slug/$chapterId"
          params={{ slug, chapterId: resume }}
          className="btn btn-primary"
        >
          {meta.progress ? "Lanjut membaca" : "Mulai membaca"}
        </Link>
      )}
      <div className="card">
        <h2>Daftar isi</h2>
        {meta.chapters.map((ch, i) => (
          <div key={ch.id} className="row">
            {ch.locked ? (
              <span className="muted">
                {i + 1}. {ch.title}
              </span>
            ) : (
              <Link to="/baca/$slug/$chapterId" params={{ slug, chapterId: ch.id }}>
                {i + 1}. {ch.title}
              </Link>
            )}
            {ch.isFreePreview ? (
              <span className="badge">Gratis</span>
            ) : ch.locked ? (
              <span className="badge">🔒 Langganan</span>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Watermark terlihat (BLUEPRINT bagian 8): email + kode pelanggan, samar, menutupi layar
// sehingga ikut terekam di tangkapan layar. Tidak bisa diklik dan diabaikan pembaca layar.
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

// /baca/$slug/$chapterId  (reader)
// ---------------------------------------------------------------------------

export function ChapterReader() {
  const { slug, chapterId } = useParams({ from: "/baca/$slug/$chapterId" });
  const s = encodeURIComponent(slug);
  const ch = encodeURIComponent(chapterId);
  const [meta, setMeta] = useState<EbookMeta | null>(null);
  const [chapter, setChapter] = useState<{
    title: string;
    doc: EbookDoc;
    watermark: string;
  } | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const articleRef = useRef<HTMLElement>(null);
  useAuthRedirect(err);

  useEffect(() => {
    api<EbookMeta>(`/ebooks/${s}`).then(setMeta).catch(setErr);
  }, [s]);

  useEffect(() => {
    setChapter(null);
    setErr(null);
    api<{ chapter: { title: string }; doc: EbookDoc; watermark: { label: string } }>(
      `/ebooks/${s}/chapters/${ch}`,
    )
      .then((r) => {
        setChapter({ title: r.chapter.title, doc: r.doc, watermark: r.watermark.label });
        window.scrollTo(0, 0);
      })
      .catch(setErr);
  }, [ch, s]);

  // Simpan progres (posisi gulir dalam persen x100) paling sering tiap 5 detik.
  useEffect(() => {
    if (!chapter) return;
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const send = () => {
      const el = document.documentElement;
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      const position = Math.round((el.scrollTop / max) * 10000);
      void api(`/ebooks/${s}/progress`, {
        method: "PUT",
        body: JSON.stringify({ chapterId, position }),
      }).catch(() => {});
    };
    const onScroll = () => {
      if (timer) return;
      const wait = Math.max(0, 5000 - (Date.now() - last));
      timer = setTimeout(() => {
        timer = null;
        last = Date.now();
        send();
      }, wait);
    };
    send();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [chapter, chapterId, s]);

  const idx = meta?.chapters.findIndex((c) => c.id === chapterId) ?? -1;
  const prev = idx > 0 ? meta?.chapters[idx - 1] : undefined;
  const next = meta && idx >= 0 ? meta.chapters[idx + 1] : undefined;

  // Penghalang dasar (BLUEPRINT bagian 8): salin, klik kanan, dan cetak dimatikan di reader.
  const block = (e: { preventDefault: () => void }) => e.preventDefault();

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
      ) : !chapter ? (
        <div className="skeleton" aria-busy="true">
          <div />
          <div />
          <div />
        </div>
      ) : (
        <article
          ref={articleRef}
          className="reader no-select"
          onCopy={block}
          onCut={block}
          onContextMenu={block}
          onDragStart={block}
        >
          <h1>{chapter.title}</h1>
          <EbookContent doc={chapter.doc} />
          <Watermark label={chapter.watermark} />
        </article>
      )}
      <nav className="row" aria-label="Navigasi bab" style={{ marginTop: 24 }}>
        {prev && !prev.locked ? (
          <Link to="/baca/$slug/$chapterId" params={{ slug, chapterId: prev.id }} className="btn">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && !next.locked ? (
          <Link
            to="/baca/$slug/$chapterId"
            params={{ slug, chapterId: next.id }}
            className="btn btn-primary"
          >
            {next.title} →
          </Link>
        ) : next?.locked ? (
          <span className="badge">🔒 Bab berikutnya untuk pelanggan</span>
        ) : null}
      </nav>
    </main>
  );
}
