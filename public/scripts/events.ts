// @ts-nocheck
/**
 * This script fetches and displays Pokemon GO events in the public dashboard.
 */
let cachedEvents = [];

function parseLocalDate(dateStr) {
    if (!dateStr) return new Date();
    const matches = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
    if (matches) {
        return new Date(
            parseInt(matches[1], 10),
            parseInt(matches[2], 10) - 1,
            parseInt(matches[3], 10),
            parseInt(matches[4], 10),
            parseInt(matches[5], 10),
            parseInt(matches[6], 10)
        );
    }
    return new Date(dateStr);
}

async function loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    const API_URL = 'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json';

    const EVENT_COLORS = {
        'community-day': '#1660a9',
        'raid-day': '#e74c3c',
        'raid-battles': '#c0392b',
        'event': '#27ae60',
        'raid-hour': '#c0392b',
        'research': '#1abc9c',
        'timed-research': '#1abc9c',
        'limited-research': '#159e83',
        'live-event': '#d63031',
        'pokemon-go-fest': '#153d94',
        'research-breakthrough': '#795548',
        'special-research': '#13a185',
        'global-challenge': '#0a64b5',
        'go-rocket-takeover': '#1e1e1e',
        'team-go-rocket': '#1e1e1e',
        'giovanni-special-research': '#1e272e',
        'safari-zone': '#3d7141',
        'ticketed-event': '#de3e9b',
        'go-battle-league': '#8e44ad',
        'pokemon-spotlight-hour': '#e58e26',
        'bonus-hour': '#40407a',
        'update': '#2980b9',
        'raid-weekend': '#6f1e51',
        'potential-ultra-unlock': '#2c3e50',
        'location-specific': '#284b92',
        'season': '#38ada9',
        'elite-raids': '#a21416',
        'pokemon-go-tour': '#1d3a74',
        'pokestop-showcase': '#ff9f43',
        'default': '#bdc3c7'
    };

    function getTimeRemaining(endTime) {
        const total = parseLocalDate(endTime).getTime() - new Date().getTime();
        if (total <= 0) return null;
        
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / 1000 / 60) % 60);

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch events');
        
        cachedEvents = await response.json();
        const now = new Date();

        const activeEvents = [];
        const upcomingEvents = [];

        cachedEvents.forEach(event => {
            const start = parseLocalDate(event.start);
            const end = parseLocalDate(event.end);
            if (now >= start && now <= end) {
                activeEvents.push(event);
            } else if (now < start) {
                upcomingEvents.push(event);
            }
        });

        // Sort upcoming by start date
        upcomingEvents.sort((a, b) => parseLocalDate(a.start) - parseLocalDate(b.start));
        // Sort active by end date
        activeEvents.sort((a, b) => parseLocalDate(a.end) - parseLocalDate(b.end));

        if (activeEvents.length === 0 && upcomingEvents.length === 0) {
            eventsContainer.innerHTML = '<p class="no-events">No active or upcoming events found.</p>';
            return;
        }

        const renderEvent = (event, isUpcoming) => {
            const start = parseLocalDate(event.start);
            const end = parseLocalDate(event.end);
            const statusText = isUpcoming ? 'Starts in' : 'Ends in';
            const timer = getTimeRemaining(isUpcoming ? event.start : event.end);
            const color = EVENT_COLORS[event.eventType] || EVENT_COLORS['default'];

            return `
                <div class="event-item" data-event-id="${event.eventID}">
                    <div class="event-dot" style="background-color: ${color}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${event.name}">${event.name}</span>
                        <span class="event-timer">${statusText} ${timer}</span>
                    </div>
                </div>
            `;
        };

        let html = '';
        if (activeEvents.length > 0) {
            html += '<h3 class="events-section-header">Ongoing</h3>';
            html += activeEvents.map(e => renderEvent(e, false)).join('');
        }
        if (upcomingEvents.length > 0) {
            html += '<h3 class="events-section-header">Upcoming</h3>';
            html += upcomingEvents.map(e => renderEvent(e, true)).join('');
        }

        eventsContainer.innerHTML = html;

        // Attach click listeners for event modal detailed views
        eventsContainer.querySelectorAll('.event-item').forEach(item => {
            item.addEventListener('click', () => {
                const eventId = item.getAttribute('data-event-id');
                const event = cachedEvents.find(e => e.eventID === eventId);
                if (event) {
                    showEventDetailModal(event, EVENT_COLORS[event.eventType] || EVENT_COLORS['default']);
                }
            });
        });

        // Set up expand events button click listener
        const expandBtn = document.getElementById('expand-events-btn');
        if (expandBtn) {
            expandBtn.onclick = () => {
                showTimelineModal(EVENT_COLORS);
            };
        }

    } catch (error) {
        console.error('Error loading events:', error);
        eventsContainer.innerHTML = '<p class="error-message">Error loading events.</p>';
    }
}

