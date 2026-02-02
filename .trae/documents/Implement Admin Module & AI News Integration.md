Based on the analysis of the current project (Vite + React + Shadcn UI, no existing backend/Supabase setup) and the user's requirements, I have designed the following implementation plan:

### **Plan: Admin Module & AI News Integration**

**Phase 1: Database & Backend Setup (Supabase)**
1.  **Initialize Supabase Client**: Create `src/lib/supabase.ts` to handle the connection. I will design it to fail gracefully or warn if environment variables are missing.
2.  **Define Database Schema**: Create a `supabase_schema.sql` file in the root directory. This will contain SQL commands to create:
    *   `modules`: Stores homepage module data (id, title, content, sort_order, is_active, etc.).
    *   `ai_news`: Stores fetched/processed AI news.
    *   `admin_audit_logs`: (Optional) Simple security log.
    *   *Note*: User needs to execute this SQL in their Supabase dashboard.

**Phase 2: Admin Authentication & Routing**
1.  **New Route**: Add `/admin` to `src/router.tsx`.
2.  **Security Gate**: Create a protected layout or wrapper component that checks for the "temporary password" (`4428183`) before rendering the admin interface.
    *   *Implementation*: A simple modal asking for the password if not already authenticated in the current session (using `sessionStorage` or local state).

**Phase 3: Admin Dashboard (Data Entry)**
1.  **Admin Layout**: A clean sidebar/tab interface for managing different data types.
2.  **Module Management**: A CRUD interface (Table + Form) to manage the items currently hardcoded in `src/data/content.ts`. I will create a way to sync/edit this data in Supabase.
3.  **News Management**: A view to trigger "AI News Fetching" and edit/approve the results.

**Phase 4: AI News Integration (Simulation)**
1.  **News Service**: Create `src/services/newsService.ts`.
    *   *Fetching*: Since I don't have a specific API key, I will mock the fetching process or use a public RSS feed if available. I'll structure the code to be easily swappable with a real API.
    *   *AI Processing*: I will implement a "Simulated AI" function that takes raw text and "summarizes" it (using heuristic text truncation and keyword tagging) to demonstrate the "simplified version for beginners" requirement.

**Phase 5: Public Interface Update**
1.  **Homepage Update**: Modify the homepage (or add a new section) to display the data fetched from Supabase (AI News).
2.  **Real-time**: Use Supabase subscriptions or React Query polling to ensure data is fresh.

**Phase 6: Documentation & Testing**
1.  **Unit Tests**: Write basic tests for the data processing logic.
2.  **README Update**: Add a "Supabase Setup" section guiding the user on how to create the project and tables using the provided SQL.

**Technical Stack**:
*   **Frontend**: React, Tailwind, Shadcn UI (existing).
*   **State/Data**: TanStack Query (existing).
*   **Backend**: Supabase (Client-side integration).
*   **Auth**: Custom simple password (as requested).

I will start by creating the Supabase configuration and the SQL schema file.
