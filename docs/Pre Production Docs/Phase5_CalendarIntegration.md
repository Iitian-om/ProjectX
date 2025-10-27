# Phase 5: Calendar & Timetable Integration

## Objective
Combine college, Google, and Outlook calendars into one unified view.

## Features
- OAuth2 integration for Google & Outlook.
- Automatic import of classes/meetings.
- Merge algorithm to prevent duplicate events.

## Functional Requirements
1. API connectors via n8n.
2. Event merge logic (time conflict handling).
3. Highlight source of each event (color-coded).

## Acceptance Criteria
- User authorizes both calendars successfully.
- Mixed timetable loads in under 3 seconds.
- No duplicate entries.

## Deliverables
- `/frontend/pages/timetable.js` update.
- n8n workflows for calendar fetching.

<!-- End of file -->