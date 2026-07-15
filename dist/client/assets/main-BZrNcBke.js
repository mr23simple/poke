import"./loadHeader-apxuKQLa.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const c=document.getElementById("loading-overlay"),v=document.getElementById("rankings-grid"),r=document.getElementById("modal-backdrop"),y=document.getElementById("modal-content"),p={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function I(e){let n=null,i=1/0;for(const t in p){const s=Math.abs(p[t]-e);s<i&&(i=s,n=t)}return n}function k(e){const n=(i,t)=>{if(!t||!t.value||t.value<=1)return"";const s=t.text?`(${t.text})`:"";return`<li><span>${i} ${s}</span><span>1 in ${Math.round(t.value).toLocaleString()}</span></li>`};y.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${h(e)}
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
                    ${n("Perfect IVs",e.rarity.breakdown.iv)}
                    ${n("Shiny",e.rarity.breakdown.shiny)}
                    ${n("Lucky",e.rarity.breakdown.lucky)}
                    ${n("Origin",e.rarity.breakdown.origin)}
                </ul>
            </div>
        `,r.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{r.classList.add("hidden"),document.body.classList.remove("modal-open")}}function h(e){const n=[];let i=!1,t=!1,s=!1;const a={shiny:'<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z"/></svg>',lucky:'<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 12 10zm-2 2a2.5 2.5 0 1 0-2.5 2.5A2.5 2.5 0 0 0 10 12zm2 2a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 14zm2-2a2.5 2.5 0 1 0 2.5-2.5A2.5 2.5 0 0 0 14 12zm-3 2c0 2-2 4-4 4"/></svg>',traded:'<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/></svg>',zeroIv:'<svg width="14" height="14" fill="black" viewBox="0 0 24 24"><path d="M5 16L3 5L8.5 10L12 3L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"/></svg>',perfect:'<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5L8.5 10L12 3L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"/></svg>',shadow:'<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C11.5 3 10 6.5 10.5 8c.5 1.5 2 1.5 2.5 3s.5 2-.5 3c-1 1-2 .5-3-.5S9 11 9 9.5c0-2-2-4.5-3-5.5 1 2.5.5 6-.5 7.5S3.5 14 4 16c.5 2 2.5 4 4.5 4.5 3.5 1 7.5-.5 9-3.5 1.5-3 1-7-.5-9-1.5-2-3.5-3.5-5-6z"/></svg>',purified:'<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4 12h4m12 0h-4m-1.48-6.52l-2.83 2.83M8.31 15.69l-2.83 2.83m14.14 0l-2.83-2.83M8.31 8.31L5.48 5.48M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>',legendary:'<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-1.5 0-3 1.2-3 2.7 0 .8.4 1.5.9 2L7 9.5c-2.5.5-4.5 2-6 3.5l.5 1.5c1.8-.8 3.5-1.2 5.5-1l1-1.5 1.5 1c-1.2 2.2-1.7 3.8-1.7 5.5 0 2.2 2 3.5 3.2 3.5s3.2-1.3 3.2-3.5c0-1.7-.5-3.3-1.7-5.5l1.5-1 1 1.5c2-.2 3.7.2 5.5 1l.5-1.5c-1.5-1.5-3.5-3-6-3.5L14.1 6.7c.5-.5.9-1.2.9-2C15 3.2 13.5 2 12 2zm-1 3.5c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5zm2 0c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5z"/></svg>',mythical:'<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 1 1 0 0 0-2 0 7 7 0 1 1-7-7 1 1 0 0 0 0-2zm0 4a5 5 0 1 0 5 5 1 1 0 0 0-2 0 3 3 0 1 1-3-3 1 1 0 0 0 0-2z"/></svg>'};return e.isShiny&&e.isLucky&&e.isPerfect?(n.push(`<span class="badge shlundo-badge" title="Shlundo">${a.shiny}${a.lucky}${a.perfect}</span>`),i=t=s=!0):e.isLucky&&e.isPerfect?(n.push(`<span class="badge lundo-badge" title="Lundo">${a.lucky}${a.perfect}</span>`),i=s=!0):e.isShiny&&e.isPerfect?(n.push(`<span class="badge shundo-badge" title="Shundo">${a.shiny}${a.perfect}</span>`),i=t=!0):e.isShiny&&e.isZeroIv&&(n.push(`<span class="badge shnundo-badge" title="Shnundo">${a.shiny}${a.zeroIv}</span>`),i=t=!0),!t&&e.isShiny&&n.push(`<span class="badge shiny-badge" title="Shiny">${a.shiny}</span>`),!s&&e.isLucky?n.push(`<span class="badge lucky-badge" title="Lucky">${a.lucky}</span>`):e.isTraded&&!e.isLucky&&n.push(`<span class="badge traded-badge" title="Traded">${a.traded}</span>`),i||(e.isPerfect?n.push(`<span class="badge perfect-badge" title="Hundo">${a.perfect}</span>`):e.isZeroIv&&n.push(`<span class="badge zero-iv-badge" title="Nundo">${a.zeroIv}</span>`)),e.pokemonDisplay?.alignment===1&&n.push(`<span class="badge shadow-badge" title="Shadow">${a.shadow}</span>`),e.pokemonDisplay?.alignment===2&&n.push(`<span class="badge purified-badge" title="Purified">${a.purified}</span>`),e.isLegendary&&n.push(`<span class="badge legendary-badge" title="Legendary">${a.legendary}</span>`),e.isMythical&&n.push(`<span class="badge mythical-badge" title="Mythical">${a.mythical}</span>`),n.join(" ")}function w(e){const n=e.iv.attack,i=e.iv.defense,t=e.iv.stamina,s=e.cpm,a=I(s);y.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${h(e)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${renderPlayerBadge({userId:e.userId,publicId:e.ownerPublicId})}</strong></div>
                        <div><span>CP</span><strong>${e.cp}</strong></div>
                        <div><span>Level</span><strong>${a}</strong></div>
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
                        <span class="stat-value">${n}/15</span>
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
                        <span class="stat-value">${t}/15</span>
                    </div>
                </div>
            </div>
        `,r.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{r.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const M=document.getElementById("attack-bar");M.style.width=`${n/15*100}%`,M.style.backgroundColor=n===15?"#da7a79":"#f79513";const l=document.getElementById("defense-bar");l.style.width=`${i/15*100}%`,l.style.backgroundColor=i===15?"#da7a79":"#f79513";const g=document.getElementById("stamina-bar");g.style.width=`${t/15*100}%`,g.style.backgroundColor=t===15?"#da7a79":"#f79513"},100)}function m(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const b=localStorage.getItem("liteMode")==="enabled";async function T(e){y.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,r.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{r.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const n=await fetch(`/api/player-detail/${e}`);if(!n.ok)throw new Error("Could not fetch player details.");const i=await n.json();y.innerHTML=`
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
                    ${i.highlights.map(t=>`<div class="${`pokemon-card${t.typeColors.length>0?" colored":""}${b||!t.sprite?" no-image":""}`}" style="${m(t.typeColors)}">
                                    <img src="${t.sprite}" alt="${t.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${b?`<span class="lite-name-span" style="${m(t.typeColors)}">${t.name}</span>`:t.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${t.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>r.classList.add("hidden")}catch(n){console.error("Failed to open player modal:",n),y.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${n.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>r.classList.add("hidden")}}function d(){y.innerHTML=`
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
        `,r.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{r.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const o=document.querySelector(".header-content"),B=document.querySelector(".container"),L=(o?o.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(S=>{S.style.width=`${L}px`})};var f=e;const n=await fetch("/api/rankings");if(!n.ok)throw new Error("Failed to load rankings from the server.");const i=await n.json(),s=await(await fetch("/api/check-auth-status")).json(),a=document.getElementById("main-title");s.loggedIn&&s.userId?(document.title=`Pokemon GO | #${s.userId}`,a&&(a.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:s.userId,publicId:s.publicId})}`)):(document.title="Pokemon GO | Dashboard",a&&(a.textContent="Pokémon GO Player Dashboard"));const M=document.getElementById("recent-players-body");M.innerHTML=i.recentPlayers.map(o=>`
            <tr class="clickable-row" data-player-id="${o.publicId}">
                <td>${renderPlayerBadge(o)}</td>
                <td>
                    ${o.buddy?`
                        <img src="${o.buddy.sprite}" alt="${o.buddy.name}" title="${o.buddy.name}">
                        ${b?`<span class="pokemon-name-lite" style="${m(o.buddy.typeColors)}">${o.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${o.kmWalked} km</td>
                <td class="hide-on-mobile">${o.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const l=document.getElementById("strongest-pokemon-body"),g=i.strongestPokemon;l.innerHTML=g.map((o,B)=>`
            <tr class="clickable-pokemon-row" data-index="${B}">
                <td>${B+1}</td>
                <td class="pokemon-cell">
                    <img src="${o.sprite}" alt="${o.name}">
                    ${b?`<span class="pokemon-name-lite" style="${m(o.typeColors)}">${o.name}</span>`:""}
                </td>
                <td><strong>${o.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:o.userId,publicId:o.ownerPublicId})}</td>
            </tr>
        `).join("");const D=document.getElementById("rarest-pokemon-body"),E=i.rarestPokemon;D.innerHTML=E.map((o,B)=>`
            <tr class="clickable-rarity-row" data-index="${B}">
                <td><strong>${B+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${o.sprite}" alt="${o.name}">
                    ${b?`<span class="pokemon-name-lite" style="${m(o.typeColors)}">${o.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${h(o)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:o.userId,publicId:o.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",o=>{const B=o.target.closest(".clickable-row");if(B){const x=B.dataset.playerId;x&&T(x);return}const $=o.target.closest(".clickable-pokemon-row");if($){const x=$.dataset.index,S=g[x];S&&w(S);return}const L=o.target.closest(".clickable-rarity-row");if(L){const x=L.dataset.index,S=E[x];S&&k(S)}}),c.classList.add("hidden"),v.classList.remove("hidden");const j=document.querySelector(".info-btn");j&&j.addEventListener("click",o=>{o.stopPropagation(),d()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),c.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}r.addEventListener("click",e=>{e.target===r&&(r.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let O=[],F=!1;function u(c){if(!c)return new Date;const v=c.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);return v?new Date(parseInt(v[1],10),parseInt(v[2],10)-1,parseInt(v[3],10),parseInt(v[4],10),parseInt(v[5],10),parseInt(v[6],10)):new Date(c)}async function N(){const c=document.getElementById("events-container"),v="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",r={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function y(p){const I=u(p).getTime()-new Date().getTime();if(I<=0)return null;const k=Math.floor(I/(1e3*60*60*24)),h=Math.floor(I/(1e3*60*60)%24),w=Math.floor(I/1e3/60%60);return k>0?`${k}d ${h}h`:h>0?`${h}h ${w}m`:`${w}m`}try{const p=await fetch(v);if(!p.ok)throw new Error("Failed to fetch events");O=await p.json();const I=new Date,k=[],h=[];if(O.forEach(t=>{const s=u(t.start),a=u(t.end);I>=s&&I<=a?k.push(t):I<s&&h.push(t)}),h.sort((t,s)=>u(t.start)-u(s.start)),k.sort((t,s)=>u(t.end)-u(s.end)),k.length===0&&h.length===0){c.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}let w=k,m=h;const b=5,T=k.length+h.length,d=T>b;!F&&d&&(k.length>=b?(w=k.slice(0,b),m=[]):(w=k,m=h.slice(0,b-k.length)));const f=(t,s)=>{const a=u(t.start),M=u(t.end),l=s?"Starts in":"Ends in",g=y(s?t.start:t.end),D=r[t.eventType]||r.default;return`
                <div class="event-item" data-event-id="${t.eventID}">
                    <div class="event-dot" style="background-color: ${D}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${t.name}">${t.name}</span>
                        <span class="event-timer">${l} ${g}</span>
                    </div>
                </div>
            `};let e="";w.length>0&&(e+='<h3 class="events-section-header">Ongoing</h3>',e+=w.map(t=>f(t,!1)).join("")),m.length>0&&(e+='<h3 class="events-section-header">Upcoming</h3>',e+=m.map(t=>f(t,!0)).join("")),d&&(e+=`
                <button id="toggle-events-btn" class="btn btn-block btn-neutral mt-3">
                    ${F?"Show Less":`Show All (${T})`}
                </button>
            `),c.innerHTML=e,c.querySelectorAll(".event-item").forEach(t=>{t.addEventListener("click",()=>{const s=t.getAttribute("data-event-id"),a=O.find(M=>M.eventID===s);a&&q(a,r[a.eventType]||r.default)})});const n=document.getElementById("toggle-events-btn");n&&(n.onclick=()=>{F=!F,N()});const i=document.getElementById("expand-events-btn");i&&(i.onclick=()=>{_(r)})}catch(p){console.error("Error loading events:",p),c.innerHTML='<p class="error-message">Error loading events.</p>'}}function _(c){const v=document.getElementById("timeline-modal-backdrop"),r=document.getElementById("timeline-scroll-container"),y=document.getElementById("timeline-modal-close-btn"),p=document.getElementById("expand-events-btn");if(!v||!r||!y)return;const I=window.innerWidth<=768,k=I?110:160,h=I?70:100,w=()=>{v.close(),p&&p.setAttribute("aria-expanded","false")};y.onclick=w,v.onclick=l=>{l.target===v&&w()};const m=new Date;m.setHours(0,0,0,0);const b=O.filter(l=>u(l.end)>=m);let T=new Date(m);b.forEach(l=>{const g=u(l.end);g>T&&(T=g)});const d=1440*60*1e3,f=Math.ceil((T-m)/d),e=Math.min(Math.max(14,f),90),n=[];for(let l=0;l<e;l++){const g=new Date(m);g.setDate(m.getDate()+l),n.push(g)}const i=new Date(n[e-1]);i.setHours(23,59,59,999);const t={};b.forEach(l=>{const g=u(l.start);u(l.end)<m||g>i||(t[l.eventType]||(t[l.eventType]=[]),t[l.eventType].push(l))});let s=`<div class="timeline-grid" style="grid-template-columns: ${k}px repeat(${e}, ${h}px);">`;s+='<div class="timeline-header-row">',s+='<div class="timeline-label-header">Event Category</div>';const a=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];n.forEach((l,g)=>{s+=`
            <div class="${`timeline-date-cell${g===0?" today":""}`}">
                <div>${a[l.getDay()]}</div>
                <div>${l.getDate()}</div>
            </div>
        `}),s+="</div>";let M=2;Object.keys(t).forEach(l=>{const g=t[l],D=l.replace(/-/g," ");g.sort(($,L)=>u($.start)-u(L.start));const E=[],j=g.map($=>{const L=u($.start),x=u($.end),S=L.getFullYear()===x.getFullYear()&&L.getMonth()===x.getMonth()&&L.getDate()===x.getDate();let W=!1;if(S){const H=new Date(L);H.setHours(0,0,0,0);const G=new Date(L);G.setHours(23,59,59,999),W=g.some(V=>{if(V.eventID===$.eventID)return!1;const Z=u(V.start);return u(V.end)>=H&&Z<=G})}let z=L,R=x;S&&!W&&(z=new Date(L),z.setHours(0,0,0,0),R=new Date(x),R.setHours(23,59,59,999));let C=0;z>m&&(C=(z-m)/(1440*60*1e3));let P=e;R<i&&(P=(R-m)/(1440*60*1e3)),C<0&&(C=0),P>e&&(P=e),P<=C&&(P=C+1/24);let A=-1;for(let H=0;H<E.length;H++)if(C>=E[H]-.01){A=H;break}return A===-1?(E.push(P),A=E.length-1):E[A]=P,{event:$,startCol:C,endCol:P,track:A}}),B=16+Math.max(1,E.length)*34;s+='<div class="timeline-row">',s+=`<div class="timeline-row-label" style="height: ${B}px; grid-row: ${M};">${D}</div>`;for(let $=0;$<e;$++)s+=`<div class="${`timeline-grid-cell${$===0?" today-col":""}`}" style="height: ${B}px; grid-row: ${M};"></div>`;s+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${e}; grid-template-columns: repeat(${e}, ${h}px); height: ${B}px; grid-row: ${M};">`,j.forEach(({event:$,startCol:L,endCol:x,track:S})=>{const W=c[$.eventType]||c.default,z=L*h,R=(x-L)*h-6,C=10+S*34;s+=`
                <div class="timeline-bar" 
                     style="left: ${z+3}px; width: ${R}px; top: ${C}px; background-color: ${W};"
                     title="${$.name}"
                     data-event-id="${$.eventID}">
                    ${$.name}
                </div>
            `}),s+="</div>",s+="</div>",M++}),s+="</div>",r.innerHTML=s,r.querySelectorAll(".timeline-bar").forEach(l=>{l.addEventListener("click",g=>{g.stopPropagation();const D=l.getAttribute("data-event-id"),E=O.find(j=>j.eventID===D);E&&q(E,c[E.eventType]||c.default)})}),v.showModal(),p&&p.setAttribute("aria-expanded","true")}function q(c,v){const r=document.getElementById("modal-backdrop"),y=document.getElementById("modal-content");if(!r||!y)return;y.style.setProperty("--event-theme",v);const p=new Date,I=u(c.start),k=u(c.end);let h="";if(p<I){const d=I.getTime()-p.getTime(),f=Math.floor(d/(1e3*60*60*24)),e=Math.floor(d/(1e3*60*60)%24);h=`Starts in: ${f>0?`${f}d ${e}h`:`${e}h`}`}else{const d=k.getTime()-p.getTime(),f=Math.floor(d/(1e3*60*60*24)),e=Math.floor(d/(1e3*60*60)%24);h=`Ends in: ${f>0?`${f}d ${e}h`:`${e}h`}`}let w="";const m=c.extraData||{};if(c.eventType==="pokemon-spotlight-hour"&&m.spotlight){const d=m.spotlight;w=`
            <div class="event-details-grid">
                <div class="event-section-card">
                    <h4>Featured Pokémon</h4>
                    <div class="spotlight-pokemon-container">
                        <div class="event-tile spotlight-pokemon-tile">
                            <img src="${d.image}" alt="${d.name}" style="width: 80px; height: 80px;">
                            <div class="event-tile-name" style="font-weight: 700; font-size: 0.95rem;">${d.name}</div>
                            ${d.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                        </div>
                    </div>
                </div>
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div class="spotlight-bonus-container">
                        <div class="event-bonus-row">
                            <span class="spotlight-bonus-icon">🎁</span>
                            <div class="event-bonus-text">${d.bonus||"No Extra Bonus"}</div>
                        </div>
                    </div>
                </div>
            </div>
        `}else if((c.eventType==="raid-battles"||c.eventType==="raid-hour"||c.eventType==="raid-day")&&m.raidbattles){const d=m.raidbattles,f=d.bosses||[],e=d.shinies||[];w=`
            <div class="event-details-grid">
                ${f.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${f.map(n=>`
                            <div class="event-tile">
                                <img src="${n.image}" alt="${n.name}">
                                <div class="event-tile-name">${n.name}</div>
                                ${n.canBeShiny?'<span class="shiny-indicator" title="Shiny Available">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${e.length>0?`
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${e.map(n=>`
                            <div class="event-tile">
                                <img src="${n.image}" alt="${n.name}">
                                <div class="event-tile-name">${n.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else if(c.eventType==="community-day"&&m.communityday){const d=m.communityday,f=d.spawns||[],e=d.bonuses||[],n=d.shinies||[],i=d.bonusDisclaimers||[],t=d.specialresearch||[];w=`
            <div class="event-details-grid">
                ${f.length>0||n.length>0?`
                <div class="event-section-card">
                    ${f.length>0?`
                    <h4>Featured Spawns</h4>
                    <div class="event-grid-list" style="margin-bottom: 20px;">
                        ${f.map(s=>`
                            <div class="event-tile">
                                <img src="${s.image}" alt="${s.name}">
                                <div class="event-tile-name">${s.name}</div>
                                ${s.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>`:""}

                    ${n.length>0?`
                    <h4 style="margin-top: 15px; border-top: 1px solid #edf2f7; padding-top: 15px;">New / Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${n.map(s=>`
                            <div class="event-tile">
                                <img src="${s.image}" alt="${s.name}">
                                <div class="event-tile-name">${s.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>`:""}
                </div>`:""}

                ${e.length>0?`
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div style="display:flex; flex-direction:row; flex-wrap:wrap; gap:10px;">
                        ${e.map(s=>`
                            <div class="event-bonus-row">
                                ${s.image?`<img src="${s.image}" alt="bonus icon" class="event-bonus-icon">`:""}
                                <div class="event-bonus-text">${s.text}</div>
                            </div>
                        `).join("")}
                    </div>
                    ${i.length>0?`
                    <div class="bonus-disclaimer" style="font-size:0.75rem; color:#718096; margin-top:12px; border-top:1px solid #edf2f7; padding-top:8px; line-height:1.4;">
                        ${i.map(s=>`<div style="margin-bottom: 4px;">${s}</div>`).join("")}
                    </div>`:""}
                </div>`:""}

                ${t.length>0?`
                <div class="event-section-card" style="grid-column: 1 / -1;">
                    <h4>Special Research Steps</h4>
                    <div class="research-timeline">
                        ${t.map(s=>`
                            <div class="research-step">
                                <div class="research-step-marker"></div>
                                <div class="research-step-title">${s.name}</div>
                                <div class="research-task-list">
                                    <div style="font-weight:700; margin-bottom:5px; color:#4a5568;">Tasks:</div>
                                    ${s.tasks.map(a=>`
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
                                        ${s.rewards.map(a=>`
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
        `}else{const d=m.generic?.hasSpawns,f=m.generic?.hasFieldResearchTasks;w=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div class="event-section-card" style="text-align:center; padding: 25px;">
                    <div style="font-size:1.1rem; font-weight:600; color:#4a5568; margin-bottom:15px;" class="generic-event-desc">
                        Standard Event details and timers are active. 
                    </div>
                    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                        <span class="event-status-pill">
                            ${d?"✅ Wild Spawns Active":"❌ No Special Spawns"}
                        </span>
                        <span class="event-status-pill">
                            ${f?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}y.innerHTML=`
        <form method="dialog">
            <button id="modal-close-btn" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30">✕</button>
        </form>
        <div class="event-modal-hero" style="background-image: url('${c.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${c.heading}</span>
                <h2 class="event-modal-hero-title">${c.name}</h2>
                <div class="event-timer-large">📅 ${h}</div>
            </div>
        </div>
        <div style="padding: 15px;">
            ${w}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${c.link}" target="_blank" class="btn btn-primary">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const b=r,T=document.getElementById("modal-close-btn");T&&(T.onclick=d=>{d.preventDefault(),b.close()}),b.onclick=d=>{d.target===b&&b.close()},b.showModal()}document.addEventListener("DOMContentLoaded",N);setInterval(N,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",v=>{const r=v.target,y=r.closest(".ranking-column");if(!y)return;const p=y.querySelector(".table-container");r.classList.contains("show-more-btn")&&(y.classList.add("expanded"),p&&p.classList.add("expanded")),r.classList.contains("show-less-btn")&&(y.classList.remove("expanded"),p&&p.classList.remove("expanded"))})});
