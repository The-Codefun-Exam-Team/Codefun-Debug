import type { contributorsEntry } from "./type";

export const CONTRIBUTORS = [
  {
    name: "Ho Dac Phuong",
    github_username: null,
    role: "Supervisor",
    role_description:
      "The original idea of this webpage belongs to Mr. Ho Dac Phuong, teacher at High school for Gifted Students, Hanoi University of Science. He is also the one who formed our team. ",
  },
  {
    name: "Nguyen Minh Nhat",
    github_username: "minhnhatnoe",
    role: "Sysadmin, DevOps, and Project Manager",
    role_description:
      "Designs the API. In charge of the CD workflow and live deployments. Manages the project, including deadlines and external communication.",
  },
  {
    name: "Tran Gia Huy",
    github_username: "Unknown15082",
    role: "Backend Developer and Database Admistrator",
    role_description: "Implements API functions. Designs, maintains and migrates database.",
  },
  {
    name: "Bui Tuan Khanh",
    github_username: "kbnopro",
    role: "Frontend Developer",
    role_description:
      "Designs the UI and decide main API functions, tests API and writes API documents.",
  },
  {
    name: "Natsu Kagami",
    github_username: "natsukagami",
    role: "Server provider",
    role_description:
      "Allows us to use his APIs and hosts our website as a subdomain of his (codefun.vn).",
  },
  {
    name: "Ngo Duc Anh",
    github_username: "DuCanhGH",
    role: "Frontend Supervisor",
    role_description:
      "Helps with NextJS, CS,. organizes frontend's repository, as well as ensures code legibility and consistency.",
  },
] satisfies contributorsEntry[];