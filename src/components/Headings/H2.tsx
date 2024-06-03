import type { HeadingProps } from "./types";

export const H2 = ({ ref, children, ...rest }: HeadingProps) => {
  return (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
      ref={ref}
      {...rest}
    >
      {children}
    </h2>
  );
};
