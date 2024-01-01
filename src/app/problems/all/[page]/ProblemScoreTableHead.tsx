import { getCacheUserInfo } from "@utils/api";
import { cookies } from "next/headers";

export const ProblemScoreTableHead = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  if (!token || !token.value) {
    return <></>;
  }
  const user = await getCacheUserInfo(token.value);
  if (!user.ok) {
    return <></>;
  }
  return (
    <th>
      <div className="text-right">Score</div>
    </th>
  );
};
