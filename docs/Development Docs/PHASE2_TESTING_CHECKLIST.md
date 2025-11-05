# Phase 2 Testing Checklist

## Pre-Test Setup

Before testing, ensure:
- [ ] n8n workflow has all 4 nodes (Webhook → Function → Set → MongoDB)
- [ ] Workflow is **Active** (green toggle in n8n)
- [ ] `.env` file has `NEXT_PUBLIC_N8N_WEBHOOK_URL` configured
- [ ] MongoDB Atlas user `ProjectX_Admin` has read/write permissions
- [ ] Network access allows connections from `0.0.0.0/0` or your IP
- [ ] Development server is running: `npm run dev`
- [ ] Browser has cleared cache and cookies

---

## Test Suite 1: Basic CRUD Operations

### Test 1.1: Create Task (POST)

**Steps:**
1. Navigate to `http://localhost:3000/tasks`
2. Click **"Create Task"** button
3. Fill in form:
   - Title: `Integration Test - Create`
   - Description: `Testing task creation with all fields`
   - Priority: `High`
   - Status: `To Do`
   - Deadline: Select tomorrow's date
   - Meeting Link: `https://meet.google.com/test-123`
4. Click **"Create Task"**

**Expected Results:**
- [ ] Form closes immediately
- [ ] New task appears at top of list
- [ ] Task card shows all entered information
- [ ] Status badge shows "To Do" in blue
- [ ] Priority badge shows "High" in orange
- [ ] Deadline shows correct date
- [ ] Stats update: "Total Tasks" increments by 1
- [ ] Stats update: "To Do" increments by 1

**Verify in n8n:**
- [ ] Check n8n Executions tab
- [ ] Latest execution shows green checkmark ✅
- [ ] Action is `create`
- [ ] Document contains all fields

**Verify in MongoDB Atlas:**
- [ ] Go to MongoDB Atlas → Database → Browse Collections
- [ ] Collection `projectx.events` has new document
- [ ] Document has field `title: "Integration Test - Create"`
- [ ] Document has field `status: "todo"`

---

### Test 1.2: Read Tasks (GET)

**Steps:**
1. **Refresh the page** (F5 or Ctrl+R)
2. Wait for page to load

**Expected Results:**
- [ ] Page loads within 2 seconds
- [ ] Task created in Test 1.1 is still visible
- [ ] All task details match what was entered
- [ ] Stats show correct counts
- [ ] No error messages appear

**Verify in Browser Console:**
- [ ] Open DevTools (F12) → Console tab
- [ ] No errors in red
- [ ] Network tab shows `/api/tasks` request with 200 status
- [ ] Response contains your tasks

**Verify in n8n:**
- [ ] New execution for `read` action
- [ ] Execution shows green checkmark ✅
- [ ] Output contains tasks array

---

### Test 1.3: Update Task (PUT)

**Steps:**
1. Click **Edit** button on task from Test 1.1
2. Modify these fields:
   - Status: Change to `In Progress`
   - Priority: Change to `Urgent`
   - Title: Add `[UPDATED]` at the end
3. Click **"Update Task"**

**Expected Results:**
- [ ] Form closes immediately
- [ ] Task card updates with new information
- [ ] Status badge changes to "In Progress" (orange)
- [ ] Priority badge changes to "Urgent" (red)
- [ ] Title shows `[UPDATED]` at end
- [ ] Stats update: "To Do" decrements by 1
- [ ] Stats update: "In Progress" increments by 1

**Verify Persistence:**
1. **Refresh page** (F5)
2. Expected:
   - [ ] Task still shows updated values
   - [ ] Status is "In Progress"
   - [ ] Priority is "Urgent"
   - [ ] Title has `[UPDATED]`

**Verify in MongoDB Atlas:**
- [ ] Document in MongoDB has `status: "in-progress"`
- [ ] Document has `priority: "urgent"`
- [ ] Document has `updatedAt` field with new timestamp

---

### Test 1.4: Delete Task (DELETE)

**Steps:**
1. Click **Edit** button on task from Test 1.1
2. Scroll down to bottom of form
3. Click **"Delete Task"** button (red button)
4. Confirm deletion in modal (if applicable)

