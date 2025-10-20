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
    // NEW muted/matte color palette
    typeColorMap: {
        NORMAL: '#A8A77A', FIRE: '#EE8130', WATER: '#6390F0', GRASS: '#7AC74C', ELECTRIC: '#F7D02C',
        ICE: '#96D9D6', FIGHTING: '#C22E28', POISON: '#A33EA1', GROUND: '#E2BF65', FLYING: '#A98FF3',
        PSYCHIC: '#F95587', BUG: '#A6B91A', ROCK: '#B6A136', GHOST: '#735797', DRAGON: '#6F35FC',
        DARK: '#705746', STEEL: '#B7B7CE', FAIRY: '#D685AD'
    },
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
            console.error('❌ CRITICAL: Could not load Pokédex from local file.', error);
            this.pokedex = {};
        }
    },
    getPokemonName(dexNr, formName) {
        const defaultName = `Pokedex #${dexNr}`;
        if (!this.pokedex[dexNr]) return defaultName;
        const normalEntry = this.pokedex[dexNr]['NORMAL'] || Object.values(this.pokedex[dexNr])[0];
        if (!normalEntry) return defaultName;
        const formKey = formName.replace(normalEntry.names.English.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), '').toUpperCase() || 'NORMAL';
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

        const formNameUpper = p.pokemonDisplay.formName.toUpperCase();
        const baseNameUpper = basePokemon.names.English.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const key = formNameUpper.replace(baseNameUpper, '').replace(/_/g, '').trim();

        let foundAsset = basePokemon.assetForms.find(asset =>
            (asset.form && asset.form.toUpperCase() === key) ||
            (asset.costume && asset.costume.toUpperCase() === key)
        );
        if (!foundAsset) {
            foundAsset = basePokemon.assetForms.find(asset => asset.form === null && asset.costume === null);
        }
        return foundAsset?.[targetSprite] || (p.pokemonDisplay.shiny ? shinySprite : defaultSprite);
    },
    getPokemonTypeColors(pokedexEntry) {
        const colors = [];
        if (pokedexEntry?.primaryType?.type) {
            const type = pokedexEntry.primaryType.type.replace('POKEMON_TYPE_', '');
            colors.push(this.typeColorMap[type] || '#FFFFFF');
        }
        if (pokedexEntry?.secondaryType?.type) {
            const type = pokedexEntry.secondaryType.type.replace('POKEMON_TYPE_', '');
            colors.push(this.typeColorMap[type] || '#FFFFFF');
        }
        return colors;
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
        const { web_username, password, playerId } = req.body;
        if (!web_username || !password || !playerId) {
            return res.status(400).send('Web Username, Password, and Player Support ID are all required.');
        }

        const users = await readUsers();
        const userIndex = users.findIndex(u => u.playerId === playerId);

        if (userIndex === -1) {
            return res.status(404).send('Player ID not found. Please upload your data from the PGSharp app before registering.');
        }

        if (users[userIndex].web_username !== "" || users[userIndex].password !== "") {
            return res.status(409).send('This Player ID has already been registered. <a href="/login.html">Try logging in</a>.');
        }
        
        // Update the existing user with web credentials
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        users[userIndex].web_username = web_username;
        users[userIndex].password = hashedPassword;
        await writeUsers(users);

        res.redirect('/login.html');
    } catch (error) {
        res.status(500).send('Server error during registration.');
    }
});

