import { getUserInfo } from "@utils/api/getUserInfo";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// TODO: add logging
export const GET = async () => {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      return NextResponse.json(null, {
        status: 200,
      });
    }
    const userInfo = await getUserInfo(token.value);
    if (!userInfo.ok) {
      const { error, status } = userInfo;
      return NextResponse.json({ error }, { status });
    }
    return NextResponse.json(userInfo.user, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
