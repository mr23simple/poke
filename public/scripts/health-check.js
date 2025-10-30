document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('health-check-container');
    const cronSummaryCard = document.getElementById('cron-summary-card');

    const renderCronStatus = (cronData) => {
        if (!cronData) {
            cronSummaryCard.innerHTML = '<p>Cron status is not available.</p>';
            return;
        }

        let statusClass = 'not-run';
        let statusText = cronData.status;
        if (cronData.status === 'Success') {
            statusClass = 'success';
            statusText = '✅ Success';
        } else if (cronData.status === 'Failed') {
            statusClass = 'failed';
            statusText = '❌ Failed';
        }

        cronSummaryCard.innerHTML = `
            <div class="cron-status ${statusClass}">${statusText}</div>
            <div class="cron-details">
                <p><strong>Last Run:</strong> ${cronData.lastRun ? new Date(cronData.lastRun).toLocaleString() : 'N/A'}</p>
                <p>Next scheduled run is at 3:00 AM.</p>
            </div>
        `;
    };

    const renderFileStatus = (data) => {
        container.innerHTML = ''; // Clear loading message

        for (const [key, value] of Object.entries(data)) {
            if (key === 'cron') continue; // Skip cron data here

            const card = document.createElement('div');
            card.className = 'health-card';

            const title = document.createElement('h2');
            title.textContent = value.file || key;
            card.appendChild(title);

            const table = document.createElement('table');
            table.className = 'hash-table';

            let statusText = '';
            let statusClass = '';

            if (!value.localHash) {
                statusText = '⚠️ Local file not found';
                statusClass = 'status-missing';
            } else if (value.remoteHash && value.localHash.toLowerCase() === value.remoteHash.toLowerCase()) {
                statusText = '✅ Hashes match';
                statusClass = 'status-ok';
            } else {
                statusText = '❌ Hashes do not match';
                statusClass = 'status-mismatch';
            }

            table.innerHTML = `
                <tr>
                    <th>Source</th>
                    <th>Hash</th>
                </tr>
                <tr>
                    <td>Remote</td>
                    <td>${value.remoteHash || 'N/A'}</td>
                </tr>
                <tr>
                    <td>Local</td>
                    <td>${value.localHash || 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Status</strong></td>
                    <td class="${statusClass}"><strong>${statusText}</strong></td>
                </tr>
                 <tr>
                    <td>Last Checked</td>
                    <td>${value.lastChecked ? new Date(value.lastChecked).toLocaleString() : 'N/A'}</td>
                </tr>
            `;

            card.appendChild(table);
            container.appendChild(card);
        }
    };

    fetch('/api/health-check')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderCronStatus(data.cron);
            renderFileStatus(data);
        })
        .catch(error => {
            container.innerHTML = `<p style="color: red;">Failed to load health check data: ${error.message}</p>`;
            cronSummaryCard.innerHTML = '';
            console.error('Error fetching health check data:', error);
        });
});
