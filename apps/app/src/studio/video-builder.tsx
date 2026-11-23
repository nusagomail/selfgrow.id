import { API_BASE_PATH, formatDuration, VIDEO_MAX_BYTES } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { ApiError, api } from "../lib/api";
import { TopicPicker } from "./topic-picker";

type Resp = {
  item: { id: string; slug: string; title: string; summary: string | null; status: string };
  durationSeconds: number | null;
  file: { mime: string; size: number; previewUrl: string } | null;
  posterUrl: string | null;
};

const mb = (n: number) => `${(n / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;

/** Durasi berkas video lokal, dibaca peramban dari metadatanya (tanpa mengunggah). */
function readDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.preload = "metadata";
    const done = (d: number | null) => {
      URL.revokeObjectURL(url);
      resolve(d);
    };
    v.onloadedmetadata = () => done(Number.isFinite(v.duration) ? Math.round(v.duration) : null);
    v.onerror = () => done(null);
    v.src = url;
  });
}

/** Unggah dengan progres (fetch belum punya progres unggah). */
function putWithProgress(path: string, file: File, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${API_BASE_PATH}${path}`);
    xhr.setRequestHeader("content-type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else {
        let code = "error";
        try {
          code = (JSON.parse(xhr.responseText) as { error?: string }).error ?? code;
        } catch {}
        reject(new ApiError(xhr.status, code, null));
      }
    };
    xhr.onerror = () => reject(new ApiError(0, "network", null));
    xhr.send(file);
  });
}

const UPLOAD_ERROR: Record<string, string> = {
  file_too_large: `Berkas terlalu besar (maks ${mb(VIDEO_MAX_BYTES)}).`,
  unsupported_video: "Hanya MP4 atau WebM.",
  unsupported_image: "Poster harus PNG, JPEG, atau WebP.",
  network: "Koneksi terputus saat mengunggah.",
};

