import type { UserData } from "@schemas/loginSchema";

export const getUserInfo = async (
  token: string,
): Promise<{ ok: false; error: string; status: number } | { ok: true; user: UserData }> => {
  const res = await fetch("https://codefun.vn/api/verify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
