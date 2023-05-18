"use client";
import { useAppSelector } from "@redux/hooks";
import Link from "next/link";

import { LogInOut } from "./LogInOut";
import { OPTION_LIST } from "./OPTION_LIST";
import { UserInfo } from "./UserInfo";

// TODO: handle loading
export const OptionsList = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, loading } = useAppSelector((state) => state.user);
  const isAuth = !!user;
  console.log(isAuth);
  return (
    <>
      <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium lg:flex [&>*]:cursor-pointer [&>*]:px-4">
        {OPTION_LIST.map(([title, url]) => (
          <Link
            as={isAuth || title === "About" ? url : "/login"}
            href={isAuth || title === "About" ? url : "/login"}
            key={title}
          >
            {title}
          </Link>
        ))}
        <UserInfo />
        <LogInOut />
      </div>
      <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium md:flex lg:hidden [&>*]:cursor-pointer [&>*]:px-4">
        {OPTION_LIST.map(([title, url, subtitle]) => (
          <Link
            as={isAuth || title === "About" ? url : "/login"}
            href={isAuth || title === "About" ? url : "/login"}
            key={title}
          >
            {subtitle}
          </Link>
        ))}
        <UserInfo />
        <LogInOut />
      </div>
    </>
  );
};
