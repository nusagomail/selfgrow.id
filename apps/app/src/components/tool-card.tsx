import { cardKind, TOOL_KIND_LABEL, type ToolKind, toolTone } from "@selfgrow/shared";
import { Link } from "@tanstack/react-router";

/** Ikon garis per jenis tool (D49). */
export function ToolGlyph({ kind }: { kind: ToolKind }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      {kind === "hitung" && (
        <g {...p}>
          <rect x="5" y="3" width="14" height="18" rx="2.5" />
          <path d="M8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
        </g>
      )}
      {kind === "susun" && (
        <g {...p}>
          <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" />
          <path d="M13.5 6.5l4 4M12 20h8" />
        </g>
      )}
      {kind === "cek" && (
        <g {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8 12.5l2.7 2.7L16 9.8" />
        </g>
      )}
      {kind === "jadwal" && (
        <g {...p}>
          <rect x="4" y="5" width="16" height="15" rx="2.5" />
          <path d="M8 3v4M16 3v4M4 10h16M8.5 14h3M8.5 17h6" />
        </g>
      )}
      {kind === "unduh" && (
        <g {...p}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M12 11v6M9.5 14.5L12 17l2.5-2.5" />
        </g>
      )}
      {kind === "catat" && (
        <g {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M14.8 9.2l-1.9 4.7-3.7 1.9 1.9-4.7z" />
        </g>
      )}
    </svg>
  );
}

type ToolCardItem = {
  type: "tool" | "template";
  slug: string;
  title: string;
  summary: string | null;
  label: { text: string; cls: string } | null;
};

/**
 * Kartu tool (D49) dan template (D53): bukan sampul buku. Ikon fungsi, jenis, judul, ringkasan,
 * dan ajakan mencoba atau mengunduh. Lebar, karena isinya teks dan tindakan, bukan gambar sampul.
 */
export function ToolCard({ item }: { item: ToolCardItem }) {
  const kind = cardKind(item.type, item.title);
  const className = `tool-card tone-${toolTone(item.slug)}`;
  const body = (
    <>
      <span className="tool-card-top">
        <span className="tool-icon">
          <ToolGlyph kind={kind} />
        </span>
        <span className="tool-kind">{TOOL_KIND_LABEL[kind]}</span>
        {item.label && <span className={`book-label ${item.label.cls}`}>{item.label.text}</span>}
      </span>
      <span className="tool-card-title">{item.title}</span>
      {item.summary && <span className="tool-card-summary">{item.summary}</span>}
      <span className="tool-card-cta">{item.type === "template" ? "Isi & unduh →" : "Coba →"}</span>
    </>
  );
  return item.type === "template" ? (
    <Link to="/template/$slug" params={{ slug: item.slug }} className={className}>
      {body}
    </Link>
  ) : (
    <Link to="/tools/$slug" params={{ slug: item.slug }} className={className}>
      {body}
    </Link>
  );
}
