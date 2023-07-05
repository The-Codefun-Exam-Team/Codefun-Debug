import { createProblemSchema } from "@schemas/createProblemSchema";
import { createProblem } from "@utils/api";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();
    const validatedBody = await createProblemSchema.spa(requestBody);
    if (!validatedBody.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const { name, submission_id } = validatedBody.data;

    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      return NextResponse.json(null, {
        status: 200,
      });
    }
    const createProblemInfo = await createProblem(token.value, submission_id, name);
    if (!createProblemInfo.ok) {
      const { error, status } = createProblemInfo;
      return NextResponse.json({ error }, { status });
    }
    return NextResponse.json(createProblemInfo.data, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
};
