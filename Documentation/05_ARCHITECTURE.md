# 05 ARCHITECTURE

System design and how everything connects.

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                       │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │          Next.js Frontend (React)                │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Pages (Dashboard, Tasks, Timetable)       │  │  │
│  │  │  Components (Navbar, Cards, Forms)         │  │  │
│  │  │  TailwindCSS (Industrial Dusk Theme)       │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────┬───────────────────────────────────┘  │
└─────────────────┼──────────────────────────────────────┘
                  │
                  │ HTTP Requests
                  │
┌─────────────────▼──────────────────────────────────────┐
│           CLERK (Authentication)                       │
│  - Handles login/signup                                │
│  - Issues JWT tokens                                   │
│  - Manages user sessions                               │
└──────────────────────────────────────────────────────┘
                  │
                  │ Authenticated Requests
                  │
┌─────────────────▼──────────────────────────────────────┐
│              N8N CLOUD (Workflows)                     │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Create → Function → Validate → Database       │  │
│  │  Read → Fetch → Format → Response              │  │
│  │  Update → Find → Modify → Save                 │  │
│  │  Delete → Find → Remove → Confirm              │  │
│  └─────────────────────────────────────────────────┘  │
└──────────────────┬───────────────────────────────────┘
                  │
                  │ Database Operations
                  │
┌─────────────────▼──────────────────────────────────────┐
│         MONGODB ATLAS (Database)                       │
│  - User profiles                                        │
│  - Tasks & events                                       │
│  - Reminders & settings                                │
└──────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Examples

### Example 1: User Creates a Task

```
1. User fills form in browser
   ↓
2. Submit form (POST to n8n)
   ↓
3. n8n webhook receives request
   ↓
4. n8n validates data
   ↓
5. n8n saves to MongoDB
   ↓
6. Response sent to frontend
   ↓
7. UI updates (task appears in list)
```

### Example 2: User Views Dashboard

```
1. User navigates to /dashboard
   ↓
2. Clerk checks auth (is user signed in?)
   ↓
3. Page component loads
   ↓
4. Component calls API endpoint
   ↓
5. API calls n8n webhook (GET user's tasks)
   ↓
6. n8n queries MongoDB (fetch tasks where userId = X)
   ↓
7. Results returned to frontend
   ↓
8. React renders task list
```

---

## 🔧 Technology Stack Layers

### Layer 1: Frontend (What User Sees)
```
Next.js 16.0.0       → React framework
  ├─ React 19.2.0    → UI library
  ├─ TailwindCSS 3.3.5 → Styling
  ├─ date-fns 2.30.0  → Date handling
  └─ Axios 1.6.0      → HTTP client
```

### Layer 2: Authentication
```
Clerk 6.34.0        → OAuth2 provider
  ├─ Sign in/up/out
  ├─ User profiles
  └─ JWT tokens
```

### Layer 3: Backend Automation
```
n8n Cloud           → Workflow automation
  ├─ Webhook receiver
  ├─ Function nodes (logic)
  ├─ Set nodes (data transform)
  └─ Database nodes (MongoDB integration)
```

### Layer 4: Database
```
MongoDB Atlas       → NoSQL database
  ├─ Users collection
  ├─ Tasks collection
  ├─ Events collection
  └─ Reminders collection
```

---

## 🔗 Component Architecture

### Frontend Structure

```
frontend/
├── pages/
│   ├── index.js                 # Landing
│   ├── dashboard.js             # Protected dashboard
│   ├── tasks.js                 # Protected task manager
│   ├── timetable.js             # Protected calendar
│   ├── sign-in/[[...index]].js  # Clerk sign-in
│   ├── sign-up/[[...index]].js  # Clerk sign-up
│   └── api/
│       ├── tasks.js             # Task API endpoint
│       └── events.js            # Event API endpoint
│
├── components/
│   ├── Navbar.js        # Navigation (auth-aware)
│   ├── Footer.js        # Footer with links
│   ├── TaskCard.js      # Individual task display
│   ├── TaskForm.js      # Task create/edit form
│   └── EventCard.js     # Event display
│
├── lib/
│   ├── clerkUtils.js    # Clerk helper functions
│   └── useClerkSafe.js  # Custom Clerk hooks
│
└── styles/
    └── globals.css      # Global styles & animations
```

