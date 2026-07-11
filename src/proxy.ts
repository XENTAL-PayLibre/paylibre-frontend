import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add all the routes that logged-in users should NOT be able to access
const authRoutes = ['/login', '/signup', '/verify-email', '/email-verified', '/forgot-password', '/reset-password'];

// Add all the routes that ONLY logged-in users should be able to access
const protectedRoutes = ['/dashboard'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Client Route Protection ───
  // Gate solely on the first-party session sentinel the frontend sets on login and clears on
  // logout. We must NOT fall back to the backend's refresh cookie: it is HttpOnly and the
  // frontend cannot delete it. pl_session is the one signal we fully control on both login and logout.
  const hasSessionCookie = request.cookies.has('plb_session');

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If the user is logged in and tries to access an Auth route (like /login), redirect to Dashboard
  if (hasSessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If NOT logged in and tries to access a Protected route, redirect to Login
  if (!hasSessionCookie && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    // Optional: save the page they tried to visit so you can redirect them back after they log in
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Ensure the proxy only runs on relevant paths, ignoring static files and Next.js internals
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
