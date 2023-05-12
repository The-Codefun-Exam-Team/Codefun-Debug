"use client";
import { Transition } from "@headlessui/react";
import { useAppSelector } from "@redux/hooks";
import { clsx } from "@utils/shared/index.js";
import Link from "next/link";
import { useState } from "react";

import { LogInOut } from "./LogInOut.js";
import { OPTION_LIST } from "./OPTION_LIST.js";
import { UserInfo } from "./UserInfo.js";

// Using transition from headlessui, but don't seem to fucking work
export const DropDown = () => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      <Transition as="span" unmount={true} show={!isShowing}>
        <label
          htmlFor="dropdown-check"
          className="absolute float-right mr-4 inline-block h-9 w-10 cursor-pointer leading-[12px] md:hidden"
          onClick={() => setIsShowing(!isShowing)}
        >
          <Transition.Child
            as="span"
            className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
            enter="delay-300"
            enterFrom="opacity-0"
            enterTo="opacity-1"
          />
          <Transition.Child
            as="span"
            className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
            enter="delay-300"
            enterFrom="opacity-0"
            enterTo="opacity-1"
          />
          <Transition.Child
            as="span"
            className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
            enter="delay-300"
            enterFrom="opacity-0"
            enterTo="opacity-1"
          />
        </label>
      </Transition>

      <Transition as="span" show={isShowing}>
        <label
          htmlFor="dropdown-check"
          className="absolute float-right mr-4 inline-block h-9 w-10 cursor-pointer leading-[12px] md:hidden"
          onClick={() => setIsShowing(!isShowing)}
        >
          <Transition.Child
            as="span"
            className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
            enter="transition-all ease-out-back duration-300"
            enterFrom="translate-x-0 translate-y-0 rotate-0 origin-bottom-left"
            enterTo="translate-x-[6.2px] translate-y-[-3px] rotate-45 origin-bottom-left"
            leave="transition-all ease-out-back duration-300"
            leaveFrom="translate-x-[6.2px] translate-y-[-3px] rotate-45 origin-bottom-left"
            leaveTo="translate-x-0 translate-y-0 rotate-0 origin-bottom-left"
          />
          <Transition.Child
            as="span"
            className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
            enter="duration-200 transition-all ease-out"
            enterFrom="opacity-1 w-full"
            enterTo="opacity-0 w-[1px]"
            leave="duration-200 transition-all ease-out"
            leaveFrom="opacity-1 w-0"
            leaveTo="opacity-1 w-full"
          />
          <Transition.Child
            as="span"
            className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle"
            enter="transition-all ease-out-back duration-300"
            enterFrom="translate-x-0 translate-y-0 rotate-0 origin-bottom-left"
            enterTo="translate-x-[6px] translate-y-0 rotate-[-45deg] origin-bottom-left"
            leave="transition-all ease-out-back duration-300"
            leaveFrom="translate-x-[6px] translate-y-0 rotate-[-45deg] origin-bottom-left"
            leaveTo="translate-x-0 translate-y-0 rotate-0 origin-bottom-left"
          />
        </label>
      </Transition>
    </>
  );
};

// using css to animate the label
// Well it do look suck but it fucking works
export const DropDownCSS = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  return (
    <>
      <input type="checkbox" id="dropdown-check" className="peer hidden" />
      <label
        htmlFor="dropdown-check"
        className={clsx(
          "float-right mr-4 inline-block h-9 w-10 cursor-pointer leading-[12px] md:hidden",
          "peer-checked:[&>:nth-child(1)]:translate-x-[6.2px]",
          "peer-checked:[&>:nth-child(1)]:translate-y-[-3px]",
          "peer-checked:[&>:nth-child(1)]:rotate-45",
          "peer-checked:[&>:nth-child(2)]:w-1",
          "peer-checked:[&>:nth-child(2)]:opacity-0",
          "peer-checked:[&>:nth-child(3)]:translate-x-[6px]",
          "peer-checked:[&>:nth-child(3)]:rotate-[-45deg]",
        )}
      >
        <span className="inline-block h-[5px] w-full origin-top-left rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
        <span className="inline-block h-[5px] w-full rounded-md bg-slate-800 align-middle transition-all duration-200 ease-out" />
        <span className="inline-block h-[5px] w-full origin-bottom-left rounded-md bg-slate-800 align-middle transition-all duration-300 ease-out-back" />
      </label>
      <div
        className={clsx(
          "flex h-0 w-full origin-top scale-y-0 flex-col opacity-0 transition-all duration-300",
          "peer-checked:scale-y-100 peer-checked:opacity-100 md:hidden",
          "md:peer-checked:hidden [&>*]:cursor-pointer [&>*]:py-2 [&>*]:pl-10 [&>*]:font-medium [&>:nth-child(1)]:mt-3",
          loading || !user ? "peer-checked:h-[212px]" : "peer-checked:h-[252px]",
        )}
      >
        {OPTION_LIST.map(([title, url]) => (
          <Link href={url} key={title}>
            {title}
          </Link>
        ))}
        <UserInfo />
        <LogInOut />
      </div>
    </>
  );
};
