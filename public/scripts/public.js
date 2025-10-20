document.addEventListener('DOMContentLoaded', async () => {
    const loadingMessage = document.getElementById('loading-message');
    const rankingsGrid = document.getElementById('rankings-grid');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');

    // ... (openPlayerModal and createBackgroundStyle functions are unchanged) ...

    try {
        const response = await fetch('/api/rankings');
        if (!response.ok) throw new Error('Failed to load rankings.');
        const rankings = await response.json();

        // 1. Populate Recent Players table
        document.getElementById('recent-players-body').innerHTML = rankings.recentPlayers.map(player => `
            <tr class="clickable-row" data-player-id="${player.playerId}">
                <td><strong>${player.name}</strong></td>
                <td>${player.buddy ? `<img src="${player.buddy.sprite}" title="${player.buddy.name}">` : 'N/A'}</td>
                <td>${player.kmWalked} km</td>
                <td>${player.pokemonCaught.toLocaleString()}</td>
            </tr>`).join('');

        // 2. Populate Strongest Pokémon table
        document.getElementById('strongest-pokemon-body').innerHTML = rankings.strongestPokemon.map((p, index) => `
            <tr class="clickable-row" data-player-id="${p.ownerId}">
                <td>${index + 1}</td>
                <td class="pokemon-cell"><img src="${p.sprite}"><span>${p.name}</span></td>
                <td><strong>${p.cp.toLocaleString()}</strong></td>
                <td>${p.owner}</td>
            </tr>`).join('');

        // --- THIS IS THE UPDATED SECTION ---
        // 3. Populate Rarity Showcase list
        const rarestList = document.getElementById('rarest-pokemon-list');
        rarestList.innerHTML = rankings.rarestPokemon.map(p => `
            <div class="list-row">
                <div class="pokemon-cell">
                    <img src="${p.sprite}" alt="${p.name}">
                    <span>${p.name}</span>
                </div>
                <div class="badges-cell">
                    ${p.isShiny ? '<span class="badge shiny-badge">Shiny</span>' : ''}
                    ${p.isLucky ? '<span class="badge lucky-badge">Lucky</span>' : ''}
                    ${p.isPerfect ? '<span class="badge perfect-badge">Perfect</span>' : ''}
                </div>
                <div class="owner-cell"><strong>${p.ownershipPercentage.toFixed(2)}%</strong></div>
            </div>
        `).join('');

        // 4. Add event listeners
        document.querySelectorAll('.clickable-row').forEach(row => {
            row.addEventListener('click', () => {
                if (row.dataset.playerId) openPlayerModal(row.dataset.playerId);
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