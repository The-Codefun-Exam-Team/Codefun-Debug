import { cookies } from "next/headers";

import { Score } from "@/components";
import { verifyCodefunWithMemo } from "@/features/auth";
import { getProblemScore } from "@/features/problems";

export const InfoTableScore = async ({ problemId }: { problemId: number }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token || !token.value) {
    return (
      <div className="pb-4 pt-5 text-center text-2xl">Login to view score</div>
    );
  }
  const userInfo = await verifyCodefunWithMemo(token.value);
  if (!userInfo.ok) {
    return <div className="pb-4 pt-5 text-center text-2xl"></div>;
  }
  const scoreData = await getProblemScore(problemId, userInfo.data.id);
  if (!scoreData.ok) {
    return <div className="pb-4 pt-5 text-center text-2xl">Not Submitted</div>;
  }
  return (
    <Score data={scoreData.data} className="pb-4 pt-5 text-center text-2xl" />
  );
};

export const InfoTableScoreSkeleton = () => (
  <div className="pb-4 pt-5">
    <div className="mx-auto h-8 w-28 animate-pulse rounded-md bg-gray-200 dark:bg-slate-600"></div>
  </div>
);
