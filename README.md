# ProjectX — MVP

ProjectX is a lightweight productivity MVP to manage timetables, tasks, reminders, and calendar integrations using a Next.js frontend and n8n workflows.

## Quick start
1. Clone the repo:
   - git clone <your-repo-url>
2. Install frontend dependencies:
   - cd frontend && npm install
3. Create environment files:
   - Copy `.env.example` to `.env` and add API keys (Twilio, SendGrid, Google/Outlook, DB).
4. Run development server:
   - npm run dev (from `frontend/`)

## Goals
- Provide a minimal, testable MVP: landing page, timetable, task CRUD, reminders via n8n.
- Mobile-first, PWA-ready frontend.
- n8n workflows for notifications and automations.

## Project structure (high level)
- frontend/ — Next.js app (pages, components, styles)
- n8n/ — exported workflows and node configs
- docs/ — phase PRDs and roadmap
- .env.example, package.json, README.md

## Development notes
- Use Tailwind or Chakra for rapid UI.
- Start with mock data for calendar/timetable; wire n8n when workflows are ready.
- Keep workflow JSONs under `n8n/workflows/` and reference endpoints in `frontend/pages/api/`.

## Contributing
- Create issues for features/bugs and open PRs against `main`.
- Keep PRs small and document changes in the associated phase doc under `docs/`.

## Next steps
- Implement Phase 1: landing page and timetable with mock events.
- Add Phase1_Timetable.md to `docs/` and iterate UI + API routes.

## License
- Add a license file (e.g., MIT) as needed.

<!-- End of file -->
