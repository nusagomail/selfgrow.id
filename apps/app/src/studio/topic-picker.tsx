import { useEffect, useState } from "react";
import { api } from "../lib/api";

type Tree = { id: string; name: string; topics: { id: string; name: string }[] }[];

/** Pilih topik konten (kategori ikut otomatis). Disimpan langsung saat diganti. */
export function TopicPicker({ contentId }: { contentId: string }) {
  const [tree, setTree] = useState<Tree | null>(null);
  const [value, setValue] = useState<string>("");
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const id = encodeURIComponent(contentId);

  useEffect(() => {
    Promise.all([
      api<{ categories: Tree }>("/studio/categories"),
      api<{ categoryId: string | null }>(`/studio/content/${id}/category`),
    ])
      .then(([t, c]) => {
        setTree(t.categories);
        setValue(c.categoryId ?? "");
      })
      .catch(() => setState("error"));
  }, [id]);

  const change = async (next: string) => {
    setValue(next);
    setState("saving");
    try {
      await api(`/studio/content/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ categoryId: next || null }),
      });
      setState("saved");
    } catch {
      setState("error");
    }
  };

  return (
    <label className="field">
      <span>
        Kategori &amp; topik{" "}
        <span className="muted">
          {state === "saving"
            ? "· menyimpan…"
            : state === "saved"
              ? "· tersimpan"
              : state === "error"
                ? "· gagal, coba lagi"
                : ""}
        </span>
      </span>
      <select
        value={value}
        onChange={(e) => change(e.target.value)}
        disabled={!tree}
        aria-label="Kategori dan topik"
      >
        <option value="">— Belum dipilih —</option>
        {tree?.map((cat) => (
          <optgroup key={cat.id} label={cat.name}>
            {cat.topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}
