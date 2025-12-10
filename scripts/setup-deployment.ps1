# AURA Deployment Setup Helper Script (PowerShell)
# This script helps you set up deployment to Vercel and Railway

Write-Host "🚀 AURA Deployment Setup" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if commands exist
function Test-Command {
    param($Command)
    $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

Write-Host "📋 Checking prerequisites..." -ForegroundColor Blue
Write-Host ""

# Check Node.js
if (Test-Command node) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check npm
if (Test-Command npm) {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm not found." -ForegroundColor Red
    exit 1
}

# Check git
if (Test-Command git) {
    $gitVersion = (git --version).Split()[2]
    Write-Host "✓ Git $gitVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Git not found." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔑 Generating JWT Secret..." -ForegroundColor Blue

# Generate JWT Secret
Add-Type -AssemblyName System.Security
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$JWT_SECRET = [System.BitConverter]::ToString($bytes).Replace("-", "").ToLower()

Write-Host "Generated JWT Secret:" -ForegroundColor Green
Write-Host $JWT_SECRET -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANT: Save this secret! You'll need it for Railway" -ForegroundColor Yellow
Write-Host ""

# Check Vercel CLI
Write-Host "📦 Checking Vercel CLI..." -ForegroundColor Blue
if (!(Test-Command vercel)) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✓ Vercel CLI installed" -ForegroundColor Green
} else {
    Write-Host "✓ Vercel CLI already installed" -ForegroundColor Green
}

# Check Railway CLI
Write-Host "🚂 Checking Railway CLI..." -ForegroundColor Blue
if (!(Test-Command railway)) {
    Write-Host "Railway CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g @railway/cli
    Write-Host "✓ Railway CLI installed" -ForegroundColor Green
} else {
    Write-Host "✓ Railway CLI already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "📖 Next Steps:" -ForegroundColor Blue
Write-Host ""
Write-Host "1️⃣  Deploy Backend to Railway:"
Write-Host "   • Go to https://railway.app"
Write-Host "   • Sign up with GitHub"
Write-Host "   • Create new project from GitHub repo"
Write-Host "   • Add PostgreSQL database"
Write-Host "   • Set environment variables (use generated JWT_SECRET above)"
Write-Host ""
Write-Host "2️⃣  Deploy Frontend to Vercel:"
Write-Host "   • Go to https://vercel.com"
Write-Host "   • Sign up with GitHub"
Write-Host "   • Import project from GitHub"
Write-Host "   • Set VITE_API_BASE_URL to your Railway backend URL"
Write-Host ""
Write-Host "3️⃣  Configure GitHub Actions:"
Write-Host "   • Get tokens from Vercel and Railway"
Write-Host "   • Add secrets to GitHub repository"
Write-Host "   • See DEPLOYMENT.md for detailed instructions"
Write-Host ""
Write-Host "✨ Setup helper completed!" -ForegroundColor Green
Write-Host ""
Write-Host "For detailed instructions, see: DEPLOYMENT.md"

