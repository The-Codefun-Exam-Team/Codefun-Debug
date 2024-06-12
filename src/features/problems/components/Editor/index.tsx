import { cookies } from "next/headers";

import { getMemoProblem } from "@/features/problems";

import { EditorClient } from "./Client";

export const Editor = async ({ code }: { code: string }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  const problemData = await getMemoProblem(code);
  return (
    <EditorClient isLoggedIn={!!token} code={code} problemData={problemData} />
  );
};

Editor.preload = getMemoProblem;
