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
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook

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

# Database (Phase 2+)
DATABASE_URL=mongodb://localhost:27017/projectx
# or
DATABASE_URL=mysql://user:password@localhost:3306/projectx
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

## n8n Setup (Coming Soon)

Will be configured in future phases for:
- Workflow automation
- API integrations
- Notification scheduling
- Calendar syncing

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| Oct 2025 | 1.0.0 | Initial setup with Next.js 16.0.0, React 19.2.0 |
| Oct 2025 | 0.1.0 | Project structure created, basic landing page |

---

## Contributing

1. Work in `frontend/` directory for UI changes
2. Document all n8n workflows in `n8n/workflows/`
3. Update relevant phase docs in `docs/`
4. Test locally before committing

---

## Support

For issues or questions:
- Check documentation in `docs/` folder
- Review phase-specific PRDs
- See main roadmap in root directory

---

*Last Updated: October 25, 2025*
