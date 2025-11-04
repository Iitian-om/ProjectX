import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { isClerkConfigured } from '../lib/clerkUtils';

export default function SignInPage() {
  // Check if Clerk is properly configured
  if (!isClerkConfigured()) {
    return (
      <div className="min-h-screen bg-background text-textPrimary flex flex-col items-center justify-center py-12 px-6">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold hover:text-accent transition-colors">
            <span className="text-accent">ProjectX</span>
          </Link>
        </div>
        <div className="w-full max-w-md bg-surface border border-highlight rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Not Configured</h2>
          <p className="text-textSecondary mb-6">
            Clerk authentication is not yet set up. Please configure your Clerk keys in the environment variables.
          </p>
          <Link href="/" className="inline-block text-accent hover:text-[#B89658] font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col items-center justify-center py-12 px-6">
      {/* Logo/Brand at top */}
      <div className="mb-8 text-center">
        <Link href="/" className="text-3xl font-bold hover:text-accent transition-colors">
          <span className="text-accent">ProjectX</span>
        </Link>
        <p className="text-textSecondary mt-2">Welcome back! Sign in to your account</p>
      </div>

      {/* Clerk Sign In Component */}
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-surface border border-highlight shadow-xl",
              headerTitle: "text-textPrimary",
              headerSubtitle: "text-textSecondary",
              socialButtonsBlockButton: "border-highlight hover:border-accent",
              formButtonPrimary: "bg-accent hover:bg-[#B89658]",
              footerActionLink: "text-accent hover:text-[#B89658]",
              formFieldInput: "bg-background border-highlight text-textPrimary",
              formFieldLabel: "text-textPrimary",
              identityPreviewText: "text-textPrimary",
              identityPreviewEditButton: "text-accent",
            }
          }}
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
        />
      </div>

      {/* Additional Links */}
      <div className="mt-8 text-center text-sm text-textSecondary">
        <p>
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-accent hover:text-[#B89658] font-semibold">
            Sign up here
          </Link>
        </p>
        <div className="mt-4 flex gap-4 justify-center">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span>•</span>
          <Link href="/public-routes/privacy" className="hover:text-accent transition-colors">
            Privacy
          </Link>
          <span>•</span>
          <Link href="/public-routes/terms" className="hover:text-accent transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
