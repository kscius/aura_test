#!/bin/bash

# Script de setup para AURA
# Automatiza la instalación inicial del proyecto

set -e  # Exit on error

echo "🚀 AURA Setup Script"
echo "===================="
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar Node.js
echo -e "${BLUE}Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js no está instalado${NC}"
    echo "Por favor instala Node.js v18+ desde https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"

# Verificar npm
echo -e "${BLUE}Verificando npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}❌ npm no está instalado${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm $NPM_VERSION${NC}"

# Verificar PostgreSQL
echo -e "${BLUE}Verificando PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL no encontrado${NC}"
    echo "Asegúrate de tener PostgreSQL instalado y corriendo"
else
    PSQL_VERSION=$(psql --version)
    echo -e "${GREEN}✅ $PSQL_VERSION${NC}"
fi

echo ""
echo -e "${BLUE}📦 Instalando dependencias del backend...${NC}"
cd backend
npm install
echo -e "${GREEN}✅ Backend dependencies instaladas${NC}"

echo ""
echo -e "${BLUE}📦 Instalando dependencias del frontend...${NC}"
cd ../frontend
npm install
echo -e "${GREEN}✅ Frontend dependencies instaladas${NC}"

cd ..

echo ""
echo -e "${BLUE}📝 Configurando archivos de environment...${NC}"

# Backend .env
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}Creando backend/.env desde env.example...${NC}"
    cp backend/env.example backend/.env
    echo -e "${GREEN}✅ backend/.env creado${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANTE: Edita backend/.env con tus credenciales de PostgreSQL${NC}"
else
    echo -e "${GREEN}✅ backend/.env ya existe${NC}"
fi

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}Creando frontend/.env desde env.example...${NC}"
    cp frontend/env.example frontend/.env
    echo -e "${GREEN}✅ frontend/.env creado${NC}"
else
    echo -e "${GREEN}✅ frontend/.env ya existe${NC}"
fi

echo ""
echo -e "${GREEN}✨ Setup completado!${NC}"
echo ""
echo -e "${BLUE}📋 Próximos pasos:${NC}"
echo ""
echo "1. Crear la base de datos PostgreSQL:"
echo "   $ psql -U postgres"
echo "   postgres=# CREATE DATABASE aura_db;"
echo "   postgres=# \\q"
echo ""
echo "2. Configurar credenciales de PostgreSQL en backend/.env"
echo ""
echo "3. Iniciar el backend (en una terminal):"
echo "   $ cd backend"
echo "   $ npm run dev"
echo ""
echo "4. Iniciar el frontend (en otra terminal):"
echo "   $ cd frontend"
echo "   $ npm run dev"
echo ""
echo "5. Abrir http://localhost:5173 en tu navegador"
echo ""
echo -e "${GREEN}¡Disfruta construyendo con AURA! 🎉${NC}"

