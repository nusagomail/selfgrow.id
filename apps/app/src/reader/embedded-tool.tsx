import type { PublicToolDefinition, ToolEmbedAttrs, ToolRunResult } from "@selfgrow/shared";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { ToolForm } from "../tools/form";

type ToolMeta = {
  tool: { slug: string; title: string; summary: string | null };
  definition: PublicToolDefinition;
  locked: boolean;
};

/**
 * Tool yang ditanam di dalam bab ebook (D42). Memakai endpoint tool biasa: rumus tetap
 * dihitung di server dan kuota/izin tool tetap berlaku (D8).
 */
export function EmbeddedTool({ attrs }: { attrs: ToolEmbedAttrs }) {
  const s = encodeURIComponent(attrs.slug);
  const [meta, setMeta] = useState<ToolMeta | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    api<ToolMeta>(`/tools/${s}`)
      .then(setMeta)
      .catch(() => setFailed(true));
  }, [s]);

  const title = attrs.title ?? meta?.tool.title ?? "Kalkulator";
  return (
    <div className="embedded-tool">
      <span className="callout-label">Coba langsung</span>
      <p className="quiz-title">{title}</p>
      {attrs.intro ? <p className="quiz-intro">{attrs.intro}</p> : null}
      {failed ? (
        <p className="tool-embed-note">Kalkulator ini sedang tidak tersedia.</p>
      ) : !meta ? (
        <p className="tool-embed-note">Memuat kalkulator…</p>
      ) : (
        <ToolForm
          definition={meta.definition}
          disabled={meta.locked}
          disabledNote={
            <p className="tool-embed-note">
              Kalkulator ini terbuka untuk pelanggan. <Link to="/akun">Lihat caranya</Link>
            </p>
          }
          run={(input) =>
            api<ToolRunResult & { usage: { used: number; limit: number } }>(`/tools/${s}/run`, {
              method: "POST",
              body: JSON.stringify({ input }),
            })
          }
        />
      )}
    </div>
  );
}
