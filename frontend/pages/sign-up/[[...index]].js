import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { isClerkConfigured } from '../../lib/clerkUtils';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SignUpPage() {
  // Check if Clerk is properly configured
  if (!isClerkConfigured()) {
    return (
      <>
        <div className="min-h-screen bg-background text-textPrimary flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center py-12 px-6">
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
          <Footer />
        </div>
      </>
    );
  }
  return (
    <div className="bg-background text-textPrimary">
      {/* Navbar */}
      <Navbar />
      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center border">
        {/* Clerk Sign Up Component - centered horizontally with 10px top margin */}
        <div className="mt-2.5 px-8 pb-8 width-full mx-auto">
          <SignUp
            appearance={{
              baseTheme: undefined,
              variables: {
                colorPrimary: '#C9A961',
                colorBackground: '#2A2E35',
                colorInputBackground: '#1F2328',
                colorInputText: '#E8E6E3',
                colorText: '#E8E6E3',
                colorTextSecondary: '#9CA3AF',
                colorDanger: '#EF4444',
                borderRadius: '0.75rem',
              },
              elements: {
                rootBox: "w-full",
                card: "bg-[#2A2E35] border-2 border-[#3D4451] shadow-2xl w-full",
                headerTitle: "text-[#E8E6E3] font-italic text-2xl",
                headerSubtitle: "text-[#9CA3AF]",
                socialButtonsBlockButton: "bg-gradient-to-br from-[#2A2E35] to-[#1F2328] border-2 border-[#C9A961] text-[#E8E6E3] hover:border-[#C9A961] hover:from-[#3D4451] hover:to-[#2A2E35] shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_12px_rgba(201,169,97,0.3),inset_0_2px_4px_rgba(0,0,0,0.2)] transform hover:translate-y-[-2px] transition-all duration-200",
                socialButtonsBlockButtonText: "text-[#E8E6E3] font-semibold",
                socialButtonsBlockButtonArrow: "text-[#C9A961]",
                formButtonPrimary: "bg-[#C9A961] hover:bg-[#B89658] text-[#1F2328] font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all",
                footerActionLink: "text-[#C9A961] hover:text-[#B89658] font-semibold",
                formFieldInput: "bg-[#1F2328] border-2 border-[#3D4451] text-[#E8E6E3] focus:border-[#C9A961] focus:ring-2 focus:ring-[#C9A961]/20",
                formFieldLabel: "text-[#E8E6E3] font-medium",
                formFieldInputShowPasswordButton: "text-[#C9A961] hover:text-[#B89658]",
                identityPreviewText: "text-[#E8E6E3]",
                identityPreviewEditButton: "text-[#C9A961] hover:text-[#B89658]",
                dividerLine: "bg-[#3D4451]",
                dividerText: "text-[#9CA3AF]",
                otpCodeFieldInput: "bg-[#1F2328] border-2 border-[#3D4451] text-[#E8E6E3]",
                formResendCodeLink: "text-[#C9A961] hover:text-[#B89658]",
                alertText: "text-[#E8E6E3]",
                formFieldErrorText: "text-[#EF4444]",
              }
            }}
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}