import { getProblemScore, getUserInfo } from "@utils/api";
import { cookies } from "next/headers";

import { Score } from "@/components";

export const InfoTableScore = async ({ problemId }: { problemId: string }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token || !token.value) {
    return <div className="pb-4 pt-5 text-center text-2xl">Login to view score</div>;
  }
  const userInfo = await getUserInfo(token.value);
  if (!userInfo.ok) {
    return <div className="pb-4 pt-5 text-center text-2xl">{userInfo.error}</div>;
  }
  const scoreData = await getProblemScore(problemId, userInfo.user);
  if (!scoreData.ok) {
    return <div className="pb-4 pt-5 text-center text-2xl">{scoreData.error}</div>;
  }
  return <Score {...scoreData.data} className="pb-4 pt-5 text-center text-2xl" />;
};
