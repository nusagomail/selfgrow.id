import type { PublicToolDefinition, ToolRunResult } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ApiError, api } from "../lib/api";
import { ToolForm } from "./form";

type ToolMeta = {
  tool: { id: string; slug: string; title: string; summary: string | null };
  definition: PublicToolDefinition;
  locked: boolean;
};

export function ToolPage() {
  const { slug } = useParams({ from: "/tools/$slug" });
  const s = encodeURIComponent(slug);
  const navigate = useNavigate();
  const [meta, setMeta] = useState<ToolMeta | null>(null);
  const [err, setErr] = useState<unknown>(null);

  useEffect(() => {
    api<ToolMeta>(`/tools/${s}`).then(setMeta).catch(setErr);
  }, [s]);

  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk" });
  }, [err, navigate]);

  if (!meta) {
    return (
      <main className="page">
        {err ? <p className="error">Tool tidak ditemukan.</p> : <p className="muted">Memuat…</p>}
      </main>
    );
  }

  return (
    <main className="page">
      <p>
        <Link to="/perpustakaan">← Perpustakaan</Link>
      </p>
      <h1>{meta.tool.title}</h1>
      {meta.tool.summary && <p className="muted">{meta.tool.summary}</p>}
      <div className="card">
        <ToolForm
          definition={meta.definition}
          disabled={meta.locked}
          disabledNote={<p className="muted small">Tool ini bisa dipakai setelah berlangganan.</p>}
          run={(input) =>
            api<ToolRunResult & { usage: { used: number; limit: number } }>(`/tools/${s}/run`, {
              method: "POST",
              body: JSON.stringify({ input }),
            })
          }
        />
      </div>
    </main>
  );
}
