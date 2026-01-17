# 07 N8N WORKFLOWS

Automation setup and workflow documentation.

---

## 🤖 What is n8n?

n8n is workflow automation software:
- 🔗 Connect apps & services
- 🔄 Automate repetitive tasks
- 🚀 Build without code
- 💾 Self-hosted or cloud

**ProjectX uses:** n8n Cloud with MongoDB integration

---

## 🏗️ Workflow Architecture

### Current Workflow: projectx-task-sync

```
Webhook Input
    ↓
Function Node (Validate)
    ↓
Set Node (Transform Data)
    ↓
MongoDB Node (Save)
    ↓
Response Output
```

### What It Does

```
User creates task in frontend
    ↓
POST request to n8n webhook
    ↓
n8n validates the data
    ↓
Creates object in MongoDB
    ↓
Returns success response
    ↓
Frontend updates UI
```

---

## 📡 Webhook URL

```
https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync
```

**Method:** POST  
**Content-Type:** application/json

---

## 📨 Request Format

### Create Task Request

```javascript
{
  "title": "Finish project",
  "description": "Complete the MVP",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-02-15",
  "userId": "user_123",
  "type": "task"
}
```

### Create Event Request

```javascript
{
  "title": "Team meeting",
  "startTime": "2026-01-20T14:00:00Z",
  "endTime": "2026-01-20T15:00:00Z",
  "location": "Zoom",
  "userId": "user_123",
  "type": "event"
}
```

---

## 📥 Response Format

### Success Response

```javascript
{
  "success": true,
  "statusCode": 200,
  "data": {
    "_id": "ObjectId",
    "title": "...",
    "userId": "user_123",
    "createdAt": "2026-01-18T..."
  }
}
```

### Error Response

```javascript
{
  "success": false,
  "statusCode": 400,
  "error": "Missing required field: title"
}
```

---

## 🔧 Workflow Nodes

### 1. Webhook (Input)

**Trigger:** Receives POST request

```
Listen on: /webhook-test/projectx/sync
Method: POST
Response: {body}
```

### 2. Function Node (Validation)

**Purpose:** Validate incoming data

```javascript
// Pseudo code
if (!data.title) {
  throw new Error('Title required');
}
if (!data.userId) {
  throw new Error('User ID required');
}
return data;
```

### 3. Set Node (Transform)

**Purpose:** Prepare data for database

```javascript
{
  title: $.title,
  description: $.description || '',
  status: $.status || 'todo',
  priority: $.priority || 'normal',
  dueDate: $.dueDate,
  userId: $.userId,
  type: $.type,
  createdAt: new Date(),
  updatedAt: new Date()
}
```

### 4. MongoDB Node (Database)

**Operation:** Insert document

```
Database: projectx (cluster01)
Collection: tasks or events (based on type)
Operation: Insert One
Document: [data from Set node]
```

### 5. Response Node (Output)

**Return:** Success message to frontend

```javascript
{
  success: true,
  statusCode: 200,
  data: $.output
}
```

---

## ✅ CRUD Operations

### CREATE (POST)

```
Webhook → Validate → Transform → MongoDB Insert → Response
```

**Example:**
```javascript
POST /webhook-test/projectx/sync
Body: { title: "New task", userId: "user_123" }
Response: { success: true, data: {_id: "...", ...} }
```

### READ (GET)

```
API Route → MongoDB Query → Format → Response
```

**Example:**
```javascript
// In frontend/pages/api/tasks.js
GET /api/tasks?userId=user_123
// n8n finds tasks where userId matches
Response: { tasks: [...] }
```

### UPDATE (PUT)

```
Webhook → Find → Validate → MongoDB Update → Response
```

**Example:**
```javascript
POST /webhook-test/projectx/sync?action=update
Body: { _id: "...", status: "done", userId: "user_123" }
Response: { success: true, data: {...} }
```

### DELETE (DELETE)

```
Webhook → Find → MongoDB Delete → Response
```

**Example:**
```javascript
POST /webhook-test/projectx/sync?action=delete
Body: { _id: "...", userId: "user_123" }
Response: { success: true, message: "Deleted" }
```

---

## 🧪 Testing Workflows

### Test with PowerShell

```powershell
$body = @{
  title = "Test task"
  userId = "test_user_123"
  type = "task"
} | ConvertTo-Json

Invoke-WebRequest `
  -Uri "https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### Test with cURL

```bash
curl -X POST \
  https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test task",
    "userId": "test_user_123",
    "type": "task"
  }'
```

### Test with Frontend

```javascript
const response = await fetch(
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Test task',
      userId: user.id,
      type: 'task'
    })
  }
);

const data = await response.json();
console.log(data);
```

---

## 🔒 Security Considerations

### User ID Verification
- Always include userId in requests
- MongoDB queries filter by userId
- Prevents data leaks between users

### Input Validation
- Required fields checked
- Data types validated
- Malicious input rejected

### Error Handling
- Invalid requests return 400 status
- Detailed error messages
- Graceful failure

### Future: API Keys
- Plan to add authentication tokens
- Rate limiting
- Request signing

---

## 📊 Collections Structure

### Tasks Collection

```javascript
{
  _id: ObjectId,
  userId: String,      // From Clerk
  title: String,       // Required
  description: String, // Optional
  status: String,      // 'todo', 'in-progress', 'done'
  priority: String,    // 'low', 'normal', 'high'
  dueDate: Date,       // Optional
  createdAt: Date,
  updatedAt: Date
}
```

### Events Collection

```javascript
{
  _id: ObjectId,
  userId: String,      // From Clerk
  title: String,       // Required
  startTime: Date,     // Required
  endTime: Date,       // Required
  location: String,    // Optional
  source: String,      // 'manual', 'google', 'outlook'
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deploying Workflows

### n8n Cloud

1. **Create Account**
   - Go to n8n.cloud
   - Sign up (free tier)

2. **Create Workflow**
   - New workflow
   - Add nodes (Webhook → Function → Set → MongoDB)
   - Configure each node

3. **MongoDB Connection**
   - Get MongoDB connection string
   - Add to n8n credentials
   - Configure database name

4. **Deploy**
   - Click "Execute workflow"
   - Get webhook URL
   - Add to `.env.local`

### Testing in n8n UI

1. Open workflow
2. Click "Test" on each node
3. Provide sample data
4. Check node outputs
5. Verify MongoDB inserts

---

## 🐛 Troubleshooting

### Workflow Not Triggering
- Check webhook URL in `.env.local`
- Verify POST method
- Check Content-Type header

### Data Not Saving
- Check MongoDB connection
- Verify collection exists
- Check node error messages

### User Data Mixed Up
- Verify userId in request
- Check MongoDB queries filter by userId
- Test with different users

### Slow Responses
- Check MongoDB indexing
- Check n8n performance
- Consider caching layer

---

## 📈 Future Improvements

- [ ] Add request authentication tokens
- [ ] Implement rate limiting
- [ ] Add logging & monitoring
- [ ] Create scheduled workflows (reminders)
- [ ] Add Google Calendar sync
- [ ] Add Outlook integration

---

## 📚 Resources

- **n8n Docs:** https://docs.n8n.io
- **MongoDB Docs:** https://docs.mongodb.com
- **Webhook Basics:** https://webhook.cool
- **API Design:** https://restfulapi.net

---

## 🔗 Related Files

- **Want system architecture?** → [05_ARCHITECTURE.md](05_ARCHITECTURE.md)
- **Want full roadmap?** → [03_ROADMAP.md](03_ROADMAP.md)
- **Want to test?** → [10_TESTING.md](10_TESTING.md)

---

Last Updated: Jan 18, 2026
