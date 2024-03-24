import type { ComponentPropsWithoutRef } from "react";

import type { RequireFields } from "@/types";

export type LabelProps = RequireFields<Omit<ComponentPropsWithoutRef<"label">, "ref">, "htmlFor">;

export const InputLabel = (props: LabelProps) => (
  <label className="block p-1 text-sm font-semibold text-gray-700 dark:text-slate-300" {...props} />
);
