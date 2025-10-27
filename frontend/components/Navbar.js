import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar({ showHome = true }) {
  const router = useRouter();
  // TODO: Replace with actual authentication state
  const isLoggedIn = false; // This should come from your auth context/state

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
          href="/dashboard" 
          className={`transition-colors ${
            router.pathname === '/dashboard' 
              ? 'text-accent font-semibold' 
              : 'text-textSecondary hover:text-accent'
          }`}
        >
          Dashboard
        </Link>
        {isLoggedIn ? (
          <Link 
            href="/profile" 
            className={`transition-colors ${
              router.pathname === '/profile' 
                ? 'text-accent font-semibold' 
                : 'text-textSecondary hover:text-accent'
            }`}
          >
            Profile
          </Link>
        ) : (
          <Link 
            href="/login" 
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              router.pathname === '/login'
                ? 'bg-accent text-background'
                : 'bg-surface text-textPrimary hover:bg-highlight border border-highlight'
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
