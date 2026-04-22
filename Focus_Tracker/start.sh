#!/bin/bash
# Focus Tracker - Quick Setup Script

set -e

echo ""
echo "🧠 Focus Tracker Setup"
echo "======================="

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required. Please install it first."
    exit 1
fi

echo "✅ Python3 found: $(python3 --version)"

# Setup backend
echo ""
echo "📦 Setting up Backend..."
cd backend

# Create virtual environment
python3 -m venv venv
echo "✅ Virtual environment created"

# Activate and install
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
pip install -r requirements.txt --quiet
echo "✅ Dependencies installed"

echo ""
echo "🚀 Starting FastAPI Backend..."
echo "   API: http://localhost:8000"
echo "   Docs: http://localhost:8000/docs"
echo ""
echo "📌 Load the Chrome Extension:"
echo "   1. Open Chrome → chrome://extensions/"
echo "   2. Enable 'Developer Mode' (top right toggle)"
echo "   3. Click 'Load unpacked'"
echo "   4. Select the 'chrome-extension' folder"
echo ""
echo "🖥️  Open the Dashboard:"
echo "   Open frontend/index.html in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
