# Traveloop Frontend

React + Vite frontend for the Traveloop travel planning application.

## Setup

1. Clone this repo into your project alongside the backend folder
2. Navigate into this folder: `cd frontend`
3. Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL (default: `http://localhost:5000`)
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

The frontend will run on `http://localhost:5174` by default.

## Project Structure

- **src/pages** — All screen/page components (Login, Home, MyTrips, etc.)
- **src/components** — Reusable shared components (TopNavBar, ProtectedRoute, Footer, etc.)
- **src/services** — API service functions for backend communication (auth, trips, etc.)
- **src/context** — Global state management (AuthContext for user & token)
- **src/config** — Configuration files (API base URL)
- **src/assets** — Images, icons, and static assets
- **public** — Static files served by Vite

## Key Features

- User authentication (Login & Register) with JWT tokens
- Protected routes that require authentication
- Trip management (create, view, delete trips)
- Itinerary builder with stops and activities
- Budget tracking and calculation
- Activity recommendations based on budget
- Packing checklist management
- Community features and user profile

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```
VITE_API_URL=http://localhost:5000
```

Adjust the `VITE_API_URL` based on your backend server location.

## Available Scripts

- `npm run dev` — Start development server (with HMR)
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

## Technology Stack

- **React 19.2.5** — UI library
- **Vite 8.0.10** — Build tool and dev server
- **React Router DOM 7.15.0** — Client-side routing
- **Tailwind CSS 3.4.19** — Utility-first CSS framework
- **PostCSS 8.4.47** — CSS processing

## Integration with Backend

This frontend is designed to work seamlessly with the Traveloop backend API:

- Backend runs on `http://localhost:5000` by default
- Backend provides REST API endpoints for authentication, trips, itineraries, and more
- Authentication uses JWT tokens stored in localStorage
- All API calls include authorization headers when required

## Notes

- Ensure the backend server is running before starting the frontend dev server
- HTTP-only cookies are used for authentication (credentials: 'include' in fetch calls)
- The `ProtectedRoute` component guards all authenticated pages
- The `AuthContext` provides global access to user and token state
