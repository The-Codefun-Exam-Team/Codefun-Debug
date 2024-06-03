import type { HeadingProps } from "./types";

export const H3 = ({ ref, children, ...rest }: HeadingProps) => {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
      ref={ref}
      {...rest}
    >
      {children}
    </h3>
  );
};
