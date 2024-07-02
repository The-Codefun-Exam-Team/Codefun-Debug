import { cookies } from "next/headers";

export const submitCodefunProblem = async ({
  code,
  source,
  language,
}: {
  code: string;
  source: string;
  language: string;
}): Promise<number> => {
  const token = cookies().get("token");
  const submissionToCodefun = await fetch("https://codefun.vn/api/submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      problem: code,
      language: language,
      code: source,
    }),
  });
  if (!submissionToCodefun.ok) {
    const res = await submissionToCodefun.json();
    throw new Error(res.error);
  }
  const res = await submissionToCodefun.json();
  return res.data;
};
