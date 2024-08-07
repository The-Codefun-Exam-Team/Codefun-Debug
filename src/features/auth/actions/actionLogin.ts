"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { handleCatch } from "@/utils/handleCatch";

import { loginCodefun, verifyCodefunWithMemo } from "../api";
import type { LoginFormState } from "../types";

const loginSchema = z.object({
  username: z.string().max(24),
  password: z.string().max(64),
});

export const actionLogin = async (
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
  try {
    const validatedBody = await loginSchema.spa({
      username: formData.get("username"),
      password: formData.get("password"),
    });
    if (!validatedBody.success) {
      const errors = validatedBody.error.format();
      return {
        ok: false,
        message: "",
        usernameMessage: errors.username?._errors,
        passwordMessage: errors.password?._errors,
        status: 401,
      };
    }
    const { username, password } = validatedBody.data;

    const loginCodefunRequest = await loginCodefun(username, password);
    if (!loginCodefunRequest.ok) {
      const error = loginCodefunRequest.message;
      return {
        ok: false,
        message: error,
        status: loginCodefunRequest.status,
      };
    }

    const token = loginCodefunRequest.data;

    const user = await verifyCodefunWithMemo(token);

    if (!user.ok) {
      console.error(
        "Unexpected error verifying user when logging in: ",
        user.message,
      );
      return {
        ok: false,
        message: "An internal server error occurred. Please try again later.",
        status: 500,
      };
    }

    cookies().set({
      name: "token",
      value: token,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      path: "/",
    });
  } catch (e) {
    return handleCatch(e);
  }
  const redirectTo = headers().get("X-Redirect-To") ?? "/";
  redirect(redirectTo);
};
