import type { UserData } from "@/types";

export interface LoginFormState {
  user: UserData | null;
  username_messages: string[];
  password_messages: string[];
  messages: string[];
}
