import type { CodefunRoles } from "@/types";
/**
 * Get Codefun rank from user's ratio
 *
 * @param ratio - The user's current ratio.
 * @param status - The user's current status.
 * @returns The user's role in Codefun.
 */
export const getCodefunRole = (ratio: number, status: string): CodefunRoles | null => {
  if (status === "Banned") {
    return "banned";
  }
  if (status === "Admin") {
    return "admin";
  }
  if (ratio >= 0.9) {
    return "grandmaster";
  }
  if (ratio >= 0.55) {
    return "hacker";
  }
  if (ratio >= 0.3755) {
    return "master";
  }
  if (ratio >= 0.25) {
    return "expert";
  }
  if (ratio >= 0.1) {
    return "coder";
  }
  if (ratio >= 0.05) {
    return "novice";
  }
  if (ratio >= 0.02) {
    return "beginner";
  }
  return "newbie";
};
