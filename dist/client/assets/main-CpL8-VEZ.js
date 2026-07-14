import"./loadHeader-C5942aND.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const m=document.getElementById("loading-overlay"),b=document.getElementById("rankings-grid"),l=document.getElementById("modal-backdrop"),u=document.getElementById("modal-content"),p={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function y(e){let s=null,i=1/0;for(const n in p){const v=Math.abs(p[n]-e);v<i&&(i=v,s=n)}return s}function h(e){const s=(i,n)=>{if(!n||!n.value||n.value<=1)return"";const v=n.text?`(${n.text})`:"";return`<li><span>${i} ${v}</span><span>1 in ${Math.round(n.value).toLocaleString()}</span></li>`};u.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${g(e)}
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
                    ${s("Perfect IVs",e.rarity.breakdown.iv)}
                    ${s("Shiny",e.rarity.breakdown.shiny)}
                    ${s("Lucky",e.rarity.breakdown.lucky)}
                    ${s("Origin",e.rarity.breakdown.origin)}
                </ul>
            </div>
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}function g(e){const s=[];let i=!1,n=!1,v=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(s.push('<span class="badge shlundo-badge">Shlundo</span>'),i=n=v=!0):e.isLucky&&e.isPerfect?(s.push('<span class="badge lundo-badge">Lundo</span>'),i=v=!0):e.isShiny&&e.isPerfect?(s.push('<span class="badge shundo-badge">Shundo</span>'),i=n=!0):e.isShiny&&e.isZeroIv&&(s.push('<span class="badge shnundo-badge">Shnundo</span>'),i=n=!0),!n&&e.isShiny&&s.push('<span class="badge shiny-badge">Shiny</span>'),!v&&e.isLucky?s.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&s.push('<span class="badge traded-badge">Traded</span>'),i||(e.isPerfect?s.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&s.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&s.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&s.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&s.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&s.push('<span class="badge mythical-badge">Mythical</span>'),s.join(" ")}function c(e){const s=e.iv.attack,i=e.iv.defense,n=e.iv.stamina,v=e.cpm,k=y(v);u.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${g(e)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${renderPlayerBadge({userId:e.userId,publicId:e.ownerPublicId})}</strong></div>
                        <div><span>CP</span><strong>${e.cp}</strong></div>
                        <div><span>Level</span><strong>${k}</strong></div>
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
                        <span class="stat-value">${s}/15</span>
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const x=document.getElementById("attack-bar");x.style.width=`${s/15*100}%`,x.style.backgroundColor=s===15?"#da7a79":"#f79513";const B=document.getElementById("defense-bar");B.style.width=`${i/15*100}%`,B.style.backgroundColor=i===15?"#da7a79":"#f79513";const I=document.getElementById("stamina-bar");I.style.width=`${n/15*100}%`,I.style.backgroundColor=n===15?"#da7a79":"#f79513"},100)}function f(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const t=localStorage.getItem("liteMode")==="enabled";async function a(e){u.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const s=await fetch(`/api/player-detail/${e}`);if(!s.ok)throw new Error("Could not fetch player details.");const i=await s.json();u.innerHTML=`
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
                    ${i.highlights.map(n=>`<div class="${`pokemon-card${n.typeColors.length>0?" colored":""}${t||!n.sprite?" no-image":""}`}" style="${f(n.typeColors)}">
                                    <img src="${n.sprite}" alt="${n.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${t?`<span class="lite-name-span" style="${f(n.typeColors)}">${n.name}</span>`:n.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${n.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}catch(s){console.error("Failed to open player modal:",s),u.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${s.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}}function r(){u.innerHTML=`
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const o=document.querySelector(".header-content"),$=document.querySelector(".container"),S=(o?o.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(L=>{L.style.width=`${S}px`})};var d=e;const s=await fetch("/api/rankings");if(!s.ok)throw new Error("Failed to load rankings from the server.");const i=await s.json(),v=await(await fetch("/api/check-auth-status")).json(),k=document.getElementById("main-title");v.loggedIn&&v.userId?(document.title=`Pokemon GO | #${v.userId}`,k&&(k.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:v.userId,publicId:v.publicId})}`)):(document.title="Pokemon GO | Dashboard",k&&(k.textContent="Pokémon GO Player Dashboard"));const x=document.getElementById("recent-players-body");x.innerHTML=i.recentPlayers.map(o=>`
            <tr class="clickable-row" data-player-id="${o.publicId}">
                <td>${renderPlayerBadge(o)}</td>
                <td>
                    ${o.buddy?`
                        <img src="${o.buddy.sprite}" alt="${o.buddy.name}" title="${o.buddy.name}">
                        ${t?`<span class="pokemon-name-lite" style="${f(o.buddy.typeColors)}">${o.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${o.kmWalked} km</td>
                <td class="hide-on-mobile">${o.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const B=document.getElementById("strongest-pokemon-body"),I=i.strongestPokemon;B.innerHTML=I.map((o,$)=>`
            <tr class="clickable-pokemon-row" data-index="${$}">
                <td>${$+1}</td>
                <td class="pokemon-cell">
                    <img src="${o.sprite}" alt="${o.name}">
                    ${t?`<span class="pokemon-name-lite" style="${f(o.typeColors)}">${o.name}</span>`:""}
                </td>
                <td><strong>${o.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:o.userId,publicId:o.ownerPublicId})}</td>
            </tr>
        `).join("");const j=document.getElementById("rarest-pokemon-body"),T=i.rarestPokemon;j.innerHTML=T.map((o,$)=>`
            <tr class="clickable-rarity-row" data-index="${$}">
                <td><strong>${$+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${o.sprite}" alt="${o.name}">
                    ${t?`<span class="pokemon-name-lite" style="${f(o.typeColors)}">${o.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${g(o)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:o.userId,publicId:o.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",o=>{const $=o.target.closest(".clickable-row");if($){const w=$.dataset.playerId;w&&a(w);return}const D=o.target.closest(".clickable-pokemon-row");if(D){const w=D.dataset.index,L=I[w];L&&c(L);return}const S=o.target.closest(".clickable-rarity-row");if(S){const w=S.dataset.index,L=T[w];L&&h(L)}}),m.classList.add("hidden"),b.classList.remove("hidden");const M=document.querySelector(".info-btn");M&&M.addEventListener("click",o=>{o.stopPropagation(),r()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),m.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}l.addEventListener("click",e=>{e.target===l&&(l.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let E=[];async function P(){const m=document.getElementById("events-container"),b="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",l={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function u(p){const y=Date.parse(p)-Date.parse(new Date);if(y<=0)return null;const h=Math.floor(y/(1e3*60*60*24)),g=Math.floor(y/(1e3*60*60)%24),c=Math.floor(y/1e3/60%60);return h>0?`${h}d ${g}h`:g>0?`${g}h ${c}m`:`${c}m`}try{const p=await fetch(b);if(!p.ok)throw new Error("Failed to fetch events");E=await p.json();const y=new Date,h=[],g=[];if(E.forEach(a=>{const r=new Date(a.start),d=new Date(a.end);y>=r&&y<=d?h.push(a):y<r&&g.push(a)}),g.sort((a,r)=>new Date(a.start)-new Date(r.start)),h.sort((a,r)=>new Date(a.end)-new Date(r.end)),h.length===0&&g.length===0){m.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}const c=(a,r)=>{const d=new Date(a.start),e=new Date(a.end),s=r?"Starts in":"Ends in",i=u(r?a.start:a.end),n=l[a.eventType]||l.default;return`
                <div class="event-item" data-event-id="${a.eventID}">
                    <div class="event-dot" style="background-color: ${n}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${a.name}">${a.name}</span>
                        <span class="event-timer">${s} ${i}</span>
                    </div>
                </div>
            `};let f="";h.length>0&&(f+='<h3 class="events-section-header">Ongoing</h3>',f+=h.map(a=>c(a,!1)).join("")),g.length>0&&(f+='<h3 class="events-section-header">Upcoming</h3>',f+=g.map(a=>c(a,!0)).join("")),m.innerHTML=f,m.querySelectorAll(".event-item").forEach(a=>{a.addEventListener("click",()=>{const r=a.getAttribute("data-event-id"),d=E.find(e=>e.eventID===r);d&&C(d,l[d.eventType]||l.default)})});const t=document.getElementById("expand-events-btn");t&&(t.onclick=()=>{R(l)})}catch(p){console.error("Error loading events:",p),m.innerHTML='<p class="error-message">Error loading events.</p>'}}function R(m){const b=document.getElementById("timeline-modal-backdrop"),l=document.getElementById("timeline-scroll-container"),u=document.getElementById("timeline-modal-close-btn");if(!b||!l||!u)return;u.onclick=()=>b.classList.add("hidden"),b.onclick=t=>{t.target===b&&b.classList.add("hidden")};const p=new Date;p.setHours(0,0,0,0);const y=[];for(let t=0;t<14;t++){const a=new Date(p);a.setDate(p.getDate()+t),y.push(a)}const h=new Date(y[13]);h.setHours(23,59,59,999);const g={};E.forEach(t=>{const a=new Date(t.start);new Date(t.end)<p||a>h||(g[t.eventType]||(g[t.eventType]=[]),g[t.eventType].push(t))});let c='<div class="timeline-grid">';c+='<div class="timeline-header-row">',c+='<div class="timeline-label-header">Event Category</div>';const f=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];y.forEach((t,a)=>{c+=`
            <div class="${`timeline-date-cell${a===0?" today":""}`}">
                <div>${f[t.getDay()]}</div>
                <div>${t.getDate()}</div>
            </div>
        `}),c+="</div>",Object.keys(g).forEach(t=>{const a=g[t],r=t.replace(/-/g," ");c+='<div class="timeline-row">',c+=`<div class="timeline-row-label">${r}</div>`;for(let d=0;d<14;d++)c+=`<div class="${`timeline-grid-cell${d===0?" today-col":""}`}"></div>`;c+='<div class="timeline-bar-wrapper">',a.forEach(d=>{const e=new Date(d.start),s=new Date(d.end);let i=0;e>p&&(i=Math.floor((e-p)/(1440*60*1e3)));let n=14;s<h&&(n=Math.ceil((s-p)/(1440*60*1e3))),i<0&&(i=0),n>14&&(n=14),n<=i&&(n=i+1);const v=m[d.eventType]||m.default,k=i*100,x=(n-i)*100-6;c+=`
                <div class="timeline-bar" 
                     style="left: ${k+3}px; width: ${x}px; background-color: ${v};"
                     title="${d.name}"
                     data-event-id="${d.eventID}">
                    ${d.name}
                </div>
            `}),c+="</div>",c+="</div>"}),c+="</div>",l.innerHTML=c,l.querySelectorAll(".timeline-bar").forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();const r=t.getAttribute("data-event-id"),d=E.find(e=>e.eventID===r);d&&C(d,m[d.eventType]||m.default)})}),b.classList.remove("hidden")}function C(m,b){const l=document.getElementById("modal-backdrop"),u=document.getElementById("modal-content");if(!l||!u)return;u.style.setProperty("--event-theme",b);const p=new Date,y=new Date(m.start);new Date(m.end);let h="";if(p<y){const t=Date.parse(m.start)-Date.parse(p),a=Math.floor(t/(1e3*60*60*24)),r=Math.floor(t/(1e3*60*60)%24);h=`Starts in: ${a>0?`${a}d ${r}h`:`${r}h`}`}else{const t=Date.parse(m.end)-Date.parse(p),a=Math.floor(t/(1e3*60*60*24)),r=Math.floor(t/(1e3*60*60)%24);h=`Ends in: ${a>0?`${a}d ${r}h`:`${r}h`}`}let g="";const c=m.extraData||{};if(m.eventType==="pokemon-spotlight-hour"&&c.spotlight){const t=c.spotlight;g=`
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
        `}else if((m.eventType==="raid-battles"||m.eventType==="raid-hour"||m.eventType==="raid-day")&&c.raidbattles){const t=c.raidbattles,a=t.bosses||[],r=t.shinies||[];g=`
            <div class="event-details-grid">
                ${a.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${a.map(d=>`
                            <div class="event-tile">
                                <img src="${d.image}" alt="${d.name}">
                                <div class="event-tile-name">${d.name}</div>
                                ${d.canBeShiny?'<span class="shiny-indicator" title="Shiny Available">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${r.length>0?`
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${r.map(d=>`
                            <div class="event-tile">
                                <img src="${d.image}" alt="${d.name}">
                                <div class="event-tile-name">${d.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else if(m.eventType==="community-day"&&c.communityday){const t=c.communityday,a=t.spawns||[],r=t.bonuses||[],d=t.specialresearch||[];g=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div style="display:grid; grid-template-columns: 1fr; gap:20px; @media (min-width:768px) { grid-template-columns: 1fr 1fr; }">
                    ${a.length>0?`
                    <div class="event-section-card">
                        <h4>Featured Spawns</h4>
                        <div class="event-grid-list">
                            ${a.map(e=>`
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

                ${d.length>0?`
                <div class="event-section-card">
                    <h4>Special Research Steps</h4>
                    <div class="research-timeline">
                        ${d.map(e=>`
                            <div class="research-step">
                                <div class="research-step-marker"></div>
                                <div class="research-step-title">${e.name}</div>
                                <div class="research-task-list">
                                    <div style="font-weight:700; margin-bottom:5px; color:#4a5568;">Tasks:</div>
                                    ${e.tasks.map(s=>`
                                        <div class="research-task-item">
                                            <span>${s.text}</span>
                                            <span class="research-reward-pill">
                                                <img src="${s.reward.image}" alt="reward">
                                                <span>${s.reward.text}</span>
                                            </span>
                                        </div>
                                    `).join("")}
                                    <div style="font-weight:700; margin: 8px 0 5px 0; color:#4a5568;">Step Rewards:</div>
                                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                        ${e.rewards.map(s=>`
                                            <span class="research-reward-pill">
                                                <img src="${s.image}" alt="reward">
                                                <span>${s.text}</span>
                                            </span>
                                        `).join("")}
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else{const t=c.generic?.hasSpawns,a=c.generic?.hasFieldResearchTasks;g=`
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
                            ${a?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}u.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${m.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${m.heading}</span>
                <h2 class="event-modal-hero-title">${m.name}</h2>
                <div class="event-timer-large">📅 ${h}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${g}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${m.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const f=document.getElementById("modal-close-btn");f&&(f.onclick=()=>{l.classList.add("hidden")}),l.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",P);setInterval(P,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",b=>{const l=b.target,u=l.closest(".ranking-column");if(!u)return;const p=u.querySelector(".table-container");l.classList.contains("show-more-btn")&&(u.classList.add("expanded"),p&&p.classList.add("expanded")),l.classList.contains("show-less-btn")&&(u.classList.remove("expanded"),p&&p.classList.remove("expanded"))})});
