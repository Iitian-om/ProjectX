# Phase 2: Task & Event Management

## Objective
Allow users to add, edit, and delete tasks or events manually from the Next.js dashboard and sync them with n8n workflows.

## Features
- CRUD operations for tasks/events.
- Fields: title, description, priority, deadline, meeting link.
- Auto-generate workflows in n8n via REST API call.

## Functional Requirements
1. Add/edit/delete task UI modal.
2. REST API endpoints integrated with n8n.
3. Database entries in MongoDB or MySQL.

## Acceptance Criteria
- Tasks persist after reload (database integration).  
- n8n receives workflow creation trigger.  
- Basic error handling for invalid inputs.

## Deliverables
- `/frontend/pages/api/tasks.js`  
- `/frontend/components/TaskForm.js`  
- Updated documentation with workflow diagrams.
