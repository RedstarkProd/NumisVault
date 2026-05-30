import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/security";

const protectedPrefixes = [
  "/dashboard",
  "/collection",
  "/coins",
  "/account",
  "/settings",
  "/admin",
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasSessionCookie = Boolean(
    request.cookies.get(SESSION_COOKIE_NAME)?.value,
  );

  if (!hasSessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/collection/:path*",
    "/coins/:path*",
    "/account/:path*",
    "/settings/:path*",
    "/admin/:path*",
  ],
};