function showTimelineModal(eventColors) {
    const backdrop = document.getElementById('timeline-modal-backdrop');
    const scrollContainer = document.getElementById('timeline-scroll-container');
    const closeBtn = document.getElementById('timeline-modal-close-btn');
    const expandBtn = document.getElementById('expand-events-btn');

    if (!backdrop || !scrollContainer || !closeBtn) return;

    // Helper to close modal
    const closeModal = () => {
        backdrop.classList.add('hidden');
        if (expandBtn) {
            expandBtn.setAttribute('aria-expanded', 'false');
        }
    };

    // Set up close actions
    closeBtn.onclick = closeModal;
    backdrop.onclick = (e) => {
        if (e.target === backdrop) closeModal();
    };

    // Calculate start date (today, midnight local time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Exclude past events (events that ended before today)
    const validEvents = cachedEvents.filter(event => {
        const end = parseLocalDate(event.end);
        return end >= today;
    });

    // Find the latest end date among the valid active or future events
    let maxEnd = new Date(today);
    validEvents.forEach(event => {
        const end = parseLocalDate(event.end);
        if (end > maxEnd) {
            maxEnd = end;
        }
    });

    // Calculate timeline duration in days (minimum 14 days, maximum 90 days)
    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.ceil((maxEnd - today) / msPerDay);
    const totalDays = Math.min(Math.max(14, diffDays), 90);

    // Populate timelineDays array
    const timelineDays = [];
    for (let i = 0; i < totalDays; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        timelineDays.push(day);
    }
    const timelineEndDate = new Date(timelineDays[totalDays - 1]);
    timelineEndDate.setHours(23, 59, 59, 999);

    // Group valid events by their eventType
    const eventsByGroup = {};
    validEvents.forEach(event => {
        const start = parseLocalDate(event.start);
        const end = parseLocalDate(event.end);
        
        // Double check overlap with our dynamic timeline range
        if (end < today || start > timelineEndDate) return;

        if (!eventsByGroup[event.eventType]) {
            eventsByGroup[event.eventType] = [];
        }
        eventsByGroup[event.eventType].push(event);
    });

    // Generate HTML for the grid with dynamic grid template styling
    let gridHtml = `<div class="timeline-grid" style="grid-template-columns: 160px repeat(${totalDays}, 100px);">`;

    // 1. Header row (Event Type label + day headers)
    gridHtml += `<div class="timeline-header-row">`;
    gridHtml += `<div class="timeline-label-header">Event Category</div>`;
    
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    timelineDays.forEach((day, index) => {
        const isToday = index === 0;
        const classNames = `timeline-date-cell${isToday ? ' today' : ''}`;
        gridHtml += `
            <div class="${classNames}">
                <div>${weekDays[day.getDay()]}</div>
                <div>${day.getDate()}</div>
            </div>
        `;
    });
    gridHtml += `</div>`; // end timeline-header-row

    // 2. Data rows for each group
    Object.keys(eventsByGroup).forEach(groupName => {
        const events = eventsByGroup[groupName];
        const groupLabel = groupName.replace(/-/g, ' ');

        // Sort events in this group by start date
        events.sort((a, b) => parseLocalDate(a.start) - parseLocalDate(b.start));

        // Track system to stack overlapping events vertically
        const tracks = []; // stores the float endCol of the last event on each track

        // First pass: calculate tracks and offsets
        const eventsWithTrack = events.map(event => {
            const start = parseLocalDate(event.start);
            const end = parseLocalDate(event.end);

            // Check if event starts and ends on the same calendar day
            const isSingleDay = start.getFullYear() === end.getFullYear() &&
                                start.getMonth() === end.getMonth() &&
                                start.getDate() === end.getDate();

            let hasCooccurring = false;
            if (isSingleDay) {
                const targetDayStart = new Date(start);
                targetDayStart.setHours(0, 0, 0, 0);
                const targetDayEnd = new Date(start);
                targetDayEnd.setHours(23, 59, 59, 999);

                hasCooccurring = events.some(other => {
                    if (other.eventID === event.eventID) return false;
                    const otherStart = parseLocalDate(other.start);
                    const otherEnd = parseLocalDate(other.end);
                    return (otherEnd >= targetDayStart && otherStart <= targetDayEnd);
                });
            }

            let finalStart = start;
            let finalEnd = end;
            if (isSingleDay && !hasCooccurring) {
                finalStart = new Date(start);
                finalStart.setHours(0, 0, 0, 0);
                finalEnd = new Date(end);
                finalEnd.setHours(23, 59, 59, 999);
            }

            // Calculate fractional days relative to today
            let startCol = 0;
            if (finalStart > today) {
                startCol = (finalStart - today) / (24 * 60 * 60 * 1000);
            }
            
            let endCol = totalDays;
            if (finalEnd < timelineEndDate) {
                endCol = (finalEnd - today) / (24 * 60 * 60 * 1000);
            }

            if (startCol < 0) startCol = 0;
            if (endCol > totalDays) endCol = totalDays;
            if (endCol <= startCol) endCol = startCol + (1 / 24); // minimum 1 hour width

            // Find first track without overlap
            let assignedTrackIndex = -1;
            for (let t = 0; t < tracks.length; t++) {
                if (startCol >= tracks[t] - 0.01) { // 0.01 margin for floating point
                    assignedTrackIndex = t;
                    break;
                }
            }

            if (assignedTrackIndex === -1) {
                tracks.push(endCol);
                assignedTrackIndex = tracks.length - 1;
            } else {
                tracks[assignedTrackIndex] = endCol;
            }

            return { event, startCol, endCol, track: assignedTrackIndex };
        });

        const numTracks = Math.max(1, tracks.length);
        const rowHeight = 16 + numTracks * 34;

        gridHtml += `<div class="timeline-row">`;
        gridHtml += `<div class="timeline-row-label" style="height: ${rowHeight}px;">${groupLabel}</div>`;

        // Render empty cell tracks for visual reference (totalDays columns)
        for (let i = 0; i < totalDays; i++) {
            const classNames = `timeline-grid-cell${i === 0 ? ' today-col' : ''}`;
            gridHtml += `<div class="${classNames}" style="height: ${rowHeight}px;"></div>`;
        }

        // Render event bar container with dynamic height
        gridHtml += `<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${totalDays}; grid-template-columns: repeat(${totalDays}, 100px); height: ${rowHeight}px;">`;
        eventsWithTrack.forEach(({ event, startCol, endCol, track }) => {
            const color = eventColors[event.eventType] || eventColors['default'];
            const leftOffset = startCol * 100;
            const barWidth = (endCol - startCol) * 100 - 6;
            const topOffset = 10 + track * 34;

            gridHtml += `
                <div class="timeline-bar" 
                     style="left: ${leftOffset + 3}px; width: ${barWidth}px; top: ${topOffset}px; background-color: ${color};"
                     title="${event.name}"
                     data-event-id="${event.eventID}">
                    ${event.name}
                </div>
            `;
        });
        gridHtml += `</div>`; // end timeline-bar-wrapper
        gridHtml += `</div>`; // end timeline-row
    });

    gridHtml += `</div>`; // end timeline-grid
    scrollContainer.innerHTML = gridHtml;

    // Attach click listeners to the bars to open the detailed modal
    scrollContainer.querySelectorAll('.timeline-bar').forEach(bar => {
        bar.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent backdrop clicks
            const eventId = bar.getAttribute('data-event-id');
            const event = cachedEvents.find(ev => ev.eventID === eventId);
            if (event) {
                showEventDetailModal(event, eventColors[event.eventType] || eventColors['default']);
            }
        });
    });

    // Show timeline modal and set accessibility state
    backdrop.classList.remove('hidden');
    if (expandBtn) {
        expandBtn.setAttribute('aria-expanded', 'true');
    }
}

