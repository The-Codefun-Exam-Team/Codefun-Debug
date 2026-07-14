export const COLOR_SCHEMES = ["dark", "light"] as const;

export type ColorScheme = (typeof COLOR_SCHEMES)[number];
