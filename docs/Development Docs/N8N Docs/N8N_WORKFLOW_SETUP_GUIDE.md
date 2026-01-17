# n8n Workflow Setup Guide - ProjectX Task Management

## Quick Start

This guide helps you complete the n8n workflow for Phase 2 Task Management. Currently you have **2 nodes**, you need to add **2 more nodes** to enable full CRUD operations with MongoDB.

---

## 🎯 Goal

Enable these operations:
- ✅ **CREATE** - Save new tasks to MongoDB
- ✅ **READ** - Fetch all tasks from MongoDB (currently missing!)
- ✅ **UPDATE** - Modify existing tasks
- ✅ **DELETE** - Remove tasks

---

## 📊 Current Workflow (Incomplete)

```
┌─────────────┐
│  1. Webhook │  ✅ You have this
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  2. ?????? │  ❌ MISSING NODE 2
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  3. ?????? │  ❌ MISSING NODE 3
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  4. MongoDB │  ✅ You have this (maybe?)
└─────────────┘
```

---

## ✨ Complete Workflow (Target)

```
┌─────────────┐
│  1. Webhook │  ← Receives POST from Next.js
│   (Trigger) │     
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ 2. Function │  ← Parses action: create/read/update/delete
│    Node     │     Extracts data from payload
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   3. Set    │  ← Formats data for MongoDB
│    Node     │     Maps fields, adds timestamps
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  4. MongoDB │  ← Executes database operation
│    Node     │     Collection: events, DB: projectx
└─────────────┘
```

---

## 🛠️ Step-by-Step Instructions

### Step 1: Open Your n8n Workflow

1. Go to: https://iitian-om.app.n8n.cloud
2. Sign in to your account
3. Find your **ProjectX** workflow
4. Click to open the workflow editor

---

### Step 2: Add Function Node (Node 2)

**Purpose:** Parse the incoming action and route to correct database operation

1. **Click the `+` button** after your Webhook node
2. **Search for:** `Function`
3. **Select:** "Function" node
4. **Click to edit** the Function node

5. **Paste this JavaScript code:**

```javascript
// Get the webhook payload
const action = $input.item.json.action;
const data = $input.item.json;

// Prepare operation based on action type
let operation = '';
let query = {};
let updateData = {};

switch(action) {
  case 'create':
    operation = 'insert';
    break;
  
  case 'read':
    operation = 'find';
    query = data.filters || {};
    break;
  
  case 'update':
    operation = 'update';
    query = { id: data.id };
    updateData = {
      $set: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        deadline: data.deadline,
        meetingLink: data.meetingLink,
        updatedAt: new Date().toISOString()
      }
    };
    break;
  
  case 'delete':
    operation = 'delete';
    query = { id: data.id };
    break;
  
  default:
    throw new Error(`Unknown action: ${action}`);
}

// Return formatted data for next node
return {
  json: {
    operation: operation,
    query: query,
    document: data,
    updateData: updateData
  }
};
```

6. **Save** the Function node
7. **Connect** Webhook → Function (drag arrow from Webhook output to Function input)

---

### Step 3: Add Set Node (Node 3)

**Purpose:** Format data for MongoDB node with proper field mapping

1. **Click the `+` button** after your Function node
2. **Search for:** `Set`
3. **Select:** "Set" node
4. **Click to edit** the Set node

5. **Configure these fields:**

| Field Name | Value (Use Expression Mode) |
|------------|----------------------------|
| `collection` | `events` _(fixed value)_ |
| `database` | `projectx` _(fixed value)_ |
| `operation` | `{{ $json.operation }}` |
| `query` | `{{ $json.query }}` |
| `document` | `{{ $json.document }}` |
| `updateData` | `{{ $json.updateData }}` |

**How to add these:**
- Click **"Add Value"** button
- Choose **"String"** for collection and database
- Choose **"Expression"** for others (click the `=` icon)
- Paste the values exactly as shown above

6. **Save** the Set node
7. **Connect** Function → Set

---

### Step 4: Configure MongoDB Node (Node 4)

**Purpose:** Execute the actual database operation

#### If you DON'T have MongoDB node yet:

1. **Click the `+` button** after Set node
2. **Search for:** `MongoDB`
3. **Select:** "MongoDB" node
4. Go to **Step 4b** below

#### If you ALREADY have MongoDB node:

1. **Click** on your existing MongoDB node
2. Go to **Step 4b** below

---

#### Step 4b: Configure MongoDB Credentials

1. Click **"Create New Credential"** (or select existing if you have one)
2. Fill in these details:

   ```
   Connection String: mongodb+srv://cluster01.2jxbqzt.mongodb.net/projectx
   User: ProjectX_Admin
   Password: dbAdminUserPassword
   ```

   **OR use individual fields:**
   ```
   Host: cluster01.2jxbqzt.mongodb.net
   Database: projectx
   User: ProjectX_Admin
   Password: dbAdminUserPassword
   Port: 27017
   ```

3. Click **"Test Connection"** - should show success ✅
4. **Save** credential

---

#### Step 4c: Configure MongoDB Operations

1. **Collection:** `events`
2. **Operation:** Click the **expression icon (=)** and enter: `{{ $json.operation }}`

3. **For INSERT operation:**
   - Fields to Insert: `{{ $json.document }}`

4. **For FIND operation:**
   - Query: `{{ $json.query }}`
   - Limit: `100` (or leave empty for all)

