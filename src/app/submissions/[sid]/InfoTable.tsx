import Link from "next/link";

import { DecoratedLink } from "@/components";
import { ClockIcon, DocumentTextIcon, LanguageIcon, LinkIcon, UserIcon } from "@/components/icon";

import type { RunData, SubmissionsData } from "./types";

export const InfoTable = ({
  submissionData,
  runData,
  sid,
}: {
  submissionData: SubmissionsData;
  runData: RunData;
  sid: number;
}) => {
  const subDate = new Date(runData.submitTime * 1000);
  return (
    <table className="w-full table-auto border-separate border-spacing-x-2 border-spacing-y-4 rounded-md border-2 border-slate-600">
      <thead>
        <tr>
          {submissionData.score < 100 ? (
            <th
              className="border-b-[1px] border-slate-300 pb-8 pt-6 text-2xl font-normal text-green-600"
              colSpan={2}
            >
              Debug score: {submissionData.score}
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
            [&>div]:p-2 [&>div]:text-left"
          >
            <div>
              <UserIcon className="relative bottom-[3px] inline h-6 w-6" /> Owner:{" "}
              <Link target="_blank" href={`https://codefun.vn/profile/${runData.owner.id}`}>
                {runData.owner.name}
              </Link>
            </div>
            <div>
              <BookOpenIcon className="relative bottom-[1px] inline h-6 w-6" /> Problem:{" "}
              {submissionData.dpcode}
            </div>
            <div>
              <LinkIcon className="relative bottom-[3px] inline h-6 w-6" /> Submission ID: {sid}
            </div>
            <div>
              <DocumentTextIcon className="relative bottom-[3px] inline h-6 w-6" /> Statement:{" "}
              {
                <DecoratedLink
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://codefun.vn/problems/${runData.problem.id}`}
                >
                  {runData.problem.id}
                </DecoratedLink>
              }
            </div>
            <div>
              <LanguageIcon className="relative bottom-[3px] inline h-6 w-6" /> Language:{" "}
              {runData.language}
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
