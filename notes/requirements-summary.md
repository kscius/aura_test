# Requirements Summary

## Functional Requirements

### API Endpoints (Required)

1. **POST /api/auth/register**
   - Register new user
   - Validate email format, required fields
   - Hash password before storing
   - Return user info (without password) and JWT token

2. **POST /api/auth/login**
   - Authenticate user with email and password
   - Return JWT token and user info

3. **GET /api/users/profile**
   - Get current authenticated user's profile
   - Requires authentication (JWT)

4. **PUT /api/users/profile**
   - Update current user's profile (firstName, lastName, email)
   - Requires authentication (JWT)

5. **GET /api/users**
   - List all registered users
   - Requires authentication (JWT)
   - Return id, email, firstName, lastName, createdAt

### Frontend Pages (Required)

1. **Registration Page**
   - Form validation
   - Handle backend errors (duplicate email, etc.)
   - Redirect to login on success

2. **Login Page**
   - Email and password inputs
   - Error handling for invalid credentials
   - Loading states
   - Store JWT and redirect to dashboard

3. **Dashboard**
   - Display current user profile
   - List all users
   - Edit profile form
   - Loading and error states

## User Model

```typescript
{
  id: number (primary key)
  email: string (unique)
  firstName: string
  lastName: string
  passwordHash: string (not exposed in responses)
  createdAt: Date
  updatedAt: Date
}
```

## Tech Stack Constraints

### Backend
- Node.js + Express
- TypeScript (recommended)
- PostgreSQL
- TypeORM
- JWT for authentication
- bcrypt for password hashing
- Modular structure
- Database migrations
- Validation library (zod, yup, or express-validator)

### Frontend
- React with TypeScript
- React Router for navigation
- State management (Context API or similar)
- Loading and error handling
- Clean, functional UI

## Documentation Requirements

### 1. Main README.md
- Project name and description
- Technologies with versions
- Installation instructions
- Environment setup
- Usage instructions
- API documentation
- Technical decisions
- Future improvements

### 2. Backend README.md
- Backend-specific setup
- Database configuration
- Migration instructions
- Development commands

### 3. Frontend README.md
- Frontend-specific setup
- Environment variables
- Development commands
- Build instructions

### 4. Code Quality
- Descriptive commit messages
- Code comments for complex logic
- TODOs for future improvements
- Clean, readable code

## Evaluation Criteria

### Technical (60%)
- Architecture: Modular structure, separation of concerns
- Code quality: Readability, maintainability, best practices
- Security: Proper JWT implementation, password hashing
- Database: Schema design, TypeORM usage
- API Design: RESTful principles
- Validations: Error handling, data validation

### Communication (40%)
- Complete README.md with clear instructions
- API documentation (endpoints, params, responses)
- Descriptive commit messages
- Code comments where necessary
- Documented technical decisions

## Security Considerations
- Password hashing with bcrypt (min 10 rounds)
- JWT stored securely (Bearer token in Authorization header)
- Input validation on all endpoints
- SQL injection prevention (TypeORM parameterized queries)
- Error messages that don't expose sensitive info
- Environment variables for secrets

## Deliverables
- Public GitHub repository
- Working code with all endpoints
- Complete documentation
- Optional: deployed version (Railway, Vercel, etc.)
- Time limit: 5 days

