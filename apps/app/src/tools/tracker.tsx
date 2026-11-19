import {
  addDays,
  type PublicToolDefinition,
  type StreakSummary,
  type ToolRunResult,
  TRACKER_BACKFILL_DAYS,
  type TrackerEntry,
} from "@selfgrow/shared";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { ToolForm } from "./form";

const dayFmt = new Intl.DateTimeFormat("id-ID", {
  weekday: "short",
  day: "numeric",
  month: "short",
});
const fmtDate = (d: string) => dayFmt.format(new Date(`${d}T00:00:00Z`));

type History = { from: string; to: string; entries: TrackerEntry[]; streak: StreakSummary };

/** Mode tracker di halaman tool: isi per tanggal, streak, grafik 30 hari, riwayat (D13). */
export function TrackerPanel({
  slug,
  definition,
  today,
  locked,
}: {
  slug: string;
  definition: PublicToolDefinition;
  today: string;
  locked: boolean;
}) {
  const s = encodeURIComponent(slug);
  const [date, setDate] = useState(today);
  const [history, setHistory] = useState<History | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [metric, setMetric] = useState<string | null>(null);

  const load = useCallback(() => {
    api<History>(`/tools/${s}/entries?days=30`)
      .then(setHistory)
      .catch(() => setHistory(null))
      .finally(() => setLoaded(true));
  }, [s]);
  useEffect(load, [load]);

  const byDate = useMemo(
    () => new Map((history?.entries ?? []).map((e) => [e.date, e])),
    [history],
  );
  const existing = byDate.get(date);

  // Pilihan grafik: hasil rumus angka + isian angka.
  const metrics = useMemo(() => {
    const list: { key: string; label: string }[] = [];
    for (const o of definition.outputs)
      if (o.format !== "text") list.push({ key: o.key, label: o.label });
    for (const i of definition.inputs)
      if (i.type === "number") list.push({ key: i.key, label: i.label });
    return list;
  }, [definition]);
  const activeMetric = metric ?? metrics[0]?.key ?? null;

  const dates = Array.from({ length: TRACKER_BACKFILL_DAYS + 1 }, (_, i) => addDays(today, -i));

  async function remove(d: string) {
    if (!window.confirm(`Hapus catatan ${fmtDate(d)}?`)) return;
    await api(`/tools/${s}/entries/${encodeURIComponent(d)}`, { method: "DELETE" });
    load();
  }

  const streak = history?.streak ?? { current: 0, longest: 0, lastEntryDate: null };

  return (
    <div className="stack">
      <div className="streak-row">
        <div className="streak">
          <div className="streak-num">🔥 {streak.current}</div>
          <div className="muted small">hari berturut-turut</div>
        </div>
        <div className="streak">
          <div className="streak-num">🏆 {streak.longest}</div>
          <div className="muted small">rekor terbaik</div>
        </div>
      </div>
      {streak.current > 0 && streak.lastEntryDate !== today && (
        <p className="notice small">Isi hari ini supaya streak-mu tidak putus.</p>
      )}

      <div className="card stack">
        <label className="field">
          <span>Tanggal</span>
          <select value={date} onChange={(e) => setDate(e.target.value)}>
            {dates.map((d) => (
              <option key={d} value={d}>
                {d === today ? "Hari ini" : fmtDate(d)}
                {byDate.has(d) ? " ✓" : ""}
              </option>
            ))}
          </select>
        </label>
        {existing && <p className="muted small">Sudah diisi. Simpan lagi untuk memperbarui.</p>}
        {/* Form dibuat ulang hanya saat tanggal diganti, supaya hasil simpan tetap terlihat. */}
        {loaded ? (
          <ToolForm
            key={date}
            definition={definition}
            initial={existing?.input}
            submitLabel={existing ? "Perbarui" : undefined}
            disabled={locked}
            disabledNote={
              <p className="muted small">Mencatat progres bisa dilakukan setelah berlangganan.</p>
            }
            run={async (input) => {
              const r = await api<ToolRunResult & { usage: { used: number; limit: number } }>(
                `/tools/${s}/entries`,
                { method: "PUT", body: JSON.stringify({ date, input }) },
              );
              load();
              return r;
            }}
          />
        ) : (
          <p className="muted">Memuat…</p>
        )}
      </div>

      {history && history.entries.length > 0 && (
        <div className="card stack">
          <div className="row" style={{ borderTop: 0 }}>
            <h2 style={{ margin: 0 }}>30 hari terakhir</h2>
            {metrics.length > 1 && (
              <select
                aria-label="Data grafik"
                value={activeMetric ?? ""}
                onChange={(e) => setMetric(e.target.value)}
              >
                {metrics.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          {activeMetric && <BarChart history={history} metric={activeMetric} />}
          <div>
            {history.entries.map((e) => (
              <div key={e.date} className="row">
                <div>
                  <div>{fmtDate(e.date)}</div>
                  <div className="muted small">
                    {e.results.map((r) => `${r.label}: ${r.display}`).join(" · ")}
                  </div>
                </div>
                <button type="button" className="btn btn-danger" onClick={() => remove(e.date)}>
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function entryValue(e: TrackerEntry, key: string): number | null {
  const r = e.results.find((x) => x.key === key);
  const v = r ? r.value : e.input[key];
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : Number.NaN;
  return Number.isFinite(n) ? n : null;
}

/** Grafik batang 30 hari tanpa library (SVG), hari kosong tetap terlihat. */
function BarChart({ history, metric }: { history: History; metric: string }) {
  const days = Array.from({ length: 30 }, (_, i) => addDays(history.to, -(29 - i)));
  const map = new Map(history.entries.map((e) => [e.date, entryValue(e, metric)]));
  const values = days.map((d) => map.get(d) ?? null);
  const max = Math.max(1, ...values.filter((v): v is number => v !== null));
  const W = 300;
  const H = 120;
  const bw = W / days.length;
  return (
    <svg
      viewBox={`0 0 ${W} ${H + 16}`}
      className="chart"
      role="img"
      aria-label={`Grafik ${values.filter((v) => v !== null).length} hari tercatat`}
    >
      {values.map((v, i) => {
        const h = v === null ? 0 : Math.max(2, (v / max) * H);
        return (
          <g key={days[i]}>
            <title>
              {fmtDate(days[i] as string)}: {v ?? "–"}
            </title>
            <rect
              x={i * bw + 1}
              y={v === null ? H - 2 : H - h}
              width={bw - 2}
              height={v === null ? 2 : h}
              rx={2}
              className={v === null ? "bar-empty" : "bar"}
            />
          </g>
        );
      })}
      <text x={0} y={H + 14} className="chart-label">
        {fmtDate(days[0] as string)}
      </text>
      <text x={W} y={H + 14} textAnchor="end" className="chart-label">
        Hari ini
      </text>
    </svg>
  );
}
