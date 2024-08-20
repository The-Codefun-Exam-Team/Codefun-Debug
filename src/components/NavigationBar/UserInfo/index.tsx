import Image from "next/image";
import { Suspense } from "react";

import { UserIcon } from "@/components/icon";
import { verifyCodefunWithMemo } from "@/features/auth";
import { getCodefunRole } from "@/utils";

import { UserInfoClient } from "./client";

const UserInfoBase = async () => {
  const userInfo = await verifyCodefunWithMemo();

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
              alt="User's avatar"
              className="mr-2 rounded-full border-2 border-gray-400 dark:border-gray-600"
            />
          ) : (
            <UserIcon className="mr-2 size-7 rounded-full border-2 border-gray-600 stroke-gray-600 dark:border-gray-400 dark:stroke-gray-400" />
          )}
          <span className="inline max-w-[15ch] truncate pr-1 text-base font-bold">
            {user ? user.name : "Guest"}
          </span>
        </>
      }
    />
  );
};

export const UserInfo = () => (
  <Suspense
    fallback={
      <div className="nav-button border-b-2 border-transparent">Loading...</div>
    }
  >
    <UserInfoBase />
  </Suspense>
);
