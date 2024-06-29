import type { HTMLAttributes, Ref } from "react";

export interface HeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "className"> {
  ref?: Ref<HTMLHeadingElement>;
}
