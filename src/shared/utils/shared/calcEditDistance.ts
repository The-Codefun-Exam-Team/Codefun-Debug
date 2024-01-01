export const calcEditDistance = async (code1: string, code2: string) => {
  code1 = "#" + code1;
  code2 = "#" + code2;

  const dp = new Array<number>(code1.length);
  const ndp = new Array<number>(code1.length);
  for (let i = 0; i < code1.length; i++) {
    dp[i] = i;
  }
  for (let i = 1; i < code2.length; i++) {
    for (let j = 0; j < code1.length; j++) {
      if (j === 0) {
        ndp[j] = i;
      } else if (code2[i] === code1[j]) {
        ndp[j] = dp[j - 1];
      } else {
        ndp[j] = 1 + Math.min(dp[j - 1], ndp[j - 1], dp[j]);
      }
    }
    for (let j = 0; j < code1.length; j++) {
      dp[j] = ndp[j];
    }
  }

  return dp[code1.length - 1];
};
