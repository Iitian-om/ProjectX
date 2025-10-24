# Phase 3: Reminders & Notifications

## Objective
Automate reminders for upcoming deadlines, meetings, or exams.

## Features
- Email reminders via SendGrid/SMTP.
- SMS via Twilio.
- Browser push notifications (Web Push API).
- Configurable reminder time (e.g., 30 min before event).

## Functional Requirements
1. n8n workflows for email/SMS push triggers.
2. Frontend toggle to enable/disable specific channels.
3. Log of notifications sent.

## Acceptance Criteria
- All three notification types tested successfully.
- User can set custom reminder intervals.
- Duplicate alerts prevented via timestamp check.

## Deliverables
- n8n workflow JSON files.  
- Notification UI toggle on dashboard.  
