import type { HeadingProps } from "./types";

export const H4 = ({ ref, children, ...rest }: HeadingProps) => {
  return (
    <h4
      className="text-sm font-bold leading-5 md:text-sm md:tracking-tight"
      ref={ref}
      {...rest}
    >
      {children}
    </h4>
  );
};
