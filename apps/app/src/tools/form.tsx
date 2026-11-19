import type { PublicToolDefinition, ToolInput, ToolRunResult } from "@selfgrow/shared";
import { type FormEvent, useState } from "react";

type Issue = { path: string; message: string };

/**
 * Form tool + tampilan hasil. Dipakai di halaman pelanggan dan panel uji coba Studio.
 * `run` mengirim input ke server; rumus tidak pernah ada di browser.
 */
export function ToolForm({
  definition,
  run,
  disabled,
  disabledNote,
  initial,
  submitLabel,
}: {
  definition: PublicToolDefinition;
  run: (
    input: Record<string, unknown>,
  ) => Promise<ToolRunResult & { usage?: { used: number; limit: number } }>;
  disabled?: boolean;
  disabledNote?: React.ReactNode;
  /** Isian awal (mis. entri tracker yang sudah tersimpan untuk tanggal terpilih). */
  initial?: Record<string, unknown>;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(
      Object.entries(initial ?? {})
        .filter(([, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, typeof v === "boolean" ? v : String(v)]),
    ),
  );
  const [result, setResult] = useState<
    (ToolRunResult & { usage?: { used: number; limit: number } }) | null
  >(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const toInput = () => {
    const out: Record<string, unknown> = {};
    for (const i of definition.inputs) {
      const v = values[i.key];
      if (i.type === "boolean") out[i.key] = Boolean(v);
      else if (v === undefined || v === "") out[i.key] = i.required ? undefined : null;
      else if (i.type === "number")
        out[i.key] = Number(String(v).replace(/\./g, "").replace(",", "."));
      else out[i.key] = v;
    }
    return out;
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setIssues([]);
    try {
      setResult(await run(toInput()));
    } catch (err) {
      const body = (err as { body?: { issues?: Issue[]; error?: string } }).body;
      if (body?.issues) setIssues(body.issues);
      setError(
        body?.error === "quota_exceeded"
          ? "Kuota pemakaian tool ini bulan ini sudah habis."
          : body?.issues
            ? "Periksa kembali isian yang ditandai."
            : "Gagal menghitung. Coba lagi.",
      );
    } finally {
      setBusy(false);
    }
  }

  const issueFor = (key: string) => issues.find((i) => i.path === key || i.path === `input.${key}`);

  return (
    <div className="stack">
      {definition.intro && <p className="muted">{definition.intro}</p>}
      <form className="stack" onSubmit={submit}>
        {definition.inputs.map((i) => (
          <Field
            key={i.key}
            input={i}
            value={values[i.key]}
            issue={issueFor(i.key)?.message}
            onChange={(v) => setValues((s) => ({ ...s, [i.key]: v }))}
          />
        ))}
        <button type="submit" className="btn btn-primary" disabled={busy || disabled}>
          {busy ? "Memproses…" : (submitLabel ?? definition.submitLabel ?? "Hitung")}
        </button>
        {disabled && disabledNote}
      </form>
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="stack" aria-live="polite">
          <div className="result-grid">
            {result.results.map((r) => (
              <div key={r.key} className="result">
                <div className="muted small">{r.label}</div>
                <div className="result-value">{r.display}</div>
              </div>
            ))}
          </div>
          {result.recommendations.map((r, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: daftar statis per hasil
            <aside key={idx} className={`callout callout-${r.variant}`} role="note">
              <p>{r.text}</p>
            </aside>
          ))}
          {result.usage && (
            <p className="muted small">
              Pemakaian bulan ini: {result.usage.used} dari {result.usage.limit}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Field({
  input: i,
  value,
  issue,
  onChange,
}: {
  input: ToolInput;
  value: string | boolean | undefined;
  issue?: string;
  onChange: (v: string | boolean) => void;
}) {
  const id = `f-${i.key}`;
  if (i.type === "boolean") {
    return (
      <label className="check">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
        {i.label}
      </label>
    );
  }
  return (
    <div className="field">
      <label htmlFor={id}>
        {i.label}
        {i.unit ? ` (${i.unit})` : ""}
        {!i.required && <span className="muted"> · opsional</span>}
      </label>
      {i.type === "select" ? (
        <select
          id={id}
          value={String(value ?? "")}
          required={i.required}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Pilih…</option>
          {(i.options ?? []).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          inputMode={i.type === "number" ? "decimal" : undefined}
          type="text"
          value={String(value ?? "")}
          placeholder={i.placeholder}
          required={i.required}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={issue ? true : undefined}
        />
      )}
      {i.help && <span className="muted small">{i.help}</span>}
      {issue && <span className="error small">{issue}</span>}
    </div>
  );
}
