import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type DecoratedLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className">;

export const DecoratedLink = ({ children, ...rest }: DecoratedLinkProps) => (
  <Link className="font-bold text-accent-light hover:underline dark:text-accent-dark" {...rest}>
    {children}
  </Link>
);
