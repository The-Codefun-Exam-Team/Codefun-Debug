import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Handle URL
	const { path } = req.query as { path: Array<string> };
	let url = "";
	if (path[0] === "cdb") {
		// API to debug.codefun.vn
		url = process.env.CDB_API_URL + "/" + path.slice(1).join("/"); 	
	}
	if (path[0] === "cf") {
		// API to codefun.vn
		url = process.env.CODEFUN_API_URL + "/" + path.slice(1).join("/");	
	}

	// Handle query string
	const query = req.query as Record<string, string>; // only handle query string with depth = 1
	delete query.path; // remove path from query
	const queryStr: string = new URLSearchParams(query).toString();
	if (queryStr !== "") {
		url += "?" + queryStr; // add query string to url
	}

	// Handle request body
	const body = req.body;
	const bodyStr: string = new URLSearchParams(body).toString() ;

	// Get the cookie
	const cookie = req.cookies;

	// Fetch the real api
	const response = await fetch(
		url,
		{
			method: req.method,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: bodyStr || undefined,
		}
	);

	// Return response
	res.status(response.status).json({url: url, body: body, cookie: cookie});
}