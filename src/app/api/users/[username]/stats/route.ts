import prisma from "@database/prisma/instance";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params: { username } }: { params: { username: string } },
) => {
  try {
    const resData = {} as Record<string, number>;
    // benchmark required
    const stats = await prisma.$queryRaw<{ code: string; score: number }[]>`
      SELECT MAX(ds.score) AS score, dp.code
      FROM debug_submissions ds 
      JOIN teams tm ON ds.tid = tm.tid 
      JOIN debug_problems dp ON ds.dpid = dp.dpid
      WHERE tm.teamname = ${username}
      GROUP BY ds.dpid
      ORDER BY ds.dpid ASC
    `;
    for (const { code, score } of stats) {
      resData[code] = score;
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
