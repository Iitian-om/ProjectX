import '../styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { isClerkConfigured } from '../lib/clerkUtils';

export default function App({ Component, pageProps }) {
  // If Clerk keys are not configured, render without ClerkProvider
  if (!isClerkConfigured()) {
    if (typeof window === 'undefined') {
      console.warn('Clerk keys not configured. Authentication features will not work.');
    }
    return <Component {...pageProps} />;
  }

  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
