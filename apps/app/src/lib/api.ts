import { API_BASE_PATH } from "@selfgrow/shared";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    /** Isi respons error (mis. daftar `issues` validasi). */
    public body?: unknown,
  ) {
    super(code);
  }
}

/** Panggil API sendiri (same-origin, cookie sesi ikut otomatis). */
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  const res = await fetch(`${API_BASE_PATH}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
    throw new ApiError(res.status, body.error ?? body.code ?? "error", body);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/**
 * Mulai login Google. `replace` dipakai saat login dimulai otomatis (dari tombol Masuk di
 * etalase), supaya halaman perantara tidak tersisa di riwayat dan tombol Kembali tidak terjebak.
 */
export async function signInWithGoogle(captchaToken?: string, opts: { replace?: boolean } = {}) {
  const res = await api<{ url: string }>("/auth/sign-in/social", {
    method: "POST",
    headers: captchaToken ? { "x-captcha-response": captchaToken } : {},
    body: JSON.stringify({ provider: "google", callbackURL: "/", errorCallbackURL: "/masuk" }),
  });
  if (opts.replace) window.location.replace(res.url);
  else window.location.assign(res.url);
}

let siteUrlPromise: Promise<string | null> | null = null;

/** Alamat etalase publik (website), atau null bila tidak dikonfigurasi (mis. lokal). */
export function getSiteUrl(): Promise<string | null> {
  siteUrlPromise ??= api<{ siteUrl: string | null }>("/health/config")
    .then((r) => r.siteUrl)
    .catch(() => null);
  return siteUrlPromise;
}

/** Pengunjung yang belum login: ke etalase bila ada, selain itu ke halaman masuk. */
export async function goToStorefront(fallback: () => void) {
  const site = await getSiteUrl();
  // Cegah putaran tanpa akhir bila SITE_URL keliru diisi alamat aplikasi ini sendiri.
  let external = false;
  try {
    external = Boolean(site) && new URL(site as string).origin !== window.location.origin;
  } catch {
    external = false;
  }
  if (external) window.location.replace(site as string);
  else fallback();
}

export function signOut() {
  return api("/auth/sign-out", { method: "POST", body: "{}" });
}
