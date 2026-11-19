import { EbookContent } from "@selfgrow/renderer";
import type { ChapterSummary, EbookDoc } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ApiError, api } from "../lib/api";
import { ChapterEditor } from "./editor";

type ContentRow = {
  id: string;
  type: string;
  slug: string;
  title: string;
  status: string;
  updatedAt: string;
};

type EbookItem = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  status: "draft" | "review" | "published";
  publishedAt: string | null;
};

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  review: "Review",
  published: "Terbit",
};

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

function useAdminGuard(err: unknown) {
  const navigate = useNavigate();
  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk" });
  }, [err, navigate]);
}

function errorText(err: unknown) {
  if (err instanceof ApiError && err.status === 403) return "Studio hanya untuk admin.";
  if (err instanceof ApiError && err.code === "slug_taken") return "Slug sudah dipakai.";
  return "Terjadi kesalahan. Coba lagi.";
}

// ---------------------------------------------------------------------------
// /studio
// ---------------------------------------------------------------------------

export function StudioHome() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ContentRow[] | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [busy, setBusy] = useState(false);
  useAdminGuard(err);

  useEffect(() => {
    api<{ items: ContentRow[] }>("/studio/content")
      .then((r) => setItems(r.items))
      .catch(setErr);
  }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const { id } = await api<{ id: string }>("/studio/ebooks", {
        method: "POST",
        body: JSON.stringify({ title, slug }),
      });
      navigate({ to: "/studio/ebook/$id", params: { id } });
    } catch (e2) {
      setErr(e2);
      setBusy(false);
    }
  }

  return (
    <main className="page page-wide">
      <p>
        <Link to="/">← Beranda</Link>
      </p>
      <h1>Studio</h1>
      <form className="card stack" onSubmit={create}>
        <h2>Ebook baru</h2>
        <label className="field">
          <span>Judul</span>
          <input
            value={title}
            required
            maxLength={200}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugEdited) setSlug(toSlug(e.target.value));
            }}
          />
        </label>
        <label className="field">
          <span>Slug (alamat: /ebook/slug)</span>
          <input
            value={slug}
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            onChange={(e) => {
              setSlugEdited(true);
              setSlug(e.target.value);
            }}
          />
        </label>
        <button type="submit" className="btn btn-primary" disabled={busy || !title || !slug}>
          {busy ? "Membuat…" : "Buat ebook"}
        </button>
      </form>

      {err ? <p className="error">{errorText(err)}</p> : null}

      <div className="card">
        <h2>Semua konten</h2>
        {!items && !err && <p className="muted">Memuat…</p>}
        {items?.length === 0 && <p className="muted">Belum ada konten.</p>}
        {items?.map((it) => (
          <div key={it.id} className="row">
            <div>
              <div>{it.title}</div>
              <div className="muted small">
                {it.type} · /{it.slug}
              </div>
            </div>
            <div className="row-actions">
              <span className="badge">{STATUS_LABEL[it.status] ?? it.status}</span>
              {it.type === "ebook" && (
                <Link to="/studio/ebook/$id" params={{ id: it.id }} className="btn">
                  Edit
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// /studio/ebook/$id
// ---------------------------------------------------------------------------

type SaveState = "idle" | "saving" | "saved" | "error";

export function StudioEbook() {
  const { id: rawId } = useParams({ from: "/studio/ebook/$id" });
  const id = encodeURIComponent(rawId);
  const [item, setItem] = useState<EbookItem | null>(null);
  const [chapters, setChapters] = useState<ChapterSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const [notice, setNotice] = useState<string | null>(null);
  useAdminGuard(err);

  const load = useCallback(async () => {
    try {
      const r = await api<{ item: EbookItem; chapters: ChapterSummary[] }>(`/studio/content/${id}`);
      setItem(r.item);
      setChapters(r.chapters);
      setActiveId((cur) => cur ?? r.chapters[0]?.id ?? null);
    } catch (e) {
      setErr(e);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function saveMeta(patch: Partial<EbookItem>) {
    setErr(null);
    try {
      const r = await api<{ version?: number }>(`/studio/content/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      setNotice(
        patch.status === "published"
          ? `Ebook diterbitkan (versi ${r.version}).`
          : patch.status === "draft"
            ? "Ebook ditarik ke draft."
            : "Tersimpan.",
      );
      await load();
    } catch (e) {
      setErr(e);
    }
  }

  async function addChapter() {
    const title = window.prompt("Judul bab baru", `Bab ${chapters.length + 1}`);
    if (!title) return;
    const r = await api<{ id: string }>(`/studio/content/${id}/chapters`, {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    await load();
    setActiveId(r.id);
  }

  async function move(index: number, dir: -1 | 1) {
    const next = [...chapters];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j] as ChapterSummary, next[index] as ChapterSummary];
    setChapters(next);
    await api(`/studio/content/${id}/chapter-order`, {
      method: "PUT",
      body: JSON.stringify({ chapterIds: next.map((c) => c.id) }),
    });
  }

  if (!item) {
    return (
      <main className="page page-wide">
        {err ? <p className="error">{errorText(err)}</p> : <p className="muted">Memuat…</p>}
      </main>
    );
  }

  return (
    <main className="page page-wide">
      <p>
        <Link to="/studio">← Studio</Link>
      </p>
      <MetaForm item={item} onSave={saveMeta} />
      {notice && <p className="notice">{notice}</p>}
      {err ? <p className="error">{errorText(err)}</p> : null}

      <div className="studio-grid">
        <nav className="card chapter-list" aria-label="Daftar bab">
          <h2>Bab</h2>
          {chapters.map((ch, i) => (
            <div key={ch.id} className={`chapter-item${ch.id === activeId ? " active" : ""}`}>
              <button type="button" className="linklike" onClick={() => setActiveId(ch.id)}>
                {i + 1}. {ch.title}
              </button>
              <div className="muted small">
                {ch.status === "published" ? "Terbit" : "Draft"}
                {ch.isFreePreview ? " · Gratis" : ""} · {ch.wordCount} kata
              </div>
              <div className="row-actions">
                <button type="button" className="tb" onClick={() => move(i, -1)} aria-label="Naik">
                  ↑
                </button>
                <button type="button" className="tb" onClick={() => move(i, 1)} aria-label="Turun">
                  ↓
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-block" onClick={addChapter}>
            + Bab baru
          </button>
        </nav>

        <section className="card">
          {activeId ? (
            <ChapterPanel key={activeId} chapterId={activeId} onChanged={load} />
          ) : (
            <p className="muted">Tambahkan bab pertama untuk mulai menulis.</p>
          )}
        </section>
      </div>
    </main>
  );
}

function MetaForm({
  item,
  onSave,
}: {
  item: EbookItem;
  onSave: (patch: Partial<EbookItem>) => Promise<void>;
}) {
  const [title, setTitle] = useState(item.title);
  const [slug, setSlug] = useState(item.slug);
  const [summary, setSummary] = useState(item.summary ?? "");
  const dirty = title !== item.title || slug !== item.slug || summary !== (item.summary ?? "");

  return (
    <form
      className="card stack"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title, slug, summary: summary || null });
      }}
    >
      <div className="row" style={{ borderTop: 0 }}>
        <h1 style={{ margin: 0 }}>{item.title}</h1>
        <span className="badge">{STATUS_LABEL[item.status]}</span>
      </div>
      <label className="field">
        <span>Judul</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
      </label>
      <label className="field">
        <span>Slug</span>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} />
      </label>
      <label className="field">
        <span>Ringkasan</span>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} />
      </label>
      <div className="row-actions">
        <button type="submit" className="btn" disabled={!dirty}>
          Simpan detail
        </button>
        {item.status === "published" ? (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSave({ status: "published" })}
            >
              Terbitkan ulang
            </button>
            <button type="button" className="btn" onClick={() => onSave({ status: "draft" })}>
              Tarik ke draft
            </button>
            <Link to="/baca/$slug" params={{ slug: item.slug }} className="btn">
              Lihat sebagai pelanggan
            </Link>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSave({ status: "published" })}
          >
            Terbitkan ebook
          </button>
        )}
      </div>
    </form>
  );
}

function ChapterPanel({ chapterId, onChanged }: { chapterId: string; onChanged: () => void }) {
  const [chapter, setChapter] = useState<ChapterSummary | null>(null);
  const [doc, setDoc] = useState<EbookDoc | null>(null);
  const [save, setSave] = useState<SaveState>("idle");
  const [preview, setPreview] = useState(false);
  const pending = useRef<EbookDoc | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    api<{ chapter: ChapterSummary; doc: EbookDoc }>(
      `/studio/chapters/${encodeURIComponent(chapterId)}`,
    ).then((r) => {
      setChapter(r.chapter);
      setDoc(r.doc);
    });
  }, [chapterId]);

  const flush = useCallback(async () => {
    const next = pending.current;
    if (!next) return;
    pending.current = null;
    setSave("saving");
    try {
      await api(`/studio/chapters/${encodeURIComponent(chapterId)}`, {
        method: "PUT",
        body: JSON.stringify({ doc: next }),
      });
      setSave("saved");
    } catch {
      setSave("error");
    }
  }, [chapterId]);

  // Autosave: simpan 1,5 detik setelah berhenti mengetik; simpan juga saat panel ditutup.
  const onChange = useCallback(
    (d: EbookDoc) => {
      pending.current = d;
      setDoc(d);
      setSave("saving");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(flush, 1500);
    },
    [flush],
  );
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      void flush();
    },
    [flush],
  );

  async function update(patch: Partial<ChapterSummary>) {
    const before = chapter;
    // Optimistis: tampilan langsung berubah, dikembalikan bila server menolak.
    setChapter((c) => (c ? { ...c, ...patch } : c));
    try {
      await flush();
      await api(`/studio/chapters/${encodeURIComponent(chapterId)}`, {
        method: "PUT",
        body: JSON.stringify(patch),
      });
      onChanged();
    } catch {
      setChapter(before);
      setSave("error");
    }
  }

  async function remove() {
    if (!window.confirm("Hapus bab ini? Tindakan ini tidak bisa dibatalkan.")) return;
    pending.current = null;
    await api(`/studio/chapters/${encodeURIComponent(chapterId)}`, { method: "DELETE" });
    onChanged();
  }

  if (!chapter || !doc) return <p className="muted">Memuat bab…</p>;

  return (
    <div className="stack">
      <div className="row" style={{ borderTop: 0 }}>
        <input
          className="title-input"
          defaultValue={chapter.title}
          aria-label="Judul bab"
          onBlur={(e) => {
            if (e.target.value && e.target.value !== chapter.title)
              update({ title: e.target.value });
          }}
        />
        <span className="muted small" aria-live="polite">
          {save === "saving"
            ? "Menyimpan…"
            : save === "saved"
              ? "Tersimpan"
              : save === "error"
                ? "Gagal menyimpan"
                : ""}
        </span>
      </div>
      <div className="row-actions">
        <label className="check">
          <input
            type="checkbox"
            checked={chapter.isFreePreview}
            onChange={(e) => update({ isFreePreview: e.target.checked })}
          />
          Bab gratis (preview)
        </label>
        <button type="button" className="btn" onClick={() => setPreview((p) => !p)}>
          {preview ? "Kembali ke editor" : "Pratinjau"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => update({ status: "published" })}
        >
          {chapter.status === "published" ? "Terbitkan perubahan" : "Terbitkan bab"}
        </button>
        {chapter.status === "published" && (
          <button type="button" className="btn" onClick={() => update({ status: "draft" })}>
            Jadikan draft
          </button>
        )}
        <button type="button" className="btn btn-danger" onClick={remove}>
          Hapus
        </button>
      </div>
      {preview ? (
        <article className="reader">
          <h1>{chapter.title}</h1>
          <EbookContent doc={doc} />
        </article>
      ) : (
        <ChapterEditor doc={doc} onChange={onChange} />
      )}
    </div>
  );
}
