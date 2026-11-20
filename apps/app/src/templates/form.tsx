import type { TemplateFormat, ToolInput } from "@selfgrow/shared";
import { type FormEvent, useState } from "react";
import { ApiError } from "../lib/api";
import { Field } from "../tools/form";

type Issue = { path: string; message: string };
const LABEL: Record<TemplateFormat, string> = { docx: "Word", pdf: "PDF", xlsx: "Excel" };

/** Form isian template + tombol unduh per format. */
export function TemplateForm({
  variables,
  formats,
  download,
  disabled,
  disabledNote,
}: {
  variables: ToolInput[];
  formats: TemplateFormat[];
  download: (
    format: TemplateFormat,
    input: Record<string, unknown>,
  ) => Promise<{ name: string; used?: number; limit?: number }>;
  disabled?: boolean;
  disabledNote?: React.ReactNode;
}) {
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [busy, setBusy] = useState<TemplateFormat | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toInput = () => {
    const out: Record<string, unknown> = {};
    for (const i of variables) {
      const v = values[i.key];
      if (i.type === "boolean") out[i.key] = Boolean(v);
      else if (v === undefined || v === "") out[i.key] = i.required ? undefined : null;
      else if (i.type === "number")
        out[i.key] = Number(String(v).replace(/\./g, "").replace(",", "."));
      else out[i.key] = v;
    }
    return out;
  };

  async function run(e: FormEvent, format: TemplateFormat) {
    e.preventDefault();
    const form = (e.target as HTMLElement).closest("form");
    if (form && !form.reportValidity()) return;
    setBusy(format);
    setIssues([]);
    setError(null);
    setMessage(null);
    try {
      const r = await download(format, toInput());
      setMessage(`${r.name} diunduh.`);
    } catch (err) {
      const b =
        err instanceof ApiError ? (err.body as { issues?: Issue[]; error?: string }) : undefined;
      if (b?.issues) setIssues(b.issues);
      setError(
        b?.error === "quota_exceeded"
          ? "Kuota unduhan bulan ini sudah habis."
          : b?.issues
            ? "Periksa kembali isian yang ditandai."
            : "Gagal membuat file. Coba lagi.",
      );
    } finally {
      setBusy(null);
    }
  }

  return (
    <form className="stack" onSubmit={(e) => e.preventDefault()}>
      {variables.map((i) => (
        <Field
          key={i.key}
          input={i}
          value={values[i.key]}
          issue={issues.find((x) => x.path === i.key || x.path === `input.${i.key}`)?.message}
          onChange={(v) => setValues((s) => ({ ...s, [i.key]: v }))}
        />
      ))}
      <div className="row-actions">
        {formats.map((f) => (
          <button
            key={f}
            type="submit"
            className="btn btn-primary"
            disabled={busy !== null || disabled}
            onClick={(e) => run(e, f)}
          >
            {busy === f ? "Membuat…" : `Unduh ${LABEL[f]}`}
          </button>
        ))}
      </div>
      {disabled && disabledNote}
      {message && <p className="notice small">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
