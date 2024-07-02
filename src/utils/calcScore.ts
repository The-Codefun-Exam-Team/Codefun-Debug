export const calcScore = async ({
  problemScore,
  submissionScore,
  minDiff,
  submissionDiff,
}: {
  problemScore: number;
  submissionScore: number;
  minDiff: number;
  submissionDiff: number;
}) => {
  if (submissionScore < problemScore) return 0;
  const reductionPercentage = (Math.max(0, submissionDiff - minDiff) * 5) / 100;
  const newScore =
    ((submissionScore - problemScore) / (100 - problemScore)) *
    Math.max(0, 1 - reductionPercentage);
  return newScore;
};
