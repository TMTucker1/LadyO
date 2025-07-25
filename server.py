#!/usr/bin/env python3
"""
Simple HTTP Server for Lady O Chat
Run this to serve the chat application locally and avoid CORS issues.

Usage:
    python3 server.py

Then open your browser to: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

if __name__ == "__main__":
    # Change to the directory where this script is located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Lady O Chat server starting...")
        print(f"Serving at http://localhost:{PORT}")
        print(f"Open your browser to: http://localhost:{PORT}")
        print(f"Press Ctrl+C to stop the server")
        
        # Automatically open browser
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\nShutting down the server...")
            httpd.shutdown()
