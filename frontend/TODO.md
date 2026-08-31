# Codeforces-style Frontend — Implementation TODO

## Project Overview

We're building a **frontend-only clone of Codeforces** (the competitive programming website) using Next.js. The goal is a simple, practical UI — minimal animations, no unnecessary flourishes — focused on clean functionality over visual polish.

There is **no real backend**: authentication, problem data, and submissions are all simulated using hardcoded mock data and browser state (React Context / localStorage). No API integration, no database, no server-side logic beyond what Next.js needs for routing/rendering.

The app consists of **5 core pages**:
1. **Login** — fake authentication form, sets client-side auth state
2. **Problem Set** (public) — browsable/filterable table of coding problems
3. **Individual Problem** (public) — problem statement + a mock code submission form
4. **Submission History** (protected, login required) — table of the logged-in user's past submissions
5. **Profile** (protected, login required) — user info, rating, solved problems, recent activity

Pages 2 and 3 are visible to everyone. Pages 4 and 5 require the user to be "logged in" (simulated). Page 1 handles that fake login.

The intent is to replicate the *look and structure* of Codeforces (tables of problems/submissions, verdict badges like AC/WA/TLE, difficulty ratings, tags) without building out real judge/execution logic — submitting code just produces a mock verdict and updates local state.

## Tech Stack
- Next.js (App Router), frontend only — no real backend
- Tailwind CSS + shadcn/ui components
- Mock/hardcoded data (static TS files, no API calls)
- Auth simulated via React Context + localStorage
- Plain `<textarea>` for code submission (no Monaco editor)

---

## 1. Project Setup
- [X] Scaffold Next.js app with App Router and TypeScript
- [X] Install and configure Tailwind CSS
- [X] Install and initialize shadcn/ui
- [X] Add shadcn/ui components: Table, Card, Button, Badge, Input, Tabs, Textarea, Select, Avatar
- [X] Set up base folder structure: `app/`, `components/`, `lib/`, `lib/data/`, `types/`

## 2. Types
- [X] Create `types/index.ts` with interfaces:
  - [X] `Problem` — id, title, tags[], difficulty, statement (markdown string), sampleInput, sampleOutput, solvedCount
  - [X] `Submission` — id, problemId, userId, verdict, language, submittedAt, runtime, memory
  - [X] `User` — username, rating, rank, solvedProblemIds[], avatarUrl

## 3. Mock Data
- [X] Create `lib/data/problems.ts` with ~8–10 sample problems (varied difficulty/tags)
- [X] Create `lib/data/submissions.ts` with sample submissions across users/problems
- [X] Create `lib/data/users.ts` with a few sample user profiles

## 4. Auth (simulated)
- [X] Create `lib/auth-context.tsx`:
  - [X] Context with `user`, `login()`, `logout()`, `isAuthenticated`
  - [X] Persist auth state to `localStorage`
  - [X] Wrap app in `AuthProvider` in `app/layout.tsx`
- [X] Create `components/protected-route.tsx` to guard pages, redirecting to `/login` if not authenticated

## 5. Layout & Navigation
- [X] Build `app/layout.tsx` — root layout with `AuthProvider` + `Navbar`
- [X] Build `components/navbar.tsx`:
  - [X] Show "Problem Set" link always
  - [X] Show "Login" button when logged out
  - [X] Show "Submissions", "Profile", and "Logout" when logged in
- [X] `app/page.tsx` — redirect to `/problemset`

## 6. Login Page
- [X] Build `app/login/page.tsx`
  - [X] Simple form: username + password inputs
  - [X] Fake validation (any non-empty input succeeds, or match against mock users)
  - [X] On submit, call `login()` from auth context, redirect to `/problemset`
  - [X] Show error state for invalid/empty input

## 7. Problem Set Page (public)
- [X] Build `app/problemset/page.tsx`
  - [X] Table of problems: ID, Name (linked to `/problems/[id]`), Tags, Difficulty, Solved count
  - [X] Show checkmark/badge next to problems the logged-in user has solved
  - [X] Add search/filter by tag and difficulty
  - [X] Build `components/problem-table.tsx` for reuse

## 8. Individual Problem Page (public)
- [X] Build `app/problems/[id]/page.tsx`
  - [X] Render problem statement (use `components/markdown-renderer.tsx`)
  - [X] Show constraints, sample input/output
  - [X] Build `components/submission-form.tsx`:
    - [X] Language dropdown (select)
    - [X] Textarea for code
    - [X] Submit button (mock verdict generation — weighted random AC/WA/TLE/etc.)
    - [X] If logged in: shows random mock verdict; if logged out: prompt to log in
  - [X] Handle invalid problem ID (404 state via `notFound()` + custom `app/not-found.tsx`)

## 9. Submission History Page (protected)
- [X] Build `app/submissions/page.tsx`
  - [X] Wrap in `ProtectedRoute`
  - [X] Table: Problem name, Verdict (color-coded badge), Language, Submitted time, Runtime, Memory
  - [X] Filter by verdict/problem (optional)
  - [X] Build `components/submission-table.tsx` for reuse

## 10. Profile Page (protected)
- [X] Build `app/profile/[username]/page.tsx`
  - [X] Wrap in `ProtectedRoute`
  - [X] Show avatar, username, rating, rank
  - [X] List of solved problems (linked)
  - [X] Recent submission activity (reuse `submission-table.tsx`)

## 11. Polish
- [X] Verdict color coding (AC = green, WA = red, TLE = orange, etc.) — consistent across submission table and problem set
- [X] Responsive layout check (table overflow on mobile)
- [X] Loading/empty states for tables (e.g., "No submissions yet")
- [X] Consistent difficulty badge coloring (easy/medium/hard or rating-based)

## Open Decision (confirm before/while building)
- [X] Decided (while building §8): mock submissions are **not persisted anywhere** — the submission form only displays the generated verdict. Submission history (§9) will be built against `lib/data/submissions.ts`. Revisit if persistence becomes desirable.