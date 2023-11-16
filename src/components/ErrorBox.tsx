import type { DetailedHTMLProps, HTMLAttributes } from "react";

export type ErrorBoxProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "classname" | "ref" | "onClick"
> &
  Pick<HTMLAttributes<HTMLButtonElement>, "onClick">;

export const ErrorBox = ({ onClick, children, ...rest }: ErrorBoxProps) => {
  return (
    <div className="relative flex h-10 w-full flex-col items-center text-center" {...rest}>
      {children}
      <button className="absolute right-0 top-0" onClick={onClick}>
        x
      </button>
    </div>
  );
};
