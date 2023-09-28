import { getUserInfo } from "@utils/api";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const { searchParams, pathname } = request.nextUrl;

  const adminOnlyPrefixes = ["/problems/create"] as const;
  const authenticatedOnlyPrefixes = ["/problems"] as const;
  const unauthenticatedOnlyPrefixes = ["/login", "/public"] as const;

  if (adminOnlyPrefixes.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get("token");
    const userInfo = await getUserInfo(token?.value);
    if (!userInfo.ok || userInfo.user.status !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (authenticatedOnlyPrefixes.some((path) => pathname.startsWith(path))) {
    const providedRedirect = searchParams.get("prev");
    const redirectTo = providedRedirect
      ? decodeURIComponent(providedRedirect)
      : `/public/${pathname}`;

    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  if (unauthenticatedOnlyPrefixes.some((path) => pathname.startsWith(path))) {
    const providedRedirect = searchParams.get("prev");
    if (request.cookies.get("token")) {
      if (pathname.startsWith("/login")) {
        const redirectTo = decodeURIComponent(`%2F${providedRedirect || ""}`);
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
      if (pathname.startsWith("/public")) {
        return NextResponse.redirect(
          new URL(pathname.slice(pathname.indexOf("/", 1)), request.url),
        );
      }
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/problems/:path*", "/login", "/public/:path*"],
};
