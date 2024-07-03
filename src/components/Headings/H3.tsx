import type { HeadingProps } from "./types";

export const H3 = ({ ref, children, ...rest }: HeadingProps) => {
  return (
    <h3
      className="text-lg font-bold leading-7 md:text-xl md:tracking-tight"
      ref={ref}
      {...rest}
    >
      {children}
    </h3>
  );
};
