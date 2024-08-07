import Link from "next/link";

import { DecoratedLink, Score } from "@/components";
import {
  BookOpenIcon,
  ClockIcon,
  LanguageIcon,
  LinkIcon,
  UserIcon,
} from "@/components/icon";
import type { DetailedSubmissionsInfo } from "@/features/submissions";

export const InfoTable = ({ data }: { data: DetailedSubmissionsInfo }) => {
  return (
    <table className="w-full table-auto border-separate border-spacing-x-2 border-spacing-y-4 rounded-md border-2 border-slate-500 dark:border-slate-600">
      <thead>
        <tr>
          <th>
            <Score {...data.scoreInfo} className="pb-4 pt-5 text-2xl" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="divide-y divide-slate-400 rounded-md border border-slate-400 text-left text-lg font-semibold text-slate-700 dark:divide-slate-600 dark:border-slate-600 dark:text-slate-200 [&>div]:p-2 [&>div]:text-left">
            <div>
              <UserIcon className="relative bottom-[3px] inline size-6" />{" "}
              Owner:{" "}
              <Link
                target="_blank"
                href={`https://codefun.vn/profile/${data.user.username}`}
              >
                {data.user.displayName}
              </Link>
            </div>
            <div>
              <BookOpenIcon className="relative bottom-px inline size-6" />{" "}
              Problem:{" "}
              <DecoratedLink
                href={`/problems/${data.debugProblem.debugProblemCode}`}
              >
                {data.debugProblem.debugProblemCode}
              </DecoratedLink>
            </div>
            <div>
              <LinkIcon className="relative bottom-[3px] inline size-6" />{" "}
              Submission ID: {data.id}
            </div>
            <div>
              <LanguageIcon className="relative bottom-[3px] inline size-6" />{" "}
              Language: {data.debugProblem.language}
            </div>
            <div>
              <ClockIcon className="relative bottom-[3px] inline size-6" />{" "}
              {/* Submit time: {"  "} */}
              {/* <div className="inline-block">
                {data.submitTime.toLocaleString("vi-VN")}
              </div> */}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
