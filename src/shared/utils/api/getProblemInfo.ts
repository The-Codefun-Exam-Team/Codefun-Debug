import type { ProblemData } from "@schemas/getProblemSchema";

export const getProblemInfo = async (
  token: string,
  problemId: string,
): Promise<{ ok: false; error: string; status: number } | { ok: true; problem: ProblemData }> => {
  const res = await fetch("https://debug.codefun.vn/problems/" + problemId, {
    method: "POST",
    headers: {
      Authentication: "Bearer" + token,
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
    problem: info.data,
  };
};
