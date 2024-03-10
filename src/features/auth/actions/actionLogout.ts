"use server";

import { cookies } from "next/headers";

export const actionLogout = async (): Promise<
  { ok: true } | { ok: false; status: number; message: string }
> => {
  try {
    cookies().delete("token");
    return {
      ok: true,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      status: 500,
      message: "An internal server error occurred.",
    };
  }
};