### How Components Connect

```
Navbar
  ├─ useUser() → Check auth
  ├─ conditionally render
  │   ├─ If signed in → show real pages
  │   └─ If not signed in → show demo pages
  └─ UserButton → Sign out

Dashboard
  ├─ useUser() → Get userId
  ├─ useEffect() → Call n8n API
  ├─ setState() → Store stats
  └─ render() → Display data

TaskCard
  └─ Reusable task display component
```

---

## 🚀 Request-Response Cycle

### Create Task Flow

```
Frontend                N8N                  MongoDB
   │                     │                      │
   │─ Form submit       │                      │
   │  POST /api/tasks   │                      │
   ├────────────────────▶                      │
   │                     │─ Validate           │
   │                     │─ Create object      │
   │                     │─ insert task ──────▶│
   │                     │                     │ Save to DB
   │                     │  ◀─ task saved ─────│
   │                     │                     │
   │ ◀──── {success} ────│                      │
   │                     │                      │
   └─ Refresh UI        │                      │
```

### Read Tasks Flow

```
Frontend                N8N                  MongoDB
   │                     │                      │
   │─ useEffect()       │                      │
   │  GET /api/tasks    │                      │
   ├────────────────────▶                      │
   │                     │─ Build query        │
   │                     │  find({userId}) ───▶│
   │                     │                     │ Query DB
   │                     │  ◀─ tasks array ────│
   │                     │                     │
   │ ◀─── {tasks[]} ─────│                      │
   │                     │                      │
   └─ Update state      │                      │
     re-render          │                      │
```

---

## 🔐 Security Flow

```
User Request
    ↓
1. Clerk validates JWT token
   - Is token valid?
   - Has it expired?
   ↓
2. Extract user ID from token
   ↓
3. Middleware checks route protection
   - Is route public or protected?
   ↓
4. If protected, verify user is signed in
   ↓
5. If public, allow access
   ↓
6. Frontend can access data with user context
   ↓
7. n8n includes userId in queries
   - Only fetch user's own data
   - Prevent data leaks
```

---

## 📡 API Endpoints

### Internal API Routes (`frontend/pages/api/`)

```
GET  /api/tasks
     └─ Fetch user's tasks from n8n
     
POST /api/tasks
     └─ Create new task via n8n
     
GET  /api/events
     └─ Fetch user's events
     
POST /api/events
     └─ Create new event
```

### N8N Webhook Endpoint

```
URL: https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync

Methods: POST
Body: {
  title: string,
  type: 'task' | 'event',
  priority: 'low' | 'normal' | 'high',
  userId: string,
  dueDate: date
}

Response: { success: true, data: {...} }
```

---

## 💾 Database Schema (Simplified)

### Users Collection
```javascript
{
  _id: ObjectId,
  clerkId: "user_123",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  createdAt: Date,
  preferences: {}
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  userId: "user_123",
  title: "Finish project",
  description: "...",
  status: "todo" | "in-progress" | "done",
  priority: "low" | "normal" | "high",
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Events Collection
```javascript
{
  _id: ObjectId,
  userId: "user_123",
  title: "Team meeting",
  startTime: Date,
  endTime: Date,
  location: "Zoom",
  source: "manual" | "google" | "outlook",
  createdAt: Date
}
```

---

## 🔄 Environment Variables

```env
# Frontend .env.local

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://...
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🎯 Key Design Decisions

| Decision | Why |
|----------|-----|
| n8n for backend | No server management needed |
| MongoDB | Flexible schema, easy to extend |
| Clerk for auth | Industry standard, secure |
| Next.js | Server-side rendering + API routes |
| TailwindCSS | Fast styling, responsive |
| Component-based | Reusable, maintainable |

---

## 📖 Related Files

- **Want to set up?** → [02_INSTALLATION.md](02_INSTALLATION.md)
- **Want to configure auth?** → [04_AUTHENTICATION.md](04_AUTHENTICATION.md)
- **Want to understand workflows?** → [07_N8N_WORKFLOWS.md](07_N8N_WORKFLOWS.md)

---

Last Updated: Jan 18, 2026
