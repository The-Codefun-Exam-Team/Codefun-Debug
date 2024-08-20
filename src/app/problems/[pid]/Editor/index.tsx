import { cookies } from "next/headers";

import { getProblemWithMemo } from "@/features/problems";

import { EditorClient } from "./Client";

export const Editor = async ({ code }: { code: string }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  const problemData = await getProblemWithMemo(code);
  if (!problemData.ok) {
    throw new Error(problemData.message);
  }
  return (
    <EditorClient
      isLoggedIn={!!token}
      code={code}
      problemData={problemData.data}
    />
  );
};

Editor.preload = getProblemWithMemo;
