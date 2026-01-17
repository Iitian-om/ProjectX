import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useSafeUser } from '../lib/useClerkSafe';
import { useRouter } from 'next/router';

/**
 * Tasks Page - PROTECTED ROUTE (User-Specific)
 * 
 * This page displays tasks for the currently authenticated user.
 * - Only logged-in users can access this page
 * - Shows ONLY that user's tasks from MongoDB
 * - Allows create, read, update, delete operations via n8n workflows
 * - All changes persist in MongoDB via n8n webhooks
 * 
 * For public demo tasks, see /tasks-sample page
 */
export default function Tasks() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useSafeUser();

  // State: Tasks for current user
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  /**
   * Effect: Redirect to sign-in if not authenticated
   * Only authenticated users should see their task list
   */
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  /**
   * Effect: Fetch user's tasks when component mounts
   * Loads all tasks for the authenticated user from MongoDB via n8n
   */
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchTasks();
    }
  }, [isLoaded, isSignedIn]);

  /**
   * Fetch tasks for current user from MongoDB
   * 
   * This function:
   * 1. Calls /api/tasks endpoint
   * 2. Currently fetches all tasks (TODO: Add userId filtering in Phase 2.5)
   * 3. Updates local state with fetched tasks
   * 4. Handles loading state for UX
   * 
   * Data source: MongoDB Atlas (cluster01 - projectx)
   * Workflow: n8n webhook → Function node → MongoDB Find operation
   */
  const fetchTasks = async () => {
    try {
      // Fetch user's tasks from MongoDB via n8n
      const response = await fetch('/api/tasks');
      const data = await response.json();
      
      // Update state with fetched tasks (filtered to current user)
      if (data.success && data.tasks) {
        setTasks(data.tasks);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks for user:', error);
      setLoading(false);
    }
  };

  /**
   * Handle: Create new task (open form modal)
   * User fills form and saves → n8n webhook → MongoDB insert
   */
  const handleCreateTask = () => {
    setSelectedTask(null); // New task (no existing data)
    setShowTaskForm(true); // Show form modal
  };

  /**
   * Handle: Edit existing task (open form with current data)
   * User modifies fields and saves → n8n webhook → MongoDB update
   */
  const handleEditTask = (task) => {
    setSelectedTask(task); // Load existing task data into form
    setShowTaskForm(true); // Show form modal
  };

  /**
   * Handle: Save task (create or update)
   * 
   * Process:
   * 1. Optimistically update UI (show changes immediately)
   * 2. Close form modal
   * 3. Refresh from MongoDB to ensure sync (handles concurrent updates)
   * 
   * @param {object} savedTask - Task data returned from n8n
   */
  const handleSaveTask = async (savedTask) => {
    // Optimistically update UI - users see changes immediately
    if (selectedTask) {
      // Update existing task
      setTasks(prevTasks => prevTasks.map(t => t.id === savedTask.id ? savedTask : t));
    } else {
      // Add new task
      setTasks(prevTasks => [savedTask, ...prevTasks]);
    }
    
    // Close form
    setShowTaskForm(false);
    setSelectedTask(null);
    
    // Refresh from server to ensure sync with MongoDB (handles race conditions)
    await fetchTasks();
  };

  /**
   * Handle: Delete task
   * 
   * Process:
   * 1. Optimistically remove from UI
   * 2. Send delete request to n8n → MongoDB
   * 3. Close form modal
   * 4. Refresh task list
   * 
   * @param {string} taskId - ID of task to delete
   */
  const handleDeleteTask = async (taskId) => {
    // Optimistically remove from UI
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    setShowTaskForm(false);
    setSelectedTask(null);
    
    // Refresh from server to ensure sync
    await fetchTasks();
  };

  /**
   * Handle: Cancel form modal
   * User clicked cancel button
   */
  const handleCancelForm = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  /**
   * Filter tasks based on selected filter
   * Supports: all, todo, in-progress, completed, high-priority
   */
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'todo') return task.status === 'To Do' || task.status === 'todo';
    if (filter === 'in-progress') return task.status === 'In Progress' || task.status === 'in-progress';
    if (filter === 'completed') return task.status === 'Completed' || task.status === 'completed';
    if (filter === 'high-priority') return task.priority === 'High' || task.priority === 'high' || task.priority === 'Urgent';
    return true;
  });

  /**
   * Sort filtered tasks by priority and deadline
   * 1. High priority tasks first
   * 2. Then by earliest deadline
   */
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Priority order: Urgent > High > Normal > Low
    const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
    const getPriority = (p) => priorityOrder[p?.toLowerCase()] ?? 2;
    
    const priorityDiff = getPriority(a.priority) - getPriority(b.priority);
    if (priorityDiff !== 0) return priorityDiff;

    // Then sort by deadline (earliest first)
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    if (a.deadline) return -1;
    if (b.deadline) return 1;
    
    return 0;
  });

  // Show loading state while Clerk is initializing
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading your tasks...</p>
        </div>
      </div>
    );
  }

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
            
            {/* Create Task Button */}
            <button
              onClick={handleCreateTask}
              className="px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-[#D4B87C] transition-all shadow-lg flex items-center gap-2 justify-center"
            >
              <span className="text-xl">➕</span>
              Create Task
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Tasks' },
            { value: 'todo', label: 'To Do' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
            { value: 'high-priority', label: 'High Priority' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === value
                  ? 'bg-accent text-background'
                  : 'bg-surface text-textPrimary border-2 border-highlight hover:border-accent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-accent">{tasks.length}</div>
            <div className="text-sm text-textSecondary">Total Tasks</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-[#2196F3]">
              {tasks.filter(t => (t.status === 'To Do' || t.status === 'todo')).length}
            </div>
            <div className="text-sm text-textSecondary">To Do</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-[#FF9800]">
              {tasks.filter(t => (t.status === 'In Progress' || t.status === 'in-progress')).length}
            </div>
            <div className="text-sm text-textSecondary">In Progress</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-success">
              {tasks.filter(t => (t.status === 'Completed' || t.status === 'completed')).length}
            </div>
            <div className="text-sm text-textSecondary">Completed</div>
          </div>
        </div>

        {/* Task List / Loading / Empty State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-accent text-4xl mb-4">⏳</div>
            <p className="text-textSecondary">Loading your tasks from MongoDB...</p>
          </div>
        ) : sortedTasks.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-lg border-2 border-highlight">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-textPrimary mb-2">
              {filter === 'all' ? 'No tasks yet' : 'No tasks match this filter'}
            </h3>
            <p className="text-textSecondary mb-6">
              {filter === 'all' 
                ? 'Create your first task to get started!' 
                : 'Try selecting a different filter'}
            </p>
            {filter === 'all' && (
              <button
                onClick={handleCreateTask}
                className="px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-[#D4B87C] transition-all"
              >
                Create Your First Task
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}

        {/* Quick Navigation Links */}
        <div className="mt-12 pt-8 border-t border-highlight">
          <h3 className="text-xl font-bold text-textPrimary mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/timetable"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              📅 View Timetable
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              📊 Go to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Task Form Modal - appears when creating or editing a task */}
      {showTaskForm && (
        <TaskForm
          task={selectedTask}
          onSave={handleSaveTask}
          onCancel={handleCancelForm}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-textPrimary mb-2">
                Task Management
              </h1>
              <p className="text-textSecondary">
                Create, manage, and track your tasks with n8n automation
              </p>
            </div>
            
            <button
              onClick={handleCreateTask}
              className="px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-[#D4B87C] transition-all shadow-lg flex items-center gap-2 justify-center"
            >
              <span className="text-xl">➕</span>
              Create Task
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All Tasks' },
            { value: 'todo', label: 'To Do' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
            { value: 'high-priority', label: 'High Priority' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === value
                  ? 'bg-accent text-background'
                  : 'bg-surface text-textPrimary border-2 border-highlight hover:border-accent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-accent">{tasks.length}</div>
            <div className="text-sm text-textSecondary">Total Tasks</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-[#2196F3]">
              {tasks.filter(t => t.status === 'todo').length}
            </div>
            <div className="text-sm text-textSecondary">To Do</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-[#FF9800]">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-textSecondary">In Progress</div>
          </div>
          <div className="bg-surface p-4 rounded-lg border-2 border-highlight">
            <div className="text-3xl font-bold text-success">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-textSecondary">Completed</div>
          </div>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-accent text-4xl mb-4">⏳</div>
            <p className="text-textSecondary">Loading tasks...</p>
          </div>
        ) : sortedTasks.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-lg border-2 border-highlight">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-textPrimary mb-2">
              {filter === 'all' ? 'No tasks yet' : 'No tasks match this filter'}
            </h3>
            <p className="text-textSecondary mb-6">
              {filter === 'all' 
                ? 'Create your first task to get started!' 
                : 'Try selecting a different filter'}
            </p>
            {filter === 'all' && (
              <button
                onClick={handleCreateTask}
                className="px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-[#D4B87C] transition-all"
              >
                Create Your First Task
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-highlight">
          <h3 className="text-xl font-bold text-textPrimary mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/timetable"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              📅 View Timetable
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-semibold rounded-lg hover:border-accent transition-all"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={selectedTask}
          onSave={handleSaveTask}
          onCancel={handleCancelForm}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}
