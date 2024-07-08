"use server";
import { cookies } from "next/headers";

import type { FunctionReturnType } from "@/types";
import { handleCatch } from "@/utils/handleCatch";

export const actionLogout = async (): Promise<FunctionReturnType> => {
  try {
    cookies().delete("token");
    return {
      ok: true,
    };
  } catch (e) {
    return handleCatch(e);
  }
};
