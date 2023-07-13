import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type DecoratedLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className">;

export const DecoratedLink = ({ children, ...rest }: DecoratedLinkProps) => (
  <Link className="font-semibold text-blue-600 hover:font-bold hover:underline" {...rest}>
    {children}
  </Link>
);
