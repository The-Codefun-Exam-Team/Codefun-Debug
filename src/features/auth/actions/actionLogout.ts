"use server";
import { cookies } from "next/headers";

import type { FunctionReturnType } from "@/types";

export const actionLogout = async (): Promise<FunctionReturnType> => {
  try {
    cookies().delete("token");
    return {
      ok: true,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "An internal server error occurred. Please try again later.",
      status: 500,
    };
  }
};
