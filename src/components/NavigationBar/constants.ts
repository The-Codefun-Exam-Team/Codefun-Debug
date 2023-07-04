import type { NavLinkEntry } from "./types";

export const SIGNED_IN_LINKS = [
  {
    title: "Submissions",
    url: "/submissions",
  },
  {
    title: "Rankings",
    url: "/rankings/0/1",
  },
  {
    title: "About",
    url: "/about",
  },
] satisfies NavLinkEntry[];

export const SIGNED_OUT_LINKS = [
  {
    title: "Submissions",
    url: "/submissions",
  },
  {
    title: "Rankings",
    url: "/rankings/0/1",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Login",
    url: "/login",
  },
] satisfies NavLinkEntry[];
