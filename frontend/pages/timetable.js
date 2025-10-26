import { useState, useEffect } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import { format, parseISO, isAfter, isBefore, addDays, isValid } from 'date-fns';

export default function Timetable() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  // Helper function to safely parse event date with validation
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

  // Helper function to check if event is within date range (inclusive)
  const isEventInDateRange = (eventDate, startDate, endDate) => {
    if (!eventDate) return false;
    return (isAfter(eventDate, startDate) || eventDate.getTime() === startDate.getTime()) && 
           (isBefore(eventDate, endDate) || eventDate.getTime() === endDate.getTime());
  };

  // Filter events
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

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = safeParseEventDate(a.startTime);
    const dateB = safeParseEventDate(b.startTime);
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateA - dateB;
  });

  // Group events by date
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

  // Get upcoming deadlines (next 7 days)
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

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-highlight">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-accent transition-colors">
            <span className="text-accent">ProjectX</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-textSecondary hover:text-accent transition-colors">
            Home
          </Link>
          <span className="text-accent font-semibold">Timetable</span>
        </div>
      </nav>

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

        {/* Events List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-textSecondary">Loading events...</div>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-xl border border-highlight">
            <div className="text-xl text-textPrimary mb-2">No events found</div>
            <p className="text-textSecondary">Try adjusting your filters</p>
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

        {/* Add Event Button */}
        <div className="mt-12 text-center">
          <button className="bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            + Add Manual Event
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-12 text-center text-sm text-textSecondary border-t border-highlight">
        <p>© {new Date().getFullYear()} ProjectX Corporation Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
