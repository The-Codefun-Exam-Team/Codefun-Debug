import type { UserData } from "@/shared/types";

export const getUserInfo = async (
  token: string | undefined,
): Promise<{ ok: false; error: string; status: number } | { ok: true; user: UserData }> => {
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
