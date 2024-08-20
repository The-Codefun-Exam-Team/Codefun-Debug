import { cookies } from "next/headers";

import { Score } from "@/components";
import { verifyCodefunWithMemo } from "@/features/auth";
import { getProblemsScoreWithMemo } from "@/features/problems";

export const ProblemScoreText = ({ text }: { text: string }) => (
  <p className="font-semibold text-slate-600 dark:text-slate-200">{text}</p>
);

export const ProblemScore = async ({ id }: { id: number }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token || !token.value) {
    return <ProblemScoreText text="Not Available" />;
  }
  const user = await verifyCodefunWithMemo(token.value);
  if (!user.ok) {
    return <ProblemScoreText text="Not Available" />;
  }
  const allProblemsScore = await getProblemsScoreWithMemo();
  if (!allProblemsScore.ok) {
    return <ProblemScoreText text="Not Available" />;
  }
  const problemScore = allProblemsScore.data[id];
  return (
    <>
      {!problemScore ? (
        <ProblemScoreText text="Not Submitted" />
      ) : (
        <Score data={problemScore} />
      )}
    </>
  );
};

export const ProblemScoreSkeleton = async () => {
  return (
    <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-slate-600"></div>
  );
};
