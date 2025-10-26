import { format, parseISO } from 'date-fns';

export default function EventCard({ event }) {
  const sourceColors = {
    college: 'bg-purple-500',
    outlook: 'bg-blue-500',
    google: 'bg-green-500',
    manual: 'bg-gray-500',
  };

  const typeIcons = {
    class: '📚',
    meeting: '👥',
    task: '✅',
    deadline: '⚠️',
    lab: '💻',
    appointment: '📅',
    study: '📖',
  };

  const isDeadline = event.type === 'deadline';
  const isPriority = event.priority === 'high';

  // Safe date parsing
  let startTimeFormatted = '';
  let endTimeFormatted = '';
  
  try {
    const startDate = parseISO(event.startTime);
    startTimeFormatted = format(startDate, 'MMM dd, yyyy • h:mm a');
    
    if (event.startTime !== event.endTime) {
      const endDate = parseISO(event.endTime);
      endTimeFormatted = ` - ${format(endDate, 'h:mm a')}`;
    }
  } catch (error) {
    console.error('Error parsing event date:', error);
    startTimeFormatted = 'Invalid date';
  }

  return (
    <div 
      className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
        isDeadline && isPriority 
          ? 'bg-red-900 bg-opacity-20 border-red-500' 
          : 'bg-gray-800 bg-opacity-50 border-gray-700 hover:border-blue-500'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeIcons[event.type] || '📌'}</span>
          <div>
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-sm text-gray-400">{event.description}</p>
          </div>
        </div>
        {isPriority && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            HIGH PRIORITY
          </span>
        )}
      </div>
      
      <div className="mt-3 space-y-1 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <span>🕐</span>
          <span>
            {startTimeFormatted}{endTimeFormatted}
          </span>
        </div>
        
        {event.location && (
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{event.location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 mt-2">
          <span className={`${sourceColors[event.source]} text-white text-xs px-2 py-1 rounded-full`}>
            {event.source.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
