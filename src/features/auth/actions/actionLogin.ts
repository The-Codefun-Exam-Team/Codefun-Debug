"use server";

import { cookies } from "next/headers";
import { z } from "zod";

import { getUser, loginCodefun } from "../api";
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
  try {
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

    const token = await loginCodefun(username, password);

    const user = await getUser(token);
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

    return {
      ...initialState,
      user: user.user,
    };
  } catch (e) {
    console.error(e);
    return {
      ...initialState,
      messages: ["An internal server error occurred"],
    };
  }
};
