import {
  type EbookDoc,
  TEMPLATE_FORMATS,
  type TemplateConfig,
  type TemplateFormat,
} from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ApiError, api } from "../lib/api";
import { downloadFile } from "../lib/download";
import { TemplateForm } from "../templates/form";
import { ChapterEditor } from "./editor";
import { InputsEditor } from "./inputs-editor";
import { TopicPicker } from "./topic-picker";

type Issue = { path: string; message: string };
type Resp = {
  item: { id: string; slug: string; title: string; summary: string | null; status: string };
  config: TemplateConfig;
  body: EbookDoc;
  problems: string[];
};

const FORMAT_LABEL: Record<TemplateFormat, string> = {
  docx: "Word (DOCX)",
  pdf: "PDF",
  xlsx: "Excel (XLSX)",
};

export function StudioTemplate() {
  const { id: rawId } = useParams({ from: "/studio/template/$id" });
  const id = encodeURIComponent(rawId);
  const navigate = useNavigate();
  const [data, setData] = useState<Resp | null>(null);
  const [cfg, setCfg] = useState<TemplateConfig | null>(null);
  const [body, setBody] = useState<EbookDoc | null>(null);
  const [problems, setProblems] = useState<string[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [err, setErr] = useState<unknown>(null);
  const [editorKey, setEditorKey] = useState(0);

  const load = useCallback(async () => {
    try {
      const r = await api<Resp>(`/studio/templates/${id}`);
      setData(r);
      setCfg(r.config);
      setBody(r.body);
      setProblems(r.problems);
      setDirty(false);
      setEditorKey((k) => k + 1);
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

  const touch = () => {
    setDirty(true);
    setNotice(null);
  };

  async function save() {
    if (!cfg || !body) return false;
    setIssues([]);
    try {
      const r = await api<{ problems: string[] }>(`/studio/templates/${id}`, {
        method: "PUT",
        body: JSON.stringify({ config: cfg, body }),
      });
      setProblems(r.problems);
      setDirty(false);
      setNotice("Tersimpan sebagai draft. Pelanggan belum melihat perubahan sampai diterbitkan.");
      return true;
    } catch (e) {
      const b = (e as ApiError).body as { issues?: Issue[] } | undefined;
      setIssues(b?.issues ?? [{ path: "", message: "Gagal menyimpan." }]);
      return false;
    }
  }

  async function publish(status: "published" | "draft") {
    if (status === "published" && dirty && !(await save())) return;
    try {
      const r = await api<{ version?: number }>(`/studio/content/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setNotice(
        status === "published"
          ? `Template diterbitkan (versi ${r.version}).`
          : "Template ditarik ke draft.",
      );
      await load();
    } catch (e) {
      const b = (e as ApiError).body as { problems?: string[] } | undefined;
      if (b?.problems) setProblems(b.problems);
      setIssues([{ path: "", message: "Belum bisa diterbitkan. Perbaiki masalah di bawah." }]);
    }
  }

  if (!data || !cfg || !body) {
    return (
      <main className="page page-wide">
        {err ? (
          <p className="error">
            {err instanceof ApiError && err.status === 403
              ? "Studio hanya untuk admin."
              : "Template tidak ditemukan."}
          </p>
        ) : (
          <p className="muted">Memuat…</p>
        )}
      </main>
    );
  }

  return (
    <main className="page page-wide">
      <p>
        <Link to="/studio">← Studio</Link>
      </p>
      <div className="card stack">
        <div className="row" style={{ borderTop: 0 }}>
          <h1 style={{ margin: 0 }}>{data.item.title}</h1>
          <span className="badge">{data.item.status === "published" ? "Terbit" : "Draft"}</span>
        </div>
        <p className="muted small" style={{ margin: 0 }}>
          /template/{data.item.slug}
        </p>
        <div className="row-actions">
          <button type="button" className="btn" onClick={save} disabled={!dirty}>
            {dirty ? "Simpan draft" : "Tersimpan"}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => publish("published")}>
            {data.item.status === "published" ? "Terbitkan perubahan" : "Terbitkan template"}
          </button>
          {data.item.status === "published" && (
            <>
              <button type="button" className="btn" onClick={() => publish("draft")}>
                Tarik ke draft
              </button>
              <Link to="/template/$slug" params={{ slug: data.item.slug }} className="btn">
                Lihat sebagai pelanggan
              </Link>
            </>
          )}
        </div>
        <TopicPicker contentId={rawId} />
        {notice && <p className="notice">{notice}</p>}
        {[...issues.map((i) => `${i.path ? `${i.path}: ` : ""}${i.message}`), ...problems].map(
          (m) => (
            <p key={m} className="error small" style={{ margin: 0 }}>
              {m}
            </p>
          ),
        )}
      </div>

      <div className="studio-grid">
        <section className="stack">
          <div className="card stack">
            <h2>1. Isian (form pelanggan)</h2>
            <p className="muted small" style={{ margin: 0 }}>
              <b>Kunci</b> dipakai di isi template sebagai <code>{"{{kunci}}"}</code>.
            </p>
            <InputsEditor
              inputs={cfg.variables}
              issues={issues}
              pathPrefix="variables"
              defaultType="text"
              onChange={(variables) => {
                setCfg({ ...cfg, variables });
                touch();
              }}
            />
          </div>

          <div className="card stack">
            <h2>2. Isi template</h2>
            <details className="muted small">
              <summary>Cara menulis template</summary>
              <ul>
                <li>
                  Tulis <code>{"{{nama}}"}</code> untuk menampilkan isian pelanggan.
                </li>
                <li>
                  Bagian bersyarat: satu paragraf berisi <code>{"{{#if catatan}}"}</code>, isi
                  bagiannya, lalu satu paragraf <code>{"{{/if}}"}</code>. Bagian itu hanya muncul
                  bila isian terisi.
                </li>
                <li>
                  Gunakan tombol ▦ Tabel untuk jadwal/perencana. Di Excel, setiap tabel menjadi satu
                  sheet.
                </li>
              </ul>
            </details>
            <ChapterEditor
              key={editorKey}
              doc={body}
              onChange={(d) => {
                setBody(d);
                touch();
              }}
            />
          </div>

          <div className="card stack">
            <h2>3. File unduhan</h2>
            <div className="row-actions">
              {TEMPLATE_FORMATS.map((f) => (
                <label key={f} className="check">
                  <input
                    type="checkbox"
                    checked={cfg.outputFormats.includes(f)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...cfg.outputFormats, f]
                        : cfg.outputFormats.filter((x) => x !== f);
                      setCfg({ ...cfg, outputFormats: next });
                      touch();
                    }}
                  />
                  {FORMAT_LABEL[f]}
                </label>
              ))}
            </div>
            <label className="field">
              <span>Nama file (boleh memakai {"{{kunci}}"})</span>
              <input
                value={cfg.fileName ?? ""}
                placeholder={data.item.title}
                onChange={(e) => {
                  setCfg({ ...cfg, fileName: e.target.value || undefined });
                  touch();
                }}
              />
            </label>
          </div>
        </section>

        <aside className="card stack builder-preview">
          <h2>Uji unduh</h2>
          <p className="muted small" style={{ margin: 0 }}>
            Memakai isi di layar (belum perlu disimpan). Tidak memotong kuota.
          </p>
          <TemplateForm
            key={JSON.stringify(cfg.variables)}
            variables={cfg.variables}
            formats={cfg.outputFormats}
            download={(format, input) =>
              downloadFile(`/studio/templates/${id}/preview`, { config: cfg, body, format, input })
            }
          />
        </aside>
      </div>
    </main>
  );
}
