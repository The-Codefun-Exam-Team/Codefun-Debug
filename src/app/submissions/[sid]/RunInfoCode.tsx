import type { SubmissionInfo } from "@utils/api";
import { cookies } from "next/headers";

import { getUserInfo } from "@/features/auth";

import { CodeView } from "./CodeView";
import { CodeViewText } from "./CodeViewText";

export const RunInfoCode = async ({
  code,
  submissionUserId,
}: {
  code: string;
  submissionUserId: SubmissionInfo["user"]["tid"];
}) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  const userInfo = await getUserInfo(token?.value);
  if (!userInfo.ok || (userInfo.user.id !== submissionUserId && userInfo.user.status !== "Admin")) {
    return <CodeViewText text="You are not allowed to view the code." />;
  }
  return <CodeView code={code} />;
};
