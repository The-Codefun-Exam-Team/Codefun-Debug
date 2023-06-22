import Link from "next/link";

import { DropDown } from "./DropDown";
import { NavLinks } from "./NavLinks";

export const NavigationBar = () => (
  <nav className="sticky inset-x-0 top-0 z-50 m-0 block h-auto max-h-screen justify-between border-b-2 border-gray-400 bg-slate-200 py-3 text-slate-700">
    <div className="mx-auto inline-block max-w-3xl px-2 md:flex md:max-w-4xl md:items-center md:justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
      <Link href="/" className="mx-4 text-3xl font-semibold">
        Codefun Debug
      </Link>
      <div className="overflow-x-overlay hidden h-full grow flex-row-reverse items-center gap-[5px] overflow-x-auto md:flex">
        <div className="text-l my-auto hidden h-min justify-around gap-1 font-medium lg:flex">
          <NavLinks keyPrefix="navbar-link-large" />
        </div>
        <div className="text-l my-auto flex h-min justify-around divide-x-2 font-medium lg:hidden [&>*]:px-4">
          <NavLinks keyPrefix="navbar-link-small-mid" />
        </div>
      </div>
    </div>
    <DropDown />
  </nav>
);
