const path = require('path');

/**
 * For a production environment, it's highly recommended to use environment variables
 * for sensitive data and configuration that varies between environments.
 * Example: const PORT = process.env.PORT || 3000;
 */

const PORT = 3000;
const DATA_FOLDER = 'pgsharp_player_data';
const USERS_FILE = path.join(__dirname, 'users.json');
const POKEDEX_FILE = path.join(__dirname, 'pokedex.json');
const POKEDEX_API_URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json';
const SALT_ROUNDS = 10;
const SESSION_SECRET = 'your-secret-key-goes-here'; // IMPORTANT: In production, use an environment variable!

const DATA_DIR = path.join(__dirname, 'data');
const RANKINGS_FILE = path.join(DATA_DIR, 'rankings.json');

module.exports = {
    PORT,
    DATA_FOLDER,
    USERS_FILE,
    POKEDEX_FILE,
    POKEDEX_API_URL,
    SALT_ROUNDS,
    SESSION_SECRET,
    DATA_PATH: path.join(__dirname, DATA_FOLDER),
    RANKINGS_FILE
};
