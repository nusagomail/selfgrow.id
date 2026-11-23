import { formatDuration } from "@selfgrow/shared";
import { Link } from "@tanstack/react-router";

type VideoCardItem = {
  slug: string;
  title: string;
  summary: string | null;
  label: { text: string; cls: string } | null;
  video: { durationSeconds: number | null; posterUrl: string | null } | null;
};

/** Ikon putar di atas poster. */
export function PlayGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  );
}

/** Kartu Video Edukasi (D54): poster 16:9, durasi, judul, label akses. */
export function VideoCard({ item }: { item: VideoCardItem }) {
  const duration = formatDuration(item.video?.durationSeconds);
  const poster = item.video?.posterUrl;
  return (
    <Link
      to="/tonton/$slug"
      params={{ slug: item.slug }}
      className="video-card"
      title={item.summary ?? item.title}
    >
      <span className={`video-thumb${poster ? "" : " is-empty"}`}>
        {poster && <img src={poster} alt="" loading="lazy" decoding="async" />}
        <span className="video-play">
          <PlayGlyph />
        </span>
        {duration && <span className="video-duration">{duration}</span>}
      </span>
      <span className="video-card-title">{item.title}</span>
      {item.label && <span className={`book-label ${item.label.cls}`}>{item.label.text}</span>}
    </Link>
  );
}
