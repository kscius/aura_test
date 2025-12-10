# 🚀 Quick Start Guide - AURA

Quick guide to get AURA up and running in less than 5 minutes.

## Prerequisites Installed

- ✅ Node.js v18+
- ✅ PostgreSQL v14+
- ✅ npm v9+

## Setup in 4 Steps

### 1️⃣ Configure Database (1 min)

```bash
# Open PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE aura_db;

# Exit
\q
```

### 2️⃣ Configure Backend (2 min)

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your PostgreSQL credentials
# Change DB_PASSWORD to your PostgreSQL password
```

Minimum `.env` content:
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=YOUR_PASSWORD_HERE
DB_NAME=aura_db
JWT_SECRET=super_secret_key_123
JWT_EXPIRES_IN=7d
```

```bash
# Start backend server
npm run dev
```

✅ Backend running at `http://localhost:3000`

### 3️⃣ Configure Frontend (1 min)

**In a new terminal:**

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# The .env should contain:
# VITE_API_BASE_URL=http://localhost:3000
```

```bash
# Start frontend server
npm run dev
```

✅ Frontend running at `http://localhost:5173`

### 4️⃣ Test the Application (1 min)

1. Open browser at `http://localhost:5173`
2. Click on "Register here"
3. Create an account with:
   - Email: `test@example.com`
   - First Name: `Test`
   - Last Name: `User`
   - Password: `password123`
4. You'll be automatically redirected to the Dashboard
5. Done! 🎉

## Verify Everything Works

### Backend Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "AURA API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Registration via API

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "firstName": "API",
    "lastName": "User",
    "password": "test123"
  }'
```

### Test Login via API

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "password": "test123"
  }'
```

## Folder Structure

```
aurora_test/
├── backend/          → API (Port 3000)
├── frontend/         → Web App (Port 5173)
├── notes/            → Requirements documentation
├── README.md         → Main documentation
├── ARCHITECTURE.md   → System architecture
└── QUICKSTART.md     → This guide
```

## Useful Commands

### Backend

```bash
cd backend

npm run dev          # Development with hot reload
npm run build        # Compile TypeScript
npm start            # Run compiled version
```

### Frontend

```bash
cd frontend

npm run dev          # Development with hot reload
npm run build        # Production build
npm run preview      # Preview build
```

## Quick Troubleshooting

### ❌ Error: "Database connection failed"

**Problem:** PostgreSQL not running or incorrect credentials.

**Solution:**
```bash
# Windows
net start postgresql-x64-14

# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

Verify credentials in `backend/.env`

### ❌ Error: "Port 3000 already in use"

**Problem:** Port is already occupied.

**Solution:**
Change `PORT` in `backend/.env` to another port (e.g., 3001)

### ❌ Error: "Network Error" in frontend

**Problem:** Backend not running or incorrect URL.

**Solution:**
1. Verify backend is running
2. Check `VITE_API_BASE_URL` in `frontend/.env`

### ❌ Frontend shows blank page

**Problem:** JavaScript error in console.

**Solution:**
1. Open DevTools (F12)
2. Check error messages in Console
3. Verify all dependencies are installed

## Next Steps

1. ✅ Create your first user account
2. ✅ Explore the Dashboard
3. ✅ Edit your profile
4. ✅ View the users list
5. 📖 Read `README.md` for complete documentation
6. 🏗️ Read `ARCHITECTURE.md` to understand the architecture
7. 🔌 Test all API endpoints

## Additional Resources

- **Complete documentation:** `README.md`
- **Architecture:** `ARCHITECTURE.md`
- **Backend README:** `backend/README.md`
- **Frontend README:** `frontend/README.md`
- **Project requirements:** `Project.md`

## Support

If you encounter any problems:

1. Review this troubleshooting guide
2. Check component-specific READMEs
3. Verify logs in the terminal
4. Open browser DevTools (F12)

---

**Enjoy building with AURA!** 🚀
