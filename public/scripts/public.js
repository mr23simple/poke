/**
 * This script handles the functionality for the public player dashboard.
 * It fetches ranking data, populates the leaderboards, and manages the player detail modal.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // --- ELEMENT REFERENCES ---
    const loadingMessage = document.getElementById('loading-message');
    const rankingsGrid = document.getElementById('rankings-grid');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');

    // Function to mask username
    const maskUsername = (username) => {
        if (!username || username.length <= 2) {
            return username;
        }
        return username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    };

    function openRarityCalculationModal(pokemon) {
        const getStatLine = (label, score) => {
            if (!score || score <= 1) return '';
            return `<li><span>${label}</span><span>1 in ${Math.round(score).toLocaleString()}</span></li>`;
        };

        modalContent.innerHTML = `
            <button id="modal-close-btn">&times;</button>
            <div class="rarity-modal-header">
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
                <div class="pokemon-info">
                    <h2>${pokemon.name}</h2>
                    <p>Owner: ${maskUsername(pokemon.owner)}</p>
                </div>
            </div>
            <div class="rarity-modal-score">
                <h3>Total Rarity: 1 in ${Math.round(pokemon.rarity.score).toLocaleString()}</h3>
            </div>
            <div class="rarity-modal-body">
                <h4>Rarity Factors</h4>
                <ul class="stat-breakdown-list">
                    ${getStatLine('Perfect IVs', pokemon.rarity.breakdown.iv)}
                    ${getStatLine('Shiny', pokemon.rarity.breakdown.shiny)}
                    ${getStatLine('Lucky', pokemon.rarity.breakdown.lucky)}
                </ul>
            </div>
        `;
        modalBackdrop.classList.remove('hidden');
        document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.add('hidden');
    }

    // --- HELPER FUNCTIONS ---

    /**
     * Creates a background style (solid or gradient) for a Pokémon card.
     * @param {string[]} colors - An array of hex color codes for Pokémon types.
     * @returns {string} The inline CSS style string.
     */
    function createBackgroundStyle(colors) {
        if (!colors || colors.length === 0) return 'color: #333; text-shadow: none;';
        if (colors.length === 1) return `background-color: ${colors[0]};`;
        return `background: linear-gradient(135deg, ${colors[0]} 30%, ${colors[1]} 70%);`;
    }

    /**
     * Fetches detailed data for a specific player and displays it in a modal.
     * @param {string} playerId - The unique ID of the player to display.
     */
    async function openPlayerModal(playerId) {
        try {
            const detailRes = await fetch(`/api/player-detail/${playerId}`);
            if (!detailRes.ok) throw new Error('Could not fetch player details.');
            const details = await detailRes.json();

            modalContent.innerHTML = `
                <button id="modal-close-btn">&times;</button>
                <h2>${maskUsername(details.name)}</h2>
                <div class="grid-stats">
                    <div><span>Total XP</span><strong>${details.totalXp.toLocaleString()}</strong></div>
                    <div><span>Pokémon Caught</span><strong>${details.pokemonCaught.toLocaleString()}</strong></div>
                    <div><span>Distance Walked</span><strong>${details.kmWalked.toFixed(1)} km</strong></div>
                    <div><span>PokéStops Visited</span><strong>${details.pokestopsVisited.toLocaleString()}</strong></div>
                </div>
                
                <h3>Highlights</h3>
                <div id="modal-pokemon-container">
                    ${details.highlights.map(p => {
                        const cardClass = p.typeColors.length > 0 ? 'pokemon-card colored' : 'pokemon-card';
                        return `<div class="${cardClass}" style="${createBackgroundStyle(p.typeColors)}">
                                    <img src="${p.sprite}" alt="${p.name}" loading="lazy">
                                    <p class="pokemon-name">${p.name}</p>
                                    <p class="pokemon-cp">CP ${p.cp}</p>
                                </div>`;
                    }).join('')}
                </div>
            `;
            modalBackdrop.classList.remove('hidden');
            // Attach event listener to the new close button inside the modal
            document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.add('hidden');
        } catch (error) {
            console.error('Failed to open player modal:', error);
        }
    }

    // --- MAIN EXECUTION ---

    try {
        const response = await fetch('/api/rankings');
        if (!response.ok) throw new Error('Failed to load rankings from the server.');
        const rankings = await response.json();

        // 1. Populate "Recent Player Activity" Table
        const recentBody = document.getElementById('recent-players-body');
        recentBody.innerHTML = rankings.recentPlayers.map(player => `
            <tr class="clickable-row" data-player-id="${player.publicId}">
                <td><strong>${maskUsername(player.name)}</strong></td>
                <td>
                    ${player.buddy ? `<img src="${player.buddy.sprite}" alt="${player.buddy.name}" title="${player.buddy.name}">` : 'N/A'}
                </td>
                <td>${player.kmWalked} km</td>
                <td>${player.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join('');

        // 2. Populate "Top 50 Strongest Pokémon" Table
        const strongestBody = document.getElementById('strongest-pokemon-body');
        strongestBody.innerHTML = rankings.strongestPokemon.map((p, index) => `
            <tr class="clickable-row" data-player-id="${p.ownerPublicId}">
                <td>${index + 1}</td>
                <td class="pokemon-cell">
                    <img src="${p.sprite}" alt="${p.name}">
                    <span>${p.name}</span>
                </td>
                <td><strong>${p.cp.toLocaleString()}</strong></td>
                <td>${maskUsername(p.owner)}</td>
            </tr>
        `).join('');

        // 3. Populate "Rarest Pokémon Showcase" Table
        const rarestBody = document.getElementById('rarest-pokemon-body');
        const rarityData = rankings.rarestPokemon; // Store data
        rarestBody.innerHTML = rarityData.map((p, index) => `
            <tr class="clickable-rarity-row" data-index="${index}">
                <td><strong>${p.rarity ? Math.round(p.rarity.score).toLocaleString() : 'N/A'}</strong></td>
                <td class="pokemon-cell">
                    <img src="${p.sprite}" alt="${p.name}">
                    <span>${p.name}</span>
                </td>
                <td class="badges-cell">
                    ${p.isShiny ? '<span class="badge shiny-badge">Shiny</span>' : ''}
                    ${p.isLucky ? '<span class="badge lucky-badge">Lucky</span>' : ''}
                    ${p.isPerfect ? '<span class="badge perfect-badge">Perfect</span>' : ''}
                    ${p.isShadow ? '<span class="badge shadow-badge">Shadow</span>' : ''}
                    ${p.isPurified ? '<span class="badge purified-badge">Purified</span>' : ''}
                    ${p.isLegendary ? '<span class="badge legendary-badge">Legendary</span>' : ''}
                    ${p.isMythical ? '<span class="badge mythical-badge">Mythical</span>' : ''}
                </td>
                <td>${maskUsername(p.owner)}</td>
            </tr>
        `).join('');

        // 4. Add Click Event Listeners to all generated rows
        document.getElementById('rankings-grid').addEventListener('click', (event) => {
            const playerRow = event.target.closest('.clickable-row');
            if (playerRow) {
                const playerId = playerRow.dataset.playerId;
                if (playerId) {
                    openPlayerModal(playerId);
                }
                return;
            }

            const rarityRow = event.target.closest('.clickable-rarity-row');
            if (rarityRow) {
                const index = rarityRow.dataset.index;
                const pokemon = rarityData[index];
                if (pokemon) {
                    openRarityCalculationModal(pokemon);
                }
            }
        });

        // Hide loading message and show the rankings grid
        loadingMessage.classList.add('hidden');
        rankingsGrid.classList.remove('hidden');

        // --- Rarity Info Tooltip Logic ---
        const infoBtn = document.querySelector('.info-btn');
        if (infoBtn) {
            const infoTooltip = infoBtn.nextElementSibling;

            infoBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                infoTooltip.classList.toggle('hidden');
            });

            document.addEventListener('click', (event) => {
                if (!infoTooltip.classList.contains('hidden') && !infoBtn.contains(event.target)) {
                    infoTooltip.classList.add('hidden');
                }
            });
        }

    } catch (error) {
        console.error('Failed to initialize public dashboard:', error);
        loadingMessage.innerHTML = '<p>Could not load ranking data. Please try again later.</p>';
    }

    // Add a single event listener to the modal backdrop to handle closing
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            modalBackdrop.classList.add('hidden');
        }
    });
});

