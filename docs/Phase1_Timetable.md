# Phase 1: Landing Page & Timetable

## Objective
Develop a professional landing page and a responsive timetable page that displays upcoming tasks, classes, and meetings.

## Features
- Modern landing page with tagline and overview.
- Timetable showing events from:
  - College (Outlook, Teams)
  - Google Calendar
  - Personal/Manual entries
- Highlight upcoming exams or assignment deadlines.

## Functional Requirements
1. Responsive design for all screens.
2. Calendar grid with date, time, and event details.
3. API placeholders to later connect with n8n workflows.
4. Navigation bar linking to Dashboard and To-Do Panel.

## Technical Stack
- Next.js + TailwindCSS  
- Framer Motion for animations  
- Static mock data for first build (later dynamic from n8n).

## Acceptance Criteria
- Timetable displays at least 5 mock events.  
- Fully functional on mobile and desktop.  
- Page load time under 2 seconds on Vercel test.

## Deliverables
- `/frontend/pages/index.js` (Landing Page)  
- `/frontend/pages/timetable.js` (Timetable)  
- `docs/Phase1_Timetable.md` updated with screenshots.  

<!-- End of file -->