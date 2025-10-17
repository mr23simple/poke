const express = require('express');
const session = require('express-session');
const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

// --- Configuration ---
const app = express();
const PORT = 3000;
const DATA_FOLDER = 'pgsharp_player_data';
const USERS_FILE = path.join(__dirname, 'users.json');
const POKEDEX_FILE = path.join(__dirname, 'pokedex.json');
const POKEDEX_API_URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json';
const SALT_ROUNDS = 10;

// --- Pokedex Caching Service ---
const pokedexService = {
    pokedex: null,
    async initialize() {
        try {
            console.log('🔄 Fetching latest Pokédex data from API...');
            const response = await fetch(POKEDEX_API_URL);
            if (!response.ok) throw new Error(`API fetch failed with status ${response.status}`);
            const pokedexJson = await response.text();
            await fs.writeFile(POKEDEX_FILE, pokedexJson);
            console.log('✅ Successfully downloaded and cached latest Pokédex.');
        } catch (error) {
            console.warn(`⚠️ Could not fetch latest Pokédex: ${error.message}`);
            console.log('↪️ Attempting to use existing local cache file as a fallback.');
        }

        try {
            const localPokedexJson = await fs.readFile(POKEDEX_FILE, 'utf-8');
            const data = JSON.parse(localPokedexJson);

            this.pokedex = {};
            data.forEach(pokemon => {
                const dexKey = pokemon.dexNr;
                const formKey = pokemon.formId.replace(`_${pokemon.names.English.toUpperCase()}`, '');
                
                if (!this.pokedex[dexKey]) this.pokedex[dexKey] = {};
                this.pokedex[dexKey][formKey] = pokemon;
            });
            console.log(`👍 Pokédex is now loaded with ${Object.keys(this.pokedex).length} entries.`);
        } catch (error) {
            console.error('❌ CRITICAL: Could not load Pokédex from local file. Pokémon names will not be available.', error);
            this.pokedex = {};
        }
    },
    getPokemonName(dexNr, formName) {
        const defaultName = `Pokedex #${dexNr}`;
        if (!this.pokedex[dexNr]) return defaultName;
        const normalEntry = this.pokedex[dexNr]['NORMAL'] || Object.values(this.pokedex[dexNr])[0];
        if (!normalEntry) return defaultName;
        const formKey = formName.replace(normalEntry.names.English, '').toUpperCase() || 'NORMAL';
        const entry = this.pokedex[dexNr]?.[formKey] || normalEntry;
        return entry?.names?.English || defaultName;
    },
    getPokemonSprite(p) {
        const defaultSprite = `https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/pokemon_icon_${String(p.pokemonId).padStart(3, '0')}_00.png`;
        const shinySprite = `https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/pokemon_icon_${String(p.pokemonId).padStart(3, '0')}_00_shiny.png`;
        const targetSprite = p.pokemonDisplay.shiny ? 'shinyImage' : 'image';

        const basePokemon = Object.values(this.pokedex[p.pokemonId] || {})[0];
        if (!basePokemon || !basePokemon.assetForms) {
            return p.pokemonDisplay.shiny ? shinySprite : defaultSprite;
        }
        
        const formName = p.pokemonDisplay.formName;
        const baseName = basePokemon.names.English.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        let formKey = formName.replace(baseName, '').toUpperCase();
        
        let foundAsset = null;
        if (formKey !== "") {
            foundAsset = basePokemon.assetForms.find(asset => {
                const assetForm = (asset.form || '').toUpperCase();
                const assetCostume = (asset.costume || '').toUpperCase();

                return assetForm === formKey || assetCostume.includes(formKey.replace(/_/g, ''));
            });
        }
        
        if (!foundAsset) {
            foundAsset = basePokemon.assetForms.find(asset => asset.form === null && asset.costume === null);
        }
        
        return foundAsset?.[targetSprite] || (p.pokemonDisplay.shiny ? shinySprite : defaultSprite);
    }
};

// --- Middleware & Helpers ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key-goes-here', resave: false, saveUninitialized: true, cookie: { maxAge: 86400000 } }));
app.use(express.static('public'));

const readUsers = async () => { try { await fs.access(USERS_FILE); return JSON.parse(await fs.readFile(USERS_FILE, 'utf-8')); } catch { return []; } };
const writeUsers = async (users) => await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
const isAuthenticated = (req, res, next) => req.session.user ? next() : res.redirect('/login.html');

// --- Routes ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));

app.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')));

app.post('/register', async (req, res) => {
    try {
        const { username, password, playerId } = req.body;
        if (!username || !password || !playerId) {
            return res.status(400).send('Username, password, and Player Support ID are required.');
        }

        const users = await readUsers();
        if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
            return res.status(409).send('Username already exists. <a href="/register">Try another</a>.');
        }
        if (users.find(u => u.playerId === playerId)) {
            return res.status(409).send('Player Support ID is already registered. <a href="/">Try logging in</a>.');
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        users.push({ username, password: hashedPassword, playerId });
        await writeUsers(users);

        res.redirect('/login.html');
    } catch (error) {
        res.status(500).send('Server error during registration.');
    }
});

