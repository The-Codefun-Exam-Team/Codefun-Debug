import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { CrossIcon } from "./icon";

export type SuccessBoxProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "classname" | "ref"
> & { closeFn: HTMLAttributes<HTMLButtonElement>["onClick"] };

export const SuccessBox = ({ closeFn, children, ...rest }: SuccessBoxProps) => {
  return (
    <div
      className="relative w-full rounded-md border-2 border-green-500/80 bg-green-200/50
      px-4 py-2 text-center text-xl text-green-600
      dark:border-green-300/50 dark:bg-green-600/70 dark:text-green-100
      "
      {...rest}
    >
      {children}
      <button className="absolute right-0 top-0" onClick={closeFn}>
        <CrossIcon className="m-1 h-6 w-6" />
      </button>
    </div>
  );
};
