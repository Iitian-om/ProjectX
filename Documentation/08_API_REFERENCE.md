# 08 API REFERENCE

Complete API endpoints and data models.

---

## 📋 Overview

ProjectX has 2 main API layers:

1. **Frontend Routes** (`/pages/api/`)
   - Direct endpoint access
   - Called by frontend components
   - Handles Clerk auth

2. **n8n Webhooks**
   - Automation & data sync
   - Triggered by frontend
   - Updates MongoDB

---

## 🔌 Frontend API Routes

### Tasks Endpoint

**Base URL:** `http://localhost:3000/api/tasks`

#### GET /api/tasks

Fetch tasks for current user

```
Method: GET
Headers: (No headers needed, uses Clerk context)
Query Params: None
```

**Response:**

```javascript
{
  statusCode: 200,
  data: [
    {
      _id: "507f1f77bcf86cd799439011",
      userId: "user_123",
      title: "Learn Next.js",
      description: "Complete Next.js tutorial",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-02-15T00:00:00Z",
      createdAt: "2026-01-18T10:30:00Z",
      updatedAt: "2026-01-18T10:30:00Z"
    },
    {
      _id: "507f1f77bcf86cd799439012",
      userId: "user_123",
      title: "Fix bugs",
      status: "todo",
      priority: "normal",
      dueDate: "2026-01-25T00:00:00Z",
      createdAt: "2026-01-17T14:20:00Z",
      updatedAt: "2026-01-17T14:20:00Z"
    }
  ]
}
```

**Errors:**

```javascript
// 401 - Not authenticated
{
  statusCode: 401,
  error: "User not authenticated"
}

// 500 - Server error
{
  statusCode: 500,
  error: "Failed to fetch tasks"
}
```

---

#### POST /api/tasks (via n8n)

Create new task

```
Actually routed through n8n webhook
See Section: "n8n Webhook Endpoints"
```

---

### Events Endpoint

**Base URL:** `http://localhost:3000/api/events`

#### GET /api/events

Fetch events for current user

```
Method: GET
Headers: (Clerk context)
Query Params: 
  - startDate: ISO string (optional)
  - endDate: ISO string (optional)
```

**Response:**

```javascript
{
  statusCode: 200,
  data: [
    {
      _id: "507f1f77bcf86cd799439021",
      userId: "user_123",
      title: "Team standup",
      startTime: "2026-01-20T09:00:00Z",
      endTime: "2026-01-20T09:30:00Z",
      location: "Conference Room A",
      source: "manual",
      createdAt: "2026-01-18T10:30:00Z",
      updatedAt: "2026-01-18T10:30:00Z"
    }
  ]
}
```

**Errors:**

```javascript
// 401 - Not authenticated
{
  statusCode: 401,
  error: "User not authenticated"
}
```

---

#### POST /api/events (via n8n)

Create new event

```
Actually routed through n8n webhook
See Section: "n8n Webhook Endpoints"
```

---

## 🌐 n8n Webhook Endpoints

### Primary Webhook

**URL:** `https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync`

**Method:** POST  
**Content-Type:** `application/json`

---

#### POST - Create Task

```javascript
Request:
{
  "title": "Finish documentation",
  "description": "Complete API reference docs",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-02-01T00:00:00Z",
  "userId": "user_2mHSDvNQQQ1l8kaSIGsomething",
  "type": "task"
}

Response:
{
  "success": true,
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Finish documentation",
    "description": "Complete API reference docs",
    "status": "todo",
    "priority": "high",
    "dueDate": "2026-02-01T00:00:00Z",
    "userId": "user_2mHSDvNQQQ1l8kaSIGsomething",
    "createdAt": "2026-01-18T10:30:00Z",
    "updatedAt": "2026-01-18T10:30:00Z"
  }
}
```

---

#### POST - Create Event

```javascript
Request:
{
  "title": "Product demo",
  "startTime": "2026-01-25T14:00:00Z",
  "endTime": "2026-01-25T15:00:00Z",
  "location": "Zoom: meet.google.com/xyz",
  "userId": "user_2mHSDvNQQQ1l8kaSIGsomething",
  "type": "event"
}

Response:
{
  "success": true,
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    "title": "Product demo",
    "startTime": "2026-01-25T14:00:00Z",
    "endTime": "2026-01-25T15:00:00Z",
    "location": "Zoom: meet.google.com/xyz",
    "userId": "user_2mHSDvNQQQ1l8kaSIGsomething",
    "source": "manual",
    "createdAt": "2026-01-18T10:30:00Z",
    "updatedAt": "2026-01-18T10:30:00Z"
  }
}
```

---

#### POST - Update Task

```javascript
Request:
{
  "action": "update",
  "_id": "507f1f77bcf86cd799439011",
  "status": "done",
  "userId": "user_2mHSDvNQQQ1l8kaSIGsomething"
}

Response:
{
  "success": true,
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Finish documentation",
    "status": "done",
    "updatedAt": "2026-01-18T12:45:00Z"
  }
}
```

---

#### POST - Delete Task

```javascript
Request:
{
  "action": "delete",
  "_id": "507f1f77bcf86cd799439011",
  "userId": "user_2mHSDvNQQQ1l8kaSIGsomething"
}

Response:
{
  "success": true,
  "statusCode": 200,
  "message": "Document deleted successfully"
}
```

