import { cache } from "react";

import type { UserInfo } from "@/types";

export const getUser = async (
  token: string | undefined,
): Promise<{ ok: false; error: string; status: number } | { ok: true; user: UserInfo }> => {
  if (!token) {
    return {
      ok: false,
      error: "You are not signed in.",
      status: 401,
    };
  }
  const res = await fetch("https://codefun.vn/api/verify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const info = await res.json();
  if (!res.ok) {
    return {
      ok: false,
      error: info.error,
      status: res.status,
    };
  }
  return {
    ok: true,
    user: info.data,
  };
};

export const getMemoUser = cache(getUser);
