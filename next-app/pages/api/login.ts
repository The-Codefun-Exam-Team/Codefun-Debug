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
	const login_data = req.body;
	const parsed_login_data = new URLSearchParams(login_data).toString();
	const response = await fetch(
		process.env.API_URL + "/auth",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: parsed_login_data,
		}
	);
	
	if (response.status === 200)
	{
		const { data } = await response.json() as { data: string };
		res.setHeader("Set-Cookie", `token=${data}; path=/; HttpOnly; SameSite=Strict`);
		res.status(200).json({ status: "ok" });

	}
	else
	{
		res.status(response.status).send(response.body);
	}
	
}
