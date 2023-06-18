import type { RequireFields } from "@utils/types";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

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
