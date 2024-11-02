import { NextResponse } from "next/server";
import { z } from "zod";

import { submit } from "@/features/submissions";

const schema = z.object({
  dpCode: z.string(),
  source: z.string(),
});

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const validatedBody = await schema.spa({
      dpCode: formData.get("code"),
      source: formData.get("source"),
    });
    console.log(formData);
    if (!validatedBody.success) {
      return NextResponse.json("Invalid code or source", { status: 404 });
    }
    const { dpCode, source } = validatedBody.data;
    const submitQuery = await submit(dpCode, source);
    if (!submitQuery.ok) {
      return NextResponse.json(submitQuery.message, {
        status: submitQuery.status,
      });
    }
    return NextResponse.json({ data: submitQuery.data });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
