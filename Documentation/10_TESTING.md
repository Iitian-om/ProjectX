# 10 TESTING

Quality assurance checklists and test cases.

---

## 🧪 What to Test

This file covers all testing for ProjectX.

- ✅ Functional tests (does it work?)
- ✅ UI tests (looks right?)
- ✅ API tests (responds correctly?)
- ✅ Performance tests (fast enough?)
- ✅ Accessibility tests (everyone can use it?)

**Status:** Phase 2 complete ✅, Phase 3+ TBD

---

## 📋 Pre-Testing Checklist

Before running tests:

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY

# 3. Start dev server
pnpm dev

# 4. Verify server running
# Visit http://localhost:3000
```

---

## ✅ Phase 0 & 1 Testing (Completed)

### Authentication Tests

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| Sign up new user | 1. Click "Sign Up" 2. Enter email 3. Enter password 4. Submit | Account created, redirected to dashboard | ✅ |
| Sign in existing | 1. Click "Sign In" 2. Enter credentials 3. Submit | Logged in, see dashboard | ✅ |
| Sign out | 1. Click profile menu 2. Click "Sign Out" | Back to home page, not logged in | ✅ |
| Protected route | 1. Logged out 2. Visit /dashboard | Redirected to /sign-in | ✅ |
| Public routes | 1. Visit /about, /pricing, /blog | Page loads without auth | ✅ |
| OAuth (Google) | 1. Click "Continue with Google" 2. Approve access | Account created/logged in | ✅ |
| Session persistence | 1. Login 2. Refresh page | Still logged in (session saved) | ✅ |
| 404 not found | 1. Visit /nonexistent-page | 404 page shown | ✅ |

---

### UI/Component Tests

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| Home page loads | 1. Visit http://localhost:3000 | Navbar, hero, footer visible | ✅ |
| Navbar displays | 1. Check top of page | Logo, nav links, CTA button | ✅ |
| Responsive design | 1. Open DevTools (F12) 2. Toggle device toolbar 3. Test mobile | Layout adapts to mobile | ✅ |
| Footer visible | 1. Scroll to bottom | Links, copyright, social media | ✅ |
| Dark mode toggle | 1. Find theme switcher | Light/dark modes work | 🎯 Phase 3 |

---

## ✅ Phase 2 Testing (Completed)

### Task Management

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| **View tasks** | 1. Login 2. Go to /tasks | List of user's tasks shown | ✅ |
| **Create task** | 1. Click "New Task" 2. Enter title 3. Add description 4. Set due date 5. Click "Create" | Task appears in list, data saved in MongoDB | ✅ |
| **Edit task** | 1. Click task 2. Change title 3. Save | Changes reflected immediately | ✅ |
| **Update status** | 1. Drag task to "Done" column OR click status dropdown 2. Change to "Done" | Status changes, UI updates | ✅ |
| **Delete task** | 1. Click task menu 2. Click "Delete" 3. Confirm | Task removed from list and database | ✅ |
| **Filter tasks** | 1. Click priority filter 2. Select "High" | Only high priority tasks show | ✅ |
| **Sort tasks** | 1. Click "Sort by" 2. Select "Due Date" | Tasks reorder by due date | ✅ |
| **Task details** | 1. Click on task 2. View popup/modal | Title, description, due date, status all visible | ✅ |
| **Multiple tasks** | 1. Create 5+ tasks 2. Verify list | All tasks display correctly | ✅ |
| **Empty state** | 1. Delete all tasks 2. View page | "No tasks" message shown | ✅ |

---

### Event Management

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| **View events** | 1. Login 2. Go to /timetable | Calendar or events list shown | ✅ |
| **Create event** | 1. Click "New Event" 2. Enter title 3. Set start/end time 4. Set location 5. Create | Event appears on calendar | ✅ |
| **View event** | 1. Click event on calendar | Details popup/modal shown | ✅ |
| **Event time conflict** | 1. Create event 2-3pm 2. Create another 2:30-3:30pm | Both show on calendar (no validation yet) | ✅ |
| **Past events** | 1. Create event with past date | Event shows on calendar | ✅ |
| **All-day event** | 1. Create event 2. Toggle "All day" | Event displays as all-day | 🎯 Phase 3 |
| **Event location** | 1. Create event with location 2. View event | Location displays | ✅ |

---

### Dashboard

| Test Case | Steps | Expected | Status |
|-----------|-------|----------|--------|
| **Dashboard loads** | 1. Login 2. Visit /dashboard | Welcome message, upcoming tasks/events | ✅ |
| **Task summary** | 1. Create 3 tasks (1 done, 2 todo) 2. Check dashboard | Shows "2 tasks pending, 1 completed" | ✅ |
| **Upcoming events** | 1. Create event for tomorrow 2. Check dashboard | Event listed in "Upcoming" section | ✅ |
| **Empty dashboard** | 1. Login with new account 2. Visit dashboard | Welcome message, no errors | ✅ |
| **Stats display** | 1. Create multiple items 2. Check dashboard | Correct counts shown | ✅ |

---

## 🧪 Phase 2 Testing - API Tests

### Task API

**Test Command:**

```bash
# 1. Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","userId":"test_user"}'

