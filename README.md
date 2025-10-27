# ProjectX — Your Personal Executive Assistant

ProjectX is a productivity MVP that manages timetables, tasks, reminders, and calendar integrations using a Next.js 15+ frontend and n8n automation workflows.

> **"Managing Time Like a Pro."**

## 🚀 Current Status

- ✅ **Phase 0 Complete** - Next.js 16.0.0 & React 19.2.0 setup
- ✅ **Phase 1 Complete** - Landing page, timetable, and component architecture
- ✅ **Industrial Dusk Theme** - Custom dark theme with brass-gold accents
- ✅ **8 Pages Delivered** - Home, Timetable, Sitemap, About, Terms, Privacy, Integrations, Pricing
- ✅ **Component Architecture** - Reusable Navbar, Footer, and EventCard components
- 🚀 **Ready for Phase 2** - Task & Event Management with n8n integration

### Latest Achievements (Oct 27, 2025)
- ✨ Reusable component system implemented
- 🎨 Industrial Dusk dark theme with custom animations
- � 6 new pages (sitemap, about, terms, privacy, integrations, pricing)
- 🔧 Error handling and date validation
- 📱 Fully responsive design across all pages

## 📋 Quick Start

### Prerequisites
- Node.js 18.18+ or later
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Iitian-om/ProjectX.git
   cd ProjectX
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

## 📁 Project Structure

```
ProjectX/
├── frontend/              # Next.js 16.0.0 application
│   ├── package.json      # Dependencies & scripts
│   ├── next.config.mjs   # Next.js config (Turbopack disabled)
│   ├── tailwind.config.js # Industrial Dusk theme
│   ├── pages/            # Next.js pages (8 pages)
│   │   ├── index.js      # ✅ Landing page
│   │   ├── timetable.js  # ✅ Timetable with filtering
│   │   ├── sitemap.js    # ✅ Site navigation
│   │   ├── about.js      # ✅ About page
│   │   ├── terms.js      # ✅ Terms of Service
│   │   ├── privacy.js    # ✅ Privacy Policy
│   │   ├── integrations.js # ✅ Integrations
│   │   └── pricing.js    # ✅ Pricing tiers
│   ├── components/       # Reusable React components
│   │   ├── Navbar.js     # ✅ Navigation component
│   │   ├── Footer.js     # ✅ Professional footer
│   │   └── EventCard.js  # ✅ Event display
│   ├── styles/           # CSS & Tailwind
│   │   └── globals.css   # Custom animations
│   └── public/           # Static assets
├── n8n/                  # Automation workflows (planned)
│   └── workflows/        # n8n workflow JSONs
├── docs/                 # Documentation
│   ├── SETUP.md         # Detailed setup guide
│   ├── CHANGELOG.md     # Version history
│   ├── UPDATE_SUMMARY.md # Recent changes
│   ├── ProjectX_Overview.md
│   └── Phase*.md        # Phase-specific PRDs
└── README.md
```

## 🛠 Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Frontend Framework | Next.js | 16.0.0 | Turbopack disabled for stability |
| UI Library | React | 19.2.0 | Latest features & hooks |
| Styling | TailwindCSS | 3.3.5 | Industrial Dusk theme |
| Date Utilities | date-fns | 2.30.0 | Date parsing & formatting |
| HTTP Client | Axios | 1.6.0 | API requests (future) |
| Automation | n8n | TBD | Phase 2+ |
| Database | MongoDB/MySQL | TBD | Phase 2+ |
| Hosting | Vercel | - | Recommended |

### Design System
- **Theme:** Industrial Dusk (dark theme)
- **Primary Color:** #C7A76C (brass-gold)
- **Background:** #1C1F24 (dark)
- **Typography:** System fonts with gradient effects
- **Animations:** CSS keyframes for smooth transitions

## 📖 Documentation

