import { verifyCodefunWithMemo } from "@/features/auth";

import { CodeView } from "./CodeView";
import { CodeViewText } from "./CodeViewText";

export const RunInfoCode = async ({
  source,
  username,
}: {
  source: string;
  username: string;
}) => {
  const userInfo = await verifyCodefunWithMemo();
  if (
    !userInfo.ok ||
    (userInfo.data.username !== username && userInfo.data.status !== "admin")
  ) {
    return <CodeViewText text="You are not allowed to view the code." />;
  }
  return <CodeView source={source} />;
};
