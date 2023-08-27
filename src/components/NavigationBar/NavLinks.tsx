"use client";
import { Menu, RadioGroup, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setScheme, setUser } from "@redux/slice";
import { clsx, getCodefunRole, getCodefunRoleTextClass } from "@utils/shared";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ComputerIcon, MoonIcon, SunIcon } from "@/components/icon";

import { ADDITIONAL_LINKS, SIGNED_IN_LINKS, SIGNED_OUT_LINKS } from "./constants";
import { BaseNavLink, HorizontalNavLink, NAV_BUTTON_CLASS, VerticalNavLink } from "./NavLink";

export interface NavLinksProps {
  keyPrefix: string;
}

const DarkModeToggler = () => {
  const [option, setOption] = useState(useAppSelector((state) => state.color.scheme));
  const dispatch = useAppDispatch();
  return (
    <div className={clsx(NAV_BUTTON_CLASS, "flex flex-col px-1")}>
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
    return <div className={NAV_BUTTON_CLASS}>Loading...</div>;
  }
  if (!user) {
    return <HorizontalNavLink href="/login">Sign in</HorizontalNavLink>;
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
              "flex w-auto items-center rounded-full p-[5px]",
              "hover:bg-blue-50 hover:ring-[1.5px] hover:ring-blue-200 dark:hover:bg-blue-950 dark:hover:ring-blue-800",
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
                className={clsx(
                  "mt-2 rounded-md border-gray-400 bg-white dark:bg-slate-900",
                  "divide-y-[0.5px] divide-gray-300 border-[1px] dark:divide-y-[0.25px] dark:divide-gray-500 dark:border-[0.5]",
                )}
              >
                <DarkModeToggler />
                {ADDITIONAL_LINKS.map(({ url, title }) => (
                  <BaseNavLink
                    className={menuItemsClassName}
                    key={`navbar-dropdown-${title}`}
                    href={url}
                  >
                    {title}
                  </BaseNavLink>
                ))}
                <Menu.Item>
                  <button className={clsx(NAV_BUTTON_CLASS, menuItemsClassName)} onClick={logout}>
                    Sign out
                  </button>
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
          </div>
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
