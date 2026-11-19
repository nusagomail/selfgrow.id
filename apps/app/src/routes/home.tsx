import { API_BASE_PATH, type HealthResponse } from "@selfgrow/shared";
import { useEffect, useState } from "react";

export function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_PATH}/health`)
      .then((res) => res.json() as Promise<HealthResponse>)
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>selfgrow</h1>
      <p>Area pelanggan sedang dibangun.</p>
      <p>Status API: {health ? `${health.status} (${health.environment})` : "memeriksa…"}</p>
    </main>
  );
}
