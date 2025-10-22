const fs = require('fs/promises');
const path = require('path');
const fetch = require('node-fetch');
const { POKEDEX_API_URL, POKEDEX_FILE, DATA_DIR } = require('../config');

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
        const formKey = formName.replace(normalEntry.names.English.normalize("NFD").replace(/[̀-ͯ]/g, ""), '').toUpperCase() || 'NORMAL';
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

module.exports = pokedexService;
