import type { ProgramDayView } from "@selfgrow/shared";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ApiError, api } from "../lib/api";

type Meta = {
  program: { slug: string; title: string; summary: string | null; durationDays: number };
  locked: boolean;
  enrollment: {
    startedAt: string;
    currentDay: number;
    completedAt: string | null;
    completedCount: number;
  } | null;
  days: ProgramDayView[];
};

const dateFmt = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const fmt = (d: string) => dateFmt.format(new Date(`${d}T00:00:00Z`));
const ICON = { chapter: "📖", tool: "🧮", template: "📄", task: "✅" } as const;

export function ProgramPage() {
  const { slug } = useParams({ from: "/program/$slug" });
  const s = encodeURIComponent(slug);
  const navigate = useNavigate();
  const [meta, setMeta] = useState<Meta | null>(null);
  const [err, setErr] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api<Meta>(`/programs/${s}`).then(setMeta).catch(setErr);
  }, [s]);
  useEffect(load, [load]);
  useEffect(() => {
    if (err instanceof ApiError && err.status === 401) navigate({ to: "/masuk" });
  }, [err, navigate]);

  async function enroll(restart = false) {
    if (restart && !window.confirm("Ulangi program dari hari pertama? Progres sebelumnya dihapus."))
      return;
    setBusy(true);
    try {
      await api(`/programs/${s}/enroll`, { method: "POST", body: JSON.stringify({ restart }) });
      load();
    } finally {
      setBusy(false);
    }
  }

  async function toggle(day: ProgramDayView) {
    await api(`/programs/${s}/days/${day.day}/complete`, {
      method: day.completed ? "DELETE" : "POST",
    });
    load();
  }

  if (!meta) {
    return (
      <main className="page">
        {err ? <p className="error">Program tidak ditemukan.</p> : <p className="muted">Memuat…</p>}
      </main>
    );
  }

  const total = meta.days.length;
  const done = meta.enrollment?.completedCount ?? 0;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <main className="page">
      <p>
        <Link to="/perpustakaan">← Perpustakaan</Link>
      </p>
      <h1>{meta.program.title}</h1>
      {meta.program.summary && <p className="muted">{meta.program.summary}</p>}

      {!meta.enrollment ? (
        <div className="card stack">
          <p style={{ margin: 0 }}>
            Program {meta.program.durationDays} hari. Setiap hari terbuka langkah baru: bacaan,
            tools, dan tugas kecil.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            disabled={busy || meta.locked}
            onClick={() => enroll()}
          >
            Mulai program
          </button>
          {meta.locked && <p className="muted small">Program bisa diikuti setelah berlangganan.</p>}
        </div>
      ) : (
        <div className="card stack">
          {meta.enrollment.completedAt ? (
            <p className="notice" style={{ margin: 0 }}>
              🎉 Selamat! Kamu menyelesaikan program ini.
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              Hari ke-{Math.min(meta.enrollment.currentDay, meta.program.durationDays)} dari{" "}
              {meta.program.durationDays}
            </p>
          )}
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div style={{ width: `${pct}%` }} />
          </div>
          <p className="muted small" style={{ margin: 0 }}>
            {done} dari {total} hari selesai
          </p>
          <button type="button" className="btn" disabled={busy} onClick={() => enroll(true)}>
            Ulangi dari awal
          </button>
        </div>
      )}

      {meta.days.map((d) => (
        <div key={d.day} className={`card stack program-day${d.unlocked ? "" : " locked"}`}>
          <div className="row" style={{ borderTop: 0 }}>
            <h2 style={{ margin: 0 }}>
              {d.completed ? "✔ " : ""}Hari {d.day}: {d.title}
            </h2>
            {!d.unlocked && <span className="badge">🔒</span>}
          </div>
          {!d.unlocked && meta.enrollment && d.unlockDate && (
            <p className="muted small" style={{ margin: 0 }}>
              Terbuka {fmt(d.unlockDate)}
            </p>
          )}
          {d.unlocked && (
            <>
              {d.description && <p style={{ margin: 0 }}>{d.description}</p>}
              {d.items.map((it, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: urutan langkah tetap
                <div key={i} className="row">
                  {it.href ? (
                    <a href={it.href}>
                      {ICON[it.type]} {it.title}
                    </a>
                  ) : (
                    <span className={it.type === "task" ? "" : "muted"}>
                      {ICON[it.type]} {it.title}
                    </span>
                  )}
                </div>
              ))}
              <button
                type="button"
                className={d.completed ? "btn" : "btn btn-primary"}
                onClick={() => toggle(d)}
              >
                {d.completed ? "Batalkan selesai" : "Tandai hari ini selesai"}
              </button>
            </>
          )}
        </div>
      ))}
    </main>
  );
}
