import { z } from "zod";
import { CONTENT_TYPES } from "./constants";

export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  version: z.string(),
  environment: z.string(),
});
export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya huruf kecil, angka, dan tanda hubung");

export const contentTypeSchema = z.enum(CONTENT_TYPES);

export const subscriptionStatusSchema = z.object({
  active: z.boolean(),
  planId: z.string().nullable(),
  currentPeriodEnd: z.string().nullable(),
  inGracePeriod: z.boolean(),
});
export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;

export const meResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string().nullable(),
    role: z.enum(["member", "admin"]),
  }),
  subscription: subscriptionStatusSchema,
});
export type MeResponse = z.infer<typeof meResponseSchema>;

export const deviceSessionSchema = z.object({
  id: z.string(),
  deviceLabel: z.string().nullable(),
  lastSeenAt: z.string(),
  createdAt: z.string(),
  current: z.boolean(),
});
export type DeviceSession = z.infer<typeof deviceSessionSchema>;

export const setRoleBodySchema = z.object({ role: z.enum(["member", "admin"]) });
