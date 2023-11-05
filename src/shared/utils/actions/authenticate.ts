"use server";

import { getUserInfo } from "@utils/api";
import { cookies } from "next/headers";

import type { UserData } from "@/shared/types";

export const authenticate = async (): Promise<
  { ok: true; user: UserData } | { ok: false; status: number; error: string }
> => {
  try {
    const res = await getUserInfo(cookies().get("token")?.value);
    return res;
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      status: 500,
      error: "Internal Server Error",
    };
  }
};
