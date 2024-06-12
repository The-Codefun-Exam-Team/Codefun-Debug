import Link from "next/link";

import type { ScoreDisplayInfo } from "@/types";
import { clsx, getVerdictTextClass } from "@/utils";

interface ComponentExtraProps {
  className?: string;
  disabled?: boolean;
}

export const Score = (props: ScoreDisplayInfo & ComponentExtraProps) => {
  if (props.score === null) {
    return (
      <div
        className={clsx(
          props.className,
          "font-semibold",
          getVerdictTextClass("CE"),
        )}
      >
        Not Submitted
      </div>
    );
  }

  const isDisabled = props.disabled || !props.debugSubmissionId;
  return (
    <div
      className={clsx(
        getVerdictTextClass(props.result),
        props.className,
        !isDisabled && "hover:underline",
        props.result === "AC" ? "font-bold" : "font-semibold",
      )}
    >
      <Link href={isDisabled ? {} : `/submissions/${props.debugSubmissionId}`}>
        {props.result === "AC" ? "Accepted" : props.score.toFixed(2)}
      </Link>
    </div>
  );
};
