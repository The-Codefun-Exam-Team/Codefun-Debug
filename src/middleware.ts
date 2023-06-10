import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  const unauthenticatedOnlyPrefixes = ["/login"] as const;
  const authenticatedOnlyPrefixes = ["/problems", "/submissions", "/rankings"] as const;
  if (
    unauthenticatedOnlyPrefixes.some((path) => pathname.startsWith(path)) &&
    request.cookies.get("token")
  ) {
    const providedRedirect = searchParams.get("prev");
    const redirectTo = decodeURIComponent(providedRedirect ?? "%2Fbeta");
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (
    authenticatedOnlyPrefixes.some((path) => pathname.startsWith(path)) &&
    !request.cookies.get("token")
  ) {
    const providedRedirect = searchParams.get("prev");
    const redirectTo = providedRedirect
      ? decodeURIComponent(providedRedirect)
      : `/beta/login?prev=${encodeURIComponent(pathname)}`;

    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
}

export const config = {
  matcher: ["/problems/:path*", "/submissions/:path*", "/rankings/:path*", "/login"],
};
