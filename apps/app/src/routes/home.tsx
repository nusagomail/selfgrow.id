import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMe } from "../lib/use-me";

const dateFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "long" });

export function HomePage() {
  const me = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (me.status === "anonymous") navigate({ to: "/masuk" });
  }, [me, navigate]);

  if (me.status === "loading" || me.status === "anonymous") {
    return <main className="page muted">Memuat…</main>;
  }
  if (me.status === "error") {
    return <main className="page error">Terjadi kesalahan. Muat ulang halaman.</main>;
  }

  const { user, subscription } = me.me;
  return (
    <main className="page">
      <h1>Halo, {user.name.split(" ")[0]}</h1>
      <div className="card">
        <h2>Langganan</h2>
        {subscription.adminAccess ? (
          <p>Akses penuh sebagai admin (tampilan pelanggan).</p>
        ) : subscription.adminView === "visitor" ? (
          <p className="muted">
            Tampilan pengunjung tanpa langganan (admin). Ubah di halaman Akun.
          </p>
        ) : subscription.active ? (
          <p>
            Aktif
            {subscription.currentPeriodEnd &&
              ` sampai ${dateFmt.format(new Date(subscription.currentPeriodEnd))}`}
            {subscription.inGracePeriod && " (masa tenggang, segera perpanjang)"}
          </p>
        ) : (
          <p className="muted">Belum berlangganan.</p>
        )}
      </div>
      <div className="row-actions" style={{ marginTop: 16 }}>
        <Link to="/perpustakaan" className="btn btn-primary">
          Perpustakaan
        </Link>
        <Link to="/akun" className="btn">
          Akun & perangkat
        </Link>
        {user.role === "admin" && (
          <Link to="/studio" className="btn">
            Studio
          </Link>
        )}
      </div>
    </main>
  );
}
