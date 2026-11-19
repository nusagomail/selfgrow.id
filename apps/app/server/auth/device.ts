/** Label perangkat yang mudah dibaca dari User-Agent, untuk halaman "Perangkat aktif". */
export function deviceLabelFromUserAgent(ua: string | null | undefined): string {
  if (!ua) return "Perangkat tidak dikenal";

  const os = /Android/i.test(ua)
    ? "Android"
    : /iPhone|iPod/i.test(ua)
      ? "iPhone"
      : /iPad/i.test(ua)
        ? "iPad"
        : /Windows/i.test(ua)
          ? "Windows"
          : /Mac OS X|Macintosh/i.test(ua)
            ? "Mac"
            : /CrOS/i.test(ua)
              ? "Chromebook"
              : /Linux/i.test(ua)
                ? "Linux"
                : null;

  const browser = /Edg\//i.test(ua)
    ? "Edge"
    : /OPR\/|Opera/i.test(ua)
      ? "Opera"
      : /SamsungBrowser/i.test(ua)
        ? "Samsung Internet"
        : /Firefox\//i.test(ua)
          ? "Firefox"
          : /Chrome\//i.test(ua)
            ? "Chrome"
            : /Safari\//i.test(ua)
              ? "Safari"
              : null;

  if (os && browser) return `${browser} di ${os}`;
  return os ?? browser ?? "Perangkat tidak dikenal";
}
