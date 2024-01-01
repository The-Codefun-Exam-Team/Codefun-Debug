import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { CrossIcon } from "./icon";

export type ErrorBoxProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "classname" | "ref"
> & { closeFn: HTMLAttributes<HTMLButtonElement>["onClick"] };

export const ErrorBox = ({ closeFn, children, ...rest }: ErrorBoxProps) => {
  return (
    <div
      className="relative flex w-full gap-1 rounded-md border-2
      border-red-500/80 bg-red-200/50 p-2 pl-3 pr-1 text-center
      text-xl text-red-600 dark:border-red-300/50
      dark:bg-red-600/70 dark:text-red-100
      "
      {...rest}
    >
      <p className="w-full">{children}</p>
      <button className="self-start" onClick={closeFn}>
        <CrossIcon className="m-1 h-6 w-6" />
      </button>
    </div>
  );
};
