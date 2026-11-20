import type { AdminView, DeviceSession, MeResponse, SubscriptionStatus } from "@selfgrow/shared";
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
        if (e instanceof ApiError && e.status === 401) navigate({ to: "/masuk", replace: true });
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
    navigate({ to: "/masuk", replace: true });
  }

  return (
    <main className="page">
      <h1>Profil</h1>
      <ProfileOverview />
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

type Overview = {
  user: { name: string; email: string; image: string | null; role: string };
  subscription: SubscriptionStatus;
  reading: {
    slug: string;
    title: string;
    chapterId: string;
    chapterNumber: number;
    totalChapters: number;
    percent: number;
    updatedAt: string;
  }[];
  trackers: {
    slug: string;
    title: string;
    current: number;
    longest: number;
    lastEntryDate: string | null;
  }[];
  tools: { slug: string; title: string; runsThisMonth: number }[];
  programs: {
    slug: string;
    title: string;
    durationDays: number;
    currentDay: number;
    completedDays: number;
    finished: boolean;
  }[];
  downloads: { slug: string; title: string; fileName: string; format: string; createdAt: string }[];
};

const dateFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "long" });

/** Ringkasan milik pelanggan: langganan, bacaan, tracker, tools, program, unduhan. */
function ProfileOverview() {
  const [data, setData] = useState<Overview | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    api<Overview>("/profile")
      .then(setData)
      .catch(() => setFailed(true));
  }, []);
  if (failed) return <p className="error">Gagal memuat profil.</p>;
  if (!data) return <p className="muted">Memuat…</p>;
  const sub = data.subscription;

  return (
    <>
      <div className="card profile-head">
        {data.user.image && (
          <img src={data.user.image} alt="" width={56} height={56} referrerPolicy="no-referrer" />
        )}
        <div>
          <div className="strong">{data.user.name}</div>
          <div className="muted small">{data.user.email}</div>
        </div>
      </div>

      <div className="card stack">
        <h2>Langganan</h2>
        {sub.adminAccess ? (
          <p>Akses penuh sebagai admin.</p>
        ) : sub.adminView === "visitor" ? (
          <p className="muted">Sedang melihat sebagai pengunjung tanpa langganan.</p>
        ) : sub.active ? (
          <p>
            Aktif
            {sub.currentPeriodEnd && ` sampai ${dateFmt.format(new Date(sub.currentPeriodEnd))}`}
            {sub.inGracePeriod && " (masa tenggang, segera perpanjang)"}
          </p>
        ) : (
          <p className="muted">Belum berlangganan. Bab gratis tetap bisa dibaca dari Beranda.</p>
        )}
        <p className="muted small" style={{ margin: 0 }}>
          Riwayat pembayaran akan tampil di sini setelah pembayaran dibuka.
        </p>
      </div>

      <div className="card stack">
        <h2>Sedang dibaca</h2>
        {data.reading.length === 0 ? (
          <p className="muted">Belum ada ebook yang dibaca.</p>
        ) : (
          data.reading.map((r) => (
            <Link
              key={r.slug}
              to="/baca/$slug/$chapterId"
              params={{ slug: r.slug, chapterId: r.chapterId }}
              className="profile-row"
            >
              <span>
                <span className="strong">{r.title}</span>
                <span className="muted small">
                  {" "}
                  · Bab {r.chapterNumber}/{r.totalChapters}
                </span>
              </span>
              <span className="progress" aria-hidden="true">
                <span style={{ width: `${r.percent}%` }} />
              </span>
              <span className="small strong">{r.percent}%</span>
            </Link>
          ))
        )}
      </div>

      <div className="card stack">
        <h2>Tracker &amp; tools</h2>
        {data.trackers.length === 0 && data.tools.length === 0 ? (
          <p className="muted">Belum ada tool yang dipakai.</p>
        ) : (
          <>
            {data.trackers.map((t) => (
              <Link
                key={`t-${t.slug}`}
                to="/tools/$slug"
                params={{ slug: t.slug }}
                className="profile-row"
              >
                <span className="strong">{t.title}</span>
                <span className="small">
                  🔥 {t.current} hari · rekor {t.longest}
                </span>
              </Link>
            ))}
            {data.tools
              .filter((x) => !data.trackers.some((t) => t.slug === x.slug))
              .map((x) => (
                <Link
                  key={`u-${x.slug}`}
                  to="/tools/$slug"
                  params={{ slug: x.slug }}
                  className="profile-row"
                >
                  <span className="strong">{x.title}</span>
                  <span className="muted small">{x.runsThisMonth}× bulan ini</span>
                </Link>
              ))}
          </>
        )}
      </div>

      <div className="card stack">
        <h2>Program</h2>
        {data.programs.length === 0 ? (
          <p className="muted">Belum mengikuti program.</p>
        ) : (
          data.programs.map((p) => (
            <Link
              key={p.slug}
              to="/program/$slug"
              params={{ slug: p.slug }}
              className="profile-row"
            >
              <span className="strong">{p.title}</span>
              <span className="muted small">
                {p.finished
                  ? "Selesai"
                  : `Hari ke-${p.currentDay} · ${p.completedDays}/${p.durationDays} hari selesai`}
              </span>
            </Link>
          ))
        )}
      </div>

      <div className="card stack">
        <h2>Template diunduh</h2>
        {data.downloads.length === 0 ? (
          <p className="muted">Belum ada template yang diunduh.</p>
        ) : (
          data.downloads.map((d) => (
            <Link
              key={`${d.slug}-${d.createdAt}`}
              to="/template/$slug"
              params={{ slug: d.slug }}
              className="profile-row"
            >
              <span>
                <span className="strong">{d.fileName}</span>
                <span className="muted small"> · {d.title}</span>
              </span>
              <span className="muted small">{timeFmt.format(new Date(d.createdAt))}</span>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
