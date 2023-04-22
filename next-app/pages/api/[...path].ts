import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body;
	const parsed_body = new URLSearchParams(body).toString();
	const { path } = req.query as { path: string };
	
	// const response = await fetch(

	// )
	res.status(200).json({pathname:path});;    
}