/** Studio: satu Video Edukasi (D54). */
export function StudioVideo() {
  const { id: rawId } = useParams({ from: "/studio/video/$id" });
  const id = encodeURIComponent(rawId);
  const navigate = useNavigate();
  const [data, setData] = useState<Resp | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [duration, setDuration] = useState("");
  const [rev, setRev] = useState(0);

  const load = useCallback(async () => {
    try {
      const r = await api<Resp>(`/studio/videos/${id}`);
      setData(r);
      setDuration(r.durationSeconds ? String(r.durationSeconds) : "");
      setRev((n) => n + 1);
    } catch (e) {
      setErr(e);
    }
  }, [id]);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk", replace: true });
  }, [err, navigate]);

  const fail = (e: unknown) =>
    setProblem(UPLOAD_ERROR[(e as ApiError).code] ?? "Gagal. Coba lagi sebentar lagi.");

  async function saveDuration(seconds: number | null) {
    await api(`/studio/videos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ durationSeconds: seconds }),
    });
  }

  async function onVideo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setProblem(null);
    setNotice(null);
    if (file.size > VIDEO_MAX_BYTES) return setProblem(UPLOAD_ERROR.file_too_large ?? null);
    try {
      const seconds = await readDuration(file);
      setProgress(0);
      await putWithProgress(`/studio/videos/${id}/file`, file, setProgress);
      if (seconds) await saveDuration(seconds);
      setNotice("Berkas video tersimpan.");
      await load();
    } catch (e2) {
      fail(e2);
    } finally {
      setProgress(null);
    }
  }

  async function onPoster(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setProblem(null);
    try {
      await api(`/studio/videos/${id}/poster`, {
        method: "PUT",
        body: file,
        headers: { "content-type": file.type },
      });
      setNotice("Poster tersimpan.");
      await load();
    } catch (e2) {
      fail(e2);
    }
  }

  async function publish(status: "published" | "draft") {
    setProblem(null);
    try {
      await api(`/studio/content/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      setNotice(status === "published" ? "Video terbit." : "Video kembali menjadi draft.");
      await load();
    } catch (e) {
      const b = (e as ApiError).body as { problems?: string[] } | undefined;
      setProblem(b?.problems?.join(", ") ?? "Gagal mengubah status.");
    }
  }

  if (!data) {
    return (
      <main className="page">
        {err ? (
          <p className="error">
            {err instanceof ApiError && err.status === 403
              ? "Studio hanya untuk admin."
              : "Video tidak ditemukan."}
          </p>
        ) : (
          <p className="muted">Memuat…</p>
        )}
      </main>
    );
  }

  const published = data.item.status === "published";
  return (
    <main className="page page-wide">
      <p>
        <Link to="/studio">← Studio</Link>
      </p>
      <div className="row">
        <div>
          <h1>{data.item.title}</h1>
          <p className="muted small">Video Edukasi · /tonton/{data.item.slug}</p>
        </div>
        <div className="row-actions">
          <span className="badge">{published ? "Terbit" : "Draft"}</span>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!data.file}
            onClick={() => publish("published")}
          >
            {published ? "Terbitkan ulang" : "Terbitkan video"}
          </button>
          {published && (
            <button type="button" className="btn" onClick={() => publish("draft")}>
              Jadikan draft
            </button>
          )}
        </div>
      </div>
      {notice && <p className="muted">{notice}</p>}
      {problem && <p className="error">{problem}</p>}

      <div className="card stack">
        <h2>Berkas video</h2>
        {data.file ? (
          // biome-ignore lint/a11y/useMediaCaption: pratinjau admin
          <video
            key={rev}
            className="watch-player"
            src={`${data.file.previewUrl}?r=${rev}`}
            poster={data.posterUrl ? `${data.posterUrl}?r=${rev}` : undefined}
            controls
            preload="metadata"
          />
        ) : (
          <p className="muted">Belum ada berkas. Video 3–8 menit, 16:9, MP4 (H.264 + AAC).</p>
        )}
        {data.file && (
          <p className="muted small">
            {data.file.mime} · {mb(data.file.size)}
            {formatDuration(data.durationSeconds)
              ? ` · ${formatDuration(data.durationSeconds)}`
              : ""}
          </p>
        )}
        <label className="field">
          <span>
            {data.file ? "Ganti berkas" : "Unggah berkas"} (MP4/WebM, maks {mb(VIDEO_MAX_BYTES)})
          </span>
          <input
            type="file"
            accept="video/mp4,video/webm"
            disabled={progress !== null}
            onChange={onVideo}
          />
        </label>
        {progress !== null && (
          <p className="muted small" aria-live="polite">
            Mengunggah… {Math.round(progress * 100)}%
          </p>
        )}
        <label className="field">
          <span>Durasi (detik, terisi otomatis dari berkas)</span>
          <input
            type="number"
            min={1}
            max={3600}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            onBlur={() => {
              const n = Number(duration);
              saveDuration(Number.isInteger(n) && n > 0 ? n : null).catch(fail);
            }}
          />
        </label>
      </div>

      <div className="card stack">
        <h2>Poster</h2>
        {data.posterUrl ? (
          <img
            src={`${data.posterUrl}?r=${rev}`}
            alt="Poster video"
            style={{ maxWidth: 360, borderRadius: 12 }}
          />
        ) : (
          <p className="muted">Belum ada poster. Gambar 16:9 (mis. 1280×720), PNG/JPEG/WebP.</p>
        )}
        <label className="field">
          <span>{data.posterUrl ? "Ganti poster" : "Unggah poster"}</span>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onPoster} />
        </label>
      </div>

      <div className="card stack">
        <h2>Kategori & akses</h2>
        <p className="muted small">
          Aturan sama dengan ebook: tandai gratis agar bisa ditonton siapa saja (juga di etalase);
          selain itu hanya pelanggan aktif. Kanal Video tampil di beranda setelah ada minimal 3
          video terbit.
        </p>
        <TopicPicker contentId={rawId} />
      </div>
    </main>
  );
}
