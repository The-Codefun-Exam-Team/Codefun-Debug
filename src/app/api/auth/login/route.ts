import { loginSchema } from "@schemas/loginSchema.js";
import { getUserInfo } from "@utils/api/getUserInfo.js";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TODO: add logging
export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();
    const validatedBody = await loginSchema.spa(requestBody);
    if (!validatedBody.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const { username, password } = validatedBody.data;
    const params = new URLSearchParams({
      username,
      password,
    });
    const reqToCodefun = await fetch("https://codefun.vn/api/auth", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const codefunResponse = await reqToCodefun.json();
    if (!reqToCodefun.ok) {
      return NextResponse.json({ error: codefunResponse.error }, { status: reqToCodefun.status });
    }
    const userInfo = await getUserInfo(codefunResponse.data);
    if (!userInfo.ok) {
      const { error, status } = userInfo;
      return NextResponse.json({ error }, { status });
    }
    const res = NextResponse.json(userInfo.user);
    res.cookies.set({
      name: "token",
      value: codefunResponse.data,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
