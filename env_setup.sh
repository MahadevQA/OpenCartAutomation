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

echo -e "${YELLOW}🧪 Running Playwright tests...${NC}"

# If argument passed, run that. Otherwise run all.
if [ -z "$1" ]
then
  echo "Running ALL tests..."
  npx playwright test
else
  echo "Running specific tests: $1"
  npx playwright test $1
fi

echo -e "${GREEN}✅ Test execution completed.${NC}"
echo ""

echo -e "${BLUE}"
echo "==============================================="
echo "     🎉 CI EXECUTION COMPLETED 🎉"
echo "==============================================="
echo -e "${NC}"