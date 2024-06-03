import type { HTMLAttributes, Ref } from "react";

export interface HeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "classnames"> {
  ref?: Ref<HTMLHeadingElement>;
}
