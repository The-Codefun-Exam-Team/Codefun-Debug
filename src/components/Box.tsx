import type { DetailedHTMLProps, HTMLAttributes } from "react";

export type BoxProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "className" | "ref"
>;

export const Box = (props: BoxProps) => (
  <div
    className="flex w-[90vw] max-w-[500px] flex-col justify-center gap-6 border-2 border-solid border-slate-600 p-10"
    {...props}
  />
);
