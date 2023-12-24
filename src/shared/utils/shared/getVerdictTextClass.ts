import type { Results } from "@/shared/types";

export const getVerdictTextClass = (verdict: Results) => {
  switch (verdict) {
    case "AC":
      return "text-green-600 dark:text-green-500";
    case "WA":
      return "text-red-600 dark:text-red-500";
    case "RTE":
      return "text-blue-600 dark:text-blue-500";
    case "TLE":
      return "text-yellow-600 dark:text-yellow-500";
    default:
      return "text-slate-600 dark:text-slate-200";
  }
};
