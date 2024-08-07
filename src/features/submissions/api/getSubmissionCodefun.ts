import type { Language, SubmissionResult } from "@prisma/client";
import { cookies } from "next/headers";

import type { FunctionReturnType } from "@/types";
import type { Judge } from "@/utils";
import { handleCatch } from "@/utils";

interface SubmissionCodefun {
  id: number;
  result: SubmissionResult;
  runningtime: number;
  score: number;
  problem: {
    id: number;
  };
  owner: {
    id: number;
  };
  language: Language;
  code: string;
  judge: Judge | string;
}

export const getSubmissionCodefun = async (id: number) => {
  return new Promise<FunctionReturnType<SubmissionCodefun>>((resolve) => {
    const token = cookies().get("token");
    const interval = setInterval(async () => {
      try {
        const requestToCodefun = await fetch(
          `https://codefun.vn/api/submissions/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token?.value}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );
        if (!requestToCodefun.ok) {
          const res = await requestToCodefun.json();
          clearInterval(interval);
          resolve({
            ok: false,
            message: res.error,
            status: requestToCodefun.status,
          });
        }
        const res = await requestToCodefun.json();
        const data = res.data satisfies SubmissionCodefun;
        if (!["Q", "..."].includes(data.result)) {
          clearInterval(interval);
          resolve({
            ok: true,
            data: data,
          });
        }
      } catch (e) {
        clearInterval(interval);
        return resolve(handleCatch(e));
      }
    }, 1000);
  });
};