5. **For UPDATE operation:**
   - Query: `{{ $json.query }}`
   - Update: `{{ $json.updateData }}`

6. **For DELETE operation:**
   - Query: `{{ $json.query }}`

7. **Connect** Set → MongoDB

---

### Step 5: Activate Workflow

1. **Save** your workflow (top right corner)
2. Toggle **"Active"** switch (top right corner) - should turn green ✅
3. Your workflow is now live!

---

## 🧪 Testing Your Workflow

### Test 1: Create Task (INSERT)

**In your browser:**
1. Go to `http://localhost:3000/tasks`
2. Click **"Create Task"** button
3. Fill in:
   - Title: "Test n8n Integration"
   - Description: "Verify workflow is working"
   - Priority: High
   - Status: To Do
   - Deadline: Tomorrow
4. Click **"Create Task"**
5. Refresh the page
6. Task should still be there! ✅

**Check n8n execution:**
- Go to n8n workflow
- Click **"Executions"** tab
- You should see a successful execution with green checkmark

---

### Test 2: Read Tasks (FIND)

**In your browser:**
1. Go to `http://localhost:3000/tasks`
2. Page should load with your tasks from MongoDB
3. Try filters: "To Do", "In Progress", "High Priority"

**Check n8n execution:**
- Each page load = one execution in n8n
- Check execution details to see the query used

---

### Test 3: Update Task (UPDATE)

**In your browser:**
1. Click **Edit** on any task
2. Change the status to "In Progress"
3. Change priority to "Urgent"
4. Click **"Update Task"**
5. Refresh page
6. Changes should persist! ✅

---

### Test 4: Delete Task (DELETE)

**In your browser:**
1. Click **Edit** on any task
2. Scroll down and click **"Delete Task"** button
3. Confirm deletion
4. Refresh page
5. Task should be gone! ✅

---

## 🐛 Troubleshooting

### Problem: "Unable to fetch tasks" message

**Cause:** n8n workflow is not responding or has errors

**Solution:**
1. Check workflow is **Active** (toggle at top right)
2. Check MongoDB credential is **connected**
3. Review n8n execution logs for error details
4. Verify webhook URL matches your `.env` file

---

### Problem: Tasks save but don't appear after refresh

**Cause:** READ operation not working

**Solution:**
1. Check Function node has `case 'read':` logic
2. Verify MongoDB FIND operation is configured
3. Check collection name is exactly `events`
4. Test with MongoDB Compass to see if data exists

---

### Problem: "Network Error" in browser console

**Cause:** Webhook URL not reachable

**Solution:**
1. Verify webhook URL in `.env`:
   ```
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync
   ```
2. Test webhook directly:
   ```bash
   curl -X POST https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync \
     -H "Content-Type: application/json" \
     -d '{"action":"read","filters":{}}'
   ```
3. Should return tasks JSON

---

### Problem: MongoDB authentication failed

**Cause:** Wrong credentials or IP not whitelisted

**Solution:**
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Navigate to **Database Access**
3. Verify user `ProjectX_Admin` exists with password `dbAdminUserPassword`
4. Go to **Network Access**
5. Add IP address: `0.0.0.0/0` (allow from anywhere) for testing
6. Save and wait 2-3 minutes for changes to apply

---

## 📊 Expected Data Structure in MongoDB

**Collection:** `projectx.events`

**Document Example:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id": "task-1736587920000",
  "title": "Complete Phase 2 Implementation",
  "description": "Implement all CRUD operations",
  "priority": "high",
  "status": "in-progress",
  "deadline": "2025-01-20T10:00:00.000Z",
  "meetingLink": null,
  "createdAt": "2025-01-11T08:32:00.000Z",
  "updatedAt": "2025-01-11T14:15:00.000Z"
}
```

**Important Fields:**
- `id` - Unique identifier (generated by Next.js)
- `title` - Required
- `description` - Optional
- `priority` - "low", "normal", "high", or "urgent"
- `status` - "todo", "in-progress", or "completed"
- `deadline` - ISO date string or null
- `meetingLink` - URL string or null

---

## 🎉 Success Criteria

Your workflow is complete when:

- ✅ You have 4 nodes: Webhook → Function → Set → MongoDB
- ✅ Workflow is **Active** (green toggle)
- ✅ Creating a task shows in MongoDB Atlas
- ✅ Page refresh shows all tasks from database
- ✅ Editing a task persists after refresh
- ✅ Deleting a task removes from database
- ✅ Filters work with real MongoDB data
- ✅ n8n executions show green checkmarks

---

## 📚 Additional Resources

**n8n Documentation:**
- MongoDB Node: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.mongodb/
- Function Node: https://docs.n8n.io/code-examples/javascript-functions/
- Webhook Node: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/

**MongoDB Atlas:**
- Dashboard: https://cloud.mongodb.com
- Connection Guide: https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/

**ProjectX Docs:**
- API Documentation: http://localhost:3000/api-docs
- Roadmap: http://localhost:3000/roadmap

---

## 🆘 Need Help?

If you're stuck:
1. Check n8n execution logs (Executions tab)
2. Review MongoDB Atlas logs (Database → Browse Collections)
3. Check browser console for JavaScript errors
4. Verify `.env` file has correct webhook URL
5. Refer to `PHASE2_BUGFIXES.md` for detailed fix explanations

**Last Updated:** January 11, 2025
**Estimated Setup Time:** 15-20 minutes