app.get('/api/rankings', async (req, res) => {
    try {
        const folderPath = path.join(__dirname, DATA_FOLDER);
        await fs.access(folderPath);
        const files = await fs.readdir(folderPath);
        const playerFiles = files.filter(f => f.endsWith('.json'));

        const totalPlayers = playerFiles.length;
        if (totalPlayers === 0) {
            return res.json({ recentPlayers: [], strongestPokemon: [], rarestPokemon: [] });
        }

        let allPokemon = [];
        let recentPlayers = [];
        let shinyOwners = new Set();
        let luckyOwners = new Set();
        let perfectOwners = new Set();
        let maxCpOwners = new Set();

        for (const file of playerFiles) {
            const filePath = path.join(folderPath, file);
            const stats = await fs.stat(filePath);
            const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

            if (!content.account || !content.player || !content.pokemons) continue;

            const playerName = content.account.name;
            const playerId = content.account.playerSupportId;

            // --- 1. Gather Data for Recent Players ---
            const buddy = content.pokemons.find(p => p.id === content.account.buddyPokemonProto?.buddyPokemonId);
            recentPlayers.push({
                name: playerName, playerId,
                buddy: buddy ? { sprite: pokedexService.getPokemonSprite(buddy) } : null,
                kmWalked: content.player.kmWalked.toFixed(1),
                pokemonCaught: content.player.numPokemonCaptured,
                lastUpdate: stats.mtimeMs
            });

            // --- 2 & 3. Gather all Pokémon and check for rarity attributes ---
            content.pokemons.forEach(p => {
                if (!p.isEgg && p.pokemonDisplay) {
                    const getIvPercent = () => ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100);
                    
                    if (p.pokemonDisplay.shiny) shinyOwners.add(playerName);
                    if (p.isLucky) luckyOwners.add(playerName);
                    if (getIvPercent() >= 100) perfectOwners.add(playerName);
                    
                    const pokedexEntry = Object.values(pokedexService.pokedex[p.pokemonId] || {})[0];
                    if (pokedexEntry && p.cp >= (pokedexEntry.stats.attack * 2)) { // Simplified max CP check
                        maxCpOwners.add(playerName);
                    }

                    allPokemon.push({ ...p, owner: playerName, ownerId: playerId });
                }
            });
        }
        
        // --- Process Rankings ---
        const sortedRecentPlayers = recentPlayers.sort((a, b) => b.lastUpdate - a.lastUpdate).slice(0, 50);
        
        const strongestPokemon = [...allPokemon].sort((a, b) => b.cp - a.cp).slice(0, 50).map(p => ({
            name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName),
            sprite: pokedexService.getPokemonSprite(p),
            cp: p.cp, owner: p.owner, ownerId: p.ownerId
        }));
        
        // --- NEW Rarity Showcase Data ---
        const rarityShowcase = [
            { attribute: 'Shiny', percentage: (shinyOwners.size / totalPlayers) * 100, owners: Array.from(shinyOwners).slice(0, 5) },
            { attribute: 'Lucky', percentage: (luckyOwners.size / totalPlayers) * 100, owners: Array.from(luckyOwners).slice(0, 5) },
            { attribute: 'Perfect IVs', percentage: (perfectOwners.size / totalPlayers) * 100, owners: Array.from(perfectOwners).slice(0, 5) },
            { attribute: 'Max CP', percentage: (maxCpOwners.size / totalPlayers) * 100, owners: Array.from(maxCpOwners).slice(0, 5) }
        ];

        res.json({ recentPlayers: sortedRecentPlayers, strongestPokemon, rarityShowcase });

    } catch (error) {
        console.error("Error in /api/rankings:", error);
        res.status(500).json({ message: 'Server error processing rankings.' });
    }
});

app.get('/api/public-data', async (req, res) => {
    try {
        const folderPath = path.join(__dirname, DATA_FOLDER);
        await fs.access(folderPath);
        const files = await fs.readdir(folderPath);

        const playerSummaries = await Promise.all(
            files.filter(f => f.endsWith('.json')).map(async file => {
                const content = JSON.parse(await fs.readFile(path.join(folderPath, file), 'utf-8'));

                // --- Find Buddy Pokémon ---
                const buddyPokemonId = content.account?.buddyPokemonProto?.buddyPokemonId;
                let displayPokemon = null;
                if (buddyPokemonId) {
                    displayPokemon = content.pokemons.find(p => p.id === buddyPokemonId);
                }
                // Fallback to highest CP Pokémon if no buddy is set
                if (!displayPokemon) {
                    displayPokemon = content.pokemons.filter(p => !p.isEgg).sort((a, b) => b.cp - a.cp)[0];
                }
                // ---

                let displayPokemonInfo = { name: 'N/A', cp: 0, sprite: '', typeColors: [] };
                if (displayPokemon) {
                    const pokedexEntry = Object.values(pokedexService.pokedex[displayPokemon.pokemonId] || {})[0];
                    displayPokemonInfo = {
                        name: pokedexService.getPokemonName(displayPokemon.pokemonId, displayPokemon.pokemonDisplay.formName),
                        cp: displayPokemon.cp,
                        sprite: pokedexService.getPokemonSprite(displayPokemon)
                    };
                }

                return {
                    name: content.account.name,
                    level: content.player.level,
                    team: content.account.team,
                    kmWalked: content.player.kmWalked.toFixed(1),
                    displayPokemon: displayPokemonInfo, // This is now the buddy (or fallback)
                    playerId: content.account.playerSupportId
                };
            })
        );
        res.json(playerSummaries);
    } catch { res.json([]); }
});

