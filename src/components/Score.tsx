import Link from "next/link";

import type { ScoreDisplayInfo } from "@/types";
import { clsx, getVerdictTextClass } from "@/utils";

interface ComponentExtraProps {
  className?: string;
  disabled?: boolean;
}

export const Score = (
  props: { data: ScoreDisplayInfo } & ComponentExtraProps,
) => {
  if (props.data === null) {
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

  const isDisabled = props.disabled || !props.data.debugSubmissionId;
  return (
    <div
      className={clsx(
        getVerdictTextClass(props.data.result),
        props.className,
        !isDisabled && "hover:underline",
        props.data.result === "AC" ? "font-bold" : "font-semibold",
      )}
    >
      <Link
        href={isDisabled ? {} : `/submissions/${props.data.debugSubmissionId}`}
      >
        {props.data.result === "AC" ? "Accepted" : props.data.score.toFixed(2)}
      </Link>
    </div>
  );
};