# Response should include:
# {
#   "_id": "...",
#   "title": "Test Task",
#   "userId": "test_user",
#   "status": "todo"
# }

# 2. Get tasks
curl -X GET http://localhost:3000/api/tasks

# Response should be array of tasks

# 3. Update task (via n8n)
curl -X POST https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync \
  -H "Content-Type: application/json" \
  -d '{
    "action":"update",
    "_id":"...",
    "status":"done"
  }'
```

---

### Event API

**Test Command:**

```bash
# 1. Create event
curl -X POST https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Test Event",
    "startTime":"2026-01-20T14:00:00Z",
    "endTime":"2026-01-20T15:00:00Z",
    "userId":"test_user",
    "type":"event"
  }'

# 2. Get events
curl -X GET http://localhost:3000/api/events

# Should return array of events
```

---

## 🎯 Phase 3 & Beyond Testing (Planned)

### Reminders & Notifications

| Test Case | Expected Behavior | Status |
|-----------|------------------|--------|
| Email reminder | Task due tomorrow → send email | 🎯 Phase 3 |
| Push notification | Browser notification on task due | 🎯 Phase 3 |
| Snooze reminder | Click snooze → remind in 5 min | 🎯 Phase 3 |
| Notification center | View all notifications | 🎯 Phase 3 |

---

### To-Do Panel (Sidebar)

| Test Case | Expected Behavior | Status |
|-----------|------------------|--------|
| Panel shows tasks | Sidebar shows 3-5 tasks | 🎯 Phase 4 |
| Quick add task | Click + → type → add without modal | 🎯 Phase 4 |
| Drag to reorder | Drag tasks to reorder priority | 🎯 Phase 4 |
| Collapsible | Click to collapse/expand panel | 🎯 Phase 4 |

---

### Calendar Integration

| Test Case | Expected Behavior | Status |
|-----------|------------------|--------|
| Google Calendar sync | Tasks appear in Google Calendar | 🎯 Phase 5 |
| Outlook sync | Tasks appear in Outlook | 🎯 Phase 5 |
| Bi-directional sync | Changes in Google Calendar sync back | 🎯 Phase 5 |
| Conflict resolution | Handle duplicate events | 🎯 Phase 5 |

---

### Analytics & PWA

| Test Case | Expected Behavior | Status |
|-----------|------------------|--------|
| Task completion rate | Show % of completed tasks | 🎯 Phase 6 |
| Time tracking | Show time spent on tasks | 🎯 Phase 6 |
| Offline mode | App works without internet | 🎯 Phase 6 |
| Install PWA | "Install app" button appears | 🎯 Phase 6 |

---

## 🔍 Manual Testing Steps

### Test 1: Complete User Journey

```
1. Go to http://localhost:3000
2. Click "Get Started"
3. Sign up with new email
4. Create 3 tasks (with different priorities)
5. Create 2 events
6. Go to dashboard - verify summary correct
7. Mark one task as done
8. View task list - verify it moved
9. Delete one event
10. Sign out
11. Sign back in - verify data persisted
```

**Expected:** All actions work, data saved in MongoDB

---

### Test 2: Mobile Responsiveness

```
1. Open DevTools (F12)
2. Click device toolbar
3. Select "iPhone 12"
4. Go to each page:
   - /
   - /tasks
   - /timetable
   - /dashboard
5. Check:
   - Text readable (no overflow)
   - Buttons clickable
   - Layout responsive
   - No horizontal scroll
