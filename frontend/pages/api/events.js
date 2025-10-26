// Mock API endpoint for events
// This will later be replaced with real data from n8n workflows

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Mock events data with various sources
    const events = [
      {
        id: 1,
        title: 'Data Structures Lecture',
        description: 'Arrays and Linked Lists',
        startTime: '2025-10-27T09:00:00',
        endTime: '2025-10-27T10:30:00',
        source: 'college',
        type: 'class',
        location: 'Room 204',
      },
      {
        id: 2,
        title: 'Project X Development',
        description: 'Work on landing page and timetable features',
        startTime: '2025-10-27T14:00:00',
        endTime: '2025-10-27T16:00:00',
        source: 'manual',
        type: 'task',
        location: 'Home',
      },
      {
        id: 3,
        title: 'Team Meeting',
        description: 'Weekly sync with development team',
        startTime: '2025-10-28T10:00:00',
        endTime: '2025-10-28T11:00:00',
        source: 'outlook',
        type: 'meeting',
        location: 'Microsoft Teams',
      },
      {
        id: 4,
        title: 'Assignment Deadline: Algorithm Design',
        description: 'Submit dynamic programming solutions',
        startTime: '2025-10-29T23:59:00',
        endTime: '2025-10-29T23:59:00',
        source: 'college',
        type: 'deadline',
        priority: 'high',
        location: 'Online Submission',
      },
      {
        id: 5,
        title: 'Database Management Lab',
        description: 'SQL Queries and Optimization',
        startTime: '2025-10-28T15:00:00',
        endTime: '2025-10-28T17:00:00',
        source: 'college',
        type: 'lab',
        location: 'Computer Lab 3',
      },
      {
        id: 6,
        title: 'Google Calendar Sync Test',
        description: 'Personal reminder for doctor appointment',
        startTime: '2025-10-30T11:00:00',
        endTime: '2025-10-30T12:00:00',
        source: 'google',
        type: 'appointment',
        location: 'City Hospital',
      },
      {
        id: 7,
        title: 'Midterm Exam: Operating Systems',
        description: 'Chapters 1-5: Process Management and Scheduling',
        startTime: '2025-10-31T09:00:00',
        endTime: '2025-10-31T11:00:00',
        source: 'college',
        type: 'deadline',
        priority: 'high',
        location: 'Exam Hall A',
      },
      {
        id: 8,
        title: 'Study Group Session',
        description: 'Prepare for OS midterm',
        startTime: '2025-10-30T18:00:00',
        endTime: '2025-10-30T20:00:00',
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
