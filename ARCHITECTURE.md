# AURA Project Architecture

## Overview

AURA is a full-stack application built with a client-server architecture, where the backend exposes a REST API that the frontend consumes to provide a modern and intuitive user interface.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React App (Vite)                                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Pages      │  │  Components  │  │   Context   │ │ │
│  │  │  - Login     │  │  - Protected │  │  - Auth     │ │ │
│  │  │  - Register  │  │    Route     │  │             │ │ │
│  │  │  - Dashboard │  │              │  │             │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │         API Client (Fetch)                       │ │ │
│  │  │  - JWT Token Management                          │ │ │
│  │  │  - Error Handling                                │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              │ (JSON + JWT)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Express Server                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │  Middleware  │  │   Routes     │  │ Controllers │ │ │
│  │  │  - CORS      │  │  - Auth      │  │  - Auth     │ │ │
│  │  │  - JSON      │  │  - Users     │  │  - User     │ │ │
│  │  │  - Auth      │  │              │  │             │ │ │
│  │  │  - Error     │  │              │  │             │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Services   │  │  Validation  │  │    Utils    │ │ │
│  │  │  - Auth      │  │  - Zod       │  │  - JWT      │ │ │
│  │  │  - User      │  │              │  │  - Hash     │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │         TypeORM (Data Access Layer)              │ │ │
│  │  │  - Entities                                      │ │ │
│  │  │  - Repositories                                  │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ SQL
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      PostgreSQL                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Database: aura_db                                     │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Table: users                                    │ │ │
│  │  │  - id (PK)                                       │ │ │
│  │  │  - email (UNIQUE)                                │ │ │
│  │  │  - firstName                                     │ │ │
│  │  │  - lastName                                      │ │ │
│  │  │  - passwordHash                                  │ │ │
│  │  │  - createdAt                                     │ │ │
│  │  │  - updatedAt                                     │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Registration

```
User Input (Frontend)
    │
    ├─> Validation (Client-side)
    │
    ├─> POST /api/auth/register
    │
    ├─> Controller (auth.controller.ts)
    │       │
    │       ├─> Validation (Zod Schema)
    │       │
    │       ├─> Service (auth.service.ts)
    │       │       │
    │       │       ├─> Check if email exists (Repository)
    │       │       │
    │       │       ├─> Hash password (bcrypt)
    │       │       │
    │       │       ├─> Create user (Repository)
    │       │       │
    │       │       └─> Generate JWT token
    │       │
    │       └─> Response (token + user data)
    │
    └─> Frontend receives token
            │
            ├─> Save token in localStorage
            │
            ├─> Update AuthContext
            │
            └─> Redirect to /dashboard
```

### 2. Login

```
User Input (Frontend)
    │
    ├─> Validation (Client-side)
    │
    ├─> POST /api/auth/login
    │
    ├─> Controller (auth.controller.ts)
    │       │
    │       ├─> Validation (Zod Schema)
    │       │
    │       ├─> Service (auth.service.ts)
    │       │       │
    │       │       ├─> Find user by email (Repository)
    │       │       │
    │       │       ├─> Compare password (bcrypt)
    │       │       │
    │       │       └─> Generate JWT token
    │       │
    │       └─> Response (token + user data)
    │
    └─> Frontend receives token
            │
            ├─> Save token in localStorage
            │
            ├─> Update AuthContext
            │
            └─> Redirect to /dashboard
```

### 3. Protected Operations

```
User Action (Frontend)
    │
    ├─> GET /api/users/profile
    │   (with Authorization: Bearer <token>)
    │
    ├─> Auth Middleware
    │       │
    │       ├─> Extract token from header
    │       │
    │       ├─> Verify token (JWT)
    │       │
    │       ├─> Attach user to request
    │       │
    │       └─> Next()
    │
    ├─> Controller (user.controller.ts)
    │       │
    │       ├─> Service (user.service.ts)
    │       │       │
    │       │       └─> Get user by ID (Repository)
    │       │
    │       └─> Response (user data)
    │
    └─> Frontend receives and displays data
```

## Design Patterns Used

### Backend

1. **Layered Architecture**
   - **Controllers**: Handle HTTP requests/responses
   - **Services**: Contain business logic
   - **Repositories**: Data access (TypeORM)
   - **Middleware**: Request processing
   - **Validation**: Data validation

2. **Dependency Injection**
   - TypeORM repositories injected into services
   - Services injected into controllers

