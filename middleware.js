import { NextResponse } from "next/server";

function isAuthenticated(token) {
  return token !== null && token !== undefined;
}

export default function middleware(req) {
  const token = req.cookies.get("tokeny");
  const { pathname } = req.nextUrl;

  // Check if the requested page is the dashboard
  if (pathname === "/pages/dashboard") {
    // If the user is not authenticated, redirect to login page
    if (!isAuthenticated(token)) {
      return NextResponse.redirect(new URL("/pages/login", req.url));
    }
  }

  return NextResponse.next(); // Allow access to other pages
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
