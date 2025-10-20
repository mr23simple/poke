const { createApp, ref, computed, onMounted } = Vue;

// --- Global Helper Functions ---
function createBackgroundStyle(colors) {
    if (!colors || colors.length === 0) return '';
    if (colors.length === 1) return `background-color: ${colors[0]};`;
    return `background: linear-gradient(135deg, ${colors[0]} 30%, ${colors[1]} 70%);`;
}

function getIvColor(iv) {
    if (iv >= 100) return '#ff8000';
    if (iv >= 80) return '#2196f3';
    if (iv >= 60) return '#4caf50';
    return '#6c757d';
}

// --- Vue Components ---
const GridComponent = {
    props: ['pokemons'],
    template: `
        <div id="all-pokemon-list">
            <div v-for="p in pokemons" :key="p.id" :class="getCardClass(p)" :style="createBackgroundStyle(p.typeColors)">
                <img :src="p.sprite" :alt="displayName(p)" loading="lazy">
                <p class="pokemon-name" v-html="getBadges(p, displayName(p))"></p>
                <p class="pokemon-cp">CP {{ p.cp }}</p>
                <div class="iv-bar-container">
                    <div class="iv-bar" :style="{ width: getIvPercent(p) + '%', backgroundColor: getIvColor(getIvPercent(p)) }"></div>
                </div>
                <small>{{ getIvPercent(p) }}% ({{ p.individualAttack }}/{{ p.individualDefense }}/{{ p.individualStamina }})</small>
            </div>
        </div>
    `,
    methods: {
        getIvPercent(p) { return p ? ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100).toFixed(1) : 0; },
        displayName(p) { return p.nickname || p.name; },
        getBadges(p, name) {
            let badgesHTML = name;
            if (p.pokemonDisplay?.shiny) badgesHTML += ' <span class="badge shiny-badge">Shiny</span>';
            if (p.isLucky) badgesHTML += ' <span class="badge lucky-badge">Lucky</span>';
            if (this.getIvPercent(p) >= 100) badgesHTML += ' <span class="badge perfect-badge">Perfect</span>';
            return badgesHTML;
        },
        getCardClass(p) { return p.typeColors && p.typeColors.length > 0 ? 'pokemon-card colored' : 'pokemon-card'; },
        createBackgroundStyle,
        getIvColor
    }
};

