/**
 * An array of routes that are accessible to the public
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/verify-email/:token", "/auth/forgot-password", "/auth/reset-password/:token", "/home"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/home";

/**
 * An array of routes that are not accessible before email verified
 * There routes will redirect user to profile for verification
 */

export const verifiedUserRoutes = ["/cart", "/product/", "/history"];
