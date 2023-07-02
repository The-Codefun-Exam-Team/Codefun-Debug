import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  const unauthenticatedOnlyPrefixes = ["/login"] as const;
  const authenticatedOnlyPrefixes = ["/problems/"] as const;

  if (unauthenticatedOnlyPrefixes.some((path) => pathname.startsWith(path))) {
    const redirectTo = decodeURIComponent(searchParams.get("prev") ?? "%2Fbeta");

    if (request.cookies.get("token")) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  if (authenticatedOnlyPrefixes.some((path) => pathname.startsWith(path))) {
    const providedRedirect = searchParams.get("prev");
    const redirectTo = providedRedirect
      ? decodeURIComponent(providedRedirect)
      : `/beta/login?prev=${encodeURIComponent(pathname)}`;

    if (!request.cookies.get("token")) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }
}

export const config = {
  matcher: ["/problems/:path", "/login"],
};
