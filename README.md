# AURA - Augmented Universal Research Assistant

A full-stack web application for user management with JWT authentication, built with Node.js, Express, TypeORM, PostgreSQL, React, and TypeScript.

## 📋 Description

AURA is a user management platform that enables registration, authentication, and profile administration. The project demonstrates full-stack development best practices with modular architecture, robust validations, properly implemented security, and a modern, intuitive user interface.

## 🚀 Technologies Used

### Backend
- **Node.js** v18+ - JavaScript runtime environment
- **Express** v4.18 - Minimalist web framework
- **TypeScript** v5.3 - Typed superset of JavaScript
- **TypeORM** v0.3.17 - ORM for TypeScript and JavaScript
- **PostgreSQL** - Relational database
- **JWT** (jsonwebtoken) v9.0 - Token-based authentication
- **bcryptjs** v2.4 - Password hashing
- **Zod** v3.22 - Schema validation

### Frontend
- **React** v19.2 - UI library
- **TypeScript** v5.9 - Static typing
- **Vite** v7.2 - Build tool and dev server
- **React Router** v6 - Client-side routing

## 📁 Project Structure

```
aura/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Controller logic
│   │   ├── entities/          # TypeORM models
│   │   ├── middleware/        # Custom middlewares
│   │   ├── routes/            # Route definitions
│   │   ├── services/          # Business logic
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Utilities (JWT, hash)
│   │   ├── validation/        # Zod validation schemas
│   │   ├── data-source.ts     # TypeORM configuration
│   │   └── index.ts           # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── api/               # HTTP client
│   │   ├── components/        # React components
│   │   ├── context/           # React contexts
│   │   ├── pages/             # Application pages
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx            # Main component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example
└── README.md
```

## ⚙️ Installation and Configuration

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **PostgreSQL** v14 or higher

### Installation Steps

#### 1. Clone the repository

```bash
git clone <repository-url>
cd aurora_test
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `env.example`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=aura_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

#### 3. Database Setup

Create the PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE aura_db;

# Exit
\q
```

TypeORM will automatically create tables when you run the server in development mode (thanks to `synchronize: true` in `data-source.ts`).

**Note:** In production, disable `synchronize` and use migrations.

#### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file based on `env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 🏃 Usage

### Run the Backend

From the `backend/` folder:

```bash
npm run dev
```

The server will be available at `http://localhost:3000`

### Run the Frontend

From the `frontend/` folder:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Test Credentials

There are no predefined credentials. Register using the registration page at `http://localhost:5173/register`

## 📚 API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. User Registration

**POST** `/api/auth/register`

Registers a new user in the system.

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Errors:**
- `400` - Email already in use or invalid data
- `500` - Server error

---

#### 2. User Login

**POST** `/api/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Errors:**
- `401` - Invalid credentials
- `500` - Server error

---

#### 3. Get Profile

**GET** `/api/users/profile`

Gets the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `401` - Invalid or missing token
- `404` - User not found
- `500` - Server error

---

#### 4. Update Profile

**PUT** `/api/users/profile`

Updates the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "firstName": "John Carlos",
  "lastName": "Doe Smith"
}
```

Note: All fields are optional, send only what you want to update.

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "email": "newemail@example.com",
    "firstName": "John Carlos",
    "lastName": "Doe Smith",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `400` - Email already in use or invalid data
- `401` - Invalid token
- `404` - User not found
- `500` - Server error

---

#### 5. List Users

**GET** `/api/users`

