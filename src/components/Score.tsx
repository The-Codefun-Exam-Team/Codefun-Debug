import type { ScoreInfoNotNull, ScoreInfoNull } from "@utils/api/getAllProblem";
import { clsx, getVerdictTextClass } from "@utils/shared";
import Link from "next/link";
import type { ComponentPropsWithoutRef, DetailedHTMLProps, HTMLAttributes } from "react";

export type DivProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
>;

export type LinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

export const Score = (props: (DivProps & ScoreInfoNull) | (LinkProps & ScoreInfoNotNull)) => {
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
