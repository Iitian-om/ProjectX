/**
 * API Endpoint: Events Management (Mock Data)
 * 
 * This endpoint currently returns mock event data for demonstration purposes.
 * In future phases, this will be replaced with real data from:
 * - n8n workflows (like tasks)
 * - College timetable integrations
 * - Google Calendar sync
 * - Outlook Calendar sync
 * 
 * Endpoints:
 * - GET /api/events - Fetch all events (currently mock data)
 * - POST /api/events - Create new event (placeholder for future implementation)
 */

// Mock API endpoint for events
// This will later be replaced with real data from n8n workflows

/**
 * Helper function to create relative date strings
 * 
 * Generates ISO date strings relative to current date.
 * Useful for creating mock data that's always "upcoming" regardless of when viewed.
 * 
 * @param {number} daysFromNow - Number of days to add to current date
 * @param {number} hours - Hour of day (0-23)
 * @param {number} minutes - Minute of hour (0-59)
 * @returns {string} - ISO 8601 date string
 */
function getRelativeDate(daysFromNow, hours = 0, minutes = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);  // Add days to current date
  date.setHours(hours, minutes, 0, 0);          // Set specific time
  return date.toISOString();                     // Return as ISO string
}

/**
 * Main API Handler for Events
 * 
 * Currently handles GET and POST methods with mock data.
 */
export default function handler(req, res) {
  if (req.method === 'GET') {
    /**
     * GET /api/events
     * 
     * Returns mock events data with various sources and types.
     * Events are dynamically dated relative to current date.
     * 
     * Event sources:
     * - 'college' - College timetable events (classes, labs, exams)
     * - 'manual' - Manually created events
     * - 'outlook' - Synced from Outlook Calendar (future)
     * - 'google' - Synced from Google Calendar (future)
     * 
     * Event types:
     * - 'class' - Regular classes
     * - 'lab' - Laboratory sessions
     * - 'meeting' - Meetings
     * - 'deadline' - Assignment/project deadlines
     * - 'appointment' - Personal appointments
     * - 'study' - Study sessions
     */
    const events = [
      {
        id: 1,
        title: 'Data Structures Lecture',
        description: 'Arrays and Linked Lists',
        startTime: getRelativeDate(1, 9, 0),
        endTime: getRelativeDate(1, 10, 30),
        source: 'college',
        type: 'class',
        location: 'Room 204',
      },
      {
        id: 2,
        title: 'Project X Development',
        description: 'Work on landing page and timetable features',
        startTime: getRelativeDate(1, 14, 0),
        endTime: getRelativeDate(1, 16, 0),
        source: 'manual',
        type: 'task',
        location: 'Home',
      },
      {
        id: 3,
        title: 'Team Meeting',
        description: 'Weekly sync with development team',
        startTime: getRelativeDate(2, 10, 0),
        endTime: getRelativeDate(2, 11, 0),
        source: 'outlook',
        type: 'meeting',
        location: 'Microsoft Teams',
      },
      {
        id: 4,
        title: 'Assignment Deadline: Algorithm Design',
        description: 'Submit dynamic programming solutions',
        startTime: getRelativeDate(3, 23, 59),
        endTime: getRelativeDate(3, 23, 59),
        source: 'college',
        type: 'deadline',
        priority: 'high',
        location: 'Online Submission',
      },
      {
        id: 5,
        title: 'Database Management Lab',
        description: 'SQL Queries and Optimization',
        startTime: getRelativeDate(2, 15, 0),
        endTime: getRelativeDate(2, 17, 0),
        source: 'college',
        type: 'lab',
        location: 'Computer Lab 3',
      },
      {
        id: 6,
        title: 'Google Calendar Sync Test',
        description: 'Personal reminder for doctor appointment',
        startTime: getRelativeDate(4, 11, 0),
        endTime: getRelativeDate(4, 12, 0),
        source: 'google',
        type: 'appointment',
        location: 'City Hospital',
      },
      {
        id: 7,
        title: 'Midterm Exam: Operating Systems',
        description: 'Chapters 1-5: Process Management and Scheduling',
        startTime: getRelativeDate(5, 9, 0),
        endTime: getRelativeDate(5, 11, 0),
        source: 'college',
        type: 'deadline',
        priority: 'high',
        location: 'Exam Hall A',
      },
      {
        id: 8,
        title: 'Group Study Session',
        description: 'Prepare for OS midterm',
        startTime: getRelativeDate(4, 18, 0),
        endTime: getRelativeDate(4, 20, 0),
        source: 'manual',
        type: 'study',
        location: 'Library',
      },
    ];

    // Return events array wrapped in object
    res.status(200).json({ events });
  } else if (req.method === 'POST') {
    /**
     * POST /api/events
     * 
     * Placeholder for creating new events.
     * Currently just returns the event data back.
     * Will be implemented in future phases with n8n integration.
     */
    const newEvent = req.body;
    res.status(201).json({ message: 'Event created', event: newEvent });
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
