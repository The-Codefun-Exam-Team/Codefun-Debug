import type { HeadingProps } from "./types";

export const H1 = ({ ref, children, ...rest }: HeadingProps) => {
  return (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      ref={ref}
      {...rest}
    >
      {children}
    </h1>
  );
};
