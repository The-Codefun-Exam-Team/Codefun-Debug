import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import { cache } from "react";

import type { FunctionReturnType, UserInfo } from "@/types";

const verifyCodefun = async (
  token?: string,
): Promise<FunctionReturnType<UserInfo>> => {
  unstable_noStore();
  try {
    if (!token) {
      token = cookies().get("token")?.value;
    }
    if (!token) {
      return {
        ok: false,
        message: "Unauthorized. Please login first.",
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
        message: error,
        status: res.status,
      };
    }
    const user = (await res.json()).data;
    return {
      ok: true,
      data: user,
    };
  } catch (e) {
    // manually handle catch for compatibility with middleware
    console.error("Unexpected error: ", e);
    if (e instanceof Error) {
      return {
        ok: false,
        message: e.message,
        status: 500,
      };
    } else {
      return {
        ok: false,
        message: "An internal server error occurred. Please try again later.",
        status: 500,
      };
    }
  }
};

export const verifyCodefunWithMemo = cache(verifyCodefun);
