# n8n Quick Reference Guide

**Instance URL:** https://iitian-om.app.n8n.cloud  
**Webhook:** https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync

---

## Quick Test Commands

### PowerShell Test
```powershell
# Basic test
Invoke-WebRequest `
  -Uri "https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Test Event","type":"meeting"}'

# With all fields
Invoke-WebRequest `
  -Uri "https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Team Meeting","type":"meeting","source":"manual","priority":"high"}'
```

### CURL (Cross-platform)
```bash
# Basic test
curl -X POST \
  https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Event","type":"task"}'

# With all fields
curl -X POST \
  https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete Documentation","type":"task","source":"frontend","priority":"normal"}'
```

### JavaScript (Frontend)
```javascript
// Using fetch API
async function sendEvent(eventData) {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });
    
    const data = await response.json();
    console.log('Event sent:', data);
    return data;
  } catch (error) {
    console.error('Error sending event:', error);
    throw error;
  }
}

// Example usage
sendEvent({
  title: "Team Standup",
  type: "meeting",
  source: "frontend",
  priority: "normal"
});
```

### Next.js API Route
```javascript
// pages/api/events.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: req.body.title,
        type: req.body.type || 'event',
        source: 'frontend',
        priority: req.body.priority || 'normal',
      })
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to trigger workflow' });
  }
}
```

---

## Event Payload Structure

### Minimum Required
```json
{
  "title": "Event Title"
}
```

### Recommended
```json
{
  "title": "Team Meeting",
  "type": "meeting"
}
```

### Complete
```json
{
  "title": "Q4 Planning Meeting",
  "type": "meeting",
  "source": "frontend",
  "priority": "high",
  "startTime": "2025-11-01T10:00:00Z",
  "endTime": "2025-11-01T11:30:00Z",
  "location": "Conference Room A",
  "description": "Quarterly planning session",
  "attendees": ["user1@example.com", "user2@example.com"]
}
```

---

## Event Types

| Type | Description | Use Case |
|------|-------------|----------|
| `meeting` | Scheduled meetings | Team standups, client calls |
| `task` | Tasks/assignments | Work items, to-dos |
| `reminder` | Notification reminders | Follow-ups, alerts |
| `deadline` | Project deadlines | Submission dates, milestones |
| `class` | Academic classes | College lectures, courses |
| `event` | General events | Conferences, workshops |

---

## Priority Levels

| Priority | When to Use | Example |
|----------|-------------|---------|
| `urgent` | Immediate action needed | Emergency meeting, critical bug |
| `high` | Important, time-sensitive | Client deadline, exam |
| `normal` | Standard priority (default) | Regular tasks, routine meetings |
| `low` | Can be deferred | Nice-to-have features, optional tasks |

---

## Expected Responses

### Success (200 OK)
```json
{
  "message": "Workflow was started",
  "statusCode": 200
}
```

### Error (400 Bad Request)
```json
{
  "error": "Invalid payload",
  "statusCode": 400
}
```

### Error (500 Internal Server Error)
```json
{
  "error": "Workflow execution failed",
  "statusCode": 500
}
```

---

## Function Node Reference

### Current Implementation
```javascript
const data = $json || {};

return [
  {
    json: {
      title: data.title || "Untitled Event",
      type: data.type || "unknown",
      source: data.source || "manual",
      priority: data.priority || "normal",
      receivedAt: new Date().toISOString()
    }
  }
];
```

### Available Variables
- `$json` - Incoming JSON payload
- `$node` - Current node information
- `$workflow` - Workflow metadata
- `$execution` - Execution details

### Useful Methods
```javascript
// Current timestamp
new Date().toISOString()

// Date manipulation
new Date(Date.now() + 3600000) // +1 hour

// String operations
data.title?.toLowerCase()
data.title?.trim()

// Array operations
data.attendees?.filter(Boolean)
data.attendees?.map(e => e.trim())

// Object operations
Object.keys(data).length
Object.assign({}, defaults, data)
```

---

## Debugging Tips

### Check n8n Execution Logs
1. Log in to https://iitian-om.app.n8n.cloud
2. Go to "Executions" tab
3. View latest execution details
4. Check input/output data at each node

### Add Console Logging
```javascript
// In Function node
const data = $json || {};
console.log('Received data:', JSON.stringify(data, null, 2));

// Process data
const result = {
  json: {
    title: data.title || "Untitled",
    receivedAt: new Date().toISOString()
  }
};

console.log('Returning:', JSON.stringify(result, null, 2));
return [result];
```

### Test Individual Nodes
1. In n8n workflow editor, click any node
2. Use "Test Step" to run just that node
3. Verify input/output data
4. Fix any transformation issues

---

## Common Issues & Solutions

### Issue: Webhook returns 404
**Solution:** Check webhook URL is exactly:
```
https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync
```

### Issue: Workflow doesn't trigger
**Solution:** 
1. Verify workflow is **Active** (toggle in top-right)
2. Check webhook node is set to "Production URL"
3. Ensure no syntax errors in Function node

### Issue: JSON parsing error
**Solution:**
- Ensure Content-Type header is `application/json`
- Validate JSON syntax (use JSONLint.com)
- Check for trailing commas in object

### Issue: Missing data in response
**Solution:**
- Log incoming data in Function node
- Verify field names match exactly (case-sensitive)
- Check for typos in property names

---

## Environment Setup Checklist

- [ ] n8n Cloud account created ✅
- [ ] Webhook endpoint configured ✅
- [ ] Function node tested ✅
- [ ] `.env.local` file created
- [ ] `NEXT_PUBLIC_N8N_WEBHOOK_URL` set
- [ ] Frontend can call webhook
- [ ] Database connection (pending)

---

## Next Steps After Database Setup

### 1. Add MongoDB Node
```
Webhook → Function → MongoDB (Insert) → Respond to Webhook
```

### 2. Example Insert Configuration
- **Collection:** events
- **Fields:**
  - title: `{{$json.title}}`
  - type: `{{$json.type}}`
  - priority: `{{$json.priority}}`
  - createdAt: `{{$now}}`

### 3. Test Database Write
```powershell
Invoke-WebRequest `
  -Uri "https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Test DB Write","type":"task"}'
```

### 4. Verify in MongoDB Atlas
- Log in to MongoDB Atlas
- Browse collection: `projectx.events`
- Confirm new document created

---

## Resources

- **n8n Docs:** https://docs.n8n.io/
- **Webhook Testing:** https://webhook.site (alternative test endpoint)
- **JSON Validator:** https://jsonlint.com
- **Status Page:** Check n8n Cloud status if having issues

---

*Last Updated: October 28, 2025*  
*Quick reference for n8n webhook integration*
