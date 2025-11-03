import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  // Check if Clerk is properly configured
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = publishableKey && !publishableKey.includes('dummy');

  if (!isClerkConfigured) {
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
        <p className="text-textSecondary mt-2">Create your account and start managing time like a pro</p>
      </div>

      {/* Clerk Sign Up Component */}
      <div className="w-full max-w-md">
        <SignUp 
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
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
        />
      </div>

      {/* Additional Links */}
      <div className="mt-8 text-center text-sm text-textSecondary">
        <p>
          Already have an account?{' '}
          <Link href="/sign-in" className="text-accent hover:text-[#B89658] font-semibold">
            Sign in here
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
