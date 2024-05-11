import { cookies } from "next/headers";

import { getMemoUser } from "@/features/auth";

import { SIGNED_IN_LINKS, SIGNED_OUT_LINKS } from "./constants";
import { HorizontalNavLink, VerticalNavLink } from "./NavLink";

export interface NavLinksProps {
  keyPrefix: string;
}

export const HorizontalNavLinks = async ({ keyPrefix }: NavLinksProps) => {
  const token = cookies().get("token");
  const userInfo = await getMemoUser(token?.value);
  const links = userInfo.ok && userInfo.user ? SIGNED_IN_LINKS : SIGNED_OUT_LINKS;
  return (
    <>
      {links.map(({ url, title }) => (
        <HorizontalNavLink key={`${keyPrefix}-${title}`} href={url}>
          {title}
        </HorizontalNavLink>
      ))}
    </>
  );
};

export const VerticalNavLinks = async ({ keyPrefix }: NavLinksProps) => {
  const token = cookies().get("token");
  const userInfo = await getMemoUser(token?.value);
  const links = userInfo.ok && userInfo.user ? SIGNED_IN_LINKS : SIGNED_OUT_LINKS;
  return (
    <>
      {links.map(({ url, title }) => (
        <VerticalNavLink key={`${keyPrefix}-${title}`} href={url}>
          {title}
        </VerticalNavLink>
      ))}
    </>
  );
};
