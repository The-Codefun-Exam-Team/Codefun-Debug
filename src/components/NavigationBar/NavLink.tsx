import { clsx } from "@utils/shared";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { useMemo } from "react";

// default classnames for nav links
export const NAV_BUTTON_CLASS =
  "px-3 py-2 transition-colors duration-100 items-center font-semibold flex cursor-pointer";

type BaseNavLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: `/${string}`;
};

export const BaseNavLink = ({ href, className, ...rest }: BaseNavLinkProps) => (
  <Link href={href} className={clsx(NAV_BUTTON_CLASS, className)} {...rest} />
);

type NavLinkProps = BaseNavLinkProps;

const useIsPathActive = (url: string) => {
  const pathname = usePathname();
  const result = useMemo(() => {
    const pathnameFirstSegment = pathname.slice(0, pathname.indexOf("/", 1));
    return !!pathnameFirstSegment && url.startsWith(pathnameFirstSegment);
  }, [pathname, url]);
  return result;
};

export const VerticalNavLink = ({ href, ...rest }: NavLinkProps) => {
  const active = useIsPathActive(href);
  return (
    <div className="group relative overflow-visible">
      <BaseNavLink href={href} className="peer px-4 py-2" {...rest} />
      <div>
        <div
          className={clsx(
            "absolute h-0 rounded-md border-t-[3px] transition-all duration-500 ease-in-out group-hover:w-full",
            active
              ? "w-full border-accent-light dark:border-accent-dark"
              : "w-0 border-accent-light/40 dark:border-accent-dark/40",
          )}
        />
        <div
          className={clsx("h-0 rounded-md border-t-[3px] border-gray-200 dark:border-slate-600/50")}
        />
      </div>
    </div>
  );
};

export const HorizontalNavLink = ({ href, ...rest }: NavLinkProps) => {
  const active = useIsPathActive(href);
  return (
    <div className="group mx-2 overflow-visible">
      <BaseNavLink href={href} className="peer px-2 py-1" {...rest} />
      <div className="flex justify-around">
        <div
          className={clsx(
            "h-0 rounded-md border-t-2 transition-all duration-200 ease-in-out group-hover:w-full",
            active
              ? "w-full border-accent-light dark:border-accent-dark"
              : "w-0 border-accent-light/40 dark:border-accent-dark/40",
          )}
        />
      </div>
    </div>
  );
};
