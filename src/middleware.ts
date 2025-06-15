import { NextRequest, NextResponse } from "next/server";
import { publicRoutes, DEFAULT_LOGIN_REDIRECT, authRoutes } from "../route";
import { pathToRegexp } from "path-to-regexp";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access_token")?.value;
  let isInvalidToken = false;

  const { pathname } = req.nextUrl;
  console.log("Pathname:", pathname);

  const publicRoutePatterns = publicRoutes.map((path) => pathToRegexp(path));
  const isPublicRoute = publicRoutePatterns.some((route) => route.regexp.test(pathname));
  const isAuthRoute = authRoutes.includes(pathname);

  // console.log("isPublicRoute:", isPublicRoute);
  // console.log("isAuthRoute:", isAuthRoute);

  if (isAuthRoute && access_token) {
    // console.log("Handling Auth Route: Logged-in user detected");
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  if (!access_token && !isPublicRoute) {
    console.log("Handling Unauthorized Access", isPublicRoute);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (access_token) {
    try {
      const decoded: { exp: number } = jwtDecode(access_token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < now) {
        // console.log("Token has expired");
        isInvalidToken = true;
        // console.log(access_token);
      }
    } catch (error) {
      console.error("Invalid access token:", error);
    }
  }

  if (isInvalidToken) {
    const isOnLoginPage = pathname.startsWith("/auth/login");
    if (!isOnLoginPage) {
      // console.log("Redirecting to login due to invalid token");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // console.log("Allowing Access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:jpg|svg|jpeg|png|webp)$).*)"],
};
