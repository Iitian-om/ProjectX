import { useUser } from '@clerk/nextjs';

/**
 * Custom hook that safely wraps Clerk's useUser hook
 * Returns default values if Clerk is not available
 * @returns {object} User state with isSignedIn, isLoaded, and user properties
 */
export function useSafeUser() {
  try {
    return useUser();
  } catch (error) {
    // ClerkProvider not available, return safe defaults
    return {
      isSignedIn: false,
      isLoaded: true,
      user: null,
    };
  }
}
