# Perxins Demo System

## Setup

1. Install dependencies: `npm install` or `pnpm install`

2. Set environment for demo: Copy `.env.example` to `.env` and set `VITE_APP_MODE=demo`

3. Run the app: `npm run dev` or `pnpm dev`

## Environment Modes

- **Demo**: Uses mock data with localStorage persistence, all operations succeed, realistic delays.
- **Development**: Uses local API at http://localhost:3001
- **Production**: Uses production API

Switch by changing `VITE_APP_MODE` in .env and restarting.

## Features

- Full CRUD for services, events, users, etc. with relationships (likes, reservations, notifications).
- Persistence: Demo data saves to localStorage, restores on reload.
- Success-first: All actions succeed, positive feedback.
- Routes: All pages (Home, Search, Create, Profile, Messages, etc.) work with mocks.
- Notifications, sharing, auth (mock user in App.jsx).

## Deployment

For demo deployment:
1. Build: `npm run build -- --mode demo`
2. Serve build folder.
3. Set VITE_APP_MODE=demo in hosting env vars.

## Verification

- Load app in demo mode.
- Search services/events: See mock data, like/reserve works, data persists.
- Create service: Adds to list, persists.
- Navigate routes: Consistent data, no errors.

For production, set VITE_APP_MODE=production and real API.