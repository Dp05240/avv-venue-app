# AV+V (Audio Video + Venue)

A comprehensive tool for event venues (indoor/outdoor) to manage clients, bookings, floor plans, financials, and more.

## Tech Stack
- **Frontend:** Next.js (React, TypeScript)
- **Backend:** Node.js (Express, TypeScript)
- **Database:** PostgreSQL
- **Auth:** SSO & Email/Password (Auth0 or Firebase Auth)
- **File Storage:** S3-compatible (TBD)

## Features (MVP)
- Venue & floor plan management (with annotation)
- Client management & temporary portal
- Bookings & scheduling (shift/event-based)
- Financials & reporting (PDF/Excel, PIN-protected)
- Messaging (internal & client, with auto-expiry)
- Employee directory

## Setup

### Frontend
```sh
cd frontend
npm install
npm run dev
```

### Backend
```sh
cd backend
npm install
npx ts-node src/index.ts
```

### Database
- Use PostgreSQL (local or cloud, e.g., Supabase, Neon, or Render)
- Configure connection in `backend/.env`

### Sample Data
- The app will include 1-2 venues, clients, employees, and bookings for testing.

---

For questions or contributions, open an issue or contact the maintainer.