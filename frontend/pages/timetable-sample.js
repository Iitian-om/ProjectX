import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { format, parseISO, addDays } from 'date-fns';

/**
 * Timetable Sample Page - PUBLIC DEMO PAGE
 * 
 * This is a PUBLIC route (no authentication required) showing sample timetable.
 * Purpose: Allow website visitors to preview timetable features before signing up
 * 
 * For authenticated users' real timetable, see /timetable page
 */
export default function TimetableSample() {
  // Sample events - hardcoded demo data
  const sampleEvents = [
    {
      id: '1',
      title: 'Data Structures Lecture',
      description: 'Chapter 5: Trees and Binary Search Trees',
      startTime: new Date(2026, 0, 20, 10, 0).toISOString(),
      source: 'college',
      type: 'class',
    },
    {
      id: '2',
      title: 'Web Development Lab',
      description: 'Building a responsive React application',
      startTime: new Date(2026, 0, 20, 14, 0).toISOString(),
      source: 'college',
      type: 'lab',
    },
    {
      id: '3',
      title: 'Project Deadline',
      description: 'Submit semester project - Database Management System',
      startTime: new Date(2026, 0, 22, 23, 59).toISOString(),
      source: 'manual',
      type: 'deadline',
    },
    {
      id: '4',
      title: 'Team Meeting',
      description: 'Quarterly planning and review meeting',
      startTime: new Date(2026, 0, 21, 15, 0).toISOString(),
      source: 'google',
      type: 'meeting',
    },
    {
      id: '5',
      title: 'Assignment Submission',
      description: 'Advanced Algorithms - Assignment #3',
      startTime: new Date(2026, 0, 23, 17, 0).toISOString(),
      source: 'college',
      type: 'deadline',
    },
    {
      id: '6',
      title: 'Client Call',
      description: 'Discuss project requirements and timeline',
      startTime: new Date(2026, 0, 24, 11, 0).toISOString(),
      source: 'outlook',
      type: 'meeting',
    },
  ];

  // Group events by date
  const groupedEvents = sampleEvents.reduce((groups, event) => {
    const date = format(parseISO(event.startTime), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});

  // Get upcoming deadlines
  const upcomingDeadlines = sampleEvents.filter(e => e.type === 'deadline');

  const getSourceBadgeColor = (source) => {
    switch (source) {
      case 'college':
        return 'bg-blue-900 text-blue-200';
      case 'google':
        return 'bg-green-900 text-green-200';
      case 'outlook':
        return 'bg-orange-900 text-orange-200';
      case 'manual':
        return 'bg-purple-900 text-purple-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };

  const getSourceLabel = (source) => {
    switch (source) {
      case 'college':
        return '🎓 College';
      case 'google':
        return '📧 Google';
      case 'outlook':
        return '💼 Outlook';
      case 'manual':
        return '✏️ Manual';
      default:
        return source;
    }
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Timetable 📅
          </h1>
          <p className="text-textSecondary text-lg">
            All your events, classes, and deadlines in one place
          </p>
        </div>

        {/* Upcoming Deadlines Alert */}
        {upcomingDeadlines.length > 0 && (
          <div className="mb-8 bg-surface border-2 border-danger rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              ⚠️ Upcoming Deadlines ({upcomingDeadlines.length})
            </h2>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="bg-background p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{deadline.title}</h3>
                      <p className="text-textSecondary">{deadline.description}</p>
                    </div>
                    <span className="text-danger font-semibold text-right">
                      {format(new Date(deadline.startTime), 'MMM dd, h:mm a')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          {[
            { value: 'all', label: 'All Events' },
            { value: 'upcoming', label: 'Upcoming (7 days)' },
            { value: 'deadlines', label: 'Deadlines Only' },
            { value: 'college', label: 'College' },
            { value: 'google', label: 'Google Calendar' },
            { value: 'outlook', label: 'Outlook' },
            { value: 'manual', label: 'Manual Entries' },
          ].map(({ value, label }) => (
            <button
              key={value}
              disabled
              className={`px-4 py-2 rounded-lg transition-all cursor-not-allowed opacity-75
                ${value === 'all'
                  ? 'bg-accent text-background'
                  : 'bg-surface text-textSecondary border border-highlight'
                }`}
              title="Sign in to filter events"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Event Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-accent">{sampleEvents.length}</div>
            <div className="text-textSecondary text-sm">Total Events</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-accent">
              {sampleEvents.filter(e => e.source === 'college').length}
            </div>
            <div className="text-textSecondary text-sm">College Events</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-danger">
              {sampleEvents.filter(e => e.type === 'deadline').length}
            </div>
            <div className="text-textSecondary text-sm">Deadlines</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-textSecondary">
              {sampleEvents.filter(e => e.source === 'manual').length}
            </div>
            <div className="text-textSecondary text-sm">Manual Entries</div>
          </div>
        </div>

        {/* Events List - Grouped by Date */}
        <div className="space-y-8">
          {Object.entries(groupedEvents)
            .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
            .map(([date, dateEvents]) => (
              <div key={date}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span>📆</span>
                  {format(new Date(date), 'EEEE, MMMM dd, yyyy')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {dateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-surface p-6 rounded-lg border-2 border-highlight hover:border-accent transition-all group"
                    >
                      {/* Event Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-textPrimary group-hover:text-accent transition-colors flex-1 pr-2">
                          {event.title}
                        </h3>
                        <span className={`text-xl ${event.type === 'deadline' ? '⚠️' : '📍'}`}>
                        </span>
                      </div>

                      {/* Event Description */}
                      <p className="text-sm text-textSecondary mb-4">
                        {event.description}
                      </p>

                      {/* Event Meta */}
                      <div className="space-y-2 mb-4">
                        {/* Time */}
                        <div className="text-sm text-textSecondary">
                          🕐 {format(new Date(event.startTime), 'h:mm a')}
                        </div>

                        {/* Source Badge */}
                        <div>
                          <span
                            className={`inline-block px-3 py-1 rounded text-xs font-semibold ${getSourceBadgeColor(
                              event.source
                            )}`}
                          >
                            {getSourceLabel(event.source)}
                          </span>
                        </div>

                        {/* Type */}
                        <div className="text-xs text-textSecondary">
                          Type: <span className="capitalize font-semibold">{event.type}</span>
                        </div>
                      </div>

                      {/* Action Buttons - disabled for public view */}
                      <div className="flex gap-2 pt-4 border-t border-highlight">
                        <button
                          disabled
                          className="flex-1 px-3 py-2 text-xs font-semibold bg-gray-700 text-gray-400 rounded cursor-not-allowed"
                          title="Sign in to edit events"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          disabled
                          className="flex-1 px-3 py-2 text-xs font-semibold bg-gray-700 text-gray-400 rounded cursor-not-allowed"
                          title="Sign in to delete events"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Quick Navigation Links */}
        <div className="mt-12 pt-8 border-t border-highlight">
          <h3 className="text-xl font-bold text-textPrimary mb-4">Next Steps</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/tasks-sample"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              ✅ View Sample Tasks
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-[#D4B87C] transition-all"
            >
              📝 Create an Account
            </Link>
          </div>
        </div>

        {/* Sample Data Notice */}
        <div className="mt-8 bg-highlight bg-opacity-50 border border-highlight rounded-xl p-4">
          <p className="text-textSecondary text-sm">
            💡 <span className="font-semibold">This is sample data.</span> Sign in to see your real timetable with calendar integrations (Google Calendar, Outlook coming in Phase 5).
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
