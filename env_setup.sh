#!/bin/bash

# Exit immediately if a command fails
set -e

# Colors for console output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "==============================================="
echo "     🚀 PLAYWRIGHT CI EXECUTION STARTED 🚀"
echo "==============================================="
echo -e "${NC}"

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci
echo -e "${GREEN}✅ Dependencies installed successfully.${NC}"
echo ""

echo -e "${YELLOW}🌐 Installing Playwright browsers...${NC}"
npx playwright install --with-deps
echo -e "${GREEN}✅ Browsers installed successfully.${NC}"
echo ""

echo -e "${YELLOW}🧪 Running Playwright tests...${NC}"
npx playwright test
echo -e "${GREEN}✅ Tests execution completed.${NC}"
echo ""

echo -e "${BLUE}"
echo "==============================================="
echo "     🎉 CI EXECUTION COMPLETED SUCCESSFULLY 🎉"
echo "==============================================="
echo -e "${NC}"