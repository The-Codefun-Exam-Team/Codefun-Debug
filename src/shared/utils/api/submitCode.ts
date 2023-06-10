import type { submitData } from "@schemas/submitSchema";

export const submitCode = async (
  token: string,
  problem: string,
  code: string,
): Promise<{ ok: false; error: string; status: number } | { ok: true; data: submitData }> => {
  const res = await fetch("https://debug.codefun.vn/api/submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      problem,
      code,
    }),
    cache: "no-cache",
  });
  // temporary solution for weird api (awaiting for fix)
  // TODO: fix when new api comes out
  const info = await res.text();
  if (info.includes("400")) {
    return {
      ok: false,
      error: "Please wait at least 1.5 minutes",
      status: 400,
    };
  }
  if (!res.ok) {
    return {
      ok: false,
      error: "Something went wrong",
      status: res.status,
    };
  }
  return {
    ok: true,
    data: JSON.parse(info),
  };
};
