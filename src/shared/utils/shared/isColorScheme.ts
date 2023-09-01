import { COLOR_SCHEMES } from "@/shared/constants";
import type { ColorScheme } from "@/shared/types";

export const isColorScheme = (scheme: string | null): scheme is ColorScheme =>
  !!scheme && (COLOR_SCHEMES as readonly string[]).includes(scheme);
