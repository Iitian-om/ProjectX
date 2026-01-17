# 🔐 Authentication Setup Guide

Complete guide to configuring Clerk authentication for ProjectX.

---

## Overview

ProjectX uses **Clerk 6.34.0** for user authentication with OAuth2 support. Clerk provides:
- 🔐 Secure OAuth2 authentication
- 👤 User profile management
- 🚪 Sign-in / Sign-up flows
- 🔄 Session management
- 🛡️ Route protection

---

## Prerequisites

- ProjectX frontend set up ([see SETUP.md](SETUP.md))
- Clerk account (free tier available at [clerk.com](https://clerk.com))
- Node.js 18.18+ installed

---

## Step 1: Create Clerk Application

1. **Sign up at [clerk.com](https://clerk.com)**
   - Create free account
   - Create new application
   - Choose authentication providers (Email, Google, GitHub, etc.)

2. **Get API Keys**
   ```
   Dashboard → API Keys
   
   You'll need:
   - Publishable Key (starts with pk_test_...)
   - Secret Key (starts with sk_test_...)
   ```

---

## Step 2: Configure Environment Variables

Create or update `frontend/.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here

# Clerk URLs (adjust based on your domain)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# n8n Automation
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://iitian-om.app.n8n.cloud/webhook-test/projectx/sync
```

**Important:** Never commit `.env.local` to git. Add it to `.gitignore`.

---

## Step 3: Install Clerk Package

The package is already installed in the project:

```bash
# Already installed - no action needed
npm install @clerk/nextjs@6.34.0
```

If you need to reinstall:
```bash
cd frontend
npm install @clerk/nextjs@latest
```

---

## Step 4: Configure Clerk Middleware

Create `frontend/middleware.js` (or use existing `proxy.js`):

```javascript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',                      // Landing page
  '/sign-in(.*)',          // Sign-in pages
  '/sign-up(.*)',          // Sign-up pages
  '/about',                // About page
  '/terms',                // Terms of service
  '/privacy',              // Privacy policy
  '/integrations',         // Integrations page
  '/pricing',              // Pricing page
  '/dashboard-sample(.*)', // Public demo dashboard
  '/tasks-sample(.*)',     // Public demo tasks
  '/timetable-sample(.*)', // Public demo timetable
  '/api/public(.*)',       // Public API routes
]);

// Protect all routes except public ones
export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

**Current Implementation:** ProjectX uses `proxy.js` which already includes this configuration.

---

## Step 5: Wrap App with ClerkProvider

Update `frontend/pages/_app.js`:

```javascript
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
```

---

## Step 6: Create Sign-In/Sign-Up Pages

### Sign-In Page (`frontend/pages/sign-in/[[...index]].js`):

```javascript
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1C1F24'
    }}>
      <SignIn 
        path="/sign-in" 
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: '#C7A76C',
              '&:hover': { backgroundColor: '#B89657' }
            }
          }
        }}
      />
    </div>
  );
}
```

### Sign-Up Page (`frontend/pages/sign-up/[[...index]].js`):

```javascript
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1C1F24'
    }}>
      <SignUp 
        path="/sign-up" 
        routing="path"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: '#C7A76C',
              '&:hover': { backgroundColor: '#B89657' }
            }
          }
        }}
      />
    </div>
  );
}
```

---

## Step 7: Add User Profile Page

Create `frontend/pages/user-profile/[[...user-profile]].js`:

```javascript
import { UserProfile } from '@clerk/nextjs';

export default function UserProfilePage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: '#1C1F24',
      minHeight: '100vh'
    }}>
      <UserProfile 
        path="/user-profile"
        routing="path"
        appearance={{
          elements: {
            rootBox: { width: '100%', maxWidth: '900px' },
            card: { backgroundColor: '#252931', border: '1px solid #3A3F4B' },
            formButtonPrimary: {
              backgroundColor: '#C7A76C',
              '&:hover': { backgroundColor: '#B89657' }
            }
          }
        }}
      />
    </div>
  );
}
```

---

## Step 8: Use Authentication in Pages

### Protect a Page (Example: Dashboard)

```javascript
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      {/* Your dashboard content */}
    </div>
  );
}
```

### Get User Data

```javascript
import { useUser } from '@clerk/nextjs';

