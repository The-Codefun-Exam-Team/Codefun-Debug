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
    <table className="w-full table-auto border-separate border-spacing-x-2 border-spacing-y-4 rounded-md border-2 border-slate-600">
      <thead>
        <tr>
          {submissionData.edit_score < 100 ? (
            <th
              className="border-b-[1px] border-slate-300 pb-8 pt-6 text-2xl font-normal text-green-600"
              colSpan={2}
            >
              Debug score: {submissionData.edit_score}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="relative bottom-[3px] inline h-6 w-6"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>{" "}
              Owner:{" "}
              <Link target="_blank" href={`https://codefun.vn/profile/${runData.owner.id}`}>
                {runData.owner.name}
              </Link>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="relative bottom-[3px] inline h-6 w-6"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>{" "}
              Submission ID: {sid}
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="relative bottom-[3px] inline h-6 w-6"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              Statement:{" "}
              {
                <Link
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://codefun.vn/problems/${runData.problem.id}`}
                  className="font-bold text-blue-600 underline hover:font-semibold hover:text-blue-500"
                >
                  {runData.problem.id}
                </Link>
              }
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="relative bottom-[3px] inline h-6 w-6"
                aria-hidden
              >
                <path d="M7.75 2.75a.75.75 0 00-1.5 0v1.258a32.987 32.987 0 00-3.599.278.75.75 0 10.198 1.487A31.545 31.545 0 018.7 5.545 19.381 19.381 0 017 9.56a19.418 19.418 0 01-1.002-2.05.75.75 0 00-1.384.577 20.935 20.935 0 001.492 2.91 19.613 19.613 0 01-3.828 4.154.75.75 0 10.945 1.164A21.116 21.116 0 007 12.331c.095.132.192.262.29.391a.75.75 0 001.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 002.333-5.332c.31.031.618.068.924.108a.75.75 0 00.198-1.487 32.832 32.832 0 00-3.599-.278V2.75z" />
                <path
                  fillRule="evenodd"
                  d="M13 8a.75.75 0 01.671.415l4.25 8.5a.75.75 0 11-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 11-1.342-.67l4.25-8.5A.75.75 0 0113 8zm2.037 6.5L13 10.427 10.964 14.5h4.073z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              Language: {runData.language}
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="relative bottom-[2px] inline h-6 w-6"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
              Submit time: {"  "}
              <div className="inline-block">{subDate.toLocaleString("vi-VN")}</div>
            </div>
          </td>
        </tr>
        {/* <tr>
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
        </tr> */}
      </tbody>
    </table>
  );
};
