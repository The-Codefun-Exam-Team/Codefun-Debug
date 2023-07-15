import type { CreateProblemResponse } from "@schemas/createProblemSchema";

export const createProblem = async (
  token: string,
  submissionId: string,
  name?: string,
): Promise<
  { ok: false; error: string; status: number } | { ok: true; data: CreateProblemResponse }
> => {
  const bodyData = new URLSearchParams({ id: submissionId, ...(name && { name: name }) });
  const res = await fetch("https://debug.codefun.vn/v3/api/new_problem", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyData,
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
