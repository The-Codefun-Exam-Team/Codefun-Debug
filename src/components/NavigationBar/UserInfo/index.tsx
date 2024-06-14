import Image from "next/image";
import { Suspense } from "react";

import { UserIcon } from "@/components/icon";
import { verifyCodefun } from "@/features/auth";
import { clsx, getCodefunRole } from "@/utils";

import { NAV_BUTTON_CLASS } from "../NavLink";
import { UserInfoClient } from "./client";

const UserInfoBase = async () => {
  const userInfo = await verifyCodefun();

  const user = userInfo.ok ? userInfo.data : undefined;
  const role = user ? getCodefunRole(user.ratio, user.status) : "newbie";

  return (
    <UserInfoClient
      isLoggedIn={!!user}
      role={role}
      userInfoNode={
        <>
          {user ? (
            <Image
              src={user.avatar}
              priority
              width={30}
              height={30}
              alt="user avatar"
              className="mr-2 rounded-full border-2 border-gray-400 dark:border-gray-600"
            />
          ) : (
            <UserIcon className="mr-2 size-7 rounded-full border-2 border-gray-600 stroke-gray-600 dark:border-gray-400 dark:stroke-gray-400" />
          )}
          <div className="inline max-w-[15ch] truncate pr-1 font-bold">
            {user ? user.name : "Guest"}
          </div>
        </>
      }
    />
  );
};

export const UserInfo = () => (
  <Suspense
    fallback={
      <div
        className={clsx(
          NAV_BUTTON_CLASS,
          "border-b-[1.6px] border-transparent",
        )}
      >
        Loading...
      </div>
    }
  >
    <UserInfoBase />
  </Suspense>
);
