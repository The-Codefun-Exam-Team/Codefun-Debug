import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type DecoratedLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className">;

export const DecoratedLink = ({ children, ...rest }: DecoratedLinkProps) => (
  <Link className="font-bold text-blue-800 hover:underline dark:text-sky-300" {...rest}>
    {children}
  </Link>
);
