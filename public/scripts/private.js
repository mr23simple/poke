let allPokemons = [];
let pokedexService = {};
let pokemonVGrid; // This will hold the VGrid instance

// --- HELPER FUNCTIONS ---
function createBackgroundStyle(colors) {
    if (!colors || colors.length === 0) return '';
    if (colors.length === 1) return `background-color: ${colors[0]};`;
    return `background: linear-gradient(135deg, ${colors[0]} 30%, ${colors[1]} 70%);`;
}

function getIvColor(iv) {
    if (iv == 100) return '#ff8000';
    if (iv >= 80) return '#2196f3';
    if (iv >= 60) return '#4caf50';
    return '#6c757d';
}

// --- MAIN FUNCTION to Filter, Sort, and Render ---
function filterAndSortAndRender() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase().trim();
    const searchTerms = searchInput.split(',').map(term => term.trim()).filter(term => term);
    
    const getIvPercent = (p) => ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100).toFixed(1);

    // 1. Filter Pokémon
    const filteredPokemons = searchTerms.length > 0 ? allPokemons.filter(p => {
        if (!p.pokemonDisplay) return false;
        return searchTerms.every(term => {
            const isNegated = term.startsWith('!');
            const searchTerm = isNegated ? term.substring(1) : term;
            let match = false;
            
            const types = (p.typeColors || []).map(color => {
                for (const type in window.pokedexService.typeColorMap) {
                    if (window.pokedexService.typeColorMap[type] === color) return type.toLowerCase();
                }
                return null;
            }).filter(Boolean);

            if (types.includes(searchTerm)) match = true;
            else if ((p.name || '').toLowerCase().includes(searchTerm) || (p.nickname || '').toLowerCase().includes(searchTerm)) match = true;
            else if (searchTerm === 'shiny' && p.pokemonDisplay.shiny) match = true;
            else if (searchTerm === 'lucky' && p.isLucky) match = true;
            else if (searchTerm === 'perfect' && getIvPercent(p) === '100.0') match = true;

            return isNegated ? !match : match;
        });
    }) : allPokemons;

    document.getElementById('pokemon-count').textContent = filteredPokemons.length;

    // 2. Sort the filtered list
    const sortBy = document.getElementById('sort-by').value;
    const sortDirection = document.getElementById('sort-direction').dataset.direction;
    let sortedPokemons = [...filteredPokemons];

    sortedPokemons.sort((a, b) => {
        switch (sortBy) {
            case 'cp': return a.cp - b.cp;
            case 'pokedex': return a.pokemonId - b.pokemonId;
            case 'name': return (a.nickname || a.name).localeCompare(b.nickname || b.name);
            default: return a.creationTimeMs - b.creationTimeMs;
        }
    });

    if (sortDirection === 'desc') sortedPokemons.reverse();

    // 3. Render the list using VGrid
    const container = document.getElementById('all-pokemon-list');
    
    // This function defines how to create a single Pokémon card element
    const cardRenderer = (p) => {
        const card = document.createElement('div');
        if (!p.pokemonDisplay) return card;

        const displayName = p.nickname ? `${p.nickname} (${p.name})` : p.name;
        let badges = '';
        if (p.pokemonDisplay.shiny) badges += '<span class="badge shiny-badge">Shiny</span>';
        if (p.isLucky) badges += '<span class="badge lucky-badge">Lucky</span>';
        if (getIvPercent(p) === '100.0') badges += '<span class="badge perfect-badge">Perfect</span>';
        
        card.className = p.typeColors && p.typeColors.length > 0 ? 'pokemon-card colored' : 'pokemon-card';
        card.style.cssText = createBackgroundStyle(p.typeColors);
        
        card.innerHTML = `
            <img src="${p.sprite}" alt="${displayName}" loading="lazy">
            <p class="pokemon-name">${displayName} ${badges}</p>
            <p class="pokemon-cp">CP ${p.cp}</p>
            <div class="iv-bar-container">
                <div class="iv-bar" style="width: ${getIvPercent(p)}%; background-color: ${getIvColor(getIvPercent(p))}"></div>
            </div>
            <small>${getIvPercent(p)}% (${p.individualAttack}/${p.individualDefense}/${p.individualStamina})</small>`;
        return card;
    };

    if (pokemonVGrid) {
        // If the grid already exists, just update its items
        pokemonVGrid.items = sortedPokemons;
    } else {
        // If it's the first time, create the grid
        pokemonVGrid = new VGrid(container, {
            renderer: cardRenderer,
            items: sortedPokemons
        });
    }
}

