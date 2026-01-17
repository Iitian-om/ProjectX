import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserButton } from '@clerk/nextjs';
import { useSafeUser } from '../lib/useClerkSafe';

/**
 * Navbar Component - Dynamic Navigation Bar
 * 
 * Features:
 * - Shows sample pages for non-authenticated users (public demo)
 * - Shows real pages for authenticated users (user-specific data)
 * - UserButton for signed-in users
 * - Login button for visitors
 */
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
      
      {/* Navigation Links - Dynamic based on authentication status */}
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
        
        {/* Timetable Link - Shows sample or real based on auth */}
        <Link 
          href={isSignedIn ? "/timetable" : "/timetable-sample"}
          className={`transition-colors ${
            (router.pathname === '/timetable' || router.pathname === '/timetable-sample')
              ? 'text-accent font-semibold' 
              : 'text-textSecondary hover:text-accent'
          }`}
        >
          Timetable
        </Link>
        
        {/* Tasks Link - Shows sample or real based on auth */}
        <Link 
          href={isSignedIn ? "/tasks" : "/tasks-sample"}
          className={`transition-colors ${
            (router.pathname === '/tasks' || router.pathname === '/tasks-sample')
              ? 'text-accent font-semibold' 
              : 'text-textSecondary hover:text-accent'
          }`}
        >
          Tasks
        </Link>
        
        {/* Dashboard Link - Shows sample or real based on auth */}
        <Link 
          href={isSignedIn ? "/dashboard" : "/dashboard-sample"}
          className={`transition-colors ${
            (router.pathname === '/dashboard' || router.pathname === '/dashboard-sample')
              ? 'text-accent font-semibold' 
              : 'text-textSecondary hover:text-accent'
          }`}
        >
          Dashboard
        </Link>
        
        {/* Auth Button - UserButton for signed in, Login button for visitors */}
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
