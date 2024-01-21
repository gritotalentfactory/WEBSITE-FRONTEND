// protected routes
"use client";
import Cookies from "js-cookie";
import { NextResponse } from "next/server";

const userData = Cookies.get("userData");
console.log(userData);

export default function middleware(req) {
  let loggedin = req.userData;
  const { pathname } = req.nextUrl;

  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(new URL("/pages/dashboard", req.url));
  }

  if (
    !loggedin &&
    pathname !== "/pages/login" &&
    pathname !== "/pages/signUp"
  ) {
    return NextResponse.redirect(new URL("/pages/signUp", req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
