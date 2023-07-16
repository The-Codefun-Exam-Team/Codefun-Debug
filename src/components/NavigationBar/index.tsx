import Link from "next/link";

import { DropDown } from "./DropDown";
import { NavLinks } from "./NavLinks";

export const NavigationBar = () => (
  <nav className="sticky inset-x-0 top-0 z-50 m-0 block h-auto max-h-screen justify-between border-b-2 border-gray-400 pb-3 pt-4 text-gray-800">
    <div className="mx-auto inline-block max-w-3xl px-2 lg:flex lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
      <Link href="/" className="mx-4 text-3xl font-semibold">
        Codefun Debug
      </Link>
      <div className="hidden h-full grow flex-row-reverse items-center gap-[5px] md:flex">
        <div className="text-l my-auto hidden h-min justify-around gap-1 font-medium lg:flex">
          <NavLinks keyPrefix="navbar-link-large" />
        </div>
      </div>
    </div>
    <DropDown />
  </nav>
);
