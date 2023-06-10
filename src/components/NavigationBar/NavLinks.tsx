"use client";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setUser } from "@redux/slice";
import { clsx } from "@utils/shared";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { SIGNED_IN_LINKS, SIGNED_OUT_LINKS } from "./constants";

export interface NavLinksProps {
  keyPrefix: string;
}

const navButtonClassName = "rounded-md px-4 py-2 transition-colors duration-100 hover:bg-gray-300";

const NavLink = ({ href, className, ...rest }: ComponentPropsWithoutRef<typeof Link>) => (
  <Link href={href} className={navButtonClassName} {...rest} />
);

const UserInfo = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const logout = async () => {
    fetch("/beta/api/auth/logout", {
      method: "POST",
    });
    dispatch(setUser(null));
  };
  if (loading) {
    return <div className={navButtonClassName}>Loading...</div>;
  }
  if (!user) {
    return <></>;
  }
  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://codefun.vn/profile/${user.username}`}
        className={navButtonClassName}
      >
        {user.username}
      </a>
      <button className={clsx(navButtonClassName, "text-left")} onClick={logout}>
        Logout
      </button>
    </>
  );
};

export const NavLinks = ({ keyPrefix }: NavLinksProps) => {
  const { user, loading } = useAppSelector((state) => state.user);
  const links = !loading ? (user ? SIGNED_IN_LINKS : SIGNED_OUT_LINKS) : [];
  return (
    <>
      {links.map(({ url, title }) => (
        <NavLink className={navButtonClassName} key={`${keyPrefix}-${title}`} href={url}>
          {title}
        </NavLink>
      ))}
      <UserInfo />
    </>
  );
};
