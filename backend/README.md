# AURA Backend API

API REST para gestión de usuarios con autenticación JWT, construida con Node.js, Express, TypeORM y PostgreSQL.

## 🚀 Tecnologías

- **Node.js** v18+
- **Express** v4.18
- **TypeScript** v5.3
- **TypeORM** v0.3.17
- **PostgreSQL**
- **JWT** (jsonwebtoken)
- **bcryptjs** - Hash de contraseñas
- **Zod** - Validación de esquemas
- **ts-node-dev** - Hot reload en desarrollo

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/       # Controladores de rutas
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── entities/          # Modelos TypeORM
│   │   └── User.ts
│   ├── middleware/        # Middlewares personalizados
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/            # Definición de rutas
│   │   ├── auth.routes.ts
│   │   └── user.routes.ts
│   ├── services/          # Lógica de negocio
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── types/             # Tipos TypeScript
│   │   └── express.d.ts
│   ├── utils/             # Funciones auxiliares
│   │   ├── hash.ts
│   │   └── jwt.ts
│   ├── validation/        # Esquemas de validación
│   │   └── auth.validation.ts
│   ├── data-source.ts     # Configuración de TypeORM
│   └── index.ts           # Punto de entrada
├── package.json
├── tsconfig.json
├── env.example
└── README.md
```

## ⚙️ Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear un archivo `.env` en la raíz del directorio `backend/`:

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

### 3. Configurar Base de Datos

Asegúrate de tener PostgreSQL instalado y corriendo.

Crear la base de datos:

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE aura_db;

# Salir
\q
```

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo (con hot reload)

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Modo Producción

```bash
# Compilar TypeScript a JavaScript
npm run build

# Ejecutar el código compilado
npm start
```

## 📊 Base de Datos

### Estructura de la Tabla Users

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

### Migraciones

TypeORM está configurado con `synchronize: true` en desarrollo, lo que crea/actualiza las tablas automáticamente.

**⚠️ IMPORTANTE:** En producción, desactivar `synchronize` y usar migraciones.

Para generar una migración:

```bash
npm run migration:generate -- src/migrations/MigrationName
```

Para ejecutar migraciones:

```bash
npm run migration:run
```

Para revertir la última migración:

```bash
npm run migration:revert
```

## 🔌 API Endpoints

Consulta el archivo `README.md` principal para la documentación completa de la API.

### Resumen de Endpoints

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | No | Registrar nuevo usuario |
| POST | `/api/auth/login` | No | Iniciar sesión |
| GET | `/api/users/profile` | Sí | Obtener perfil actual |
| PUT | `/api/users/profile` | Sí | Actualizar perfil |
| GET | `/api/users` | Sí | Listar todos los usuarios |
| GET | `/health` | No | Health check |

## 🔒 Seguridad

### Autenticación JWT

- Los tokens se firman con el secreto definido en `JWT_SECRET`
- Expiración configurable (por defecto 7 días)
- Los endpoints protegidos requieren el header: `Authorization: Bearer <token>`

### Hashing de Contraseñas

- Uso de `bcryptjs` con 10 salt rounds
- Las contraseñas nunca se almacenan en texto plano
- Las contraseñas nunca se devuelven en las respuestas

### Validación de Datos

- Validación con Zod en todos los endpoints
- Mensajes de error claros sin exponer información sensible
- Prevención de SQL injection mediante consultas parametrizadas de TypeORM

## 🧪 Testing

Actualmente no hay tests implementados. Para agregar tests:

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

Ejemplo de test para el endpoint de registro:

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

## 🐛 Debug

El servidor imprime información útil en la consola:

```
✅ Database connection established
🚀 Server is running on http://localhost:3000
📊 Environment: development
```

Los errores se loguean con detalles completos en modo desarrollo.

## 🚢 Deploy

### Preparación para Producción

1. **Configurar variables de entorno en tu plataforma de hosting**

2. **Desactivar synchronize en `data-source.ts`:**

```typescript
synchronize: false, // Cambiar a false en producción
```

3. **Ejecutar migraciones:**

```bash
npm run migration:run
```

4. **Configurar CORS:**

En `src/index.ts`, configura CORS con el dominio de tu frontend:

```typescript
app.use(cors({
  origin: 'https://tu-frontend.com',
  credentials: true
}));
```

### Plataformas Recomendadas

- **Railway** - Deploy fácil con PostgreSQL incluido
- **Heroku** - Con addon de PostgreSQL
- **DigitalOcean App Platform**
- **AWS/GCP/Azure** - Para producción enterprise

## 📝 Scripts Disponibles

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

PostgreSQL no está corriendo. Iniciar el servicio:

```bash
# En Windows
net start postgresql-x64-14

# En macOS
brew services start postgresql

# En Linux
sudo systemctl start postgresql
```

### Error: "relation 'users' does not exist"

La tabla no fue creada. Verificar:
1. `synchronize: true` en `data-source.ts` (solo desarrollo)
2. Conexión a la base de datos correcta
3. Ejecutar migraciones si estás en producción

### Error: "JWT malformed"

Token inválido o mal formado. Verificar:
1. El token se envía en el header: `Authorization: Bearer <token>`
2. El `JWT_SECRET` es el mismo usado para crear el token

## 📚 Recursos

- [Express Documentation](https://expressjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Zod Documentation](https://zod.dev/)
- [JWT.io](https://jwt.io/)

---

Para más información, consulta el `README.md` principal del proyecto.

