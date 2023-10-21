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
    return <div className={clsx(props.className, "font-semibold")}>Not Submitted</div>;
  }

  return (
    // TODO: handle when public submission page available
    <Link
      href={`/submissions/${props.drid}`}
      className={clsx(
        getVerdictTextClass(props.result),
        props.className,
        "float-right block hover:underline",
        props.result === "AC" ? "font-bold" : "font-semibold",
      )}
    >
      {props.result === "AC" ? "Accepted" : props.score.toFixed(2)}
    </Link>
  );
};
