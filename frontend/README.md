# AURA Frontend

Aplicación web React para gestión de usuarios con autenticación JWT, construida con TypeScript y Vite.

## 🚀 Tecnologías

- **React** v19.2 - Librería UI
- **TypeScript** v5.9 - Tipado estático
- **Vite** v7.2 - Build tool y dev server
- **React Router** v6 - Enrutamiento
- **CSS3** - Estilos personalizados

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── api/                  # Cliente HTTP
│   │   └── client.ts         # Funciones para llamar a la API
│   ├── components/           # Componentes reutilizables
│   │   └── ProtectedRoute.tsx
│   ├── context/              # Contextos React
│   │   └── AuthContext.tsx   # Estado global de autenticación
│   ├── pages/                # Páginas de la aplicación
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── types/                # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx               # Componente principal con rutas
│   ├── main.tsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── env.example
└── README.md
```

## ⚙️ Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear un archivo `.env` en la raíz del directorio `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

**Nota:** En producción, cambiar esta URL por la del backend desplegado.

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en el directorio `dist/`

### Preview de Producción

```bash
npm run preview
```

Sirve la versión de producción localmente para pruebas.

## 🎨 Características

### Páginas

#### 1. Login (`/login`)
- Formulario de inicio de sesión
- Validación de email y contraseña
- Manejo de errores del servidor
- Estado de carga durante la autenticación
- Redirección a dashboard tras login exitoso
- Link para registro de nuevos usuarios

#### 2. Register (`/register`)
- Formulario de registro con validación
- Campos: email, nombre, apellido, contraseña
- Confirmación de contraseña
- Validación en tiempo real
- Manejo de errores (email duplicado, etc.)
- Redirección automática tras registro exitoso

#### 3. Dashboard (`/dashboard`)
- Vista protegida (requiere autenticación)
- Muestra perfil del usuario actual
- Lista de todos los usuarios registrados
- Formulario de edición de perfil
- Botón de logout
- Estados de carga y error

### Funcionalidades de Autenticación

**AuthContext:**
- Estado global de autenticación
- Persistencia del token en localStorage
- Auto-login al recargar la página
- Métodos: `login`, `register`, `logout`, `updateUser`

**ProtectedRoute:**
- Componente HOC para proteger rutas
- Redirección automática a login si no hay usuario
- Muestra loading mientras verifica autenticación

### Cliente API

Todas las peticiones HTTP están centralizadas en `src/api/client.ts`:

- `registerUser(data)` - Registro de usuario
- `loginUser(data)` - Inicio de sesión
- `getProfile()` - Obtener perfil actual
- `updateProfile(data)` - Actualizar perfil
- `getUsers()` - Listar todos los usuarios

Características:
- Manejo automático de tokens JWT
- Headers configurados automáticamente
- Clase `ApiError` para errores tipados
- Type-safe con TypeScript

## 🎯 Rutas de la Aplicación

| Ruta | Componente | Protegida | Descripción |
|------|------------|-----------|-------------|
| `/` | - | No | Redirecciona a `/login` |
| `/login` | Login | No | Página de inicio de sesión |
| `/register` | Register | No | Página de registro |
| `/dashboard` | Dashboard | **Sí** | Panel de usuario |
| `*` | - | No | Redirecciona a `/login` |

## 🎨 Estilos

El proyecto utiliza **CSS puro** con variables CSS para theming:

### Variables de Color

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
- Breakpoint principal: 768px
- Adaptación de formularios y tablas en móviles

## 🔒 Seguridad

### Almacenamiento de Tokens

- Los tokens JWT se guardan en `localStorage`
- Se adjuntan automáticamente en el header `Authorization: Bearer <token>`
- Se eliminan al hacer logout

**Nota para Producción:**
Considerar usar `httpOnly cookies` para mayor seguridad contra XSS.

### Validación de Formularios

Validación en el cliente para:
- Formato de email
- Longitud mínima de contraseña (6 caracteres)
- Campos requeridos
- Coincidencia de contraseñas

## 🧪 Testing

Actualmente no hay tests implementados. Para agregar tests:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Configurar en `vite.config.ts`:

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

Ejemplo de test:

```typescript
import { render, screen } from '@testing-library/react';
import { Login } from './pages/Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByText('Welcome Back')).toBeInTheDocument();
});
```

## 🚢 Deploy

### Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Configurar variable de entorno en Vercel:
- `VITE_API_BASE_URL` = URL del backend en producción

### Netlify

```bash
# Build
npm run build

# Deploy carpeta dist/
netlify deploy --prod --dir=dist
```

Configurar en `netlify.toml`:

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

Agregar al `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/nombre-repo/',
  // ...
});
```

Build y deploy:

```bash
npm run build
npm install -g gh-pages
gh-pages -d dist
```

## 🔧 Configuración de Vite

El proyecto usa la configuración por defecto de Vite con React:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### Alias de Rutas (Opcional)

Para agregar alias:

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

## 📝 Scripts Disponibles

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "tsc -b && vite build",  // Build de producción
  "lint": "eslint .",               // Linter
  "preview": "vite preview"         // Preview de build
}
```

## 🔧 Troubleshooting

### Error: "Network Error" o "Failed to fetch"

El backend no está corriendo o la URL es incorrecta.

**Solución:**
1. Verificar que el backend esté corriendo en `http://localhost:3000`
2. Verificar `VITE_API_BASE_URL` en `.env`
3. Verificar CORS en el backend

### Error: "Unauthorized" en todas las peticiones

Token inválido o expirado.

**Solución:**
1. Hacer logout y login nuevamente
2. Verificar que el `JWT_SECRET` del backend no haya cambiado
3. Limpiar localStorage: `localStorage.clear()`

### La aplicación no se actualiza tras cambios en `.env`

Vite requiere reiniciar el servidor tras cambios en variables de entorno.

**Solución:**
```bash
# Detener con Ctrl+C
# Reiniciar
npm run dev
```

## 🎯 Mejoras Futuras

- [ ] Tests con Vitest y Testing Library
- [ ] Internacionalización (i18n)
- [ ] Tema oscuro
- [ ] Notificaciones toast
- [ ] Skeleton loaders
- [ ] Validación en tiempo real con debounce
- [ ] Paginación en lista de usuarios
- [ ] Búsqueda y filtros
- [ ] Subida de avatar
- [ ] PWA (Progressive Web App)

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

Para más información, consulta el `README.md` principal del proyecto.
