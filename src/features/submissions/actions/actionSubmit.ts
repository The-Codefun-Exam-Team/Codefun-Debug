"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { verifyCodefun } from "@/features/auth";
import { submit } from "@/features/submissions";

export const actionSubmit = async (
  code: string,
  codetext: string,
): Promise<{ ok: true; id: number } | { ok: false; message: string }> => {
  try {
    const userQuery = await verifyCodefun();
    if (!userQuery.ok) {
      return { ok: false, message: "You are not logged in" };
    }
    const id = await submit(code, codetext);
    return { ok: true, id };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
    } else {
      console.error(e);
    }
    return { ok: false, message: "An internal server error occurred" };
  }
};
