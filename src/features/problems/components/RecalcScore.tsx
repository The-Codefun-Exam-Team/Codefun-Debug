"use client";

import { ResetIcon } from "@/components/icon";
import { useAppSelector } from "@/hooks";

import { actionRecalcProblemScore } from "../actions";

export const RecalcScore = ({ code }: { code: string }) => {
  const role = useAppSelector((state) => state.user.user?.status);
  if (role !== "Admin") {
    return <></>;
  }
  return (
    <form>
      <button
        onClick={() => {
          void actionRecalcProblemScore(code);
        }}
        type="reset"
        className="mt-3 rounded-md border-2 border-red-500/80 bg-red-200/50 p-2
          text-center text-xl text-red-600
          dark:border-red-300/50 dark:bg-red-600/70 dark:text-red-100 "
      >
        <ResetIcon className="relative bottom-[3px] inline h-6 w-6" /> Recalculate score
      </button>
    </form>
  );
};
