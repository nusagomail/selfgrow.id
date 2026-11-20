/** Logo SelfGrow; versi terang/gelap mengikuti mode tampilan perangkat. */
export function Logo({ height = 36 }: { height?: number }) {
  const width = Math.round(height * (1413 / 408));
  return (
    <picture>
      <source
        media="(prefers-color-scheme: dark)"
        srcSet="/brand/logo-dark-240.webp 240w, /brand/logo-dark-480.webp 480w"
        sizes={`${width}px`}
      />
      <img
        src="/brand/logo-240.webp"
        srcSet="/brand/logo-240.webp 240w, /brand/logo-480.webp 480w"
        sizes={`${width}px`}
        width={width}
        height={height}
        alt="SelfGrow — Bertumbuh Menjadi Lebih Baik"
        decoding="async"
        style={{ display: "block", height, width: "auto" }}
      />
    </picture>
  );
}
