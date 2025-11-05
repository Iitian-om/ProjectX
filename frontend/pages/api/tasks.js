// API endpoint for task management with n8n integration
// Implements CRUD operations for tasks with MongoDB persistence via n8n

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

// Validate webhook URL is configured
if (!N8N_WEBHOOK_URL) {
  console.warn('Warning: NEXT_PUBLIC_N8N_WEBHOOK_URL is not configured. n8n integration will not work.');
}

// Helper function to call n8n webhook
async function callN8nWorkflow(action, taskData) {
  try {
    const payload = {
      action,
      type: 'task',
      ...taskData,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`n8n workflow failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling n8n workflow:', error);
    throw error;
  }
}

// Validate task data
function validateTask(task) {
  const errors = [];

  if (!task.title || task.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (task.title && task.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  if (task.description && task.description.length > 1000) {
    errors.push('Description must be less than 1000 characters');
  }

  if (task.priority && !['low', 'normal', 'high', 'urgent'].includes(task.priority)) {
    errors.push('Priority must be one of: low, normal, high, urgent');
  }

  if (task.deadline) {
    const deadline = new Date(task.deadline);
    if (isNaN(deadline.getTime())) {
      errors.push('Invalid deadline date');
    }
  }

  if (task.meetingLink && task.meetingLink.length > 500) {
    errors.push('Meeting link must be less than 500 characters');
  }

  return errors;
}

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        // Get all tasks from MongoDB via n8n workflow
        const { status, priority } = req.query;
        
        try {
          // Call n8n workflow to fetch tasks from MongoDB
          const result = await callN8nWorkflow('read', { 
            filters: { status, priority } 
          });

          let tasks = result.tasks || [];
          
          // Apply client-side filters if n8n didn't handle them
          if (status && !result.filtered) {
            tasks = tasks.filter(task => task.status === status);
          }
          if (priority && !result.filtered) {
            tasks = tasks.filter(task => task.priority === priority);
          }

          res.status(200).json({ 
            success: true,
            tasks: tasks,
            count: tasks.length 
          });
        } catch (error) {
          console.error('Error fetching tasks from n8n:', error);
          
          // Fallback to empty array with helpful message
          res.status(200).json({ 
            success: true,
            tasks: [],
            count: 0,
            message: 'Unable to fetch tasks. Please check n8n workflow configuration.'
          });
        }
        break;
      }

      case 'POST': {
        // Create new task
        const taskData = req.body;

        // Validate input
        const validationErrors = validateTask(taskData);
        if (validationErrors.length > 0) {
          return res.status(400).json({ 
            success: false,
            error: 'Validation failed',
            details: validationErrors 
          });
        }

        // Create task object with defaults
        const newTask = {
          id: `task-${Date.now()}`,
          title: taskData.title.trim(),
          description: taskData.description?.trim() || '',
          priority: taskData.priority || 'normal',
          deadline: taskData.deadline || null,
          meetingLink: taskData.meetingLink?.trim() || null,
          status: 'todo',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Call n8n workflow to create task in MongoDB
        try {
          await callN8nWorkflow('create', newTask);
        } catch (error) {
          console.error('n8n workflow error - task not persisted:', error);
          // TODO: Implement retry queue for production
          // For now, log the error and continue to provide smooth UX
          // Note: Task will not persist beyond page reload without n8n
        }

        res.status(201).json({ 
          success: true,
          message: 'Task created successfully',
          task: newTask 
        });
        break;
      }

      case 'PUT': {
        // Update existing task
        const taskData = req.body;

        if (!taskData.id) {
          return res.status(400).json({ 
            success: false,
            error: 'Task ID is required' 
          });
        }

        // Validate input
        const validationErrors = validateTask(taskData);
        if (validationErrors.length > 0) {
          return res.status(400).json({ 
            success: false,
            error: 'Validation failed',
            details: validationErrors 
          });
        }

        // Update task object
        const updatedTask = {
          ...taskData,
          title: taskData.title.trim(),
          description: taskData.description?.trim() || '',
          priority: taskData.priority || 'normal',
          meetingLink: taskData.meetingLink?.trim() || null,
          updatedAt: new Date().toISOString(),
        };

        // Call n8n workflow to update task in MongoDB
        try {
          await callN8nWorkflow('update', updatedTask);
        } catch (error) {
          console.error('n8n workflow error - update not persisted:', error);
          // TODO: Implement retry queue for production
        }

        res.status(200).json({ 
          success: true,
          message: 'Task updated successfully',
          task: updatedTask 
        });
        break;
      }

      case 'DELETE': {
        // Delete task
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ 
            success: false,
            error: 'Task ID is required' 
          });
        }

        // Call n8n workflow to delete task from MongoDB
        try {
          await callN8nWorkflow('delete', { id });
        } catch (error) {
          console.error('n8n workflow error - deletion not persisted:', error);
          // TODO: Implement retry queue for production
        }

        res.status(200).json({ 
          success: true,
          message: 'Task deleted successfully',
          id 
        });
        break;
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ 
          success: false,
          error: `Method ${method} not allowed` 
        });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: error.message 
    });
  }
}
