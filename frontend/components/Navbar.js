import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserButton } from '@clerk/nextjs';
import { useSafeUser } from '../lib/useClerkSafe';

export default function Navbar({ showHome = true }) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useSafeUser();

  return (
    <nav className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-highlight">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link href="/" className="hover:text-accent transition-colors">
          <span className="text-accent">ProjectX</span>
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {showHome && (
          <Link 
            href="/" 
            className={`transition-colors ${
              router.pathname === '/' 
                ? 'text-accent font-semibold' 
                : 'text-textSecondary hover:text-accent'
            }`}
          >
            Home
          </Link>
        )}
        <Link 
          href="/timetable" 
          className={`transition-colors ${
            router.pathname === '/timetable' 
              ? 'text-accent font-semibold' 
              : 'text-textSecondary hover:text-accent'
          }`}
        >
          Timetable
        </Link>
        <Link 
          href="/tasks" 
          className={`transition-colors ${
            router.pathname === '/tasks' 
              ? 'text-accent font-semibold' 
              : 'text-textSecondary hover:text-accent'
          }`}
        >
          Tasks
        </Link>
        <Link 
          href="/dashboard" 
          className={`transition-colors ${
            router.pathname === '/dashboard' 
              ? 'text-accent font-semibold' 
              : 'text-textSecondary hover:text-accent'
          }`}
        >
          Dashboard
        </Link>
        {isLoaded && (
          isSignedIn ? (
            <UserButton 
              userProfileMode="navigation"
              userProfileUrl="/user-profile"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "bg-surface border border-highlight",
                  userButtonPopoverActionButton: "hover:bg-highlight text-textPrimary",
                  userButtonPopoverActionButtonText: "text-textPrimary",
                }
              }}
            />
          ) : (
            <Link 
              href="/sign-in" 
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                router.pathname === '/sign-in'
                  ? 'bg-accent text-background'
                  : 'bg-surface text-textPrimary hover:bg-highlight border border-highlight'
              }`}
            >
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
