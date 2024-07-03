import type { HeadingProps } from "./types";

export const H2 = ({ ref, children, ...rest }: HeadingProps) => {
  return (
    <h2
      className="text-xl font-bold leading-7 md:text-2xl md:tracking-tight"
      ref={ref}
      {...rest}
    >
      {children}
    </h2>
  );
};