**Expected Results:**
- [ ] Form closes immediately
- [ ] Task disappears from list
- [ ] Stats update: "Total Tasks" decrements by 1
- [ ] Stats update: "In Progress" decrements by 1
- [ ] No empty space or broken UI

**Verify Persistence:**
1. **Refresh page** (F5)
2. Expected:
   - [ ] Task does not reappear
   - [ ] Stats remain correct
   - [ ] No errors in console

**Verify in MongoDB Atlas:**
- [ ] Document is removed from `projectx.events` collection
- [ ] Collection count decreased by 1

---

## Test Suite 2: Filter Functionality

### Test 2.1: Create Sample Tasks

**Setup:**
Create 5 tasks with these properties:

1. **Task A:**
   - Title: `Filter Test - To Do`
   - Status: `To Do`
   - Priority: `Normal`

2. **Task B:**
   - Title: `Filter Test - In Progress High`
   - Status: `In Progress`
   - Priority: `High`

3. **Task C:**
   - Title: `Filter Test - Completed`
   - Status: `Completed`
   - Priority: `Low`

4. **Task D:**
   - Title: `Filter Test - To Do Urgent`
   - Status: `To Do`
   - Priority: `Urgent`

5. **Task E:**
   - Title: `Filter Test - In Progress`
   - Status: `In Progress`
   - Priority: `Normal`

---

### Test 2.2: Test "All Tasks" Filter

**Steps:**
1. Click **"All Tasks"** filter button

