import {
  FORMULA_FUNCTIONS,
  TOOL_OUTPUT_FORMATS,
  TOOL_VARIANTS,
  type ToolConfig,
  type ToolRunResult,
  toPublicDefinition,
} from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiError, api } from "../lib/api";
import { ToolForm } from "../tools/form";
import { InputsEditor } from "./inputs-editor";

type Issue = { path: string; message: string };

type ToolResponse = {
  item: { id: string; slug: string; title: string; summary: string | null; status: string };
  tool: {
    kind: "nocode" | "custom";
    config: ToolConfig | null;
    hasUnpublishedChanges: boolean;
    quotaPerMonth: number | null;
    storesUserData: boolean;
    defaultQuota: number;
  };
};

const FORMAT_LABEL: Record<(typeof TOOL_OUTPUT_FORMATS)[number], string> = {
  number: "Angka",
  currency_idr: "Rupiah",
  percent: "Persen",
  text: "Teks",
};
const VARIANT_LABEL: Record<(typeof TOOL_VARIANTS)[number], string> = {
  tip: "💡 Tips",
  info: "ℹ️ Info",
  warning: "⚠️ Peringatan",
};

export function StudioTool() {
  const { id: rawId } = useParams({ from: "/studio/tool/$id" });
  const id = encodeURIComponent(rawId);
  const navigate = useNavigate();
  const [data, setData] = useState<ToolResponse | null>(null);
  const [cfg, setCfg] = useState<ToolConfig | null>(null);
  const [quota, setQuota] = useState<string>("");
  const [tracker, setTracker] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const [dirty, setDirty] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [jsonText, setJsonText] = useState("");

  const load = useCallback(async () => {
    try {
      const r = await api<ToolResponse>(`/studio/tools/${id}`);
      setData(r);
      setCfg(r.tool.config);
      setQuota(r.tool.quotaPerMonth ? String(r.tool.quotaPerMonth) : "");
      setTracker(r.tool.storesUserData);
      setDirty(false);
    } catch (e) {
      setErr(e);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk" });
  }, [err, navigate]);

  const update = (fn: (c: ToolConfig) => ToolConfig) => {
    setCfg((c) => (c ? fn(structuredClone(c)) : c));
    setDirty(true);
    setNotice(null);
  };

  async function save() {
    if (!cfg) return false;
    setIssues([]);
    try {
      await api(`/studio/tools/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          config: cfg,
          quotaPerMonth: quota ? Number(quota) : null,
          storesUserData: tracker,
        }),
      });
      setDirty(false);
      setNotice("Tersimpan sebagai draft. Pelanggan belum melihat perubahan sampai diterbitkan.");
      return true;
    } catch (e) {
      const body = (e as ApiError).body as { issues?: Issue[] } | undefined;
      setIssues(body?.issues ?? [{ path: "", message: "Gagal menyimpan." }]);
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
          ? `Tool diterbitkan (versi ${r.version}).`
          : "Tool ditarik ke draft.",
      );
      await load();
    } catch {
      setIssues([{ path: "", message: "Gagal menerbitkan. Periksa konfigurasi." }]);
    }
  }

  const preview = useMemo(() => {
    try {
      return cfg ? toPublicDefinition(cfg) : null;
    } catch {
      return null;
    }
  }, [cfg]);

  if (!data || !cfg) {
    return (
      <main className="page page-wide">
        {err ? (
          <p className="error">
            {err instanceof ApiError && err.status === 403
              ? "Studio hanya untuk admin."
              : "Tool tidak ditemukan."}
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
          /tools/{data.item.slug}
          {data.tool.hasUnpublishedChanges && data.item.status === "published"
            ? " · ada perubahan yang belum diterbitkan"
            : ""}
        </p>
        <div className="row-actions">
          <button type="button" className="btn" onClick={save} disabled={!dirty}>
            {dirty ? "Simpan draft" : "Tersimpan"}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => publish("published")}>
            {data.item.status === "published" ? "Terbitkan perubahan" : "Terbitkan tool"}
          </button>
          {data.item.status === "published" && (
            <>
              <button type="button" className="btn" onClick={() => publish("draft")}>
                Tarik ke draft
              </button>
              <Link to="/tools/$slug" params={{ slug: data.item.slug }} className="btn">
                Lihat sebagai pelanggan
              </Link>
            </>
          )}
        </div>
        {notice && <p className="notice">{notice}</p>}
        {issues.length > 0 && (
          <div className="error small">
            {issues.map((i) => (
              <div key={`${i.path}${i.message}`}>
                {i.path ? `${i.path.replace(/^config\./, "")}: ` : ""}
                {i.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="studio-grid">
        <section className="stack">
          <div className="card stack">
            <h2>Pembuka</h2>
            <label className="field">
              <span>Kalimat pembuka (opsional)</span>
              <textarea
                rows={2}
                value={cfg.intro ?? ""}
                onChange={(e) => update((c) => ({ ...c, intro: e.target.value || undefined }))}
              />
            </label>
            <label className="field">
              <span>Teks tombol</span>
              <input
                value={cfg.submitLabel ?? ""}
                placeholder="Hitung"
                onChange={(e) =>
                  update((c) => ({ ...c, submitLabel: e.target.value || undefined }))
                }
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={tracker}
                onChange={(e) => {
                  setTracker(e.target.checked);
                  setDirty(true);
                }}
              />
              Tracker harian: simpan isian pengguna per tanggal + streak
            </label>
            <label className="field">
              <span>Kuota pakai per pengguna per bulan (kosong = {data.tool.defaultQuota})</span>
              <input
                inputMode="numeric"
                value={quota}
                onChange={(e) => {
                  setQuota(e.target.value.replace(/\D/g, ""));
                  setDirty(true);
                }}
              />
            </label>
          </div>

          <div className="card stack">
            <h2>1. Isian (form)</h2>
            <p className="muted small" style={{ margin: 0 }}>
              <b>Kunci</b> adalah nama yang dipakai di rumus, mis. <code>gaji</code>.
            </p>
            <InputsEditor
              inputs={cfg.inputs}
              issues={issues}
              pathPrefix="inputs"
              onChange={(inputs) => update((c) => ({ ...c, inputs }))}
            />
          </div>

          <div className="card stack">
            <h2>2. Rumus (hasil)</h2>
            <FormulaHelp />
            {cfg.computed.map((cp, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: daftar terkontrol tanpa id stabil
              <div key={`cp-${idx}`} className="builder-item stack">
                <div className="builder-row">
                  <label className="field">
                    <span>Kunci</span>
                    <input
                      value={cp.key}
                      onChange={(e) =>
                        update((c) => {
                          (c.computed[idx] as typeof cp).key = e.target.value.toLowerCase();
                          return c;
                        })
                      }
                    />
                  </label>
                  <label className="field grow">
                    <span>Label</span>
                    <input
                      value={cp.label}
                      onChange={(e) =>
                        update((c) => {
                          (c.computed[idx] as typeof cp).label = e.target.value;
                          return c;
                        })
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Format</span>
                    <select
                      value={cp.format}
                      onChange={(e) =>
                        update((c) => {
                          (c.computed[idx] as typeof cp).format = e.target
                            .value as typeof cp.format;
                          return c;
                        })
                      }
                    >
                      {TOOL_OUTPUT_FORMATS.map((f) => (
                        <option key={f} value={f}>
                          {FORMAT_LABEL[f]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="field">
                  <span>Rumus</span>
                  <input
                    className="mono"
                    value={cp.formula}
                    onChange={(e) =>
                      update((c) => {
                        (c.computed[idx] as typeof cp).formula = e.target.value;
                        return c;
                      })
                    }
                  />
                  <IssueText issues={issues} path={`computed.${idx}.formula`} />
                  <IssueText issues={issues} path={`computed.${idx}.key`} />
                </label>
                <div className="row-actions">
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={cp.show}
                      onChange={(e) =>
                        update((c) => {
                          (c.computed[idx] as typeof cp).show = e.target.checked;
                          return c;
                        })
                      }
                    />
                    Tampilkan ke pengguna
                  </label>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      update((c) => ({ ...c, computed: c.computed.filter((_, i) => i !== idx) }))
                    }
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                update((c) => ({
                  ...c,
                  computed: [
                    ...c.computed,
                    {
                      key: `hasil_${c.computed.length + 1}`,
                      label: "Hasil baru",
                      formula: c.inputs[0]?.key ?? "0",
                      format: "number",
                      show: true,
                    },
                  ],
                }))
              }
            >
              + Rumus
            </button>
          </div>

          <div className="card stack">
            <h2>3. Rekomendasi</h2>
            <p className="muted small" style={{ margin: 0 }}>
              Muncul bila kondisinya benar. Teks boleh memuat <code>{"{{kunci}}"}</code> untuk
              menampilkan nilai.
            </p>
            {cfg.recommendations.map((r, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: daftar terkontrol tanpa id stabil
              <div key={`rc-${idx}`} className="builder-item stack">
                <label className="field">
                  <span>Kondisi</span>
                  <input
                    className="mono"
                    value={r.when}
                    placeholder="skor >= 70"
                    onChange={(e) =>
                      update((c) => {
                        (c.recommendations[idx] as typeof r).when = e.target.value;
                        return c;
                      })
                    }
                  />
                  <IssueText issues={issues} path={`recommendations.${idx}.when`} />
                </label>
                <label className="field">
                  <span>Teks</span>
                  <textarea
                    rows={2}
                    value={r.text}
                    onChange={(e) =>
                      update((c) => {
                        (c.recommendations[idx] as typeof r).text = e.target.value;
                        return c;
                      })
                    }
                  />
                </label>
                <div className="row-actions">
                  <select
                    value={r.variant}
                    aria-label="Jenis rekomendasi"
                    onChange={(e) =>
                      update((c) => {
                        (c.recommendations[idx] as typeof r).variant = e.target
                          .value as typeof r.variant;
                        return c;
                      })
                    }
                  >
                    {TOOL_VARIANTS.map((v) => (
                      <option key={v} value={v}>
                        {VARIANT_LABEL[v]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      update((c) => ({
                        ...c,
                        recommendations: c.recommendations.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              onClick={() =>
                update((c) => ({
                  ...c,
                  recommendations: [
                    ...c.recommendations,
                    { when: "true", text: "Teks rekomendasi", variant: "tip" },
                  ],
                }))
              }
            >
              + Rekomendasi
            </button>
          </div>

          <div className="card stack">
            <button
              type="button"
              className="btn"
              onClick={() => {
                setJsonText(JSON.stringify(cfg, null, 2));
                setShowJson((s) => !s);
              }}
            >
              {showJson ? "Tutup JSON" : "Lanjutan: lihat / tempel JSON"}
            </button>
            {showJson && (
              <>
                <p className="muted small" style={{ margin: 0 }}>
                  Salin JSON ini untuk dibuatkan variasi oleh Claude, lalu tempel kembali dan klik
                  Terapkan.
                </p>
                <textarea
                  className="mono"
                  rows={14}
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    try {
                      const parsed = JSON.parse(jsonText) as ToolConfig;
                      update(() => parsed);
                      setShowJson(false);
                    } catch {
                      setIssues([{ path: "", message: "JSON tidak valid." }]);
                    }
                  }}
                >
                  Terapkan JSON
                </button>
              </>
            )}
          </div>
        </section>

        <aside className="card stack builder-preview">
          <h2>Uji coba</h2>
          <p className="muted small" style={{ margin: 0 }}>
            Memakai konfigurasi di layar (belum perlu disimpan). Tidak memotong kuota.
          </p>
          {preview ? (
            <ToolForm
              key={JSON.stringify(preview)}
              definition={preview}
              run={(input) =>
                api<ToolRunResult>(`/studio/tools/${id}/test-run`, {
                  method: "POST",
                  body: JSON.stringify({ config: cfg, input }),
                }).catch((e) => {
                  const body = (e as ApiError).body as { issues?: Issue[] } | undefined;
                  if (body?.issues?.some((i) => i.path.startsWith("config")))
                    setIssues(body.issues);
                  throw e;
                })
              }
            />
          ) : (
            <p className="muted">Konfigurasi belum lengkap.</p>
          )}
        </aside>
      </div>
    </main>
  );
}

function IssueText({ issues, path }: { issues: Issue[]; path: string }) {
  return (
    <>
      {issues
        .filter((i) => i.path === `config.${path}`)
        .map((i) => (
          <span key={i.message} className="error small">
            {i.message}
          </span>
        ))}
    </>
  );
}

function FormulaHelp() {
  return (
    <details className="muted small">
      <summary>Cara menulis rumus</summary>
      <ul>
        <li>
          Operasi: <code>+ - * / %</code>, kurung <code>( )</code>, perbandingan{" "}
          <code>{"> >= < <= == !="}</code>, logika <code>&& ||</code>
        </li>
        <li>
          Fungsi:{" "}
          {Object.keys(FORMULA_FUNCTIONS).map((f, i) => (
            <span key={f}>
              {i > 0 ? ", " : ""}
              <code>{f}()</code>
            </span>
          ))}
        </li>
        <li>
          Contoh: <code>round(tabungan / gaji * 100, 1)</code>,{" "}
          <code>if(skor &gt;= 70, "Bagus", "Perlu latihan")</code>
        </li>
        <li>Rumus hanya boleh memakai kunci isian atau rumus di atasnya.</li>
      </ul>
    </details>
  );
}
