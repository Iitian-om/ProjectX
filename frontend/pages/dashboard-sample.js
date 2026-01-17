import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * Dashboard Sample Page - PUBLIC DEMO PAGE
 * 
 * This is a PUBLIC route (no authentication required) showing sample data.
 * Purpose: Allow website visitors to preview dashboard features before signing up
 * 
 * Features displayed:
 * - Sample user profile (John Doe)
 * - Sample task statistics
 * - Sample event statistics
 * - Mock quick actions
 * - Mock upcoming events
 * - Mock activity log
 * 
 * Real authenticated users see: /dashboard (user-specific data)
 * Public visitors see: /dashboard-sample (this page with sample data)
 */
export default function DashboardSample() {
  // Sample statistics - same structure as real dashboard but hardcoded for demo
  const sampleStats = {
    tasksTotal: 24,
    tasksCompleted: 8,
    tasksActive: 16,
    eventsToday: 3,
    eventsUpcoming: 5,
    reminders: 2,
    integrations: 2,
  };

  const userName = "John Doe"; // Sample user name

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Dashboard Header */}
      <section className="container mx-auto px-6 py-8 border-b border-highlight">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome back, <span className="text-accent">{userName}</span>!
            </h1>
            <p className="text-textSecondary text-lg">
              Manage your time, tasks, and events all in one place.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Sample user avatar placeholder */}
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-background font-bold">
              JD
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section - SAMPLE DATA */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1: Today's Events (Sample) */}
          <div className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-textSecondary text-sm font-semibold">Today's Events</h3>
              <span className="text-2xl">📅</span>
            </div>
            <p className="text-3xl font-bold text-accent">{sampleStats.eventsToday}</p>
            <p className="text-xs text-textSecondary mt-1">{sampleStats.eventsUpcoming} upcoming</p>
          </div>

          {/* Card 2: Active Tasks (Sample) */}
          <div className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-textSecondary text-sm font-semibold">Active Tasks</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-accent">{sampleStats.tasksActive}</p>
            <p className="text-xs text-textSecondary mt-1">{sampleStats.tasksCompleted} completed this week</p>
          </div>

          {/* Card 3: Reminders (Sample) */}
          <div className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-textSecondary text-sm font-semibold">Reminders</h3>
              <span className="text-2xl">🔔</span>
            </div>
            <p className="text-3xl font-bold text-accent">{sampleStats.reminders}</p>
            <p className="text-xs text-textSecondary mt-1">0 needs attention</p>
          </div>

          {/* Card 4: Integrations (Sample) */}
          <div className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-textSecondary text-sm font-semibold">Integrations</h3>
              <span className="text-2xl">🔗</span>
            </div>
            <p className="text-3xl font-bold text-accent">{sampleStats.integrations}</p>
            <p className="text-xs text-textSecondary mt-1">{sampleStats.integrations > 0 ? 'All synced' : 'None synced'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Action 1: View Timetable */}
            <Link 
              href="/timetable-sample"
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

            {/* Action 2: Manage Tasks */}
            <Link 
              href="/tasks-sample"
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

            {/* Action 3: Connect Apps */}
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

        {/* Upcoming Events Section - SAMPLE DATA */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Link href="/timetable-sample" className="text-accent hover:text-[#B89658] text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="bg-surface rounded-xl border border-highlight p-6">
            <div className="space-y-4">
              {/* Sample Event 1 */}
              <div className="flex items-start justify-between pb-4 border-b border-highlight">
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold">Team Standup Meeting</p>
                  <p className="text-sm text-textSecondary">📅 Jan 20, 2026 at 10:00 AM</p>
                </div>
                <span className="text-xs bg-accent bg-opacity-20 text-accent px-3 py-1 rounded">Today</span>
              </div>

              {/* Sample Event 2 */}
              <div className="flex items-start justify-between pb-4 border-b border-highlight">
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold">Project Deadline</p>
                  <p className="text-sm text-textSecondary">📅 Jan 22, 2026 at 5:00 PM</p>
                </div>
                <span className="text-xs bg-highlight px-3 py-1 rounded">In 2 days</span>
              </div>

              {/* Sample Event 3 */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold">Client Review</p>
                  <p className="text-sm text-textSecondary">📅 Jan 24, 2026 at 2:00 PM</p>
                </div>
                <span className="text-xs bg-highlight px-3 py-1 rounded">In 4 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section - SAMPLE DATA */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-surface rounded-xl border border-highlight p-6">
            <div className="space-y-4">
              {/* Activity 1: Task completed */}
              <div className="flex items-start gap-4 pb-4 border-b border-highlight">
                <div className="text-2xl">✅</div>
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold">Task completed</p>
                  <p className="text-sm text-textSecondary">You completed "Review project requirements"</p>
                  <p className="text-xs text-textSecondary mt-1">2 hours ago</p>
                </div>
              </div>

              {/* Activity 2: Event added */}
              <div className="flex items-start gap-4 pb-4 border-b border-highlight">
                <div className="text-2xl">📅</div>
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold">Event added</p>
                  <p className="text-sm text-textSecondary">New event "Team Meeting" added to your calendar</p>
                  <p className="text-xs text-textSecondary mt-1">5 hours ago</p>
                </div>
              </div>

              {/* Activity 3: Reminder set */}
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

        {/* Sample Data Notice */}
        <div className="mt-8 bg-highlight bg-opacity-50 border border-highlight rounded-xl p-4">
          <p className="text-textSecondary text-sm">
            💡 <span className="font-semibold">This is sample data.</span> Sign in to see your real, personalized dashboard with your actual tasks, events, and reminders.
          </p>
          <Link href="/sign-up" className="inline-block mt-3 text-accent hover:text-[#B89658] font-semibold text-sm">
            Create an account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
