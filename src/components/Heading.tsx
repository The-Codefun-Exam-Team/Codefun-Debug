import { clsx } from "@utils/shared";
import type { DetailedHTMLProps, ElementType, HTMLAttributes } from "react";
import { forwardRef } from "react";

export interface HeadingProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    "className"
  > {
  /**
   * Color variant of the heading.
   *
   * @defaultValue `"default"`
   */
  variant?: "default" | "error";
  /**
   * Size of the heading.
   *
   * @defaultValue `"title"`
   */
  type?: "subtitle" | "title" | "title-large" | "display";
  /**
   * Should the component be visible to screen readers only?
   *
   * @defaultValue `false`
   */
  screenReaderOnly?: boolean;
}

const mapTypeToComponent: Record<
  NonNullable<HeadingProps["type"]>,
  {
    element: ElementType;
    className?: string;
  }
> = {
  subtitle: {
    element: "h4",
    className: "text-sm font-bold leading-5 md:text-sm md:tracking-tight",
  },
  title: {
    element: "h3",
    className: "text-lg font-bold leading-7 md:text-xl md:tracking-tight",
  },
  "title-large": {
    element: "h2",
    className: "text-xl font-bold leading-7 md:text-2xl md:tracking-tight",
  },
  display: {
    element: "h1",
    className: "text-2xl font-bold leading-[60px] md:text-3xl md:tracking-tight",
  },
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ variant = "default", type = "title", screenReaderOnly = false, ...rest }, ref) => {
    const mappedComponent = mapTypeToComponent[type];
    const Component = mappedComponent.element;
    return (
      <Component
        ref={ref}
        className={clsx(
          "break-words",
          {
            "text-slate-700 dark:text-slate-300": variant === "default",
          },
          screenReaderOnly && "sr-only",
          mappedComponent.className,
        )}
        {...rest}
      />
    );
  },
);

Heading.displayName = "Heading";
