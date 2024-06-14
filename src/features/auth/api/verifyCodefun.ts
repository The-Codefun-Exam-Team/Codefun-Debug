import { cookies } from "next/headers";
import { cache } from "react";

import type { FunctionReturnType, UserInfo } from "@/types";

const verifyCodefunNoMemo = async (
  token?: string,
): Promise<FunctionReturnType<UserInfo>> => {
  try {
    if (!token) {
      token = cookies().get("token")?.value;
    }
    if (!token) {
      return {
        ok: false,
        error: "Unauthorized. Please login first.",
        status: 401,
      };
    }
    const res = await fetch("https://codefun.vn/api/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const error = (await res.json()).error;
      return {
        ok: false,
        error: error,
        status: res.status,
      };
    }
    const user = (await res.json()).data;
    return {
      ok: true,
      data: user,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "An internal error occurred. Please try again later.",
      status: 500,
    };
  }
};

export const verifyCodefun =
  cache<typeof verifyCodefunNoMemo>(verifyCodefunNoMemo);
