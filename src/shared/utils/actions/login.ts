"use server";

import { loginSchema } from "@schemas/loginSchema";
import { getUserInfo } from "@utils/api";
import { cookies } from "next/headers";

import type { UserData } from "@/shared/types";

export interface LoginFormState {
  user: UserData | null;
  username_messages: string[];
  password_messages: string[];
  messages: string[];
}

const initialState: LoginFormState = {
  user: null,
  username_messages: [],
  password_messages: [],
  messages: [],
};

export const login = async (
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
    const params = new URLSearchParams({
      username,
      password,
    });
    const requestToCodefun = await fetch("https://codefun.vn/api/auth", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "no-store",
    });
    const codefunResponse = await requestToCodefun.json();
    if (!requestToCodefun.ok) {
      return {
        ...initialState,
        messages: [codefunResponse.error],
      };
    }

    const userInfo = await getUserInfo(codefunResponse.data);
    if (!userInfo.ok) {
      console.error("Error fetching user info");
      return {
        ...initialState,
        messages: [userInfo.error],
      };
    }

    cookies().set({
      name: "token",
      value: codefunResponse.data,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return {
      ...initialState,
      user: userInfo.user,
    };
  } catch (e) {
    console.error(e);
    return {
      ...initialState,
      messages: ["An internal server error occurred"],
    };
  }
};
