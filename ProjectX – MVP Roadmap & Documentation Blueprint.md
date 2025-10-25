# ProjectX — MVP Roadmap & Documentation Blueprint

## 1️⃣ MVP Roadmap

### Phase 0: Setup & Initial Planning ✅ COMPLETED

Goals:
- Setup project repository and folder structure. (completed)
- Configure Next.js for frontend and PWA support. (completed)
- Configure n8n environment (cloud or self-hosted).
- Choose database (MongoDB or MySQL) and configure.

Deliverables:
- GitHub repo with `frontend/` and `n8n/` folders.
- `.env` files for API keys (Twilio, Email, Google/Outlook integration).
- ProjectX documentation folder structure created (`docs/`).

**Status Update:**
- ✅ Next.js 15+ installed and configured in `frontend/` directory
- ✅ React 19.2.0 and React-DOM 19.2.0 upgraded
- ✅ Project structure established with separated frontend workspace
- ✅ TailwindCSS configured for styling
- ✅ Basic landing page (`index.js`) created
- ✅ Documentation structure in `docs/` folder complete

---

### Phase 1: Landing Page & Initial Timetable 

Goals:
- Build responsive landing page (intro, features, tagline, login/signup placeholder).
- Implement basic timetable view:
  - Fetch events manually added by user.
  - Display college/outlook/google events in calendar view.
  - Highlight upcoming deadlines.

Deliverables:
- Landing page (`frontend/pages/index.js`).
- Timetable page (`frontend/pages/timetable.js`) with responsive calendar.
- CSS using Tailwind or Chakra UI.
- Mock data for initial testing.

MD Documentation:
- `docs/ProjectX_Overview.md`
- `docs/Phase1_Timetable.md` (PRD & UI mockups)

---

### Phase 2: Task & Event Management 

Goals:
- Add CRUD operations for tasks/events via Next.js dashboard.
- Integrate n8n REST API to sync tasks with workflows.
- Allow tasks to have: title, description, deadline, priority, optional meeting link.

Deliverables:
- Next.js task/event creation modal.
- API routes (`frontend/pages/api/tasks.js`) calling n8n workflow endpoints.

MD Documentation:
- `docs/Phase2_TaskEventManagement.md` (fields, endpoints, workflow triggers)

---

### Phase 3: Reminders & Notifications

Goals:
- Implement n8n workflows for sending reminders:
  - Email (SendGrid/Nodemailer)
  - SMS (Twilio)
  - Push notifications (Web Push API)
- Allow custom reminder times before deadlines.

Deliverables:
- n8n workflows configured.
- Frontend dashboard shows next reminder.

MD Documentation:
- `docs/Phase3_RemindersNotifications.md` (Workflow diagrams + triggers)

---

### Phase 4: ToDo Panel & Prioritization

Goals:
- Display all tasks/events in a priority-sorted ToDo panel.
- Mark tasks as complete/incomplete.
- Visual indicators for urgent, upcoming, or completed tasks.

Deliverables:
- Frontend ToDo component (`frontend/components/ToDoPanel.js`).
- Integration with n8n to update task status.

MD Documentation:
- `docs/Phase4_ToDoPanel.md` (UI mockup + workflow sync)

---

### Phase 5: Calendar & Smart Timetable Integration

Goals:
- Fetch Google Calendar, Outlook, and College Portal events.
- Display them in a mixed timetable.
- Trigger n8n workflows automatically for reminders or task creation.

Deliverables:
- Calendar integration module.
- Dashboard timetable dynamically updates with external calendar events.

MD Documentation:
- `docs/Phase5_CalendarIntegration.md` (API details, OAuth flows)

---

### Phase 6: Basic Analytics & Cross-Device Sync

Goals:
- Dashboard shows:
  - Tasks completed vs pending
  - Upcoming meetings & deadlines
- Implement cross-device PWA features.

Deliverables:
- Analytics cards on dashboard.
- PWA manifest and service worker for offline access.

MD Documentation:
- `docs/Phase6_Analytics_PWA.md` (screenshots + technical notes)

---

### Phase 7: Polish & Testing

Goals:
- UI refinements (colors, animations, professional style).
- Test all workflows and notifications.
- Document known issues and improvements.

Deliverables:
- Fully responsive and functional MVP.
- User testing notes.

MD Documentation:
- `docs/Phase7_Testing.md` (test cases, issues, solutions)

---

## 2️⃣ Folder Structure (Current)

```bash
ProjectX/
├── frontend/
│   ├── package.json          # Next.js 15+ project config
│   ├── .env.local            # Environment variables
│   ├── pages/
│   │   ├── index.js          # Landing Page
│   │   ├── timetable.js      # Timetable
│   │   ├── dashboard.js      # Tasks & Analytics
│   ├── components/
│   │   ├── ToDoPanel.js
│   │   ├── TaskCard.js
│   │   ├── CalendarView.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── responsive.css
│   ├── public/               # Static assets
│   ├── .next/                # Build output (auto-generated)
├── n8n/
│   ├── workflows/            # All workflows JSON files
│   ├── nodes/                # Custom nodes if needed
├── docs/
│   ├── ProjectX_Overview.md
│   ├── Phase1_Timetable.md
│   ├── Phase2_TaskEventManagement.md
│   ├── Phase3_RemindersNotifications.md
│   ├── Phase4_ToDoPanel.md
│   ├── Phase5_CalendarIntegration.md
│   ├── Phase6_Analytics_PWA.md
│   ├── Phase7_Testing.md
│   ├── README.md
├── README.md
└── .gitignore
```

3️⃣ PRD Template for Each Phase (.md)

Every .md file should contain: 

```markdown
# Phase 1: Landing Page & Timetable

## Objective
Create a responsive landing page and timetable that displays upcoming deadlines, meetings, and tasks.

## Features
- Landing page with project description and tagline.
- Timetable calendar view for:
  - College schedules
  - Personal tasks
  - External courses

## UI Mockups
- [Attach images or Figma links]

## Functional Requirements
1. Timetable should allow event highlighting.
2. Upcoming deadlines are visually distinct.
3. Mobile-first design.

## Tech Stack
- **Next.js 15+** (App Router ready, React 19.2.0)
- **TailwindCSS** for styling
- **React 19.2.0** with latest features
- Mock data initially, later fetch from n8n workflow APIs.

## Acceptance Criteria
- Landing page loads in <2 seconds.
- Timetable correctly displays at least 5 mock events.
- Fully responsive on mobile and desktop.

## Notes
- Use placeholder buttons for login/signup (actual auth later).
```
This same structure applies to each phase, updating features, workflows, UI mockups, and acceptance criteria.

4️⃣ Next Steps

- ✅ Setup Next.js frontend (Next.js 15+ with React 19)
- ✅ Basic landing page created
- 🔄 Build full landing page + timetable page with mock data
- 🔄 Complete Phase 1 PRD documentation
- ⏳ Deploy initial frontend on Vercel (even personal test deployment)
- ⏳ Later, integrate n8n workflows for automation

## 5️⃣ Development Commands

### Frontend Development
```bash
cd frontend
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Installing Dependencies
```bash
cd frontend
npm install      # Install all dependencies
```

## 6️⃣ Current Tech Stack Versions
- **Next.js:** 16.0.0 (Latest)
- **React:** 19.2.0
- **React-DOM:** 19.2.0
- **TailwindCSS:** 3.3.5
- **Node.js:** Compatible with Next.js 15+ requirements

<!-- End of file -->