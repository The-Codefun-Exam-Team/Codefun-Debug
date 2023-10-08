import type { ProblemInfoWithScore } from "@utils/api/getAllProblem";
import { getVerdictTextClass } from "@utils/shared";
import Link from "next/link";
import type { ComponentPropsWithoutRef, DetailedHTMLProps, HTMLAttributes } from "react";

export type DivProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "className" | "ref"
>;

export type LinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "ref">;

export const Score = ({ problemInfo, ...rest }: DivProps | (LinkProps & ProblemInfoWithScore)) => {
  if (problemInfo.drid === null) {
    return <div className="inline-block">Not Submitted</div>;
  }

  return (
    // TODO: handle when public submission page available
    <Link
      href={`submissions/${problemInfo.drid}`}
      className={getVerdictTextClass(problemInfo.result)}
    >
      {problemInfo.result === "AC" ? "Accepted" : problemInfo.score}
    </Link>
  );
};
