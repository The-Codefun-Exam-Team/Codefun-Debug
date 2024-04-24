import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { CrossIcon } from "./icon";

export type SuccessBoxProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "classname" | "ref"
> & { closeFn: HTMLAttributes<HTMLButtonElement>["onClick"] };

export const SuccessBox = ({ closeFn, children, ...rest }: SuccessBoxProps) => {
  return (
    <div
      className="relative flex w-full gap-1 rounded-md border-2
      border-green-500/80 bg-green-200/50 p-2 pl-3 pr-1 text-center
      text-xl text-green-600 dark:border-green-300/50
      dark:bg-green-600/70 dark:text-green-100
      "
      {...rest}
    >
      <p className="w-full">{children}</p>
      <button className="self-start" onClick={closeFn}>
        <CrossIcon className="m-1 size-6" />
      </button>
    </div>
  );
};
