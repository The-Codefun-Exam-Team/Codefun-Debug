"use server";
import { cookies } from "next/headers";

import { getUser } from "@/features/auth";
import type { UserInfo } from "@/types";

export const actionAuthenticate = async (): Promise<
  { ok: true; user: UserInfo } | { ok: false; status: number; error: string }
> => {
  try {
    const res = await getUser(cookies().get("token")?.value);
    if (!res.ok) {
      cookies().delete("token");
    }
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
