import { TOOL_INPUT_TYPES, type ToolInput } from "@selfgrow/shared";

type Issue = { path: string; message: string };

const TYPE_LABEL: Record<(typeof TOOL_INPUT_TYPES)[number], string> = {
  number: "Angka",
  text: "Teks",
  select: "Pilihan",
  boolean: "Ya/Tidak",
};

const optionsToText = (opts?: { value: string; label: string }[]) =>
  (opts ?? []).map((o) => (o.value === o.label ? o.value : `${o.value} | ${o.label}`)).join("\n");
const textToOptions = (t: string) =>
  t
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [v, ...rest] = l.split("|");
      const value = (v ?? "").trim();
      return { value, label: rest.join("|").trim() || value };
    });
const numOrUndef = (v: string) => (v.trim() === "" ? undefined : Number(v));

/** Editor daftar isian (form) — dipakai Tool Builder dan Template Builder. */
export function InputsEditor({
  inputs,
  onChange,
  issues,
  pathPrefix,
  defaultType = "number",
}: {
  inputs: ToolInput[];
  onChange: (inputs: ToolInput[]) => void;
  issues: Issue[];
  /** Awalan path error dari server, mis. "inputs" atau "variables". */
  pathPrefix: string;
  defaultType?: ToolInput["type"];
}) {
  const set = (fn: (c: ToolInput[]) => ToolInput[]) => onChange(fn(structuredClone(inputs)));
  return (
    <>
      {inputs.map((inp, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: daftar terkontrol tanpa id stabil
        <div key={`in-${idx}`} className="builder-item stack">
          <div className="builder-row">
            <label className="field">
              <span>Kunci</span>
              <input
                value={inp.key}
                onChange={(e) =>
                  set((c) => {
                    (c[idx] as typeof inp).key = e.target.value.toLowerCase();
                    return c;
                  })
                }
              />
            </label>
            <label className="field grow">
              <span>Label</span>
              <input
                value={inp.label}
                onChange={(e) =>
                  set((c) => {
                    (c[idx] as typeof inp).label = e.target.value;
                    return c;
                  })
                }
              />
            </label>
            <label className="field">
              <span>Jenis</span>
              <select
                value={inp.type}
                onChange={(e) =>
                  set((c) => {
                    (c[idx] as typeof inp).type = e.target.value as typeof inp.type;
                    return c;
                  })
                }
              >
                {TOOL_INPUT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABEL[t]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <IssueText issues={issues} path={`${pathPrefix}.${idx}.key`} />
          {inp.type === "number" && (
            <div className="builder-row">
              {(["min", "max"] as const).map((k) => (
                <label key={k} className="field">
                  <span>{k === "min" ? "Minimal" : "Maksimal"}</span>
                  <input
                    inputMode="decimal"
                    value={inp[k] ?? ""}
                    onChange={(e) =>
                      set((c) => {
                        (c[idx] as typeof inp)[k] = numOrUndef(e.target.value);
                        return c;
                      })
                    }
                  />
                </label>
              ))}
              <label className="field">
                <span>Satuan</span>
                <input
                  value={inp.unit ?? ""}
                  placeholder="Rp"
                  onChange={(e) =>
                    set((c) => {
                      (c[idx] as typeof inp).unit = e.target.value || undefined;
                      return c;
                    })
                  }
                />
              </label>
            </div>
          )}
          {inp.type === "select" && (
            <label className="field">
              <span>Pilihan (satu per baris, format: nilai | label)</span>
              <textarea
                rows={3}
                value={optionsToText(inp.options)}
                onChange={(e) =>
                  set((c) => {
                    (c[idx] as typeof inp).options = textToOptions(e.target.value);
                    return c;
                  })
                }
              />
              <IssueText issues={issues} path={`${pathPrefix}.${idx}.options`} />
            </label>
          )}
          <div className="row-actions">
            <label className="check">
              <input
                type="checkbox"
                checked={inp.required}
                onChange={(e) =>
                  set((c) => {
                    (c[idx] as typeof inp).required = e.target.checked;
                    return c;
                  })
                }
              />
              Wajib diisi
            </label>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onChange(inputs.filter((_, i) => i !== idx))}
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
          onChange([
            ...inputs,
            {
              key: `isian_${inputs.length + 1}`,
              label: "Isian baru",
              type: defaultType,
              required: true,
            },
          ])
        }
      >
        + Isian
      </button>
    </>
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
