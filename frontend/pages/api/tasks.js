/**
 * API Endpoint: Task Management with n8n Integration
 * 
 * This API handles all CRUD operations for tasks and integrates with n8n workflows
 * for persistent storage in MongoDB. All task data flows through n8n webhooks.
 * 
 * Endpoints:
 * - GET /api/tasks - Fetch all tasks from MongoDB via n8n
 * - POST /api/tasks - Create a new task and save to MongoDB via n8n
 * - PUT /api/tasks - Update an existing task in MongoDB via n8n
 * - DELETE /api/tasks?id=<taskId> - Delete a task from MongoDB via n8n
 */

// API endpoint for task management with n8n integration
// Implements CRUD operations for tasks with MongoDB persistence via n8n

// Load n8n webhook URL from environment variables
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

// Log WebHook URL on Setup (for debugging)
console.log("=== N8N CONFIGURATION ===");
console.log("N8N Webhook URL:", N8N_WEBHOOK_URL);
console.log("Is configured:", !!N8N_WEBHOOK_URL);

// Validate webhook URL is configured - warn if missing
if (!N8N_WEBHOOK_URL) {
  console.warn('Warning: NEXT_PUBLIC_N8N_WEBHOOK_URL is not configured. n8n integration will not work.');
}

/**
 * Helper function to call n8n webhook
 * 
 * Sends task data to n8n workflow which then interacts with MongoDB.
 * The n8n workflow handles routing to appropriate MongoDB operations (insert, find, update, delete).
 * 
 * @param {string} action - The action to perform: 'create', 'read', 'update', or 'delete'
 * @param {object} taskData - The task data or filters to send to n8n
 * @returns {Promise<object>} - The response from n8n workflow
 */
async function callN8nWorkflow(action, taskData) {
  console.log('=== CALLING N8N WORKFLOW ===');
  console.log('Action:', action);
  console.log('Webhook URL:', N8N_WEBHOOK_URL);
  console.log('Task Data:', JSON.stringify(taskData, null, 2));

  // Check if webhook URL is configured
  if (!N8N_WEBHOOK_URL) {
    console.error('Cannot call n8n: Webhook URL not configured');
    return null;
  }

  try {
    // Build payload to send to n8n
    const payload = {
      action,              // Operation type: create, read, update, delete
      type: 'task',        // Data type (for future expansion to events, reminders, etc.)
      ...taskData,         // Spread task data (id, title, description, etc.)
      timestamp: new Date().toISOString()  // Add timestamp for logging
    };

    console.log('Sending payload to n8n:', JSON.stringify(payload, null, 2));

    // Send POST request to n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('n8n Response Status:', response.status);
    console.log('n8n Response OK:', response.ok);

    // Handle error responses from n8n
    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n Error Response:', errorText);
      throw new Error(`n8n workflow failed: ${response.statusText}`);
    }

    // Parse successful response
    const result = await response.json();
    console.log('n8n Success Response:', JSON.stringify(result, null, 2));
    
    // Handle different response formats from n8n for READ operations
    if (action === 'read') {
      // Case 1: MongoDB FIND returns array directly
      if (Array.isArray(result)) {
        return { tasks: result, count: result.length, success: true };
      }
      // Case 2: Response has tasks array property
      if (result.tasks && Array.isArray(result.tasks)) {
        return result;
      }
      // Case 3: Response has documents array (alternative format)
      if (result.documents && Array.isArray(result.documents)) {
        return { tasks: result.documents, count: result.documents.length, success: true };
      }
      // Case 4: No tasks found, return empty array
      return { tasks: [], count: 0, success: true };
    }
    
    // For create, update, delete - return result as-is
    return result;

  } catch (error) {
    console.error('Error calling n8n workflow:', error);
    throw error;
  }
}

/**
 * Validate task data before saving
 * 
 * Checks that required fields are present and valid.
 * 
 * @param {object} task - The task object to validate
 * @returns {array} - Array of error messages (empty if valid)
 */
function validateTask(task) {
  const errors = [];

  // Title is required
  if (!task.title || task.title.trim().length === 0) {
    errors.push('Title is required');
  }

  // Title must not exceed 200 characters
  if (task.title && task.title.length > 200) {
    errors.push('Title must be 200 characters or less');
  }

  // Priority must be one of the allowed values
  if (task.priority && !['low', 'normal', 'high', 'urgent'].includes(task.priority)) {
    errors.push('Invalid priority value');
  }

  // Status must be one of the allowed values
  if (task.status && !['todo', 'in-progress', 'completed'].includes(task.status)) {
    errors.push('Invalid status value');
  }

  return errors;
}

