# SprintFlow

A full-stack task management SaaS application inspired by Jira and GoodDay. Organize work into projects, track tasks across a Kanban board, and collaborate with your team — all backed by a persistent MongoDB database.

---

## Overview

SprintFlow is a MERN stack application split into two packages:

```
SprintFlow-Final/
├── sprintflow/          ← Frontend  (React + Vite + Tailwind CSS)
└── sprintflow-server/   ← Backend   (Express + MongoDB + JWT)
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| Axios | HTTP client with interceptors |
| Context API | Auth & toast state management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js ≥ 18 | Runtime |
| Express 4 | HTTP server & routing |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens | Authentication |
| bcryptjs | Password hashing |
| Helmet | Security headers |
| express-rate-limit | Brute-force protection |
| Morgan | Request logging |

---

## Features

- **Authentication** — Register, login, JWT-based session with auto-refresh on page reload
- **Projects** — Create, view, and delete projects; each with a custom colour
- **Kanban Board** — Three-column board (To Do → In Progress → Done) with drag-free status transitions
- **Task Management** — Create tasks with title, description, priority, assignee, and deadline
- **Filters** — Filter tasks by status and priority within a project
- **Dashboard** — Live stats (total projects, total tasks, completed, pending) and recent task list
- **Optimistic UI** — Status changes and deletes reflect instantly; roll back on failure
- **Protected Routes** — All app pages require authentication; unauthenticated users redirect to login
- **Error Handling** — Loading states, empty states, and API error feedback throughout

---

## Project Structure

### Frontend — `sprintflow/`

```
src/
├── components/
│   ├── common/          # Modal, Loader, EmptyState, ConfirmDialog, ErrorBoundary
│   ├── dashboard/       # StatsCard, RecentTasks, TaskChart
│   ├── layout/          # Layout, Navbar, Sidebar
│   ├── project/         # ProjectCard, ProjectForm, ProjectList
│   └── task/            # KanbanBoard, TaskCard, TaskColumn, TaskFilters, TaskForm
├── context/
│   ├── AuthContext.jsx  # JWT auth state, login/register/logout
│   └── ToastContext.jsx # App-wide toast notifications
├── hooks/
│   ├── useAuth.js       # Consumes AuthContext
│   ├── useProjects.js   # Project fetch + CRUD with state
│   └── useTasks.js      # Task fetch + CRUD with optimistic updates
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Projects.jsx
│   └── ProjectDetails.jsx
├── routes/
│   └── ProtectedRoute.jsx
├── services/
│   ├── api.js           # Axios instance + JWT interceptor + 401 handler
│   ├── authService.js   # /api/auth/* calls
│   ├── projectService.js# /api/projects/* calls
│   └── taskService.js   # /api/tasks/* calls
└── utils/
    ├── constants.js     # TASK_STATUS, TASK_PRIORITY, LOCAL_STORAGE_KEYS
    └── helpers.js       # formatDate, getPriorityClass, filterTasks, isOverdue
```

### Backend — `sprintflow-server/`

```
├── config/
│   └── db.js            # Mongoose connection
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
├── middleware/
│   ├── asyncHandler.js  # Wraps async route handlers
│   ├── authMiddleware.js# JWT protect middleware
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── utils/
│   ├── apiResponse.js   # Standardised { success, message, data } shape
│   └── generateToken.js
└── server.js
```

---

## API Reference

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account, returns `{ user, token }` |
| POST | `/api/auth/login` | Public | Login, returns `{ user, token }` |
| GET | `/api/auth/me` | Private | Get current user from token |

### Projects
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/projects` | Private | All projects for current user |
| POST | `/api/projects` | Private | Create a project |
| GET | `/api/projects/:id` | Private | Single project with task count |
| PUT | `/api/projects/:id` | Private | Update project fields |
| DELETE | `/api/projects/:id` | Private | Delete project + cascade delete its tasks |

### Tasks
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/tasks` | Private | All tasks for current user (dashboard) |
| POST | `/api/tasks` | Private | Create a task |
| GET | `/api/tasks/project/:projectId` | Private | Tasks filtered by project |
| PUT | `/api/tasks/:id` | Private | Update task fields |
| DELETE | `/api/tasks/:id` | Private | Delete a task |

All responses follow the shape:
```json
{ "success": true, "message": "OK", "data": {} }
```

---

## Quick Start

### Prerequisites
- Node.js v18+
- A [MongoDB Atlas](https://cloud.mongodb.com) free cluster (or local MongoDB)

### 1. Backend

```bash
cd sprintflow-server
npm install
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET, CLIENT_URL
npm run dev               # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd sprintflow
npm install
cp .env.example .env      # set VITE_API_URL=http://localhost:5000
npm run dev               # starts on http://localhost:3000
```

### Environment Variables

**`sprintflow-server/.env`**
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/sprintflow
JWT_SECRET=your_long_random_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**`sprintflow/.env`**
```env
VITE_API_URL=http://localhost:5000
```

---

## Deployment

| Service | Target |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) |

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full step-by-step guide covering MongoDB Atlas setup, Render configuration, Vercel deployment, CORS setup, and troubleshooting.

---


