import { Suspense } from "react";

import { DecoratedLink } from "@/components";
import {
  BookOpenIcon,
  CheckIcon,
  DocumentTextIcon,
  LanguageIcon,
  SolidDownIcon,
} from "@/components/icon";
import { getMemoProblem } from "@/features/problems";
import type { SubmissionResult } from "@/types";
import { RESULTS_DICT } from "@/types";
import type { Judge } from "@/utils";
import { clsx, getVerdictTextClass } from "@/utils";

import { InfoTableScore, InfoTableScoreSkeleton } from "./Score";

const verdictsList = (judge: Judge | string) => {
  if (typeof judge === "string") {
    return (
      <div>
        <input type="checkbox" id="verdict-dropdown" className="peer sr-only" />
        <label
          className={clsx(
            "block h-fit cursor-pointer select-none peer-checked:[&>svg:nth-child(2)]:-rotate-180",
            "[&>#verdict-dropdown-arrow]:border-transparent peer-focus:[&>#verdict-dropdown-arrow]:border-slate-600",
          )}
          htmlFor="verdict-dropdown"
        >
          <CheckIcon className="relative bottom-[3px] inline size-6" /> Verdicts
          <SolidDownIcon className="relative bottom-px ml-1 inline-block size-5 fill-slate-700 stroke-slate-700 transition-all duration-300 dark:fill-slate-400 dark:stroke-slate-400" />
        </label>
        <div className="invisible max-h-0 overflow-y-hidden transition-all duration-200 ease-in-out peer-checked:visible peer-checked:max-h-40">
          <ul className="ml-3 mt-1 list-inside list-disc">
            <li className={getVerdictTextClass("CE")}>CE</li>
          </ul>
        </div>
      </div>
    );
  }

  const verdictsEntries = Object.entries(RESULTS_DICT);
  const verdicts = verdictsEntries.map(
    ([key, _value]) =>
      ({ verdict: key, count: 0 }) as {
        verdict: SubmissionResult;
        count: number;
      },
  );
  const verdictsIndex = Object.fromEntries(
    verdictsEntries.map(([key, _value], index) => [key, index]),
  );
  judge.tests.forEach((test) => {
    verdicts[verdictsIndex[test.verdict]].count += 1;
  });

  return (
    <div>
      <input type="checkbox" id="verdict-dropdown" className="peer sr-only" />
      <label
        className={clsx(
          "block h-fit cursor-pointer select-none peer-checked:[&>svg:nth-child(2)]:-rotate-180",
          "[&>#verdict-dropdown-arrow]:border-transparent peer-focus:[&>#verdict-dropdown-arrow]:border-slate-600",
        )}
        htmlFor="verdict-dropdown"
      >
        <CheckIcon className="relative bottom-[3px] inline size-6" /> Verdicts
        <SolidDownIcon className="relative bottom-px ml-1 inline-block size-5 fill-slate-700 stroke-slate-700 transition-all duration-300 dark:fill-slate-400 dark:stroke-slate-400" />
      </label>
      <div className="invisible max-h-0 overflow-y-hidden transition-all duration-200 ease-in-out peer-checked:visible peer-checked:max-h-40">
        <ul className="ml-3 mt-1 list-inside list-disc">
          {verdicts.map(
            ({ verdict, count }) =>
              count !== 0 && (
                <li
                  key={`verdict-${verdict}`}
                  className={getVerdictTextClass(verdict)}
                >
                  {verdict}: {count}
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  );
};

export const InfoTable = async ({ code }: { code: string }) => {
  const query = await getMemoProblem(code);
  return (
    <>
      <table className="w-full table-auto border-separate border-spacing-x-2 border-spacing-y-4 rounded-md border-2 border-slate-500 dark:border-slate-600">
        <thead>
          <tr>
            <th>
              <Suspense fallback={<InfoTableScoreSkeleton />}>
                <InfoTableScore problemId={query.id} />
              </Suspense>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className={clsx(
                "rounded-md text-left text-lg font-semibold text-slate-600 dark:text-slate-200",
                "divide-y divide-slate-300 border border-slate-300 dark:divide-slate-600 dark:border-slate-600",
                "[&>div]:p-2",
              )}
            >
              <div>
                <BookOpenIcon className="relative bottom-[3px] inline size-6" />{" "}
                Problem: {query.debugProblemCode}
              </div>
              <div>
                <DocumentTextIcon className="relative bottom-[3px] inline size-6" />{" "}
                Statement:{" "}
                <DecoratedLink
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://codefun.vn/problems/${query.statement.code}`}
                >
                  {query.statement.name}
                </DecoratedLink>
              </div>
              <div>
                <LanguageIcon className="relative bottom-[3px] inline size-6" />{" "}
                Language: {query.language}
              </div>
              {verdictsList(query.judge)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

InfoTable.preload = getMemoProblem;
