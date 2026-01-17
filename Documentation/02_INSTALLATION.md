# 02 INSTALLATION & SETUP

Complete guide to get ProjectX running on your machine.

---

## 🔧 Prerequisites

| Requirement | Version | Why |
|-------------|---------|-----|
| Node.js | 18.18+ | Runtime for JavaScript |
| npm/pnpm | Latest | Package manager |
| Git | Any | Version control |
| Code Editor | VS Code recommended | Development |

**Check your versions:**
```bash
node --version    # Should be 18.18+
npm --version     # Should be latest
```

---

## 📥 Installation Steps

### Step 1: Clone & Navigate

```bash
git clone https://github.com/Iitian-om/ProjectX.git
cd ProjectX/frontend
```

### Step 2: Install Dependencies

```bash
npm install
# or
pnpm install
```

**What gets installed:**
- Next.js 16 (React framework)
- React 19 (UI library)
- TailwindCSS 3.3 (Styling)
- Clerk 6.34 (Authentication)
- Axios 1.6 (HTTP client)
- date-fns 2.30 (Date utilities)
- 400+ other packages

### Step 3: Create Environment File

Create `frontend/.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# n8n Webhooks
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Get Clerk keys:**
1. Go to [clerk.com](https://clerk.com)
2. Create account & app
3. Copy publishable & secret keys
4. Paste into `.env.local`

See [04_AUTHENTICATION.md](04_AUTHENTICATION.md) for detailed setup.

### Step 4: Start Development Server

```bash
npm run dev
```

**Output:**
```
▲ Next.js 16.0.0
- Local:        http://localhost:3000
- Environments: .env.local
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

---

## 🎮 Development Commands

```bash
npm run dev       # Start dev server (port 3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Check code quality
```

---

## 📂 File Structure

```
frontend/
├── pages/          ← Routes (auto-routed by Next.js)
│   ├── index.js           (landing)
│   ├── dashboard.js        (user dashboard)
│   ├── tasks.js            (task management)
│   ├── timetable.js        (calendar view)
│   ├── sign-in/            (login page)
│   └── api/                (backend routes)
├── components/     ← Reusable parts
│   ├── Navbar.js
│   ├── Footer.js
│   ├── TaskCard.js
│   └── EventCard.js
├── lib/           ← Utilities
│   ├── clerkUtils.js
│   └── useClerkSafe.js
├── styles/        ← CSS
│   └── globals.css
├── .env.local     ← Secrets (DON'T commit)
├── package.json   ← Dependencies
└── next.config.mjs ← Next.js config
```

---

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000 loads in browser
- [ ] Can see landing page
- [ ] Can click "Sign In" button
- [ ] Clerk sign-in page appears
- [ ] Console has no errors

**If something breaks:**
1. Check `.env.local` is created
2. Check Clerk keys are correct
3. Try `npm install` again
4. Delete `node_modules` & `.next`, then reinstall
5. Check [04_AUTHENTICATION.md](04_AUTHENTICATION.md)

---

## 🚀 What's Next?

- **Want to authenticate?** → [04_AUTHENTICATION.md](04_AUTHENTICATION.md)
- **Want to understand the system?** → [05_ARCHITECTURE.md](05_ARCHITECTURE.md)
- **Want to see what changed?** → [06_CHANGELOG.md](06_CHANGELOG.md)

---

## 💡 Common Issues

### "Cannot find module '@clerk/nextjs'"
```bash
npm install @clerk/nextjs@latest
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Clerk keys not working
1. Verify `.env.local` exists
2. Check keys are copied exactly
3. Restart dev server
4. See [04_AUTHENTICATION.md](04_AUTHENTICATION.md)

### Node version too old
```bash
node --version  # Check
# If < 18.18, update from nodejs.org
```

---

**Done? Great!** Now explore the project. 🚀

See [01_START_HERE.md](01_START_HERE.md) for what to read next.
