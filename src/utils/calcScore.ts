import { Decimal } from "@prisma/client/runtime/library";

export const calcScore = ({
  problemScore,
  submissionScore,
  minDiff,
  submissionDiff,
}: {
  problemScore: Decimal;
  submissionScore: Decimal;
  minDiff: number;
  submissionDiff?: number;
}) => {
  if (submissionDiff === undefined) return new Decimal(0);
  if (submissionScore.lessThan(problemScore)) return new Decimal(0);
  const reductionPercentage = Math.max(
    0,
    1 - (Math.max(0, submissionDiff - minDiff) * 5) / 100,
  );
  const newScore = submissionScore
    .minus(problemScore)
    .dividedBy(new Decimal(100).minus(problemScore))
    .mul(reductionPercentage)
    .mul(100);

  return newScore;
};
