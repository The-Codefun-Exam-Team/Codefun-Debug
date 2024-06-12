"use client";
import { Menu, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useFormState } from "react-dom";

import { actionLogout } from "@/features/auth";
import type { CodefunRoles } from "@/types";
import { clsx, getCodefunRoleTextClass } from "@/utils";

import { ADDITIONAL_LINKS } from "../constants";
import { BaseNavLink, NAV_BUTTON_CLASS } from "../NavLink";
import { MENU_ITEMS_CLASS } from "./constants";
import { DarkModeToggler } from "./DarkModeToggler";

export interface UserInfoClientProps {
  role: CodefunRoles | null;
  isLoggedIn: boolean;
  userInfoNode: ReactNode;
}

export const UserInfoClient = ({
  role,
  isLoggedIn,
  userInfoNode,
}: UserInfoClientProps) => {
  const pathname = usePathname();
  const [logoutData, logout] = useFormState(actionLogout, { ok: true });
  const roleColor = getCodefunRoleTextClass(role);
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={clsx(
          "flex w-auto items-center rounded-full p-[5px]",
          "hover:bg-accent-light/10 hover:ring-[1.5px] hover:ring-accent-light/60 dark:hover:bg-accent-dark/10 dark:hover:ring-accent-dark/60",
          "outline-none focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark",
          "border-b-[1.6px] border-transparent", // transparent border to prevent shifting of navbar
          roleColor,
        )}
      >
        {userInfoNode}
      </Menu.Button>
      <Transition
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
            "divide-y-[0.5px] divide-gray-300 border dark:divide-y-[0.25px] dark:divide-gray-500 dark:border-[0.5px]",
          )}
        >
          <DarkModeToggler />
          {ADDITIONAL_LINKS.map(({ url, title }) => (
            <Menu.Item key={`navbar-dropdown-${title}`}>
              <div>
                <BaseNavLink className={MENU_ITEMS_CLASS} href={url}>
                  {title}
                </BaseNavLink>
              </div>
            </Menu.Item>
          ))}
          <Menu.Item>
            {isLoggedIn ? (
              <form action={logout}>
                <button
                  type="submit"
                  className={clsx(NAV_BUTTON_CLASS, MENU_ITEMS_CLASS)}
                >
                  Sign out
                </button>
              </form>
            ) : (
              <div>
                <BaseNavLink
                  className={MENU_ITEMS_CLASS}
                  href={`/login?prev=${pathname}`}
                >
                  Sign in
                </BaseNavLink>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
      {!logoutData.ok && (
        <div
          className={clsx(
            "right-0 mt-2 w-44 px-4 py-2",
            "absolute flex h-auto items-center overflow-hidden text-clip rounded-md",
            "border-red-200 bg-red-100 text-red-800",
          )}
        >
          {logoutData.message}
        </div>
      )}
    </Menu>
  );
};
