import type { submitData } from "@schemas/submitSchema";

export const submitCode = async (
  token: string,
  code: string,
  codetext: string,
): Promise<{ ok: false; error: string; status: number } | { ok: true; data: submitData }> => {
  const res = await fetch("https://debug.codefun.vn/v3/api/submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      codetext,
    }),
    cache: "no-cache",
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
    data: info.data,
  };
};