function MyComponent() {
  const { user } = useUser();

  return (
    <div>
      <p>User ID: {user?.id}</p>
      <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
      <p>Name: {user?.firstName} {user?.lastName}</p>
    </div>
  );
}
```

---

## Step 9: Add User Button to Navbar

Update `frontend/components/Navbar.js`:

```javascript
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav>
      <div className="nav-links">
        <Link href={isSignedIn ? "/dashboard" : "/dashboard-sample"}>
          Dashboard
        </Link>
        <Link href={isSignedIn ? "/tasks" : "/tasks-sample"}>
          Tasks
        </Link>
        <Link href={isSignedIn ? "/timetable" : "/timetable-sample"}>
          Timetable
        </Link>
      </div>
      
      <div className="auth-section">
        {isSignedIn ? (
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: { width: '40px', height: '40px' }
              }
            }}
          />
        ) : (
          <>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
```

---

## Step 10: Fetch User-Specific Data

### Example: Get User's Tasks

```javascript
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TasksPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL}?userId=${user.id}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <h1>My Tasks</h1>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
```

---

## Verification Checklist

✅ **Environment Variables Set**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` configured
- `CLERK_SECRET_KEY` configured
- Redirect URLs configured

✅ **Middleware Configured**
- Public routes defined
- Protected routes working
- Redirects functioning

✅ **Pages Created**
- `/sign-in` page exists
- `/sign-up` page exists
- `/user-profile` page exists

✅ **Authentication Working**
- Can sign up new user
- Can sign in existing user
- UserButton appears when signed in
- Can sign out successfully

✅ **User Data Accessible**
- `useUser()` hook working
- User ID available in components
- User metadata accessible

---

## Common Issues & Solutions

### Issue: "Clerk: Missing publishableKey"
**Solution:** Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is in `.env.local` and restart dev server.

### Issue: Infinite redirect loop
**Solution:** Check that sign-in/sign-up pages are in `isPublicRoute` matcher in middleware.

### Issue: UserButton not showing
**Solution:** Ensure `ClerkProvider` wraps entire app in `_app.js`.

### Issue: Can't access user data
**Solution:** Use `useUser()` hook and check `isLoaded` before accessing `user` object.

### Issue: Styling doesn't match theme
**Solution:** Use Clerk's `appearance` prop to customize colors and styles.

---

## Security Best Practices

1. **Never expose secret keys**
   - Keep `CLERK_SECRET_KEY` in `.env.local` only
   - Add `.env.local` to `.gitignore`

2. **Validate on backend**
   - Always verify user authentication on API routes
   - Don't trust client-side auth alone

3. **Use HTTPS in production**
   - Clerk requires HTTPS for production apps
   - Configure proper domain in Clerk dashboard

4. **Rate limiting**
   - Implement rate limiting on auth endpoints
   - Use Clerk's built-in protection features

5. **Session management**
   - Configure appropriate session duration
   - Handle expired sessions gracefully

---

## Next Steps

After authentication is configured:

1. **Test all auth flows** - Sign up, sign in, sign out
2. **Customize appearance** - Match Industrial Dusk theme
3. **Add user metadata** - Store additional user info
4. **Implement role-based access** - Admin vs regular users
5. **Set up webhooks** - Sync user events to your database

---

## Resources

- **Clerk Documentation:** [https://clerk.com/docs](https://clerk.com/docs)
- **Next.js Integration:** [https://clerk.com/docs/references/nextjs](https://clerk.com/docs/references/nextjs)
- **Customization Guide:** [https://clerk.com/docs/customization/overview](https://clerk.com/docs/customization/overview)
- **Clerk Dashboard:** [https://dashboard.clerk.com](https://dashboard.clerk.com)

---

**Last Updated:** January 18, 2026  
**Clerk Version:** 6.34.0  
**Status:** Active & Configured ✅
