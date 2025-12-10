# AURA Frontend

React web application for user management with JWT authentication, built with TypeScript and Vite.

## 🚀 Technologies

- **React** v19.2 - UI library
- **TypeScript** v5.9 - Static typing
- **Vite** v7.2 - Build tool and dev server
- **React Router** v6 - Routing
- **CSS3** - Custom styles

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/                  # HTTP client
│   │   └── client.ts         # Functions to call the API
│   ├── components/           # Reusable components
│   │   └── ProtectedRoute.tsx
│   ├── context/              # React contexts
│   │   └── AuthContext.tsx   # Global authentication state
│   ├── pages/                # Application pages
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── App.tsx               # Main component with routes
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── env.example
└── README.md
```

## ⚙️ Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `frontend/` root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

**Note:** In production, change this URL to the deployed backend URL.

## 🏃 Running the Project

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

Optimized files will be generated in the `dist/` directory

### Production Preview

```bash
npm run preview
```

Serves the production build locally for testing.

## 🎨 Features

### Pages

#### 1. Login (`/login`)
- Login form
- Email and password validation
- Server error handling
- Loading state during authentication
- Redirect to dashboard after successful login
- Link to register new users

#### 2. Register (`/register`)
- Registration form with validation
- Fields: email, first name, last name, password
- Password confirmation
- Real-time validation
- Error handling (duplicate email, etc.)
- Automatic redirect after successful registration

#### 3. Dashboard (`/dashboard`)
- Protected view (requires authentication)
- Shows current user profile
- List of all registered users
- Profile edit form
- Logout button
- Loading and error states

### Authentication Features

**AuthContext:**
- Global authentication state
- Token persistence in localStorage
- Auto-login on page reload
- Methods: `login`, `register`, `logout`, `updateUser`

**ProtectedRoute:**
- HOC component to protect routes
- Automatic redirect to login if no user
- Shows loading while verifying authentication

### API Client

All HTTP requests are centralized in `src/api/client.ts`:

- `registerUser(data)` - User registration
- `loginUser(data)` - Login
- `getProfile()` - Get current profile
- `updateProfile(data)` - Update profile
- `getUsers()` - List all users

Features:
- Automatic JWT token management
- Automatically configured headers
- `ApiError` class for typed errors
- Type-safe with TypeScript

## 🎯 Application Routes

| Route | Component | Protected | Description |
|------|------------|-----------|-------------|
| `/` | - | No | Redirects to `/login` |
| `/login` | Login | No | Login page |
| `/register` | Register | No | Registration page |
| `/dashboard` | Dashboard | **Yes** | User dashboard |
| `*` | - | No | Redirects to `/login` |

## 🎨 Styles

The project uses **pure CSS** with CSS variables for theming:

### Color Variables

```css
:root {
  --primary-color: #6c2bd9;
  --primary-dark: #5a24b8;
  --primary-light: #8e4dff;
  --secondary-color: #b24dff;
  --background-gradient: linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #4a2d7a 100%);
  --white: #ffffff;
  --light-gray: #f5f5f5;
  --gray: #e0e0e0;
  --dark-gray: #333333;
  --text-color: #2c3e50;
  --error-color: #e74c3c;
  --success-color: #27ae60;
}
```

### Responsive Design

- Mobile-first approach
- Main breakpoint: 768px
- Adaptation of forms and tables on mobile devices

## 🔒 Security

### Token Storage

- JWT tokens are saved in `localStorage`
- Automatically attached in the `Authorization: Bearer <token>` header
- Removed on logout

**Note for Production:**
Consider using `httpOnly cookies` for better XSS protection.

### Form Validation

Client-side validation for:
- Email format
- Minimum password length (6 characters)
- Required fields
- Password matching

## 🧪 Testing

Currently no tests implemented. To add tests:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Configure in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

Example test:

```typescript
import { render, screen } from '@testing-library/react';
import { Login } from './pages/Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByText('Welcome Back')).toBeInTheDocument();
});
```

## 🚢 Deployment

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Configure environment variable in Vercel:
- `VITE_API_BASE_URL` = Production backend URL

### Netlify

```bash
# Build
npm run build

# Deploy dist/ folder
netlify deploy --prod --dir=dist
```

Configure in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

Add to `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/repo-name/',
  // ...
});
```

Build and deploy:

```bash
npm run build
npm install -g gh-pages
gh-pages -d dist
```

## 🔧 Vite Configuration

The project uses the default Vite configuration with React:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### Path Aliases (Optional)

To add aliases:

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
    },
  },
})
```

## 📝 Available Scripts

```json
{
  "dev": "vite",                    // Development server
  "build": "tsc -b && vite build",  // Production build
  "lint": "eslint .",               // Linter
  "preview": "vite preview"         // Build preview
}
```

## 🔧 Troubleshooting

### Error: "Network Error" or "Failed to fetch"

Backend is not running or URL is incorrect.

**Solution:**
1. Verify backend is running at `http://localhost:3000`
2. Check `VITE_API_BASE_URL` in `.env`
3. Verify CORS in backend

### Error: "Unauthorized" on all requests

Invalid or expired token.

**Solution:**
1. Logout and login again
2. Verify backend `JWT_SECRET` hasn't changed
3. Clear localStorage: `localStorage.clear()`

### Application doesn't update after `.env` changes

Vite requires server restart after environment variable changes.

**Solution:**
```bash
# Stop with Ctrl+C
# Restart
npm run dev
```

## 🎯 Future Improvements

- [ ] Tests with Vitest and Testing Library
- [ ] Internationalization (i18n)
- [ ] Dark theme
- [ ] Toast notifications
- [ ] Skeleton loaders
- [ ] Real-time validation with debounce
- [ ] Pagination in user list
- [ ] Search and filters
- [ ] Avatar upload
- [ ] PWA (Progressive Web App)

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

For more information, see the main project `README.md`.
