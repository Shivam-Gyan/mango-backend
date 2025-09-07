

# 🥭 Mango – The Management App

A modern **full-stack management application** built to manage tasks, users, and analytics in a clean, interactive dashboard.

**Tech Stack:**

* 🧠 **Frontend:** Next.js 14 (App Router) + TypeScript + TailwindCSS + ShadCN UI + Framer Motion
* 🔧 **Backend:** Node.js + Express + MongoDB + JWT Authentication
* 🔐 **Authentication:** Email-based login/signup with JWT tokens
* 📊 **Features:** Task Management, Dashboard Analytics, Product/Task Table, Interactive Modals

---

## 📁 Project Structure

```
.
├── backend/                  # Backend server code (Express/Node)
│   ├── controllers/          # Controllers for auth, tasks, etc.
│   ├── model/                # MongoDB models (User, Task)
│   ├── routes/               # Express routes
│   ├── middleware/           # Auth middleware (JWT verification)
│   └── server.js             # Entry point
├── frontend/                 # Frontend Next.js App
│   ├── public/               # Static files/images
│   ├── src/
│   │   ├── app/              # App router pages (dashboard, auth)
│   │   ├── components/       # UI components (cards, table, modals, sidebar)
│   │   ├── context/          # React context (auth/profile)
│   │   ├── services/         # API service functions (auth, task)
│   │   ├── types/            # TypeScript types (Task, User, Product)
│   │   └── utils/            # Utility functions/helpers
│   ├── .env                  # Environment variables
│   ├── next.config.js        # Next.js configuration
│   └── README.md             # Frontend readme
├── README.md                 # Project root readme
```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mango-management-app.git
cd mango-management-app
```

---

### 2. Environment Variables

#### Frontend (`frontend/.env`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

#### Backend (`backend/.env`)

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

---

### 3. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

### 4. Run the App

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm run dev
```

> Frontend runs on [http://localhost:3000](http://localhost:3000)
> Backend runs on [http://localhost:8000](http://localhost:8000)

---

## ✨ Features

* 🔐 **Authentication:** Signup/Login with JWT tokens
* 📝 **Task Management:** Create, Edit, Delete tasks with completion toggle
* 🟢 **Task Filtering:** Filter tasks by All, Pending, or Done
* 🔍 **Search Tasks:** Search tasks by title
* 📊 **Dashboard Analytics:** Total Revenue, Average Ratings, Stock, and Categories (for Products)
* 💨 **Animations:** Smooth transitions using Framer Motion
* 🧹 **Interactive UI:** Modern card layout using ShadCN + TailwindCSS
* 🖥️ **Profile Context:** Centralized state for user & tasks

---

## 🛠️ How It Works

1. **Login/Signup:** User registers with email & password → JWT token is stored in local storage.
2. **Fetch Profile:** Frontend fetches user profile & tasks from backend using JWT.
3. **Task Dashboard:** Users can view all tasks in cards, toggle completion, filter, search, and edit tasks inline.
4. **Backend:** Express + MongoDB handles CRUD operations for tasks and profile.

---