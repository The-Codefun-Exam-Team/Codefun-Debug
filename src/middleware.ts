import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getUser } from "@/features/auth/api/getUser";

export const middleware = async (request: NextRequest) => {
  const { searchParams, pathname } = request.nextUrl;
  const adminOnlyPrefixes = ["/problems/create"] as const;
  const authenticatedOnlyPrefixes = [] as const;
  const unauthenticatedOnlyPrefixes = ["/login"] as const;

  if (adminOnlyPrefixes.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get("token");
    const userInfo = await getUser(token?.value);
    if (!userInfo.ok || userInfo.user.status !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (authenticatedOnlyPrefixes.some((path) => pathname.startsWith(path))) {
    const providedRedirect = searchParams.get("prev");
    const redirectTo = providedRedirect
      ? decodeURIComponent(providedRedirect)
      : `/login?prev=${encodeURIComponent(pathname)}`;
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    } else {
      const response = NextResponse.next();
      response.headers.set("X-Redirect-To", redirectTo);
      return response;
    }
  }

  if (unauthenticatedOnlyPrefixes.some((path) => pathname.startsWith(path))) {
    const providedRedirect = searchParams.get("prev");
    const redirectTo = providedRedirect
      ? decodeURIComponent(providedRedirect)
      : "/";
    if (request.cookies.get("token")) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    } else {
      const response = NextResponse.next();
      response.headers.set("X-Redirect-To", redirectTo);
      return response;
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/problems/create", "/login"],
};