**Expected Results:**
- [ ] Button highlights in gold (#C9A961)
- [ ] All 5 tasks are visible
- [ ] Stats show: Total Tasks = 5

---

### Test 2.3: Test "To Do" Filter

**Steps:**
1. Click **"To Do"** filter button

**Expected Results:**
- [ ] Button highlights in gold
- [ ] Only 2 tasks visible: Task A and Task D
- [ ] Both have "To Do" status badge (blue)
- [ ] Stats still show accurate counts

---

### Test 2.4: Test "In Progress" Filter

**Steps:**
1. Click **"In Progress"** filter button

**Expected Results:**
- [ ] Only 2 tasks visible: Task B and Task E
- [ ] Both have "In Progress" status badge (orange)

---

### Test 2.5: Test "Completed" Filter

**Steps:**
1. Click **"Completed"** filter button

**Expected Results:**
- [ ] Only 1 task visible: Task C
- [ ] Has "Completed" status badge (green)

---

### Test 2.6: Test "High Priority" Filter

**Steps:**
1. Click **"High Priority"** filter button

**Expected Results:**
- [ ] 2 tasks visible: Task B (high) and Task D (urgent)
- [ ] Both have high/urgent priority badges

---

### Test 2.7: Filter Persistence After Status Change

**Steps:**
1. Set filter to **"To Do"**
2. Edit Task A
3. Change status to **"In Progress"**
4. Save task

**Expected Results:**
- [ ] Task A disappears from filtered view (no longer "To Do")
- [ ] Only Task D remains visible in "To Do" filter
- [ ] Switch to "In Progress" filter
- [ ] Task A now appears in "In Progress" filter
- [ ] Task A retains all other properties

**Verify Persistence:**
1. Refresh page
2. Set filter to "In Progress"
3. Expected:
   - [ ] Task A still shows "In Progress" status
   - [ ] Changes persisted through refresh

---

## Test Suite 3: Form Validation

### Test 3.1: Empty Title Validation

**Steps:**
1. Click **"Create Task"**
2. Leave Title field **empty**
3. Fill other fields normally
4. Click **"Create Task"**

**Expected Results:**
- [ ] Form does NOT submit
- [ ] Error message appears: "Title is required"
- [ ] Error is highlighted in red
- [ ] Form stays open
- [ ] Other fields retain their values

---

### Test 3.2: Title Too Short Validation

**Steps:**
1. Enter Title: `a` (just one character)
2. Click **"Create Task"**

**Expected Results:**
- [ ] Form submits successfully (1 char is valid minimum)
- [ ] Task appears with single-letter title

---

### Test 3.3: Past Deadline Validation

**Steps:**
1. Click **"Create Task"**
2. Fill Title: `Past Deadline Test`
3. Set Deadline to **yesterday's date**
4. Click **"Create Task"**

**Expected Results:**
- [ ] Form does NOT submit
- [ ] Error message: "Deadline must be in the future"
- [ ] Deadline field highlighted in red

---

### Test 3.4: Invalid Meeting Link Validation

**Steps:**
1. Click **"Create Task"**
2. Fill Title: `Invalid Link Test`
3. Enter Meeting Link: `not-a-valid-url`
4. Click **"Create Task"**

**Expected Results:**
- [ ] Form does NOT submit
- [ ] Error message: "Invalid meeting link URL"
- [ ] Meeting Link field highlighted in red

---

### Test 3.5: Valid Meeting Link Formats

**Test these URLs individually - all should pass:**

1. `https://meet.google.com/abc-defg-hij`
   - [ ] Accepted ✅

2. `https://zoom.us/j/1234567890`
   - [ ] Accepted ✅

3. `https://teams.microsoft.com/l/meetup-join/...`
   - [ ] Accepted ✅

4. `http://example.com/meeting`
   - [ ] Accepted ✅

5. Leave field **empty**
   - [ ] Accepted ✅ (optional field)

---

## Test Suite 4: Deadline Warnings

### Test 4.1: Create Tasks with Various Deadlines

Create 4 tasks:

1. **Task DL1:**
   - Title: `Deadline - Tomorrow`
   - Deadline: Tomorrow at 10:00 AM
   
2. **Task DL2:**
   - Title: `Deadline - In 2 Days`
   - Deadline: 2 days from now at 10:00 AM

3. **Task DL3:**
   - Title: `Deadline - In 5 Days`
   - Deadline: 5 days from now at 10:00 AM

4. **Task DL4:**
   - Title: `Deadline - In 2 Weeks`
   - Deadline: 14 days from now at 10:00 AM

---

### Test 4.2: Verify Warning Display

**Expected Results:**

**Task DL1 (Tomorrow):**
- [ ] Has **yellow warning** badge/border
- [ ] Warning text: "⚠️ Due soon" or similar
- [ ] Deadline shows in red or orange text

**Task DL2 (2 Days):**
- [ ] Has **yellow warning** badge/border
- [ ] Within 3-day warning threshold

**Task DL3 (5 Days):**
- [ ] NO warning badge (outside 3-day threshold)
- [ ] Normal deadline text color

**Task DL4 (2 Weeks):**
- [ ] NO warning badge
- [ ] Normal deadline text color

---

## Test Suite 5: Sorting & Priority

### Test 5.1: Verify Priority Sorting

**Given the sample tasks from Test 2.1, set all to "To Do" status:**

1. Task D (Urgent) - should be **first**
2. Task B (High) - should be **second**
3. Tasks A & E (Normal) - should be **third/fourth**
4. Task C (Low) - should be **last**

**Expected Results:**
- [ ] Tasks sorted by priority: Urgent → High → Normal → Low
- [ ] Tasks with same priority sorted by deadline (earliest first)

---

### Test 5.2: Verify Deadline Sorting Within Priority

**Create 3 tasks with same priority but different deadlines:**

1. **Task S1:**
   - Priority: High
   - Deadline: 7 days from now

2. **Task S2:**
   - Priority: High
   - Deadline: 2 days from now

3. **Task S3:**
   - Priority: High
   - Deadline: 10 days from now

**Expected Sort Order:**
1. Task S2 (2 days) - earliest deadline
2. Task S1 (7 days)
3. Task S3 (10 days) - latest deadline

**Verify:**
- [ ] Sort order matches expected
- [ ] Sorting persists after page refresh

---

## Test Suite 6: UI/UX Polish

### Test 6.1: Loading States

**Steps:**
1. Open DevTools → Network tab
2. Set throttling to "Slow 3G"
3. Refresh page

**Expected Results:**
- [ ] Shows loading spinner/animation
- [ ] Text: "Loading tasks..."
- [ ] No content flicker or layout shift
- [ ] Smooth transition to content when loaded

---

### Test 6.2: Empty States

**Steps:**
1. Delete all tasks
2. Observe empty state

**Expected Results:**
- [ ] Shows empty state illustration (📋 icon)
- [ ] Message: "No tasks yet"
- [ ] Helpful text: "Create your first task to get started!"
- [ ] **"Create Your First Task"** button visible
- [ ] No broken UI or console errors

---

### Test 6.3: Filtered Empty States

**Steps:**
1. Create 2 tasks with "To Do" status only
2. Set filter to **"Completed"**

**Expected Results:**
- [ ] Shows empty state illustration
- [ ] Message: "No tasks match this filter"
- [ ] Helpful text: "Try selecting a different filter"
- [ ] NO "Create Task" button (since there ARE tasks, just filtered out)

---

### Test 6.4: Responsive Design - Mobile

**Steps:**
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar mobile device

**Expected Results:**
- [ ] Page layout adapts to narrow screen
- [ ] Filter buttons stack vertically or scroll horizontally
- [ ] Task cards take full width
- [ ] Create button remains accessible
- [ ] Form modal fits mobile screen
- [ ] All text remains readable (no overflow)
- [ ] Touch targets are 44x44px minimum

---

### Test 6.5: Responsive Design - Tablet

**Steps:**
1. Select "iPad" or similar tablet device (768px width)

**Expected Results:**
- [ ] Task grid shows 2 columns
- [ ] Stats show 2x2 grid
- [ ] Filter buttons show in single row
- [ ] Form modal has appropriate width (not too wide)

---

### Test 6.6: Responsive Design - Desktop

**Steps:**
1. Set viewport to 1920x1080 (full desktop)

**Expected Results:**
- [ ] Task grid shows 3 columns
- [ ] Stats show 4 columns in single row
- [ ] Filter buttons in single row
- [ ] Content has max-width constraint (not too wide)
- [ ] Proper spacing and padding

---

## Test Suite 7: Edge Cases

### Test 7.1: Very Long Title

**Steps:**
1. Create task with title:
   ```
   This is an extremely long title that should test how the UI handles text overflow and wrapping behavior when titles exceed normal character limits and span multiple lines which might break the layout if not handled properly
   ```

**Expected Results:**
- [ ] Text wraps to multiple lines
- [ ] Card height adjusts automatically
- [ ] No text overflow (...)
- [ ] Card remains properly formatted
- [ ] Other cards align properly

---

### Test 7.2: Empty Description

**Steps:**
1. Create task with:
   - Title: `Task Without Description`
   - Description: *leave empty*

**Expected Results:**
- [ ] Task saves successfully
- [ ] Description field shows nothing (or "No description")
- [ ] Card layout doesn't break
- [ ] No "undefined" or "null" text

---

### Test 7.3: No Deadline

**Steps:**
1. Create task without setting deadline

**Expected Results:**
- [ ] Task saves successfully
- [ ] Deadline field shows "No deadline" or hidden
- [ ] No warning badge
- [ ] No "Invalid Date" errors

---

### Test 7.4: Special Characters in Title

**Steps:**
1. Create task with title: `Test & "Quotes" 'Apostrophes' <HTML> / \ | Symbols!@#$%`

**Expected Results:**
- [ ] Task saves successfully
- [ ] All characters display correctly
- [ ] No HTML injection or XSS
- [ ] MongoDB stores correctly
- [ ] Retrieval displays same characters

---

### Test 7.5: Concurrent Edits (Race Condition)

**Steps:**
1. Open task form for Task A
2. In **another browser tab**, open same task form
3. Edit title in first tab, save
4. Edit description in second tab, save

**Expected Results:**
- [ ] Last save wins (description update overwrites)
- [ ] No data corruption
- [ ] Both fields update correctly
- [ ] Refresh shows final state

---

### Test 7.6: Rapid-Fire Creation

**Steps:**
1. Click "Create Task" 10 times rapidly
2. Fill out each form and save as quickly as possible

**Expected Results:**
- [ ] All 10 tasks created successfully
- [ ] Each has unique ID
- [ ] No duplicate entries
- [ ] No race condition errors
- [ ] Stats update correctly (Total = 10)

---

## Test Suite 8: Error Handling

### Test 8.1: Network Failure - Create Task

**Steps:**
1. Open DevTools → Network tab
2. Enable **"Offline"** mode
3. Try to create a task

**Expected Results:**
- [ ] Error message appears
- [ ] Message: "Failed to create task. Please check your connection."
- [ ] Form stays open (doesn't close)
- [ ] Task data is preserved in form
- [ ] User can retry after reconnecting

---

### Test 8.2: Network Failure - Load Tasks

**Steps:**
1. Enable **"Offline"** mode
2. Refresh page

**Expected Results:**
- [ ] Error message or empty state
- [ ] Message: "Unable to load tasks"
- [ ] Helpful retry button
- [ ] No infinite loading spinner
- [ ] No React error boundaries triggered

---

### Test 8.3: n8n Workflow Down

**Steps:**
1. Go to n8n and **deactivate** the workflow
2. Try to create a task in your app

**Expected Results:**
- [ ] Task operation fails gracefully
- [ ] User-friendly error message
- [ ] No cryptic 500 errors exposed to user
- [ ] Form allows retry
- [ ] Console shows detailed error for debugging

---

### Test 8.4: MongoDB Connection Lost

**Steps:**
1. In MongoDB Atlas, temporarily **pause** the cluster
2. Try to create/read tasks

**Expected Results:**
- [ ] Graceful error handling
- [ ] Message: "Database temporarily unavailable"
- [ ] No app crash
- [ ] No sensitive connection strings in console

---

## Test Suite 9: Performance

### Test 9.1: Page Load Time

**Steps:**
1. Open DevTools → Network tab
2. Refresh page
3. Note "DOMContentLoaded" and "Load" times

**Expected Results:**
- [ ] DOMContentLoaded < 500ms
- [ ] Full page load < 2 seconds
- [ ] No unnecessary API calls (only one GET to `/api/tasks`)

---

### Test 9.2: Large Dataset (100 Tasks)

**Steps:**
1. Create 100 tasks (use script or bulk create)
2. Navigate to tasks page

**Expected Results:**
- [ ] Page loads within 3 seconds
- [ ] Smooth scrolling
- [ ] Filter operations instant (<100ms)
- [ ] Sort operations instant (<100ms)
- [ ] No UI lag or freezing

---

### Test 9.3: Form Open/Close Speed

**Steps:**
1. Click "Create Task" button 20 times rapidly
2. Close form each time

**Expected Results:**
- [ ] Form opens instantly (<50ms)
- [ ] Form closes instantly (<50ms)
- [ ] No animation lag
- [ ] No memory leaks (check DevTools Performance tab)

---

## Test Suite 10: Browser Compatibility

### Test 10.1: Chrome/Edge (Chromium)

- [ ] All features work
- [ ] No console errors
- [ ] Proper styling
- [ ] Date picker works

### Test 10.2: Firefox

- [ ] All features work
- [ ] No console errors
- [ ] Proper styling
- [ ] Date picker works

### Test 10.3: Safari (if available)

- [ ] All features work
- [ ] No console errors
- [ ] Proper styling
- [ ] Date picker works

---

## Final Verification

### Checklist Before Moving to Phase 3:

- [ ] All 100 test cases pass
- [ ] No errors in browser console
- [ ] No errors in n8n execution logs
- [ ] MongoDB Atlas shows correct data structure
- [ ] All CRUD operations persist through refresh
- [ ] Filters work correctly
- [ ] Form validation prevents bad data
- [ ] Deadline warnings display correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Error handling is user-friendly
- [ ] Page load times meet performance criteria
- [ ] No memory leaks or performance issues
- [ ] Documentation is up to date

---

## Issue Tracking

**If tests fail, document here:**

| Test # | Issue Description | Severity | Status |
|--------|------------------|----------|--------|
| Example: 1.3 | Update not persisting | High | Fixed |
|  |  |  |  |
|  |  |  |  |

---

## Sign-Off

**Tester Name:** _______________  
**Date:** _______________  
**Phase 2 Status:** ⬜ Ready for Production ⬜ Needs Fixes  
**Next Phase:** ⬜ Approved to start Phase 3 ⬜ Hold pending fixes  

---

**Last Updated:** January 11, 2025  
**Total Test Cases:** 100+  
**Estimated Testing Time:** 2-3 hours