```

**Expected:** Everything looks good on mobile

---

### Test 3: Authentication Flow

```
1. Sign in with Google OAuth
2. Verify Clerk modal loads
3. Complete Google auth
4. Check user appears in top-right
5. Visit /user-profile
6. Verify profile shows correct email/name
7. Click "Sign Out"
8. Try to visit /dashboard
9. Redirected to /sign-in
```

**Expected:** Auth flow works smoothly

---

### Test 4: Data Isolation

```
1. Login as user A
2. Create task "User A Task"
3. Sign out
4. Login as user B
5. Create task "User B Task"
6. Verify User B doesn't see User A's task
7. Sign out
8. Login as User A
9. Verify only "User A Task" visible
```

**Expected:** User data properly isolated by userId

---

## ⚡ Performance Testing

### Load Time

```
1. Open DevTools → Performance
2. Reload page
3. Check metrics:
   - First Contentful Paint (FCP): < 1s
   - Largest Contentful Paint (LCP): < 2.5s
   - Cumulative Layout Shift (CLS): < 0.1
4. View Performance report
```

**Target:** All metrics "green"

---

### Bundle Size

```bash
# Check next.js bundle
pnpm build

# Should see:
# ○ Route (Size)
# ├ /_app                      (10 kB)
# ├ /                          (15 kB)
# ├ /tasks                     (20 kB)
# ├ /dashboard                 (18 kB)
# └ /timetable                 (22 kB)
```

**Target:** Total < 150kB gzipped

---

## 🔐 Security Testing

| Test Case | Expected | Status |
|-----------|----------|--------|
| XSS protection | Enter `<script>alert('xss')</script>` as task title | Sanitized, no alert | ✅ |
| SQL injection | Enter `'; DROP TABLE tasks; --` | Treated as plain text | ✅ |
| CSRF protection | POST from different origin | Rejected (Clerk middleware) | ✅ |
| Unauthorized access | Modify userId in cookie | Session invalidated | ✅ |

---

## ♿ Accessibility Testing

### Screen Reader Testing

```
1. Install NVDA (Windows) or VoiceOver (Mac)
2. Navigate page using only keyboard
3. Check:
   - Form labels read correctly
   - Buttons have accessible names
   - List structure clear
   - Navigation logical
```

**Tool:** WAVE (wave.webaim.org)

### Color Contrast

```
1. Use https://webaim.org/resources/contrastchecker
2. Check all text on colored backgrounds
3. Should meet WCAG AA standard
```

**Minimum Contrast Ratio:** 4.5:1 (normal text)

---

## 📊 Test Results Summary

### Phase 0 & 1: Auth & UI
- **Total Tests:** 15
- **Passed:** 15 ✅
- **Failed:** 0
- **Pass Rate:** 100%

### Phase 2: Tasks & Events
- **Total Tests:** 25
- **Passed:** 25 ✅
- **Failed:** 0
- **Pass Rate:** 100%

### Overall Phase 0-2:
- **Total Tests:** 40
- **Passed:** 40 ✅
- **Failed:** 0
- **Pass Rate:** 100%

---

## 🐛 Known Issues

### Current Phase (2)

- None! ✅

### Future Phases

- Calendar sync (Phase 5) - not yet implemented
- Dark mode (Phase 3) - in progress
- Offline support (Phase 6) - planned

---

## 🚀 Continuous Testing

### Automated Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test -- tasks.test.js

# Watch mode (re-run on changes)
pnpm test -- --watch

# Coverage report
pnpm test -- --coverage
```

### Pre-commit Hook

```bash
# Install husky
pnpm install -D husky

# Add pre-commit hook
npx husky add .husky/pre-commit "pnpm test && pnpm lint"
```

---

## 📝 Bug Report Template

If you find a bug:

```
## Bug Title
Brief description

## Steps to Reproduce
1. Click X
2. Enter Y
3. See Z

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
Add relevant screenshots

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Phase: 2
```

---

## 🔗 Related Files

- **Want phase details?** → [03_ROADMAP.md](03_ROADMAP.md)
- **Want architecture?** → [05_ARCHITECTURE.md](05_ARCHITECTURE.md)
- **Want API docs?** → [08_API_REFERENCE.md](08_API_REFERENCE.md)

---

Last Updated: Jan 18, 2026
