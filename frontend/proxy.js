import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/user-profile(.*)',
  '/timetable(.*)',
  '/tasks(.*)',
]);

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about',
  '/pricing',
  '/integrations',
  '/public-routes(.*)',
  '/dashboard-sample(.*)',  // Demo dashboard - no auth required
  '/tasks-sample(.*)',      // Demo tasks - no auth required
  '/timetable-sample(.*)',  // Demo timetable - no auth required
]);

export default clerkMiddleware(async (auth, req) => {
  // Don't protect public routes
  if (!isPublicRoute(req) && isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};