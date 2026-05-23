# SprintFlow — Backend API

Production-ready Node.js + Express + MongoDB REST API for the SprintFlow task management SaaS platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js ≥ 18 |
| Framework | Express.js 4 |
| Database | MongoDB Atlas via Mongoose 8 |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Security | helmet, express-rate-limit, CORS |
| Logging | morgan |
| Dev | nodemon |

---

## Project Structure

```
server/
├── config/
│   └── db.js                  MongoDB Atlas connection
├── controllers/
│   ├── authController.js      register, login, getMe
│   ├── projectController.js   CRUD for projects
│   └── taskController.js      CRUD for tasks
├── middleware/
│   ├── asyncHandler.js        Eliminates try/catch boilerplate
│   ├── authMiddleware.js      JWT protect middleware
│   └── errorMiddleware.js     Centralised error + 404 handler
├── models/
│   ├── User.js                email unique, password hashed
│   ├── Project.js             createdBy ref, color, status
│   └── Task.js                status/priority enums, projectId ref
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── utils/
│   ├── generateToken.js       JWT sign helper
│   └── apiResponse.js         Consistent response shape helpers
├── .env.example
├── server.js                  App entry point
└── package.json
```

---

## Quick Start

```bash
# 1. Clone and install
cd sprintflow-server
npm install

# 2. Configure environment
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET

# 3. Run in development (nodemon auto-reload)
npm run dev

# 4. Run in production
npm start
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | `development` or `production` |
| `MONGO_URI` | **Yes** | MongoDB Atlas connection string |
| `JWT_SECRET` | **Yes** | Random secret ≥ 32 chars |
| `JWT_EXPIRES_IN` | No | Token TTL (default: `7d`) |
| `CLIENT_URL` | **Yes** | Vercel frontend URL for CORS |

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login and get JWT |
| GET | `/api/auth/me` | **Yes** | Get current user |

### Projects — `/api/projects`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/projects` | **Yes** | List all projects |
| POST | `/api/projects` | **Yes** | Create project |
| GET | `/api/projects/:id` | **Yes** | Get project + taskCount |
| PUT | `/api/projects/:id` | **Yes** | Update project |
| DELETE | `/api/projects/:id` | **Yes** | Delete project + tasks |

### Tasks — `/api/tasks`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/tasks` | **Yes** | All tasks (dashboard) |
| GET | `/api/tasks/project/:id` | **Yes** | Tasks by project |
| POST | `/api/tasks` | **Yes** | Create task |
| PUT | `/api/tasks/:id` | **Yes** | Update task |
| DELETE | `/api/tasks/:id` | **Yes** | Delete task |

### Response Shape

All endpoints return:
```json
// Success
{ "success": true, "message": "OK", "data": {} }

// Error
{ "success": false, "message": "Descriptive error message" }
```

---

## Data Models

### Task Status Values
`todo` · `in-progress` · `done`

### Task Priority Values
`low` · `medium` · `high` · `urgent`

---

## Deployment — Render

1. Push the `sprintflow-server` folder to a GitHub repo
2. On [render.com](https://render.com): **New → Web Service**
3. Connect the repo, set:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Environment:** Node
4. Add environment variables in the Render dashboard:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=<strong-secret>
   CLIENT_URL=https://your-app.vercel.app
   ```
5. Deploy — Render auto-restarts on push

### Connecting to the Frontend (Vercel)

In your Vercel project settings, add:
```
VITE_API_URL=https://your-api.onrender.com
```

The frontend's `src/services/api.js` reads this variable as the Axios base URL.

---

## Health Check

```
GET /api/health
→ { "success": true, "message": "SprintFlow API is running", "environment": "production" }
```
