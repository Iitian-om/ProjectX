# ProjectX Setup & Configuration Guide

## Project Structure

ProjectX follows a monorepo structure with separated concerns:

```
ProjectX/
├── frontend/          # Next.js 15+ application
├── n8n/              # Automation workflows
└── docs/             # Documentation
```

---

## Frontend Setup

### Prerequisites
- Node.js 18.18+ or later
- npm or yarn package manager
- Git for version control

### Initial Setup (Completed)

1. **Project Initialization**
   ```bash
   cd frontend
   ```

2. **Next.js 15 Upgrade** ✅
   ```bash
   npm install next@latest react@latest react-dom@latest
   ```
   
   **Installed Versions:**
   - Next.js: `16.0.0`
   - React: `19.2.0`
   - React-DOM: `19.2.0`

3. **Dependencies Installed:**
   - `axios@1.6.0` - HTTP client for API calls
   - `date-fns@2.30.0` - Date utility library
   - `tailwindcss@3.3.5` - Utility-first CSS framework
   - `autoprefixer@10.4.16` - PostCSS plugin
   - `eslint` & `eslint-config-next` - Code linting

### Development Commands

```bash
# Start development server (http://localhost:3000)
cd frontend
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## Migration Notes (Oct 2025)

### What Changed

1. **Package.json Location**
   - **Before:** `ProjectX/package.json`
   - **After:** `ProjectX/frontend/package.json`
   - **Reason:** Cleaner separation between frontend and n8n automation layers

2. **Next.js Upgrade (14 → 15)**
   - Upgraded to Next.js 16.0.0 (latest stable)
   - React 18 → React 19 migration
   - All peer dependencies resolved successfully

3. **Dependency Warnings**
   - Minor peer dependency warnings during installation (expected with React 19 RC)
   - All packages audited: **0 vulnerabilities**
   - 420 packages total, 177 seeking funding

### Installation Logs
```
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: projectx-mvp@0.1.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   peer react@"^18.3.1" from react-dom@18.3.1
...

added 33 packages, removed 5 packages, changed 10 packages, and audited 420 packages in 3m

177 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

---

## Environment Configuration

### Create `.env.local` in `frontend/`

```bash
# n8n Automation Configuration (Phase 0 - Active)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database (Phase 0 - Pending)
DATABASE_URL=mongodb://localhost:27017/projectx
# or
DATABASE_URL=mysql://user:password@localhost:3306/projectx

# External Integrations (Phase 5+)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
OUTLOOK_CLIENT_ID=your_outlook_client_id
OUTLOOK_CLIENT_SECRET=your_outlook_secret

# Notification Services (Phase 3+)
SENDGRID_API_KEY=your_sendgrid_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

### n8n Webhook Integration

**Current Setup (Oct 28, 2025):**
- **n8n Cloud URL:** `https://iitian-om.app.n8n.cloud`
- **Webhook Endpoint:** `/webhook-test/projectx/sync`
- **Status:** ✅ Configured and tested (200 OK)

**Testing the Webhook (PowerShell):**
```powershell
Invoke-WebRequest `
  -Uri "https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Test Event","type":"meeting","source":"manual","priority":"high"}'
```

**Expected Response:**
```json
{
  "message": "Workflow was started",
  "statusCode": 200
}
```

**Frontend Integration Example:**
```javascript
// pages/api/events.js or client-side fetch
export default async function handler(req, res) {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: req.body.title,
      type: req.body.type || 'event',
      source: 'frontend',
      priority: req.body.priority || 'normal',
    })
  });
  
  const data = await response.json();
  res.status(200).json(data);
}
```

---

## Next.js 15 Features to Leverage

### 1. App Router (Optional Migration)
- Currently using Pages Router (`pages/` directory)
- Consider migrating to App Router (`app/` directory) for:
  - React Server Components
  - Improved data fetching
  - Better streaming and suspense support

### 2. React 19 Features
- **Experimental Features:** Actions, useFormStatus, useOptimistic
- **Improved Hooks:** Enhanced useEffect and concurrent rendering
- **Server Actions:** Direct server-side function calls (with App Router)

### 3. Performance Improvements
- Faster Hot Module Replacement (HMR)
- Improved build times
- Better tree-shaking

---

## Troubleshooting

### Common Issues

**Issue:** `Error: Cannot find module 'next'`
```bash
cd frontend
npm install
```

**Issue:** Port 3000 already in use
```bash
npm run dev -- -p 3001
```

**Issue:** ESLint errors after upgrade
```bash
npm run lint -- --fix
```

---

## Deployment

### Vercel (Recommended)

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import ProjectX repository
   - **Root Directory:** Set to `frontend/`

2. **Environment Variables**
   - Add all `.env.local` variables in Vercel dashboard
   - Keep sensitive keys secure

3. **Build Settings**
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Alternative Hosting
- **Netlify:** Configure base directory to `frontend/`
- **Railway:** Deploy with `frontend/` as root
- **Self-hosted:** Use `npm run build && npm run start`

---

## Current Project Status (Oct 27, 2025) ✅

### Completed Pages
- ✅ Landing Page (`pages/index.js`) - Modern hero with gradient animations
- ✅ Timetable (`pages/timetable.js`) - Event filtering and view modes
- ✅ Sitemap (`pages/sitemap.js`) - Site navigation grid
- ✅ About (`pages/about.js`) - Company info and mission
- ✅ Terms (`pages/terms.js`) - Terms of Service
- ✅ Privacy (`pages/privacy.js`) - Privacy Policy
- ✅ Integrations (`pages/integrations.js`) - Integration showcase
- ✅ Pricing (`pages/pricing.js`) - Pricing tiers and FAQs

### Components Created
- ✅ `components/Navbar.js` - Conditional navigation with active states
- ✅ `components/Footer.js` - Professional SaaS footer
- ✅ `components/EventCard.js` - Event display with icons and badges

### Design System
**Industrial Dusk Theme:**
- Background: #1C1F24 (dark)
- Surface: #2A2F35 (cards)
- Accent: #C7A76C (brass-gold)
- CSS animations for gradients
- Responsive grid layouts

### Configuration Notes
- **Turbopack Disabled:** Set to `false` in `next.config.mjs` for Windows stability
- **Dev Command:** Uses `--no-turbo` flag
- **Theme:** Fully custom TailwindCSS configuration

---

## n8n Automation Setup ✅

**Status:** Phase 0 - Configured and tested (Oct 28, 2025)

### Cloud Configuration

**n8n Instance:**
- **Platform:** n8n Cloud (managed service)
- **URL:** `https://iitian-om.app.n8n.cloud`
- **Webhook Endpoint:** `/webhook-test/projectx/sync`

