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
