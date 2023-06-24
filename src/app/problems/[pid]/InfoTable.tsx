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
            [&>div]:p-2 "
            >
              <div className="h-fit">Problem: {pid}</div>
              <div className="h-fit">
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
              <div className="h-fit">Language: {data.language}</div>
              <div>
                <input type="checkbox" id="verdict-dropdown" className="peer hidden" />
                <label
                  className="block h-fit cursor-pointer peer-checked:[&>svg]:-rotate-180"
                  htmlFor="verdict-dropdown"
                >
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
                <ul className="max-h-0 list-inside list-disc overflow-hidden transition-all duration-300 ease-in-out peer-checked:max-h-40 [&>li]:py-1 [&>li]:pl-3">
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
