import { getAllProblemsScore, getCacheUserInfo } from "@utils/api";
import { cookies } from "next/headers";

import { Score } from "@/components";

export const ProblemScoreText = ({ text }: { text: string }) => (
  <p className="font-semibold text-slate-600 dark:text-slate-200">{text}</p>
);

export const ProblemScore = async ({ dpid }: { dpid: number }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token || !token.value) {
    return <ProblemScoreText text="Not Available" />;
  }
  const user = await getCacheUserInfo(token.value);
  if (!user.ok) {
    return <ProblemScoreText text="Not Available" />;
  }
  const allProblemsScore = await getAllProblemsScore(user.user);
  if (!allProblemsScore.ok) {
    return <ProblemScoreText text="Not Available" />;
  }
  const problemScore = allProblemsScore.data[dpid];
  return (
    <>{!problemScore ? <ProblemScoreText text="Not Submitted" /> : <Score {...problemScore} />}</>
  );
};
