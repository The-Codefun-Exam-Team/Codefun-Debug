import { cookies } from "next/headers";

import { EditorClient, type EditorClientProps } from "./EditorClient";

export const Editor = async (props: Omit<EditorClientProps, "isLoggedIn">) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  return <EditorClient isLoggedIn={!!token} {...props} />;
};
