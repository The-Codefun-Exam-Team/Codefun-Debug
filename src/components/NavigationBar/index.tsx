import Link from "next/link";

import { DropDownCSS } from "./DropDown.js";
import { OptionsList } from "./OptionsList.js";

// TODO: use react dropdown instead of pure html css
export const NavigationBar = () => (
  <nav className="sticky inset-x-0 top-0 m-0 block h-auto justify-between border-b-2 border-gray-400 bg-slate-200 py-3 text-slate-700">
    <div className="mx-auto inline-block max-w-3xl px-2 md:flex md:max-w-4xl md:justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
      <Link href="/" className="mx-4 text-3xl font-semibold">
        Codefun Debug
      </Link>
      <OptionsList />
    </div>
    <DropDownCSS />
  </nav>
);
