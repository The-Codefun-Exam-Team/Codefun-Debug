import Link from "next/link";

import { Loginout } from "./Loginout.js";
import { UserInfo } from "./UserInfo.js";

const OPTION_LIST = [
  ["Problems", "/problems"],
  ["Submissions", "/submissions"],
  ["Rankings", "/rankings"],
  ["About", "/about"],
] as const;


// TODO: use react dropdown instead of pure html css
export const NavigationBar = () => (
  <nav className="sticky inset-x-0 top-0 m-0 block justify-between border-b-2 border-gray-400 bg-slate-200 py-3 text-slate-700">
    <div className="peer mx-auto inline-block max-w-3xl px-2 md:flex md:max-w-4xl md:justify-between lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
      <Link href="/" className="mx-4 text-3xl font-semibold">
        Codefun Debug
      </Link>
      <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium md:flex [&>*]:px-4 [&>*]:cursor-pointer">
        {OPTION_LIST.map(([title, url]) => (
          <Link href={url} key={title}>
            {title}
          </Link>
        ))}
        <UserInfo />
        <Loginout />
      </div>
    </div>
    <label
      htmlFor="dropdown-check"
      className="float-right mr-4 inline-block h-9 w-10 cursor-pointer leading-[12px] md:hidden
				peer-checked:[&>:nth-child(1)]:translate-x-[6.2px]
				peer-checked:[&>:nth-child(1)]:translate-y-[-3px]
				peer-checked:[&>:nth-child(1)]:rotate-45

				peer-checked:[&>:nth-child(2)]:w-1
				peer-checked:[&>:nth-child(2)]:opacity-0
				
				peer-checked:[&>:nth-child(3)]:translate-x-[6px]
				peer-checked:[&>:nth-child(3)]:rotate-[-45deg]
				"
    >
      <span className="inline-block h-[5px] w-full origin-top-left rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
      <span className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
      <span className="inline-block h-[5px] w-full origin-bottom-left rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
    </label>

    <div
      id="dropdown-content"
      className="flex h-0 w-full origin-top scale-y-0 flex-col opacity-0 transition-all duration-200 peer-checked:h-[136px] peer-checked:scale-y-100 peer-checked:opacity-100 md:hidden md:peer-checked:hidden"
    >
      
    </div>
  </nav>
);
