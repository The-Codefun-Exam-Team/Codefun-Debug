"use client";
import Link from "next/link";

import { PlusSignIcon } from "@/components/icon";
import { useAppSelector } from "@/hooks";

export const CreateProblemButton = () => {
  const user = useAppSelector((state) => state.user.user);
  return user?.status === "Admin" ? (
    <Link href="/problems/create" className="flex items-center">
      <PlusSignIcon
        className="inline h-7 w-7 rounded-md border-2 border-emerald-500 stroke-emerald-500 stroke-[3px] p-[2px] dark:border-green-500 dark:bg-transparent dark:stroke-green-500"
        aria-label="Create problem"
      />
    </Link>
  ) : (
    // invisible box to keep the table aligned
    <div className="h-7 w-7 border-2 border-transparent" />
  );
};
