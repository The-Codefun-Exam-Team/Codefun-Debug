import { Suspense } from "react";

import { Heading } from "@/components";
import type { DetailedSubmissionsInfo } from "@/features/submissions";
import type { SubmissionResult } from "@/types";
import { RESULTS_DICT } from "@/types";
import { getVerdictTextClass } from "@/utils";

import { CodeViewText } from "./CodeViewText";
import { InQueue, RunInfoClient } from "./RunInfoClient";
import { RunInfoCode } from "./RunInfoCode";

const TestResult = ({
  verdict,
  runningTime,
  message,
  count,
}: {
  verdict: SubmissionResult;
  runningTime: number;
  message: string;
  count: number;
}) => (
  <div className="flex w-full justify-between px-4 py-2 odd:bg-accent-light/5 even:bg-accent-light/20 dark:odd:bg-accent-dark/5 dark:even:bg-accent-dark/20">
    <div>
      <div className="text-lg font-bold">
        #{count}. Verdict:{" "}
        <span className={getVerdictTextClass(verdict)}>{RESULTS_DICT[verdict]}</span>
      </div>
      <div>{message}</div>
    </div>
    <div>
      Runtime: <span className="font-bold"> {runningTime}s </span>
    </div>
  </div>
);

const JudgeError = ({ type, error }: { type: SubmissionResult; error: string }) => {
  let judgeErrorMessage: string;
  switch (type) {
    case "CE":
      judgeErrorMessage = "Compile Error";
      break;
    default:
      judgeErrorMessage = "Unknown Judge Error";
      break;
  }
  return (
    <>
      <Heading type="title">{judgeErrorMessage}</Heading>
      <div className="my-6 whitespace-pre-wrap break-words border-2 border-slate-600 p-2 text-[.9em]">
        {error}
      </div>
    </>
  );
};

export const RunInfo = ({ data }: { data: DetailedSubmissionsInfo }) => {
  const verdictNode =
    data.scoreInfo.result === "Q" ? (
      <InQueue />
    ) : typeof data.judge === "string" ? (
      <JudgeError type={data.scoreInfo.result} error={data.judge} />
    ) : (
      data.judge.tests.map(({ verdict, runningTime, message }, idx) => (
        <TestResult
          key={`runinfo-${data.id}-result-number-${idx}`}
          count={idx + 1}
          verdict={verdict}
          runningTime={runningTime}
          message={message}
        />
      )) ?? <Heading type="title">Unknown verdict, try refreshing.</Heading>
    );

  return (
    <RunInfoClient
      verdictNode={verdictNode}
      codeNode={
        <Suspense fallback={<CodeViewText text="Loading..." />}>
          <RunInfoCode source={data.source} username={data.user.username} />
        </Suspense>
      }
    />
  );
};
