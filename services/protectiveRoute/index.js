// import Cookies from "js-cookie";
// import { NextResponse } from "next/server";

// export function isAuthenticated() {
//   const userDataCookie = Cookies.get("userData");
//   const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
//   return !!userData; // Convert to boolean
// }

// const protectedRoutes = ["/pages/dashboard"];

// export default function middleware(req) {
//   if (!isAuthenticated() && protectedRoutes.includes(req.nextUrl.pathname)) {
//     // If not authenticated and accessing a protected route, redirect to login
//     const loginURL = new URL("/pages/login", req.nextUrl.origin);
//     return NextResponse.redirect(loginURL.toString());
//   } else {
//     // Otherwise, continue to the requested page
//     return NextResponse.next();
//   }
// }
