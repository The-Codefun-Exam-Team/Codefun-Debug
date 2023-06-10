"use client";
import { useAppSelector } from "@redux/hooks";
import Link from "next/link";

import { OPTION_LIST } from "./OPTION_LIST";
import { UserInfo } from "./UserInfo";

// TODO: handle loading
export const OptionsList = () => {
  const { user } = useAppSelector((state) => state.user);
  const isAuth = !!user;

  return (
    <>
      <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium lg:flex [&>*]:cursor-pointer [&>*]:px-4">
        {OPTION_LIST.map(([title, url]) => (
          <Link href={isAuth ? url : "/login"} key={title}>
            {title}
          </Link>
        ))}
        <UserInfo />
      </div>
      <div className="text-l my-auto hidden h-min justify-around divide-x-2 divide-gray-500 font-medium md:flex lg:hidden [&>*]:cursor-pointer [&>*]:px-4">
        {OPTION_LIST.map(([title, url, subtitle]) => (
          <Link href={isAuth ? url : "/login"} key={title}>
            {subtitle}
          </Link>
        ))}
        <UserInfo />
      </div>
    </>
  );
};
