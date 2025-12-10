#!/bin/bash

# AURA Deployment Setup Helper Script
# This script helps you set up deployment to Vercel and Railway

echo "🚀 AURA Deployment Setup"
echo "========================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if commands exist
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${BLUE}📋 Checking prerequisites...${NC}"
echo ""

# Check Node.js
if command_exists node; then
    echo -e "${GREEN}✓${NC} Node.js $(node --version)"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js first."
    exit 1
fi

# Check npm
if command_exists npm; then
    echo -e "${GREEN}✓${NC} npm $(npm --version)"
else
    echo -e "${RED}✗${NC} npm not found."
    exit 1
fi

# Check git
if command_exists git; then
    echo -e "${GREEN}✓${NC} Git $(git --version | cut -d' ' -f3)"
else
    echo -e "${RED}✗${NC} Git not found."
    exit 1
fi

echo ""
echo -e "${BLUE}🔑 Generating JWT Secret...${NC}"
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
echo -e "${GREEN}Generated JWT Secret:${NC}"
echo -e "${YELLOW}$JWT_SECRET${NC}"
echo ""
echo -e "⚠️  ${YELLOW}IMPORTANT: Save this secret! You'll need it for Railway${NC}"
echo ""

# Check if Vercel CLI is installed
echo -e "${BLUE}📦 Checking Vercel CLI...${NC}"
if ! command_exists vercel; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
    echo -e "${GREEN}✓${NC} Vercel CLI installed"
else
    echo -e "${GREEN}✓${NC} Vercel CLI already installed"
fi

# Check if Railway CLI is installed
echo -e "${BLUE}🚂 Checking Railway CLI...${NC}"
if ! command_exists railway; then
    echo -e "${YELLOW}Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
    echo -e "${GREEN}✓${NC} Railway CLI installed"
else
    echo -e "${GREEN}✓${NC} Railway CLI already installed"
fi

echo ""
echo -e "${BLUE}📖 Next Steps:${NC}"
echo ""
echo "1️⃣  Deploy Backend to Railway:"
echo "   • Go to https://railway.app"
echo "   • Sign up with GitHub"
echo "   • Create new project from GitHub repo"
echo "   • Add PostgreSQL database"
echo "   • Set environment variables (use generated JWT_SECRET above)"
echo ""
echo "2️⃣  Deploy Frontend to Vercel:"
echo "   • Go to https://vercel.com"
echo "   • Sign up with GitHub"
echo "   • Import project from GitHub"
echo "   • Set VITE_API_BASE_URL to your Railway backend URL"
echo ""
echo "3️⃣  Configure GitHub Actions:"
echo "   • Get tokens from Vercel and Railway"
echo "   • Add secrets to GitHub repository"
echo "   • See DEPLOYMENT.md for detailed instructions"
echo ""
echo -e "${GREEN}✨ Setup helper completed!${NC}"
echo ""
echo "For detailed instructions, see: DEPLOYMENT.md"

