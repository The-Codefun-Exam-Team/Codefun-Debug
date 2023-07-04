import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type LinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className">;

export const DecoratedLink = (props: LinkProps) => {
  return (
    <Link className="font-semibold text-blue-600 hover:font-bold hover:underline" {...props}>
      {props.children}
    </Link>
  );
};
