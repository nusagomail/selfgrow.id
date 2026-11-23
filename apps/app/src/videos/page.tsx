import { formatDuration } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlayGlyph } from "../components/video-card";
import { ApiError, api } from "../lib/api";

type Watch = {
  video: {
    slug: string;
    title: string;
    summary: string | null;
    durationSeconds: number | null;
    posterUrl: string | null;
  };
  free: boolean;
  locked: boolean;
  streamUrl: string | null;
};

/** Halaman tonton Video Edukasi (D54). Video berbayar terkunci untuk non-pelanggan. */
export function WatchPage() {
  const { slug } = useParams({ from: "/tonton/$slug" });
  const navigate = useNavigate();
  const [data, setData] = useState<Watch | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const [playErr, setPlayErr] = useState(false);

  useEffect(() => {
    api<Watch>(`/watch/${encodeURIComponent(slug)}`)
      .then(setData)
      .catch(setErr);
  }, [slug]);
  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk", replace: true });
  }, [err, navigate]);

  if (!data) {
    return (
      <main className="page">
        {err ? <p className="error">Video tidak ditemukan.</p> : <p className="muted">Memuat…</p>}
      </main>
    );
  }

  const { video } = data;
  const duration = formatDuration(video.durationSeconds);
  return (
    <main className="page watch-page">
      <p>
        <Link to="/">← Beranda</Link>
      </p>
      {data.streamUrl ? (
        // biome-ignore lint/a11y/useMediaCaption: narasi tampil sebagai teks di layar video (D43)
        <video
          className="watch-player"
          src={data.streamUrl}
          poster={video.posterUrl ?? undefined}
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          onError={() => setPlayErr(true)}
        />
      ) : (
        <div className="watch-locked">
          {video.posterUrl && <img className="watch-locked-poster" src={video.posterUrl} alt="" />}
          <div>
            <span className="watch-lock-icon">
              <PlayGlyph />
            </span>
            <strong>Video ini untuk pelanggan</strong>
            <span>Berlangganan untuk menonton semua video, ebook, tools, dan template.</span>
          </div>
        </div>
      )}
      {playErr && (
        <p className="error">
          Video gagal diputar. Muat ulang halaman, atau periksa status langganan di Profil.
        </p>
      )}
      <div className="watch-meta">
        <h1>{video.title}</h1>
        <p className="muted small">
          Video Edukasi{duration ? ` · ${duration}` : ""}
          {data.free ? " · Gratis" : ""}
        </p>
        {video.summary && <p>{video.summary}</p>}
      </div>
    </main>
  );
}
