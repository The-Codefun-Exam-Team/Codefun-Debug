import type { Metadata } from "next";
import { cookies } from "next/headers";



export const metadata: Metadata = {
	title: "Problem",
};


const Page = () => {
	const cookiesStore = cookies();
	const token = cookiesStore.get("token");
	if (!token) {
		return <h1>Token not found, please login to try again</h1>
	}
	return (
		<div className="flex h-full w-full items-center self-start">
			{token.value}
		</div>
	)
}

export default Page;
