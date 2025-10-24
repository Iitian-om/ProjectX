# Phase 4: To-Do Panel & Prioritization

## Objective
Create a dedicated To-Do panel for tracking progress and marking completion.

## Features
- Tasks listed by priority and due date.
- Completion checkbox with smooth UI updates.
- Stats: completed vs pending count.

## Functional Requirements
1. Sync task completion state with n8n.
2. Local state updates without full refresh.
3. Color coding for urgency levels.

## Acceptance Criteria
- Tasks re-order by priority automatically.
- n8n receives completion event.
- Progress visually displayed on dashboard.

## Deliverables
- `/frontend/components/ToDoPanel.js`  
- `/frontend/components/ProgressStats.js`

<!-- End of file -->