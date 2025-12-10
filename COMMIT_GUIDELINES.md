# Commit Guidelines for AURA

This document describes the commit conventions used in the AURA project.

## Commit Format

```
<type>: <brief description>

[optional commit body with more details]

[optional footer]
```

## Commit Types

### feat - New Feature
When you add a new feature or functionality.

**Examples:**
```
feat: add user authentication middleware
feat: implement user profile update endpoint
feat: create login page with form validation
```

### fix - Bug Fix
When you fix an error or bug.

**Examples:**
```
fix: handle validation errors in user registration
fix: prevent duplicate email registration
fix: correct token expiration time
```

### docs - Documentation
When you modify or add documentation.

**Examples:**
```
docs: update API documentation for auth endpoints
docs: add installation instructions to README
docs: create architecture diagram
```

### refactor - Refactoring
When you change code without altering functionality.

**Examples:**
```
refactor: extract database connection to separate module
refactor: simplify auth service logic
refactor: reorganize component structure
```

### style - Code Style
Changes that don't affect code meaning (formatting, spaces, etc.).

**Examples:**
```
style: format code with prettier
style: add consistent spacing
style: organize imports
```

### test - Tests
When you add or modify tests.

**Examples:**
```
test: add unit tests for auth service
test: create integration tests for user endpoints
test: add e2e tests for login flow
```

### chore - Maintenance Tasks
Changes to build process, dependencies, etc.

**Examples:**
```
chore: update dependencies
chore: configure TypeScript compiler options
chore: add git ignore rules
```

### perf - Performance Improvements
When you optimize performance.

**Examples:**
```
perf: add database indexes for email lookup
perf: implement query caching
perf: optimize bundle size
```

## AURA Project Commit Examples

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

## Commits with Extended Body

When a change requires additional explanation:

```
feat: implement refresh token mechanism

- Add refresh token generation on login
- Store refresh tokens in database
- Create endpoint to refresh access token
- Add middleware to verify refresh tokens

This allows users to stay logged in for longer periods
without compromising security.
```

## Commits with Breaking Changes

When you make changes that break compatibility:

```
feat: update user profile endpoint structure

BREAKING CHANGE: The PUT /api/users/profile endpoint
now requires all fields to be provided, not just the
ones being updated.

Migration guide:
- Send all user fields in the request body
- Use partial updates with PATCH instead
```

## Best Practices

### ✅ DO

- Use present tense imperative ("add" not "added" or "adds")
- Be specific and descriptive
- Separate commits by functionality
- Reference issues when applicable (#123)
- Keep commits atomic (one thing at a time)

```
feat: add email validation to registration form
fix: correct password hashing salt rounds
docs: update README with database setup steps
```

### ❌ DON'T

- Generic commits
- Mix multiple unrelated changes
- Overly large commits

```
❌ update stuff
❌ fix bugs
❌ changes
❌ feat: add login, register, dashboard, and API
```

## Git Workflow Suggestion

### New Feature Development

```bash
# Create feature branch
git checkout -b feat/user-authentication

# Make changes and atomic commits
git add src/middleware/auth.middleware.ts
git commit -m "feat: create JWT verification middleware"

git add src/controllers/auth.controller.ts
git commit -m "feat: add login and register controllers"

git add src/routes/auth.routes.ts
git commit -m "feat: configure auth routes"

# Merge to main
git checkout main
git merge feat/user-authentication
```

### Bug Fix

```bash
# Create fix branch
git checkout -b fix/email-validation

# Fix and commit
git add src/validation/auth.validation.ts
git commit -m "fix: improve email validation regex"

# Test and merge
git checkout main
git merge fix/email-validation
```

## Integration with Issues

Reference issues in commits:

```
feat: add password reset functionality (#42)
fix: resolve token expiration bug (closes #38)
docs: update API docs for new endpoints (ref #45)
```

## Semantic Versioning

Commit types map to versions:

- `feat:` → MINOR version (1.0.0 → 1.1.0)
- `fix:` → PATCH version (1.0.0 → 1.0.1)
- `BREAKING CHANGE:` → MAJOR version (1.0.0 → 2.0.0)

## Recommended Tools

### Commitlint

Validates commits follow the convention:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### Husky

Git hooks to validate commits:

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### Commitizen

Interactive CLI to create commits:

```bash
npm install --save-dev commitizen cz-conventional-changelog
```

Usage:
```bash
git add .
npm run commit  # Instead of git commit
```

## Quick Summary

| Type | Use | Emoji (optional) |
|------|-----|------------------|
| feat | New feature | ✨ |
| fix | Bug fix | 🐛 |
| docs | Documentation | 📝 |
| refactor | Refactoring | ♻️ |
| style | Code formatting | 💄 |
| test | Tests | ✅ |
| chore | Maintenance | 🔧 |
| perf | Performance | ⚡ |

## Complete Project Example

Typical commit history for AURA:

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

**References:**
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)
- [Semantic Versioning](https://semver.org/)
