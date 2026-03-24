'use strict';

const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyMiddleware({
    target: 'https://supertuxkart.pages.dev',
    changeOrigin: true,
});

// Set cross-origin isolation headers
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

// Serve static files from the current directory
app.use(express.static('.'));

// Proxy game assets
app.use('/assets', (req, res) => {
    proxy(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
