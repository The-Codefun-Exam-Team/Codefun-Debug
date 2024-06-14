"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { loginCodefun, verifyCodefun } from "../api";
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
        username_messages: errors.username?._errors,
        password_messages: errors.password?._errors,
      };
    }
    const { username, password } = validatedBody.data;

    const loginCodefunRequest = await loginCodefun(username, password);
    if (!loginCodefunRequest.ok) {
      const error = loginCodefunRequest.error;
      return {
        messages: [error],
      };
    }

    const token = loginCodefunRequest.data;

    const user = await verifyCodefun(token);

    if (!user.ok) {
      console.error(
        "Unexpected error verifying user when logging in: ",
        user.error,
      );
      return {
        messages: [
          "An internal server error occurred. Please try again later.",
        ],
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
    console.error("Unexpected error logging in: ", e);
    return {
      messages: ["An internal server error occurred. Please try again later."],
    };
  }
  const redirectTo = headers().get("X-Redirect-To") ?? "/";
  redirect(redirectTo);
};