3. **Middleware Pattern**
   - Auth middleware for route protection
   - Error middleware for centralized error handling

4. **Repository Pattern**
   - TypeORM abstracts database access
   - Reusable and type-safe queries

### Frontend

1. **Component-Based Architecture**
   - Reusable components
   - Separation of concerns (presentation vs logic)

2. **Context Pattern**
   - AuthContext for global authentication state
   - Avoids prop drilling

3. **Higher-Order Component (HOC)**
   - ProtectedRoute to protect routes

4. **Service Layer**
   - Centralized API client
   - Network logic separation

## SOLID Principles Applied

### S - Single Responsibility Principle
- Each module has a single responsibility
- Controllers only handle HTTP
- Services only have business logic
- Repositories only access data

### O - Open/Closed Principle
- Extensible middleware without modifying existing code
- New endpoints added without changing existing ones

### L - Liskov Substitution Principle
- Consistent interfaces across all services
- Interchangeable React components

### I - Interface Segregation Principle
- Specific TypeScript interfaces for each case
- No "fat" interfaces with unnecessary methods

### D - Dependency Inversion Principle
- Dependency on abstractions (interfaces) not implementations
- Injectable TypeORM DataSource

## Security

### Security Layers

1. **Authentication**
   - Signed JWT tokens with expiration
   - Tokens verified on each protected request

2. **Authorization**
   - Middleware verifies permissions before accessing resources
   - Users can only edit their own profile

3. **Validation**
   - Client-side validation (UX)
   - Server-side validation (Security) with Zod
   - Never trust client input

4. **Encryption**
   - Passwords hashed with bcrypt (10 rounds)
   - Never stored in plain text

5. **Vulnerability Prevention**
   - **SQL Injection**: TypeORM uses parameterized queries
   - **XSS**: React escapes values by default
   - **CSRF**: JWT in header (not cookies)
   - **Information Disclosure**: Generic error messages

## Scalability

### Backend

**Horizontal Scaling:**
- Stateless API (JWT instead of sessions)
- Easy to add more server instances
- Load balancer can distribute traffic

**Vertical Scaling:**
- PostgreSQL connection pooling
- Indexes on frequently queried columns

**Future Improvements:**
- Redis for caching
- Queue system for async operations
- Microservices for specific functionalities

### Frontend

**Performance:**
- Code splitting with React Router
- Lazy loading of components
- Vite optimizes bundle size

**Caching:**
- Service Workers (PWA)
- API response caching

## Testing Strategy

### Backend (Recommended)

1. **Unit Tests**
   - Isolated services
   - Utilities (JWT, hash)
   - Validation schemas

2. **Integration Tests**
   - Complete endpoints
   - Database interactions
   - Middleware behavior

3. **Coverage Target**
   - Minimum 80% coverage
   - 100% on critical services (auth)

### Frontend (Recommended)

1. **Component Tests**
   - Render correctly
   - Event handlers
   - Conditional rendering

2. **Integration Tests**
   - Complete flows (login, registration)
   - Protected routes
   - API integration

3. **E2E Tests**
   - Complete user journeys
   - Cross-browser testing

## Monitoring and Observability

### Logs (Future)

- Winston/Pino for structured logging
- Levels: error, warn, info, debug
- Log rotation and storage

### Metrics (Future)

- Request duration
- Error rates
- Active users
- Database query performance

### Error Tracking (Future)

- Sentry for frontend and backend
- Complete stack traces
- User context in errors

## Deployment Strategy

### Development

- Backend: `npm run dev` (ts-node-dev)
- Frontend: `npm run dev` (Vite)
- Database: Local PostgreSQL

### Staging

- Backend: Docker container on Railway/Heroku
- Frontend: Preview deployment on Vercel
- Database: Managed PostgreSQL

### Production

- Backend: Multiple instances with load balancer
- Frontend: Global CDN (Vercel/Netlify)
- Database: High-availability PostgreSQL
- CI/CD: GitHub Actions
- Documented rollback strategy

## Conclusion

This architecture provides:

✅ **Clear and maintainable separation of concerns**
✅ **Horizontal and vertical scalability**
✅ **Security at multiple layers**
✅ **Testability with injectable dependencies**
✅ **Type safety with end-to-end TypeScript**
✅ **Developer Experience with hot reload and types**

The architecture is designed to evolve and scale with business needs.
