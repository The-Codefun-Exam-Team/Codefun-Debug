import { clsx } from "@utils/shared";

import { DecoratedLink } from "@/components";
import {
  BookOpenIcon,
  CheckIcon,
  DocumentTextIcon,
  LanguageIcon,
  SolidDownIcon,
} from "@/components/icon";
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
                  <ul className="ml-3 mt-3 list-inside list-disc">
                    {verdicts.AC > 0 && (
                      <li className="text-green-600 dark:text-green-500">{verdicts.AC} AC</li>
                    )}
                    {verdicts.WA > 0 && (
                      <li className="text-red-600 dark:text-red-500">{verdicts.WA} WA</li>
                    )}
                    {verdicts.MLE > 0 && (
                      <li className="text-gray-600 dark:text-gray-500">{verdicts.MLE} MLE</li>
                    )}
                    {verdicts.TLE > 0 && (
                      <li className="text-yellow-600 dark:text-yellow-500">{verdicts.TLE} TLE</li>
                    )}
                    {verdicts.RTE > 0 && (
                      <li className="text-accent-light dark:text-accent-light">
                        {verdicts.RTE} RTE
                      </li>
                    )}
                    {data.judge.total === 0 && <li className="text-gray-600">CE</li>}
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