app.get('/api/player-detail/:playerId', async (req, res) => {
    try {
        const { playerId } = req.params;
        const filePath = path.join(__dirname, DATA_FOLDER, `${path.basename(playerId)}.json`);
        const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

        const allPokemon = content.pokemons.filter(p => !p.isEgg);

        // --- NEW HIGHLIGHTS LOGIC ---
        const highlights = [];
        const addedIds = new Set();

        // 1. Add Recently Caught
        const recentlyCaught = [...allPokemon].sort((a, b) => b.creationTimeMs - a.creationTimeMs)[0];
        if (recentlyCaught) {
            highlights.push(recentlyCaught);
            addedIds.add(recentlyCaught.id);
        }

        // 2. Add Latest Shiny (if it's not already the most recent catch)
        const latestShiny = [...allPokemon].filter(p => p.pokemonDisplay?.shiny).sort((a, b) => b.creationTimeMs - a.creationTimeMs)[0];
        if (latestShiny && !addedIds.has(latestShiny.id)) {
            highlights.push(latestShiny);
            addedIds.add(latestShiny.id);
        }

        // 3. Fill remaining slots with Strongest CP Pokémon
        const strongest = [...allPokemon].sort((a, b) => b.cp - a.cp);
        for (const pokemon of strongest) {
            if (highlights.length >= 4) break;
            if (!addedIds.has(pokemon.id)) {
                highlights.push(pokemon);
                addedIds.add(pokemon.id);
            }
        }
        // --- END OF NEW HIGHLIGHTS LOGIC ---

        // Enrich the selected highlights with names, sprites, and colors
        const enrichedHighlights = highlights.map(p => {
            const pokedexEntry = Object.values(pokedexService.pokedex[p.pokemonId] || {})[0];
            return {
                cp: p.cp,
                name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName),
                sprite: pokedexService.getPokemonSprite(p),
                typeColors: pokedexService.getPokemonTypeColors(pokedexEntry)
            };
        });

        res.json({
            name: content.account.name,
            startDate: new Date(content.account.creationTimeMs).toLocaleDateString(),
            totalXp: content.player.experience,
            pokemonCaught: content.player.numPokemonCaptured,
            pokestopsVisited: content.player.pokeStopVisits,
            kmWalked: content.player.kmWalked,
            highlights: enrichedHighlights // Send the new, curated list
        });
    } catch (error) {
        console.error("Error in /api/player-detail:", error);
        res.status(404).json({ message: 'Player data not found.' });
    }
});

app.post('/api/save-data', express.json({ limit: '10mb' }), async (req, res) => {
    try {
        const data = req.body;
        const name = data?.account?.name;
        const playerId = data?.account?.playerSupportId;

        if (!name || !playerId) {
            if (Object.keys(data).length === 0) {
                console.log('✅ [200 OK] Received a successful connection test (empty JSON object).');
                return res.status(200).json({ success: true, message: 'Connection test successful.' });
            } else {
                console.error("❌ [400 Bad Request] Received a payload but it was missing required fields.");
                return res.status(400).json({ message: 'Payload is missing required account data.' });
            }
        } else {
            console.log(`✅ Received valid data for ${name} (${playerId}).`);
        }

        // Save the data file
        await fs.mkdir(path.join(__dirname, DATA_FOLDER), { recursive: true });
        await fs.writeFile(path.join(__dirname, DATA_FOLDER, `${playerId}.json`), JSON.stringify(data, null, 2));

        const users = await readUsers();
        const userIndex = users.findIndex(u => u.playerId === playerId);

        if (userIndex > -1) {
            // User exists, ONLY update their in-game name.
            users[userIndex].username = name;
            console.log(`- User record found for ${playerId}. Updating in-game name.`);
        } else {
            // User is new, create a placeholder with empty web credentials.
            users.push({
                username: name,
                playerId: playerId,
                password: "",
                web_username: ""
            });
            console.log(`- No user record found for ${playerId}. Creating new placeholder user.`);
        }
        await writeUsers(users);
        
        console.log(`✅ Data for '${name}' was saved successfully.`);
        return res.status(200).json({ message: 'Data saved and user profile updated.' });

    } catch (error) {
        console.error("❌ [500 Server Error] Error in /api/save-data:", error);
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
        } else if (username && password) {
            // Method 2: Login with web_username or in-game name and password
            const loginIdentifier = username.toLowerCase();
            user = users.find(u => 
                (u.web_username && u.web_username.toLowerCase() === loginIdentifier) || 
                u.username.toLowerCase() === loginIdentifier
            );

            // Verify password only if the account has one set (is fully registered)
            if (user && user.password !== "" && !(await bcrypt.compare(password, user.password))) {
                user = null; // Password doesn't match
            }
        }
        
        if (user) {
            req.session.user = { username: user.web_username || user.username, playerId: user.playerId };
            return res.redirect('/me');
        }

        res.send('Login failed. Please check your credentials or register. <a href="/login.html">Try again</a>.');

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
            if (p.isEgg || !p.pokemonDisplay) {
                return p;
            }
            const pokedexEntry = Object.values(pokedexService.pokedex[p.pokemonId] || {})[0];
            return {
                ...p,
                name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName),
                sprite: pokedexService.getPokemonSprite(p),
                typeColors: pokedexService.getPokemonTypeColors(pokedexEntry)
            };
        });
        
        // This is the key change: send a wrapper object
        res.json({
            playerData: data,
            pokedexService: {
                typeColorMap: pokedexService.typeColorMap
            }
        });

    } catch (error) {
        console.error("❌ [500 Server Error] in /api/private-data:", error);
        res.status(500).json({ message: 'A server error occurred while processing your player data.' });
    }
});

// --- Start Server ---
(async () => {
    await pokedexService.initialize();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
})();