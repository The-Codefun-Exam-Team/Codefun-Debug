import Link from "next/link";

import type { DetailedScoreInfo } from "@/types";
import { clsx, getVerdictTextClass } from "@/utils";

interface ComponentExtraProps {
  className?: string;
  disabled?: boolean;
}

export const Score = (props: DetailedScoreInfo & ComponentExtraProps) => {
  if (props.dsubId === null) {
    return (
      <div className={clsx(props.className, "font-semibold", getVerdictTextClass("CE"))}>
        Not Submitted
      </div>
    );
  }

  return (
    <div
      className={clsx(
        getVerdictTextClass(props.result),
        props.className,
        !props.disabled && "hover:underline",
        props.result === "AC" ? "font-bold" : "font-semibold",
      )}
    >
      <Link href={`/submissions/${props.dsubId}`}>
        {props.result === "AC" ? "Accepted" : props.score.toFixed(5)}
      </Link>
    </div>
  );
};
