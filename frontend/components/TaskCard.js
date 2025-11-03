import { format, parseISO, isValid, isPast } from 'date-fns';

export default function TaskCard({ task, onEdit }) {
  const priorityColors = {
    low: 'bg-[#4CAF50]',
    normal: 'bg-[#2196F3]',
    high: 'bg-[#FF9800]',
    urgent: 'bg-danger',
  };

  const statusColors = {
    todo: 'border-highlight',
    'in-progress': 'border-accent',
    completed: 'border-success',
  };

  const priorityIcons = {
    low: '⬇️',
    normal: '➡️',
    high: '⬆️',
    urgent: '🔥',
  };

  // Safe date parsing
  let deadlineFormatted = '';
  let isOverdue = false;
  
  if (task.deadline) {
    try {
      const deadline = parseISO(task.deadline);
      if (isValid(deadline)) {
        deadlineFormatted = format(deadline, 'MMM dd, yyyy • h:mm a');
        isOverdue = isPast(deadline) && task.status !== 'completed';
      }
    } catch (error) {
      console.error('Error parsing deadline:', error);
    }
  }

  const handleCardClick = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg cursor-pointer ${
        isOverdue 
          ? 'bg-surface border-danger' 
          : `bg-surface ${statusColors[task.status] || 'border-highlight'} hover:border-accent`
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-2xl mt-1">{priorityIcons[task.priority] || '📋'}</span>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-textPrimary">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-textSecondary mt-1 line-clamp-2">{task.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          <span className={`${priorityColors[task.priority]} text-white text-xs px-2 py-1 rounded-full font-semibold uppercase`}>
            {task.priority}
          </span>
          
          {task.status && (
            <span className="bg-highlight text-textPrimary text-xs px-2 py-1 rounded-full font-semibold uppercase">
              {task.status.replace('-', ' ')}
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-3 space-y-2 text-sm text-textPrimary">
        {task.deadline && (
          <div className="flex items-center gap-2">
            <span>{isOverdue ? '⚠️' : '📅'}</span>
            <span className={isOverdue ? 'text-danger font-semibold' : ''}>
              {isOverdue && 'OVERDUE: '}
              {deadlineFormatted}
            </span>
          </div>
        )}
        
        {task.meetingLink && (
          <div className="flex items-center gap-2">
            <span>🔗</span>
            <a 
              href={task.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-accent hover:underline truncate"
            >
              {task.meetingLink}
            </a>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-textSecondary pt-2">
          <span>🕐</span>
          <span>
            Created: {task.createdAt ? format(parseISO(task.createdAt), 'MMM dd, yyyy') : 'Date not available'}
          </span>
        </div>
      </div>
    </div>
  );
}
