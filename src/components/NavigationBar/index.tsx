import Link from "next/link";

import { DropDownContent, DropDownToggler } from "./DropDown";
import { NavLinks, UserInfo } from "./NavLinks";

export const NavigationBar = () => (
  <nav className="sticky inset-x-0 top-0 z-40 m-0 h-auto max-h-screen justify-between border-b-[0.5px] border-gray-400 bg-white pb-3 pt-4 text-gray-800">
    <div className="mx-auto flex max-w-4xl items-center px-2 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
      <DropDownToggler />
      <Link
        href="/"
        className="mx-4 hidden items-center text-3xl font-semibold hover:text-blue-500 sm:flex"
      >
        Codefun Debug
      </Link>
      <div className="flex h-full grow flex-row-reverse items-center gap-[5px]">
        <div className="text-md my-auto flex h-min justify-around font-medium lg:gap-1">
          <div className="my-auto hidden h-min justify-around md:flex lg:gap-1">
            <NavLinks keyPrefix="navbar-link-large" />
          </div>
          <UserInfo />
        </div>
      </div>
      <DropDownContent />
    </div>
  </nav>
);
