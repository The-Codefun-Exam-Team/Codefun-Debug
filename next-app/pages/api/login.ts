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
	const parsed_login_data = new URLSearchParams(login_data).toString();
	const response = await fetch(
		process.env.CODEFUN_API_URL + "/auth",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: parsed_login_data,
		}
	);

	if (response.status === 200) {
		const { data } = await response.json() as { data: string };
		res.setHeader("Set-Cookie", `token=${data}; path=/auth; HttpOnly; SameSite=Strict`);
		res.status(200).json({ status: "ok" });
	} else {
		const { error } = await response.json() as { error: string };
		res.status(response.status).json({ error: error });
	}
	
}
