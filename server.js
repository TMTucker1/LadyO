/**
 * Simple Express server for Lady O Chat
 * Run this to serve the chat application locally and avoid CORS issues.
 * 
 * Usage:
 *   npm install express
 *   node server.js
 * 
 * Then open your browser to: http://localhost:8000
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Serve static files
app.use(express.static(__dirname));

// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Lady O Chat server starting...`);
    console.log(`Serving at http://localhost:${PORT}`);
    console.log(`Open your browser to: http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});
