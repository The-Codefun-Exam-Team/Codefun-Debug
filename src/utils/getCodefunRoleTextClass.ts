import type { CodefunRoles } from "@/types";
import { clsx } from "@/utils";

/**
 * Get Codefun role text classNames from user's rank
 *
 * @param role - The user's role in Codefun.
 * @returns
 */
export const getCodefunRoleTextClass = (
  role: CodefunRoles | null | undefined,
) => {
  if (!role) {
    return "font-bold text-black dark:text-white";
  }
  return clsx("font-bold", {
    "text-user-newbie-light dark:text-user-newbie-dark": role === "newbie",
    "text-user-beginner-light dark:text-user-beginner-dark":
      role === "beginner",
    "text-user-novice-light dark:text-user-novice-dark": role === "novice",
    "text-user-coder-light dark:text-user-coder-dark": role === "coder",
    "text-user-expert-light dark:text-user-expert-dark": role === "expert",
    "text-user-master-light dark:text-user-master-dark": role === "master",
    "text-user-hacker-light dark:text-user-hacker-dark": role === "hacker",
    "text-user-banned dark:text-user-banned line-through": role === "banned",
    "text-user-problemsetter dark:text-user-problemsetter":
      role === "problemsetter",
    "text-user-admin-light dark:text-user-admin-dark": role === "admin",
    "text-user-grandmaster-light dark:text-user-grandmaster-dark":
      role === "grandmaster",
  });
};
