import { Heading } from "@/components";
import { RESULTS_DICT } from "@/shared/constants";
import type { Results } from "@/shared/types";

import { InQueue, RunInfoClient } from "./RunInfoClient";
import type { RunData, SubmissionsData } from "./types";

const verdictColor = (verdict: Results) => {
  switch (verdict) {
    case "AC":
      return "text-green-500";
    case "WA":
      return "text-red-500";
    default:
      return "text-accent-light";
  }
};

const TestResult = ({
  verdict,
  runningTime,
  message,
  count,
}: {
  verdict: Results;
  runningTime: number;
  message: string;
  count: number;
}) => (
  <div className="flex w-full justify-between px-4 py-2 odd:bg-accent-light/5 even:bg-accent-light/20 dark:odd:bg-accent-dark/5 dark:even:bg-accent-dark/20">
    <div>
      <div className="text-lg font-bold">
        #{count}. Verdict: <span className={verdictColor(verdict)}>{RESULTS_DICT[verdict]}</span>
      </div>
      <div>{message}</div>
    </div>
    <div>
      Runtime: <span className="font-bold"> {runningTime}s </span>
    </div>
  </div>
);

const JudgeError = ({ type, error }: { type: Results; error: string }) => {
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
      <pre className="my-6 break-words border-2 border-slate-600 p-2 text-[.9em]">{error}</pre>
    </>
  );
};

export const RunInfo = ({
  sid,
  runData,
}: {
  sid: number;
  runData: RunData;
  submissionData: SubmissionsData;
}) => {
  const verdictNode =
    runData.result === "Q" ? (
      <InQueue />
    ) : typeof runData.judge === "string" ? (
      <JudgeError type={runData.result} error={runData.judge} />
    ) : (
      runData.judge?.tests.map(({ verdict, runningTime, message }, idx) => (
        <TestResult
          key={`runinfo-${sid}-result-number-${idx}`}
          count={idx + 1}
          verdict={verdict}
          runningTime={runningTime}
          message={message}
        />
      )) ?? <Heading type="title">Unknown verdict, try refreshing.</Heading>
    );

  return <RunInfoClient code={runData.code} verdictNode={verdictNode} />;
};
