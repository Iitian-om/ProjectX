import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = (savedTask) => {
    if (selectedTask) {
      // Update existing task
      setTasks(tasks.map(t => t.id === savedTask.id ? savedTask : t));
    } else {
      // Add new task
      setTasks([savedTask, ...tasks]);
    }
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const handleCancelForm = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'todo') return task.status === 'todo';
    if (filter === 'in-progress') return task.status === 'in-progress';
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'high-priority') return task.priority === 'high' || task.priority === 'urgent';
    return true;
  });

  // Sort tasks by deadline and priority
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Urgent/high priority first
    const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // Then by deadline (earliest first)
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    if (a.deadline) return -1;
    if (b.deadline) return 1;
    
    return 0;
  });

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
