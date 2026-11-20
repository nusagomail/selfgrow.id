import type { AdminView, DeviceSession, MeResponse } from "@selfgrow/shared";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ApiError, api, signOut } from "../lib/api";

const timeFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" });

export function AccountPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<DeviceSession[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    api<{ sessions: DeviceSession[] }>("/me/sessions")
      .then((r) => setSessions(r.sessions))
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) navigate({ to: "/masuk" });
        else setError("Gagal memuat perangkat.");
      });
  }, [navigate]);

  useEffect(load, [load]);

  async function revoke(id: string) {
    await api(`/me/sessions/${id}`, { method: "DELETE" });
    load();
  }

  async function logout() {
    await signOut().catch(() => {});
    navigate({ to: "/masuk" });
  }

  return (
    <main className="page">
      <p>
        <Link to="/">← Beranda</Link>
      </p>
      <h1>Akun</h1>
      <AdminViewCard />
      <div className="card">
        <h2>Perangkat aktif</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          Maksimal 2 perangkat. Login di perangkat ketiga otomatis mengeluarkan yang paling lama.
        </p>
        {error && <p className="error">{error}</p>}
        {!sessions && !error && <p className="muted">Memuat…</p>}
        {sessions?.map((s) => (
          <div key={s.id} className="row">
            <div>
              <div>
                {s.deviceLabel ?? "Perangkat"}{" "}
                {s.current && <span className="badge">Perangkat ini</span>}
              </div>
              <div className="muted" style={{ fontSize: "0.85rem" }}>
                Terakhir aktif {timeFmt.format(new Date(s.lastSeenAt))}
              </div>
            </div>
            {!s.current && (
              <button type="button" className="btn btn-danger" onClick={() => revoke(s.id)}>
                Keluarkan
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="card">
        <button type="button" className="btn btn-block" onClick={logout}>
          Keluar
        </button>
      </div>
    </main>
  );
}

/** Admin: lihat aplikasi sebagai pelanggan (akses penuh) atau pengunjung tanpa langganan. */
function AdminViewCard() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    api<MeResponse>("/me")
      .then(setMe)
      .catch(() => {});
  }, []);
  if (me?.user.role !== "admin") return null;
  const view: AdminView = me.subscription.adminView ?? "subscriber";

  async function choose(next: AdminView) {
    setSaving(true);
    try {
      await api("/me/admin-view", { method: "PUT", body: JSON.stringify({ view: next }) });
      setMe((m) => (m ? { ...m, subscription: { ...m.subscription, adminView: next } } : m));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card stack">
      <h2>Tampilan admin</h2>
      <p className="muted" style={{ margin: 0 }}>
        Sebagai admin kamu punya akses penuh tanpa berlangganan. Pilih sudut pandang untuk meninjau
        aplikasi.
      </p>
      <div className="row-actions" role="radiogroup" aria-label="Tampilan admin">
        <label className="check">
          <input
            type="radio"
            name="admin-view"
            checked={view === "subscriber"}
            disabled={saving}
            onChange={() => choose("subscriber")}
          />
          Pelanggan (semua konten terbuka)
        </label>
        <label className="check">
          <input
            type="radio"
            name="admin-view"
            checked={view === "visitor"}
            disabled={saving}
            onChange={() => choose("visitor")}
          />
          Pengunjung tanpa langganan
        </label>
      </div>
    </div>
  );
}
