let allPokemons = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/private-data')
        .then(response => response.ok ? response.json() : Promise.reject('Could not load data'))
        .then(data => {
            allPokemons = data.pokemons.filter(p => !p.isEgg);
            populateSummaryCards(data);
            setupModalListeners();
        })
        .catch(error => {
            console.error('Dashboard Error:', error);
            document.querySelector('main').innerHTML = `<div class="card"><p>Could not load your player data.</p></div>`;
        });
});

function createBackgroundStyle(colors) {
    if (!colors || colors.length === 0) {
        return 'background-color: #f1f1f1; color: #333; text-shadow: none;';
    }
    if (colors.length === 1) {
        return `background-color: ${colors[0]};`;
    }
    return `background: linear-gradient(135deg, ${colors[0]} 30%, ${colors[1]} 70%);`;
}

function getIvColor(iv) {
    if (iv == 100) return '#ff8000';
    if (iv >= 80) return '#2196f3';
    if (iv >= 60) return '#4caf50';
    return '#6c757d';
}

function setupModalListeners() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    document.getElementById('view-all-pokemon-btn').addEventListener('click', () => {
        document.getElementById('pokemon-count').textContent = allPokemons.length;
        sortAndRenderAllPokemon();
        modalBackdrop.classList.remove('hidden');
    });
    document.getElementById('modal-close-btn').addEventListener('click', () => modalBackdrop.classList.add('hidden'));
    modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) modalBackdrop.classList.add('hidden'); });
    document.getElementById('sort-by').addEventListener('change', sortAndRenderAllPokemon);
    document.getElementById('sort-direction').addEventListener('click', () => {
        const button = document.getElementById('sort-direction');
        const newDirection = button.dataset.direction === 'desc' ? 'asc' : 'desc';
        button.dataset.direction = newDirection;
        button.textContent = newDirection === 'desc' ? '▼ Desc' : '▲ Asc';
        sortAndRenderAllPokemon();
    });
}

function populateSummaryCards(data) {
    const { account, player, items } = data;
    document.getElementById('trainerName').textContent = `My Dashboard: ${account.name}`;
    document.getElementById('timestamp').textContent = `Data as of: ${data.time}`;

    const trainerSummary = document.getElementById('trainer-summary');
    trainerSummary.innerHTML = `<h2>Trainer Summary</h2><div class="trainer-info"><img id="teamLogo" src="" alt="Team Logo" class="team-logo"><div><strong id="trainerLevel"></strong></div></div><div class="xp-bar-container"><div id="xpBar" class="xp-bar"></div></div><p id="xpProgress" class="xp-text"></p><div class="grid-stats"><div><span>Stardust</span><strong id="stardustCount">0</strong></div><div><span>PokéCoins</span><strong id="pokecoinCount">0</strong></div><div><span>Pokémon Caught</span><strong id="pokemonCaught">0</strong></div><div><span>Pokédex Entries</span><strong id="pokedexEntries">0</strong></div><div><span>Distance Walked</span><strong id="kmWalked">0 km</strong></div><div><span>PokéStops Visited</span><strong id="pokestopVisits">0</strong></div></div>`;
    
    const teamLogos = { 1: '#3498DB', 2: '#E74C3C', 3: '#F1C40F' };
    document.getElementById('teamLogo').style.backgroundColor = teamLogos[account.team] || '#ccc';
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
        'Berries': ['GoldenRazzBerry', 'GoldenPinapBerry'],
        'Special Items': ['RareCandy', 'XlRareCandy', 'LuckyEgg', 'StarPiece', 'IncenseOrdinary', 'TroyDisk'],
        'Battle & TMs': ['MoveRerollFastAttack', 'MoveRerollSpecialAttack', 'ShadowGem', 'ShadowGemFragment']
    };
    const categoryLookup = {};
    for (const category in itemCategories) {
        itemCategories[category].forEach(itemName => { categoryLookup[itemName] = category; });
    }
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
        const cardClass = pokemon.typeColors.length > 0 ? 'pokemon-card colored' : 'pokemon-card';
        highlightsContainer.innerHTML += `<div class="${cardClass}" style="${createBackgroundStyle(pokemon.typeColors)}"><img src="${pokemon.sprite}" alt="${name}" loading="lazy"><p class="pokemon-name">${name} ${badges}</p><p class="pokemon-cp">CP ${pokemon.cp}</p></div>`;
    });
}

function sortAndRenderAllPokemon() {
    const sortBy = document.getElementById('sort-by').value;
    const sortDirection = document.getElementById('sort-direction').dataset.direction;
    const container = document.getElementById('all-pokemon-list');
    
    let sortedPokemons = [...allPokemons];
    sortedPokemons.sort((a, b) => {
        switch (sortBy) {
            case 'cp': return a.cp - b.cp;
            case 'pokedex': return a.pokemonId - b.pokemonId;
            case 'name': return (a.nickname || a.name).localeCompare(b.nickname || b.name);
            default: return a.creationTimeMs - b.creationTimeMs;
        }
    });

    if (sortDirection === 'desc') sortedPokemons.reverse();
    container.innerHTML = '';
    
    sortedPokemons.forEach(p => {
        const ivPercent = ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100).toFixed(1);
        const displayName = p.nickname ? `${p.nickname} (${p.name})` : p.name;
        let badges = '';
        if (p.pokemonDisplay?.shiny) badges += '<span class="badge shiny-badge">Shiny</span>';
        if (p.isLucky) badges += '<span class="badge lucky-badge">Lucky</span>';
        if (ivPercent === '100.0') badges += '<span class="badge perfect-badge">Perfect</span>';
        const cardClass = p.typeColors.length > 0 ? 'pokemon-card colored' : 'pokemon-card';

        container.innerHTML += `
            <div class="${cardClass}" style="${createBackgroundStyle(p.typeColors)}">
                <img src="${p.sprite}" alt="${displayName}" loading="lazy">
                <p class="pokemon-name">${displayName} ${badges}</p>
                <p class="pokemon-cp">CP ${p.cp}</p>
                <div class="iv-bar-container">
                    <div class="iv-bar" style="width: ${ivPercent}%; background-color: ${getIvColor(ivPercent)}"></div>
                </div>
                <small>${ivPercent}% (${p.individualAttack}/${p.individualDefense}/${p.individualStamina})</small>
            </div>`;
    });
}