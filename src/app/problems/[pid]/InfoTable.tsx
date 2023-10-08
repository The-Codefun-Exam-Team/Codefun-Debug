import { clsx, getVerdictTextClass } from "@utils/shared";

import { DecoratedLink } from "@/components";
import {
  BookOpenIcon,
  CheckIcon,
  DocumentTextIcon,
  LanguageIcon,
  SolidDownIcon,
} from "@/components/icon";
import { type Results, ResultsEnum } from "@/shared/types";

import type { ProblemData } from "./types";

export const InfoTable = ({ data, pid }: { data: ProblemData; pid: string }) => {
  const verdicts = Object.keys(ResultsEnum)
    .filter((v) => isNaN(Number(v)))
    .map(
      (verdict) =>
        ({
          verdict: verdict,
          count: 0,
        }) as { verdict: Results; count: number },
    );

  data.judge.tests.forEach((test) => {
    verdicts[ResultsEnum[test.verdict]].count += 1;
  });

  return (
    <>
      <table className="w-full table-auto border-separate border-spacing-x-2 border-spacing-y-4 rounded-md border-2 border-slate-500 dark:border-slate-600">
        <thead>
          <tr>
            {data.best_score < 100 ? (
              data.best_score === -1 ? (
                <th
                  className="font-norma border-b-[1px] border-slate-300 pb-8 pt-6 text-2xl font-medium dark:border-slate-500"
                  colSpan={2}
                >
                  Login to view score
                </th>
              ) : (
                <th
                  className="border-b-[1px] border-slate-300 pb-8 pt-6 text-2xl font-normal text-green-600 dark:border-slate-500 dark:text-green-500"
                  colSpan={2}
                >
                  Highest score: {data.best_score}
                </th>
              )
            ) : (
              <th
                className="border-b-[1px] border-slate-300 pb-8 pt-6 text-2xl font-bold text-green-600 dark:border-slate-500 dark:text-green-500"
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
              className={clsx(
                "rounded-md text-left text-lg font-semibold text-slate-700 dark:text-slate-400",
                "divide-y-[1px] divide-slate-300 border-[1px] border-slate-300 dark:divide-slate-600 dark:border-slate-600",
                "[&>div]:p-2",
              )}
            >
              <div>
                <BookOpenIcon className="relative bottom-[3px] inline h-6 w-6" /> Problem: {pid}
              </div>
              <div>
                <DocumentTextIcon className="relative bottom-[3px] inline h-6 w-6" /> Statement:{" "}
                <DecoratedLink
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://codefun.vn/problems/${data.problem.pid}`}
                >
                  {data.problem.code}
                </DecoratedLink>
              </div>
              <div>
                <LanguageIcon className="relative bottom-[3px] inline h-6 w-6" /> Language:{" "}
                {data.language}
              </div>
              <div>
                <input type="checkbox" id="verdict-dropdown" className="peer sr-only" />
                <label
                  className={clsx(
                    "block h-fit cursor-pointer select-none peer-checked:[&>svg:nth-child(2)]:-rotate-180",
                    "[&>#verdict-dropdown-arrow]:border-transparent peer-focus:[&>#verdict-dropdown-arrow]:border-slate-600",
                  )}
                  htmlFor="verdict-dropdown"
                >
                  <CheckIcon className="relative bottom-[3px] inline h-6 w-6" /> Verdicts
                  <SolidDownIcon className="relative bottom-[1px] ml-1 inline-block h-5 w-5 fill-slate-700 stroke-slate-700 transition-all duration-300 dark:fill-slate-400 dark:stroke-slate-400" />
                </label>
                <div className="invisible max-h-0 overflow-y-hidden transition-all duration-200 ease-in-out peer-checked:visible peer-checked:max-h-40">
                  <ul className="ml-3 mt-1 list-inside list-disc">
                    {verdicts.map(
                      ({ verdict, count }) =>
                        count !== 0 && (
                          <li key={`verdict-${verdict}`} className={getVerdictTextClass(verdict)}>
                            {verdict}: {count}
                          </li>
                        ),
                    )}
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