// --- EVENT LISTENERS & DASHBOARD POPULATION (Unchanged) ---
function setupModalListeners() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    const sortBySelect = document.getElementById('sort-by');
    const sortDirectionButton = document.getElementById('sort-direction');
    const searchBar = document.getElementById('search-bar');
    
    const defaultSortDirections = { caughtTime: 'desc', cp: 'desc', pokedex: 'asc', name: 'asc' };

    function setSortDirection(direction) {
        sortDirectionButton.dataset.direction = direction;
        sortDirectionButton.textContent = direction === 'desc' ? '▼ Desc' : '▲ Asc';
    }

    document.getElementById('view-all-pokemon-btn').addEventListener('click', () => {
        const initialSort = sortBySelect.value;
        setSortDirection(defaultSortDirections[initialSort]);
        filterAndSortAndRender();
        modalBackdrop.classList.remove('hidden');
    });

    document.getElementById('modal-close-btn').addEventListener('click', () => modalBackdrop.classList.add('hidden'));
    modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) modalBackdrop.classList.add('hidden'); });
    
    let searchTimeout;
    searchBar.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => { filterAndSortAndRender(); }, 300);
    });
    
    sortBySelect.addEventListener('change', () => {
        setSortDirection(defaultSortDirections[sortBySelect.value]);
        filterAndSortAndRender();
    });
    sortDirectionButton.addEventListener('click', () => {
        const newDirection = sortDirectionButton.dataset.direction === 'desc' ? 'asc' : 'desc';
        setSortDirection(newDirection);
        filterAndSortAndRender();
    });
}

