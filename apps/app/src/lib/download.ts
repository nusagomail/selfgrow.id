import { API_BASE_PATH } from "@selfgrow/shared";
import { ApiError } from "./api";

/** POST ke API lalu simpan respons sebagai file (nama dari Content-Disposition). */
export async function downloadFile(path: string, body: unknown) {
  const res = await fetch(`${API_BASE_PATH}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const b = (await res.json().catch(() => ({}))) as { error?: string };
    throw new ApiError(res.status, b.error ?? "error", b);
  }
  const cd = res.headers.get("content-disposition") ?? "";
  const star = /filename\*=UTF-8''([^;]+)/.exec(cd)?.[1];
  const plain = /filename="([^"]+)"/.exec(cd)?.[1];
  const name = star ? decodeURIComponent(star) : (plain ?? "unduhan");
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return {
    name,
    used: Number(res.headers.get("x-downloads-used") ?? 0) || undefined,
    limit: Number(res.headers.get("x-downloads-limit") ?? 0) || undefined,
  };
}
