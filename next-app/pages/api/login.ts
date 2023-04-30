import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Proxy to save user's token from server as html-only cookie
 * @param req 
 * @param res 
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const login_data: { username:string , password: string } = req.body;
	const stringified_login_data = new URLSearchParams(login_data).toString();
	const response = await fetch(
		process.env.CODEFUN_API_URL + "/auth",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: stringified_login_data,
		}
	);

	if (response.ok) {
		const { data } = await response.json() as { data: string };
		res.setHeader("Set-Cookie", `token=${data}; path=/; HttpOnly; SameSite=Strict`);
		res.status(200).json({ status: "ok" });
	} else {
		const { error } = await response.json() as { error: string };
		res.status(response.status).json({ error: error });
	}
	
}
