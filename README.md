# 🌍 Traveloop — Personalized Travel Planning Made Easy

> Built for the Odoo Hackathon at KAHE Coimbatore | Team of 4 | KPRIET

---

## 📌 Overview

Traveloop is a full-stack travel planning web application that empowers users to dream, design, and organize trips with ease. From multi-city itinerary building to budget tracking, packing checklists, and community sharing — Traveloop makes travel planning as exciting as the trip itself.

---

## 🚀 Live Features

- 🔐 JWT Authentication (Register / Login with animated transitions)
- 🗺️ Multi-city Itinerary Builder with stop management
- 📅 Day-wise Itinerary View with budget breakdown charts
- 💰 Trip Budget Tracking with category-wise breakdown
- 🧳 Packing Checklist with progress tracking
- 📝 Trip Notes / Journal stored per trip
- 🧾 Expense Invoice with PDF export support
- 👥 Community Feed with trending destinations
- 🔍 Activity & City Search with map view
- 👤 User Profile with trip history
- 🛡️ Admin Dashboard with analytics charts

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| Tailwind CSS v3 | Styling and design system |
| React Router v6 | Client-side routing |
| Recharts | Budget and analytics charts |
| Context API | Global auth state management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server and API |
| Prisma ORM | Database management |
| PostgreSQL | Relational database |
| JWT + Cookies | Authentication |

---

## 📁 Project Structure
odoo-x-kahe/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── services/
│   ├── server.js
│   └── package.json
│
└── frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── TopNavBar.jsx
│   │   ├── Footer.jsx
│   │   ├── DoodleBackground.jsx
│   │   ├── AirplaneTransition.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── config/
│   │   └── api.js
│   ├── services/
│   │   ├── auth.js
│   │   └── trips.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── MyTrips.jsx
│   │   ├── PlanTrip.jsx
│   │   ├── ItineraryBuilder.jsx
│   │   ├── ItineraryView.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Community.jsx
│   │   ├── Profile.jsx
│   │   ├── Checklist.jsx
│   │   ├── Notes.jsx
│   │   ├── Invoice.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- PostgreSQL running locally
- Git

### 1. Clone the repository
```bash
git clone https://github.com/sarva-20/odoo-x-kahe.git
cd odoo-x-kahe
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/traveloop"
JWT_SECRET="your_jwt_secret_here"
PORT=5000
```

Run database migrations:
```bash
npx prisma migrate deploy
npx prisma generate
```

Start the backend:
```bash
npm run dev
```
Backend runs at `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |

### Trips
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /api/trips/ | Create a new trip | Yes |
| GET | /api/trips/ | Get all user trips | Yes |
| GET | /api/trips/:id | Get trip details | Yes |
| DELETE | /api/trips/:id | Delete a trip | Yes |

### Itinerary
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /api/trips/:tripId/stops | Add stop to trip | Yes |
| POST | /api/stops/:stopId/activities | Add activity to stop | Yes |
| GET | /api/trips/:tripId/full | Get full itinerary | Yes |

### Utility
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /api/trips/:id/budget | Get trip budget | Yes |
| GET | /api/trips/:id/recommendations | Get recommendations | Yes |
| POST | /api/trips/:id/checklist | Add checklist item | Yes |

All protected routes require:
Authorization: Bearer <token>

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary (Coral) | #FF4500 |
| Secondary (Teal) | #004B57 |
| Amber Accent | #FFB347 |
| Background | #fff8f6 |
| Headline Font | Plus Jakarta Sans 800 |
| Body Font | Be Vietnam Pro |
| Card Shadow | 4px 4px 0px 0px #000 |

Design philosophy: **Neo-brutalism** meets travel — bold borders, hard shadows, coral-dominant palette, scattered travel doodle background with cursor parallax.

---

## 👥 Team

| Name | Role |
|---|---|
| Sarvatarshan Sankar | Frontend — UI/UX, React, Design System |
| Pranav  V M | Backend — Node.js, Express, Prisma |
| Dhanyaa R S  | Backend — Database, PostgreSQL, APIs |
| Hamreeth L S | Full Stack — Integration, Testing |

---

## 📄 License

MIT License — Built with ❤️ for Odoo Hackathon 2025
