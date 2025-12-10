# Docker Setup Guide for AURA

This guide explains how to run the entire AURA application (PostgreSQL + Backend + Frontend) using Docker.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- No other services running on ports 3000, 5173, or 5432

## Quick Start (One Command)

```bash
docker-compose up
```

That's it! This single command will:
1. ✅ Start PostgreSQL database (port 5432)
2. ✅ Start Backend API (port 3000)
3. ✅ Start Frontend (port 5173)
4. ✅ Create all necessary connections
5. ✅ Initialize the database schema automatically

## Access the Application

Once all services are running (wait ~30 seconds for initialization):

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Database**: localhost:5432 (user: postgres, password: postgres, database: aura_db)

## Commands

### Start All Services (Foreground)
```bash
docker-compose up
```

### Start All Services (Background/Detached)
```bash
docker-compose up -d
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Stop All Services
```bash
docker-compose down
```

### Stop and Remove All Data (Fresh Start)
```bash
docker-compose down -v
```

### Rebuild Containers (After Code Changes)
```bash
docker-compose up --build
```

### Check Service Status
```bash
docker-compose ps
```

## Development Workflow

### Making Code Changes

The Docker setup includes **hot-reload** for both backend and frontend:

1. **Backend Changes**: Edit files in `backend/src/` and the server will automatically restart
2. **Frontend Changes**: Edit files in `frontend/src/` and Vite will hot-reload immediately

No need to rebuild containers for code changes!

### Database Access

#### Using Docker CLI
```bash
# Access PostgreSQL console
docker exec -it aura_postgres psql -U postgres -d aura_db

# Common queries
SELECT * FROM users;
\dt  # List tables
\q   # Exit
```

#### Using Database Client
- **Host**: localhost
- **Port**: 5432
- **User**: postgres
- **Password**: postgres
- **Database**: aura_db

Recommended clients: pgAdmin, DBeaver, TablePlus

## Troubleshooting

### Port Already in Use

If you get "port already allocated" errors:

```bash
# Check what's using the port
netstat -ano | findstr :3000   # Windows
lsof -i :3000                  # Mac/Linux

# Use different ports (edit docker-compose.yml)
ports:
  - "3001:3000"  # Backend
  - "5174:5173"  # Frontend
```

### Services Not Starting

```bash
# Check logs for errors
docker-compose logs

# Restart services
docker-compose restart

# Fresh start
docker-compose down -v
docker-compose up --build
```

### Database Connection Issues

```bash
# Check if PostgreSQL is healthy
docker-compose ps

# Should show "healthy" status for postgres service
# If not, wait a few more seconds or check logs
docker-compose logs postgres
```

### Backend Not Connecting to Database

The backend waits for PostgreSQL to be healthy before starting. If it still fails:

```bash
# Restart just the backend
docker-compose restart backend

# Check backend logs
docker-compose logs backend
```

### Frontend Can't Reach Backend

Make sure you're accessing the frontend at `http://localhost:5173` (not the Docker internal network).

### Clear Everything and Start Fresh

```bash
# Remove all containers, networks, and volumes
docker-compose down -v

# Remove Docker images
docker-compose down --rmi all

# Start from scratch
docker-compose up --build
```

## Docker Compose Services

### PostgreSQL (`postgres`)
- **Image**: postgres:15-alpine
- **Port**: 5432
- **Volume**: `postgres_data` (persists data between restarts)
- **Health Check**: Automatically checks if database is ready

### Backend (`backend`)
- **Build**: Built from `backend/Dockerfile`
- **Port**: 3000
- **Depends On**: postgres (waits for health check)
- **Hot Reload**: Changes in `backend/src/` auto-reload

### Frontend (`frontend`)
- **Build**: Built from `frontend/Dockerfile`
- **Port**: 5173
- **Depends On**: backend
- **Hot Reload**: Vite auto-reloads on changes

## Environment Variables

All environment variables are configured in `docker-compose.yml`. No need to create `.env` files manually!

To change values:
1. Edit `docker-compose.yml`
2. Restart services: `docker-compose up`

## Production Deployment

For production, use a different Docker Compose file:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  postgres:
    # Same as development
    
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    command: npm start  # Production mode
    
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    # Serve built static files with nginx
```

Run with:
```bash
docker-compose -f docker-compose.prod.yml up
```

## Useful Commands Reference

```bash
# Start
docker-compose up              # Foreground
docker-compose up -d           # Background

# Stop
docker-compose stop            # Stop services
docker-compose down            # Stop and remove containers
docker-compose down -v         # Stop, remove containers and volumes

# Rebuild
docker-compose build           # Rebuild images
docker-compose up --build      # Rebuild and start

# Logs
docker-compose logs            # All logs
docker-compose logs -f         # Follow logs
docker-compose logs backend    # Specific service

# Execute commands
docker-compose exec backend sh           # Shell into backend
docker-compose exec postgres psql -U postgres -d aura_db  # Database console

# Status
docker-compose ps              # Service status
docker-compose top             # Running processes
```

## Next Steps

1. Start the application: `docker-compose up`
2. Open http://localhost:5173 in your browser
3. Register a new account
4. Test all features (login, profile, user list)
5. Make changes to the code and see hot-reload in action!

---

**Need Help?**
- Check the logs: `docker-compose logs -f`
- Ensure Docker Desktop is running
- Verify no other services are using ports 3000, 5173, or 5432

