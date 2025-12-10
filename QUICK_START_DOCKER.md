# 🚀 Quick Start with Docker

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running

## Start Everything (One Command!)

```bash
docker-compose up
```

**That's it!** Wait ~30 seconds and then:

## Access the Application

- **Frontend (App)**: http://localhost:5173
- **Backend (API)**: http://localhost:3000
- **Database**: localhost:5432

## What's Running?

✅ **PostgreSQL Database** (port 5432)
- User: `postgres`
- Password: `postgres`
- Database: `aura_db`

✅ **Backend API** (port 3000)
- REST API with JWT authentication
- Auto-connects to PostgreSQL
- Hot-reload enabled

✅ **Frontend** (port 5173)
- React + TypeScript + Vite
- Hot-reload enabled
- Connected to backend

## Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Register" and create a new account
3. Login with your credentials
4. View your profile and list of all users
5. Update your profile

## Common Commands

```bash
# Start (in background)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Fresh start (delete all data)
docker-compose down -v
docker-compose up --build
```

## Troubleshooting

### Port already in use?
```bash
# Stop all containers
docker-compose down

# Check what's using the port
netstat -ano | findstr :5173  # Windows
lsof -i :5173                 # Mac/Linux
```

### Need to rebuild?
```bash
docker-compose down
docker-compose up --build
```

## Development

All code changes will hot-reload automatically:
- Edit files in `backend/src/` → Backend restarts
- Edit files in `frontend/src/` → Frontend reloads instantly

No need to rebuild Docker containers for code changes!

---

For detailed Docker documentation, see [DOCKER.md](./DOCKER.md)

