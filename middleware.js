import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the protected routes
const isProtectedRoute = createRouteMatcher([
  '/Founder(.*)',
  '/Cofounder(.*)',
  '/Path(.*)'
]);

// Apply middleware to protect specific routes
export default clerkMiddleware((req, res) => {
  if (isProtectedRoute(req)) {
    // Protect the route if it matches the defined protected routes
    return res.auth().protect();
  }
  // If not a protected route, proceed to the next middleware or handler
  return res.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
