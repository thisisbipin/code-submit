# CodeSubmit

A frontend-only competitive programming project built with **Next.js (App Router)**, **Tailwind CSS**, and **shadcn/ui**.

There is **no real backend**: authentication, problems, and submissions are all simulated with hardcoded mock data and browser state (React Context + `localStorage`). Submitting code runs a mock judge that returns a weighted-random verdict — nothing is executed, persisted, or sent over the network.

## Pages

| Route | Description | Access |
| --- | --- | --- |
| `/login` | Fake auth form — matches against mock users, any password works. | Public |
| `/problemset` | Searchable/filterable table of problems with solved checkmarks. | Public |
| `/problems/[id]` | Problem statement (markdown), sample input/output, and a mock submission form. | Public |
| `/submissions` | The logged-in user's submission history, filterable by verdict and problem. | Protected |
| `/profile/[username]` | Avatar, rating, rank, solved problems, and recent submission activity. | Protected |

Protected routes redirect to `/login` when a visitor isn't authenticated and show a brief loading state while the session is restored from `localStorage`. Unknown problem or profile IDs render a custom 404 page.

## Tech Stack

- **Next.js** (App Router) + TypeScript, React 19
- **Tailwind CSS v4** + **shadcn/ui** components (Table, Card, Button, Badge, Input, Select, Textarea, Avatar, Tabs)
- **react-markdown** for rendering problem statements
- **lucide-react** for icons
- No backend, no database, no API calls — all data lives in static TS files

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app boots straight into the Problem Set.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project |

## Demo Accounts

Log in with any of these usernames (any password works):

| Username | Rating | Rank |
| --- | ---: | --- |
| `tourist` | 3400 | Legendary Grandmaster |
| `Petr` | 3200 | International Grandmaster |
| `alice` | 2100 | Candidate Master |
| `bob` | 1350 | Pupil |

## How It Works

- **Auth (simulated)** — `lib/auth-context.tsx` provides an `AuthProvider` + `useAuth()` hook and persists the logged-in `User` to `localStorage`. `components/protected-route.tsx` guards the protected pages.
- **Mock judge** — `components/submission-form.tsx` waits briefly, then produces a weighted-random verdict (~65% AC, otherwise WA/TLE/CE/RTE/MLE) with plausible runtime/memory numbers. Verdicts are displayed inline and **not persisted**.
- **Shared styles** — verdict and difficulty badges use shared helpers in `lib/verdict.ts` and `lib/difficulty.ts`, so color coding is consistent across the problem set, submission history, and profile. Codeforces-style rank colors live in `lib/rank.ts`; time/runtime/memory formatting lives in `lib/format.ts`.

## Project Structure

```
app/
  layout.tsx                  Root layout (AuthProvider + Navbar)
  page.tsx                    Redirects / to /problemset
  not-found.tsx               Custom 404
  login/page.tsx              Simulated login
  problemset/page.tsx         Problem set
  problems/[id]/page.tsx      Individual problem + submission form
  submissions/page.tsx        Submission history (protected)
  profile/[username]/page.tsx Profile (protected)
components/
  navbar.tsx, protected-route.tsx
  problem-table.tsx, submission-table.tsx, submission-form.tsx, markdown-renderer.tsx
  ui/                         shadcn/ui components
lib/
  auth-context.tsx            Auth state + localStorage persistence
  data/                       Mock problems, submissions, and users
  verdict.ts, difficulty.ts, rank.ts, format.ts   Shared style/format helpers
types/
  index.ts                    Problem, Submission, User, Difficulty, Verdict
TODO.md                       Full implementation checklist (all sections complete)
```