import Link from "next/link";
import { Suspense } from "react";

import { PlusSignIcon } from "@/components/icon";
import { verifyCodefun } from "@/features/auth";

const CreateProblemButtonBase = async () => {
  const user = await verifyCodefun();
  if (!user.ok || !user.data || user.data.status !== "Admin") {
    return <div className="size-7 border-2 border-transparent" />;
  }
  return (
    <Link href="/problems/create" className="flex items-center">
      <PlusSignIcon
        className="inline size-7 rounded-md border-2 border-emerald-500 stroke-emerald-500 stroke-[3px] p-[2px] dark:border-green-500 dark:bg-transparent dark:stroke-green-500"
        aria-label="Create problem"
      />
    </Link>
  );
};

export const CreateProblemButton = () => (
  <Suspense fallback={<div className="size-7 border-2 border-transparent" />}>
    <CreateProblemButtonBase />
  </Suspense>
);
