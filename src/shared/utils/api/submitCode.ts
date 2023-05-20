import type { submitData } from "@schemas/submitSchema";

export const submitCode = async( 
	token: string,
	problemID: string,
	code: string
): Promise<{ok:false,error:string,status:number}|{ok:true,data:submitData}> => {
	const res = await fetch("https://codefun.vn/api/submit", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify({
			problemID,
			code
		})
	});
	const info = await res.json();
	if (!res.ok) {
		return {
			ok: false,
			error: info.error,
			status: res.status,
		};
	}
	return {
		ok: true,
		data: info.data,
	};
}