"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";

import { getUser } from "@/features/auth";
import { submit } from "@/features/submissions";

export const actionSubmit = async (
  code: string,
  codetext: string,
): Promise<{ ok: true; drid: number } | { ok: false; message: string }> => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    const userQuery = await getUser(token?.value);
    if (!userQuery.ok) {
      return { ok: false, message: "You are not logged in" };
    }
    const drid = await submit(code, codetext);
    return { ok: true, drid };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
    } else {
      console.error(e);
    }
    return { ok: false, message: "An internal server error occurred" };
  }
};
