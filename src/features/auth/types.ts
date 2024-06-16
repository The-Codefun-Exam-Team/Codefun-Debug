import type { FunctionReturnType } from "@/types";

interface AdditionalMessages {
  username_message: string;
  password_message: string;
}

export type LoginFormState = FunctionReturnType<void, AdditionalMessages>;
