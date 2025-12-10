# AURA Backend API

REST API for user management with JWT authentication, built with Node.js, Express, TypeORM, and PostgreSQL.

## 🚀 Technologies

- **Node.js** v18+
- **Express** v4.18
- **TypeScript** v5.3
- **TypeORM** v0.3.17
- **PostgreSQL**
- **JWT** (jsonwebtoken)
- **bcryptjs** - Password hashing
- **Zod** - Schema validation
- **ts-node-dev** - Hot reload in development

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/       # Route controllers
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── entities/          # TypeORM models
│   │   └── User.ts
│   ├── middleware/        # Custom middlewares
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/            # Route definitions
│   │   ├── auth.routes.ts
│   │   └── user.routes.ts
│   ├── services/          # Business logic
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── types/             # TypeScript types
│   │   └── express.d.ts
│   ├── utils/             # Utility functions
│   │   ├── hash.ts
│   │   └── jwt.ts
│   ├── validation/        # Validation schemas
│   │   └── auth.validation.ts
│   ├── data-source.ts     # TypeORM configuration
│   └── index.ts           # Entry point
├── package.json
├── tsconfig.json
├── env.example
└── README.md
```

## ⚙️ Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `backend/` root directory:

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

### 3. Database Setup

Make sure PostgreSQL is installed and running.

Create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE aura_db;

# Exit
\q
```

## 🏃 Running the Project

### Development Mode (with hot reload)

```bash
npm run dev
```

The server will be available at `http://localhost:3000`

### Production Mode

```bash
# Compile TypeScript to JavaScript
npm run build

# Run compiled code
npm start
```

## 📊 Database

### Users Table Structure

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  "firstName" VARCHAR(100) NOT NULL,
  "lastName" VARCHAR(100) NOT NULL,
  "passwordHash" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

### Migrations

TypeORM is configured with `synchronize: true` in development, which automatically creates/updates tables.

**⚠️ IMPORTANT:** In production, disable `synchronize` and use migrations.

To generate a migration:

```bash
npm run migration:generate -- src/migrations/MigrationName
```

To run migrations:

```bash
npm run migration:run
```

To revert the last migration:

```bash
npm run migration:revert
```

## 🔌 API Endpoints

See the main `README.md` file for complete API documentation.

### Endpoints Summary

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Log in |
| GET | `/api/users/profile` | Yes | Get current profile |
| PUT | `/api/users/profile` | Yes | Update profile |
| GET | `/api/users` | Yes | List all users |
| GET | `/health` | No | Health check |

## 🔒 Security

### JWT Authentication

- Tokens are signed with the secret defined in `JWT_SECRET`
- Configurable expiration (default 7 days)
- Protected endpoints require the header: `Authorization: Bearer <token>`

### Password Hashing

- Uses `bcryptjs` with 10 salt rounds
- Passwords are never stored in plain text
- Passwords are never returned in responses

### Data Validation

- Validation with Zod on all endpoints
- Clear error messages without exposing sensitive information
- SQL injection prevention through TypeORM parameterized queries

## 🧪 Testing

Currently no tests implemented. To add tests:

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

Example test for the registration endpoint:

```typescript
import request from 'supertest';
import app from '../src/index';

describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.data.user.email).toBe('test@example.com');
    expect(response.body.data.token).toBeDefined();
  });
});
```

## 🐛 Debugging

The server prints useful information to the console:

```
✅ Database connection established
🚀 Server is running on http://localhost:3000
📊 Environment: development
```

Errors are logged with full details in development mode.

## 🚢 Deployment

### Production Preparation

1. **Configure environment variables on your hosting platform**

2. **Disable synchronize in `data-source.ts`:**

```typescript
synchronize: false, // Change to false in production
```

3. **Run migrations:**

```bash
npm run migration:run
```

4. **Configure CORS:**

In `src/index.ts`, configure CORS with your frontend domain:

```typescript
app.use(cors({
  origin: 'https://your-frontend.com',
  credentials: true
}));
```

### Recommended Platforms

- **Railway** - Easy deployment with PostgreSQL included
- **Heroku** - With PostgreSQL addon
- **DigitalOcean App Platform**
- **AWS/GCP/Azure** - For enterprise production

## 📝 Available Scripts

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "typeorm": "typeorm-ts-node-commonjs",
  "migration:generate": "npm run typeorm migration:generate -- -d src/data-source.ts",
  "migration:run": "npm run typeorm migration:run -- -d src/data-source.ts",
  "migration:revert": "npm run typeorm migration:revert -- -d src/data-source.ts"
}
```

## 🔧 Troubleshooting

### Error: "connect ECONNREFUSED"

PostgreSQL is not running. Start the service:

```bash
# On Windows
net start postgresql-x64-14

# On macOS
brew services start postgresql

# On Linux
sudo systemctl start postgresql
```

### Error: "relation 'users' does not exist"

Table was not created. Check:
1. `synchronize: true` in `data-source.ts` (development only)
2. Correct database connection
3. Run migrations if in production

### Error: "JWT malformed"

Invalid or malformed token. Verify:
1. Token is sent in header: `Authorization: Bearer <token>`
2. `JWT_SECRET` is the same one used to create the token

## 📚 Resources

- [Express Documentation](https://expressjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Zod Documentation](https://zod.dev/)
- [JWT.io](https://jwt.io/)

---

For more information, see the main project `README.md`.
