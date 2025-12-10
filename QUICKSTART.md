# 🚀 Quick Start Guide - AURA

Guía rápida para poner en marcha AURA en menos de 5 minutos.

## Prerrequisitos Instalados

- ✅ Node.js v18+
- ✅ PostgreSQL v14+
- ✅ npm v9+

## Setup en 4 Pasos

### 1️⃣ Configurar Base de Datos (1 min)

```bash
# Abrir PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE aura_db;

# Salir
\q
```

### 2️⃣ Configurar Backend (2 min)

```bash
cd backend

# Instalar dependencias
npm install

# Copiar archivo de environment
cp env.example .env

# Editar .env con tus credenciales de PostgreSQL
# Cambiar DB_PASSWORD por tu contraseña de PostgreSQL
```

Contenido mínimo de `.env`:
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=TU_CONTRASEÑA_AQUI
DB_NAME=aura_db
JWT_SECRET=super_secret_key_123
JWT_EXPIRES_IN=7d
```

```bash
# Iniciar servidor backend
npm run dev
```

✅ Backend corriendo en `http://localhost:3000`

### 3️⃣ Configurar Frontend (1 min)

**En una nueva terminal:**

```bash
cd frontend

# Instalar dependencias
npm install

# Copiar archivo de environment
cp env.example .env

# El .env debe contener:
# VITE_API_BASE_URL=http://localhost:3000
```

```bash
# Iniciar servidor frontend
npm run dev
```

✅ Frontend corriendo en `http://localhost:5173`

### 4️⃣ Probar la Aplicación (1 min)

1. Abrir navegador en `http://localhost:5173`
2. Hacer clic en "Register here"
3. Crear una cuenta con:
   - Email: `test@example.com`
   - First Name: `Test`
   - Last Name: `User`
   - Password: `password123`
4. Serás redirigido automáticamente al Dashboard
5. ¡Listo! 🎉

## Verificar que Todo Funciona

### Health Check Backend

```bash
curl http://localhost:3000/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "message": "AURA API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Probar Registro via API

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "firstName": "API",
    "lastName": "User",
    "password": "test123"
  }'
```

### Probar Login via API

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "password": "test123"
  }'
```

## Estructura de Carpetas

```
aurora_test/
├── backend/          → API (Puerto 3000)
├── frontend/         → Web App (Puerto 5173)
├── notes/            → Documentación de requisitos
├── README.md         → Documentación principal
├── ARCHITECTURE.md   → Arquitectura del sistema
└── QUICKSTART.md     → Esta guía
```

## Comandos Útiles

### Backend

```bash
cd backend

npm run dev          # Desarrollo con hot reload
npm run build        # Compilar TypeScript
npm start            # Ejecutar versión compilada
```

### Frontend

```bash
cd frontend

npm run dev          # Desarrollo con hot reload
npm run build        # Build de producción
npm run preview      # Preview del build
```

## Troubleshooting Rápido

### ❌ Error: "Database connection failed"

**Problema:** PostgreSQL no está corriendo o credenciales incorrectas.

**Solución:**
```bash
# Windows
net start postgresql-x64-14

# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

Verificar credenciales en `backend/.env`

### ❌ Error: "Port 3000 already in use"

**Problema:** El puerto ya está ocupado.

**Solución:**
Cambiar `PORT` en `backend/.env` a otro puerto (ej: 3001)

### ❌ Error: "Network Error" en el frontend

**Problema:** Backend no está corriendo o URL incorrecta.

**Solución:**
1. Verificar que backend esté corriendo
2. Verificar `VITE_API_BASE_URL` en `frontend/.env`

### ❌ Frontend muestra página en blanco

**Problema:** Error de JavaScript en la consola.

**Solución:**
1. Abrir DevTools (F12)
2. Ver mensajes de error en Console
3. Verificar que todas las dependencias estén instaladas

## Próximos Pasos

1. ✅ Crear tu primera cuenta de usuario
2. ✅ Explorar el Dashboard
3. ✅ Editar tu perfil
4. ✅ Ver la lista de usuarios
5. 📖 Leer `README.md` para documentación completa
6. 🏗️ Leer `ARCHITECTURE.md` para entender la arquitectura
7. 🔌 Probar todos los endpoints de la API

## Recursos Adicionales

- **Documentación completa:** `README.md`
- **Arquitectura:** `ARCHITECTURE.md`
- **Backend README:** `backend/README.md`
- **Frontend README:** `frontend/README.md`
- **Requisitos del proyecto:** `Project.md`

## Soporte

Si encuentras algún problema:

1. Revisa esta guía de troubleshooting
2. Consulta los README específicos de cada componente
3. Verifica los logs en la terminal
4. Abre las DevTools del navegador (F12)

---

**¡Disfruta construyendo con AURA!** 🚀

