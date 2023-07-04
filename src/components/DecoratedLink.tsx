import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type LinkProps = ComponentPropsWithoutRef<typeof Link>;

export const DecoratedLink = (props: LinkProps) => {
  return (
    <Link
      className="text-blue-500 hover:font-semibold hover:text-blue-600 hover:underline"
      {...props}
    >
      {props.children}
    </Link>
  );
};
