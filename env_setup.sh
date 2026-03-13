#!/bin/bash
set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
echo "==============================================="
echo "     🚀 PLAYWRIGHT CI EXECUTION STARTED 🚀"
echo "==============================================="
echo -e "${NC}"

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci
echo -e "${GREEN}✅ Dependencies installed.${NC}"
echo ""

echo -e "${YELLOW}🌐 Installing Playwright browsers...${NC}"
npx playwright install --with-deps
echo -e "${GREEN}✅ Browsers installed.${NC}"
echo ""

# ✅ ADD ALLURE CLEAN HERE
echo -e "${YELLOW}🧹 Cleaning old Allure results...${NC}"
rm -rf allure-results
rm -rf allure-report
mkdir -p allure-results
echo -e "${GREEN}✅ Old Allure results cleaned.${NC}"
echo ""

echo -e "${YELLOW}🧪 Running Playwright tests...${NC}"

if [ -z "$script" ]
then
  echo "Running default suite: test:master"
  npm run test:master
else
  echo "Running selected suite: $script"
  npm run $script
fi

echo -e "${GREEN}✅ Test execution completed.${NC}"
echo ""