import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { CrossIcon } from "./icon";

export type ErrorBoxProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "classname" | "ref" | "onClick"
> &
  Pick<HTMLAttributes<HTMLButtonElement>, "onClick">;

export const ErrorBox = ({ onClick, children, ...rest }: ErrorBoxProps) => {
  return (
    <div
      className="relative w-full rounded-md border-[1px] border-red-500/50 bg-red-200/50
      px-4 py-2 text-left text-xl text-red-600
      dark:border-red-300/50 dark:bg-red-600/70 dark:text-red-100
      "
      {...rest}
    >
      {children}
      <button className="absolute right-0 top-0" onClick={onClick}>
        <CrossIcon className="m-1 h-6 w-6" />
      </button>
    </div>
  );
};
