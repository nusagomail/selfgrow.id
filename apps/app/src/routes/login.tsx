import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "../components/logo";
import { getSiteUrl, signInWithGoogle } from "../lib/api";
import { TURNSTILE_SITE_KEY, Turnstile } from "../lib/turnstile";
import { useMe } from "../lib/use-me";

export function LoginPage() {
  const me = useMe();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onToken = useCallback((t: string | null) => setToken(t), []);

  const [siteUrl, setSiteUrl] = useState<string | null>(null);
  const needsCaptcha = Boolean(TURNSTILE_SITE_KEY);
  // Dari tombol "Masuk" di etalase: langsung ke Google tanpa halaman perantara (D34).
  const auto =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("auto");

  useEffect(() => {
    getSiteUrl().then(setSiteUrl);
  }, []);

  useEffect(() => {
    if (me.status === "ready") navigate({ to: "/", replace: true });
    if (me.status === "anonymous" && auto && !needsCaptcha) {
      setBusy(true);
      signInWithGoogle(undefined, { replace: true }).catch(() => {
        setError("Gagal memulai login. Coba lagi.");
        setBusy(false);
      });
    }
  }, [me, navigate, auto, needsCaptcha]);

  async function onClick() {
    setBusy(true);
    setError(null);
    try {
      await signInWithGoogle(token ?? undefined);
    } catch {
      setError("Gagal memulai login. Coba lagi.");
      setBusy(false);
    }
  }

  return (
    <main className="page">
      {siteUrl && (
        <p>
          <a href={siteUrl}>← Kembali ke beranda</a>
        </p>
      )}
      <div className="brand-hero">
        <Logo height={56} />
      </div>
      <h1>Masuk ke SelfGrow</h1>
      <p className="muted">Cukup pakai akun Google. Tanpa password.</p>
      <div className="card stack">
        <Turnstile onToken={onToken} />
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={onClick}
          disabled={busy || (needsCaptcha && !token)}
        >
          {busy ? "Mengalihkan…" : "Masuk dengan Google"}
        </button>
        {error && <p className="error">{error}</p>}
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          Satu akun bisa aktif di maksimal 2 perangkat sekaligus.
        </p>
      </div>
    </main>
  );
}
