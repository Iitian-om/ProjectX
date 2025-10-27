import { format, parseISO, isValid } from 'date-fns';

export default function EventCard({ event }) {
  const sourceColors = {
    college: 'bg-accent',
    outlook: 'bg-[#F77F00]',
    google: 'bg-success',
    manual: 'bg-highlight text-textPrimary',
  };

  const typeIcons = {
    class: '📚',
    meeting: '👥',
    tutorial: '👨‍🏫',
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
    if (!isValid(startDate)) {
      throw new Error('Invalid start date');
    }
    startTimeFormatted = format(startDate, 'MMM dd, yyyy • h:mm a');
    
    if (event.startTime !== event.endTime) {
      const endDate = parseISO(event.endTime);
      if (isValid(endDate)) {
        endTimeFormatted = ` - ${format(endDate, 'h:mm a')}`;
      }
    }
  } catch (error) {
    console.error('Error parsing event date:', error);
    startTimeFormatted = 'Invalid date';
  }

  return (
    <div 
      className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
        isDeadline && isPriority 
          ? 'bg-surface border-danger' 
          : 'bg-surface border-highlight hover:border-accent'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeIcons[event.type] || '📌'}</span>
          <div>
            <h3 className="font-bold text-lg text-textPrimary">{event.title}</h3>
            <p className="text-sm text-textSecondary">{event.description}</p>
          </div>
        </div>
        {isPriority && (
          <span className="bg-danger text-white text-xs px-2 py-1 rounded-full font-semibold">
            HIGH PRIORITY
          </span>
        )}
      </div>
      
      <div className="mt-3 space-y-1 text-sm text-textPrimary">
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
