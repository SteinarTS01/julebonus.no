// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 80;

const fs = require('fs');
const imageDir = path.join(__dirname, 'public', 'slots');

// Route to get image paths
app.get('/api/imagePaths', (req, res) => {
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' });
    }
    
    // Filter out non-image files if needed
    const imagePaths = files
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)) // Adjust extensions as needed
      .map(file => `/slots/${file}`);
    
    res.json(imagePaths);
  });
});
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to serve index.html if no route matches
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
