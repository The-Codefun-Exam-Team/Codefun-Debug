import { getCacheUserInfo, getProblemScore } from "@utils/api";
import { cookies } from "next/headers";

import { Score } from "@/components";

export const ProblemScore = async ({ problemId }: { problemId: string }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token || !token.value) {
    return <></>;
  }
  const user = await getCacheUserInfo(token.value);
  if (!user.ok) {
    return <></>;
  }
  const problemScore = await getProblemScore(problemId, user.user);
  if (!problemScore.ok) {
    return <></>;
  }
  return (
    <td>
      <div className="float-right flex w-fit justify-end">
        <Score {...problemScore.data} />{" "}
      </div>
    </td>
  );
};
