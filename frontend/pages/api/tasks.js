// API endpoint for task management with n8n integration
// Implements CRUD operations for tasks with MongoDB persistence via n8n

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync';

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
        // Get all tasks or filter by query params
        const { status, priority } = req.query;
        
        // For MVP, return mock data - in production this would query via n8n
        // n8n would query MongoDB and return results
        const mockTasks = [
          {
            id: 'task-1',
            title: 'Complete Phase 2 Implementation',
            description: 'Implement task management with CRUD operations',
            priority: 'high',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'in-progress',
            meetingLink: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'task-2',
            title: 'Review n8n Workflow Documentation',
            description: 'Document the task creation workflow',
            priority: 'normal',
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'todo',
            meetingLink: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        let filteredTasks = mockTasks;
        if (status) {
          filteredTasks = filteredTasks.filter(task => task.status === status);
        }
        if (priority) {
          filteredTasks = filteredTasks.filter(task => task.priority === priority);
        }

        res.status(200).json({ 
          success: true,
          tasks: filteredTasks,
          count: filteredTasks.length 
        });
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
          console.error('n8n workflow error:', error);
          // Continue even if n8n fails - return the task data
          // In production, you might want to queue this for retry
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
          console.error('n8n workflow error:', error);
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
          console.error('n8n workflow error:', error);
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
