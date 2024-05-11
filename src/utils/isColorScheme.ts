import type { ColorScheme } from "@/types";
import { COLOR_SCHEMES } from "@/types";

export const isColorScheme = (scheme: string | null): scheme is ColorScheme =>
  !!scheme && (COLOR_SCHEMES as readonly string[]).includes(scheme);
