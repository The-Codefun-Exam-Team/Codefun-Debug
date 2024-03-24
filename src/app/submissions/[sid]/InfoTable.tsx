import Link from "next/link";

import { DecoratedLink, Score } from "@/components";
import {
  BookOpenIcon,
  ClockIcon,
  DocumentTextIcon,
  LanguageIcon,
  LinkIcon,
  UserIcon,
} from "@/components/icon";
import type { SubmissionInfo } from "@/features/submissions/types";

export const InfoTable = ({ data }: { data: SubmissionInfo }) => {
  const subDate = new Date(data.submit_time * 1000);
  return (
    <table className="w-full table-auto border-separate border-spacing-x-2 border-spacing-y-4 rounded-md border-2 border-slate-500 dark:border-slate-600">
      <thead>
        <tr>
          <th>
            <Score {...data} className="pb-4 pt-5 text-2xl" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="divide-y-[1px] divide-slate-400 rounded-md border-[1px] border-slate-400 text-left text-lg font-semibold text-slate-700 dark:divide-slate-600 dark:border-slate-600 dark:text-slate-200 [&>div]:p-2 [&>div]:text-left">
            <div>
              <UserIcon className="relative bottom-[3px] inline h-6 w-6" /> Owner:{" "}
              <Link target="_blank" href={`https://codefun.vn/profile/${data.user.tid}`}>
                {data.user.name}
              </Link>
            </div>
            <div>
              <BookOpenIcon className="relative bottom-[1px] inline h-6 w-6" /> Problem:{" "}
              <DecoratedLink href={`/problems/${data.debug_problem.code}`}>
                {data.debug_problem.name}
              </DecoratedLink>
            </div>
            <div>
              <LinkIcon className="relative bottom-[3px] inline h-6 w-6" /> Submission ID:{" "}
              {data.drid}
            </div>
            <div>
              <DocumentTextIcon className="relative bottom-[3px] inline h-6 w-6" /> Statement:{" "}
              <DecoratedLink
                target="_blank"
                rel="noreferrer noopener"
                href={`https://codefun.vn/problems/${data.debug_problem.problem.code}`}
              >
                {data.debug_problem.problem.name}
              </DecoratedLink>
            </div>
            <div>
              <LanguageIcon className="relative bottom-[3px] inline h-6 w-6" /> Language:{" "}
              {data.debug_problem.language}
            </div>
            <div>
              <ClockIcon className="relative bottom-[3px] inline h-6 w-6" /> Submit time: {"  "}
              <div className="inline-block">{subDate.toLocaleString("vi-VN")}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
