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

  // Helper function to check if event is within date range
  const isEventInDateRange = (eventDate, startDate, endDate) => {
    if (!eventDate) return false;
    return isAfter(eventDate, startDate) && isBefore(eventDate, endDate);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            <span className="text-blue-400">ProjectX</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="text-blue-400 font-semibold">Timetable</span>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Timetable 📅
          </h1>
          <p className="text-gray-400 text-lg">
            All your events, classes, and deadlines in one place
          </p>
        </div>

        {/* Upcoming Deadlines Alert */}
        {upcomingDeadlines.length > 0 && (
          <div className="mb-8 bg-red-900 bg-opacity-30 border-2 border-red-500 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              ⚠️ Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {upcomingDeadlines.map(deadline => {
                const deadlineDate = safeParseEventDate(deadline.startTime);
                return (
                  <div key={deadline.id} className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{deadline.title}</h3>
                        <p className="text-gray-400">{deadline.description}</p>
                      </div>
                      <span className="text-red-400 font-semibold">
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
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'upcoming'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Upcoming (7 days)
          </button>
          <button
            onClick={() => setFilter('deadlines')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'deadlines'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Deadlines Only
          </button>
          <button
            onClick={() => setFilter('college')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'college'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            College
          </button>
          <button
            onClick={() => setFilter('google')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'google'
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Google Calendar
          </button>
          <button
            onClick={() => setFilter('outlook')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'outlook'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Outlook
          </button>
          <button
            onClick={() => setFilter('manual')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'manual'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Manual Entries
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
            <div className="text-3xl font-bold text-blue-400">{events.length}</div>
            <div className="text-gray-400 text-sm">Total Events</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
            <div className="text-3xl font-bold text-purple-400">
              {events.filter(e => e.source === 'college').length}
            </div>
            <div className="text-gray-400 text-sm">College Events</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
            <div className="text-3xl font-bold text-red-400">
              {events.filter(e => e.type === 'deadline').length}
            </div>
            <div className="text-gray-400 text-sm">Deadlines</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
            <div className="text-3xl font-bold text-gray-400">
              {events.filter(e => e.source === 'manual').length}
            </div>
            <div className="text-gray-400 text-sm">Manual Entries</div>
          </div>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-400">Loading events...</div>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
            <div className="text-xl text-gray-400 mb-2">No events found</div>
            <p className="text-gray-500">Try adjusting your filters</p>
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            + Add Manual Event
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-12 text-center text-sm text-gray-500 border-t border-gray-800">
        <p>© {new Date().getFullYear()} ProjectX Corporation Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
