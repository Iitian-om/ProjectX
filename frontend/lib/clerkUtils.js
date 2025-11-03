/**
 * Utility functions for Clerk authentication
 */

/**
 * Check if Clerk is properly configured with valid keys
 * @returns {boolean} True if Clerk is configured, false otherwise
 */
export function isClerkConfigured() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(publishableKey && !publishableKey.includes('dummy') && !publishableKey.includes('your_'));
}

/**
 * Placeholder key patterns that indicate unconfigured Clerk
 */
export const CLERK_PLACEHOLDER_PATTERNS = ['dummy', 'your_', 'placeholder'];
