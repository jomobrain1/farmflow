# Farm Flow Submission README

## Live Links

- Frontend: https://farmflow-srecords.vercel.app
- Backend: https://farmflow-alpha.vercel.app
- GitHub Repository: https://github.com/jomobrain1/farmflow

## Demo Credentials

- Admin: `admin@gmail.com`
- Agent: `agent@gmail.com`
- Password: `12345678`

## Overview

Farm Flow is a field monitoring system built to track crop progress across multiple fields during a growing season.

This README includes:

- setup instructions
- design decisions
- assumptions made

The application supports two roles:

- `Admin`
- `Field Agent`

Admins can manage users, create and assign fields, and monitor updates across agents. Field agents can log in, view only the fields assigned to them, update field stages, and add notes or observations.

## Tech Stack

- Frontend: React, Vite, React Router, Axios, React Toastify
- Backend: Node.js, Express
- Database: MySQL / MariaDB
- Authentication: JWT in HTTP-only cookies
- Deployment: Vercel

## Setup Instructions

### Database Setup

The SQL dump for the project is:

- [`assets/farm-flow.sql`](../assets/farm-flow.sql)

To set up the database:

1. Create a MySQL database.
2. Import `assets/farm-flow.sql`.
3. Update the backend `.env` file with your own database credentials.

If you need a free hosted SQL database, you can register for one at:

- https://www.freesqldatabase.com/account

### Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Create or update `backend/.env`:

```env
PORT=5000
DB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_DATABASE=your-database
JWT_SECRET=your-secret
JWT_EXPIRES=7d
COOKIE_EXPIRES=7
```

Important note:

The backend CORS frontend URL is currently hardcoded in:

- [`backend/config/constants.js`](../backend/config/constants.js)

Current value:

```js
const FRONTEND_URL = "https://farmflow-srecords.vercel.app";
```

Run the backend:

```bash
cd backend
npm start
```

### Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

For production:

```env
VITE_API_BASE_URL=https://farmflow-alpha.vercel.app
```

Run the frontend:

```bash
cd frontend
npm run dev
```

## Design Decisions

### Role-based access

The application uses two roles:

- `admin`
- `agent`

Admins can:

- view all fields
- create and assign fields
- manage users
- monitor field updates across agents

Agents can:

- view only assigned fields
- update only assigned fields
- add notes during updates

### Backend-computed status

Field status is computed in the backend from `current_stage` and `planting_date`. This keeps the logic in one place and ensures the frontend only renders the result.

### Dedicated field updates table

Agent updates are saved in `field_updates` so admins can monitor update history across agents instead of only seeing the latest field state.

### Simple and functional UI

The UI was intentionally kept simple, readable, and responsive. The focus was on fulfilling the business logic clearly rather than over-engineering the interface.

## Assumptions Made

- New registered users are created as `agent` by default.
- Only admins should create fields and assign agents.
- Agents should only see fields assigned to them.
- Only agents create records in `field_updates` when they update a field.
- Admins can update fields without creating a `field_updates` record.
- Higher field IDs represent newer fields.

## Field Stages

The project uses the required field lifecycle:

- `Planted`
- `Growing`
- `Ready`
- `Harvested`

## Field Status Logic

Field status is computed using `current_stage` and `planting_date`.

- `Completed`: field stage is `Harvested`
- `At Risk`: field remains too long in an early stage
- `Active`: all other ongoing fields

Current implementation:

- `Planted` for more than 14 days -> `At Risk`
- `Growing` for more than 45 days -> `At Risk`
- `Harvested` -> `Completed`
- otherwise -> `Active`

## Main User Flows

### Admin

- logs in
- views all fields
- creates and assigns fields
- manages users
- monitors updates across agents

### Agent

- logs in
- sees only assigned fields
- updates stage
- adds notes and observations

## Deployment Notes

- Frontend is deployed on Vercel
- Backend is deployed on Vercel
- Backend requires valid DB and JWT environment variables
- Frontend requires `VITE_API_BASE_URL`
