import { useState, useEffect } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSafeUser } from '../lib/useClerkSafe';
import { useRouter } from 'next/router';
import { format, parseISO, isAfter, isBefore, addDays, isValid } from 'date-fns';

/**
 * Timetable Page - PROTECTED ROUTE (User-Specific)
 * 
 * This page displays the user's personalized timetable/calendar.
 * 
 * Features:
 * - Shows ONLY current user's events from MongoDB
 * - Filters: All, Upcoming (7 days), Deadlines, College, Google, Outlook, Manual
 * - Groups events by date
 * - Highlights upcoming deadlines
 * - Phase 5: Will integrate Google Calendar and Outlook
 * 
 * For public demo timetable, see /timetable-sample page
 */
export default function Timetable() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useSafeUser();

  // State: Events for current user
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  /**
   * Effect: Redirect to sign-in if not authenticated
   * Only authenticated users should see their timetable
   */
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  /**
   * Effect: Fetch user's events when component mounts
   * Loads events from MongoDB via n8n
   */
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchEvents();
    }
  }, [isLoaded, isSignedIn]);

  /**
   * Fetch events for current user from MongoDB
   * 
   * Currently fetches generic events; Phase 5 will add:
   * - Google Calendar OAuth integration
   * - Outlook OAuth integration
   * - Automatic calendar sync
   */
  const fetchEvents = async () => {
    try {
      // Fetch user's events from MongoDB via n8n
      const response = await fetch('/api/events');
      const data = await response.json();
      
      // Update state with fetched events
      if (data.events) {
        setEvents(data.events);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events for user:', error);
      setLoading(false);
    }
  };

  /**
   * Helper: Safely parse ISO date strings
   * Handles invalid dates gracefully
   * @param {string} dateString - ISO format date string
   * @returns {Date|null} Parsed date or null if invalid
   */
  const safeParseEventDate = (dateString) => {
    try {
      const parsed = parseISO(dateString);
      if (!isValid(parsed)) {
        console.warn('Invalid date:', dateString);
        return null;
      }
      return parsed;
    } catch (error) {
      console.error('Error parsing date:', dateString, error);
      return null;
    }
  };

  /**
   * Helper: Check if event falls within date range (inclusive)
   * @param {Date} eventDate - Event date to check
   * @param {Date} startDate - Range start date
   * @param {Date} endDate - Range end date
   * @returns {boolean} True if event is in range
   */
  const isEventInDateRange = (eventDate, startDate, endDate) => {
    if (!eventDate) return false;
    return (isAfter(eventDate, startDate) || eventDate.getTime() === startDate.getTime()) && 
           (isBefore(eventDate, endDate) || eventDate.getTime() === endDate.getTime());
  };

  /**
   * Filter events based on selected filter
   * Supports: all, deadlines, upcoming, college, google, outlook, manual
   */
  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'deadlines') return event.type === 'deadline';
    if (filter === 'upcoming') {
      const eventDate = safeParseEventDate(event.startTime);
      if (!eventDate) return false;
      const now = new Date();
      const weekFromNow = addDays(now, 7);
      return isEventInDateRange(eventDate, now, weekFromNow);
    }
    return event.source === filter;
  });

  /**
   * Sort filtered events by date (earliest first)
   */
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = safeParseEventDate(a.startTime);
    const dateB = safeParseEventDate(b.startTime);
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateA - dateB;
  });

  /**
   * Group sorted events by date for display
   * Returns object: { 'yyyy-MM-dd': [event1, event2, ...] }
   */
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const eventDate = safeParseEventDate(event.startTime);
    if (!eventDate) return groups;
    
    const date = format(eventDate, 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});

  /**
   * Get upcoming deadlines for alert banner
   * Shows deadlines within next 7 days
   */
  const upcomingDeadlines = events.filter(event => {
    if (event.type !== 'deadline') return false;
    const eventDate = safeParseEventDate(event.startTime);
    if (!eventDate) return false;
    const now = new Date();
    const weekFromNow = addDays(now, 7);
    return isEventInDateRange(eventDate, now, weekFromNow);
  }).sort((a, b) => {
    const dateA = safeParseEventDate(a.startTime);
    const dateB = safeParseEventDate(b.startTime);
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateA - dateB;
  });

  // Show loading state while Clerk is initializing
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading your timetable...</p>
        </div>
      </div>
    );
  }

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

        {/* Urgent: Upcoming Deadlines Alert */}
        {upcomingDeadlines.length > 0 && (
          <div className="mb-8 bg-surface border-2 border-danger rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              ⚠️ Upcoming Deadlines ({upcomingDeadlines.length})
            </h2>
            <div className="space-y-3">
              {upcomingDeadlines.map(deadline => {
                const deadlineDate = safeParseEventDate(deadline.startTime);
                return (
                  <div key={deadline.id} className="bg-background p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{deadline.title}</h3>
                        <p className="text-textSecondary">{deadline.description}</p>
                      </div>
                      <span className="text-danger font-semibold">
                        {deadlineDate ? format(deadlineDate, 'MMM dd, h:mm a') : 'Invalid date'}
                      </span>
                    </div>
                  </div>
                );
              })}
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
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === value
                  ? value === 'deadlines' 
                    ? 'bg-danger text-white'
                    : 'bg-accent text-background'
                  : 'bg-surface text-textSecondary hover:bg-highlight border border-highlight'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Event Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-accent">{events.length}</div>
            <div className="text-textSecondary text-sm">Total Events</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-accent">
              {events.filter(e => e.source === 'college').length}
            </div>
            <div className="text-textSecondary text-sm">College Events</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-danger">
              {events.filter(e => e.type === 'deadline').length}
            </div>
            <div className="text-textSecondary text-sm">Deadlines</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-textSecondary">
              {events.filter(e => e.source === 'manual').length}
            </div>
            <div className="text-textSecondary text-sm">Manual Entries</div>
          </div>
        </div>

        {/* Events List / Loading / Empty State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-accent text-4xl mb-4">📅</div>
            <p className="text-textSecondary">Loading your events from MongoDB...</p>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-xl border border-highlight">
            <div className="text-6xl mb-4">📆</div>
            <div className="text-xl text-textPrimary mb-2">No events found</div>
            <p className="text-textSecondary">Try adjusting your filters or add a new event</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([date, dateEvents]) => (
              <div key={date}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span>📆</span>
                  {format(parseISO(date), 'EEEE, MMMM dd, yyyy')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {dateEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-highlight">
          <h3 className="text-xl font-bold text-textPrimary mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/tasks"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              ✅ View Tasks
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              📊 Go to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );


  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
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
              ⚠️ Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {upcomingDeadlines.map(deadline => {
                const deadlineDate = safeParseEventDate(deadline.startTime);
                return (
                  <div key={deadline.id} className="bg-background p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{deadline.title}</h3>
                        <p className="text-textSecondary">{deadline.description}</p>
                      </div>
                      <span className="text-danger font-semibold">
                        {deadlineDate ? format(deadlineDate, 'MMM dd, h:mm a') : 'Invalid date'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-accent text-background'
                : 'bg-surface text-textSecondary hover:bg-highlight border border-highlight'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'upcoming'
                ? 'bg-accent text-background'
                : 'bg-surface text-textSecondary hover:bg-highlight border border-highlight'
            }`}
          >
            Upcoming (7 days)
          </button>
          <button
            onClick={() => setFilter('deadlines')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'deadlines'
                ? 'bg-danger text-white'
                : 'bg-surface text-textSecondary hover:bg-highlight border border-highlight'
            }`}
          >
            Deadlines Only
          </button>
          <button
            onClick={() => setFilter('college')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'college'
                ? 'bg-accent text-background'
                : 'bg-surface text-textSecondary hover:bg-highlight border border-highlight'
            }`}
          >
            College
          </button>
          <button
            onClick={() => setFilter('google')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'google'
                ? 'bg-success text-white'
                : 'bg-surface text-textSecondary hover:bg-highlight border border-highlight'
            }`}
          >
            Google Calendar
          </button>
          <button
            onClick={() => setFilter('outlook')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'outlook'
                ? 'bg-[#F77F00] text-white'
                : 'bg-surface text-textSecondary hover:bg-highlight border border-highlight'
            }`}
          >
            Outlook
          </button>
          <button
            onClick={() => setFilter('manual')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'manual'
                ? 'bg-highlight text-textPrimary'
                : 'bg-surface text-textSecondary hover:bg-highlight border border-highlight'
            }`}
          >
            Manual Entries
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-accent">{events.length}</div>
            <div className="text-textSecondary text-sm">Total Events</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-accent">
              {events.filter(e => e.source === 'college').length}
            </div>
            <div className="text-textSecondary text-sm">College Events</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-danger">
              {events.filter(e => e.type === 'deadline').length}
            </div>
            <div className="text-textSecondary text-sm">Deadlines</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border border-highlight">
            <div className="text-3xl font-bold text-textSecondary">
              {events.filter(e => e.source === 'manual').length}
            </div>
            <div className="text-textSecondary text-sm">Manual Entries</div>
          </div>
        </div>

        {/* Events List / Loading / Empty State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-accent text-4xl mb-4">📅</div>
            <p className="text-textSecondary">Loading your events from MongoDB...</p>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-xl border border-highlight">
            <div className="text-6xl mb-4">📆</div>
            <div className="text-xl text-textPrimary mb-2">No events found</div>
            <p className="text-textSecondary">Try adjusting your filters or add a new event</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([date, dateEvents]) => (
              <div key={date}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span>📆</span>
                  {format(parseISO(date), 'EEEE, MMMM dd, yyyy')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {dateEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-highlight">
          <h3 className="text-xl font-bold text-textPrimary mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/tasks"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              ✅ View Tasks
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              📊 Go to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