- **[SETUP.md](docs/SETUP.md)** - Detailed setup and configuration guide
- **[CHANGELOG.md](docs/CHANGELOG.md)** - Complete version history and changes
- **[UPDATE_SUMMARY.md](docs/UPDATE_SUMMARY.md)** - Recent updates and documentation changes
- **[ProjectX Overview](docs/ProjectX_Overview.md)** - Product vision and architecture
- **[Roadmap Blueprint](ProjectX%20%E2%80%93%20MVP%20Roadmap%20%26%20Documentation%20Blueprint.md)** - Complete MVP roadmap

### Phase Documentation
- [Phase 1: Landing Page & Timetable](docs/Phase1_Timetable.md) ✅ **Completed**
- [Phase 2: Task & Event Management](docs/Phase2_TaskEventManagement.md) 🎯 **Next Up**
- [Phase 3: Reminders & Notifications](docs/Phase3_RemindersNotifications.md)
- [Phase 4: ToDo Panel](docs/Phase4_ToDoPanel.md)
- [Phase 5: Calendar Integration](docs/Phase5_CalendarIntegration.md)
- [Phase 6: Analytics & PWA](docs/Phase6_Analytics_PWA.md)
- [Phase 7: Testing & Polish](docs/Phase7_Testing.md)

## 🎯 MVP Goals

1. **Unified Timetable** - Combine college, courses, and personal events
2. **Smart Automation** - n8n-powered reminders and notifications
3. **Cross-Device Sync** - PWA for desktop and mobile
4. **Scalable Architecture** - Foundation for future SaaS platform

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

Create `.env.local` in the `frontend/` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook

# External Integrations (Future)
GOOGLE_CLIENT_ID=your_google_client_id
OUTLOOK_CLIENT_ID=your_outlook_client_id
SENDGRID_API_KEY=your_sendgrid_key
TWILIO_ACCOUNT_SID=your_twilio_sid
```

## 🚢 Deployment

### Vercel (Recommended)

1. Import repository to Vercel
2. Set **Root Directory** to `frontend/`
3. Add environment variables
4. Deploy!

See [SETUP.md](docs/SETUP.md) for detailed deployment instructions.

## 🤝 Contributing

1. Create issues for features/bugs
2. Work in feature branches
3. Keep PRs small and focused
4. Update relevant phase documentation
5. Test thoroughly before submitting
6. Follow Industrial Dusk design system
7. Use reusable components from `components/`

### Development Workflow
- Frontend changes go in `frontend/`
- Create reusable components in `components/`
- Follow TailwindCSS custom color palette
- Document workflows in `n8n/workflows/`
- Update phase docs in `docs/`
- Keep main roadmap and CHANGELOG updated

### Code Quality
- Write semantic HTML
- Include ARIA labels for accessibility
- Implement error boundaries
- Add proper TypeScript types (future)
- Test responsive design on multiple devices

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

**ProjectX Corporation Ltd** : Currently only Om Kumar @Iitian-om 

## 🔗 Links

- [GitHub Repository](https://github.com/Iitian-om/ProjectX)
- [Live Demo](#) - Coming soon!
- [Documentation](docs/README.md)
- [Changelog](docs/CHANGELOG.md)

---

## 🏆 Project Milestones

- ✅ **Oct 25, 2025** - Project setup & Next.js 16 + React 19 upgrade
- ✅ **Oct 26, 2025** - Industrial Dusk theme implementation
- ✅ **Oct 27, 2025** - Phase 1 complete: 8 pages, component architecture
- 🎯 **Nov 2025** - Phase 2: Backend integration & n8n workflows
- 🎯 **Dec 2025** - Phase 3-4: Notifications & Task management
- 🎯 **Jan 2026** - Phase 5-6: Calendar sync & Analytics
- 🎯 **Feb 2026** - Phase 7: Testing & Production launch

---

**Version:** 1.2.0  
**Last Updated:** October 27, 2025  
**Status:** Phase 1 Complete ✅

<!-- End of file -->
