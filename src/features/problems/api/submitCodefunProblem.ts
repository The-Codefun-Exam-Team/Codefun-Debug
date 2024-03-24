import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
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
    const error = (await submissionToCodefun.json()) as string;
    throw new Error(error);
  }
  const rid = await submissionToCodefun.json();
  return rid;
};
