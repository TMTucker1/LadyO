#!/bin/bash
# Simple server startup script for Lady O Chat
# This will try Python first, then Node.js if available

echo "Starting Lady O Chat server..."

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3 server..."
    python3 server.py
elif command -v node &> /dev/null && [ -f "package.json" ]; then
    echo "Using Node.js server..."
    npm install express 2>/dev/null || echo "Installing express..."
    node server.js
else
    echo "No suitable server runtime found."
    echo "Please install Python 3 or Node.js to run the server."
    echo "Or simply open index.html directly in your browser."
fi
