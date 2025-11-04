# Authentication Setup Guide

This guide explains how to configure Clerk authentication for ProjectX.

## Overview

ProjectX now includes authentication using [Clerk](https://clerk.com/), a complete user management solution. The following features have been implemented:

- **Sign In Page** (`/sign-in`) - User login
- **Sign Up Page** (`/sign-up`) - New user registration  
- **Dashboard Page** (`/dashboard`) - Protected route requiring authentication
- **User Profile** - Accessible via user avatar in navigation when signed in

## Setup Instructions

### 1. Create a Clerk Account

1. Visit [https://clerk.com/](https://clerk.com/)
2. Sign up for a free account
3. Create a new application in the Clerk Dashboard

### 2. Get Your API Keys

1. In your Clerk Dashboard, navigate to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_`)
3. Copy your **Secret Key** (starts with `sk_`)

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cd frontend
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your Clerk keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   CLERK_SECRET_KEY=sk_test_your_actual_secret_here
   ```

3. The other Clerk-related variables are already configured:
   ```env
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

### 4. Configure Clerk Dashboard

In your Clerk Dashboard, configure the following:

1. **Paths**:
   - Sign in URL: `/sign-in`
   - Sign up URL: `/sign-up`
   - After sign in URL: `/dashboard`
   - After sign up URL: `/dashboard`

2. **Authentication Options** (optional):
   - Enable Email/Password authentication
   - Enable social logins (Google, GitHub, etc.)
   - Configure multi-factor authentication if desired

### 5. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to [http://localhost:3000](http://localhost:3000)

3. Click "Get Started" or "Sign In" to test authentication

4. Create a test account and verify:
   - Sign up flow works
   - Sign in flow works
   - Dashboard redirects work
   - User profile displays in navbar
   - Sign out works

## Features

### Protected Routes

The following routes require authentication:
- `/dashboard` - User dashboard with stats and quick actions

### Public Routes

The following routes are accessible without authentication:
- `/` - Landing page
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page
- `/public-routes/about` - About page
- `/public-routes/terms` - Terms of service
- `/public-routes/privacy` - Privacy policy
- `/timetable` - Timetable page
- `/tasks` - Tasks page
- `/pricing` - Pricing page
- `/integrations` - Integrations page

### Graceful Degradation

The application is designed to work even without Clerk configuration:
- Build and deployment succeed without keys
- Sign in/up pages show helpful message when keys are missing
- Public pages remain accessible
- Navigation adapts based on authentication state

## Styling

The authentication components use custom styling that matches ProjectX's Industrial Dusk theme:
- Dark background (#1C1F24)
- Brass-gold accent color (#C7A76C)
- Smooth transitions and animations
- Responsive design

## Troubleshooting

### "Authentication Not Configured" Message

If you see this message on sign-in/sign-up pages:
1. Verify your `.env.local` file exists in the `frontend/` directory
2. Check that your Clerk keys are correctly copied (no extra spaces)
3. Restart the development server after adding keys

### Build Errors

If you encounter build errors:
1. Ensure all dependencies are installed: `npm install`
2. Clear Next.js cache: `rm -rf .next`
3. Rebuild: `npm run build`

### Authentication Not Working

If authentication isn't working properly:
1. Verify keys in `.env.local` match those in Clerk Dashboard
2. Check Clerk Dashboard paths match the configured routes
3. Ensure you're using the correct environment (development vs production keys)

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Guide](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)

## Support

For issues or questions:
- Check [Clerk's Documentation](https://clerk.com/docs)
- Visit [Clerk's Support](https://clerk.com/support)
- Open an issue in the ProjectX repository
