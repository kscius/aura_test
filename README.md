# AURA - Augmented Universal Research Assistant

Una aplicación web full-stack para gestión de usuarios con autenticación JWT, construida con Node.js, Express, TypeORM, PostgreSQL, React y TypeScript.

## 📋 Descripción

AURA es una plataforma de gestión de usuarios que permite el registro, autenticación y administración de perfiles. El proyecto demuestra las mejores prácticas de desarrollo full-stack con una arquitectura modular, validaciones robustas, seguridad implementada correctamente y una interfaz de usuario moderna e intuitiva.

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** v18+ - Entorno de ejecución JavaScript
- **Express** v4.18 - Framework web minimalista
- **TypeScript** v5.3 - Superset tipado de JavaScript
- **TypeORM** v0.3.17 - ORM para TypeScript y JavaScript
- **PostgreSQL** - Base de datos relacional
- **JWT** (jsonwebtoken) v9.0 - Autenticación basada en tokens
- **bcryptjs** v2.4 - Hash de contraseñas
- **Zod** v3.22 - Validación de esquemas

### Frontend
- **React** v19.2 - Librería para interfaces de usuario
- **TypeScript** v5.9 - Tipado estático
- **Vite** v7.2 - Build tool y dev server
- **React Router** v6 - Enrutamiento del lado del cliente

## 📁 Estructura del Proyecto

```
aura/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Lógica de controladores
│   │   ├── entities/          # Modelos de TypeORM
│   │   ├── middleware/        # Middlewares personalizados
│   │   ├── routes/            # Definición de rutas
│   │   ├── services/          # Lógica de negocio
│   │   ├── types/             # Tipos TypeScript
│   │   ├── utils/             # Utilidades (JWT, hash)
│   │   ├── validation/        # Esquemas de validación Zod
│   │   ├── data-source.ts     # Configuración TypeORM
│   │   └── index.ts           # Punto de entrada
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── api/               # Cliente HTTP
│   │   ├── components/        # Componentes React
│   │   ├── context/           # Contextos React
│   │   ├── pages/             # Páginas de la aplicación
│   │   ├── types/             # Tipos TypeScript
│   │   ├── App.tsx            # Componente principal
│   │   ├── main.tsx           # Punto de entrada
│   │   └── index.css          # Estilos globales
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example
└── README.md
```

## ⚙️ Instalación y Configuración

### Prerrequisitos

- **Node.js** v18 o superior
- **npm** v9 o superior
- **PostgreSQL** v14 o superior

### Pasos de Instalación

#### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd aurora_test
```

#### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` basado en `env.example`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=aura_db

# JWT Configuration
JWT_SECRET=tu_secreto_super_seguro_cambialo_en_produccion
JWT_EXPIRES_IN=7d
```

#### 3. Configurar Base de Datos

Crear la base de datos PostgreSQL:

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE aura_db;

# Salir
\q
```

TypeORM creará automáticamente las tablas cuando ejecutes el servidor en modo desarrollo (gracias a `synchronize: true` en `data-source.ts`).

**Nota:** En producción, desactiva `synchronize` y usa migraciones.

#### 4. Configurar Frontend

```bash
cd ../frontend
npm install
```

Crear archivo `.env` basado en `env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 🏃 Uso

### Ejecutar el Backend

Desde la carpeta `backend/`:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Ejecutar el Frontend

Desde la carpeta `frontend/`:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Credenciales de Prueba

No hay credenciales predefinidas. Regístrate usando la página de registro en `http://localhost:5173/register`

## 📚 API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. Registro de Usuario

**POST** `/api/auth/register`

Registra un nuevo usuario en el sistema.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "password": "contraseña123"
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
      "email": "usuario@ejemplo.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Errores:**
- `400` - Email ya en uso o datos inválidos
- `500` - Error del servidor

---

#### 2. Login de Usuario

**POST** `/api/auth/login`

Autentica un usuario y devuelve un token JWT.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
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
      "email": "usuario@ejemplo.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Errores:**
- `401` - Credenciales inválidas
- `500` - Error del servidor

---

#### 3. Obtener Perfil

**GET** `/api/users/profile`

Obtiene el perfil del usuario autenticado.

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
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errores:**
- `401` - Token inválido o no proporcionado
- `404` - Usuario no encontrado
- `500` - Error del servidor

---

#### 4. Actualizar Perfil

**PUT** `/api/users/profile`

Actualiza el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "email": "nuevo@ejemplo.com",
  "firstName": "Juan Carlos",
  "lastName": "Pérez García"
}
```

Nota: Todos los campos son opcionales, solo envía los que deseas actualizar.

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "email": "nuevo@ejemplo.com",
    "firstName": "Juan Carlos",
    "lastName": "Pérez García",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errores:**
- `400` - Email ya en uso o datos inválidos
- `401` - Token inválido
- `404` - Usuario no encontrado
- `500` - Error del servidor

---

#### 5. Listar Usuarios

**GET** `/api/users`

Obtiene la lista de todos los usuarios registrados.

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
      "email": "usuario1@ejemplo.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "email": "usuario2@ejemplo.com",
      "firstName": "María",
      "lastName": "García",
      "createdAt": "2024-01-02T00:00:00.000Z"
    }
  ]
}
```

**Errores:**
- `401` - Token inválido o no proporcionado
- `500` - Error del servidor

---

### Formato de Errores

Todos los endpoints devuelven errores en el siguiente formato:

```json
{
  "error": "ErrorType",
  "message": "Descripción del error",
  "details": {}
}
```

## 🎯 Decisiones Técnicas

### Arquitectura Elegida

**Backend - Arquitectura en Capas:**

