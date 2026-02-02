# Welcome to your Enter project

[![Built with enter.pro](https://img.shields.io/badge/Build%20with-Enter.pro-FC5776?style=for-the-badge&labelColor=1F1F1F)](https://enter.pro)

*Automatically synced with your [enter.pro](https://enter.pro) workspace* 

---

## Overview

This repository is automatically linked to your app on [enter.pro](https://enter.pro).  
Every change you make in Enter will be reflected here — and any updates you push to this repo will sync back seamlessly.  

Enter.pro helps you **build, edit, and deploy full-stack web apps by prompting**.  
Just describe what you want — Enter turns ideas into production-ready code.

---

## Project URLs

**Live app:** https://b127606b9e78473aab34ee08fcabc21a-latest.preview.enter.pro  
**Edit & build in Enter:** https://enter.pro/project/b127606b9e78473aab34ee08fcabc21a


---

## Continue building

Keep developing your app directly in [Enter.pro](https://enter.pro/project/b127606b9e78473aab34ee08fcabc21a).  
Prompt new features, refine the UI, or connect integrations — all changes are versioned and synced automatically to GitHub.

---

## Local development

Prefer to work locally? You can clone this repo and start developing right away:

```bash
# Step 1: Clone your project repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate into the project folder
cd <YOUR_PROJECT_NAME>

# Step 3: Install all dependencies
pnpm install

# Step 4: Start the local development server
pnpm run dev
```

Push your commits — Enter.pro will automatically detect and sync your latest changes.

---

## Database Setup (Supabase)

This project uses **Supabase** for data storage and management. To set it up:

1.  **Create a Supabase Project**: Go to [Supabase](https://supabase.com) and create a new project.
2.  **Run SQL Migration**: Copy the content of `supabase_schema.sql` (in the root directory) and run it in your Supabase SQL Editor to create the necessary tables (`modules`, `ai_news`).
3.  **Environment Variables**:
    *   Rename `.env.example` to `.env`.
    *   Fill in your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase Project Settings -> API.

## Admin Access

*   **Admin URL**: `/admin`
*   **Default Password**: `4428183` (Configured in `src/components/Admin/AdminAuthGuard.tsx`)

## Features Implemented

1.  **Admin Dashboard**: Manage homepage modules and AI news.
2.  **AI News Feed**: Automatically fetch (simulated) and process news with difficulty classification.
3.  **Authentication**: Simple password-based protection for admin area.

## Tech stack

This project uses:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend/DB)
- Vitest (Testing)

---

## Deployment

To deploy, open your Enter.pro project and click "Publish"

Your app will automatically build and go live at your production URL.

---

✨ Keep prompting, keep building — Enter.pro handles the rest.
