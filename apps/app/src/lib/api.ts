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

export async function signInWithGoogle(captchaToken?: string) {
  const res = await api<{ url: string }>("/auth/sign-in/social", {
    method: "POST",
    headers: captchaToken ? { "x-captcha-response": captchaToken } : {},
    body: JSON.stringify({ provider: "google", callbackURL: "/", errorCallbackURL: "/masuk" }),
  });
  window.location.assign(res.url);
}

export function signOut() {
  return api("/auth/sign-out", { method: "POST", body: "{}" });
}
