# Script de setup para AURA (PowerShell)
# Automatiza la instalación inicial del proyecto

$ErrorActionPreference = "Stop"

Write-Host "🚀 AURA Setup Script" -ForegroundColor Blue
Write-Host "====================" -ForegroundColor Blue
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Node.js v18+ desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar npm
Write-Host "Verificando npm..." -ForegroundColor Cyan
try {
    $npmVersion = npm -v
    Write-Host "✅ npm $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar PostgreSQL
Write-Host "Verificando PostgreSQL..." -ForegroundColor Cyan
try {
    $psqlVersion = psql --version
    Write-Host "✅ $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  PostgreSQL no encontrado" -ForegroundColor Yellow
    Write-Host "Asegúrate de tener PostgreSQL instalado y corriendo" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Cyan
Set-Location backend
npm install
Write-Host "✅ Backend dependencies instaladas" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Cyan
Set-Location ../frontend
npm install
Write-Host "✅ Frontend dependencies instaladas" -ForegroundColor Green

Set-Location ..

Write-Host ""
Write-Host "📝 Configurando archivos de environment..." -ForegroundColor Cyan

# Backend .env
if (-not (Test-Path "backend/.env")) {
    Write-Host "Creando backend/.env desde env.example..." -ForegroundColor Yellow
    Copy-Item "backend/env.example" "backend/.env"
    Write-Host "✅ backend/.env creado" -ForegroundColor Green
    Write-Host "⚠️  IMPORTANTE: Edita backend/.env con tus credenciales de PostgreSQL" -ForegroundColor Yellow
} else {
    Write-Host "✅ backend/.env ya existe" -ForegroundColor Green
}

# Frontend .env
if (-not (Test-Path "frontend/.env")) {
    Write-Host "Creando frontend/.env desde env.example..." -ForegroundColor Yellow
    Copy-Item "frontend/env.example" "frontend/.env"
    Write-Host "✅ frontend/.env creado" -ForegroundColor Green
} else {
    Write-Host "✅ frontend/.env ya existe" -ForegroundColor Green
}

Write-Host ""
Write-Host "✨ Setup completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Crear la base de datos PostgreSQL:"
Write-Host "   PS> psql -U postgres"
Write-Host "   postgres=# CREATE DATABASE aura_db;"
Write-Host "   postgres=# \q"
Write-Host ""
Write-Host "2. Configurar credenciales de PostgreSQL en backend\.env"
Write-Host ""
Write-Host "3. Iniciar el backend (en una terminal):"
Write-Host "   PS> cd backend"
Write-Host "   PS> npm run dev"
Write-Host ""
Write-Host "4. Iniciar el frontend (en otra terminal):"
Write-Host "   PS> cd frontend"
Write-Host "   PS> npm run dev"
Write-Host ""
Write-Host "5. Abrir http://localhost:5173 en tu navegador"
Write-Host ""
Write-Host "¡Disfruta construyendo con AURA! 🎉" -ForegroundColor Green

