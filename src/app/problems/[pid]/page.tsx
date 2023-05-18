import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: "Problem",
};

type Languages = "Python2" | "Python3" | "C++" | "Nasm" | "Go" | "Java" | "Pascal";
type Results = "AC" | "SS" | "WA" | "TLE" | "RTE" | "CE" | "MLE" | "Q" | "R" | "...";
interface Judge {
	correct: number,
	total: number,
	tests: Array<{
		verdict: Results,
		runningTime: number,
		message: string
	}>
}



const ResultsDict: Record<string,string> = {
	AC: "Accepted",
	SS: "Partially Scored",
	WA: "Wrong Answer",
	TLE: "Time Limit Exceeded",
	RTE: "Runtime Error",
	CE: "Compile Error",
	MLE: "Memory Limit Exceeded",
	Q: "In queue",
	R: "To be rejudge",
	"...": "Scoring..."
}


export interface ProblemData {
	bestscore: number;
	code: string
	problem: {
		code: string,
		id: number,
		name: string,
	},
	language: Languages,
	result: Results,
	judge: Judge,
}

const Page = async ({ params: { pid } }: { params: { pid: string } }) => {
	const cookieStore = cookies();
	const token = cookieStore.get("token");
	if (!token) {
		return <h1>Not logged in</h1>;
	}

	const res = await fetch("https://debug.codefun.vn/api/problems/" + pid,
		{
			method: "GET",
			headers: {
				"Authorization": "Bearer " + token.value
			}
		}
	);

	if (!res.ok) {
		// const body = await res.json();
		// TODO: handle fetch error
		return <h1>An internal server error has occured</h1>
	}
	
	const { data } = await res.json() as { data: ProblemData };
	

	return (
		<div className="flex h-full w-full items-center self-start">
			
		</div>
	)
}

export default Page;
