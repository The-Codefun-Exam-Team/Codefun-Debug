import type { Results } from "@/types";

export const getResult = async (score: number, result: Results) => {
  if (score === 100) return "AC";
  return result === "AC" ? "SS" : result;
};
