import type { NavLinkEntry } from "./types";

export const SIGNED_IN_LINKS = [
  {
    title: "Problems",
    url: "/problems",
  },
  {
    title: "Submissions",
    url: "/submissions",
  },
  {
    title: "Rankings",
    url: "/rankings",
  },
  {
    title: "About",
    url: "/about",
  },
] satisfies NavLinkEntry[];

export const SIGNED_OUT_LINKS = [
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Login",
    url: "/login",
  },
] satisfies NavLinkEntry[];
