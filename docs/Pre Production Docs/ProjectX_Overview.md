# ProjectX – The Executive Productivity Assistant

## 1. Product Vision

ProjectX is a web-based automation assistant that acts as a personal operations manager for high-performing professionals.  
It organizes timetables, meetings, and tasks across multiple platforms (college portals, Google, Outlook, Microsoft Teams, etc.) while sending proactive reminders through email, SMS, or push notifications.

The guiding principle: 
*"Treat every user like a CEO of their own time."*

---

## 2. The Idea

Most productivity tools depend on the user’s discipline. ProjectX reverses that relationship — it manages you like your personal manager.  
It fetches, merges, and prioritizes data from all your calendars and courses, maintains a unified timetable, and notifies you intelligently before deadlines, classes, or meetings (provide you directe meeting links).

The system runs on two coordinated layers:

- **Next.js Frontend:** A sleek, responsive PWA dashboard.
- **n8n Automation Engine:** Handles scheduling, notifications, and integrations with external APIs.

---

## 3. Core Value Proposition

- **Unified Timetable:** Combines college, external courses, and personal events in one view.  
- **Smart Automation:** n8n automates reminders, meeting links, and deadlines.  
- **Cross-Device Experience:** Functions identically on desktop and mobile via PWA.  
- **Scalable Architecture:** MVP for personal use → SaaS deployment in later phases.

---

## 4. Target Audience

- Students and professionals balancing academic, work, and personal commitments.  
- Entrepreneurs and freelancers managing multiple meetings and tasks daily.  
- Educational institutions seeking automation for academic scheduling.

---

## 5. Long-Term Vision

ProjectX evolves into a SaaS platform offering:
- AI-assisted scheduling
- Automatic rescheduling and workload optimization
- Integration marketplace (Calendly, Zoom, Notion, Asana)
- Team collaboration and analytics dashboard

---

## 6. Tagline

> **"Your Personal Executive Assistant – Managing Time Like a Pro."**

---

## 7. Tech Summary
| Layer | Stack |
|-------|-------|
| Frontend | Next.js 15+, React 19.2.0, TailwindCSS 3.3.5, Framer Motion |
| Backend / Automation | n8n |
| Database | MongoDB or MySQL |
| Notifications | n8n with SendGrid, Twilio, Web Push |
| Hosting | Vercel (frontend), n8n Cloud or Render (automation) |
| Dev Tools | ESLint, PostCSS, Autoprefixer |

**Current Setup Status (Oct 2025):**
- ✅ Next.js 16.0.0 (upgraded from 14.x)
- ✅ React 19.2.0 with React-DOM 19.2.0
- ✅ TailwindCSS configured
- ✅ Project restructured with `frontend/` as main workspace

---

## 8. MVP Focus

Phase 1 and 2 will focus on:

1. **Landing Page**  
2. **Timetable Module**

These establish ProjectX’s interface and core scheduling logic before automation is layered in.

---

<!-- End of file -->