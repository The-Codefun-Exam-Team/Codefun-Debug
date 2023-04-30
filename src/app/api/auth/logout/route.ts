import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TODO: add logging
export const POST = async (req: NextRequest) => {
  try {
    const token = req.cookies.has("token");
    if (!token) {
      return NextResponse.json({ error: "There is no token in cookies." }, { status: 400 });
    }
    const res = NextResponse.json({ message: "Signed out successfully" }, { status: 200 });
    res.cookies.delete("token");
    return res;
  } catch (err) {
    return NextResponse.json(
      {
        error: "An internal server error occurred.",
      },
      {
        status: 500,
      },
    );
  }
};
