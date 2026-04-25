# Farm Flow

## Live Links

- Frontend: https://farmflow-srecords.vercel.app
- Backend: https://farmflow-alpha.vercel.app
- GitHub Repository: https://github.com/jomobrain1/farmflow

## Demo Credentials

- Admin: `admin@gmail.com`
- Agent: `agent@gmail.com`
- Password: `12345678`

## Overview

Farm Flow is a field monitoring system built for tracking crop progress across multiple fields during a growing season.

This README includes:

- setup instructions
- design decisions
- assumptions made

It supports two roles:

- `Admin (Coordinator)`
- `Field Agent`

The system allows admins to manage fields, assign agents, manage users, and monitor updates across agents. Field agents can view the fields assigned to them, update field stage, and add notes or observations.

## Frontend Preview

![Farm Flow frontend preview](assets/frontend.png)

## Tech Stack

- Frontend: React, Vite, React Router, Axios, React Toastify
- Backend: Node.js, Express
- Database: MySQL / MariaDB
- Authentication: JWT stored in HTTP-only cookies
- Deployment: Vercel

## Features

- User authentication with role-based access
- Admin and agent workflows
- Field creation, editing, assignment, and deletion
- Agent-only field updates with notes
- Admin monitoring table for field updates across agents
- Computed field status:
  - `Active`
  - `At Risk`
  - `Completed`
- User management for admins
- Responsive dashboard and field views

## Project Structure

```text
farm-flow/
|- frontend/
|- backend/
|- assets/
|  |- farm-flow.sql
|  |- frontend.png
|- submission/
|- README.md
```

## Setup Instructions

### 1. Clone the project

```bash
git clone https://github.com/jomobrain1/farmflow
cd farmflow
```

### 2. Database Setup

The SQL dump for the project is:

- [`assets/farm-flow.sql`](assets/farm-flow.sql)

You can use:

- your own local MySQL / MariaDB setup
- or a free hosted SQL database from https://www.freesqldatabase.com/account

To set up the database:

1. Create a MySQL database.
2. Import [`assets/farm-flow.sql`](assets/farm-flow.sql).
3. Update the backend `.env` file with your database credentials.

### 3. Backend Setup

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

- [`backend/config/constants.js`](backend/config/constants.js)

Current value:

```js
const FRONTEND_URL = "https://farmflow-srecords.vercel.app";
```

If you want to run a different frontend URL locally or deploy to another domain, update that constant before starting the backend.

Run the backend:

```bash
npm start
```

Default backend URL:

- `http://localhost:5000`

### 4. Frontend Setup

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
npm run dev
```

Default frontend URL:

- `http://localhost:5173`

### 5. Build Commands

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
npm start
```

## Design Decisions

### 1. Role-based access

The application uses two roles:

- `admin`
- `agent`

This was implemented to match the assessment directly and keep permissions simple and clear.

Admins can:

- view all fields
- create and assign fields
- manage users
- edit and delete any field
- monitor field updates across agents

Agents can:

- view only fields assigned to them
- update only assigned fields
- add notes and observations during updates

### 2. JWT cookie authentication

Authentication uses JWT stored in an HTTP-only cookie instead of local storage. This keeps the token out of frontend-accessible JavaScript and fits well with the backend-driven auth flow.

### 3. Computed field status in the backend

Field status is not stored directly as a manual field. It is computed in the backend from `current_stage` and `planting_date`, then returned to the frontend. This keeps the status logic centralized and avoids duplication across the UI.

### 4. Separate field updates log

Agent updates are stored in the `field_updates` table rather than overwriting notes history in the main `fields` table. This makes it possible for admins to monitor updates across agents over time.

### 5. Admin monitoring dashboard

The admin dashboard includes:

- overall field summary
- users table
- field updates table

This was added so the dashboard reflects coordination and monitoring responsibilities, not just basic CRUD.

### 6. Simpler UI over over-engineering

The interface is intentionally simple and functional. The goal was clarity, usability, and covering the business logic in the brief rather than adding unnecessary complexity.

## Assumptions Made

- New users who register are created as `agent` by default.
- Only admins should create fields and assign agents.
- Agents should only see fields assigned to them, both on the dashboard and the fields page.
- Only agents create records in `field_updates` when updating a field.
- Admins can update a field without creating a field update log entry.
- The latest records are represented by higher field IDs.
- A field is considered:
  - `Completed` when its stage is `Harvested`
  - `At Risk` when it stays too long in an early stage
  - `Active` in all other valid in-progress cases

## Field Stages

The application uses the lifecycle required in the assessment:

- `Planted`
- `Growing`
- `Ready`
- `Harvested`

## Field Status Logic

Field status is computed from `current_stage` and `planting_date`.

- `Completed`: when a field reaches `Harvested`
- `At Risk`: when a field remains too long in an early stage
- `Active`: all other ongoing fields

Current implementation:

- `Planted` for more than 14 days -> `At Risk`
- `Growing` for more than 45 days -> `At Risk`
- `Harvested` -> `Completed`
- otherwise -> `Active`

## Main User Flows

### Admin

- logs in
- sees all fields
- sees dashboard summaries
- creates fields
- assigns fields to agents
- edits or deletes fields
- manages users
- monitors field updates across agents

### Agent

- registers or logs in
- sees only assigned fields
- updates stage for assigned fields
- adds notes and observations
- contributes updates that appear in the admin monitoring table

## API Groups

- `/api/v1/auth`
- `/api/v1/agents`
- `/api/v1/fields`

## Deployment Notes

### Frontend on Vercel

- set `VITE_API_BASE_URL` to your deployed backend URL
- current backend: `https://farmflow-alpha.vercel.app`

### Backend on Vercel

- configure DB and JWT environment variables
- make sure the database is reachable from Vercel
- if the frontend deployment URL changes, update `FRONTEND_URL` in [`backend/config/constants.js`](backend/config/constants.js)

## Quick Start

1. Import [`assets/farm-flow.sql`](assets/farm-flow.sql) into a MySQL database.
2. Configure `backend/.env`.
3. Configure `frontend/.env`.
4. Start the backend with `npm start`.
5. Start the frontend with `npm run dev`.
6. Log in using the demo credentials above.
