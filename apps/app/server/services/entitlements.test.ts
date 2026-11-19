import { describe, expect, it } from "vitest";
import { computeSubscriptionStatus } from "./entitlements";

const DAY = 86_400_000;
const now = Date.UTC(2026, 10, 19);

describe("computeSubscriptionStatus", () => {
  it("tanpa entitlement = tidak aktif", () => {
    expect(computeSubscriptionStatus(null, now).active).toBe(false);
  });
  it("aktif sebelum jatuh tempo, tidak dalam masa tenggang", () => {
    const s = computeSubscriptionStatus(
      { planId: "m", status: "active", currentPeriodEnd: now + DAY },
      now,
    );
    expect(s).toMatchObject({ active: true, inGracePeriod: false });
  });
  it("aktif dalam masa tenggang", () => {
    const s = computeSubscriptionStatus(
      { planId: "m", status: "active", currentPeriodEnd: now - DAY },
      now,
    );
    expect(s).toMatchObject({ active: true, inGracePeriod: true });
  });
  it("tepat 3 hari setelah jatuh tempo akses tertutup", () => {
    const s = computeSubscriptionStatus(
      { planId: "m", status: "active", currentPeriodEnd: now - 3 * DAY },
      now,
    );
    expect(s.active).toBe(false);
  });
});
