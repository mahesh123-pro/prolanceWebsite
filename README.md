# Prolance (ProConnectHub) MVP

Welcome to Prolance! A professional networking and career development platform where students, professionals, and recruiters can connect, learn, find opportunities, collaborate, and grow careers.

## Project Structure

This project adopts a modern React/Node.js stack, separated into a `frontend` and `backend`.

### 1. Frontend (Next.js App Router)
- **Tech**: Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI
- **Setup**: `cd frontend` then `npm install` and `npm run dev`
- **Features scaffolded**:
  - Theme switching (Dark/Light mode)
  - Responsive Navbar
  - Premium modern Landing Page (`/` route)

### 2. Backend (Express Node.js)
- **Tech**: Node.js, Express, TypeScript, MongoDB, JWT Auth
- **Setup**: `cd backend` then `npm install` and `npm run dev` 
  - *Make sure to have MongoDB running and check out `.env` file*
- **Features scaffolded**:
  - `User` model, authentication logic, JWT middleware
  - `Job` model and REST API setup (`/api/jobs`)
  - `Event` model for Tech Events / Hackathons
  - `Post` model for Community Discussions

## Next Steps

We have completed the core structural foundations for Phase 1!
- Built Auth endpoints (Login / Signup)
- Implemented Job creation and retrieval APIs
- Built frontend components UI library with Shadcn UI (Buttons, Cards, Forms, Labels)
- Created the landing page MVP structure

To start working on the frontend:
```bash
cd frontend
npm run dev
```

To run the backend API server:
```bash
cd backend
npm run dev
```
