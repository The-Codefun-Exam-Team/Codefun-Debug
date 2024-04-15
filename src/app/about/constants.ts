import type { ContributorsEntry, TeamMembers } from "../../features/about/types";

export const TEAM = [
  "hdp123",
  "kbnopro",
  "unknown1508",
  "minhnhatnoe",
  "ducanhgh",
  "natsukagami",
] as const;

export const CONTRIBUTORS_INFO = {
  hdp123: {
    name: "Ho Dac Phuong",
    githubUsername: null,
    role: "Supervisor",
    roleDescription:
      "Came up with the original idea and gathered the original 3 of our team. Ensures that we don't drag this project out far too long.",
    image: null,
  },
  minhnhatnoe: {
    name: "Nguyen Minh Nhat",
    githubUsername: "minhnhatnoe",
    role: "Sysadmin, DevOps, and Project Manager",
    roleDescription:
      "Designs the API. In charge of the CD workflow and live deployments. Manages the project, including deadlines and external communication.",
    image: null,
  },
  unknown1508: {
    name: "Tran Gia Huy",
    githubUsername: "Unknown15082",
    role: "Backend Developer and Database Admistrator",
    roleDescription: "Implements the API's functions; designs and maintains the database.",
    image: null,
  },
  kbnopro: {
    name: "Bui Tuan Khanh",
    githubUsername: "kbnopro",
    role: "Frontend Developer",
    roleDescription:
      "Designs the UI and decides the API's functions, tests it and writes documentation for it.",
    image: null,
  },
  natsukagami: {
    name: "Natsu Kagami",
    githubUsername: "natsukagami",
    role: "Server Provider",
    roleDescription:
      "Allows us to use his APIs and hosts our website as a subdomain of his (codefun.vn).",
    image: null,
  },
  ducanhgh: {
    name: "Ngo Duc Anh",
    githubUsername: "DuCanhGH",
    role: "Frontend Supervisor",
    roleDescription:
      "Organizes frontend's repository and ensures that the codebase is legible and consistent.",
    image: null,
  },
} satisfies Record<TeamMembers, ContributorsEntry>;

export const CONTRIBUTORS_LIST = Object.entries(CONTRIBUTORS_INFO);
