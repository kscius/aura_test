# Arquitectura del Proyecto AURA

## Visión General

AURA es una aplicación full-stack construida con una arquitectura cliente-servidor, donde el backend expone una API REST que el frontend consume para proporcionar una interfaz de usuario moderna e intuitiva.

## Diagrama de Arquitectura

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

## Flujo de Datos

### 1. Registro de Usuario

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

### 3. Operaciones Protegidas

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

## Patrones de Diseño Utilizados

### Backend

1. **Layered Architecture (Arquitectura en Capas)**
   - **Controllers**: Manejan HTTP requests/responses
   - **Services**: Contienen lógica de negocio
   - **Repositories**: Acceso a datos (TypeORM)
   - **Middleware**: Procesamiento de requests
   - **Validation**: Validación de datos

2. **Dependency Injection**
   - TypeORM repositories inyectados en services
   - Services inyectados en controllers

3. **Middleware Pattern**
   - Auth middleware para protección de rutas
   - Error middleware para manejo centralizado de errores

4. **Repository Pattern**
   - TypeORM abstrae el acceso a la base de datos
   - Queries reutilizables y type-safe

### Frontend

1. **Component-Based Architecture**
   - Componentes reutilizables
   - Separación de concerns (presentación vs lógica)

2. **Context Pattern**
   - AuthContext para estado global de autenticación
   - Evita prop drilling

3. **Higher-Order Component (HOC)**
   - ProtectedRoute para proteger rutas

4. **Service Layer**
   - API client centralizado
   - Separación de lógica de red

## Principios SOLID Aplicados

### S - Single Responsibility Principle
- Cada módulo tiene una única responsabilidad
- Controllers solo manejan HTTP
- Services solo tienen lógica de negocio
- Repositories solo acceden a datos

### O - Open/Closed Principle
- Middleware extensible sin modificar código existente
- Nuevos endpoints se agregan sin cambiar los existentes

### L - Liskov Substitution Principle
- Interfaces consistentes en todos los servicios
- Componentes React intercambiables

### I - Interface Segregation Principle
- TypeScript interfaces específicas para cada caso
- No hay interfaces "gordas" con métodos innecesarios

### D - Dependency Inversion Principle
- Dependencia de abstracciones (interfaces) no implementaciones
- TypeORM DataSource inyectable

## Seguridad

### Capas de Seguridad

1. **Autenticación**
   - JWT tokens firmados y con expiración
   - Tokens verificados en cada petición protegida

2. **Autorización**
   - Middleware verifica permisos antes de acceder a recursos
   - Usuarios solo pueden editar su propio perfil

3. **Validación**
   - Validación en cliente (UX)
   - Validación en servidor (Seguridad) con Zod
   - Never trust client input

4. **Encriptación**
   - Contraseñas hasheadas con bcrypt (10 rounds)
   - Nunca se almacenan en texto plano

5. **Prevención de Vulnerabilidades**
   - **SQL Injection**: TypeORM usa consultas parametrizadas
   - **XSS**: React escapa valores por defecto
   - **CSRF**: JWT en header (no cookies)
   - **Information Disclosure**: Mensajes de error genéricos

## Escalabilidad

### Backend

**Horizontal Scaling:**
- Stateless API (JWT en lugar de sesiones)
- Fácil agregar más instancias del servidor
- Load balancer puede distribuir tráfico

**Vertical Scaling:**
- PostgreSQL connection pooling
- Índices en columnas frecuentemente consultadas

**Future Improvements:**
- Redis para caching
- Queue system para operaciones asíncronas
- Microservices para funcionalidades específicas

### Frontend

**Performance:**
- Code splitting con React Router
- Lazy loading de componentes
- Vite optimiza bundle size

**Caching:**
- Service Workers (PWA)
- API response caching

## Testing Strategy

### Backend (Recomendado)

1. **Unit Tests**
   - Services aislados
   - Utilities (JWT, hash)
   - Validación schemas

2. **Integration Tests**
   - Endpoints completos
   - Database interactions
   - Middleware behavior

3. **Coverage Target**
   - Mínimo 80% coverage
   - 100% en servicios críticos (auth)

### Frontend (Recomendado)

1. **Component Tests**
   - Render correctamente
   - Event handlers
   - Conditional rendering

2. **Integration Tests**
   - Flujos completos (login, registro)
   - Protected routes
   - API integration

3. **E2E Tests**
   - User journeys completos
   - Cross-browser testing

## Monitoring y Observabilidad

### Logs (Futuro)

- Winston/Pino para logging estructurado
- Niveles: error, warn, info, debug
- Log rotation y storage

### Metrics (Futuro)

- Request duration
- Error rates
- Active users
- Database query performance

### Error Tracking (Futuro)

- Sentry para frontend y backend
- Stack traces completos
- User context en errores

## Deployment Strategy

### Desarrollo

- Backend: `npm run dev` (ts-node-dev)
- Frontend: `npm run dev` (Vite)
- Base de datos: PostgreSQL local

### Staging

- Backend: Docker container en Railway/Heroku
- Frontend: Preview deployment en Vercel
- Base de datos: Managed PostgreSQL

### Producción

- Backend: Multiple instances con load balancer
- Frontend: CDN global (Vercel/Netlify)
- Base de datos: High-availability PostgreSQL
- CI/CD: GitHub Actions
- Rollback strategy documentada

## Conclusión

Esta arquitectura proporciona:

✅ **Separación de concerns** clara y mantenible
✅ **Escalabilidad** horizontal y vertical
✅ **Seguridad** en múltiples capas
✅ **Testabilidad** con dependencias inyectables
✅ **Type safety** con TypeScript end-to-end
✅ **Developer Experience** con hot reload y tipos

La arquitectura está diseñada para evolucionar y escalar con las necesidades del negocio.

