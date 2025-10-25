# ProjectX — Your Personal Executive Assistant

ProjectX is a productivity MVP that manages timetables, tasks, reminders, and calendar integrations using a Next.js 15+ frontend and n8n automation workflows.

> **"Managing Time Like a Pro."**

## 🚀 Current Status

- ✅ **Next.js 15+ Setup Complete** (v16.0.0)
- ✅ **React 19 Upgraded** (v19.2.0)
- ✅ **Project Structure Established**
- ✅ **Phase 0 Complete** - Ready for Phase 1 development
- 🔄 **Phase 1 In Progress** - Landing page and timetable

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
├── frontend/              # Next.js 15+ application
│   ├── package.json      # Dependencies & scripts
│   ├── pages/            # Next.js pages
│   │   └── index.js      # Landing page
│   ├── components/       # React components
│   ├── styles/           # CSS & Tailwind
│   │   └── globals.css
│   └── public/           # Static assets
├── n8n/                  # Automation workflows
│   └── workflows/        # n8n workflow JSONs
├── docs/                 # Documentation
│   ├── SETUP.md         # Detailed setup guide
│   ├── ProjectX_Overview.md
│   └── Phase*.md        # Phase-specific PRDs
└── README.md
```

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend Framework | Next.js | 16.0.0 |
| UI Library | React | 19.2.0 |
| Styling | TailwindCSS | 3.3.5 |
| Automation | n8n | TBD |
| Database | MongoDB/MySQL | TBD |
| Hosting | Vercel | - |

## 📖 Documentation

- **[SETUP.md](docs/SETUP.md)** - Detailed setup and configuration guide
- **[ProjectX Overview](docs/ProjectX_Overview.md)** - Product vision and architecture
- **[Roadmap Blueprint](ProjectX%20%E2%80%93%20MVP%20Roadmap%20%26%20Documentation%20Blueprint.md)** - Complete MVP roadmap

### Phase Documentation
- [Phase 1: Landing Page & Timetable](docs/Phase1_Timetable.md)
- [Phase 2: Task & Event Management](docs/Phase2_TaskEventManagement.md)
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

### Development Workflow
- Frontend changes go in `frontend/`
- Document workflows in `n8n/workflows/`
- Update phase docs in `docs/`
- Keep main roadmap updated

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

**ProjectX Corporation Ltd**

## 🔗 Links

- [GitHub Repository](https://github.com/Iitian-om/ProjectX)
- [Live Demo](#) - Coming soon!

---

**Version:** 1.0.0  
**Last Updated:** October 25, 2025

<!-- End of file -->
