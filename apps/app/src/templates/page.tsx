import type { TemplateFormat, ToolInput } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ApiError, api } from "../lib/api";
import { downloadFile } from "../lib/download";
import { TemplateForm } from "./form";

type Meta = {
  template: { slug: string; title: string; summary: string | null };
  variables: ToolInput[];
  formats: TemplateFormat[];
  locked: boolean;
  usage: { used: number; limit: number };
};

export function TemplatePage() {
  const { slug } = useParams({ from: "/template/$slug" });
  const s = encodeURIComponent(slug);
  const navigate = useNavigate();
  const [meta, setMeta] = useState<Meta | null>(null);
  const [err, setErr] = useState<unknown>(null);

  useEffect(() => {
    api<Meta>(`/templates/${s}`).then(setMeta).catch(setErr);
  }, [s]);
  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk", replace: true });
  }, [err, navigate]);

  if (!meta) {
    return (
      <main className="page">
        {err ? (
          <p className="error">Template tidak ditemukan.</p>
        ) : (
          <p className="muted">Memuat…</p>
        )}
      </main>
    );
  }

  return (
    <main className="page">
      <p>
        <Link to="/">← Beranda</Link>
      </p>
      <h1>{meta.template.title}</h1>
      {meta.template.summary && <p className="muted">{meta.template.summary}</p>}
      <div className="card">
        <TemplateForm
          variables={meta.variables}
          formats={meta.formats}
          disabled={meta.locked}
          disabledNote={<p className="muted small">Unduhan tersedia setelah berlangganan.</p>}
          download={async (format, input) => {
            const r = await downloadFile(`/templates/${s}/generate`, { format, input });
            if (r.used !== undefined && r.limit !== undefined) {
              const usage = { used: r.used, limit: r.limit };
              setMeta((m) => (m ? { ...m, usage } : m));
            }
            return r;
          }}
        />
        <p className="muted small">
          Kuota unduh bulan ini: {meta.usage.used} dari {meta.usage.limit}.
        </p>
      </div>
    </main>
  );
}
