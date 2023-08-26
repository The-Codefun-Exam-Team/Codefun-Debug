"use client";
import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setUser } from "@redux/slice";
import { clsx, getCodefunRole, getCodefunRoleTextClass } from "@utils/shared";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useState } from "react";

import { ADDITIONAL_LINKS, SIGNED_IN_LINKS, SIGNED_OUT_LINKS } from "./constants";

export interface NavLinksProps {
  keyPrefix: string;
}

// default classnames for nav links
const navButtonClassName =
  "px-3 py-2 transition-colors duration-100 items-center font-semibold flex";

const NavLink = ({ href, className, ...rest }: ComponentPropsWithoutRef<typeof Link>) => (
  <Link href={href} className={clsx(navButtonClassName, className)} {...rest} />
);

export const UserInfo = () => {
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const removeErrorTimer = setTimeout(() => setErrorMessage(""), 5000);
    return () => clearTimeout(removeErrorTimer);
  }, [errorMessage]);

  const logout = async () => {
    const res = await fetch("/beta/api/auth/logout", {
      method: "POST",
    });
    if (res.ok) {
      dispatch(
        setUser({
          user: null,
          refresh: router.refresh,
        }),
      );
    } else {
      setErrorMessage((await res.json()).error ?? "unknown error logging out");
    }
  };

  if (loading) {
    return <div className={navButtonClassName}>Loading...</div>;
  }
  if (!user) {
    return (
      <NavLink className={navButtonClassName} href="/login">
        Sign in
      </NavLink>
    );
  }

  const role = getCodefunRole(user.ratio, user.status);
  const roleColor = getCodefunRoleTextClass(role);
  return (
    <>
      <div className="relative">
        <Menu as="div" className="relative">
          <Menu.Button
            className={clsx(
              "flex w-auto items-center rounded-full p-[5px] hover:bg-blue-100 hover:ring-[1.5px] hover:ring-blue-200",
              "outline-none focus:outline-none focus:ring-2 focus:ring-blue-400",
              roleColor,
            )}
          >
            <Image
              src={user.avatar}
              width={30}
              height={30}
              alt="user avatar"
              className="mr-1 rounded-full border-[1px]"
            />
            <div className="inline max-w-[15ch] truncate font-bold">{user.name}</div>
          </Menu.Button>
          <div className="absolute right-0 w-48">
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="div"
                className="mt-2 divide-y-[0.5px] divide-gray-200 rounded-md border-[0.25px] border-gray-300 bg-white"
              >
                {ADDITIONAL_LINKS.map(({ url, title }) => (
                  <NavLink
                    className={clsx(navButtonClassName, "w-full rounded-none text-left")}
                    key={`navbar-dropdown-${title}`}
                    href={url}
                  >
                    {title}
                  </NavLink>
                ))}
                <Menu.Item>
                  <button
                    className={clsx(navButtonClassName, "w-full rounded-none text-left")}
                    onClick={logout}
                  >
                    Sign out
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
            {errorMessage && (
              <div className="right-0 mt-2 flex h-auto w-48 items-center overflow-hidden text-clip rounded-md border-red-200 bg-red-100 px-4 py-2 text-red-800">
                {errorMessage}
              </div>
            )}
          </div>
        </Menu>
      </div>
    </>
  );
};

export const HorizontalNavLinks = ({ keyPrefix }: NavLinksProps) => {
  const { user, loading } = useAppSelector((state) => state.user);
  const links = !loading ? (user ? SIGNED_IN_LINKS : SIGNED_OUT_LINKS) : [];
  let pathname = usePathname().split("/").slice(1);

  // delete when merged to main
  if (pathname[0] === "beta") {
    pathname = pathname.slice(1);
  }

  return (
    <>
      {links.map(({ url, title }) => {
        let path = url.split("/").slice(1);

        // delete when merged to main
        if (path[0] === "beta") {
          path = path.slice(1);
        }

        const active = path[0] === pathname[0];
        return (
          <div key={`${keyPrefix}-${title}`} className="group relative mx-2 overflow-visible">
            <NavLink className="peer px-2 py-1" href={url}>
              {title}
            </NavLink>
            <div className="flex justify-around">
              <div
                className={clsx(
                  "h-0 rounded-md  border-t-2 transition-all duration-200 ease-in-out group-hover:w-full",
                  active ? "w-full border-blue-500" : "w-0 border-blue-300",
                )}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export const VerticalNavLinks = ({ keyPrefix }: NavLinksProps) => {
  const { user, loading } = useAppSelector((state) => state.user);
  const links = !loading ? (user ? SIGNED_IN_LINKS : SIGNED_OUT_LINKS) : [];
  let pathname = usePathname().split("/").slice(1);

  // delete when merged to main
  if (pathname[0] === "beta") {
    pathname = pathname.slice(1);
  }

  return (
    <>
      {links.map(({ url, title }) => {
        let path = url.split("/").slice(1);

        // delete when merged to main
        if (path[0] === "beta") {
          path = path.slice(1);
        }

        const active = path[0] === pathname[0];
        return (
          <div key={`${keyPrefix}-${title}`} className="group relative overflow-visible">
            <NavLink className="peer px-4 py-2" href={url}>
              {title}
            </NavLink>
            <div>
              <div
                className={clsx(
                  "absolute h-0 rounded-md border-t-2 transition-all duration-500 ease-in-out group-hover:w-full",
                  active ? "w-full border-blue-500" : "w-0 border-blue-200",
                )}
              ></div>
              <div className={clsx("h-0 rounded-md border-t-2 border-gray-200")}></div>
            </div>
          </div>
        );
      })}
    </>
  );
};
