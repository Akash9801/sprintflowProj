# SprintFlow — Deployment Guide

A beginner-friendly, step-by-step guide for running SprintFlow locally and deploying it to production (Render + Vercel + MongoDB Atlas).

---

## Table of Contents

1. [Project structure](#1-project-structure)
2. [MongoDB Atlas setup](#2-mongodb-atlas-setup)
3. [Backend local setup](#3-backend-local-setup)
4. [Frontend local setup](#4-frontend-local-setup)
5. [Environment variables reference](#5-environment-variables-reference)
6. [Deploy backend to Render](#6-deploy-backend-to-render)
7. [Deploy frontend to Vercel](#7-deploy-frontend-to-vercel)
8. [CORS configuration](#8-cors-configuration)
9. [Production checklist](#9-production-checklist)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Project structure

```
SprintFlow-Final/
├── sprintflow/          ← React + Vite frontend
└── sprintflow-server/   ← Express + MongoDB backend
```

---

## 2. MongoDB Atlas setup

MongoDB Atlas is a free cloud database. Follow these steps:

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account.
2. Click **"Build a Database"** → choose **"M0 Free"** tier → select your region → click **Create**.
3. When prompted for a username/password, pick something secure and save it — you'll need it later.
4. Under **"Where would you like to connect from?"** select **"My Local Environment"** and add `0.0.0.0/0` as the IP address (this allows connections from anywhere, including Render). Click **"Add Entry"** then **"Finish and Close"**.
5. Click **"Connect"** on your cluster → **"Connect your application"** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with the credentials you set in step 3.
7. Add the database name to the URI:
   ```
   mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/sprintflow?retryWrites=true&w=majority
   ```
   This is your `MONGO_URI`.

---

## 3. Backend local setup

### Prerequisites
- Node.js v18 or higher ([download here](https://nodejs.org))
- npm (comes with Node)

### Steps

```bash
# 1. Enter the backend folder
cd SprintFlow-Final/sprintflow-server

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/sprintflow?retryWrites=true&w=majority
JWT_SECRET=pick_any_long_random_string_here_at_least_32_chars
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

> **JWT_SECRET tip:** Generate a strong secret with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

```bash
# 4. Start the backend in development mode (auto-restarts on save)
npm run dev

# You should see:
# 🚀  SprintFlow API running in development mode on port 5000
```

Test the API is running:
```
GET http://localhost:5000/api/health
```

---

## 4. Frontend local setup

### Steps

```bash
# 1. Open a new terminal, enter the frontend folder
cd SprintFlow-Final/sprintflow

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env
```

Open `.env` and set:

```env
VITE_API_URL=http://localhost:5000
```

```bash
# 4. Start the Vite dev server
npm run dev

# You should see:
#   ➜  Local:   http://localhost:3000/
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Register an account, create a project, and add tasks — all data will persist in MongoDB.

---

## 5. Environment variables reference

### Backend (`sprintflow-server/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | No (default `5000`) | Port the API server listens on |
| `MONGO_URI` | **Yes** | MongoDB Atlas connection string |
| `JWT_SECRET` | **Yes** | Secret used to sign JWTs — keep private |
| `NODE_ENV` | No (default `development`) | Set to `production` on Render |
| `CLIENT_URL` | **Yes** | Frontend origin added to CORS allowlist |

### Frontend (`sprintflow/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | **Yes** | Base URL of the backend API |

> All Vite env vars must start with `VITE_` to be exposed in the browser bundle.

---

## 6. Deploy backend to Render

[Render](https://render.com) offers a free tier for web services.

1. Push your `sprintflow-server` folder to a GitHub repository.
2. Go to [https://dashboard.render.com](https://dashboard.render.com) → **"New"** → **"Web Service"**.
3. Connect your GitHub account and select the repository.
4. Configure the service:
   - **Name:** `sprintflow-api`
   - **Root Directory:** `sprintflow-server` *(if both are in the same repo)*
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **"Add Environment Variable"** and add each variable:
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET` — your generated secret
   - `NODE_ENV` — `production`
   - `CLIENT_URL` — your Vercel frontend URL (add this after Vercel deploy, see step 7)
   - `PORT` — Render sets this automatically; you don't need to add it
6. Click **"Create Web Service"**. The first deploy takes ~2 minutes.
7. Copy your service URL (e.g. `https://sprintflow-api.onrender.com`). You'll use this for the frontend.

> **Free tier note:** Render free services spin down after 15 minutes of inactivity. The first request after sleeping takes ~30 seconds. Upgrade to a paid plan for always-on hosting.

---

## 7. Deploy frontend to Vercel

[Vercel](https://vercel.com) is the recommended host for Vite/React apps.

1. Push your `sprintflow` folder to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) → **"New Project"** → import your repository.
3. Configure:
   - **Framework Preset:** Vite *(Vercel usually auto-detects this)*
   - **Root Directory:** `sprintflow` *(if both are in the same repo)*
   - **Build Command:** `npm run build` *(auto-filled)*
   - **Output Directory:** `dist` *(auto-filled)*
4. Click **"Environment Variables"** and add:
   - `VITE_API_URL` = `https://sprintflow-api.onrender.com` *(your Render URL)*
5. Click **"Deploy"**. Wait for the build to finish.
6. Copy your Vercel URL (e.g. `https://sprintflow.vercel.app`).
7. Go back to Render → your backend service → **"Environment"** → update `CLIENT_URL` to your Vercel URL → click **"Save Changes"**. Render will redeploy automatically.

---

## 8. CORS configuration

The backend (`server.js`) uses an allowlist for CORS origins:

```js
const allowedOrigins = [
  process.env.CLIENT_URL,  // your Vercel URL in production
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean)
```

**For production:** make sure `CLIENT_URL` on Render is set to your exact Vercel URL, including the `https://` prefix and with no trailing slash.

**If you use a custom domain on Vercel:** add it to `CLIENT_URL` instead (or additionally).

---

## 9. Production checklist

Before going live, confirm all of the following:

- [ ] `MONGO_URI` points to your Atlas cluster, not a local instance
- [ ] `JWT_SECRET` is at least 32 characters and not committed to Git
- [ ] `NODE_ENV=production` is set on Render
- [ ] `CLIENT_URL` on Render matches your Vercel URL exactly
- [ ] `VITE_API_URL` on Vercel points to your Render service URL
- [ ] MongoDB Atlas IP allowlist includes `0.0.0.0/0` (or Render's IP ranges)
- [ ] `vercel.json` exists in the frontend with the SPA rewrite rule (already included)

---

## 10. Troubleshooting

### "Failed to load projects" / "Network Error" on the frontend

- Check that `VITE_API_URL` in Vercel points to your Render backend.
- Open the browser console → Network tab → look at the failing request URL.
- Verify the backend is awake by visiting `https://sprintflow-api.onrender.com/api/health`.

### Login returns "Invalid email or password"

- Make sure you registered first — there are no seed users.
- Check that the frontend is calling the correct backend (not localhost).

### "CORS error" in the browser console

- Confirm `CLIENT_URL` on Render exactly matches your Vercel URL (no trailing slash, correct protocol).
- Redeploy the backend on Render after updating environment variables.

### MongoDB connection errors on Render

- Verify `MONGO_URI` is correct and the password doesn't contain unescaped special characters (encode them as `%xx`).
- Confirm Atlas network access allows `0.0.0.0/0`.

### Render service keeps sleeping (free tier)

- Use a cron service like [UptimeRobot](https://uptimerobot.com) (free) to ping `/api/health` every 10 minutes.
- Or upgrade to Render's Starter plan ($7/month) for always-on service.

### "Vite build fails" / `VITE_API_URL` is undefined in production

- Make sure the environment variable is added in the Vercel dashboard **before** triggering a build.
- All frontend env vars must start with `VITE_`.

### Frontend shows blank page after Vercel deploy

- Make sure `vercel.json` contains the SPA rewrite rule so React Router works:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
  This file is already included in the project.

---

## Quick reference commands

```bash
# Backend
cd sprintflow-server
npm install
npm run dev          # development
npm start            # production

# Frontend
cd sprintflow
npm install
npm run dev          # development (http://localhost:3000)
npm run build        # production build → dist/
npm run preview      # preview production build locally
```
