import type { NavLinkEntry } from "./types";

// keep the struture for further development of public pages
export const SIGNED_IN_LINKS = [
  {
    title: "Problems",
    url: "/problems/all/1",
  },
  {
    title: "Submissions",
    url: "/submissions/all/1",
  },
  {
    title: "Rankings",
    url: "/rankings/0/1",
  },
] satisfies NavLinkEntry[];

export const SIGNED_OUT_LINKS = [
  {
    title: "Problems",
    url: "/problems/all/1",
  },
  {
    title: "Submissions",
    url: "/submissions/all/1",
  },
  {
    title: "Rankings",
    url: "/rankings/0/1",
  },
] satisfies NavLinkEntry[];

export const ADDITIONAL_LINKS = [
  {
    url: "/about",
    title: "About us",
  },
] satisfies NavLinkEntry[];

export { WITH_PUBLIC_LINKS, WITHOUT_PUBLIC_LINKS } from "@/shared/constants";
