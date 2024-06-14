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

const initialState: LoginFormState = {
  user: null,
  username_messages: [],
  password_messages: [],
  messages: [],
};

export const actionLogin = async (
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
  const validatedBody = await loginSchema.spa({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!validatedBody.success) {
    const errors = validatedBody.error.format();
    return {
      ...initialState,
      username_messages: errors.username?._errors ?? [],
      password_messages: errors.password?._errors ?? [],
      messages: errors._errors ?? [],
    };
  }
  const { username, password } = validatedBody.data;

  let token: any;

  try {
    token = await loginCodefun(username, password);
  } catch (e) {
    console.error(e);
    return {
      ...initialState,
      messages: ["An internal server error occurred"],
    };
  }

  if (typeof token !== "string") {
    return {
      ...initialState,
      messages: ["An internal server error occurred"],
    };
  }

  const user = await verifyCodefun(token);

  if (!user.ok) {
    console.error("Error fetching user info");
    return {
      ...initialState,
      messages: [user.error],
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

  const redirectTo = headers().get("X-Redirect-To") ?? "/";

  redirect(redirectTo);
};
