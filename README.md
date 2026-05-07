# Team Task Manager

A modern, full-stack Team Task Management application built as part of a Full-Stack Hiring Assessment. The application enables teams to efficiently manage projects, assign tasks, and track progress with secure role-based access control.

---

# 🌐 Live Demo

Frontend (Vercel):  
https://team-task-manager-swart-eight.vercel.app/

Backend API (Railway):  
https://team-task-manager-production-2ac6.up.railway.app

---

# 🚀 Features

## 🔐 Authentication & Authorization
- JWT-based secure authentication
- Role-based access control (RBAC)
- Protected routes and APIs
- Admin secret key validation for ADMIN registration

## 👨‍💼 Admin Features
- Create and manage projects
- Create tasks and assign members
- Update and delete tasks
- View all tasks and users
- Access dynamic User Management dashboard

## 👨‍💻 Member Features
- View assigned tasks only
- Update task status
- Personalized dashboard metrics

## 📊 Dashboard & UI
- KPI metrics dashboard
- Recent task activity
- Responsive modern SaaS-style UI
- Clean landing page with authentication modal
- Mobile responsive sidebar and navigation

---

# 🛠️ Tech Stack

## Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React Icons
- React Hot Toast

## Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication
- bcryptjs

## Database
- PostgreSQL (Supabase)

## Deployment
- Frontend: Vercel
- Backend: Railway
- Database: Supabase

---

# 📁 Project Structure

```bash
team-task-manager/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── pages/
│   └── ...
│
├── server/                 # Express Backend
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── index.js
│   └── ...
│
└── README.md
```

---

# 📸 Screenshots

## Landing Page

<img width="1573" height="728" alt="image" src="https://github.com/user-attachments/assets/f1558344-41db-44c1-9431-49a0d20723ba" />


---

## Admin Dashboard

<img width="1597" height="742" alt="image" src="https://github.com/user-attachments/assets/3ace5b72-96a5-46bb-98a9-974f3ed0e224" />


---

## Task Management

<img width="1583" height="738" alt="image" src="https://github.com/user-attachments/assets/c5d9280f-6178-4dd0-849b-6773ee3ec3e0" />


---

## User Management

<img width="1576" height="728" alt="image" src="https://github.com/user-attachments/assets/c5361318-a982-496e-a3be-56e02449b805" />


---


# ⚙️ Local Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
cd team-task-manager
```

---

## 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file inside `server/`:

```env
PORT=5000
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-secret-key"
ADMIN_SECRET_KEY="your-admin-secret"
```

Run Prisma setup:

```bash
npx prisma generate
npx prisma db push
```

Start backend:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create `.env` file inside `client/`:

```env
VITE_API_URL="http://localhost:5000/api"
```

Start frontend:

```bash
npm run dev
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

---

## Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get project details |
| POST | `/api/projects` | Create project (Admin) |

---

## Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get tasks |
| POST | `/api/tasks` | Create task (Admin) |
| PUT | `/api/tasks/:id/status` | Update task status |
| PUT | `/api/tasks/:id/assign` | Assign task |
| DELETE | `/api/tasks/:id` | Delete task |

---

# 🚢 Deployment

## Backend Deployment (Railway)
- Connected GitHub repository to Railway
- Configured `server` as root directory
- Added environment variables
- Generated production deployment URL

## Frontend Deployment (Vercel)
- Connected GitHub repository to Vercel
- Configured `client` as root directory
- Added production API environment variable

---

# 🔐 Demo Credentials

## 👨‍💼 Admin Account

```txt
Email: admin@gmail.com
Password: admin123
```

## 👨‍💻 Member Account

```txt
Email: member@gmail.com
Password: member123
```

---

# 📌 Notes

- Built within a 24-hour assessment timeline
- Focused on clean architecture, responsive UI, and scalable backend structure
- Uses modern full-stack development practices with production deployment

---

# 👨‍💻 Author

C S Goutham Reddy
