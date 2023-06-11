import { submitSchema } from "@schemas/submitSchema";
import { submitCode } from "@utils/api";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TODO: add logging
export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();
    const validatedBody = await submitSchema.spa(requestBody);
    if (!validatedBody.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const { problem, code } = validatedBody.data;

    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      return NextResponse.json(null, {
        status: 200,
      });
    }
    const submitInfo = await submitCode(token.value, problem, code);
    if (!submitInfo.ok) {
      const { error, status } = submitInfo;
      return NextResponse.json({ error }, { status });
    }
    return NextResponse.json(submitInfo.data, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