1. **Controladores** - Manejan las peticiones HTTP y respuestas
2. **Servicios** - Contienen la lógica de negocio
3. **Entidades** - Modelos de datos TypeORM
4. **Middleware** - Autenticación, validación, manejo de errores
5. **Validación** - Esquemas Zod para validación de datos

Esta separación permite:
- **Mantenibilidad**: Cada capa tiene una responsabilidad clara
- **Testabilidad**: Fácil de escribir tests unitarios
- **Escalabilidad**: Fácil agregar nuevas funcionalidades

**Frontend - Component-Based Architecture:**

- **Context API** para manejo de estado global (autenticación)
- **React Router** para navegación
- **Componentes reutilizables** y modulares
- **API client centralizado** para todas las peticiones HTTP

### Express vs NestJS

Elegí **Express** por:
- Simplicidad y curva de aprendizaje más suave
- Menor overhead para un proyecto de este tamaño
- Mayor control sobre la estructura
- Amplia documentación y comunidad

NestJS sería ideal para proyectos enterprise más grandes que requieran:
- Inyección de dependencias robusta
- Arquitectura opinionada
- Integración con GraphQL, microservicios, etc.

### React vs Vue

Elegí **React** por:
- Mayor ecosistema y comunidad
- Mejor soporte TypeScript
- Más oportunidades laborales
- Hooks proporcionan una API poderosa y flexible

### JWT y Seguridad

**Almacenamiento del Token:**
- Guardado en `localStorage` para simplicidad
- En producción, considerar `httpOnly cookies` para mayor seguridad contra XSS

**Medidas de Seguridad Implementadas:**
1. **Hashing de contraseñas** con bcrypt (10 rounds)
2. **JWT con expiración** (7 días por defecto)
3. **Validación de entrada** con Zod en todos los endpoints
4. **Consultas parametrizadas** TypeORM previene SQL injection
5. **CORS configurado** para permitir solo orígenes específicos
6. **Headers de seguridad** (podría mejorarse con helmet.js)
7. **Mensajes de error genéricos** que no exponen información sensible

### TypeORM y Base de Datos

**Por qué TypeORM:**
- Excelente integración con TypeScript
- Decoradores intuitivos para definir entidades
- Soporte para migraciones
- Active Record y Data Mapper patterns

**Configuración:**
- `synchronize: true` solo en desarrollo (crea tablas automáticamente)
- En producción usar migraciones para control de cambios
- Índice único en `email` para prevenir duplicados

### Validación con Zod

**Por qué Zod:**
- Type inference automático (tipos TypeScript desde esquemas)
- Mensajes de error claros
- Composición de esquemas
- Alternativa moderna a Joi/Yup

## 🔄 Mejoras Futuras

### Funcionalidades

- [ ] **Refresh tokens** - Renovar tokens sin re-login
- [ ] **Roles y permisos** - Admin, user, guest
- [ ] **Recuperación de contraseña** - Reset via email
- [ ] **Verificación de email** - Confirmar cuenta
- [ ] **Paginación** - Para lista de usuarios
- [ ] **Búsqueda y filtros** - En lista de usuarios
- [ ] **Avatar de usuario** - Subida de imágenes
- [ ] **Soft delete** - Desactivar usuarios en lugar de eliminar
- [ ] **Auditoría** - Log de cambios importantes

### Técnicas

- [ ] **Tests unitarios** - Jest para backend y frontend
- [ ] **Tests de integración** - Supertest para API
- [ ] **Tests E2E** - Playwright o Cypress
- [ ] **CI/CD** - GitHub Actions
- [ ] **Docker** - Containerización
- [ ] **Rate limiting** - Prevenir abuso de API
- [ ] **Logging** - Winston o Pino
- [ ] **Monitoring** - Sentry para errores
- [ ] **Migraciones** - Control de versiones de BD
- [ ] **OpenAPI/Swagger** - Documentación interactiva
- [ ] **Helmet.js** - Headers de seguridad adicionales
- [ ] **Input sanitization** - Prevenir XSS
- [ ] **CSRF protection** - Para cookies

### UX/UI

- [ ] **Tema oscuro** - Dark mode
- [ ] **Responsive mejorado** - Mobile-first
- [ ] **Internacionalización** - i18n para múltiples idiomas
- [ ] **Notificaciones toast** - Feedback visual
- [ ] **Skeleton loaders** - Mejor UX de carga
- [ ] **Validación en tiempo real** - Feedback inmediato

## 🧪 Testing

Actualmente no hay tests implementados. Para agregarlos:

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

## 🚢 Deploy

### Backend

Recomendaciones:
- **Railway** - Fácil deploy con PostgreSQL incluido
- **Heroku** - Con addon de PostgreSQL
- **DigitalOcean App Platform** - Configuración simple
- **AWS/GCP/Azure** - Para producción enterprise

Antes de deploy:
1. Configurar variables de entorno
2. Desactivar `synchronize` en TypeORM
3. Ejecutar migraciones
4. Configurar CORS con el dominio del frontend

### Frontend

Recomendaciones:
- **Vercel** - Deploy automático desde Git
- **Netlify** - Excelente para SPAs
- **GitHub Pages** - Gratis para proyectos públicos

Antes de deploy:
1. Configurar `VITE_API_BASE_URL` con la URL del backend en producción
2. Build: `npm run build`
3. El contenido de `dist/` es lo que se despliega

## 📝 Licencia

MIT

## 👨‍💻 Autor

Proyecto desarrollado como prueba técnica para demostrar habilidades en desarrollo full-stack y comunicación asíncrona escrita.

---

**AURA** - Augmented Universal Research Assistant

