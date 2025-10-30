const fs = require('fs/promises');
const path = require('path');
const fetch = require('node-fetch');
const crypto = require('crypto');
const cron = require('node-cron');

const { POKEDEX_API_URL, POKEDEX_FILE, DATA_DIR, SHINY_RATES_FILE, POKEDEX_RAW_FILE, COSTUME_ID_MAP_FILE, MOVE_ID_MAP_FILE, FAST_MOVES_FILE, CHARGED_MOVES_FILE } = require('../config');

const pokedexService = {
    pokedex: null,
    moveMap: {},
    shinyRates: null,
    shinyPokemonTiers: null,
    defaultShinyTier: 'standard',
    costumeIdMap: {},
    typeColorMap: {
        NORMAL: '#A8A77A', FIRE: '#EE8130', WATER: '#6390F0', GRASS: '#7AC74C', ELECTRIC: '#F7D02C',
        ICE: '#96D9D6', FIGHTING: '#C22E28', POISON: '#A33EA1', GROUND: '#E2BF65', FLYING: '#A98FF3',
        PSYCHIC: '#F95587', BUG: '#A6B91A', ROCK: '#B6A136', GHOST: '#735797', DRAGON: '#6F35FC',
        DARK: '#705746', STEEL: '#B7B7CE', FAIRY: '#D685AD'
    },

    healthStatus: {
        pokedex: { remoteHash: null, localHash: null, lastChecked: null, file: 'pokedex.json' },
        fastMoves: { remoteHash: null, localHash: null, lastChecked: null, file: 'fast_moves.json' },
        chargedMoves: { remoteHash: null, localHash: null, lastChecked: null, file: 'charged_moves.json' },
        cron: { lastRun: null, status: 'Not yet run' }
    },

    async checkForPokedexUpdates() {
        let originalPokedexContent = null;
        try {
            console.log('🔄 Checking for Pokédex updates...');
            const hashesResponse = await fetch('https://pokemon-go-api.github.io/pokemon-go-api/api/hashes.json');
            if (!hashesResponse.ok) {
                throw new Error(`Failed to fetch hashes.json with status ${hashesResponse.status}`);
            }
            const hashes = await hashesResponse.json();
            const remotePokedexHash = hashes.sha512 ? hashes.sha512['pokedex.json'] : undefined;

            if (!remotePokedexHash) {
                throw new Error('Could not find pokedex.json hash in remote hashes.json file.');
            }

            this.healthStatus.pokedex.remoteHash = remotePokedexHash;
            this.healthStatus.pokedex.lastChecked = new Date().toISOString();

            let localPokedexHash = '';
            try {
                originalPokedexContent = await fs.readFile(POKEDEX_RAW_FILE);
                localPokedexHash = crypto.createHash('sha512').update(originalPokedexContent).digest('hex');
                this.healthStatus.pokedex.localHash = localPokedexHash;
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    throw error;
                }
                console.log('No local pokedex.json found. A new one will be downloaded.');
            }

            if (localPokedexHash.toLowerCase() !== remotePokedexHash.toLowerCase()) {
                console.log('Pokédex update available. Downloading new version...');
                const pokedexResponse = await fetch(POKEDEX_API_URL);
                if (!pokedexResponse.ok) {
                    throw new Error(`Failed to download new Pokédex with status ${pokedexResponse.status}`);
                }
                const newPokedexContent = await pokedexResponse.text();
                await fs.writeFile(POKEDEX_RAW_FILE, newPokedexContent);
                console.log('✅ New Pokédex downloaded successfully.');
                return true;
            } else {
                console.log('👍 Pokédex is already up to date.');
                return false;
            }
        } catch (error) {
            console.error(`❌ An error occurred during the Pokédex update check: ${error.message}`);
            if (originalPokedexContent) {
                console.log('Restoring original pokedex.json...');
                await fs.writeFile(POKEDEX_RAW_FILE, originalPokedexContent);
            }
            return false;
        }
    },

    async checkForMoveUpdates() {
        let updated = false;
        try {
            console.log('🔄 Checking for move file updates...');
            const hashesResponse = await fetch('https://pogoapi.net/api/v1/api_hashes.json');
            if (!hashesResponse.ok) {
                throw new Error(`Failed to fetch api_hashes.json with status ${hashesResponse.status}`);
            }
            const remoteHashes = await hashesResponse.json();

            const filesToCheck = [
                { name: 'fast_moves.json', path: FAST_MOVES_FILE },
                { name: 'charged_moves.json', path: CHARGED_MOVES_FILE }
            ];

            for (const file of filesToCheck) {
                const healthKey = file.name === 'fast_moves.json' ? 'fastMoves' : 'chargedMoves';
                const remoteHash = remoteHashes[file.name]?.hash_sha256;
                
                this.healthStatus[healthKey].remoteHash = remoteHash || null;
                this.healthStatus[healthKey].lastChecked = new Date().toISOString();

                if (!remoteHash) {
                    console.warn(`⚠️ Could not find hash for ${file.name} in remote hashes file.`);
                    continue;
                }

                let localHash = '';
                try {
                    const localFileContent = await fs.readFile(file.path);
                    localHash = crypto.createHash('sha256').update(localFileContent).digest('hex');
                    this.healthStatus[healthKey].localHash = localHash;
                } catch (error) {
                    if (error.code !== 'ENOENT') throw error;
                    console.log(`No local ${file.name} found. A new one will be downloaded.`);
                    this.healthStatus[healthKey].localHash = null;
                }

                if (localHash.toLowerCase() !== remoteHash.toLowerCase()) {
                    console.log(`${file.name} update available. Downloading new version...`);
                    const fileResponse = await fetch(`https://pogoapi.net/api/v1/${file.name}`);
                    if (!fileResponse.ok) {
                        throw new Error(`Failed to download ${file.name} with status ${fileResponse.status}`);
                    }
                    const newFileContent = await fileResponse.text();
                    await fs.writeFile(file.path, newFileContent);
                    console.log(`✅ New ${file.name} downloaded successfully.`);
                    updated = true;
                } else {
                    console.log(`👍 ${file.name} is already up to date.`);
                }
            }
        } catch (error) {
            console.error(`❌ An error occurred during the move file update check: ${error.message}`);
            return updated;
        }
        return updated;
    },
    
    async getHealthCheckData() {
        console.log('Serving stored health check data.');
        return this.healthStatus;
    },

    async _processAndLoadPokedex() {
        try {
            const rawPokedexJson = await fs.readFile(POKEDEX_RAW_FILE, 'utf-8');
            const rawData = JSON.parse(rawPokedexJson);
            
            const cleanedData = rawData.map(pokemon => {
                let formKey = pokemon.formId;
                const englishNameUpper = pokemon.names.English.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (formKey.toUpperCase().includes(englishNameUpper)) {
                    formKey = formKey.toUpperCase().replace(englishNameUpper, '');
                }
                formKey = formKey.toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
                if (!formKey || formKey === 'UNSET') {
                    formKey = 'NORMAL';
                }
                pokemon.formId = formKey;

                if (pokemon.assetForms && Array.isArray(pokemon.assetForms)) {
                    pokemon.assetForms.forEach(assetForm => {
                        if (assetForm.form) {
                            assetForm.form = assetForm.form.toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
                        }
                        if (assetForm.costume) {
                            assetForm.costume = assetForm.costume.toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
                        }
                    });
                }
                return pokemon;
            });

            await fs.writeFile(POKEDEX_FILE, JSON.stringify(cleanedData, null, 2));
            console.log('✅ Successfully cleaned and saved Pokédex data.');
        } catch (error) {
            console.error('❌ CRITICAL: Could not clean and save Pokédex data.', error);
        }

        try {
            const localPokedexJson = await fs.readFile(POKEDEX_FILE, 'utf-8');
            const data = JSON.parse(localPokedexJson);
            this.pokedex = {};
            data.forEach(pokemon => {
                const dexKey = pokemon.dexNr;
                if (!this.pokedex[dexKey]) this.pokedex[dexKey] = {};
                let formKey = pokemon.formId || 'NORMAL';
                this.pokedex[dexKey][formKey] = pokemon;
            });
            console.log(`👍 Pokédex is now loaded with ${Object.keys(this.pokedex).length} entries.`);
        } catch (error) {
            console.error('❌ CRITICAL: Could not load Pokédex from local file.', error);
            this.pokedex = {};
        }

        try {
            const fastMovesContent = await fs.readFile(FAST_MOVES_FILE, 'utf-8');
            const chargedMovesContent = await fs.readFile(CHARGED_MOVES_FILE, 'utf-8');
            const fastMoves = JSON.parse(fastMovesContent);
            const chargedMoves = JSON.parse(chargedMovesContent);
    
            const finalMoveMap = {};
            fastMoves.forEach(move => { finalMoveMap[move.move_id] = move.name; });
            chargedMoves.forEach(move => { finalMoveMap[move.move_id] = move.name; });
            this.moveMap = finalMoveMap;
            console.log(`👍 Move map is now loaded with ${Object.keys(this.moveMap).length} entries.`);
        } catch (error) {
            console.error('❌ CRITICAL: Could not load or process move files.', error);
        }

        try {
            const shinyRatesContent = await fs.readFile(SHINY_RATES_FILE, 'utf-8');
            const shinyRatesData = JSON.parse(shinyRatesContent);
            this.shinyRates = shinyRatesData.rates;
            this.shinyPokemonTiers = shinyRatesData.pokemon;
            this.defaultShinyTier = shinyRatesData.default_tier;
            console.log('👍 Shiny rates loaded successfully.');
        } catch (error) {
            console.warn(`⚠️ Could not load shinyRates.json: ${error.message}`);
            this.shinyRates = {};
            this.shinyPokemonTiers = {};
        }

        try {
            const costumeMapContent = await fs.readFile(COSTUME_ID_MAP_FILE, 'utf-8');
            this.costumeIdMap = JSON.parse(costumeMapContent);
            console.log('👍 Costume ID map loaded successfully.');
        } catch (error) {
            console.warn(`⚠️ Could not load costumeIdMap.json: ${error.message}`);
            this.costumeIdMap = {};
        }
    },

    scheduleDailyUpdates() {
        cron.schedule('0 3 * * *', async () => {
            console.log('⏰ Running scheduled daily update check...');
            this.healthStatus.cron.lastRun = new Date().toISOString();
            this.healthStatus.cron.status = 'Running';

            try {
                const pokedexUpdated = await this.checkForPokedexUpdates();
                const movesUpdated = await this.checkForMoveUpdates();

                if (pokedexUpdated || movesUpdated) {
                    console.log('Data was updated, reprocessing and reloading all data...');
                    await this._processAndLoadPokedex();
                }
                console.log('Scheduled check finished successfully.');
                this.healthStatus.cron.status = 'Success';
            } catch (error) {
                console.error('❌ An error occurred during the scheduled daily update:', error);
                this.healthStatus.cron.status = 'Failed';
            }
        }, {
            scheduled: true,
            timezone: "America/New_York"
        });
        console.log('📅 Cron job for daily data updates scheduled.');
    },

    async initialize() {
        await fs.mkdir(DATA_DIR, { recursive: true });

        const oldPokedexPath = path.join(process.cwd(), 'pokedex.json');
        try {
            await fs.access(oldPokedexPath);
            console.log('Found old pokedex.json in root. It will be ignored. Please use the files in the /data directory.');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('Error checking for old pokedex.json:', error);
            }
        }

        await this.checkForPokedexUpdates();
        await this.checkForMoveUpdates();
        await this._processAndLoadPokedex();
        this.scheduleDailyUpdates();
    },

    getShinyRate(pokemonId, origin, pokemonClass, originEvents) {
        if (!this.shinyRates) return this.shinyRates?.['standard'] || 512;
        if (originEvents && originEvents.some(event => event.includes('community_day'))) {
            return this.shinyRates['community-day'];
        }
        if (origin === 14 || origin === 3) { // Raid or GO
            if (pokemonClass === 'POKEMON_CLASS_LEGENDARY' || pokemonClass === 'POKEMON_CLASS_MYTHIC') {
                return this.shinyRates['legendary'];
            }
        }
        if (origin === 26 || origin === 28) { // Rocket Leader/Boss
            return this.shinyRates['rocket-leader'];
        }
        if (origin === 27) { // Rocket Grunt
            return this.shinyRates['rocket-grunt'];
        }
        const tier = this.shinyPokemonTiers[pokemonId] || this.defaultShinyTier;
        return this.shinyRates[tier] || this.shinyRates[this.defaultShinyTier] || 512;
    },

    getPokemonName(dexNr, formName) {
        const defaultName = `Pokedex #${dexNr}`;
        if (!this.pokedex[dexNr]) return defaultName;
        const normalEntry = this.pokedex[dexNr]['NORMAL'] || Object.values(this.pokedex[dexNr])[0];
        if (!normalEntry) return defaultName;
        const formKey = formName.replace(normalEntry.names.English.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), '').toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim() || 'NORMAL';
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
        let formKey = formNameUpper.replace(baseNameUpper, '').replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
        if (formKey === "" || formKey === "NORMAL") formKey = null;

        let costumeKey = null;
        const costumeId = p.pokemonDisplay.costume;
        if (costumeId && this.costumeIdMap[costumeId]) {
            costumeKey = this.costumeIdMap[costumeId].toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
        }

        let foundAsset = null;
        if (costumeKey && formKey) {
            foundAsset = basePokemon.assetForms.find(asset => asset.costume === costumeKey && asset.form === formKey);
        }
        if (!foundAsset && costumeKey) {
            foundAsset = basePokemon.assetForms.find(asset => asset.costume === costumeKey && !asset.form);
        }
        if (!foundAsset && formKey) {
            foundAsset = basePokemon.assetForms.find(asset => asset.form === formKey && !asset.costume);
        }
        if (!foundAsset) {
            foundAsset = basePokemon.assetForms.find(asset => !asset.costume && !asset.form);
        }
        if (!foundAsset) {
            foundAsset = basePokemon.assetForms.find(asset => asset.form === 'NORMAL' && !asset.costume);
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

module.exports = pokedexService;
