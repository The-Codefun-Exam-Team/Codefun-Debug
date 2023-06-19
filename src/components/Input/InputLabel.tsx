import type { RequireFields } from "@utils/types";
import type { ComponentPropsWithoutRef } from "react";

export type LabelProps = RequireFields<Omit<ComponentPropsWithoutRef<"label">, "ref">, "htmlFor">;

export const InputLabel = (props: LabelProps) => (
  <label className="block text-sm font-medium text-gray-900" {...props} />
);