---

## 📊 Data Models

### Task Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Yes | MongoDB ID |
| `userId` | String | Yes | Clerk user ID |
| `title` | String | Yes | Task title |
| `description` | String | No | Task details |
| `status` | Enum | Yes | todo, in-progress, done |
| `priority` | Enum | Yes | low, normal, high |
| `dueDate` | Date | No | When task is due |
| `createdAt` | Date | Yes | Creation timestamp |
| `updatedAt` | Date | Yes | Last update timestamp |

**Example:**

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "userId": "user_2mHSDvNQQQ1l8kaSIGsomething",
  "title": "Build API integration",
  "description": "Connect frontend to backend",
  "status": "in-progress",
  "priority": "high",
  "dueDate": ISODate("2026-02-15T00:00:00Z"),
  "createdAt": ISODate("2026-01-18T10:30:00Z"),
  "updatedAt": ISODate("2026-01-18T12:45:00Z")
}
```

---

### Event Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Yes | MongoDB ID |
| `userId` | String | Yes | Clerk user ID |
| `title` | String | Yes | Event title |
| `startTime` | Date | Yes | Start timestamp |
| `endTime` | Date | Yes | End timestamp |
| `location` | String | No | Physical/virtual location |
| `source` | String | Yes | manual, google, outlook |
| `createdAt` | Date | Yes | Creation timestamp |
| `updatedAt` | Date | Yes | Last update timestamp |

**Example:**

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439021"),
  "userId": "user_2mHSDvNQQQ1l8kaSIGsomething",
  "title": "Sprint planning",
  "startTime": ISODate("2026-01-20T09:00:00Z"),
  "endTime": ISODate("2026-01-20T10:00:00Z"),
  "location": "Conference Room B",
  "source": "manual",
  "createdAt": ISODate("2026-01-18T10:30:00Z"),
  "updatedAt": ISODate("2026-01-18T10:30:00Z")
}
```

---

### User Model (Clerk)

ProjectX doesn't directly store user data, but gets it from Clerk:

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `userId` | String | Clerk | Unique ID for all operations |
| `email` | String | Clerk | User email |
| `firstName` | String | Clerk | First name |
| `lastName` | String | Clerk | Last name |
| `profileImage` | String | Clerk | Avatar URL |

**In Code:**

```javascript
import { useUser } from '@clerk/nextjs';

export default function MyComponent() {
  const { user } = useUser();
  
  // user.id is the userId for API calls
  // user.primaryEmailAddress.emailAddress
  // user.firstName, user.lastName
}
```

---

## 🚀 Common Requests

### Create Task with Frontend

```javascript
// pages/tasks.js
async function handleCreateTask(formData) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        userId: user.id,
        type: 'task',
        status: 'todo'
      })
    }
  );
  
  const result = await response.json();
  if (result.success) {
    // Refresh tasks list
    fetchTasks();
  }
}
```

---

### Fetch Tasks with Clerk Auth

```javascript
// pages/api/tasks.js
import { getAuth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/db';

export default async function handler(req, res) {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  const db = await connectDB();
  const tasks = await db.collection('tasks')
    .find({ userId })
    .toArray();
  
  res.json({ data: tasks });
}
```

---

### Update Task Status

```javascript
// Component
async function handleStatusChange(taskId, newStatus) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update',
        _id: taskId,
        status: newStatus,
        userId: user.id
      })
    }
  );
  
  const result = await response.json();
  return result.success;
}
```

---

## ❌ Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 200 | Success | Great! |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Check request format & required fields |
| 401 | Unauthorized | Login required |
| 403 | Forbidden | Don't have permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Contact support |

---

## 🔐 Authentication

All requests are automatically authenticated via:

1. **Clerk Middleware**
   - Checks if user is logged in
   - Injects `userId` into request
   - Blocks unauthenticated requests

2. **Frontend Environment**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   ```

3. **API Protection**
   ```javascript
   const { userId } = getAuth(req);
   if (!userId) return res.status(401).json({...});
   ```

---

## 💡 Rate Limiting

**Current:** None (future improvement)

**Recommended Limits:**
- 100 requests per minute per user
- 1000 tasks per user
- 50 events per user

---

## 🧪 Testing with cURL

### Create Task

```bash
curl -X POST \
  https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test task",
    "userId": "user_123",
    "type": "task",
    "status": "todo"
  }'
```

### Create Event

```bash
curl -X POST \
  https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test event",
    "startTime": "2026-01-20T14:00:00Z",
    "endTime": "2026-01-20T15:00:00Z",
    "userId": "user_123",
    "type": "event"
  }'
```

### Fetch Tasks (Local)

```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

---

## 📈 Response Times

| Endpoint | Typical | Max |
|----------|---------|-----|
| GET /tasks | 100ms | 500ms |
| POST /webhook | 200ms | 1s |
| GET /events | 100ms | 500ms |

---

## 🔗 Related Files

- **Want workflow details?** → [07_N8N_WORKFLOWS.md](07_N8N_WORKFLOWS.md)
- **Want architecture?** → [05_ARCHITECTURE.md](05_ARCHITECTURE.md)
- **Want to test?** → [10_TESTING.md](10_TESTING.md)

---

Last Updated: Jan 18, 2026
