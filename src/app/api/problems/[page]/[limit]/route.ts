import { NextResponse } from "next/server";

import { getProblems } from "@/features/problems";

export const GET = async (
  _req: Request,
  props: { params: Promise<{ page: string; limit: string }> },
) => {
  const params = await props.params;

  const { page, limit } = params;

  try {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    if (isNaN(pageInt)) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 404 },
      );
    }
    if (isNaN(limitInt)) {
      return NextResponse.json(
        { error: "Invalid limit per page" },
        { status: 404 },
      );
    }
    const problemsQuery = await getProblems(pageInt, limitInt);
    if (!problemsQuery.ok) {
      return NextResponse.json(
        { error: problemsQuery.message },
        { status: problemsQuery.status },
      );
    }
    return NextResponse.json({ data: problemsQuery.data });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
