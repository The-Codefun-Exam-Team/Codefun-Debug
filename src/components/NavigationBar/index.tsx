import Link from "next/link";
import { Suspense } from "react";

import { DropDownContent, DropDownToggler } from "./DropDown";
import { HorizontalNavLinks } from "./NavLinks";
import { UserInfo } from "./UserInfo";

export const NavigationBar = () => (
  <nav className="sticky inset-x-0 top-0 z-40 h-auto max-h-screen justify-between border-b-[0.25px] border-gray-400 bg-white text-gray-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
    <div className="mx-auto max-w-4xl items-center px-2 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
      <div className="mx-2 my-3">
        <DropDownToggler />
        <div className="relative flex items-center justify-between">
          <Link href="/" className="mx-4 flex items-center text-2xl font-bold lg:text-3xl">
            <div className="hidden sm:inline-block">
              Codefun Debug
              <div className="ml-1 inline-block align-top text-sm font-extrabold text-accent-light dark:text-accent-dark lg:text-base">
                BETA
              </div>
            </div>
            <div className="text-xl sm:hidden">
              CFDB
              <div className="ml-1 inline-block align-top text-xs font-extrabold text-accent-light dark:text-accent-dark">
                BETA
              </div>
            </div>
          </Link>
          <div className="flex h-full grow flex-row-reverse items-center gap-[5px]">
            <div className="text-md relative top-[2px] my-auto flex h-min items-center justify-around gap-2 font-medium">
              <div className="my-auto hidden h-min items-center justify-around md:flex">
                <Suspense>
                  <HorizontalNavLinks keyPrefix="navbar-link-large" />
                </Suspense>
              </div>
              <UserInfo />
            </div>
          </div>
        </div>
        <DropDownContent />
      </div>
    </div>
  </nav>
);
