import { cookies } from "next/headers";

import { getProblem } from "../../queries";
import { EditorClient } from "./Client";

export const Editor = async ({ code }: { code: string }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  const problemData = await getProblem(code);
  return <EditorClient isLoggedIn={!!token} code={code} problemData={problemData} />;
};
