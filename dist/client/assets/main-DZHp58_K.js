import"./loadHeader-DYLKcTTh.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const l=document.getElementById("loading-overlay"),$=document.getElementById("rankings-grid"),o=document.getElementById("modal-backdrop"),p=document.getElementById("modal-content"),m={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function b(e){let a=null,i=1/0;for(const n in m){const g=Math.abs(m[n]-e);g<i&&(i=g,a=n)}return a}function h(e){const a=(i,n)=>{if(!n||!n.value||n.value<=1)return"";const g=n.text?`(${n.text})`:"";return`<li><span>${i} ${g}</span><span>1 in ${Math.round(n.value).toLocaleString()}</span></li>`};p.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${c(e)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${renderPlayerBadge({userId:e.userId,publicId:e.ownerPublicId})}</strong></div>
                        <div><span>Rarity Score</span><strong>1 in ${Math.round(e.rarity.score).toLocaleString()}</strong></div>
                    </div>
                </div>
            </div>
            <div class="pokemon-modal-body">
                <h4>Rarity Factors</h4>
                <ul class="stat-breakdown-list">
                    ${a("Perfect IVs",e.rarity.breakdown.iv)}
                    ${a("Shiny",e.rarity.breakdown.shiny)}
                    ${a("Lucky",e.rarity.breakdown.lucky)}
                    ${a("Origin",e.rarity.breakdown.origin)}
                </ul>
            </div>
        `,o.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{o.classList.add("hidden"),document.body.classList.remove("modal-open")}}function c(e){const a=[];let i=!1,n=!1,g=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(a.push('<span class="badge shlundo-badge">Shlundo</span>'),i=n=g=!0):e.isLucky&&e.isPerfect?(a.push('<span class="badge lundo-badge">Lundo</span>'),i=g=!0):e.isShiny&&e.isPerfect?(a.push('<span class="badge shundo-badge">Shundo</span>'),i=n=!0):e.isShiny&&e.isZeroIv&&(a.push('<span class="badge shnundo-badge">Shnundo</span>'),i=n=!0),!n&&e.isShiny&&a.push('<span class="badge shiny-badge">Shiny</span>'),!g&&e.isLucky?a.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&a.push('<span class="badge traded-badge">Traded</span>'),i||(e.isPerfect?a.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&a.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&a.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&a.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&a.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&a.push('<span class="badge mythical-badge">Mythical</span>'),a.join(" ")}function u(e){const a=e.iv.attack,i=e.iv.defense,n=e.iv.stamina,g=e.cpm,L=b(g);p.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${c(e)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${renderPlayerBadge({userId:e.userId,publicId:e.ownerPublicId})}</strong></div>
                        <div><span>CP</span><strong>${e.cp}</strong></div>
                        <div><span>Level</span><strong>${L}</strong></div>
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
                        <span class="stat-value">${a}/15</span>
                    </div>
                    <div class="stat-bar-container">
                        <span class="stat-label">Defense</span>
                        <div class="stat-bar">
                            <div id="defense-bar" class="stat-bar-fill"></div>
                        </div>
                        <span class="stat-value">${i}/15</span>
                    </div>
                    <div class="stat-bar-container">
                        <span class="stat-label">Stamina</span>
                        <div class="stat-bar">
                            <div id="stamina-bar" class="stat-bar-fill"></div>
                        </div>
                        <span class="stat-value">${n}/15</span>
                    </div>
                </div>
            </div>
        `,o.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{o.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const I=document.getElementById("attack-bar");I.style.width=`${a/15*100}%`,I.style.backgroundColor=a===15?"#da7a79":"#f79513";const E=document.getElementById("defense-bar");E.style.width=`${i/15*100}%`,E.style.backgroundColor=i===15?"#da7a79":"#f79513";const x=document.getElementById("stamina-bar");x.style.width=`${n/15*100}%`,x.style.backgroundColor=n===15?"#da7a79":"#f79513"},100)}function y(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const t=localStorage.getItem("liteMode")==="enabled";async function d(e){p.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,o.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{o.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const a=await fetch(`/api/player-detail/${e}`);if(!a.ok)throw new Error("Could not fetch player details.");const i=await a.json();p.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <h2>${renderPlayerBadge({userId:i.userId,publicId:i.publicId})}</h2>
                <div class="grid-stats">
                    <div><span>Total XP</span><strong>${i.totalXp.toLocaleString()}</strong></div>
                    <div><span>Pokémon Caught</span><strong>${i.pokemonCaught.toLocaleString()}</strong></div>
                    <div><span>Distance Walked</span><strong>${i.kmWalked.toFixed(1)} km</strong></div>
                    <div><span>PokéStops Visited</span><strong>${i.pokestopsVisited.toLocaleString()}</strong></div>
                </div>
                
                <h3>Highlights</h3>
                <div id="modal-pokemon-container">
                    ${i.highlights.map(n=>`<div class="${`pokemon-card${n.typeColors.length>0?" colored":""}${t||!n.sprite?" no-image":""}`}" style="${y(n.typeColors)}">
                                    <img src="${n.sprite}" alt="${n.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${t?`<span class="lite-name-span" style="${y(n.typeColors)}">${n.name}</span>`:n.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${n.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>o.classList.add("hidden")}catch(a){console.error("Failed to open player modal:",a),p.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${a.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>o.classList.add("hidden")}}function r(){p.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <h4>Rarity Calculation</h4>
            <p>Rarity is calculated by multiplying the odds of a Pokémon's rarest traits.</p>
            <ul>
                <li><strong>Lucky Trade Odds:</strong> 1 in 20.</li>
                <li><strong>Shiny Odds:</strong> ~1 in 20 to ~1 in 500.</li>
            </ul>
            <p><strong>Perfect IV Odds depend on how it was acquired:</strong></p>
            <ul>
                <li>1 in 64 (Lucky Trade)</li>
                <li>1 in 216 (Raid/Egg/Research)</li>
                <li>1 in 1,331 (Best Friend Trade)</li>
                <li>1 in 1,728 (Weather Boost)</li>
                <li>1 in 4,096 (Wild Catch)</li>
            </ul>
        `,o.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{o.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const s=document.querySelector(".header-content"),f=document.querySelector(".container"),S=(s?s.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(w=>{w.style.width=`${S}px`})};var v=e;const a=await fetch("/api/rankings");if(!a.ok)throw new Error("Failed to load rankings from the server.");const i=await a.json(),g=await(await fetch("/api/check-auth-status")).json(),L=document.getElementById("main-title");g.loggedIn&&g.userId?(document.title=`Pokemon GO | #${g.userId}`,L&&(L.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:g.userId,publicId:g.publicId})}`)):(document.title="Pokemon GO | Dashboard",L&&(L.textContent="Pokémon GO Player Dashboard"));const I=document.getElementById("recent-players-body");I.innerHTML=i.recentPlayers.map(s=>`
            <tr class="clickable-row" data-player-id="${s.publicId}">
                <td>${renderPlayerBadge(s)}</td>
                <td>
                    ${s.buddy?`
                        <img src="${s.buddy.sprite}" alt="${s.buddy.name}" title="${s.buddy.name}">
                        ${t?`<span class="pokemon-name-lite" style="${y(s.buddy.typeColors)}">${s.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${s.kmWalked} km</td>
                <td class="hide-on-mobile">${s.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const E=document.getElementById("strongest-pokemon-body"),x=i.strongestPokemon;E.innerHTML=x.map((s,f)=>`
            <tr class="clickable-pokemon-row" data-index="${f}">
                <td>${f+1}</td>
                <td class="pokemon-cell">
                    <img src="${s.sprite}" alt="${s.name}">
                    ${t?`<span class="pokemon-name-lite" style="${y(s.typeColors)}">${s.name}</span>`:""}
                </td>
                <td><strong>${s.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:s.userId,publicId:s.ownerPublicId})}</td>
            </tr>
        `).join("");const C=document.getElementById("rarest-pokemon-body"),P=i.rarestPokemon;C.innerHTML=P.map((s,f)=>`
            <tr class="clickable-rarity-row" data-index="${f}">
                <td><strong>${f+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${s.sprite}" alt="${s.name}">
                    ${t?`<span class="pokemon-name-lite" style="${y(s.typeColors)}">${s.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${c(s)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:s.userId,publicId:s.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",s=>{const f=s.target.closest(".clickable-row");if(f){const k=f.dataset.playerId;k&&d(k);return}const B=s.target.closest(".clickable-pokemon-row");if(B){const k=B.dataset.index,w=x[k];w&&u(w);return}const S=s.target.closest(".clickable-rarity-row");if(S){const k=S.dataset.index,w=P[k];w&&h(w)}}),l.classList.add("hidden"),$.classList.remove("hidden");const T=document.querySelector(".info-btn");T&&T.addEventListener("click",s=>{s.stopPropagation(),r()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),l.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}o.addEventListener("click",e=>{e.target===o&&(o.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let D=[];async function M(){const l=document.getElementById("events-container"),$="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",o={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function p(m){const b=Date.parse(m)-Date.parse(new Date);if(b<=0)return null;const h=Math.floor(b/(1e3*60*60*24)),c=Math.floor(b/(1e3*60*60)%24),u=Math.floor(b/1e3/60%60);return h>0?`${h}d ${c}h`:c>0?`${c}h ${u}m`:`${u}m`}try{const m=await fetch($);if(!m.ok)throw new Error("Failed to fetch events");D=await m.json();const b=new Date,h=[],c=[];if(D.forEach(t=>{const d=new Date(t.start),r=new Date(t.end);b>=d&&b<=r?h.push(t):b<d&&c.push(t)}),c.sort((t,d)=>new Date(t.start)-new Date(d.start)),h.sort((t,d)=>new Date(t.end)-new Date(d.end)),h.length===0&&c.length===0){l.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}const u=(t,d)=>{const r=new Date(t.start),v=new Date(t.end),e=d?"Starts in":"Ends in",a=p(d?t.start:t.end),i=o[t.eventType]||o.default;return`
                <div class="event-item" data-event-id="${t.eventID}">
                    <div class="event-dot" style="background-color: ${i}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${t.name}">${t.name}</span>
                        <span class="event-timer">${e} ${a}</span>
                    </div>
                </div>
            `};let y="";h.length>0&&(y+='<h3 class="events-section-header">Ongoing</h3>',y+=h.map(t=>u(t,!1)).join("")),c.length>0&&(y+='<h3 class="events-section-header">Upcoming</h3>',y+=c.map(t=>u(t,!0)).join("")),l.innerHTML=y,l.querySelectorAll(".event-item").forEach(t=>{t.addEventListener("click",()=>{const d=t.getAttribute("data-event-id"),r=D.find(v=>v.eventID===d);r&&j(r,o[r.eventType]||o.default)})})}catch(m){console.error("Error loading events:",m),l.innerHTML='<p class="error-message">Error loading events.</p>'}}function j(l,$){const o=document.getElementById("modal-backdrop"),p=document.getElementById("modal-content");if(!o||!p)return;p.style.setProperty("--event-theme",$);const m=new Date,b=new Date(l.start);new Date(l.end);let h="";if(m<b){const t=Date.parse(l.start)-Date.parse(m),d=Math.floor(t/(1e3*60*60*24)),r=Math.floor(t/(1e3*60*60)%24);h=`Starts in: ${d>0?`${d}d ${r}h`:`${r}h`}`}else{const t=Date.parse(l.end)-Date.parse(m),d=Math.floor(t/(1e3*60*60*24)),r=Math.floor(t/(1e3*60*60)%24);h=`Ends in: ${d>0?`${d}d ${r}h`:`${r}h`}`}let c="";const u=l.extraData||{};if(l.eventType==="pokemon-spotlight-hour"&&u.spotlight){const t=u.spotlight;c=`
            <div class="event-details-grid">
                <div class="event-section-card">
                    <h4>Featured Pokémon</h4>
                    <div style="text-align:center; padding: 15px 0;">
                        <img src="${t.image}" alt="${t.name}" style="width:96px; height:96px; object-fit:contain;">
                        <div style="font-weight:700; font-size:1.2rem; margin-top:5px;">${t.name}</div>
                        ${t.canBeShiny?'<span style="color:#d4af37; font-weight:bold; font-size:0.85rem;">✨ Shiny Available</span>':""}
                    </div>
                </div>
                <div class="event-section-card" style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
                    <div style="font-size:0.9rem; font-weight:700; text-transform:uppercase; color:#718096; margin-bottom:5px;">Active Bonus</div>
                    <div style="font-size:1.5rem; font-weight:800; color:var(--event-theme); line-height:1.2; max-width:220px;">
                        ${t.bonus||"No Extra Bonus"}
                    </div>
                </div>
            </div>
        `}else if((l.eventType==="raid-battles"||l.eventType==="raid-hour"||l.eventType==="raid-day")&&u.raidbattles){const t=u.raidbattles,d=t.bosses||[],r=t.shinies||[];c=`
            <div class="event-details-grid">
                ${d.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${d.map(v=>`
                            <div class="event-tile">
                                <img src="${v.image}" alt="${v.name}">
                                <div class="event-tile-name">${v.name}</div>
                                ${v.canBeShiny?'<span class="shiny-indicator" title="Shiny Available">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${r.length>0?`
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${r.map(v=>`
                            <div class="event-tile">
                                <img src="${v.image}" alt="${v.name}">
                                <div class="event-tile-name">${v.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else if(l.eventType==="community-day"&&u.communityday){const t=u.communityday,d=t.spawns||[],r=t.bonuses||[],v=t.specialresearch||[];c=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div style="display:grid; grid-template-columns: 1fr; gap:20px; @media (min-width:768px) { grid-template-columns: 1fr 1fr; }">
                    ${d.length>0?`
                    <div class="event-section-card">
                        <h4>Featured Spawns</h4>
                        <div class="event-grid-list">
                            ${d.map(e=>`
                                <div class="event-tile">
                                    <img src="${e.image}" alt="${e.name}">
                                    <div class="event-tile-name">${e.name}</div>
                                    ${e.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>`:""}

                    ${r.length>0?`
                    <div class="event-section-card">
                        <h4>Event Bonuses</h4>
                        <div style="display:flex; flex-direction:column; gap:10px;">
                            ${r.map(e=>`
                                <div class="event-bonus-row">
                                    ${e.image?`<img src="${e.image}" alt="bonus icon" class="event-bonus-icon">`:""}
                                    <div class="event-bonus-text">${e.text}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>`:""}
                </div>

                ${v.length>0?`
                <div class="event-section-card">
                    <h4>Special Research Steps</h4>
                    <div class="research-timeline">
                        ${v.map(e=>`
                            <div class="research-step">
                                <div class="research-step-marker"></div>
                                <div class="research-step-title">${e.name}</div>
                                <div class="research-task-list">
                                    <div style="font-weight:700; margin-bottom:5px; color:#4a5568;">Tasks:</div>
                                    ${e.tasks.map(a=>`
                                        <div class="research-task-item">
                                            <span>${a.text}</span>
                                            <span class="research-reward-pill">
                                                <img src="${a.reward.image}" alt="reward">
                                                <span>${a.reward.text}</span>
                                            </span>
                                        </div>
                                    `).join("")}
                                    <div style="font-weight:700; margin: 8px 0 5px 0; color:#4a5568;">Step Rewards:</div>
                                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                        ${e.rewards.map(a=>`
                                            <span class="research-reward-pill">
                                                <img src="${a.image}" alt="reward">
                                                <span>${a.text}</span>
                                            </span>
                                        `).join("")}
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else{const t=u.generic?.hasSpawns,d=u.generic?.hasFieldResearchTasks;c=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div class="event-section-card" style="text-align:center; padding: 25px;">
                    <div style="font-size:1.1rem; font-weight:600; color:#4a5568; margin-bottom:15px;">
                        Standard Event details and timers are active. 
                    </div>
                    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                        <span style="display:flex; align-items:center; gap:6px; background:#f7fafc; padding:8px 16px; border-radius:30px; border:1px solid #edf2f7; font-weight:600;">
                            ${t?"✅ Wild Spawns Active":"❌ No Special Spawns"}
                        </span>
                        <span style="display:flex; align-items:center; gap:6px; background:#f7fafc; padding:8px 16px; border-radius:30px; border:1px solid #edf2f7; font-weight:600;">
                            ${d?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}p.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${l.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${l.heading}</span>
                <h2 class="event-modal-hero-title">${l.name}</h2>
                <div class="event-timer-large">📅 ${h}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${c}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${l.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const y=document.getElementById("modal-close-btn");y&&(y.onclick=()=>{o.classList.add("hidden")}),o.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",M);setInterval(M,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",$=>{const o=$.target,p=o.closest(".ranking-column");if(!p)return;const m=p.querySelector(".table-container");o.classList.contains("show-more-btn")&&(p.classList.add("expanded"),m&&m.classList.add("expanded")),o.classList.contains("show-less-btn")&&(p.classList.remove("expanded"),m&&m.classList.remove("expanded"))})});
