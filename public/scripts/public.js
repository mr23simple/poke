/**
 * This script handles the functionality for the public player dashboard.
 * It fetches ranking data, populates the leaderboards, and manages the player detail modal.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // --- ELEMENT REFERENCES ---
    const loadingOverlay = document.getElementById('loading-overlay');
    const rankingsGrid = document.getElementById('rankings-grid');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');

    const cpmTable = {
        1: 0.094, 1.5: 0.13513743, 2: 0.16639787, 2.5: 0.19265091, 3: 0.21573247,
        3.5: 0.23657266, 4: 0.25572005, 4.5: 0.27353038, 5: 0.29024988, 5.5: 0.30605737,
        6: 0.3210876, 6.5: 0.33544503, 7: 0.34921268, 7.5: 0.36245775, 8: 0.3752356,
        8.5: 0.38759241, 9: 0.39956728, 9.5: 0.41119355, 10: 0.4225, 10.5: 0.4329264,
        11: 0.44310755, 11.5: 0.45305995, 12: 0.4627984, 12.5: 0.47233609, 13: 0.48168495,
        13.5: 0.4908558, 14: 0.49985844, 14.5: 0.50870176, 15: 0.51739395, 15.5: 0.52594251,
        16: 0.5343543, 16.5: 0.54263573, 17: 0.5507927, 17.5: 0.55883058, 18: 0.5667545,
        18.5: 0.57456913, 19: 0.5822789, 19.5: 0.5898879, 20: 0.5974, 20.5: 0.60482366,
        21: 0.6121573, 21.5: 0.61940412, 22: 0.6265671, 22.5: 0.63364914, 23: 0.64065295,
        23.5: 0.64758096, 24: 0.65443563, 24.5: 0.66121925, 25: 0.667934, 25.5: 0.67458189,
        26: 0.6811649, 26.5: 0.6876849, 27: 0.69414365, 27.5: 0.70054287, 28: 0.7068842,
        28.5: 0.7131691, 29: 0.7193991, 29.5: 0.72557561, 30: 0.7317, 30.5: 0.734741,
        31: 0.73776948, 31.5: 0.7407895, 32: 0.74378943, 32.5: 0.74677015, 33: 0.7497256,
        33.5: 0.75266097, 34: 0.75557274, 34.5: 0.75847129, 35: 0.76138438, 35.5: 0.76418652,
        36: 0.76698068, 36.5: 0.76975685, 37: 0.7725421, 37.5: 0.77529827, 38: 0.77803515,
        38.5: 0.78076949, 39: 0.7835, 39.5: 0.78623275, 40: 0.7903, 40.5: 0.7928,
        41: 0.7953, 41.5: 0.7978, 42: 0.8003, 42.5: 0.8028, 43: 0.8053, 43.5: 0.8078,
        44: 0.8103, 44.5: 0.8128, 45: 0.8153, 45.5: 0.8178, 46: 0.8203, 46.5: 0.8228,
        47: 0.8253, 47.5: 0.8278, 48: 0.8303, 48.5: 0.8328, 49: 0.8353, 49.5: 0.8378,
        50: 0.8403, 50.5: 0.8428, 51: 0.8453
    };

    function getLevelFromCpm(cpm) {
        let closestLevel = null;
        let minDifference = Infinity;

        for (const level in cpmTable) {
            const difference = Math.abs(cpmTable[level] - cpm);
            if (difference < minDifference) {
                minDifference = difference;
                closestLevel = level;
            }
        }
        return closestLevel;
    }

    // Function to mask username
    const maskUsername = (username) => {
        if (!username || username.length <= 2) {
            return username;
        }
        return username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    };

    function openRarityCalculationModal(pokemon) {
        const getStatLine = (label, breakdown) => {
            if (!breakdown || !breakdown.value || breakdown.value <= 1) return '';
            const description = breakdown.text ? `(${breakdown.text})` : '';
            return `<li><span>${label} ${description}</span><span>1 in ${Math.round(breakdown.value).toLocaleString()}</span></li>`;
        };

        modalContent.innerHTML = `
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
                <div class="pokemon-info">
                    <h2>
                        ${pokemon.name}
                        <span class="badges-container">
                            ${pokemon.isShiny ? '<span class="badge shiny-badge">Shiny</span>' : ''}
                            ${pokemon.isLucky ? '<span class="badge lucky-badge">Lucky</span>' : (pokemon.isTraded ? '<span class="badge traded-badge">Traded</span>' : '')}
                            ${pokemon.isZeroIv ? '<span class="badge zero-iv-badge">0 IV</span>' : ''}
                            ${pokemon.isPerfect ? '<span class="badge perfect-badge">Perfect</span>' : ''}
                            ${pokemon.isShadow ? '<span class="badge shadow-badge">Shadow</span>' : ''}
                            ${pokemon.isPurified ? '<span class="badge purified-badge">Purified</span>' : ''}
                            ${pokemon.isLegendary ? '<span class="badge legendary-badge">Legendary</span>' : ''}
                            ${pokemon.isMythical ? '<span class="badge mythical-badge">Mythical</span>' : ''}
                            ${pokemon.isMaxLevel ? '<span class="badge max-level-badge">Max</span>' : ''}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${maskUsername(pokemon.owner)}</strong></div>
                        <div><span>Rarity Score</span><strong>1 in ${Math.round(pokemon.rarity.score).toLocaleString()}</strong></div>
                    </div>
                </div>
            </div>
            <div class="pokemon-modal-body">
                <h4>Rarity Factors</h4>
                <ul class="stat-breakdown-list">
                    ${getStatLine('Perfect IVs', pokemon.rarity.breakdown.iv)}
                    ${getStatLine('Shiny', pokemon.rarity.breakdown.shiny)}
                    ${getStatLine('Lucky', pokemon.rarity.breakdown.lucky)}
                    ${getStatLine('Origin', pokemon.rarity.breakdown.origin)}
                </ul>
            </div>
        `;
        modalBackdrop.classList.remove('hidden');
        document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.add('hidden');
    }

    function generateBadges(p) {
        const badges = [];
        let hasIvCombo = false;
        let hasShinyCombo = false;
        let hasLuckyCombo = false;
        let hasMaxLevelCombo = false;

        // Highest priority combos
        if (p.isShiny && p.isLucky && p.isPerfect) {
            badges.push('<span class="badge shlundo-badge">Shlundo</span>');
            hasIvCombo = hasShinyCombo = hasLuckyCombo = true;
        } else if (p.isLucky && p.isPerfect) {
            badges.push('<span class="badge lundo-badge">Lundo</span>');
            hasIvCombo = hasLuckyCombo = true;
        } else if (p.isPerfect && p.isMaxLevel) {
            badges.push('<span class="badge max-badge">MAX</span>');
            hasIvCombo = hasMaxLevelCombo = true;
        } else if (p.isShiny && p.isPerfect) {
            badges.push('<span class="badge shundo-badge">Shundo</span>');
            hasIvCombo = hasShinyCombo = true;
        } else if (p.isShiny && p.isZeroIv) {
            badges.push('<span class="badge shnundo-badge">Shnundo</span>');
            hasIvCombo = hasShinyCombo = true;
        }

        // Individual badges (if not part of a combo)
        if (!hasShinyCombo && p.isShiny) badges.push('<span class="badge shiny-badge">Shiny</span>');
        if (!hasLuckyCombo && p.isLucky) {
            badges.push('<span class="badge lucky-badge">Lucky</span>');
        } else if (p.isTraded && !p.isLucky) {
            badges.push('<span class="badge traded-badge">Traded</span>');
        }
        
        if (!hasIvCombo) {
            if (p.isPerfect) badges.push('<span class="badge perfect-badge">Hundo</span>');
            else if (p.isZeroIv) badges.push('<span class="badge zero-iv-badge">Nundo</span>');
        }

        if (!hasMaxLevelCombo && p.isMaxLevel) badges.push('<span class="badge max-level-badge">Max</span>');

        // Other non-conflicting badges
        if (p.isShadow) badges.push('<span class="badge shadow-badge">Shadow</span>');
        if (p.isPurified) badges.push('<span class="badge purified-badge">Purified</span>');
        if (p.isLegendary) badges.push('<span class="badge legendary-badge">Legendary</span>');
        if (p.isMythical) badges.push('<span class="badge mythical-badge">Mythical</span>');

        return badges.join(' ');
    }

    function openPokemonModal(pokemon) {
        const ivAttack = pokemon.iv.attack;
        const ivDefense = pokemon.iv.defense;
        const ivStamina = pokemon.iv.stamina;
        const cpm = pokemon.cpm;

        const level = getLevelFromCpm(cpm);

        modalContent.innerHTML = `
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
                <div class="pokemon-info">
                    <h2>
                        ${pokemon.name}
                        <span class="badges-container">
                            ${generateBadges(pokemon)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${maskUsername(pokemon.owner)}</strong></div>
                        <div><span>CP</span><strong>${pokemon.cp}</strong></div>
                        <div><span>Level</span><strong>${level}</strong></div>
                    </div>
                </div>
            </div>
            <div class="pokemon-modal-body">
                <h4>IV Stats</h4>
                <div class="iv-stats">
                    <div class="stat-bar-container">
                        <span class="stat-label">Attack</span>
                        <div class="stat-bar">
                            <div id="attack-bar" class="stat-bar-fill"></div>
                        </div>
                        <span class="stat-value">${ivAttack}/15</span>
                    </div>
                    <div class="stat-bar-container">
                        <span class="stat-label">Defense</span>
                        <div class="stat-bar">
                            <div id="defense-bar" class="stat-bar-fill"></div>
                        </div>
                        <span class="stat-value">${ivDefense}/15</span>
                    </div>
                    <div class="stat-bar-container">
                        <span class="stat-label">Stamina</span>
                        <div class="stat-bar">
                            <div id="stamina-bar" class="stat-bar-fill"></div>
                        </div>
                        <span class="stat-value">${ivStamina}/15</span>
                    </div>
                </div>
            </div>
        `;
        modalBackdrop.classList.remove('hidden');
        document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.add('hidden');

        setTimeout(() => {
            const attackBar = document.getElementById('attack-bar');
            attackBar.style.width = `${(ivAttack / 15) * 100}%`;
            attackBar.style.backgroundColor = ivAttack === 15 ? '#da7a79' : '#f79513';

            const defenseBar = document.getElementById('defense-bar');
            defenseBar.style.width = `${(ivDefense / 15) * 100}%`;
            defenseBar.style.backgroundColor = ivDefense === 15 ? '#da7a79' : '#f79513';

            const staminaBar = document.getElementById('stamina-bar');
            staminaBar.style.width = `${(ivStamina / 15) * 100}%`;
            staminaBar.style.backgroundColor = ivStamina === 15 ? '#da7a79' : '#f79513';
        }, 100); // A small delay to allow the DOM to update
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
        const strongestData = rankings.strongestPokemon; // Store data
        strongestBody.innerHTML = strongestData.map((p, index) => `
            <tr class="clickable-pokemon-row" data-index="${index}">
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
                <td><strong>${index + 1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${p.sprite}" alt="${p.name}">
                    <span>${p.name}</span>
                </td>
                <td class="badges-cell">
                    ${generateBadges(p)}
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

            const pokemonRow = event.target.closest('.clickable-pokemon-row');
            if (pokemonRow) {
                const index = pokemonRow.dataset.index;
                const pokemon = strongestData[index];
                if (pokemon) {
                    openPokemonModal(pokemon);
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
        loadingOverlay.classList.add('hidden');
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
        loadingOverlay.innerHTML = '<p>Could not load ranking data. Please try again later.</p>';
    }

    // Add a single event listener to the modal backdrop to handle closing
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            modalBackdrop.classList.add('hidden');
        }
    });
});