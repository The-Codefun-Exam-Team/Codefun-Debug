import type { HeadingProps } from "./types";

export const H1 = ({ ref, children, ...rest }: HeadingProps) => {
  return (
    <h1
      className="text-2xl font-bold leading-[60px] md:text-3xl md:tracking-tight"
      ref={ref}
      {...rest}
    >
      {children}
    </h1>
  );
};
