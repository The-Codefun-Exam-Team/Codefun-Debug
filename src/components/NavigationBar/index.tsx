import Link from "next/link";

import { DropDown } from "./DropDown.js";
import { Loginout } from "./Loginout.js";
import { UserInfo } from "./UserInfo.js";

const OPTION_LIST = [
  ["Problems", "/problems", "Probs"],
  ["Submissions", "/submissions", "Subs"],
  ["Rankings", "/rankings", "Ranks"],
  ["About", "/about", "About"],
] as const;

// TODO: use react dropdown instead of pure html css
export const NavigationBar = () => (
  <nav className="sticky inset-x-0 top-0 m-0 block justify-between border-b-2 border-gray-400 bg-slate-200 py-3 text-slate-700">
    <div className="peer mx-auto inline-block max-w-3xl px-2 md:flex md:max-w-4xl md:justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
      <Link href="/" className="mx-4 text-3xl font-semibold">
        Codefun Debug
      </Link>
      <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium lg:flex [&>*]:cursor-pointer [&>*]:px-4">
        {OPTION_LIST.map(([title, url]) => (
          <Link href={url} key={title}>
            {title}
          </Link>
        ))}
        <UserInfo />
        <Loginout />
      </div>
      <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium md:flex lg:hidden [&>*]:cursor-pointer [&>*]:px-4">
        {OPTION_LIST.map(([title, url, subtitle]) => (
          <Link href={url} key={title}>
            {subtitle}
          </Link>
        ))}
        <UserInfo />
        <Loginout />
      </div>
    </div>
    <DropDown />
    <div
      id="dropdown-content"
      className="flex h-0 w-full origin-top scale-y-0 flex-col opacity-0 transition-all duration-200 peer-checked:h-[136px] peer-checked:scale-y-100 peer-checked:opacity-100 md:hidden md:peer-checked:hidden"
    ></div>
  </nav>
);
