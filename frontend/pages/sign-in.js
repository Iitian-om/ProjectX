import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
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
