const fs = require('fs/promises');
const path = require('path');
let uuidv4;

const { DATA_PATH, DATA_FOLDER, RANKINGS_FILE, DATA_DIR, PUBLIC_ID_MAP_FILE } = require('../config');
const pokedexService = require('./pokedexService');
const { readUsers, writeUsers } = require('./userService');

const playerDataService = {
    publicIdMap: new Map(), // Stores publicId -> playerId mapping
    playerIdToPublicIdMap: new Map(), // Stores playerId -> publicId mapping

    async init() {
        if (!uuidv4) {
            const uuidModule = await import('uuid');
            uuidv4 = uuidModule.v4;
        }
        // Ensure the data directory exists before trying to access map file
        await fs.mkdir(DATA_DIR, { recursive: true });

        // Load publicIdMap from file
        try {
            const mapContent = await fs.readFile(PUBLIC_ID_MAP_FILE, 'utf-8');
            const parsedMap = JSON.parse(mapContent);
            this.publicIdMap = new Map(parsedMap.publicIdMap);
            this.playerIdToPublicIdMap = new Map(parsedMap.playerIdToPublicIdMap);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('publicIdMap.json not found. Initializing from users.json.');
            } else {
                console.error('Error reading or parsing publicIdMap.json. Re-initializing from users.json.', error);
            }
            
            try {
                const users = await readUsers();
                let mapUpdated = false;
                // Ensure maps are clean before regenerating
                this.publicIdMap = new Map();
                this.playerIdToPublicIdMap = new Map();

                for (const user of users) {
                    if (user.playerId) {
                        const newPublicId = uuidv4();
                        this.publicIdMap.set(newPublicId, user.playerId);
                        this.playerIdToPublicIdMap.set(user.playerId, newPublicId);
                        mapUpdated = true;
                    }
                }
                if (mapUpdated) {
                    await this.savePublicIdMap();
                    console.log('publicIdMap regenerated from users.json.');

                    // Force rankings regeneration by deleting the file
                    try {
                        await fs.unlink(RANKINGS_FILE);
                        console.log('Deleted rankings.json to force regeneration.');
                    } catch (unlinkError) {
                        if (unlinkError.code !== 'ENOENT') {
                            console.error('Error deleting rankings.json:', unlinkError);
                        }
                    }
                }
            } catch (recoveryError) {
                console.error('Failed to regenerate publicIdMap from users.json:', recoveryError);
            }
        }
    },

    async savePublicIdMap() {
        const mapData = {
            publicIdMap: Array.from(this.publicIdMap.entries()),
            playerIdToPublicIdMap: Array.from(this.playerIdToPublicIdMap.entries()),
        };
        try {
            await fs.writeFile(PUBLIC_ID_MAP_FILE, JSON.stringify(mapData, null, 2));
        } catch (error) {
            console.error('Error saving publicIdMap.json:', error);
        }
    },

    async generatePublicId(playerId) {
        await this.init(); // Ensure uuidv4 is loaded
        if (this.playerIdToPublicIdMap.has(playerId)) {
            return this.playerIdToPublicIdMap.get(playerId);
        }
        const newPublicId = uuidv4();
        this.publicIdMap.set(newPublicId, playerId);
        this.playerIdToPublicIdMap.set(playerId, newPublicId);
        await this.savePublicIdMap(); // Save map after generating new ID
        return newPublicId;
    },

    async getPlayerIdFromPublicId(publicId) {
        await this.init(); // Ensure publicIdMap is loaded
        const playerId = this.publicIdMap.get(publicId);
        return playerId;
    },

    async initializeRankings() {
        await this.init(); // Ensure uuidv4 and publicIdMap are loaded
        // Ensure the data directory exists
        await fs.mkdir(DATA_DIR, { recursive: true });

        // Check for rankings.json in the root directory and move it if found
        const oldRankingsPath = path.join(process.cwd(), 'rankings.json');
        try {
            await fs.access(oldRankingsPath);
            console.log('Found rankings.json in root directory. Moving to new data directory...');
            await fs.rename(oldRankingsPath, RANKINGS_FILE);
            console.log('rankings.json moved successfully.');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('Error checking for old rankings.json:', error);
            }
        }

        try {
            await fs.access(RANKINGS_FILE);
            return;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('rankings.json not found. Initializing from player data files...');
                await this.generateAndSaveRankings();
            } else {
                console.error('Error accessing rankings.json:', error);
                throw error;
            }
        }
    },

    async generateAndSaveRankings() {
        await this.init(); // Ensure uuidv4 and publicIdMap are loaded
        try {
            await fs.access(DATA_PATH);
            const files = await fs.readdir(DATA_PATH);
            const playerFiles = files.filter(f => f.endsWith('.json') && f !== 'PGSStats.json'); // Exclude PGSStats.json

            const totalPlayers = playerFiles.length;
            if (totalPlayers === 0) {
                const emptyRankings = { recentPlayers: [], strongestPokemon: [], rarestPokemon: [] };
                await fs.writeFile(RANKINGS_FILE, JSON.stringify(emptyRankings, null, 2));
                await this.savePublicIdMap(); // Save map after generating new ID
                return emptyRankings;
            }

            let allPokemon = [];
            let recentPlayers = [];

            const getPokedexEntry = (p) => {
                if (!pokedexService.pokedex || !pokedexService.pokedex[p.pokemonId]) return null;
                const normalEntry = pokedexService.pokedex[p.pokemonId]['NORMAL'] || Object.values(pokedexService.pokedex[p.pokemonId])[0];
                if (!normalEntry) return null;
                const formKey = p.pokemonDisplay.formName.replace(normalEntry.names.English.normalize("NFD").replace(/[̀-ͯ]/g, ""), '').toUpperCase() || 'NORMAL';
                return pokedexService.pokedex[p.pokemonId]?.[formKey] || normalEntry;
            };

            for (const file of playerFiles) {
                const filePath = path.join(DATA_PATH, file);
                const stats = await fs.stat(filePath);
                const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

                if (!content.account || !content.player || !content.pokemons) continue;

                const playerName = content.account.name;
                const playerId = content.account.playerSupportId;
                const publicId = await this.generatePublicId(playerId); // Generate public ID

                const buddy = content.pokemons.find(p => p.id === content.account.buddyPokemonProto?.buddyPokemonId);
                recentPlayers.push({
                    name: playerName,
                    playerId: playerId,
                    publicId: publicId, // Include public ID
                    buddy: buddy && buddy.pokemonDisplay ? {
                        name: pokedexService.getPokemonName(buddy.pokemonId, buddy.pokemonDisplay.formName),
                        sprite: pokedexService.getPokemonSprite(buddy)
                    } : null,
                    kmWalked: content.player.kmWalked.toFixed(1),
                    pokemonCaught: content.player.numPokemonCaptured,
                    lastUpdate: stats.mtimeMs
                });

                content.pokemons.forEach(p => {
                    if (!p.isEgg && p.pokemonDisplay) {
                        const getIvPercent = () => ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100);
                        
                        const ivPercent = getIvPercent();
                        let score = 0;
                        if (ivPercent >= 100) {
                            score += 8 + 8 * (p.cp / 10000);
                        }
                        if (p.pokemonDisplay?.shiny) {
                            score += 8;
                        }
                        if (p.isLucky) {
                            score += 4;
                        }
                        if (p.pokemonDisplay?.shadow) {
                            score += 1;
                        }
                        if (p.pokemonDisplay?.purified) {
                            score += 1.5;
                        }
                        const pokedexEntry = getPokedexEntry(p);
                        if (pokedexEntry?.pokemonClass === 'POKEMON_CLASS_LEGENDARY' || pokedexEntry?.pokemonClass === 'POKEMON_CLASS_MYTHIC') {
                            score += 2;
                        }

                        allPokemon.push({ ...p, owner: playerName, ownerId: playerId, ownerPublicId: publicId, rarityScore: score }); // Include public ID
                    }
                });
            }

            const sortedRecentPlayers = recentPlayers
                .sort((a, b) => b.lastUpdate - a.lastUpdate)
                .slice(0, 50);

            const strongestPokemon = [...allPokemon]
                .sort((a, b) => b.cp - a.cp)
                .slice(0, 50)
                .map(p => ({
                    name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName),
                    sprite: pokedexService.getPokemonSprite(p),
                    cp: p.cp,
                    owner: p.owner,
                    ownerId: p.ownerId,
                    ownerPublicId: p.ownerPublicId // Include public ID
                }));

            const rarestPokemonRanked = [...allPokemon]
                .filter(p => p.rarityScore > 0)
                .sort((a, b) => b.rarityScore - a.rarityScore || b.cp - a.cp)
                .slice(0, 50)
                .map(p => ({
                    rarityScore: p.rarityScore,
                    name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName),
                    sprite: pokedexService.getPokemonSprite(p),
                    owner: p.owner,
                    ownerId: p.ownerId,
                    ownerPublicId: p.ownerPublicId, // Include public ID
                    isShiny: p.pokemonDisplay.shiny,
                    isLucky: p.isLucky,
                    isPerfect: ((p.individualAttack + p.individualDefense + p.individualStamina) / 45) >= 1,
                    isShadow: p.pokemonDisplay.shadow,
                    isPurified: p.pokemonDisplay.purified,
                    isLegendary: getPokedexEntry(p)?.pokemonClass === 'POKEMON_CLASS_LEGENDARY',
                    isMythical: getPokedexEntry(p)?.pokemonClass === 'POKEMON_CLASS_MYTHIC'
                }));

            const rankings = { recentPlayers: sortedRecentPlayers, strongestPokemon, rarestPokemon: rarestPokemonRanked };
            await fs.writeFile(RANKINGS_FILE, JSON.stringify(rankings, null, 2));
            await this.savePublicIdMap(); // Save map after generating new ID
            return rankings;

        } catch (error) {
            console.error("Error in playerDataService.generateAndSaveRankings:", error);
            throw new Error('Server error processing rankings.');
        }
    },

    async updateRankingsForPlayer(playerData) {
        await this.init(); // Ensure uuidv4 and publicIdMap are loaded
        const playerId = playerData.account.playerSupportId;
        const playerName = playerData.account.name;
        const publicId = await this.generatePublicId(playerId); // Generate public ID

        let rankings = { recentPlayers: [], strongestPokemon: [], rarestPokemon: [] };
        try {
            const rankingsContent = await fs.readFile(RANKINGS_FILE, 'utf-8');
            rankings = JSON.parse(rankingsContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('rankings.json not found during update, generating new one.');
                rankings = await this.generateAndSaveRankings();
            } else {
                console.error('Error reading rankings.json for update:', error);
                throw error;
            }
        }

        // --- Update Recent Players ---
        const newRecentPlayerEntry = {
            name: playerName,
            playerId: playerId,
            publicId: publicId, // Include public ID
            buddy: playerData.pokemons.find(p => p.id === playerData.account.buddyPokemonProto?.buddyPokemonId) && playerData.pokemons.find(p => p.id === playerData.account.buddyPokemonProto?.buddyPokemonId).pokemonDisplay ? {
                name: pokedexService.getPokemonName(playerData.pokemons.find(p => p.id === playerData.account.buddyPokemonProto?.buddyPokemonId).pokemonId, playerData.pokemons.find(p => p.id === playerData.account.buddyPokemonProto?.buddyPokemonId).pokemonDisplay.formName),
                sprite: pokedexService.getPokemonSprite(playerData.pokemons.find(p => p.id === playerData.account.buddyPokemonProto?.buddyPokemonId))
            } : null,
            kmWalked: playerData.player.kmWalked.toFixed(1),
            pokemonCaught: playerData.player.numPokemonCaptured,
            lastUpdate: Date.now() // Use current time for last update
        };

        const existingRecentPlayerIndex = rankings.recentPlayers.findIndex(p => p.playerId === playerId);
        if (existingRecentPlayerIndex > -1) {
            rankings.recentPlayers[existingRecentPlayerIndex] = newRecentPlayerEntry;
        } else {
            rankings.recentPlayers.push(newRecentPlayerEntry);
        }
        rankings.recentPlayers = rankings.recentPlayers
            .sort((a, b) => b.lastUpdate - a.lastUpdate)
            .slice(0, 50);

        // --- Re-generate Strongest and Rarest Pokemon (for simplicity) ---
        // In a more complex scenario, this would be incremental too.
        let allPokemon = [];
        const files = await fs.readdir(DATA_PATH);
        const playerFiles = files.filter(f => f.endsWith('.json') && f !== 'PGSStats.json');

        const getPokedexEntry = (p) => {
            if (!pokedexService.pokedex || !pokedexService.pokedex[p.pokemonId]) return null;
            const normalEntry = pokedexService.pokedex[p.pokemonId]['NORMAL'] || Object.values(pokedexService.pokedex[p.pokemonId])[0];
            if (!normalEntry) return null;
            const formKey = p.pokemonDisplay.formName.replace(normalEntry.names.English.normalize("NFD").replace(/[̀-ͯ]/g, ""), '').toUpperCase() || 'NORMAL';
            return pokedexService.pokedex[p.pokemonId]?.[formKey] || normalEntry;
        };

        for (const file of playerFiles) {
            const filePath = path.join(DATA_PATH, file);
            const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

            if (!content.account || !content.player || !content.pokemons) continue;

            const currentOwnerName = content.account.name;
            const currentOwnerId = content.account.playerSupportId;
            const currentOwnerPublicId = await this.generatePublicId(currentOwnerId); // Generate public ID

            content.pokemons.forEach(p => {
                if (!p.isEgg && p.pokemonDisplay) {
                    const getIvPercent = () => ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100);
                    
                    const ivPercent = getIvPercent();
                    let score = 0;
                    if (ivPercent >= 100) {
                        score += 8 + 8 * (p.cp / 10000);
                    }
                    if (p.pokemonDisplay?.shiny) {
                        score += 8;
                    }
                    if (p.isLucky) {
                        score += 4;
                    }
                    if (p.pokemonDisplay?.shadow) {
                        score += 1;
                    }
                    if (p.pokemonDisplay?.purified) {
                        score += 1.5;
                    }
                    const pokedexEntry = getPokedexEntry(p);
                    if (pokedexEntry?.pokemonClass === 'POKEMON_CLASS_LEGENDARY' || pokedexEntry?.pokemonClass === 'POKEMON_CLASS_MYTHIC') {
                        score += 2;
                    }

                    allPokemon.push({ ...p, owner: currentOwnerName, ownerId: currentOwnerId, ownerPublicId: currentOwnerPublicId, rarityScore: score }); // Include public ID
                }
            });
        }

        rankings.strongestPokemon = [...allPokemon]
            .sort((a, b) => b.cp - a.cp)
            .slice(0, 50)
            .map(p => ({
                name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName),
                sprite: pokedexService.getPokemonSprite(p),
                cp: p.cp,
                owner: p.owner,
                ownerId: p.ownerId,
                ownerPublicId: p.ownerPublicId // Include public ID
            }));

        rankings.rarestPokemon = [...allPokemon]
            .filter(p => p.rarityScore > 0)
            .sort((a, b) => b.rarityScore - a.rarityScore || b.cp - a.cp)
            .slice(0, 50)
            .map(p => ({
                rarityScore: p.rarityScore,
                name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName),
                sprite: pokedexService.getPokemonSprite(p),
                owner: p.owner,
                ownerId: p.ownerId,
                ownerPublicId: p.ownerPublicId, // Include public ID
                isShiny: p.pokemonDisplay.shiny,
                isLucky: p.isLucky,
                isPerfect: ((p.individualAttack + p.individualDefense + p.individualStamina) / 45) >= 1,
                isShadow: p.pokemonDisplay.shadow,
                isPurified: p.pokemonDisplay.purified,
                isLegendary: getPokedexEntry(p)?.pokemonClass === 'POKEMON_CLASS_LEGENDARY',
                isMythical: getPokedexEntry(p)?.pokemonClass === 'POKEMON_CLASS_MYTHIC'
            }));

        await fs.writeFile(RANKINGS_FILE, JSON.stringify(rankings, null, 2));
    },

    async getRankings() {
        await this.init(); // Ensure uuidv4 and publicIdMap are loaded
        await this.initializeRankings(); // Ensure rankings.json exists
        try {
            const rankingsContent = await fs.readFile(RANKINGS_FILE, 'utf-8');
            return JSON.parse(rankingsContent);
        } catch (error) {
            console.error("Error reading rankings.json:", error);
            throw new Error('Server error retrieving rankings.');
        }
    },

    async getPublicPlayerSummaries() {
        await this.init(); // Ensure uuidv4 and publicIdMap are loaded
        try {
            await fs.access(DATA_PATH);
            const files = await fs.readdir(DATA_PATH);

            const playerSummaries = await Promise.all(
                files.filter(f => f.endsWith('.json')).map(async file => {
                    const content = JSON.parse(await fs.readFile(path.join(DATA_PATH, file), 'utf-8'));

                    const buddyPokemonId = content.account?.buddyPokemonProto?.buddyPokemonId;
                    let displayPokemon = null;
                    if (buddyPokemonId) {
                        displayPokemon = content.pokemons.find(p => p.id === buddyPokemonId);
                    }
                    if (!displayPokemon) {
                        displayPokemon = content.pokemons.filter(p => !p.isEgg).sort((a, b) => b.cp - a.cp)[0];
                    }

                    let displayPokemonInfo = { name: 'N/A', cp: 0, sprite: '' };
                    if (displayPokemon) {
                        displayPokemonInfo = {
                            name: pokedexService.getPokemonName(displayPokemon.pokemonId, displayPokemon.pokemonDisplay.formName),
                            cp: displayPokemon.cp,
                            sprite: pokedexService.getPokemonSprite(displayPokemon)
                        };
                    }

                    const playerId = content.account.playerSupportId;
                    const publicId = await this.generatePublicId(playerId); // Generate public ID

                    return {
                        name: content.account.name,
                        level: content.player.level,
                        team: content.account.team,
                        kmWalked: content.player.kmWalked.toFixed(1),
                        displayPokemon: displayPokemonInfo,
                        playerId: playerId,
                        publicId: publicId // Include public ID
                    };
                })
            );
            return playerSummaries;
        } catch (error) {
            console.error("Error in playerDataService.getPublicPlayerSummaries:", error);
            return [];
        }
    },

    async getPlayerDetail(playerId) {
        await this.init(); // Ensure uuidv4 and publicIdMap are loaded
        try {
            const filePath = path.join(DATA_PATH, `${playerId}.json`);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const content = JSON.parse(fileContent);

            const allPokemon = content.pokemons.filter(p => !p.isEgg);

            const highlights = [];
            const addedIds = new Set();

            const recentlyCaught = [...allPokemon].sort((a, b) => b.creationTimeMs - a.creationTimeMs)[0];
            if (recentlyCaught) {
                highlights.push(recentlyCaught);
                addedIds.add(recentlyCaught.id);
            }

            const latestShiny = [...allPokemon].filter(p => p.pokemonDisplay?.shiny).sort((a, b) => b.creationTimeMs - a.creationTimeMs)[0];
            if (latestShiny && !addedIds.has(latestShiny.id)) {
                highlights.push(latestShiny);
                addedIds.add(latestShiny.id);
            }

            const strongest = [...allPokemon].sort((a, b) => b.cp - a.cp);
            for (const pokemon of strongest) {
                if (highlights.length >= 4) break;
                if (!addedIds.has(pokemon.id)) {
                    highlights.push(pokemon);
                    addedIds.add(pokemon.id);
                }
            }

            const enrichedHighlights = highlights.map(p => {
                const pokedexEntry = Object.values(pokedexService.pokedex[p.pokemonId] || {})[0];
                return {
                    cp: p.cp,
                    name: pokedexService.getPokemonName(p.pokemonId, p.pokemonDisplay.formName),
                    sprite: pokedexService.getPokemonSprite(p),
                    typeColors: pokedexService.getPokemonTypeColors(pokedexEntry)
                };
            });

            return {
                name: content.account.name,
                startDate: new Date(content.account.creationTimeMs).toLocaleDateString(),
                totalXp: content.player.experience,
                pokemonCaught: content.player.numPokemonCaptured,
                pokestopsVisited: content.player.pokeStopVisits,
                kmWalked: content.player.kmWalked,
                highlights: enrichedHighlights
            };
        } catch (error) {
            console.error("Error in playerDataService.getPlayerDetail:", error);
            throw new Error('Player data not found.');
        }
    },

    async savePlayerData(data) {
        await this.init(); // Ensure uuidv4 and publicIdMap are loaded
        const name = data?.account?.name;
        const playerId = data?.account?.playerSupportId;

        if (!name || !playerId) {
            if (Object.keys(data).length === 0) {
                console.log('✅ [200 OK] Received a successful connection test (empty JSON object).');
                return { success: true, message: 'Connection test successful.' };
            } else {
                console.error("❌ [400 Bad Request] Received a payload but it was missing required fields.");
                throw new Error('Payload is missing required account data.');
            }
        } else {
            console.log(`✅ Received valid data for ${name} (${playerId}).`);
        }

        await fs.mkdir(DATA_PATH, { recursive: true });
        await fs.writeFile(path.join(DATA_PATH, `${playerId}.json`), JSON.stringify(data, null, 2));

        const users = await readUsers();
        const userIndex = users.findIndex(u => u.playerId === playerId);

        if (userIndex > -1) {
            users[userIndex].username = name;
            console.log(`- User record found for ${playerId}. Updating in-game name.`);
        } else {
            users.push({
                username: name,
                playerId: playerId,
                password: "",
                web_username: ""
            });
            console.log(`- No user record found for ${playerId}. Creating new placeholder user.`);
        }
        await writeUsers(users);

        // After saving individual player data, update rankings incrementally
        await this.updateRankingsForPlayer(data);

        console.log(`✅ Data for '${name}' was saved successfully.`);
        return { success: true, message: 'Data saved and user profile updated.' };
    },

    async getPrivatePlayerData(playerId) {
        await this.init(); // Ensure uuidv4 and publicIdMap are loaded
        try {
            const filePath = path.join(DATA_PATH, `${playerId}.json`);
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
            
            return {
                playerData: data,
                pokedexService: {
                    typeColorMap: pokedexService.typeColorMap,
                    pokedex: pokedexService.pokedex
                }
            };

        } catch (error) {
            console.error("❌ [500 Server Error] in playerDataService.getPrivatePlayerData:", error);
            throw new Error('A server error occurred while processing your player data.');
        }
    }
};

module.exports = playerDataService;