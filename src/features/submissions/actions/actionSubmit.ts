"use server";

import { submit } from "@/features/submissions";
import type { FunctionReturnType } from "@/types";
import { handleCatch } from "@/utils";

export const actionSubmit = async (
  code: string,
  codetext: string,
): Promise<FunctionReturnType<number>> => {
  try {
    const query = await submit(code, codetext);
    if (!query.ok) {
      return { ok: false, message: query.message, status: query.status };
    }
    return { ok: true, data: query.data };
  } catch (e) {
    return handleCatch(e);
  }
};
