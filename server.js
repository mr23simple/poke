const express = require('express');
const session = require('express-session');
const path = require('path');

const config = require('./config');
const pokedexService = require('./services/pokedexService');
const authRoutes = require('./routes/auth').router;
const apiRoutes = require('./routes/api');

const app = express();

// --- Middleware ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 }
}));
app.use(express.static('public'));

// --- Routes ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use(authRoutes);
app.use('/api', apiRoutes);

// --- Start Server ---
(async () => {
    await pokedexService.initialize();
    app.listen(config.PORT, () => console.log(`🚀 Server running at http://localhost:${config.PORT}`));
})();
