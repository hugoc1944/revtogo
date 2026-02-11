import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin routes
  if (!pathname.startsWith("/revtogo-admin")) {
    return NextResponse.next();
  }

  // Allow login page & admin APIs
  if (
    pathname === "/revtogo-admin/login" ||
    pathname.startsWith("/revtogo-admin/api")
  ) {
    return NextResponse.next();
  }

  const session = req.cookies.get("revtogo_admin_session");

  if (!session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/revtogo-admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/revtogo-admin/:path*"],
};
