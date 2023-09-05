"use client";
import { Menu, RadioGroup, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setScheme, setUser } from "@redux/slice";
import { clsx, getCodefunRole, getCodefunRoleTextClass } from "@utils/shared";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ComputerIcon, MoonIcon, SunIcon, UserIcon } from "@/components/icon";

import { ADDITIONAL_LINKS, SIGNED_IN_LINKS, SIGNED_OUT_LINKS } from "./constants";
import { BaseNavLink, HorizontalNavLink, NAV_BUTTON_CLASS, VerticalNavLink } from "./NavLink";

export interface NavLinksProps {
  keyPrefix: string;
}

const DarkModeToggler = () => {
  const { selectedScheme: colorScheme, isSystemScheme } = useAppSelector((state) => state.color);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-2 px-3 py-2 font-semibold transition-colors duration-100">
      <span>Theme</span>
      <RadioGroup
        value={isSystemScheme ? null : colorScheme}
        onChange={(value) => {
          dispatch(setScheme(value));
        }}
        className="flex w-full justify-between [&>*]:cursor-pointer"
      >
        <RadioGroup.Option value="dark" title="Dark">
          {({ checked }) => (
            <div
              className={clsx(
                "h-fit w-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked
                  ? "border-accent-light dark:border-accent-dark"
                  : "border-transparent hover:border-blue-200 hover:dark:border-sky-200",
              )}
            >
              <MoonIcon
                className="h-6 w-6 stroke-accent-light dark:stroke-accent-dark"
                aria-label="Dark"
              />
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value={null} title="Default">
          {({ checked }) => (
            <div
              className={clsx(
                "h-fit w-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked
                  ? "border-accent-light dark:border-accent-dark"
                  : "border-transparent hover:border-blue-200 hover:dark:border-sky-200",
              )}
            >
              <ComputerIcon
                className="h-6 w-6 stroke-accent-light dark:stroke-accent-dark"
                aria-label="System"
              />
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="light" title="Light">
          {({ checked }) => (
            <div
              className={clsx(
                "h-fit w-fit rounded-md border-2 p-1 transition-colors duration-200",
                checked
                  ? "border-accent-light dark:border-accent-dark"
                  : "border-transparent hover:border-blue-200 hover:dark:border-sky-200",
              )}
            >
              <SunIcon
                className="h-6 w-6 stroke-accent-light dark:stroke-accent-dark"
                aria-label="Light"
              />
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
    // transparent border to prevent shifting of navbar
    return (
      <div className={clsx(NAV_BUTTON_CLASS, "border-b-[1.6px] border-transparent")}>
        Loading...
      </div>
    );
  }

  const role = user ? getCodefunRole(user.ratio, user.status) : "newbie";
  const roleColor = getCodefunRoleTextClass(role);

  const menuItemsClassName =
    "w-full rounded-none text-left transition-colors duration-200 hover:text-accent-light dark:hover:text-accent-dark";
  return (
    <>
      <div className="relative">
        <Menu as="div" className="relative">
          <Menu.Button
            className={clsx(
              "flex w-auto items-center rounded-full p-[5px]",
              "hover:bg-blue-50 hover:ring-[1.5px] hover:ring-blue-200 dark:hover:bg-sky-950/50 dark:hover:ring-sky-800",
              "outline-none focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark",
              "border-b-[1.6px] border-transparent", // transparent border to prevent shifting of navbar
              roleColor,
            )}
          >
            {user ? (
              <Image
                src={user.avatar}
                width={30}
                height={30}
                alt="user avatar"
                className="mr-2 rounded-full border-2 border-gray-800 dark:border-slate-300"
              />
            ) : (
              <UserIcon className="mr-2 h-7 w-7 rounded-full border-2 border-gray-800 stroke-gray-800 dark:border-slate-300 dark:stroke-slate-300" />
            )}
            <div className="inline max-w-[15ch] truncate pr-1 font-bold text-slate-800 dark:text-slate-300">
              {user ? user.name : "Guest"}
            </div>
          </Menu.Button>
          <Transition
            as="div"
            className="absolute right-0 z-50 mt-2 w-44"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="div"
              className={clsx(
                "origin-top-right rounded-md border-gray-400 bg-white dark:bg-slate-900",
                "divide-y-[0.5px] divide-gray-300 border-[1px] dark:divide-y-[0.25px] dark:divide-gray-500 dark:border-[0.5px]",
              )}
            >
              <DarkModeToggler />
              {ADDITIONAL_LINKS.map(({ url, title }) => (
                <Menu.Item key={`navbar-dropdown-${title}`}>
                  <div>
                    <BaseNavLink className={menuItemsClassName} href={url}>
                      {title}
                    </BaseNavLink>
                  </div>
                </Menu.Item>
              ))}
              <Menu.Item>
                {user ? (
                  <button className={clsx(NAV_BUTTON_CLASS, menuItemsClassName)} onClick={logout}>
                    Sign out
                  </button>
                ) : (
                  <div>
                    <BaseNavLink className={menuItemsClassName} href="/login">
                      Sign in
                    </BaseNavLink>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
          {errorMessage && (
            <div
              className={clsx(
                "right-0 mt-2 w-44 px-4 py-2",
                "flex h-auto items-center overflow-hidden text-clip rounded-md",
                "border-red-200 bg-red-100 text-red-800",
              )}
            >
              {errorMessage}
            </div>
          )}
        </Menu>
      </div>
    </>
  );
};

export const HorizontalNavLinks = ({ keyPrefix }: NavLinksProps) => {
  const { user, loading } = useAppSelector((state) => state.user);
  const links = !loading ? (user ? SIGNED_IN_LINKS : SIGNED_OUT_LINKS) : [];
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

export const VerticalNavLinks = ({ keyPrefix }: NavLinksProps) => {
  const { user, loading } = useAppSelector((state) => state.user);
  const links = !loading ? (user ? SIGNED_IN_LINKS : SIGNED_OUT_LINKS) : [];
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
