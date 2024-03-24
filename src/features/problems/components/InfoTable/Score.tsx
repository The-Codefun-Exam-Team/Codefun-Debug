import { cookies } from "next/headers";

import { Score } from "@/components";
import { getMemoUser } from "@/features/auth";
import { getProblemScore } from "@/features/problems";

export const InfoTableScore = async ({ problemId }: { problemId: string }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token || !token.value) {
    return <div className="pb-4 pt-5 text-center text-2xl">Login to view score</div>;
  }
  const userInfo = await getMemoUser(token.value);
  if (!userInfo.ok) {
    return <div className="pb-4 pt-5 text-center text-2xl">{userInfo.error}</div>;
  }
  const scoreData = await getProblemScore(problemId, userInfo.user);
  if (!scoreData.ok) {
    return <div className="pb-4 pt-5 text-center text-2xl">{scoreData.error}</div>;
  }
  return <Score {...scoreData.data} className="pb-4 pt-5 text-center text-2xl" />;
};

export const InfoTableScoreSkeleton = () => (
  <div className="pb-4 pt-5">
    <div className="mx-auto h-8 w-28 animate-pulse rounded-md bg-gray-200 dark:bg-slate-600"></div>
  </div>
);
