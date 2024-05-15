import type { UserInfo } from "@/types";

export interface LoginFormState {
  user: UserInfo | null;
  username_messages: string[];
  password_messages: string[];
  messages: string[];
}
