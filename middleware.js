import { NextResponse } from "next/server";

export function middleware(request) {
  // 1️⃣ Token cookie se lo
  const token = request.cookies.get("token");

 
  const protectedRoutes = ["/dashboard", "/workspaces", "/clients", "/notes"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workspaces/:path*",
    "/clients/:path*",
    "/notes/:path*",
    "/login",
  ],
};