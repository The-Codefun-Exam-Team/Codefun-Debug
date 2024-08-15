import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params: { username } }: { params: { username: string } },
) => {
  try {
    const resData = {} as Record<string, number>;
    const stats = await prisma.debugSubmissions.findMany({
      where: {
        user: {
          username,
        },
        is_best: true,
      },
      select: {
        debugProblem: {
          select: {
            debugProblemCode: true,
          },
        },
        score: true,
      },
    });
    const debugProblemCodes = await prisma.debugProblems.findMany({
      select: {
        debugProblemCode: true,
      },
      orderBy: {
        debugProblemCode: "asc",
      },
    });
    for (const { debugProblemCode } of debugProblemCodes) {
      resData[debugProblemCode] = 0;
    }
    for (const {
      debugProblem: { debugProblemCode },
      score,
    } of stats) {
      resData[debugProblemCode] = score.toNumber();
    }
    return NextResponse.json(resData, { status: 200 });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.error(e.code, e.message);
      return NextResponse.json(
        { error: e.message },
        { status: parseInt(e.code) },
      );
    } else {
      console.error(e);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
};
