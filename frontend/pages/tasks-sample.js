import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * Tasks Sample Page - PUBLIC DEMO PAGE
 * 
 * This is a PUBLIC route (no authentication required) showing sample tasks.
 * Purpose: Allow website visitors to preview task management features
 * 
 * For authenticated users' real tasks, see /tasks page
 */
export default function TasksSample() {
  // Sample tasks - hardcoded demo data
  const sampleTasks = [
    {
      id: '1',
      title: 'Complete Project Requirements',
      description: 'Review and finalize all project specifications for Q1 2026',
      priority: 'High',
      status: 'In Progress',
      deadline: '2026-01-22',
    },
    {
      id: '2',
      title: 'Submit Monthly Report',
      description: 'Compile and submit performance metrics for January',
      priority: 'Normal',
      status: 'To Do',
      deadline: '2026-01-25',
    },
    {
      id: '3',
      title: 'Team Meeting Preparation',
      description: 'Prepare slides and talking points for quarterly review',
      priority: 'High',
      status: 'To Do',
      deadline: '2026-01-20',
    },
    {
      id: '4',
      title: 'Code Review',
      description: 'Review pull requests from development team',
      priority: 'Normal',
      status: 'Completed',
      deadline: '2026-01-18',
    },
    {
      id: '5',
      title: 'Update Documentation',
      description: 'Update API documentation with new endpoints',
      priority: 'Low',
      status: 'In Progress',
      deadline: '2026-01-28',
    },
    {
      id: '6',
      title: 'Client Presentation',
      description: 'Prepare and deliver quarterly results to stakeholders',
      priority: 'Urgent',
      status: 'To Do',
      deadline: '2026-01-24',
    },
  ];

  // Filter and sort logic (same as real tasks page)
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-900 text-green-200';
      case 'in progress':
        return 'bg-orange-900 text-orange-200';
      case 'to do':
        return 'bg-blue-900 text-blue-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'text-red-500';
      case 'high':
        return 'text-orange-400';
      case 'normal':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getPriorityEmoji = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return '🔴';
      case 'high':
        return '🟠';
      case 'normal':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-textPrimary mb-2">
                Task Management
              </h1>
              <p className="text-textSecondary">
                Create, manage, and track your personal tasks with real-time MongoDB sync
              </p>
            </div>
            
            {/* Create Task Button - disabled for public view */}
            <button
              disabled
              className="px-6 py-3 bg-gray-600 text-gray-400 font-bold rounded-lg cursor-not-allowed flex items-center gap-2 justify-center"
              title="Sign in to create tasks"
            >
              <span className="text-xl">➕</span>
              Create Task
            </button>
          </div>
        </div>

        {/* Task Statistics - Sample Data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-accent">{sampleTasks.length}</div>
            <div className="text-sm text-textSecondary">Total Tasks</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-[#2196F3]">
              {sampleTasks.filter(t => t.status === 'To Do').length}
            </div>
            <div className="text-sm text-textSecondary">To Do</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-[#FF9800]">
              {sampleTasks.filter(t => t.status === 'In Progress').length}
            </div>
            <div className="text-sm text-textSecondary">In Progress</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-success">
              {sampleTasks.filter(t => t.status === 'Completed').length}
            </div>
            <div className="text-sm text-textSecondary">Completed</div>
          </div>
        </div>

        {/* Sample Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sampleTasks.map((task) => (
            <div
              key={task.id}
              className="bg-surface p-6 rounded-lg border-2 border-highlight hover:border-accent transition-all group"
            >
              {/* Task Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-textPrimary group-hover:text-accent transition-colors flex-1 pr-2">
                  {task.title}
                </h3>
                <span className={getPriorityColor(task.priority)}>
                  {getPriorityEmoji(task.priority)}
                </span>
              </div>

              {/* Task Description */}
              <p className="text-sm text-textSecondary mb-4">
                {task.description}
              </p>

              {/* Task Meta */}
              <div className="space-y-2 mb-4">
                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>

                {/* Deadline */}
                {task.deadline && (
                  <div className="text-xs text-textSecondary">
                    📅 Due: {new Date(task.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                )}

                {/* Priority Label */}
                <div className="text-xs text-textSecondary">
                  Priority: <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                </div>
              </div>

              {/* Action Buttons - disabled for public view */}
              <div className="flex gap-2 pt-4 border-t border-highlight">
                <button
                  disabled
                  className="flex-1 px-3 py-2 text-xs font-semibold bg-gray-700 text-gray-400 rounded cursor-not-allowed"
                  title="Sign in to edit tasks"
                >
                  ✏️ Edit
                </button>
                <button
                  disabled
                  className="flex-1 px-3 py-2 text-xs font-semibold bg-gray-700 text-gray-400 rounded cursor-not-allowed"
                  title="Sign in to delete tasks"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Navigation Links */}
        <div className="mt-12 pt-8 border-t border-highlight">
          <h3 className="text-xl font-bold text-textPrimary mb-4">Next Steps</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/timetable-sample"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              📅 View Sample Timetable
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
            💡 <span className="font-semibold">This is sample data.</span> Sign in to manage your own tasks with persistent MongoDB storage, real-time sync, and full CRUD operations.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
