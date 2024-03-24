import type { DetailedHTMLProps, HTMLAttributes } from "react";

import type { RequireFields } from "@/types";

export type InputErrorTextProps = RequireFields<
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
    "className" | "ref"
  >,
  "id"
>;

export const InputErrorText = (props: InputErrorTextProps) => (
  <p className="text-red-500" {...props} />
);
