"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";

import { getUser } from "@/features/auth";

import { recalcProblemScore } from "../queries";

type ReturnType = { ok: true } | { ok: false; message: string };

export const actionRecalcProblemScore = async (code: string): Promise<ReturnType> => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    const userQuery = await getUser(token?.value);
    if (!userQuery.ok) {
      return { ok: false, message: "You are not logged in" };
    }
    const isAdmin = userQuery.user.status === "Admin";
    if (!isAdmin) {
      return { ok: false, message: "You are not an admin" };
    }
    await recalcProblemScore(code);
    return { ok: true };
  } catch (e) {
    console.error(e);
    if (e instanceof PrismaClientKnownRequestError) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: "An internal server error occurred" };
  }
};
