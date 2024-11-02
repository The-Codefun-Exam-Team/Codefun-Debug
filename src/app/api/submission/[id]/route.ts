import { NextResponse } from "next/server";

import { getSubmission } from "@/features/submissions";

export const GET = async (
  _req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const idInt = parseInt(id);
    if (isNaN(idInt)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 404 });
    }
    const submission = await getSubmission(idInt);
    if (!submission.ok) {
      return NextResponse.json(
        { error: submission.message },
        { status: submission.status },
      );
    }
    return NextResponse.json({ data: submission.data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
