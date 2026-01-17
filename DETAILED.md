# ProjectX — Detailed Documentation

All the nitty-gritty details. Main README is sleek and short, so everything else lives here.

---

## 📁 Project Structure

```
ProjectX/
├── frontend/
│   ├── pages/
│   │   ├── index.js (landing)
│   │   ├── dashboard.js (protected)
│   │   ├── dashboard-sample.js (public demo)
│   │   ├── tasks.js (protected)
│   │   ├── tasks-sample.js (public demo)
│   │   ├── timetable.js (protected)
│   │   ├── timetable-sample.js (public demo)
│   │   ├── sign-in/, sign-up/ (auth)
│   │   └── api/ (endpoints)
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── EventCard.js
│   │   ├── TaskCard.js
│   │   └── TaskForm.js
│   ├── lib/ (utilities & hooks)
│   ├── styles/ (Tailwind + globals.css)
│   ├── proxy.js (Clerk middleware)
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   └── package.json
│
├── n8n/
│   └── workflows/ (CRUD operations)
│
├── docs/
│   ├── README.md
│   ├── GUIDE.md
│   ├── SETUP.md
│   ├── AUTHENTICATION_SETUP.md
│   ├── PHASES_COMPLETE_ROADMAP.md
│   ├── Development Docs/
│   └── Pre Production Docs/
│
└── README.md
```

---

## 🏗️ Architecture

```
Frontend (Next.js 16)
    ↓
Clerk Auth (OAuth2)
    ↓
n8n Workflows
    ↓
MongoDB Atlas
```

### Data Flow

1. **User authenticates** → Clerk handles login/signup
2. **Protected routes** → Middleware checks auth status
3. **Fetch data** → Frontend calls n8n webhooks
4. **Process** → n8n workflows handle CRUD operations
5. **Store** → MongoDB persists user-specific data
6. **Display** → React renders real-time updates

---

## ⚙️ Development

### Available Scripts

```bash
npm run dev      # Dev server (port 3000)
npm run build    # Production build
npm run start    # Start production
npm run lint     # ESLint
```

### File Organization

- **pages/** → Next.js routes (auto-routed)
- **components/** → Reusable React components
- **lib/** → Utility functions & hooks
- **styles/** → Global CSS & Tailwind config
- **public/** → Static assets

### Key Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...    # Public Clerk key
CLERK_SECRET_KEY=...                      # Secret Clerk key
NEXT_PUBLIC_N8N_WEBHOOK_URL=...          # n8n endpoint
NEXT_PUBLIC_API_URL=...                   # API base URL
```

See [AUTHENTICATION_SETUP.md](docs/AUTHENTICATION_SETUP.md) for complete setup.

---

## 📦 Full Tech Stack

| Category | Tech | Version | Purpose |
|----------|------|---------|---------|
| Frontend | Next.js | 16.0.0 | React framework |
| | React | 19.2.0 | UI library |
| | TailwindCSS | 3.3.5 | Styling |
| | date-fns | 2.30.0 | Date utilities |
| | Axios | 1.6.0 | HTTP client |
| Auth | Clerk | 6.34.0 | OAuth2 authentication |
| Backend | n8n | Cloud | Workflow automation |
| Database | MongoDB | Atlas | NoSQL database |
| Hosting | Vercel | - | Recommended |
| Package Manager | npm/pnpm | Latest | Dependency management |

---

## 🎨 Design System

### Theme: Industrial Dusk

A custom dark theme with brass-gold accents, perfect for a professional productivity app.

**Colors:**
- Primary: `#C7A76C` (brass-gold)
- Background: `#1C1F24` (dark)
- Text: `#E8E8E8` (light)
- Accent: `#B89657` (darker gold)

**Typography:**
- Headlines: System fonts with gradient effects
- Body: Readable sans-serif with high contrast
- Animations: Smooth CSS keyframe transitions

**Design Principles:**
- Dark mode for reduced eye strain
- High contrast for accessibility
- Minimalist layout
- Responsive across all devices

---

## 🎯 Features

### Phase 0: Infrastructure ✅
- Next.js + React setup
- n8n webhook integration
- MongoDB connection
- Deployment ready

### Phase 1: Landing Page ✅
- 8 pages (index, about, terms, privacy, etc.)
- Reusable components
- Industrial Dusk theme
- Fully responsive

### Phase 2: Authentication & CRUD ✅
- Clerk OAuth2 integration
- Protected & public routes
- User-specific data isolation
- Full CRUD operations via n8n
- Public demo pages
- Dynamic navigation

### Phase 3: Reminders (Next)
- Email notifications
- SMS alerts
- Push notifications
- Scheduled reminders

### Phase 4: ToDo Panel
- Priority sorting
- Task categorization
- Progress tracking

### Phase 5: Calendar Integration
- Google Calendar sync
- Outlook sync
- Cross-platform events

### Phase 6: Analytics & PWA
- User analytics dashboard
- Progressive Web App
- Offline functionality

### Phase 7: Testing & Polish
- QA testing
- Performance optimization
- Production launch

---

## 🚀 Deployment (Vercel)

1. **Connect repo** to Vercel
2. **Set root directory** to `frontend/`
3. **Add environment variables** (see SETUP.md)
4. **Deploy** with one click

---

## 🏆 Milestones

| Date | Version | Milestone |
|------|---------|-----------|
| Oct 25 | 0.1.0 | Project setup |
| Oct 27 | 1.0.0 | Phase 1 done |
| Oct 29 | 1.1.0 | MongoDB + n8n |
| Jan 18 | 2.0.0 | Phase 2 done |

---

## 🤝 Contributing

### Workflow

1. **Create branch** - `feature/your-feature`
2. **Make changes** - keep it focused
3. **Test** - on multiple devices
4. **Update docs** - update CHANGELOG
5. **Commit** - clear commit messages
6. **PR** - describe what you changed

### Code Quality

- ✅ Semantic HTML
- ✅ Error handling
- ✅ Accessibility (ARIA labels)
- ✅ Responsive design
- ✅ Component reusability

### Keep Updated

- Update `docs/Development Docs/CHANGELOG.md` on changes
- Update `docs/PHASES_COMPLETE_ROADMAP.md` on phase progress
- Update this file if architecture changes

---

## 📚 Documentation Files

### Main Docs
- **README.md** (root) - Quick start
- **DETAILED.md** (this file) - Deep dive
- **docs/GUIDE.md** - Navigation guide
- **docs/SETUP.md** - Installation
- **docs/AUTHENTICATION_SETUP.md** - Clerk config

### Reference
- **docs/PHASES_COMPLETE_ROADMAP.md** - All 7 phases
- **docs/Development Docs/CHANGELOG.md** - Version history
- **docs/Development Docs/N8N Docs/** - Workflow docs

---

## ❓ FAQ

**Q: How do I set up authentication?**  
A: See [docs/AUTHENTICATION_SETUP.md](docs/AUTHENTICATION_SETUP.md)

**Q: Where do I configure the database?**  
A: It's MongoDB Atlas. Connection handled via n8n.

**Q: How do I add a new page?**  
A: Create `frontend/pages/yourpage.js` - Next.js auto-routes it.

**Q: Can I use this for production?**  
A: Phase 2 is complete & tested. Production-ready with proper env setup.

**Q: How do I contribute?**  
A: See the Contributing section above.

---

**Last Updated:** Jan 18, 2026  
**Maintained by:** ProjectX Team
