document.addEventListener('DOMContentLoaded', async () => {
    const loadingMessage = document.getElementById('loading-message');
    const rankingsGrid = document.getElementById('rankings-grid');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');

    function createBackgroundStyle(colors) {
        if (!colors || colors.length === 0) return 'color: #333; text-shadow: none;';
        if (colors.length === 1) return `background-color: ${colors[0]};`;
        return `background: linear-gradient(135deg, ${colors[0]} 30%, ${colors[1]} 70%);`;
    }

    // Function to open the details modal for a player
    async function openPlayerModal(playerId) {
        try {
            const detailRes = await fetch(`/api/player-detail/${playerId}`);
            if (!detailRes.ok) throw new Error('Could not fetch player details.');
            const details = await detailRes.json();

            modalContent.innerHTML = `
                <button id="modal-close-btn">&times;</button>
                <h2>${details.name}</h2>
                <p>Start Date: ${details.startDate}</p>
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
            document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.add('hidden');
        } catch (error) {
            console.error('Failed to open player modal:', error);
        }
    }

    try {
        const response = await fetch('/api/rankings');
        if (!response.ok) throw new Error('Failed to load rankings.');
        const rankings = await response.json();

        // 1. Populate Recent Players table
        const recentBody = document.getElementById('recent-players-body');
        recentBody.innerHTML = rankings.recentPlayers.map(player => `
            <tr class="clickable-row" data-player-id="${player.playerId}">
                <td><strong>${player.name}</strong></td>
                <td>
                    ${player.buddy ? `<img src="${player.buddy.sprite}" alt="${player.buddy.name}" title="${player.buddy.name}">` : 'N/A'}
                </td>
                <td>${player.kmWalked} km</td>
                <td>${player.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join('');

        // 2. Populate Strongest Pokémon table
        const strongestBody = document.getElementById('strongest-pokemon-body');
        strongestBody.innerHTML = rankings.strongestPokemon.map((p, index) => `
            <tr class="clickable-row" data-player-id="${p.ownerId}">
                <td>${index + 1}</td>
                <td class="pokemon-cell">
                    <img src="${p.sprite}" alt="${p.name}">
                    <span>${p.name}</span>
                </td>
                <td><strong>${p.cp.toLocaleString()}</strong></td>
                <td>${p.owner}</td>
            </tr>
        `).join('');

        // 3. Populate Rarest Pokémon list
        const rarestList = document.getElementById('rarest-pokemon-list');
        rarestList.innerHTML = rankings.rarestPokemon.map(p => `
            <div class="list-row clickable-row" data-player-id="${p.ownerId}">
                <div class="pokemon-cell">
                    <img src="${p.sprite}" alt="${p.name}">
                    <span>${p.name}</span>
                </div>
                <div class="badges-cell">
                    ${p.isShiny ? '<span class="badge shiny-badge">Shiny</span>' : ''}
                    ${p.isLucky ? '<span class="badge lucky-badge">Lucky</span>' : ''}
                    ${p.isPerfect ? '<span class="badge perfect-badge">Perfect</span>' : ''}
                </div>
                <div class="owner-cell">${p.owner}</div>
            </div>
        `).join('');

        // 4. Add event listeners to all clickable rows
        document.querySelectorAll('.clickable-row').forEach(row => {
            row.addEventListener('click', () => {
                const playerId = row.dataset.playerId;
                if (playerId) {
                    openPlayerModal(playerId);
                }
            });
        });

        loadingMessage.classList.add('hidden');
        rankingsGrid.classList.remove('hidden');

    } catch (error) {
        console.error('Failed to load rankings:', error);
        loadingMessage.innerHTML = '<p>Could not load ranking data.</p>';
    }

    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) modalBackdrop.classList.add('hidden');
    });
});