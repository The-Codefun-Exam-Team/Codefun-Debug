import { getAllProblemsScore, getCacheUserInfo } from "@utils/api";
import { cookies } from "next/headers";

import { Score } from "@/components";

export const ProblemScore = async ({ dpid }: { dpid: number }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token || !token.value) {
    return <></>;
  }
  const user = await getCacheUserInfo(token.value);
  if (!user.ok) {
    return <></>;
  }
  const allProblemsScore = await getAllProblemsScore(user.user);
  if (!allProblemsScore.ok) {
    return <></>;
  }
  const problemScore = allProblemsScore.data[dpid];
  return (
    <td>
      <div className="float-right flex w-fit justify-end">
        {!problemScore ? (
          <div className="font-semibold text-slate-600 dark:text-slate-200">Not Submitted</div>
        ) : (
          <Score {...problemScore} />
        )}
      </div>
    </td>
  );
};
