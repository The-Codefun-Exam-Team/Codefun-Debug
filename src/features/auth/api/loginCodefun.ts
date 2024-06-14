import type { FunctionReturnType } from "@/types";

export const loginCodefun = async (
  username: string,
  password: string,
): Promise<FunctionReturnType<string>> => {
  try {
    const requestToCodefun = await fetch("https://codefun.vn/api/auth", {
      method: "POST",
      body: new URLSearchParams({
        username,
        password,
      }),
    });
    if (!requestToCodefun.ok) {
      const error = (await requestToCodefun.json()).error as string;
      return {
        ok: false,
        error: error,
        status: requestToCodefun.status,
      };
    }
    const token = (await requestToCodefun.json()).data as string;
    return {
      ok: true,
      data: token,
    };
  } catch (e) {
    return {
      ok: false,
      error: "An internal server error occurred. Please try again later.",
      status: 500,
    };
  }
};
