// Mock API endpoint for events
// This will later be replaced with real data from n8n workflows

// Helper to create relative date strings
function getRelativeDate(daysFromNow, hours = 0, minutes = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Mock events data with various sources - using relative dates
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

    res.status(200).json({ events });
  } else if (req.method === 'POST') {
    // Placeholder for adding new events
    const newEvent = req.body;
    res.status(201).json({ message: 'Event created', event: newEvent });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