**Why Cloud vs Local:**
- ✅ No maintenance overhead
- ✅ Always accessible
- ✅ Free tier sufficient for MVP
- ✅ Production-ready from day one
- ✅ Built-in monitoring and logs

### Workflow Configuration

**Current Function Node:**
```javascript
// n8n Function Node: Process Event Data
const data = $json || {};

return [
  {
    json: {
      title: data.title || "Untitled Event",
      type: data.type || "unknown",
      source: data.source || "manual",
      priority: data.priority || "normal",
      receivedAt: new Date().toISOString()
    }
  }
];
```

**Supported Event Types:**
- `meeting` - Scheduled meetings
- `task` - Tasks and assignments
- `reminder` - Notification reminders
- `deadline` - Project deadlines
- `class` - Academic classes
- `event` - General events

**Priority Levels:**
- `urgent` - Requires immediate attention
- `high` - Important tasks
- `normal` - Standard priority (default)
- `low` - Can be deferred

### Testing & Validation

**Test Command (PowerShell):**
```powershell
Invoke-WebRequest `
  -Uri "https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Team Meeting","type":"meeting","priority":"high"}'
```

**Test Results:**
- ✅ Webhook responds with 200 OK
- ✅ JSON payload processed correctly
- ✅ Function node executes successfully
- ✅ Timestamp auto-generated

### Architecture Flow

```
┌──────────────┐      POST /webhook      ┌──────────────┐      Save      ┌──────────────┐
│   Frontend   │─────────────────────────▶│   n8n Cloud  │───────────────▶│   Database   │
│  (Next.js)   │◀─────────────────────────│  (Webhooks)  │◀───────────────│  (MongoDB)   │
└──────────────┘      Response 200        └──────────────┘   Query Data   └──────────────┘
```

### Next Steps
- [ ] Connect n8n to database (MongoDB Atlas)
- [ ] Add database write nodes to workflow
- [ ] Implement notification nodes (Phase 3)
- [ ] Add calendar integration workflows (Phase 5)

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| Oct 28, 2025 | 1.3.0 | Phase 0 (Part 1): n8n Cloud configured, webhook tested, automation layer ready |
| Oct 27, 2025 | 1.2.0 | Phase 1 complete: 8 pages, component architecture, Industrial Dusk theme |
| Oct 26, 2025 | 1.1.0 | UI/UX overhaul, homepage redesign, theme implementation |
| Oct 25, 2025 | 1.0.0 | Initial setup with Next.js 16.0.0, React 19.2.0 |
| Oct 2025 | 0.1.0 | Project structure created, basic landing page |

---

## Contributing

1. Work in `frontend/` directory for UI changes
2. Use reusable components from `components/` folder
3. Follow Industrial Dusk color palette
4. Document all n8n workflows in `n8n/workflows/`
5. Update relevant phase docs in `docs/`
6. Test locally before committing
7. Ensure responsive design for all new pages

---

## Support

For issues or questions:
- Check documentation in `docs/` folder
- Review phase-specific PRDs
- See main roadmap in root directory
- Check [UPDATE_SUMMARY.md](./UPDATE_SUMMARY.md) for recent changes

---

*Last Updated: October 28, 2025*  
*Phase 0 (Part 1) Complete - n8n automation layer configured and tested*  
*Next: Database integration (MongoDB Atlas)*