function populateSummaryCards(data) {
    const { account, player, items } = data.playerData;
    document.getElementById('trainerName').textContent = `My Dashboard: ${account.name}`;
    document.getElementById('timestamp').textContent = `Data as of: ${data.playerData.time}`;

    const trainerSummary = document.getElementById('trainer-summary');
    trainerSummary.innerHTML = `<h2>Trainer Summary</h2><div class="trainer-info"><div id="teamLogo" class="team-logo"></div><div><strong id="trainerLevel"></strong></div></div><div class="xp-bar-container"><div id="xpBar" class="xp-bar"></div></div><p id="xpProgress" class="xp-text"></p><div class="grid-stats"><div><span>Stardust</span><strong id="stardustCount">0</strong></div><div><span>PokéCoins</span><strong id="pokecoinCount">0</strong></div><div><span>Pokémon Caught</span><strong id="pokemonCaught">0</strong></div><div><span>Pokédex Entries</span><strong id="pokedexEntries">0</strong></div><div><span>Distance Walked</span><strong id="kmWalked">0 km</strong></div><div><span>PokéStops Visited</span><strong id="pokestopVisits">0</strong></div></div>`;
    
    const teamColors = { 1: '#3498DB', 2: '#E74C3C', 3: '#F1C40F' };
    document.getElementById('teamLogo').style.backgroundColor = teamColors[account.team] || '#ccc';
    document.getElementById('trainerLevel').textContent = `Lv. ${player.level}`;
    const xpForLevel = player.nextLevelExp - player.prevLevelExp;
    const xpProgress = player.experience - player.prevLevelExp;
    document.getElementById('xpBar').style.width = `${(xpProgress / xpForLevel) * 100}%`;
    document.getElementById('xpProgress').textContent = `${xpProgress.toLocaleString()} / ${xpForLevel.toLocaleString()} XP`;
    document.getElementById('stardustCount').textContent = (account.currencyBalance.find(c => c.currencyType === 'STARDUST')?.quantity || 0).toLocaleString();
    document.getElementById('pokecoinCount').textContent = (account.currencyBalance.find(c => c.currencyType === 'POKECOIN')?.quantity || 0).toLocaleString();
    document.getElementById('pokemonCaught').textContent = player.numPokemonCaptured.toLocaleString();
    document.getElementById('pokedexEntries').textContent = player.numUniquePokedexEntries.toLocaleString();
    document.getElementById('kmWalked').textContent = `${parseFloat(player.kmWalked).toFixed(2)} km`;
    document.getElementById('pokestopVisits').textContent = player.pokeStopVisits.toLocaleString();

    const itemSummary = document.getElementById('item-summary');
    itemSummary.innerHTML = '<h2>Full Item Bag</h2>';
    const itemCategories = {
        'Poké Balls': ['PokeBall', 'GreatBall', 'UltraBall'],
        'Potions & Revives': ['Potion', 'SuperPotion', 'HyperPotion', 'MaxPotion', 'Revive', 'MaxRevive'],
        'Berries': ['GoldenRazzBerry', 'GoldenPinapBerry', 'RazzBerry', 'PinapBerry', 'NanabBerry'],
        'Special Items': ['RareCandy', 'XlRareCandy', 'LuckyEgg', 'StarPiece', 'IncenseOrdinary', 'TroyDisk'],
        'Battle & TMs': ['MoveRerollFastAttack', 'MoveRerollSpecialAttack', 'ShadowGem', 'ShadowGemFragment']
    };
    const categoryLookup = {};
    for (const category in itemCategories) { itemCategories[category].forEach(itemName => { categoryLookup[itemName] = category; }); }
    const groupedItems = items.filter(item => item.count > 0 && !item.itemName.includes('Unlimited') && !item.itemName.includes('Camera')).reduce((groups, item) => {
        const category = categoryLookup[item.itemName] || 'Miscellaneous';
        if (!groups[category]) groups[category] = [];
        groups[category].push(item);
        return groups;
    }, {});
    const categoryOrder = ['Poké Balls', 'Potions & Revives', 'Berries', 'Special Items', 'Battle & TMs', 'Miscellaneous'];
    categoryOrder.forEach(category => {
        if (groupedItems[category]) {
            itemSummary.innerHTML += `<h3 class="item-category-header">${category}</h3>`;
            const gridContainer = document.createElement('div');
            gridContainer.className = 'item-grid-container';
            groupedItems[category].forEach(item => {
                const itemId = String(item.item).padStart(4, '0');
                gridContainer.innerHTML += `<div class="item-card"><img src="https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Bag/ic_item_${itemId}.png" alt="${item.itemName}" loading="lazy" onerror="this.style.display='none'"><span class="item-count-badge">${item.count}</span></div>`;
            });
            itemSummary.appendChild(gridContainer);
        }
    });

    const highlightsContainer = document.getElementById('pokemon-highlights-container');
    highlightsContainer.innerHTML = '';
    const getIvPercent = (p) => ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100).toFixed(1);
    const sorted = [...allPokemons].sort((a, b) => b.cp - a.cp);
    const highlights = [...new Set([...sorted.filter(p => getIvPercent(p) === '100.0'), ...sorted.filter(p => p.pokemonDisplay?.shiny), ...sorted.filter(p => p.isLucky), ...sorted])].slice(0, 8);
    
    highlights.forEach(pokemon => {
        const name = pokemon.nickname || pokemon.name;
        let badges = '';
        if (pokemon.pokemonDisplay?.shiny) badges += '<span class="badge shiny-badge">Shiny</span>';
        if (pokemon.isLucky) badges += '<span class="badge lucky-badge">Lucky</span>';
        if (getIvPercent(pokemon) === '100.0') badges += '<span class="badge perfect-badge">Perfect</span>';
        const cardClass = pokemon.typeColors && pokemon.typeColors.length > 0 ? 'pokemon-card colored' : 'pokemon-card';
        highlightsContainer.innerHTML += `<div class="${cardClass}" style="${createBackgroundStyle(pokemon.typeColors)}"><img src="${pokemon.sprite}" alt="${name}" loading="lazy"><p class="pokemon-name">${name} ${badges}</p><p class="pokemon-cp">CP ${pokemon.cp}</p></div>`;
    });
}

// --- MAIN ENTRY POINT ---
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/private-data')
        .then(response => response.ok ? response.json() : Promise.reject('Could not load data'))
        .then(responseData => {
            const data = responseData.playerData;
            window.pokedexService = { typeColorMap: responseData.pokedexService.typeColorMap };
            allPokemons = data.pokemons.filter(p => !p.isEgg && p.pokemonId !== 0);
            populateSummaryCards(responseData);
            setupModalListeners();
        })
        .catch(error => {
            console.error('Dashboard Error:', error);
            document.querySelector('.container').innerHTML = `<div class="card"><p>Could not load your player data. Reason: ${error.message}</p></div>`;
        });
});