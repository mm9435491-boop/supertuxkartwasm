'use strict';

const express = require('express');
const path = require('path');

const app = express();

// Set cross-origin isolation headers FIRST - before any other middleware
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

// Set MIME type for .download files
app.use((req, res, next) => {
  if (req.path.endsWith('.download')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
