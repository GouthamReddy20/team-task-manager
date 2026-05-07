# Team Task Manager

A simple, professional, full-stack application for managing team projects and tasks. Built specifically as a hiring assessment project focusing on clean architecture, responsive UI, and deployment readiness.

## 🚀 Features

- **Authentication**: JWT-based secure signup and login.
- **Role-Based Access Control**:
  - **ADMIN**: Create projects, create tasks, assign tasks, full visibility.
  - **MEMBER**: View assigned tasks, update task status (TODO, IN_PROGRESS, DONE).
- **Project Management**: Create and view projects.
- **Task Management**: Create tasks, assign to members, filter by status, and update statuses.
- **Dashboard**: High-level KPIs and recent activity.
- **Responsive UI**: Clean, light-themed SaaS style interface built with Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios
- Lucide React (Icons)
- React Hot Toast (Notifications)
- *No complex state management libraries, no heavy dependencies.*

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication & bcryptjs

**Target Deployment Platforms:**
- Frontend: Vercel
- Backend: Railway
- Database: Supabase

## 📁 Folder Structure

```
team-task-manager/
├── client/                 # Vite React Application
│   ├── src/
│   │   ├── components/     # UI components and layout
│   │   ├── context/        # Auth Context
│   │   ├── lib/            # Axios API config & utilities
│   │   └── pages/          # Dashboard, Login, Projects, etc.
│   └── ...
├── server/                 # Express Backend Application
│   ├── prisma/             # Prisma Schema
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth & Role validation
│   │   ├── routes/         # Express routes
│   │   └── index.js        # Server entry point
│   └── ...
└── README.md
```

## ⚙️ Local Setup Instructions

### 1. Database (Supabase / PostgreSQL)
1. Create a PostgreSQL database on Supabase (or locally).
2. Get the connection string (`DATABASE_URL`).

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
DATABASE_URL="your-postgresql-database-url"
JWT_SECRET="super-secret-jwt-key"
```
Run Prisma migrations and start the server:
```bash
npx prisma generate
npx prisma db push
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL="http://localhost:5000/api"
```
Start the frontend development server:
```bash
npm run dev
```

## 🌐 API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT
- `GET /api/auth/me` - Get current user profile (Protected)

### Projects
- `GET /api/projects` - Get all projects (Protected)
- `GET /api/projects/:id` - Get specific project (Protected)
- `POST /api/projects` - Create a project (Admin Only)

### Tasks
- `GET /api/tasks` - Get tasks (Admin sees all, Member sees assigned)
- `POST /api/tasks` - Create a task (Admin Only)
- `PUT /api/tasks/:id/status` - Update task status (Assigned Member or Admin)
- `PUT /api/tasks/:id/assign` - Assign task to member (Admin Only)
- `DELETE /api/tasks/:id` - Delete a task (Admin Only)

## 🚢 Deployment Instructions

### Database (Supabase)
Ensure your `DATABASE_URL` is set to the Supabase connection string. Run `npx prisma db push` from your local machine to set up the schema.

### Backend (Railway)
1. Connect your GitHub repository to Railway.
2. Select the `server` folder as the root directory (or use a monorepo setup).
3. Add Environment Variables: `DATABASE_URL` and `JWT_SECRET`.
4. Railway will automatically detect Node.js and run `npm start` (which maps to `node src/index.js`).

### Frontend (Vercel)
1. Import your GitHub repository to Vercel.
2. Set the Root Directory to `client`.
3. Vercel automatically detects Vite.
4. Add Environment Variable: `VITE_API_URL` pointing to your Railway backend URL.

## 🔐 Demo Credentials

Use these credentials to test the application:

**Admin Account**
- Email: `admin@gmail.com`
- Password: `admin123`

**Member Account**
- Email: `member@gmail.com`
- Password: `member123`
