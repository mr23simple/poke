const fs = require('fs/promises');
const path = require('path');
const fetch = require('node-fetch');
const { POKEDEX_API_URL, POKEDEX_FILE, DATA_DIR, SHINY_RATES_FILE, POKEDEX_RAW_FILE, COSTUME_ID_MAP_FILE, MOVE_ID_MAP_FILE, FAST_MOVES_FILE, CHARGED_MOVES_FILE } = require('../config');

const pokedexService = {
    pokedex: null,
    moveMap: {},
    shinyRates: null,
    shinyPokemonTiers: null,
    defaultShinyTier: 'standard',
    costumeIdMap: {},
    // NEW muted/matte color palette
    typeColorMap: {
        NORMAL: '#A8A77A', FIRE: '#EE8130', WATER: '#6390F0', GRASS: '#7AC74C', ELECTRIC: '#F7D02C',
        ICE: '#96D9D6', FIGHTING: '#C22E28', POISON: '#A33EA1', GROUND: '#E2BF65', FLYING: '#A98FF3',
        PSYCHIC: '#F95587', BUG: '#A6B91A', ROCK: '#B6A136', GHOST: '#735797', DRAGON: '#6F35FC',
        DARK: '#705746', STEEL: '#B7B7CE', FAIRY: '#D685AD'
    },
    async initialize() {
        // Ensure the data directory exists
        await fs.mkdir(DATA_DIR, { recursive: true });

        // Check for pokedex.json in the root directory and move it if found
        const oldPokedexPath = path.join(process.cwd(), 'pokedex.json');
        try {
            await fs.access(oldPokedexPath);
            console.log('Found pokedex.json in root directory. Moving to new data directory...');
            await fs.rename(oldPokedexPath, POKEDEX_FILE);
            console.log('pokedex.json moved successfully.');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('Error checking for old pokedex.json:', error);
            }
        }

        // Step 1: Download raw Pokédex data and save to a temporary file
        try {
            console.log('🔄 Fetching latest Pokédex data from API...');
            const response = await fetch(POKEDEX_API_URL);
            if (!response.ok) throw new Error(`API fetch failed with status ${response.status}`);
            const pokedexJson = await response.text();
            await fs.writeFile(POKEDEX_RAW_FILE, pokedexJson); // Save raw data
            console.log('✅ Successfully downloaded raw Pokédex data.');
        } catch (error) {
            console.warn(`⚠️ Could not fetch latest Pokédex: ${error.message}`);
            console.log('↪️ Attempting to use existing local raw file as a fallback.');
        }

        // Step 2: Read raw data, clean form names, and save to official pokedex.json
        try {
            const rawPokedexJson = await fs.readFile(POKEDEX_RAW_FILE, 'utf-8');
            const rawData = JSON.parse(rawPokedexJson);
            
            const cleanedData = [];
            rawData.forEach(pokemon => {
                // Normalize formId for the main entry
                let formKey = pokemon.formId;
                const englishNameUpper = pokemon.names.English.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
                if (formKey.toUpperCase().includes(englishNameUpper)) {
                    formKey = formKey.toUpperCase().replace(englishNameUpper, '');
                }
                formKey = formKey.toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
                if (!formKey || formKey === 'UNSET') {
                    formKey = 'NORMAL';
                }
                pokemon.formId = formKey; // Update the formId in the object

                // Also normalize form/costume in assetForms if they exist
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
                cleanedData.push(pokemon);
            });

            await fs.writeFile(POKEDEX_FILE, JSON.stringify(cleanedData, null, 2)); // Save cleaned data
            console.log('✅ Successfully cleaned and saved Pokédex data.');
        } catch (error) {
            console.error('❌ CRITICAL: Could not clean and save Pokédex data.', error);
            // Fallback to trying to load existing cleaned file if cleaning failed
        }

        // Step 3: Load the cleaned Pokédex data into memory
        try {
            const localPokedexJson = await fs.readFile(POKEDEX_FILE, 'utf-8');
            const data = JSON.parse(localPokedexJson);
            this.pokedex = {};
            const stringMoveMap = {}; // Initialize here

            data.forEach(pokemon => {
                const dexKey = pokemon.dexNr;
                if (!this.pokedex[dexKey]) this.pokedex[dexKey] = {};

                let formKey = pokemon.formId;
                formKey = formKey.toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
                if (!formKey || formKey === 'UNSET') {
                    formKey = 'NORMAL';
                }
                this.pokedex[dexKey][formKey] = pokemon;

                // Populate stringMoveMap with all moves
                Object.values(pokemon.quickMoves || {}).forEach(move => stringMoveMap[move.id] = move.names.English);
                Object.values(pokemon.cinematicMoves || {}).forEach(move => stringMoveMap[move.id] = move.names.English);
                Object.values(pokemon.eliteQuickMoves || {}).forEach(move => stringMoveMap[move.id] = move.names.English);
              Object.values(pokemon.eliteCinematicMoves || {}).forEach(move => stringMoveMap[move.id] = move.names.English);
            });

            console.log(`👍 Pokédex is now loaded with ${Object.keys(this.pokedex).length} entries.`);

            // Load moves from the new JSON files, fetching if they don't exist
            try {
                await fs.access(FAST_MOVES_FILE);
                await fs.access(CHARGED_MOVES_FILE);
            } catch (error) {
                console.log('🔄 Move files not found, fetching from pogoapi.net...');
                try {
                    const fastMovesResponse = await fetch('https://pogoapi.net/api/v1/fast_moves.json');
                    const chargedMovesResponse = await fetch('https://pogoapi.net/api/v1/charged_moves.json');
                    if (!fastMovesResponse.ok || !chargedMovesResponse.ok) throw new Error('Failed to fetch from pogoapi.net');
                    
                    const fastMovesJson = await fastMovesResponse.text();
                    const chargedMovesJson = await chargedMovesResponse.text();

                    await fs.writeFile(FAST_MOVES_FILE, fastMovesJson);
                    await fs.writeFile(CHARGED_MOVES_FILE, chargedMovesJson);
                    console.log('✅ Successfully downloaded and saved move files.');
                } catch (fetchError) {
                    console.error('❌ CRITICAL: Failed to fetch and save move files:', fetchError);
                }
            }

            // **FIXED BLOCK**: Removed the redundant outer try {} and duplicate file reads.
            // This block now correctly reads the files (fetched or existing) and processes them,
            // overwriting the moveMap with the pogoapi.net data.
            try {
                const fastMovesContent = await fs.readFile(FAST_MOVES_FILE, 'utf-8');
                const chargedMovesContent = await fs.readFile(CHARGED_MOVES_FILE, 'utf-8');
                const fastMoves = JSON.parse(fastMovesContent);
                const chargedMoves = JSON.parse(chargedMovesContent);
    
                const finalMoveMap = {};
                fastMoves.forEach(move => {
                    finalMoveMap[move.move_id] = move.name;
                });
                chargedMoves.forEach(move => {
                    finalMoveMap[move.move_id] = move.name;
                });
                this.moveMap = finalMoveMap;
                console.log(`👍 Move map is now loaded with ${Object.keys(this.moveMap).length} entries.`);
            } catch (error) {
                console.error('❌ CRITICAL: Could not load or process move files.', error);
            }
    
        } catch (error) {
            console.error('❌ CRITICAL: Could not load Pokédex from local file.', error);
            this.pokedex = {};
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
    getShinyRate(pokemonId, origin, pokemonClass, originEvents) {
        if (!this.shinyRates) return this.shinyRates?.['standard'] || 512;

        // Priority for event-based rates
        if (originEvents && originEvents.some(event => event.includes('community_day'))) {
            return this.shinyRates['community-day'];
        }

        // Priority for origin-based rates
        if (origin === 14 || origin === 3) { // Raid or GO (which can be raid)
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

        // Fallback to pokemon-specific rates
        const tier = this.shinyPokemonTiers[pokemonId] || this.defaultShinyTier;
        return this.shinyRates[tier] || this.shinyRates[this.defaultShinyTier] || 512;
    },
    getPokemonName(dexNr, formName) {
        const defaultName = `Pokedex #${dexNr}`;
        if (!this.pokedex[dexNr]) return defaultName;
        const normalEntry = this.pokedex[dexNr]['NORMAL'] || Object.values(this.pokedex[dexNr])[0];
        if (!normalEntry) return defaultName;
        // **FIXED LINE**: Added full cleaning to the formKey to match the logic in initialize()
        const formKey = formName.replace(normalEntry.names.English.normalize("NFD").replace(/[̀-ͯ]/g, ""), '').toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim() || 'NORMAL';
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
        const baseNameUpper = basePokemon.names.English.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        let formKey = formNameUpper.replace(baseNameUpper, '').replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
        if (formKey === "" || formKey === "NORMAL") formKey = null;

        let costumeKey = null;
        const costumeId = p.pokemonDisplay.costume;
        if (costumeId && this.costumeIdMap[costumeId]) {
            costumeKey = this.costumeIdMap[costumeId].toUpperCase().replace(/_/g, '').replace(/-/g, '').replace(/\s/g, '').trim();
        }

        let foundAsset = null;

        // 1. Perfect match: costume and form
        if (costumeKey && formKey) {
            foundAsset = basePokemon.assetForms.find(asset => asset.costume === costumeKey && asset.form === formKey);
        }

        // 2. Costume match, no form
        if (!foundAsset && costumeKey) {
            foundAsset = basePokemon.assetForms.find(asset => asset.costume === costumeKey && !asset.form);
        }

        // 3. Form match, no costume
        if (!foundAsset && formKey) {
            foundAsset = basePokemon.assetForms.find(asset => asset.form === formKey && !asset.costume);
        }

        // 4. Default: no costume, no form
        if (!foundAsset) {
            foundAsset = basePokemon.assetForms.find(asset => !asset.costume && !asset.form);
        }
        
        // 5. Fallback to normal form, no costume
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