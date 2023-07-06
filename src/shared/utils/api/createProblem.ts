import type { createProblemResponse } from "@schemas/createProblemSchema";

export const createProblem = async (
  token: string,
  submission_id: string,
  name?: string,
): Promise<
  { ok: false; error: string; status: number } | { ok: true; data: createProblemResponse }
> => {
  const res = await fetch("https://debug.codefun.vn/v3/api/new_problem", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      name: name,
      id: submission_id,
    }),
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
