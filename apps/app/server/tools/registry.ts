import type { PublicToolDefinition, ToolRunResult } from "@selfgrow/shared";

/**
 * Registry tool custom (BLUEPRINT bagian 5, Tingkat 2): tool yang butuh kode khusus ditulis
 * sebagai modul di sini, didaftarkan dengan `module_slug`, dan dijalankan lewat endpoint yang sama
 * dengan tool no-code. Logika tetap di server.
 */
export interface CustomTool {
  definition: PublicToolDefinition;
  /** Lempar error (mis. ZodError) untuk input tidak valid. */
  run: (input: Record<string, unknown>) => ToolRunResult | Promise<ToolRunResult>;
}

export const customTools: Record<string, CustomTool> = {};

export function getCustomTool(slug: string | null | undefined): CustomTool | undefined {
  return slug && Object.hasOwn(customTools, slug) ? customTools[slug] : undefined;
}
