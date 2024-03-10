"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { cookies } from "next/headers";

import { getUserInfo } from "@/features/auth";

import { recalcProblemScore } from "../../queries";

type ReturnType = { ok: true } | { ok: false; message: string };

export const actionRecalcProblemScore = async (problemId: number): Promise<ReturnType> => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      return { ok: false, message: "You are not logged in" };
    }
    const userQuery = await getUserInfo(token.value);
    if (!userQuery.ok) {
      return { ok: false, message: "You are not logged in" };
    }
    const isAdmin = userQuery.user.status === "Admin";
    if (!isAdmin) {
      return { ok: false, message: "You are not an admin" };
    }
    await recalcProblemScore(problemId);
    return { ok: true };
  } catch (e) {
    console.error(e);
    if (e instanceof PrismaClientKnownRequestError) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: "An internal server error occurred" };
  }
};
