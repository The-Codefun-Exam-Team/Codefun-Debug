import { cookies } from "next/headers";

import { getUser } from "@/features/auth";
import type { DetailedSubmissionsInfo } from "@/features/submissions";

import { CodeView } from "./CodeView";
import { CodeViewText } from "./CodeViewText";

export const RunInfoCode = async ({
  code,
  submissionUserId,
}: {
  code: string;
  submissionUserId: DetailedSubmissionsInfo["user"]["tid"];
}) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  const userInfo = await getUser(token?.value);
  if (!userInfo.ok || (userInfo.user.id !== submissionUserId && userInfo.user.status !== "Admin")) {
    return <CodeViewText text="You are not allowed to view the code." />;
  }
  return <CodeView code={code} />;
};
