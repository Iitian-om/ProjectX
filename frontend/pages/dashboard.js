import { useUser, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while checking authentication
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-background text-textPrimary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Dashboard Header */}
      <section className="container mx-auto px-6 py-8 border-b border-highlight">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome back, <span className="text-accent">{user.firstName || user.username || 'User'}</span>!
            </h1>
            <p className="text-textSecondary text-lg">
              Manage your time, tasks, and events all in one place.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12",
                  userButtonPopoverCard: "bg-surface border border-highlight",
                  userButtonPopoverActionButton: "hover:bg-highlight text-textPrimary",
                  userButtonPopoverActionButtonText: "text-textPrimary",
                  userButtonPopoverFooter: "hidden",
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-textSecondary text-sm font-semibold">Today's Events</h3>
              <span className="text-2xl">📅</span>
            </div>
            <p className="text-3xl font-bold text-accent">5</p>
            <p className="text-xs text-textSecondary mt-1">2 upcoming</p>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-textSecondary text-sm font-semibold">Active Tasks</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-accent">12</p>
            <p className="text-xs text-textSecondary mt-1">8 completed this week</p>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-textSecondary text-sm font-semibold">Reminders</h3>
              <span className="text-2xl">🔔</span>
            </div>
            <p className="text-3xl font-bold text-accent">3</p>
            <p className="text-xs text-textSecondary mt-1">1 needs attention</p>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-textSecondary text-sm font-semibold">Integrations</h3>
              <span className="text-2xl">🔗</span>
            </div>
            <p className="text-3xl font-bold text-accent">2</p>
            <p className="text-xs text-textSecondary mt-1">All synced</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/timetable"
              className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">📅</div>
                <div>
                  <h3 className="font-semibold text-textPrimary group-hover:text-accent transition-colors">
                    View Timetable
                  </h3>
                  <p className="text-sm text-textSecondary">Check your schedule</p>
                </div>
              </div>
            </Link>

            <Link 
              href="/tasks"
              className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="font-semibold text-textPrimary group-hover:text-accent transition-colors">
                    Manage Tasks
                  </h3>
                  <p className="text-sm text-textSecondary">Add or update tasks</p>
                </div>
              </div>
            </Link>

            <Link 
              href="/integrations"
              className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">🔗</div>
                <div>
                  <h3 className="font-semibold text-textPrimary group-hover:text-accent transition-colors">
                    Connect Apps
                  </h3>
                  <p className="text-sm text-textSecondary">Sync calendars & tools</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Link href="/timetable" className="text-accent hover:text-[#B89658] text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="bg-surface rounded-xl border border-highlight p-6">
            <div className="text-center py-8 text-textSecondary">
              <p className="text-4xl mb-2">📅</p>
              <p>No upcoming events for today</p>
              <Link 
                href="/timetable"
                className="inline-block mt-4 text-accent hover:text-[#B89658] font-semibold"
              >
                Add an event
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-surface rounded-xl border border-highlight p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-highlight last:border-0">
                <div className="text-2xl">✅</div>
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold">Task completed</p>
                  <p className="text-sm text-textSecondary">You completed "Review project requirements"</p>
                  <p className="text-xs text-textSecondary mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-highlight last:border-0">
                <div className="text-2xl">📅</div>
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold">Event added</p>
                  <p className="text-sm text-textSecondary">New event "Team Meeting" added to your calendar</p>
                  <p className="text-xs text-textSecondary mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔔</div>
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold">Reminder set</p>
                  <p className="text-sm text-textSecondary">Reminder for "Submit report" set for tomorrow</p>
                  <p className="text-xs text-textSecondary mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
