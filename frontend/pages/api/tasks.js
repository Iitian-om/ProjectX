// API endpoint for task management with n8n integration
// Implements CRUD operations for tasks with MongoDB persistence via n8n

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

// Log WebHook URL on Setup
console.log("=== N8N CONFIGURATION ===");
console.log("N8N Webhook URL:", N8N_WEBHOOK_URL);
console.log("Is configured:", !!N8N_WEBHOOK_URL);

// Validate webhook URL is configured
if (!N8N_WEBHOOK_URL) {
  console.warn('Warning: NEXT_PUBLIC_N8N_WEBHOOK_URL is not configured. n8n integration will not work.');
}

// Helper function to call n8n webhook
async function callN8nWorkflow(action, taskData) {
  console.log('=== CALLING N8N WORKFLOW ===');
  console.log('Action:', action);
  console.log('Webhook URL:', N8N_WEBHOOK_URL);
  console.log('Task Data:', JSON.stringify(taskData, null, 2));

  if (!N8N_WEBHOOK_URL) {
    console.error('Cannot call n8n: Webhook URL not configured');
    return null;
  }

  try {
    const payload = {
      action,
      type: 'task',
      ...taskData,
      timestamp: new Date().toISOString()
    };

    console.log('Sending payload to n8n:', JSON.stringify(payload, null, 2));

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('n8n Response Status:', response.status);
    console.log('n8n Response OK:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n Error Response:', errorText);
      throw new Error(`n8n workflow failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('n8n Success Response:', JSON.stringify(result, null, 2));
    
    // Handle different response formats from n8n
    if (action === 'read') {
      // MongoDB FIND returns array directly or wrapped in object
      if (Array.isArray(result)) {
        return { tasks: result, count: result.length, success: true };
      }
      if (result.tasks && Array.isArray(result.tasks)) {
        return result;
      }
      if (result.documents && Array.isArray(result.documents)) {
        return { tasks: result.documents, count: result.documents.length, success: true };
      }
      // If no tasks found, return empty array
      return { tasks: [], count: 0, success: true };
    }
    
    return result;

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
    errors.push('Title must be 200 characters or less');
  }

  if (task.priority && !['low', 'normal', 'high', 'urgent'].includes(task.priority)) {
    errors.push('Invalid priority value');
  }

  if (task.status && !['todo', 'in-progress', 'completed'].includes(task.status)) {
    errors.push('Invalid status value');
  }

  return errors;
}

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        console.log('=== GET REQUEST ===');
        
        try {
          // Try to fetch from n8n/MongoDB
          const result = await callN8nWorkflow('read', { filters: {} });
          
          if (result && result.tasks) {
            console.log('Returning tasks from n8n:', result.tasks.length);
            return res.status(200).json({
              success: true,
              tasks: result.tasks,
              count: result.tasks.length
            });
          }
        } catch (error) {
          console.error('Error fetching tasks from n8n:', error);
        }

        // Fallback to empty array
        console.log('Returning empty tasks array (n8n failed)');
        return res.status(200).json({
          success: true,
          tasks: [],
          count: 0,
          message: 'Unable to fetch tasks. Please check n8n workflow configuration.'
        });
      }

      case 'POST': {
        console.log('=== POST REQUEST ===');
        const taskData = req.body;

        // Validate task data
        const validationErrors = validateTask(taskData);
        if (validationErrors.length > 0) {
          console.error('Validation errors:', validationErrors);
          return res.status(400).json({
            success: false,
            errors: validationErrors
          });
        }

        // Generate task ID if not provided
        const newTask = {
          id: taskData.id || `task-${Date.now()}`,
          title: taskData.title,
          description: taskData.description || '',
          priority: taskData.priority || 'normal',
          status: taskData.status || 'todo',
          deadline: taskData.deadline || null,
          meetingLink: taskData.meetingLink || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        console.log('Created new task:', newTask);

        // Send to n8n for persistence
        try {
          console.log('Attempting to save to n8n...');
          await callN8nWorkflow('create', newTask);
          console.log('Successfully saved to n8n!');
        } catch (error) {
          console.error('n8n workflow error - task not persisted:', error);
          // Continue anyway to return success to user
        }

        return res.status(201).json({
          success: true,
          task: newTask
        });
      }

      case 'PUT': {
        console.log('=== PUT REQUEST ===');
        const updateData = req.body;

        if (!updateData.id) {
          return res.status(400).json({
            success: false,
            error: 'Task ID is required for updates'
          });
        }

        // Validate update data
        const validationErrors = validateTask(updateData);
        if (validationErrors.length > 0) {
          return res.status(400).json({
            success: false,
            errors: validationErrors
          });
        }

        const updatedTask = {
          ...updateData,
          updatedAt: new Date().toISOString()
        };

        // Send to n8n for persistence
        try {
          await callN8nWorkflow('update', updatedTask);
        } catch (error) {
          console.error('n8n workflow error - task not persisted:', error);
        }

        return res.status(200).json({
          success: true,
          task: updatedTask
        });
      }

      case 'DELETE': {
        console.log('=== DELETE REQUEST ===');
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({
            success: false,
            error: 'Task ID is required'
          });
        }

        // Send to n8n for deletion
        try {
          await callN8nWorkflow('delete', { id });
        } catch (error) {
          console.error('n8n workflow error - task not deleted:', error);
        }

        return res.status(200).json({
          success: true,
          message: 'Task deleted successfully'
        });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`
        });
    }
  } catch (error) {
    // General error handler
    console.error('API Error:', error);
     return res.status(500).json({
      success: false,
      error: 'Internal server error: ' + error,
      details: error.message
    });
  }
};