document.addEventListener('DOMContentLoaded', async () => {
    const playerGrid = document.getElementById('player-grid');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');

    function createBackgroundStyle(colors) {
        if (!colors || colors.length === 0) return 'color: #333; text-shadow: none;';
        if (colors.length === 1) return `background-color: ${colors[0]};`;
        return `background: linear-gradient(135deg, ${colors[0]} 30%, ${colors[1]} 70%);`;
    }

    try {
        const response = await fetch('/api/public-data');
        const players = await response.json();

        if (players.length === 0) {
            playerGrid.innerHTML = '<div class="card"><p>No player data has been submitted yet.</p></div>';
            return;
        }

        players.sort((a, b) => b.level - a.level).forEach(player => {
            const teamColors = { 1: '#3498DB', 2: '#E74C3C', 3: '#F1C40F' };
            const teamColor = teamColors[player.team] || '#6c757d';
            
            const card = document.createElement('div');
            card.className = 'card player-card';
            card.dataset.playerId = player.playerId;
            card.style.background = `linear-gradient(135deg, ${teamColor} 20%, #495057 100%)`;

            card.innerHTML = `
                <div class="player-card-header">
                    <h3>${player.name}</h3>
                    <span>Lv. ${player.level}</span>
                </div>
                <div class="player-card-body">
                    <img src="${player.displayPokemon.sprite}" alt="${player.displayPokemon.name}" onerror="this.style.display='none'">
                    <p>${player.displayPokemon.name}</p>
                    <small>Buddy</small>
                </div>
                <div class="player-card-footer">
                    <span>${player.kmWalked} km walked</span>
                </div>
            `;
            playerGrid.appendChild(card);
        });

        document.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('click', async () => {
                const playerId = card.dataset.playerId;
                const detailRes = await fetch(`/api/player-detail/${playerId}`);
                if (!detailRes.ok) return;
                const details = await detailRes.json();
                
                // This is the corrected modal HTML, with the "Recently Caught" section removed.
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
            });
        });

    } catch (error) {
        console.error(error);
        playerGrid.innerHTML = '<div class="card"><p>Could not load player data.</p></div>';
    }

    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) modalBackdrop.classList.add('hidden');
    });
});