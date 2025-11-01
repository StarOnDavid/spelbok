#!/bin/bash
# ============================================
# SpelBok - Development Server
# Starts a local Python HTTP server for development
# ============================================

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PORT=8000
PROJECT_DIR="/Users/davidstaron/src/spel_bok"

# Banner
echo ""
echo -e "${GREEN}🎵 =====================================${NC}"
echo -e "${GREEN}   SpelBok - Development Server${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""

# Change to project directory
cd "$PROJECT_DIR" || exit 1

# Check if port is already in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Port $PORT is already in use!${NC}"
    echo -e "${YELLOW}   Trying to kill the process...${NC}"
    lsof -ti:$PORT | xargs kill -9 2>/dev/null
    sleep 1
fi

# Display server info
echo -e "${BLUE}📂 Project Directory:${NC} $PROJECT_DIR"
echo -e "${BLUE}🌐 Server URL:${NC} http://localhost:$PORT"
echo -e "${BLUE}🔌 Port:${NC} $PORT"
echo ""
echo -e "${GREEN}✅ Server is starting...${NC}"
echo -e "${YELLOW}   Press CTRL+C to stop the server${NC}"
echo ""
echo -e "${GREEN}=====================================${NC}"
echo ""

# Start Python HTTP server
python3 -m http.server $PORT

# Cleanup on exit
echo ""
echo -e "${GREEN}👋 Server stopped. Goodbye!${NC}"
echo ""
