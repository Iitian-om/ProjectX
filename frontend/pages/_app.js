import '../styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export default function App({ Component, pageProps }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // If Clerk keys are not configured, render without ClerkProvider
  if (!publishableKey || publishableKey.includes('dummy')) {
    console.warn('Clerk keys not configured. Authentication features will not work.');
    return <Component {...pageProps} />;
  }

  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
