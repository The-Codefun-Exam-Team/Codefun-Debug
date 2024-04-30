export const calcScore = async ({
  submissionScore,
  minDiff,
  submissionDiff,
}: {
  submissionScore: number;
  minDiff: number;
  submissionDiff: number;
}) => {
  const reductionPercentage = (Math.max(0, submissionDiff - minDiff) * 5) / 100;
  const newScore = submissionScore * Math.max(0, 1 - reductionPercentage);
  return newScore;
};
