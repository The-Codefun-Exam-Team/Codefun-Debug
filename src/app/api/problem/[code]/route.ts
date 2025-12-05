import { NextResponse } from "next/server";

import { getProblem } from "@/features/problems";

export const GET = async (
  _req: Request,
  props: { params: Promise<{ code: string }> },
) => {
  const params = await props.params;

  const { code } = params;

  try {
    const problemQuery = await getProblem(code);
    if (!problemQuery.ok) {
      return NextResponse.json(
        { error: problemQuery.message },
        { status: problemQuery.status },
      );
    }
    return NextResponse.json({ data: problemQuery.data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
