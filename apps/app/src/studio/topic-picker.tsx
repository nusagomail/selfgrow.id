import { useEffect, useState } from "react";
import { api } from "../lib/api";

type Tree = { id: string; name: string; topics: { id: string; name: string }[] }[];

/** Pilih topik konten (kategori ikut otomatis). Disimpan langsung saat diganti. */
export function TopicPicker({ contentId }: { contentId: string }) {
  const [tree, setTree] = useState<Tree | null>(null);
  const [value, setValue] = useState<string>("");
  const [free, setFree] = useState(false);
  const [cover, setCover] = useState<string | null>(null);
  const [coverMsg, setCoverMsg] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const id = encodeURIComponent(contentId);

  useEffect(() => {
    Promise.all([
      api<{ categories: Tree }>("/studio/categories"),
      api<{ categoryId: string | null; tier: "all" | "free"; coverUrl: string | null }>(
        `/studio/content/${id}/category`,
      ),
    ])
      .then(([t, c]) => {
        setTree(t.categories);
        setValue(c.categoryId ?? "");
        setFree(c.tier === "free");
        setCover(c.coverUrl);
      })
      .catch(() => setState("error"));
  }, [id]);

  const save = async (patch: Record<string, unknown>) => {
    setState("saving");
    try {
      await api(`/studio/content/${id}`, { method: "PATCH", body: JSON.stringify(patch) });
      setState("saved");
    } catch {
      setState("error");
    }
  };

  const toggleFree = (next: boolean) => {
    setFree(next);
    void save({ tier: next ? "free" : "all" });
  };

  const uploadCover = async (file: File | undefined) => {
    if (!file) return;
    setCoverMsg("Mengunggah…");
    try {
      const r = await api<{ coverUrl: string }>(`/studio/content/${id}/cover`, {
        method: "PUT",
        headers: { "content-type": file.type || "application/octet-stream" },
        body: file,
      });
      setCover(r.coverUrl);
      setCoverMsg("Sampul tersimpan.");
    } catch (e) {
      const code = (e as { code?: string }).code;
      setCoverMsg(
        code === "file_too_large"
          ? "File terlalu besar (maks 1,5 MB)."
          : code === "unsupported_image"
            ? "Format harus JPG, PNG, atau WebP."
            : "Gagal mengunggah. Coba lagi.",
      );
    }
  };

  const removeCover = async () => {
    await api(`/studio/content/${id}/cover`, { method: "DELETE" });
    setCover(null);
    setCoverMsg("Sampul dihapus.");
  };

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
    <div className="stack">
      <div className="cover-picker">
        {cover ? (
          <img src={cover} alt="Sampul" className="cover-preview" />
        ) : (
          <div className="cover-preview empty">Belum ada sampul</div>
        )}
        <div className="stack" style={{ minWidth: 0 }}>
          <span className="strong">Sampul</span>
          <span className="muted small">
            JPG, PNG, atau WebP, maks 1,5 MB. Rasio buku 2:3 disarankan.
          </span>
          <div className="row-actions">
            <label className="btn">
              {cover ? "Ganti sampul" : "Unggah sampul"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                onChange={(e) => uploadCover(e.target.files?.[0])}
              />
            </label>
            {cover && (
              <button type="button" className="btn btn-danger" onClick={removeCover}>
                Hapus
              </button>
            )}
          </div>
          {coverMsg && <span className="small muted">{coverMsg}</span>}
        </div>
      </div>
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
      <label className="check">
        <input
          type="checkbox"
          checked={free}
          disabled={!tree}
          onChange={(e) => toggleFree(e.target.checked)}
        />
        Gratis untuk semua (tanpa langganan, cukup login)
      </label>
    </div>
  );
}
