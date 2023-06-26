import Link from "next/link";

import type { Results } from "@/shared/types";

import type { ProblemData } from "./types";

export const InfoTable = ({ data, pid }: { data: ProblemData; pid: string }) => {
  const verdicts: Record<Results, number> = {
    AC: 0,
    WA: 0,
    TLE: 0,
    RTE: 0,
    MLE: 0,
    SS: 0,
    CE: 0,
    Q: 0,
    R: 0,
    "...": 0,
  };

  for (const test of data.judge.tests) {
    verdicts[test.verdict] += 1;
  }

  return (
    <>
      <table className="w-full table-auto border-separate border-spacing-x-2 border-spacing-y-4 rounded-md border-2 border-slate-600">
        <thead>
          <tr>
            {data.best_score !== (100 as number) ? (
              <th
                className="border-b-[1px] border-slate-300 pb-8 pt-6 text-2xl font-normal text-green-600"
                colSpan={2}
              >
                Highest score: {data.best_score}{" "}
              </th>
            ) : (
              <th
                className="border-b-[1px] border-slate-300 pb-8 pt-6 text-2xl font-bold text-green-600"
                colSpan={2}
              >
                Accepted
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className="divide-y-2 divide-slate-300 rounded-md border-[2px] border-slate-300 text-left text-lg font-semibold text-slate-700
            [&>div]:p-2 [&>div]:text-center"
            >
              <div className="h-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="relative bottom-[1px] inline-block h-6 w-6"
                >
                  <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                </svg>{" "}
                Problem: {pid}
              </div>
              <div className="h-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="relative bottom-[3px] inline h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
                Statement:{" "}
                {
                  <Link
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://codefun.vn/problems/${data.problem.id}`}
                    className="font-bold text-blue-600 underline hover:font-semibold hover:text-blue-500"
                  >
                    {data.problem.id}
                  </Link>
                }
              </div>
              <div className="h-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="relative bottom-[3px] inline h-6 w-6"
                >
                  <path d="M7.75 2.75a.75.75 0 00-1.5 0v1.258a32.987 32.987 0 00-3.599.278.75.75 0 10.198 1.487A31.545 31.545 0 018.7 5.545 19.381 19.381 0 017 9.56a19.418 19.418 0 01-1.002-2.05.75.75 0 00-1.384.577 20.935 20.935 0 001.492 2.91 19.613 19.613 0 01-3.828 4.154.75.75 0 10.945 1.164A21.116 21.116 0 007 12.331c.095.132.192.262.29.391a.75.75 0 001.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 002.333-5.332c.31.031.618.068.924.108a.75.75 0 00.198-1.487 32.832 32.832 0 00-3.599-.278V2.75z" />
                  <path
                    fill-rule="evenodd"
                    d="M13 8a.75.75 0 01.671.415l4.25 8.5a.75.75 0 11-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 11-1.342-.67l4.25-8.5A.75.75 0 0113 8zm2.037 6.5L13 10.427 10.964 14.5h4.073z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
                Language: {data.language}
              </div>
              <div>
                <input type="checkbox" id="verdict-dropdown" className="peer hidden" />
                <label
                  className="block h-fit cursor-pointer peer-checked:[&>svg:nth-child(2)]:-rotate-180"
                  htmlFor="verdict-dropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="relative bottom-[2px] inline h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>{" "}
                  Verdicts
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#222222"
                    className="relative bottom-[1px] inline-block h-5 w-5 transition-all duration-300"
                  >
                    <path
                      d="M12.1921 9.23047L15.9065 13.6879C16.3408 14.2089 15.9702 15 15.292 15L8.70803 15C8.02976 15 7.65924 14.2089 8.09346 13.6879L11.8079 9.23047C11.9079 9.11053 12.0921 9.11053 12.1921 9.23047Z"
                      fill="#222222"
                    />
                  </svg>
                </label>
                <ul className="max-h-0 overflow-hidden transition-all duration-200 ease-linear peer-checked:max-h-40 [&>li]:py-1 [&>li]:pl-3">
                  {verdicts.AC > 0 && <li className="text-green-600">AC x {verdicts.AC}</li>}
                  {verdicts.WA > 0 && <li className="text-red-600">WA x {verdicts.WA}</li>}
                  {verdicts.MLE > 0 && <li className="text-gray-600">MLE x {verdicts.MLE}</li>}
                  {verdicts.TLE > 0 && <li className="text-yellow-600">TLE x {verdicts.TLE}</li>}
                  {verdicts.RTE > 0 && <li className="text-blue-600">RTE x {verdicts.RTE}</li>}
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
