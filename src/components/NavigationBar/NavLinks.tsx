"use client";
import { Menu, RadioGroup, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setScheme, setUser } from "@redux/slice";
import { clsx, getCodefunRole, getCodefunRoleTextClass } from "@utils/shared";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useState } from "react";

import { ComputerIcon, MoonIcon, SunIcon } from "@/components/icon";

import { ADDITIONAL_LINKS, SIGNED_IN_LINKS, SIGNED_OUT_LINKS } from "./constants";

export interface NavLinksProps {
  keyPrefix: string;
}

// default classnames for nav links
const navButtonClassName =
  "px-3 py-2 transition-colors duration-100 items-center font-semibold flex cursor-pointer";

const NavLink = ({ href, className, ...rest }: ComponentPropsWithoutRef<typeof Link>) => (
  <Link href={href} className={clsx(navButtonClassName, className)} {...rest} />
);

const DarkModeToggler = () => {
  const [option, setOption] = useState(useAppSelector((state) => state.color.scheme));
  const dispatch = useAppDispatch();
  return (
    <div className={clsx(navButtonClassName, "flex flex-col px-1")}>
      <div className="w-full pb-2 text-left">Theme</div>
      <RadioGroup
        value={option}
        onChange={(value) => {
          dispatch(setScheme(value));
          setOption(value);
        }}
        className="flex w-full justify-between"
      >
        <RadioGroup.Option value="dark" className=" pt-1" title="Dark">
          {({ checked }) => (
            <div
              className={clsx(
                "h-fit w-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked ? "border-blue-400" : "border-transparent hover:border-blue-200 ",
              )}
            >
              <MoonIcon className="h-6 w-6 stroke-blue-500" aria-label="Dark" />
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value={null} className=" pt-1" title="Default">
          {({ checked }) => (
            <div
              className={clsx(
                "h-fit w-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked ? "border-blue-400" : "border-transparent hover:border-blue-200",
              )}
            >
              <ComputerIcon className="h-6 w-6 stroke-blue-500" aria-label="System" />
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="light" className=" pt-1" title="Light">
          {({ checked }) => (
            <div
              className={clsx(
                "h-fit w-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked ? "border-blue-400" : "border-transparent hover:border-blue-200",
              )}
            >
              <SunIcon className="h-6 w-6 stroke-blue-500" aria-label="Light" />
            </div>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
};

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
    const res = await fetch("/api/temp/auth/logout", {
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

  const menuItemsClassName =
    "w-full rounded-none text-left transition-colors duration-200 hover:text-blue-500";
  return (
    <>
      <div className="relative">
        <Menu as="div" className="relative">
          <Menu.Button
            className={clsx(
              "flex w-auto items-center rounded-full p-[5px] hover:bg-blue-50 hover:ring-[1.5px] hover:ring-blue-200 dark:hover:bg-blue-950 dark:hover:ring-blue-800",
              "outline-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-400",
              roleColor,
            )}
          >
            <Image
              src={user.avatar}
              width={30}
              height={30}
              alt="user avatar"
              className="mr-1 rounded-full border-[1px] border-gray-300 dark:border-gray-600"
            />
            <div className="inline max-w-[15ch] truncate font-bold">{user.name}</div>
          </Menu.Button>
          <div className="absolute right-0 z-50 w-44">
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
                className="mt-2 divide-y-[0.5px] divide-gray-300 rounded-md border-[1px] border-gray-400 bg-white dark:divide-y-[0.25px] dark:divide-gray-500 dark:border-[0.5] dark:bg-slate-900"
              >
                <DarkModeToggler />
                {ADDITIONAL_LINKS.map(({ url, title }) => (
                  <NavLink
                    className={menuItemsClassName}
                    key={`navbar-dropdown-${title}`}
                    href={url}
                  >
                    {title}
                  </NavLink>
                ))}
                <Menu.Item>
                  <button className={clsx(navButtonClassName, menuItemsClassName)} onClick={logout}>
                    Sign out
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
            {errorMessage && (
              <div className="right-0 mt-2 flex h-auto w-44 items-center overflow-hidden text-clip rounded-md border-red-200 bg-red-100 px-4 py-2 text-red-800">
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
  const pathname = usePathname();
  const pathnameFirstSegment = pathname.slice(0, pathname.indexOf("/", 1));
  return (
    <>
      {links.map(({ url, title }) => {
        const active = url.startsWith(pathnameFirstSegment) && pathnameFirstSegment;
        return (
          <div
            key={`${keyPrefix}-${title}`}
            className="group relative top-[1px] mx-2 overflow-visible"
          >
            <NavLink className="peer px-2 py-1" href={url}>
              {title}
            </NavLink>
            <div className="flex justify-around">
              <div
                className={clsx(
                  "h-0 rounded-md  border-t-2 transition-all duration-200 ease-in-out group-hover:w-full",
                  active
                    ? "w-full border-blue-500 dark:border-blue-600"
                    : "w-0 border-blue-300 dark:border-blue-400",
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
  const pathname = usePathname();
  const pathnameFirstSegment = pathname.slice(0, pathname.indexOf("/", 1));
  return (
    <>
      {links.map(({ url, title }) => {
        const active = url.startsWith(pathnameFirstSegment) && pathnameFirstSegment;
        return (
          <div key={`${keyPrefix}-${title}`} className="group relative overflow-visible">
            <NavLink className="peer px-4 py-2" href={url}>
              {title}
            </NavLink>
            <div>
              <div
                className={clsx(
                  "absolute h-0 rounded-md border-t-[3px] transition-all duration-500 ease-in-out group-hover:w-full",
                  active
                    ? "w-full border-blue-500 dark:border-blue-600"
                    : "w-0 border-blue-200 dark:border-blue-300",
                )}
              ></div>
              <div className={clsx("h-0 rounded-md border-t-[3px] border-gray-200")}></div>
            </div>
          </div>
        );
      })}
    </>
  );
};