Gets the list of all registered users.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "email": "user1@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "email": "user2@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "createdAt": "2024-01-02T00:00:00.000Z"
    }
  ]
}
```

**Errors:**
- `401` - Invalid or missing token
- `500` - Server error

---

### Error Format

All endpoints return errors in the following format:

```json
{
  "error": "ErrorType",
  "message": "Error description",
  "details": {}
}
```

## 🎯 Technical Decisions

### Architecture

**Backend - Layered Architecture:**

1. **Controllers** - Handle HTTP requests and responses
2. **Services** - Contain business logic
3. **Entities** - TypeORM data models
4. **Middleware** - Authentication, validation, error handling
5. **Validation** - Zod schemas for data validation

This separation provides:
- **Maintainability**: Each layer has a clear responsibility
- **Testability**: Easy to write unit tests
- **Scalability**: Easy to add new features

**Frontend - Component-Based Architecture:**

- **Context API** for global state management (authentication)
- **React Router** for navigation
- **Reusable components** and modular design
- **Centralized API client** for all HTTP requests

### Express vs NestJS

Chose **Express** for:
- Simplicity and easier learning curve
- Lower overhead for a project of this size
- Greater control over structure
- Extensive documentation and community

NestJS would be ideal for larger enterprise projects requiring:
- Robust dependency injection
- Opinionated architecture
- Integration with GraphQL, microservices, etc.

### React vs Vue

Chose **React** for:
- Larger ecosystem and community
- Better TypeScript support
- More job opportunities
- Hooks provide a powerful and flexible API

### JWT and Security

**Token Storage:**
- Stored in `localStorage` for simplicity
- In production, consider `httpOnly cookies` for better XSS protection

**Security Measures Implemented:**
1. **Password hashing** with bcrypt (10 rounds)
2. **JWT with expiration** (7 days by default)
3. **Input validation** with Zod on all endpoints
4. **Parameterized queries** - TypeORM prevents SQL injection
5. **CORS configured** to allow only specific origins
6. **Security headers** (could be improved with helmet.js)
7. **Generic error messages** that don't expose sensitive information

### TypeORM and Database

**Why TypeORM:**
- Excellent TypeScript integration
- Intuitive decorators for entity definition
- Migration support
- Active Record and Data Mapper patterns

**Configuration:**
- `synchronize: true` only in development (automatically creates tables)
- Use migrations in production for change control
- Unique index on `email` to prevent duplicates

### Validation with Zod

**Why Zod:**
- Automatic type inference (TypeScript types from schemas)
- Clear error messages
- Schema composition
- Modern alternative to Joi/Yup

## 🔄 Future Improvements

### Features

- [ ] **Refresh tokens** - Renew tokens without re-login
- [ ] **Roles and permissions** - Admin, user, guest
- [ ] **Password recovery** - Reset via email
- [ ] **Email verification** - Confirm account
- [ ] **Pagination** - For user list
- [ ] **Search and filters** - In user list
- [ ] **User avatar** - Image upload
- [ ] **Soft delete** - Deactivate users instead of deleting
- [ ] **Audit trail** - Log important changes

### Technical

- [ ] **Unit tests** - Jest for backend and frontend
- [ ] **Integration tests** - Supertest for API
- [ ] **E2E tests** - Playwright or Cypress
- [ ] **CI/CD** - GitHub Actions
- [ ] **Docker** - Containerization
- [ ] **Rate limiting** - Prevent API abuse
- [ ] **Logging** - Winston or Pino
- [ ] **Monitoring** - Sentry for errors
- [ ] **Migrations** - Database version control
- [ ] **OpenAPI/Swagger** - Interactive documentation
- [ ] **Helmet.js** - Additional security headers
- [ ] **Input sanitization** - Prevent XSS
- [ ] **CSRF protection** - For cookies

### UX/UI

- [ ] **Dark theme** - Dark mode
- [ ] **Improved responsive** - Mobile-first
- [ ] **Internationalization** - i18n for multiple languages
- [ ] **Toast notifications** - Visual feedback
- [ ] **Skeleton loaders** - Better loading UX
- [ ] **Real-time validation** - Immediate feedback

## 🧪 Testing

Currently no tests implemented. To add them:

### Backend

```bash
cd backend
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

### Frontend

```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

## 🚢 Deployment

### Backend

Recommendations:
- **Railway** - Easy deployment with PostgreSQL included
- **Heroku** - With PostgreSQL addon
- **DigitalOcean App Platform** - Simple configuration
- **AWS/GCP/Azure** - For enterprise production

Before deployment:
1. Configure environment variables
2. Disable `synchronize` in TypeORM
3. Run migrations
4. Configure CORS with frontend domain

### Frontend

Recommendations:
- **Vercel** - Automatic deployment from Git
- **Netlify** - Excellent for SPAs
- **GitHub Pages** - Free for public projects

Before deployment:
1. Configure `VITE_API_BASE_URL` with production backend URL
2. Build: `npm run build`
3. Deploy the `dist/` folder content

## 📝 License

MIT

## 👨‍💻 Author

Project developed as a technical test to demonstrate full-stack development skills and asynchronous written communication.

---

**AURA** - Augmented Universal Research Assistant
