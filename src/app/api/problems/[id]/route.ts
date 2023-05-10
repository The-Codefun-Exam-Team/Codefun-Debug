import { getProblemSchema } from "@schemas/getProblemSchema";
import { getProblemInfo } from "@utils/api/getProblemInfo";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: NextResponse, { params: { id }}: {params: {id:string}} ) => {
	try {
		const requestBody = await req.json();
		const validatedBody = await getProblemSchema.spa(requestBody);
		if (!validatedBody.success) {
			return NextResponse.json({ error: "Invalid request." }, { status: 400 });
		}
		const cookiesStore = cookies();
		const token = cookiesStore.get("token");
		if (!token) {
			return NextResponse.json(null, {
				status: 200,
			})
		}
		const problemInfo = await getProblemInfo(token.value, id);

	} catch (err) {
		return NextResponse.json(
			{
				error: "An internal server error occurred.",
			},
			{
				status: 500,
			}
		)
	}
}