function showEventDetailModal(event, color) {
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    if (!modalBackdrop || !modalContent) return;

    // Apply color theme dynamically
    modalContent.style.setProperty('--event-theme', color);

    const now = new Date();
    const start = parseLocalDate(event.start);
    const end = parseLocalDate(event.end);
    
    let timerText = '';
    if (now < start) {
        const total = start.getTime() - now.getTime();
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        timerText = `Starts in: ${days > 0 ? `${days}d ${hours}h` : `${hours}h`}`;
    } else {
        const total = end.getTime() - now.getTime();
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        timerText = `Ends in: ${days > 0 ? `${days}d ${hours}h` : `${hours}h`}`;
    }

    let extraDataHtml = '';
    const extra = event.extraData || {};

    // 1. Spotlight Hour Layout
    if (event.eventType === 'pokemon-spotlight-hour' && extra.spotlight) {
        const sp = extra.spotlight;
        extraDataHtml = `
            <div class="event-details-grid">
                <div class="event-section-card">
                    <h4>Featured Pokémon</h4>
                    <div class="spotlight-pokemon-container">
                        <div class="event-tile spotlight-pokemon-tile">
                            <img src="${sp.image}" alt="${sp.name}" style="width: 80px; height: 80px;">
                            <div class="event-tile-name" style="font-weight: 700; font-size: 0.95rem;">${sp.name}</div>
                            ${sp.canBeShiny ? '<span class="shiny-indicator">✨</span>' : ''}
                        </div>
                    </div>
                </div>
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div class="spotlight-bonus-container">
                        <div class="event-bonus-row">
                            <span class="spotlight-bonus-icon">🎁</span>
                            <div class="event-bonus-text">${sp.bonus || 'No Extra Bonus'}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } 
    // 2. Raid Hour / Raid Battles / Raid Day Layout
    else if ((event.eventType === 'raid-battles' || event.eventType === 'raid-hour' || event.eventType === 'raid-day') && extra.raidbattles) {
        const rb = extra.raidbattles;
        const bosses = rb.bosses || [];
        const shinies = rb.shinies || [];
        
        extraDataHtml = `
            <div class="event-details-grid">
                ${bosses.length > 0 ? `
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${bosses.map(b => `
                            <div class="event-tile">
                                <img src="${b.image}" alt="${b.name}">
                                <div class="event-tile-name">${b.name}</div>
                                ${b.canBeShiny ? '<span class="shiny-indicator" title="Shiny Available">✨</span>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}

                ${shinies.length > 0 ? `
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${shinies.map(s => `
                            <div class="event-tile">
                                <img src="${s.image}" alt="${s.name}">
                                <div class="event-tile-name">${s.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
        `;
    }
    // 3. Community Day Layout
    else if (event.eventType === 'community-day' && extra.communityday) {
        const cd = extra.communityday;
        const spawns = cd.spawns || [];
        const bonuses = cd.bonuses || [];
        const shinies = cd.shinies || [];
        const bonusDisclaimers = cd.bonusDisclaimers || [];
        const specialResearch = cd.specialresearch || [];
        
        extraDataHtml = `
            <div class="event-details-grid">
                ${(spawns.length > 0 || shinies.length > 0) ? `
                <div class="event-section-card">
                    ${spawns.length > 0 ? `
                    <h4>Featured Spawns</h4>
                    <div class="event-grid-list" style="margin-bottom: 20px;">
                        ${spawns.map(s => `
                            <div class="event-tile">
                                <img src="${s.image}" alt="${s.name}">
                                <div class="event-tile-name">${s.name}</div>
                                ${s.canBeShiny ? '<span class="shiny-indicator">✨</span>' : ''}
                            </div>
                        `).join('')}
                    </div>` : ''}

                    ${shinies.length > 0 ? `
                    <h4 style="margin-top: 15px; border-top: 1px solid #edf2f7; padding-top: 15px;">New / Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${shinies.map(s => `
                            <div class="event-tile">
                                <img src="${s.image}" alt="${s.name}">
                                <div class="event-tile-name">${s.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join('')}
                    </div>` : ''}
                </div>` : ''}

                ${bonuses.length > 0 ? `
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div style="display:flex; flex-direction:row; flex-wrap:wrap; gap:10px;">
                        ${bonuses.map(b => `
                            <div class="event-bonus-row">
                                ${b.image ? `<img src="${b.image}" alt="bonus icon" class="event-bonus-icon">` : ''}
                                <div class="event-bonus-text">${b.text}</div>
                            </div>
                        `).join('')}
                    </div>
                    ${bonusDisclaimers.length > 0 ? `
                    <div class="bonus-disclaimer" style="font-size:0.75rem; color:#718096; margin-top:12px; border-top:1px solid #edf2f7; padding-top:8px; line-height:1.4;">
                        ${bonusDisclaimers.map(d => `<div style="margin-bottom: 4px;">${d}</div>`).join('')}
                    </div>` : ''}
                </div>` : ''}

                ${specialResearch.length > 0 ? `
                <div class="event-section-card" style="grid-column: 1 / -1;">
                    <h4>Special Research Steps</h4>
                    <div class="research-timeline">
                        ${specialResearch.map(step => `
                            <div class="research-step">
                                <div class="research-step-marker"></div>
                                <div class="research-step-title">${step.name}</div>
                                <div class="research-task-list">
                                    <div style="font-weight:700; margin-bottom:5px; color:#4a5568;">Tasks:</div>
                                    ${step.tasks.map(t => `
                                        <div class="research-task-item">
                                            <span>${t.text}</span>
                                            <span class="research-reward-pill">
                                                <img src="${t.reward.image}" alt="reward">
                                                <span>${t.reward.text}</span>
                                            </span>
                                        </div>
                                    `).join('')}
                                    <div style="font-weight:700; margin: 8px 0 5px 0; color:#4a5568;">Step Rewards:</div>
                                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                        ${step.rewards.map(r => `
                                            <span class="research-reward-pill">
                                                <img src="${r.image}" alt="reward">
                                                <span>${r.text}</span>
                                            </span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
        `;
    }
    // 4. Default / Generic Layout
    else {
        const isSpawns = extra.generic?.hasSpawns;
        const isResearch = extra.generic?.hasFieldResearchTasks;
        extraDataHtml = `
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div class="event-section-card" style="text-align:center; padding: 25px;">
                    <div style="font-size:1.1rem; font-weight:600; color:#4a5568; margin-bottom:15px;" class="generic-event-desc">
                        Standard Event details and timers are active. 
                    </div>
                    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                        <span class="event-status-pill">
                            ${isSpawns ? '✅ Wild Spawns Active' : '❌ No Special Spawns'}
                        </span>
                        <span class="event-status-pill">
                            ${isResearch ? '✅ Field Research Available' : '❌ No Special Research Tasks'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    modalContent.innerHTML = `
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${event.image || 'https://cdn.leekduck.com/assets/img/events/default.jpg'}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${event.heading}</span>
                <h2 class="event-modal-hero-title">${event.name}</h2>
                <div class="event-timer-large">📅 ${timerText}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${extraDataHtml}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${event.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;

    // Attach close listener
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => {
            modalBackdrop.classList.add('hidden');
        };
    }

    // Show the modal
    modalBackdrop.classList.remove('hidden');
}

// Initial load
document.addEventListener('DOMContentLoaded', loadEvents);
// Refresh every 5 minutes
setInterval(loadEvents, 5 * 60 * 1000);
