import Link from "next/link";

import { DropDownContent, DropDownToggler } from "./DropDown";
import { HorizontalNavLinks, UserInfo } from "./NavLinks";

export const NavigationBar = () => (
  <nav className="sticky inset-x-0 top-0 z-40 h-auto max-h-screen justify-between border-b-[0.5px] border-gray-400 bg-white text-gray-800">
    <div className="mx-auto max-w-4xl items-center px-2 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
      <div className="m-3">
        <DropDownToggler />
        <div className="relative flex items-center justify-between">
          <Link href="/" className="mx-4 flex items-center text-3xl font-semibold">
            <div className="hidden sm:inline-block">Codefun Debug</div>
            <div className="sm:hidden">CD</div>
          </Link>
          <div className="flex h-full grow flex-row-reverse items-center gap-[5px]">
            <div className="text-md my-auto flex h-min items-center justify-around gap-2 font-medium">
              <div className="my-auto hidden h-min items-center justify-around md:flex">
                <HorizontalNavLinks keyPrefix="navbar-link-large" />
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
