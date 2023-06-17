import Link from "next/link";

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
    <table className="w-full table-auto border-collapse self-start">
      <thead>
        <tr>
          <th
            className="border-2 border-slate-600 py-6 text-2xl font-semibold text-slate-700"
            colSpan={2}
          >
            Debug score: {submissionData.edit_score}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            Owner
          </th>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            <Link target="_blank" href={`https://codefun.vn/profile/${runData.owner.id}`}>
              {runData.owner.name}
            </Link>
          </th>
        </tr>
        <tr>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            Submission ID
          </th>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            {sid}
          </th>
        </tr>
        <tr>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            Statement
          </th>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            <Link target="_blank" href={"https://codefun.vn/problems/" + runData.problem.id}>
              {runData.problem.id}
            </Link>
          </th>
        </tr>
        <tr>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            Language
          </th>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            {runData.language}
          </th>
        </tr>
        <tr>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            Submit time
          </th>
          <th className="border-2 border-slate-600 py-2 text-lg font-semibold text-slate-700">
            {subDate.toLocaleString("vi-VN")}
          </th>
        </tr>
      </tbody>
    </table>
  );
};
