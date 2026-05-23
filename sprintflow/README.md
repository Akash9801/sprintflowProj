# SprintFlow Frontend

A modern SaaS task management dashboard built with React + Vite + Tailwind CSS.

## Tech Stack

- **React 18** + **Vite 5** — fast dev & build
- **Tailwind CSS 3** — utility-first styling
- **React Router DOM 6** — client-side routing
- **Axios** — HTTP client with interceptors
- **Context API** — auth state management

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — sign in with any email/password (mock auth).

## Folder Structure

```
src/
├── components/
│   ├── layout/      — Sidebar, Navbar, Layout wrapper
│   ├── dashboard/   — StatsCard, RecentTasks, TaskChart
│   ├── project/     — ProjectCard, ProjectForm, ProjectList
│   ├── task/        — TaskCard, TaskForm, TaskColumn, KanbanBoard, TaskFilters
│   └── common/      — Loader, Modal, EmptyState
├── context/         — AuthContext (JWT + localStorage)
├── hooks/           — useAuth
├── pages/           — Login, Register, Dashboard, Projects, ProjectDetails, NotFound
├── routes/          — ProtectedRoute
├── services/        — api.js (axios), authService, projectService, taskService
└── utils/           — constants, helpers, mockData
```

## Connecting to Backend

All API calls are centralized in `src/services/`. To connect your Node.js + Express backend:

1. Set `VITE_API_URL=https://your-api.com` in `.env`
2. Replace mock implementations in each service file with real `api.get/post/put/delete` calls
3. The axios instance in `src/services/api.js` handles JWT headers and 401 redirects automatically

## Deployment (Vercel)

```bash
npm run build
```

The `vercel.json` handles SPA routing rewrites. Set `VITE_API_URL` in your Vercel project environment variables.
