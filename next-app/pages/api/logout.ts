import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.setHeader("Set-Cookie", "token=\"\"}; path=/auth; HttpOnly; SameSite=Strict");
	res.status(200).json({status:"logged out"});    
}