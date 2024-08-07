import type { FunctionReturnType } from "@/types";

export type LoginFormState = FunctionReturnType<
  void,
  {
    usernameMessage?: string[];
    passwordMessage?: string[];
  }
>;