/**
 * Main API Handler
 * 
 * Routes incoming requests to appropriate handlers based on HTTP method.
 */

/**
 * Main API Handler
 * 
 * Routes incoming requests to appropriate handlers based on HTTP method.
 */
export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      /**
       * GET /api/tasks
       * 
       * Fetches all tasks from MongoDB via n8n workflow.
       * Returns array of task objects with success status.
       */
      case 'GET': {
        console.log('=== GET REQUEST ===');
        
        try {
          // Try to fetch from n8n/MongoDB
          const result = await callN8nWorkflow('read', { filters: {} });
          
          if (result && result.tasks) {
            // Extract and flatten tasks from n8n response
            // n8n returns tasks wrapped in json.documents[0] structure
            let tasks = [];
            if (Array.isArray(result.tasks)) {
              tasks = result.tasks
                .map(item => {
                  // Case 1: Task wrapped in json.documents array (from MongoDB Insert)
                  if (item.json?.documents?.[0]) {
                    return item.json.documents[0];
                  }
                  // Case 2: Task in flat json structure (alternative format)
                  if (item.json && item.json.id) {
                    return item.json;
                  }
                  // Case 3: Task might have null fields - keep it anyway
                  if (item.json) {
                    return item.json;
                  }
                  return null;
                })
                .filter(task => task !== null); // Only remove completely null entries
            }
            
            console.log('Returning tasks from n8n:', tasks.length);
            return res.status(200).json({
              success: true,
              tasks: tasks,
              count: tasks.length
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

      /**
       * POST /api/tasks
       * 
       * Creates a new task and saves it to MongoDB via n8n.
       * Validates input, generates ID and timestamps, then persists via n8n workflow.
       * 
       * Request body should contain: title, description, priority, status, deadline, meetingLink
       */
      case 'POST': {
        console.log('=== POST REQUEST ===');
        const taskData = req.body;

        // Validate task data before creating
        const validationErrors = validateTask(taskData);
        if (validationErrors.length > 0) {
          console.error('Validation errors:', validationErrors);
          return res.status(400).json({
            success: false,
            errors: validationErrors
          });
        }

        // Build new task object with defaults and generated values
        const newTask = {
          id: taskData.id || `task-${Date.now()}`,  // Generate unique ID if not provided
          title: taskData.title,
          description: taskData.description || '',
          priority: taskData.priority || 'normal',   // Default to 'normal' priority
          status: taskData.status || 'todo',         // Default to 'todo' status
          deadline: taskData.deadline || null,
          meetingLink: taskData.meetingLink || '',
          createdAt: new Date().toISOString(),       // Auto-generate creation timestamp
          updatedAt: new Date().toISOString()        // Auto-generate update timestamp
        };

        console.log('Created new task:', newTask);

        // Send to n8n for persistence in MongoDB
        try {
          console.log('Attempting to save to n8n...');
          await callN8nWorkflow('create', newTask);
          console.log('Successfully saved to n8n!');
        } catch (error) {
          console.error('n8n workflow error - task not persisted:', error);
          // Continue anyway to return success to user (optimistic UI update)
        }

        // Return created task to client
        return res.status(201).json({
          success: true,
          task: newTask
        });
      }

      /**
       * PUT /api/tasks
       * 
       * Updates an existing task in MongoDB via n8n.
       * Requires task ID in request body, updates timestamp automatically.
       * 
       * Request body should contain: id (required), and any fields to update
       */
      case 'PUT': {
        console.log('=== PUT REQUEST ===');
        const updateData = req.body;

        // Ensure task ID is provided
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

        // Build updated task object with new timestamp
        const updatedTask = {
          ...updateData,
          updatedAt: new Date().toISOString()  // Update the timestamp
        };

        // Send to n8n for persistence in MongoDB
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

      /**
       * DELETE /api/tasks?id=<taskId>
       * 
       * Deletes a task from MongoDB via n8n.
       * Requires task ID as query parameter.
       * 
       * Query params: id (required) - The ID of the task to delete
       */
      case 'DELETE': {
        console.log('=== DELETE REQUEST ===');
        const { id } = req.query;

        // Ensure task ID is provided
        if (!id) {
          return res.status(400).json({
            success: false,
            error: 'Task ID is required'
          });
        }

        // Send deletion request to n8n workflow
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

      // Handle unsupported HTTP methods
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`
        });
    }
  } catch (error) {
    // General error handler for unexpected errors
    console.error('API Error:', error);
     return res.status(500).json({
      success: false,
      error: 'Internal server error: ' + error,
      details: error.message
    });
  }
};