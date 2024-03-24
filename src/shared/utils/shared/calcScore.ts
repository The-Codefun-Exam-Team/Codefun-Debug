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
  const increasedScore = Math.max(0, submissionScore - problemScore);
  const scorePercentage = increasedScore / (100 - problemScore);

  const diffPercentage = Math.max(0, 1 - ((submissionDiff - minDiff) * 5) / 100);

  const newScore = scorePercentage * diffPercentage * 100;
  return Math.round(newScore * 1e5) / 1e5;
};
