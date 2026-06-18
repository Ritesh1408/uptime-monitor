# Uptime Monitor

## Overview

Uptime Monitor is a full-stack web application that periodically checks the availability of websites and displays their operational status, response times, and latest health information.

The application automatically monitors registered URLs using scheduled background jobs and stores health check history in MongoDB.

---

## Features

* Add website URLs for monitoring
* Delete monitored URLs
* Automatic uptime checks every minute
* Response time tracking
* HTTP status code tracking
* UP / DOWN status monitoring
* Dashboard statistics
* Auto-refresh every 30 seconds
* Toast notifications for user actions

---

## Tech Stack

### Frontend

* React
* TypeScript
* Redux Toolkit
* Tailwind CSS
* Vite
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* Axios
* Node Cron
* Zod

---

## Project Structure

backend/

* controllers
* models
* routes
* services
* middleware
* validators
* jobs

frontend/

* components
* features
* hooks
* services
* pages
* app

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd uptime-monitor
```

### Backend Setup

```bash
cd backend

pnpm install

cp .env.example .env
```

Update .env:

```env
PORT=5000
MONGODB_URI=<mongodb-atlas-uri>
```

Start backend:

```bash
pnpm dev
```

---

### Frontend Setup

```bash
cd frontend

pnpm install
```

Create:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start frontend:

```bash
pnpm dev
```

---

## API Endpoints

### Create Monitor

POST

```http
/api/v1/monitors
```

Body:

```json
{
  "url": "https://example.com"
}
```

---

### Get Monitors

GET

```http
/api/v1/monitors
```

---

### Delete Monitor

DELETE

```http
/api/v1/monitors/:id
```

---

## Monitoring Workflow

1. User adds URL.
2. URL is stored in MongoDB.
3. Cron job runs every minute.
4. URL is pinged using Axios.
5. Health check result is stored.
6. Dashboard displays latest status.

---

## Live Demo

Frontend: https://your-vercel-url.vercel.app

Backend: https://your-render-url.onrender.com

## Future Improvements

* Authentication
* Historical charts
* Email alerts
* SMS notifications
* WebSocket updates
* Multi-user support

Note: The monitoring scheduler runs within the backend process.

On free hosting platforms, scheduled checks may pause if the service becomes inactive.