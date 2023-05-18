import { z } from "zod";

export const getProblemSchema = z.object({
	id: z.string().startsWith("D"),
})

export type sus = z.infer<typeof getProblemSchema>;

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



export const resultDict: Record<string,string> = {
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