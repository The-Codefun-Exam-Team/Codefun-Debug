import type { StaticImageData } from "next/image";

import type { TEAM } from "@/features/about";

export type TeamMembers = (typeof TEAM)[number];

export interface ContributorsEntry {
  name: string;
  githubUsername: string | null;
  role: string;
  roleDescription: string;
  image: StaticImageData | null;
}
