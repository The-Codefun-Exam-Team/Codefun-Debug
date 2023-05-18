import Link from "next/link";

import type { ProblemData } from "./page";

export const InfoTable = ({ data, pid }: { data: ProblemData; pid: string }) => {
  const verdicts: Record<string, number> = {
    AC: 0,
    WA: 0,
    TLE: 0,
    RTE: 0,
    MLE: 0,
  };
  for (const test of data.judge.tests) {
    verdicts[test.verdict] += 1;
  }

  return (
    <>
      <table className="mx-auto mt-10 w-[95%] table-auto border-collapse self-start">
        <thead>
          <tr>
            <th
              className="border-2 border-slate-600 py-5 text-2xl font-semibold text-slate-700"
              colSpan={2}
            >
              Highest score: {data.best_score}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border-2 border-slate-600 text-lg font-semibold text-slate-700">
              Problem ID
            </th>
            <th className="border-2 border-slate-600 text-lg font-semibold text-slate-700">
              {pid}
            </th>
          </tr>
          <tr>
            <th className="border-2 border-slate-600 text-lg font-semibold text-slate-700">
              Statement
            </th>
            <th className="border-2 border-slate-600 text-lg font-semibold text-slate-700">
              <Link target="_blank" href={"https://codefun.vn/problems/" + data.problem.id}>
                {data.problem.id}
              </Link>
            </th>
          </tr>
          <tr>
            <th className="border-2 border-slate-600 text-lg font-semibold text-slate-700">
              Language
            </th>
            <th className="border-2 border-slate-600 text-lg font-semibold text-slate-700">
              {data.language}
            </th>
          </tr>
          <tr>
            <th className="border-2 border-slate-600 text-lg font-semibold text-slate-700">
              Verdicts
            </th>
            <th className="border-2 border-slate-600 text-lg font-semibold text-slate-700">
              {data.result === "CE" ? (
                "CE"
              ) : (
                <ul>
                  {verdicts.AC === 0 || <li>AC x{verdicts.AC}</li>}
                  {verdicts.WA === 0 || <li>WA x{verdicts.WA}</li>}
                  {verdicts.MLE === 0 || <li>MLE x{verdicts.MLE}</li>}
                  {verdicts.TLE === 0 || <li>TLE x{verdicts.TLE}</li>}
                  {verdicts.RTE === 0 || <li>RTE x{verdicts.RTE}</li>}
                </ul>
              )}
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};
