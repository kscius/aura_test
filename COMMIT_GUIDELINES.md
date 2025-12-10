# Guía de Commits para AURA

Este documento describe la convención de commits utilizada en el proyecto AURA.

## Formato de Commits

```
<tipo>: <descripción breve>

[cuerpo opcional del commit con más detalles]

[footer opcional]
```

## Tipos de Commits

### feat - Nueva Funcionalidad
Cuando agregas una nueva característica o funcionalidad.

**Ejemplos:**
```
feat: add user authentication middleware
feat: implement user profile update endpoint
feat: create login page with form validation
```

### fix - Corrección de Bugs
Cuando corriges un error o bug.

**Ejemplos:**
```
fix: handle validation errors in user registration
fix: prevent duplicate email registration
fix: correct token expiration time
```

### docs - Documentación
Cuando modificas o agregas documentación.

**Ejemplos:**
```
docs: update API documentation for auth endpoints
docs: add installation instructions to README
docs: create architecture diagram
```

### refactor - Refactorización
Cuando cambias código sin alterar funcionalidad.

**Ejemplos:**
```
refactor: extract database connection to separate module
refactor: simplify auth service logic
refactor: reorganize component structure
```

### style - Estilos de Código
Cambios que no afectan el significado del código (formato, espacios, etc.).

**Ejemplos:**
```
style: format code with prettier
style: add consistent spacing
style: organize imports
```

### test - Tests
Cuando agregas o modificas tests.

**Ejemplos:**
```
test: add unit tests for auth service
test: create integration tests for user endpoints
test: add e2e tests for login flow
```

### chore - Tareas de Mantenimiento
Cambios en el proceso de build, dependencias, etc.

**Ejemplos:**
```
chore: update dependencies
chore: configure TypeScript compiler options
chore: add git ignore rules
```

### perf - Mejoras de Performance
Cuando optimizas el rendimiento.

**Ejemplos:**
```
perf: add database indexes for email lookup
perf: implement query caching
perf: optimize bundle size
```

## Ejemplos de Commits del Proyecto AURA

### Backend

```
feat: implement JWT authentication system
feat: add user registration endpoint with validation
feat: create protected routes with auth middleware
fix: handle unique constraint violation on email
refactor: extract password hashing to utility module
docs: document all API endpoints with examples
```

### Frontend

```
feat: create login page with form validation
feat: implement AuthContext for global state
feat: add protected route component
feat: create dashboard with user profile and list
fix: handle API errors in login form
refactor: centralize API calls in client module
style: apply AURA purple gradient theme
```

### Database

```
feat: create User entity with TypeORM decorators
feat: configure PostgreSQL connection with TypeORM
chore: add migration support configuration
```

### Documentation

```
docs: create comprehensive README with setup instructions
docs: add API documentation with request/response examples
docs: document technical decisions and architecture
docs: create quick start guide
```

### Configuration

```
chore: configure TypeScript for backend
chore: setup Vite for frontend development
chore: add environment variable templates
chore: create automated setup scripts
```

## Commits con Cuerpo Extendido

Cuando el cambio requiere explicación adicional:

```
feat: implement refresh token mechanism

- Add refresh token generation on login
- Store refresh tokens in database
- Create endpoint to refresh access token
- Add middleware to verify refresh tokens

This allows users to stay logged in for longer periods
without compromising security.
```

## Commits con Breaking Changes

Cuando haces cambios que rompen compatibilidad:

```
feat: update user profile endpoint structure

BREAKING CHANGE: The PUT /api/users/profile endpoint
now requires all fields to be provided, not just the
ones being updated.

Migration guide:
- Send all user fields in the request body
- Use partial updates with PATCH instead
```

## Buenas Prácticas

### ✅ DO

- Usar tiempo presente imperativo ("add" no "added" o "adds")
- Ser específico y descriptivo
- Separar commits por funcionalidad
- Referenciar issues cuando aplique (#123)
- Mantener commits atómicos (una cosa a la vez)

```
feat: add email validation to registration form
fix: correct password hashing salt rounds
docs: update README with database setup steps
```

### ❌ DON'T

- Commits genéricos
- Mezclar múltiples cambios no relacionados
- Commits demasiado grandes

```
❌ update stuff
❌ fix bugs
❌ changes
❌ feat: add login, register, dashboard, and API
```

## Git Workflow Sugerido

### Desarrollo de Nueva Funcionalidad

```bash
# Crear feature branch
git checkout -b feat/user-authentication

# Hacer cambios y commits atómicos
git add src/middleware/auth.middleware.ts
git commit -m "feat: create JWT verification middleware"

git add src/controllers/auth.controller.ts
git commit -m "feat: add login and register controllers"

git add src/routes/auth.routes.ts
git commit -m "feat: configure auth routes"

# Merge a main
git checkout main
git merge feat/user-authentication
```

### Corrección de Bug

```bash
# Crear fix branch
git checkout -b fix/email-validation

# Corregir y commit
git add src/validation/auth.validation.ts
git commit -m "fix: improve email validation regex"

# Test y merge
git checkout main
git merge fix/email-validation
```

## Integración con Issues

Referenciar issues en commits:

```
feat: add password reset functionality (#42)
fix: resolve token expiration bug (closes #38)
docs: update API docs for new endpoints (ref #45)
```

## Semantic Versioning

Los tipos de commit se mapean a versiones:

- `feat:` → MINOR version (1.0.0 → 1.1.0)
- `fix:` → PATCH version (1.0.0 → 1.0.1)
- `BREAKING CHANGE:` → MAJOR version (1.0.0 → 2.0.0)

## Herramientas Recomendadas

### Commitlint

Valida que los commits sigan la convención:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### Husky

Git hooks para validar commits:

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### Commitizen

CLI interactivo para crear commits:

```bash
npm install --save-dev commitizen cz-conventional-changelog
```

Uso:
```bash
git add .
npm run commit  # En lugar de git commit
```

## Resumen Rápido

| Tipo | Uso | Emoji (opcional) |
|------|-----|------------------|
| feat | Nueva funcionalidad | ✨ |
| fix | Corrección de bug | 🐛 |
| docs | Documentación | 📝 |
| refactor | Refactorización | ♻️ |
| style | Formato de código | 💄 |
| test | Tests | ✅ |
| chore | Mantenimiento | 🔧 |
| perf | Performance | ⚡ |

## Ejemplo Completo del Proyecto

Historial de commits típico para AURA:

```
feat: ✨ initialize project structure
chore: 🔧 configure TypeScript for backend and frontend
feat: ✨ setup TypeORM with PostgreSQL
feat: ✨ create User entity with validations
feat: ✨ implement password hashing utility
feat: ✨ implement JWT token generation and verification
feat: ✨ create auth middleware for protected routes
feat: ✨ add user registration endpoint
feat: ✨ add user login endpoint
feat: ✨ add get profile endpoint
feat: ✨ add update profile endpoint
feat: ✨ add list users endpoint
feat: ✨ create React app with Vite
feat: ✨ implement AuthContext for state management
feat: ✨ create API client with error handling
feat: ✨ build login page with validation
feat: ✨ build registration page with validation
feat: ✨ build dashboard with profile and users list
feat: ✨ implement protected routes
style: 💄 apply AURA purple gradient theme
docs: 📝 create comprehensive README
docs: 📝 document all API endpoints
docs: 📝 add backend README
docs: 📝 add frontend README
docs: 📝 create architecture documentation
docs: 📝 create quick start guide
chore: 🔧 create automated setup scripts
docs: 📝 add commit guidelines
```

---

**Referencias:**
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)
- [Semantic Versioning](https://semver.org/)

