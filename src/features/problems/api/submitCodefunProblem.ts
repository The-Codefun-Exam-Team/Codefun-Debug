import { cookies } from "next/headers";

export const submitCodefunProblem = async ({
  pid,
  codetext,
  language,
}: {
  pid: number;
  codetext: string;
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
      problem: pid.toString(),
      language: language,
      code: codetext,
    }),
  });
  if (!submissionToCodefun.ok) {
    const res = await submissionToCodefun.json();
    throw new Error(res.error);
  }
  const res = await submissionToCodefun.json();
  return res.data;
};
