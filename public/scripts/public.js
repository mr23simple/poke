document.addEventListener('DOMContentLoaded', async () => {
    const playerGrid = document.getElementById('player-grid');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('modal-close-btn');

    try {
        const response = await fetch('/api/public-data');
        const players = await response.json();

        if (players.length === 0) {
            playerGrid.innerHTML = '<p>No player data has been submitted yet.</p>';
            return;
        }

        // Sort players by level descending
        players.sort((a, b) => b.level - a.level);
        
        players.forEach(player => {
            const teamColors = { 1: '#3498DB', 2: '#E74C3C', 3: '#F1C40F' };
            const card = document.createElement('div');
            card.className = 'card player-card';
            card.style.borderTop = `5px solid ${teamColors[player.team] || '#ccc'}`;
            card.dataset.playerId = player.playerId;

            card.innerHTML = `
                <h3>${player.name}</h3>
                <p>Level: <strong>${player.level}</strong></p>
                <p>${player.kmWalked} km walked</p>
                <div class="recent-catch">
                    <img src="${player.recentCatch.sprite}" alt="${player.recentCatch.name}" loading="lazy">
                    <small>Recent: ${player.recentCatch.name} (CP ${player.recentCatch.cp})</small>
                </div>
            `;
            playerGrid.appendChild(card);
        });

        document.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('click', async () => {
                const playerId = card.dataset.playerId;
                const detailRes = await fetch(`/api/player-detail/${playerId}`);
                const details = await detailRes.json();
                
                // Populate and show the modal
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
                        ${details.highlights.map(p => `
                            <div class="pokemon-card">
                                <img src="${p.sprite}" alt="${p.name}" loading="lazy">
                                <p class="pokemon-name">${p.name}</p>
                                <p class="pokemon-cp">CP ${p.cp}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                modalBackdrop.classList.remove('hidden');
                document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.add('hidden');
            });
        });

    } catch (error) {
        playerGrid.innerHTML = '<p>Could not load player data.</p>';
    }

    closeModalBtn.addEventListener('click', () => modalBackdrop.classList.add('hidden'));
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) modalBackdrop.classList.add('hidden');
    });
});