import type { PrivateSubmissionInfo, PublicSubmissionInfo } from "@utils/api/getSubmissionInfo";
import { getVerdictTextClass } from "@utils/shared";

import { Heading } from "@/components";
import { RESULTS_DICT } from "@/shared/constants";
import type { Results } from "@/shared/types";

import { InQueue, RunInfoClient } from "./RunInfoClient";

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
      <div className="my-6 whitespace-pre-wrap break-words border-2 border-slate-600 p-2 text-[.9em]">
        {error}
      </div>
    </>
  );
};

export const RunInfo = ({
  access,
  data,
}:
  | { access: true; data: PrivateSubmissionInfo }
  | { access: false; data: PublicSubmissionInfo }) => {
  const verdictNode =
    data.result === "Q" ? (
      <InQueue />
    ) : typeof data.submission_judge === "string" ? (
      <JudgeError type={data.result} error={data.submission_judge} />
    ) : (
      data.submission_judge.tests.map(({ verdict, runningTime, message }, idx) => (
        <TestResult
          key={`runinfo-${data.drid}-result-number-${idx}`}
          count={idx + 1}
          verdict={verdict}
          runningTime={runningTime}
          message={message}
        />
      )) ?? <Heading type="title">Unknown verdict, try refreshing.</Heading>
    );

  return (
    <RunInfoClient
      access={access}
      code={access ? data.codetext : "Not allowed to view the code."}
      verdictNode={verdictNode}
    />
  );
};
