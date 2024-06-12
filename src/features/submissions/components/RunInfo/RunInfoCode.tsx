import { cookies } from "next/headers";

import { getUser } from "@/features/auth";

import { CodeView } from "./CodeView";
import { CodeViewText } from "./CodeViewText";

export const RunInfoCode = async ({
  source,
  username,
}: {
  source: string;
  username: string;
}) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  const userInfo = await getUser(token?.value);
  if (
    !userInfo.ok ||
    (userInfo.user.username !== username && userInfo.user.status !== "admin")
  ) {
    return <CodeViewText text="You are not allowed to view the code." />;
  }
  return <CodeView source={source} />;
};
