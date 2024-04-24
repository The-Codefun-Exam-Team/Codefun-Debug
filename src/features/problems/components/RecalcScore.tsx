import { cookies } from "next/headers";

import { ResetIcon } from "@/components/icon";
import { getMemoUser } from "@/features/auth";
import { actionRecalcProblemScore } from "@/features/problems";

export const RecalcScore = async ({ code }: { code: string }) => {
  const token = cookies().get("token");
  const userInfo = await getMemoUser(token?.value);
  if (!userInfo.ok || !userInfo.user || userInfo.user.status !== "Admin") {
    return <></>;
  }
  const recalcProblemScore = actionRecalcProblemScore.bind(null, code);
  return (
    <form action={recalcProblemScore}>
      <button
        type="submit"
        className="mt-3 rounded-md border-2 border-red-500/80 bg-red-200/50 p-2
          text-center text-xl text-red-600
          dark:border-red-300/50 dark:bg-red-600/70 dark:text-red-100"
      >
        <ResetIcon className="relative bottom-[3px] inline size-6" /> Recalculate score
      </button>
    </form>
  );
};