app.get('/api/public-data', async (req, res) => {
    try {
        const folderPath = path.join(__dirname, DATA_FOLDER);
        await fs.access(folderPath);
        const files = await fs.readdir(folderPath);
        const playerSummaries = await Promise.all(files.filter(f => f.endsWith('.json')).map(async file => {
            const content = JSON.parse(await fs.readFile(path.join(folderPath, file), 'utf-8'));
            const recentPokemon = content.pokemons.filter(p => !p.isEgg).sort((a, b) => b.creationTimeMs - a.creationTimeMs)[0];
            return { name: content.account.name, level: content.player.level, team: content.account.team, kmWalked: content.player.kmWalked.toFixed(1), recentCatch: { name: recentPokemon ? pokedexService.getPokemonName(recentPokemon.pokemonId, recentPokemon.pokemonDisplay.formName) : 'N/A', cp: recentPokemon?.cp || 0, sprite: recentPokemon ? pokedexService.getPokemonSprite(recentPokemon) : '' }, playerId: content.account.playerSupportId };
        }));
        res.json(playerSummaries);
    } catch { res.json([]); }
});

app.get('/api/player-detail/:playerId', async (req, res) => {
    try {
        const { playerId } = req.params;
        const filePath = path.join(__dirname, DATA_FOLDER, `${path.basename(playerId)}.json`);
        const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        const getIvPercent = p => ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100);
        const sorted = content.pokemons.filter(p => !p.isEgg).sort((a, b) => b.cp - a.cp);
        const highlightsRaw = [...sorted.filter(p => getIvPercent(p) === 100).slice(0, 2), ...sorted.filter(p => p.pokemonDisplay?.shiny).slice(0, 2), ...sorted.filter(p => p.isLucky).slice(0, 2), ...sorted.slice(0, 2)];
        const highlights = [...new Set(highlightsRaw.map(p => p.id))].map(id => sorted.find(p => p.id === id)).slice(0, 4).map(p => ({ cp: p.cp, name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName), sprite: pokedexService.getPokemonSprite(p) }));
        res.json({ name: content.account.name, startDate: new Date(content.account.creationTimeMs).toLocaleDateString(), totalXp: content.player.experience, pokemonCaught: content.player.numPokemonCaptured, pokestopsVisited: content.player.pokeStopVisits, kmWalked: content.player.kmWalked, highlights });
    } catch { res.status(404).json({ message: 'Player data not found.' }); }
});

app.post('/api/save-data', async (req, res) => {
    try {
        const data = req.body;
        const name = data?.account?.name;
        const playerId = data?.account?.playerSupportId;

        if (!name || !playerId) {
            return res.status(200).json({ message: 'JSON is missing account name or playerSupportId.' });
        }

        // Save the data file
        await fs.mkdir(path.join(__dirname, DATA_FOLDER), { recursive: true });
        await fs.writeFile(path.join(__dirname, DATA_FOLDER, `${playerId}.json`), JSON.stringify(data, null, 2));

        const users = await readUsers();
        const userIndex = users.findIndex(u => u.playerId === playerId);

        if (userIndex > -1) {
            // If user exists, update their username in case it changed in-game
            users[userIndex].username = name;
        } else {
            // If user does not exist, create a new entry.
            // The password becomes the playerSupportId by default.
            const hashedPassword = await bcrypt.hash(playerId, SALT_ROUNDS);
            users.push({ username: name, password: hashedPassword, playerId: playerId });
        }
        await writeUsers(users);

        res.status(201).json({ success: true, message: `Data for ${name} saved/updated.` });
    } catch (error) {
        console.error("Error in /api/save-data", error);
        res.status(500).json({ message: 'Server error processing data.' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password, playerId } = req.body;
        const users = await readUsers();
        let user;

        if (playerId) {
            // Method 1: Login with Player ID only
            user = users.find(u => u.playerId === playerId);
            if (user) {
                // For ID-only login, we trust the ID is correct
                req.session.user = { username: user.username, playerId: user.playerId };
                return res.redirect('/me');
            }
        } else if (username && password) {
            // Method 2: Login with username and password
            user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
            if (user && await bcrypt.compare(password, user.password)) {
                req.session.user = { username: user.username, playerId: user.playerId };
                return res.redirect('/me');
            }
        }
        
        // If either method fails
        res.send('Login failed. Please check your credentials. <a href="/login.html">Try again</a>.');

    } catch (error) {
        res.status(500).send('Server error during login.');
    }
});

app.get('/me', isAuthenticated, (req, res) => res.sendFile(path.join(__dirname, 'public', 'private.html')));

app.get('/api/private-data', isAuthenticated, async (req, res) => {
    try {
        const { playerId } = req.session.user;
        const filePath = path.join(__dirname, DATA_FOLDER, `${playerId}.json`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        data.pokemons = data.pokemons.map(p => {
            if (p.isEgg || !p.pokemonDisplay) return p;
            return { ...p, name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName), sprite: pokedexService.getPokemonSprite(p) };
        });
        res.json(data);
    } catch (error) { res.status(404).json({ message: 'Could not find your data file.' }); }
});

// --- Start Server ---
(async () => {
    await pokedexService.initialize();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
})();