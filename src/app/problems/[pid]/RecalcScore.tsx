"use client";

import { useAppSelector } from "@redux/hooks";

import { ResetIcon } from "@/components/icon";
import { recalcScore } from "@/shared/utils/actions/submit";

export const RecalcScore = ({ dpid }: { dpid: number }) => {
  const role = useAppSelector((state) => state.user.user?.status);
  if (role !== "Admin") {
    return <></>;
  }
  return (
    <form>
      <button
        onClick={() => {
          void recalcScore(dpid);
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
