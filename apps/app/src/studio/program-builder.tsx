import type { ProgramDay, ProgramItem } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ApiError, api } from "../lib/api";

type Issue = { path: string; message: string };
type CatalogItem = {
  id: string;
  type: "ebook" | "tool" | "template";
  title: string;
  status: string;
  chapters: { id: string; title: string; status: string }[];
};
type Resp = {
  item: { id: string; slug: string; title: string; summary: string | null; status: string };
  durationDays: number;
  steps: ProgramDay[];
  catalog: CatalogItem[];
  problems: string[];
};

const TYPE_LABEL: Record<ProgramItem["type"], string> = {
  chapter: "📖 Bab ebook",
  tool: "🧮 Tool / tracker",
  template: "📄 Template",
  task: "✅ Tugas",
};

export function StudioProgram() {
  const { id: rawId } = useParams({ from: "/studio/program/$id" });
  const id = encodeURIComponent(rawId);
  const navigate = useNavigate();
  const [data, setData] = useState<Resp | null>(null);
  const [duration, setDuration] = useState(30);
  const [steps, setSteps] = useState<ProgramDay[]>([]);
  const [problems, setProblems] = useState<string[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [err, setErr] = useState<unknown>(null);

  const load = useCallback(async () => {
    try {
      const r = await api<Resp>(`/studio/programs/${id}`);
      setData(r);
      setDuration(r.durationDays);
      setSteps(r.steps);
      setProblems(r.problems);
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

  const change = (fn: (s: ProgramDay[]) => ProgramDay[]) => {
    setSteps((s) => fn(structuredClone(s)));
    setDirty(true);
    setNotice(null);
  };

  async function save() {
    setIssues([]);
    try {
      const r = await api<{ problems: string[] }>(`/studio/programs/${id}`, {
        method: "PUT",
        body: JSON.stringify({ durationDays: duration, steps }),
      });
      setProblems(r.problems);
      setDirty(false);
      setNotice("Tersimpan sebagai draft.");
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
          ? `Program diterbitkan (versi ${r.version}).`
          : "Program ditarik ke draft.",
      );
      await load();
    } catch (e) {
      const b = (e as ApiError).body as { problems?: string[] } | undefined;
      if (b?.problems) setProblems(b.problems);
      setIssues([{ path: "", message: "Belum bisa diterbitkan. Perbaiki masalah di bawah." }]);
    }
  }

  if (!data) {
    return (
      <main className="page page-wide">
        {err ? (
          <p className="error">
            {err instanceof ApiError && err.status === 403
              ? "Studio hanya untuk admin."
              : "Program tidak ditemukan."}
          </p>
        ) : (
          <p className="muted">Memuat…</p>
        )}
      </main>
    );
  }

  const ofType = (t: CatalogItem["type"]) => data.catalog.filter((c) => c.type === t);
  const nextDay = Math.min(duration, (steps.at(-1)?.day ?? 0) + 1);

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
        <label className="field" style={{ maxWidth: 220 }}>
          <span>Durasi (hari)</span>
          <input
            inputMode="numeric"
            value={duration}
            onChange={(e) => {
              setDuration(Number(e.target.value.replace(/\D/g, "")) || 1);
              setDirty(true);
            }}
          />
        </label>
        <div className="row-actions">
          <button type="button" className="btn" onClick={save} disabled={!dirty}>
            {dirty ? "Simpan draft" : "Tersimpan"}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => publish("published")}>
            {data.item.status === "published" ? "Terbitkan perubahan" : "Terbitkan program"}
          </button>
          {data.item.status === "published" && (
            <>
              <button type="button" className="btn" onClick={() => publish("draft")}>
                Tarik ke draft
              </button>
              <Link to="/program/$slug" params={{ slug: data.item.slug }} className="btn">
                Lihat sebagai pelanggan
              </Link>
            </>
          )}
        </div>
        {notice && <p className="notice">{notice}</p>}
        {[...issues.map((i) => `${i.path ? `${i.path}: ` : ""}${i.message}`), ...problems].map(
          (m) => (
            <p key={m} className="error small" style={{ margin: 0 }}>
              {m}
            </p>
          ),
        )}
      </div>

      {steps.map((s, idx) => (
        <div key={s.day} className="card stack">
          <div className="builder-row">
            <label className="field">
              <span>Hari ke-</span>
              <input
                inputMode="numeric"
                value={s.day}
                onChange={(e) =>
                  change((all) => {
                    (all[idx] as ProgramDay).day = Number(e.target.value.replace(/\D/g, "")) || 1;
                    return all;
                  })
                }
              />
            </label>
            <label className="field grow">
              <span>Judul hari</span>
              <input
                value={s.title}
                onChange={(e) =>
                  change((all) => {
                    (all[idx] as ProgramDay).title = e.target.value;
                    return all;
                  })
                }
              />
            </label>
            <div className="field">
              <span>&nbsp;</span>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => change((all) => all.filter((_, i) => i !== idx))}
              >
                Hapus hari
              </button>
            </div>
          </div>
          <label className="field">
            <span>Pesan untuk hari ini (opsional)</span>
            <textarea
              rows={2}
              value={s.description ?? ""}
              onChange={(e) =>
                change((all) => {
                  (all[idx] as ProgramDay).description = e.target.value || undefined;
                  return all;
                })
              }
            />
          </label>
          {s.items.map((it, j) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: daftar terkontrol tanpa id stabil
            <div key={j} className="builder-item row-actions">
              <span className="badge">{TYPE_LABEL[it.type]}</span>
              {it.type === "task" ? (
                <input
                  style={{ flex: 1, minWidth: 200 }}
                  value={it.text}
                  aria-label="Tugas"
                  onChange={(e) =>
                    change((all) => {
                      ((all[idx] as ProgramDay).items[j] as { text: string }).text = e.target.value;
                      return all;
                    })
                  }
                />
              ) : (
                <select
                  style={{ flex: 1, minWidth: 200 }}
                  aria-label="Pilih konten"
                  value={it.type === "chapter" ? `${it.contentId}|${it.chapterId}` : it.contentId}
                  onChange={(e) =>
                    change((all) => {
                      const items = (all[idx] as ProgramDay).items;
                      if (it.type === "chapter") {
                        const [contentId, chapterId] = e.target.value.split("|");
                        items[j] = {
                          type: "chapter",
                          contentId: contentId ?? "",
                          chapterId: chapterId ?? "",
                        };
                      } else items[j] = { type: it.type, contentId: e.target.value };
                      return all;
                    })
                  }
                >
                  <option value="">Pilih…</option>
                  {it.type === "chapter"
                    ? ofType("ebook").map((eb) => (
                        <optgroup
                          key={eb.id}
                          label={`${eb.title}${eb.status === "published" ? "" : " (draft)"}`}
                        >
                          {eb.chapters.map((ch) => (
                            <option key={ch.id} value={`${eb.id}|${ch.id}`}>
                              {ch.title}
                              {ch.status === "published" ? "" : " (draft)"}
                            </option>
                          ))}
                        </optgroup>
                      ))
                    : ofType(it.type).map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                          {c.status === "published" ? "" : " (draft)"}
                        </option>
                      ))}
                </select>
              )}
              <button
                type="button"
                className="tb"
                aria-label="Hapus langkah"
                onClick={() =>
                  change((all) => {
                    (all[idx] as ProgramDay).items.splice(j, 1);
                    return all;
                  })
                }
              >
                ✕
              </button>
            </div>
          ))}
          <div className="row-actions">
            {(["chapter", "tool", "template", "task"] as const).map((t) => (
              <button
                key={t}
                type="button"
                className="btn"
                onClick={() =>
                  change((all) => {
                    const items = (all[idx] as ProgramDay).items;
                    if (t === "task") items.push({ type: "task", text: "Tugas baru" });
                    else if (t === "chapter")
                      items.push({ type: "chapter", contentId: "", chapterId: "" });
                    else items.push({ type: t, contentId: "" });
                    return all;
                  })
                }
              >
                + {TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-block"
        disabled={steps.length >= duration}
        onClick={() =>
          change((all) => [...all, { day: nextDay, title: `Hari ke-${nextDay}`, items: [] }])
        }
      >
        + Tambah hari ({steps.length}/{duration})
      </button>
    </main>
  );
}
