import { useState } from 'react';
import { format } from 'date-fns';

export default function TaskForm({ task = null, onSave, onCancel, onDelete }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'normal',
    deadline: task?.deadline ? format(new Date(task.deadline), "yyyy-MM-dd'T'HH:mm") : '',
    meetingLink: task?.meetingLink || '',
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const isEditMode = !!task;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      const payload = {
        ...formData,
        deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
      };

      if (isEditMode) {
        payload.id = task.id;
      }

      const response = await fetch('/api/tasks', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.success) {
        setErrors(data.details || [data.error]);
        setLoading(false);
        return;
      }

      onSave(data.task);
    } catch (error) {
      console.error('Error saving task:', error);
      setErrors(['Failed to save task. Please try again.']);
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/tasks?id=${task.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!data.success) {
        setErrors([data.error]);
        setLoading(false);
        return;
      }

      onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
      setErrors(['Failed to delete task. Please try again.']);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg border-2 border-highlight max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-highlight">
          <h2 className="text-2xl font-bold text-textPrimary">
            {isEditMode ? 'Edit Task' : 'Create New Task'}
          </h2>
          <p className="text-sm text-textSecondary mt-1">
            {isEditMode ? 'Update task details below' : 'Fill in the details to create a new task'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-danger bg-opacity-10 border border-danger rounded-lg p-4">
              <p className="text-danger font-semibold mb-2">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-danger text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-textPrimary mb-2">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={200}
              className="w-full px-4 py-2 bg-background border-2 border-highlight rounded-lg text-textPrimary focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-textPrimary mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={1000}
              rows={4}
              className="w-full px-4 py-2 bg-background border-2 border-highlight rounded-lg text-textPrimary focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Enter task description (optional)"
            />
            <p className="text-xs text-textSecondary mt-1">
              {formData.description.length}/1000 characters
            </p>
          </div>

          {/* Priority and Deadline Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-semibold text-textPrimary mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border-2 border-highlight rounded-lg text-textPrimary focus:outline-none focus:border-accent transition-colors"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-semibold text-textPrimary mb-2">
                Deadline
              </label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border-2 border-highlight rounded-lg text-textPrimary focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Meeting Link */}
          <div>
            <label htmlFor="meetingLink" className="block text-sm font-semibold text-textPrimary mb-2">
              Meeting Link
            </label>
            <input
              type="url"
              id="meetingLink"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleChange}
              maxLength={500}
              className="w-full px-4 py-2 bg-background border-2 border-highlight rounded-lg text-textPrimary focus:outline-none focus:border-accent transition-colors"
              placeholder="https://meet.google.com/... (optional)"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-accent text-background font-bold rounded-lg hover:bg-[#D4B87C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (isEditMode ? 'Update Task' : 'Create Task')}
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-surface border-2 border-highlight text-textPrimary font-bold rounded-lg hover:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            {isEditMode && (
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={loading}
                className="px-6 py-3 bg-danger text-white font-bold rounded-lg hover:bg-[#D32F2F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
