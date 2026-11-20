import { Link } from "@tanstack/react-router";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { ApiError, api } from "../lib/api";

type Frozen = {
  userId: string;
  name: string | null;
  email: string | null;
  until: string;
  chaptersPerHour: number;
};

type Match = {
  code: string;
  count: number;
  user: { id: string; name: string; email: string } | null;
};

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));

/** Studio → Keamanan: akun yang dibekukan karena scraping & pelacak teks bocor. */
export function StudioSecurity() {
  const [frozen, setFrozen] = useState<Frozen[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api<{ frozen: Frozen[] }>("/admin/frozen")
      .then((r) => setFrozen(r.frozen))
      .catch((e) => setError(e instanceof ApiError ? e.code : "Gagal memuat"));
  }, []);
  useEffect(load, [load]);

  const unfreeze = async (userId: string) => {
    await api(`/admin/users/${encodeURIComponent(userId)}/freeze`, { method: "DELETE" });
    load();
  };

  const trace = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await api<{ matches: Match[] }>("/admin/watermark/trace", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      setMatches(r.matches);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="page page-wide">
      <p>
        <Link to="/studio">← Studio</Link>
      </p>
      <h1>Keamanan konten</h1>
      {error && <p className="error">{error}</p>}

      <section className="card stack">
        <h2>Akun dibekukan sementara</h2>
        <p className="muted">
          Akun otomatis dijeda 12 jam bila membuka terlalu banyak bab berbeda dalam satu jam (tanda
          penyedotan konten).
        </p>
        {frozen === null ? (
          <p className="muted">Memuat…</p>
        ) : frozen.length === 0 ? (
          <p>Tidak ada akun yang dibekukan.</p>
        ) : (
          <ul className="stack" style={{ listStyle: "none", padding: 0 }}>
            {frozen.map((f) => (
              <li key={f.userId} className="row">
                <span>
                  <strong>{f.name ?? f.userId}</strong> {f.email && `(${f.email})`}
                  <br />
                  <span className="muted">
                    {f.chaptersPerHour} bab/jam · terbuka lagi {fmt(f.until)}
                  </span>
                </span>
                <button type="button" className="btn" onClick={() => unfreeze(f.userId)}>
                  Buka sekarang
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form className="card stack" onSubmit={trace}>
        <h2>Lacak teks yang bocor</h2>
        <p className="muted">
          Tempel teks ebook yang kamu temukan di luar (mis. dari grup atau situs lain). Setiap
          pelanggan menerima teks dengan tanda tak terlihat yang unik, sehingga asal bocoran bisa
          dikenali. Tanda ini hilang bila teks diketik ulang atau difoto.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          maxLength={200_000}
          aria-label="Teks yang dicurigai bocor"
        />
        <button type="submit" className="btn btn-primary" disabled={busy || !text.trim()}>
          {busy ? "Melacak…" : "Lacak"}
        </button>
        {matches &&
          (matches.length === 0 ? (
            <p>Tidak ditemukan tanda watermark di teks ini.</p>
          ) : (
            <ul>
              {matches.map((m) => (
                <li key={m.code}>
                  Kode <code>{m.code}</code> ({m.count}×):{" "}
                  {m.user ? (
                    <strong>
                      {m.user.name} ({m.user.email})
                    </strong>
                  ) : (
                    "tidak cocok dengan akun mana pun"
                  )}
                </li>
              ))}
            </ul>
          ))}
      </form>
    </main>
  );
}