// --- Main Vue App Instance ---
createApp({
    components: {
        'grid-component': GridComponent
    },
    setup() {
        // --- State ---
        const loading = ref(true);
        const allPokemons = ref([]);
        const account = ref({});
        const player = ref({});
        const items = ref([]);
        const pokedexService = ref({ typeColorMap: {} });
        const showModal = ref(false);
        const searchQuery = ref('');
        const sortKey = ref('caughtTime');
        const defaultSortDirections = { caughtTime: 'desc', cp: 'desc', pokedex: 'asc', name: 'asc' };
        const sortDirection = ref(defaultSortDirections.caughtTime);

        // --- Computed Properties ---
        const teamColor = computed(() => {
            const teamColors = { 1: '#3498DB', 2: '#E74C3C', 3: '#F1C40F' };
            return teamColors[account.value.team] || '#ccc';
        });
        const xpPercentage = computed(() => {
            if (!player.value.nextLevelExp) return 0;
            const xpForLevel = player.value.nextLevelExp - player.value.prevLevelExp;
            const xpProgress = player.value.experience - player.value.prevLevelExp;
            return Math.max(0, (xpProgress / xpForLevel) * 100);
        });
        const xpProgressText = computed(() => {
             if (!player.value.nextLevelExp) return "0 / 0 XP";
            const xpForLevel = player.value.nextLevelExp - player.value.prevLevelExp;
            const xpProgress = player.value.experience - player.value.prevLevelExp;
            return `${Math.max(0, xpProgress).toLocaleString()} / ${xpForLevel.toLocaleString()} XP`;
        });
        const stardust = computed(() => account.value.currencyBalance?.find(c => c.currencyType === 'STARDUST')?.quantity || 0);
        const pokecoins = computed(() => account.value.currencyBalance?.find(c => c.currencyType === 'POKECOIN')?.quantity || 0);
        const getIvPercent = (p) => p ? ((p.individualAttack + p.individualDefense + p.individualStamina) / 45 * 100).toFixed(1) : 0;
        
        const highlights = computed(() => {
            if (!allPokemons.value || allPokemons.value.length === 0) return [];
            const sorted = [...allPokemons.value].sort((a, b) => b.cp - a.cp);
            const uniqueHighlights = [...new Set([...sorted.filter(p => getIvPercent(p) >= 100), ...sorted.filter(p => p.pokemonDisplay?.shiny), ...sorted.filter(p => p.isLucky), ...sorted])];
            return uniqueHighlights.slice(0, 8);
        });
        
        const itemCategoryOrder = ['Poké Balls', 'Potions & Revives', 'Berries', 'Special Items', 'Battle & TMs', 'Miscellaneous'];
        const groupedItems = computed(() => {
            if (!items.value) return {};
            const itemCategories = {
                'Poké Balls': ['PokeBall', 'GreatBall', 'UltraBall'], 'Potions & Revives': ['Potion', 'SuperPotion', 'HyperPotion', 'MaxPotion', 'Revive', 'MaxRevive'], 'Berries': ['GoldenRazzBerry', 'GoldenPinapBerry', 'RazzBerry', 'PinapBerry', 'NanabBerry'], 'Special Items': ['RareCandy', 'XlRareCandy', 'LuckyEgg', 'StarPiece', 'IncenseOrdinary', 'TroyDisk'], 'Battle & TMs': ['MoveRerollFastAttack', 'MoveRerollSpecialAttack', 'ShadowGem', 'ShadowGemFragment']
            };
            const categoryLookup = {};
            for (const category in itemCategories) { itemCategories[category].forEach(itemName => { categoryLookup[itemName] = category; }); }
            return items.value.filter(item => item.count > 0 && !item.itemName.includes('Unlimited') && !item.itemName.includes('Camera')).reduce((groups, item) => {
                const category = categoryLookup[item.itemName] || 'Miscellaneous';
                if (!groups[category]) groups[category] = [];
                groups[category].push(item);
                return groups;
            }, {});
        });
        
        const filteredPokemon = computed(() => {
            let pokemons = [...allPokemons.value];
            const searchTerms = searchQuery.value.toLowerCase().trim().split(',').map(term => term.trim()).filter(term => term);
            if (searchTerms.length > 0) {
                pokemons = pokemons.filter(p => {
                    if (!p.pokemonDisplay) return false;
                    return searchTerms.every(term => {
                        const isNegated = term.startsWith('!');
                        const searchTerm = isNegated ? term.substring(1) : term;
                        let match = false;
                        
                        const types = (p.typeColors || []).map(color => {
                            for (const type in pokedexService.value.typeColorMap) {
                                if (pokedexService.value.typeColorMap[type] === color) return type.toLowerCase();
                            }
                        });
                        if (types.includes(searchTerm)) match = true;
                        else if ((p.name || '').toLowerCase().includes(searchTerm) || (p.nickname || '').toLowerCase().includes(searchTerm)) match = true;
                        else if (searchTerm === 'shiny' && p.pokemonDisplay.shiny) match = true;
                        else if (searchTerm === 'lucky' && p.isLucky) match = true;
                        else if (searchTerm === 'perfect' && getIvPercent(p) >= 100) match = true;
                        return isNegated ? !match : match;
                    });
                });
            }
            pokemons.sort((a, b) => {
                let valA, valB;
                switch (sortKey.value) {
                    case 'cp': valA = a.cp; valB = b.cp; break;
                    case 'pokedex': valA = a.pokemonId; valB = b.pokemonId; break;
                    case 'name': return (a.nickname || a.name).localeCompare(b.nickname || b.name);
                    default: valA = a.creationTimeMs; valB = b.creationTimeMs; break;
                }
                return valA - valB;
            });
            if (sortDirection.value === 'desc') pokemons.reverse();
            return pokemons;
        });

        // --- Methods ---
        const toggleSortDirection = () => { sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'; };
        const getItemSprite = (itemId) => `https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/Bag/ic_item_${String(itemId).padStart(4, '0')}.png`;
        const getCardClass = (p) => p.typeColors && p.typeColors.length > 0 ? 'pokemon-card colored' : 'pokemon-card';
        // THIS IS THE FIX: The getBadges function is now available to the main template
        const getBadges = (p, name) => {
            let badgesHTML = name;
            if (p.pokemonDisplay?.shiny) badgesHTML += ' <span class="badge shiny-badge">Shiny</span>';
            if (p.isLucky) badgesHTML += ' <span class="badge lucky-badge">Lucky</span>';
            if (getIvPercent(p) >= 100) badgesHTML += ' <span class="badge perfect-badge">Perfect</span>';
            return badgesHTML;
        };

        // --- Lifecycle Hook ---
        onMounted(async () => {
            try {
                const response = await fetch('/api/private-data');
                if (!response.ok) throw new Error((await response.json()).message || 'Could not load data.');
                const responseData = await response.json();
                
                allPokemons.value = responseData.playerData.pokemons.filter(p => !p.isEgg && p.pokemonId !== 0);
                account.value = responseData.playerData.account || {};
                player.value = responseData.playerData.player || {};
                items.value = responseData.playerData.items || [];
                pokedexService.value = responseData.pokedexService || { typeColorMap: {} };
            } catch (error) {
                console.error('Dashboard Error:', error);
                document.querySelector('.container').innerHTML = `<div class="card"><p>Could not load your player data. Reason: ${error.message}</p></div>`;
            } finally {
                loading.value = false;
            }
        });

        return {
            loading, account, player, items, showModal, searchQuery, sortKey, sortDirection,
            teamColor, xpPercentage, xpProgressText, stardust, pokecoins, highlights,
            groupedItems, itemCategoryOrder, filteredPokemon,
            toggleSortDirection, getItemSprite, createBackgroundStyle, getIvPercent, getCardClass, getBadges
        };
    }
}).mount('#app');