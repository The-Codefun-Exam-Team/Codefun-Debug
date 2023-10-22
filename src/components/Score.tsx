import type { ScoreInfo } from "@utils/api/getAllProblem";
import { clsx, getVerdictTextClass } from "@utils/shared";
import Link from "next/link";

interface ComponentExtraProps {
  className?: string;
}

export const Score = (props: ScoreInfo & ComponentExtraProps) => {
  if (props.drid === null) {
    return (
      <div className={clsx(props.className, "font-semibold", getVerdictTextClass("CE"))}>
        Not Submitted
      </div>
    );
  }

  return (
    // TODO: handle when public submission page available
    <div
      className={clsx(
        getVerdictTextClass(props.result),
        props.className,
        "hover:underline",
        props.result === "AC" ? "font-bold" : "font-semibold",
      )}
    >
      <Link href={`/submissions/${props.drid}`}>
        {props.result === "AC" ? "Accepted" : props.score.toFixed(5)}
      </Link>
    </div>
  );
};
