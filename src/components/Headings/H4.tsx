import type { HeadingProps } from "./types";

export const H4 = ({ ref, children, ...rest }: HeadingProps) => {
  return (
    <h4
      className="scroll-m-20 text-xl font-semibold tracking-tight"
      ref={ref}
      {...rest}
    >
      {children}
    </h4>
  );
};
