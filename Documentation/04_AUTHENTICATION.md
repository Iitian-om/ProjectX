# 04 AUTHENTICATION

Clerk OAuth2 setup and user management guide.

---

## 🔐 Overview

ProjectX uses **Clerk 6.34.0** for authentication:
- 🔐 OAuth2 security
- 👤 User profiles
- 🚪 Sign in/up/out
- 🛡️ Route protection
- 🔄 Session management

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Clerk Keys

1. Go to [clerk.com](https://clerk.com)
2. Sign up (free tier available)
3. Create an app
4. Copy keys:
   - **Publishable Key** (pk_test_...)
   - **Secret Key** (sk_test_...)

### Step 2: Add to `.env.local`

```env
# frontend/.env.local

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY
CLERK_SECRET_KEY=sk_test_YOUR_SECRET

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

Done! 🎉 Try signing in.

---

## 📋 Complete Setup Guide

### Prerequisites
- Node.js 18.18+
- Frontend installed ([02_INSTALLATION.md](02_INSTALLATION.md))
- Clerk account (free)

### Step-by-Step

#### 1. Create Clerk App

```
clerk.com
→ Dashboard
→ Create Application
→ Choose auth methods (Email, Google, GitHub, etc.)
```

#### 2. Get API Keys

```
Dashboard
→ API Keys
→ Copy:
  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  - CLERK_SECRET_KEY
```

#### 3. Environment Variables

Create `frontend/.env.local`:

```env
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Recommended
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# n8n Integration
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

#### 4. Verify Installation

Clerk package already installed:
```bash
npm list @clerk/nextjs
# Should show: @clerk/nextjs@6.34.0
```

If not:
```bash
npm install @clerk/nextjs@6.34.0
```

#### 5. Test Sign In

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000
3. Click "Sign In" in navbar
4. Create test account
5. Verify dashboard loads

---

## 🔧 How It Works

### Route Protection

Middleware (`proxy.js`) checks every request:
- ✅ Public routes: anyone can access
- 🔒 Protected routes: auth required

```javascript
// Example: Dashboard requires auth
if (!isSignedIn) {
  router.push('/sign-in');
}
```

### Get User Data

In any component:

```javascript
import { useUser } from '@clerk/nextjs';

export default function MyComponent() {
  const { user, isSignedIn } = useUser();
  
  if (!isSignedIn) return <p>Sign in first</p>;
  
  return <p>Hello, {user.firstName}!</p>;
}
```

### Protect a Page

```javascript
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn]);
  
  if (!isLoaded || !isSignedIn) return null;
  
  return <h1>Protected content</h1>;
}
```

---

## 📍 Public vs Protected Routes

### Public Routes (No Auth Required)
- `/` (landing)
- `/about`
- `/terms`
- `/privacy`
- `/sign-in`
- `/sign-up`
- `/dashboard-sample` (demo)
- `/tasks-sample` (demo)
- `/timetable-sample` (demo)

### Protected Routes (Auth Required)
- `/dashboard` (user dashboard)
- `/tasks` (user tasks)
- `/timetable` (user calendar)
- `/user-profile` (account settings)

---

## 🎨 Customize Appearance

Update sign-in/sign-up styling:

```javascript
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      appearance={{
        elements: {
          // Customize colors to match theme
          formButtonPrimary: {
            backgroundColor: '#C7A76C',
          },
          // ... more customization
        }
      }}
    />
  );
}
```

---

## 🆘 Troubleshooting

### Issue: "Missing publishableKey"
**Solution:** Restart dev server after updating `.env.local`

### Issue: Infinite redirect loop
**Solution:** Ensure sign-in/sign-up in `isPublicRoute`

### Issue: Can't see UserButton
**Solution:** Wrap app with `<ClerkProvider>` in `_app.js`

### Issue: User data not loading
**Solution:** Check if `isLoaded` before using `user` object

```javascript
const { user, isLoaded } = useUser();
if (!isLoaded) return <div>Loading...</div>;
```

---

## 📖 Useful Links

- **Clerk Docs:** https://clerk.com/docs
- **API Reference:** https://clerk.com/docs/references/nextjs
- **Customization:** https://clerk.com/docs/customization/overview
- **Dashboard:** https://dashboard.clerk.com

---

## ✅ Checklist

After setup:
- [ ] `.env.local` created
- [ ] Clerk keys added
- [ ] Dev server started
- [ ] Can see landing page
- [ ] Sign in button works
- [ ] Clerk sign-in page loads
- [ ] Can create test account
- [ ] Dashboard visible when signed in

---

**Next:** Want to understand the system? → [05_ARCHITECTURE.md](05_ARCHITECTURE.md)

Last Updated: Jan 18, 2026
