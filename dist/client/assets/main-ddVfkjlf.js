import"./loadHeader-CY8Lp3rz.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const p=document.getElementById("loading-overlay"),b=document.getElementById("rankings-grid"),r=document.getElementById("modal-backdrop"),v=document.getElementById("modal-content"),m={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function f(e){let t=null,s=1/0;for(const n in m){const l=Math.abs(m[n]-e);l<s&&(s=l,t=n)}return t}function h(e){const t=(s,n)=>{if(!n||!n.value||n.value<=1)return"";const l=n.text?`(${n.text})`:"";return`<li><span>${s} ${l}</span><span>1 in ${Math.round(n.value).toLocaleString()}</span></li>`};v.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${u(e)}
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
                    ${t("Perfect IVs",e.rarity.breakdown.iv)}
                    ${t("Shiny",e.rarity.breakdown.shiny)}
                    ${t("Lucky",e.rarity.breakdown.lucky)}
                    ${t("Origin",e.rarity.breakdown.origin)}
                </ul>
            </div>
        `,r.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{r.classList.add("hidden"),document.body.classList.remove("modal-open")}}function u(e){const t=[];let s=!1,n=!1,l=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(t.push('<span class="badge shlundo-badge">Shlundo</span>'),s=n=l=!0):e.isLucky&&e.isPerfect?(t.push('<span class="badge lundo-badge">Lundo</span>'),s=l=!0):e.isShiny&&e.isPerfect?(t.push('<span class="badge shundo-badge">Shundo</span>'),s=n=!0):e.isShiny&&e.isZeroIv&&(t.push('<span class="badge shnundo-badge">Shnundo</span>'),s=n=!0),!n&&e.isShiny&&t.push('<span class="badge shiny-badge">Shiny</span>'),!l&&e.isLucky?t.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&t.push('<span class="badge traded-badge">Traded</span>'),s||(e.isPerfect?t.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&t.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&t.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&t.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&t.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&t.push('<span class="badge mythical-badge">Mythical</span>'),t.join(" ")}function y(e){const t=e.iv.attack,s=e.iv.defense,n=e.iv.stamina,l=e.cpm,$=f(l);v.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${u(e)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${renderPlayerBadge({userId:e.userId,publicId:e.ownerPublicId})}</strong></div>
                        <div><span>CP</span><strong>${e.cp}</strong></div>
                        <div><span>Level</span><strong>${$}</strong></div>
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
                        <span class="stat-value">${t}/15</span>
                    </div>
                    <div class="stat-bar-container">
                        <span class="stat-label">Defense</span>
                        <div class="stat-bar">
                            <div id="defense-bar" class="stat-bar-fill"></div>
                        </div>
                        <span class="stat-value">${s}/15</span>
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
        `,r.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{r.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const x=document.getElementById("attack-bar");x.style.width=`${t/15*100}%`,x.style.backgroundColor=t===15?"#da7a79":"#f79513";const k=document.getElementById("defense-bar");k.style.width=`${s/15*100}%`,k.style.backgroundColor=s===15?"#da7a79":"#f79513";const w=document.getElementById("stamina-bar");w.style.width=`${n/15*100}%`,w.style.backgroundColor=n===15?"#da7a79":"#f79513"},100)}function g(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const d=localStorage.getItem("liteMode")==="enabled";async function a(e){v.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,r.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{r.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const t=await fetch(`/api/player-detail/${e}`);if(!t.ok)throw new Error("Could not fetch player details.");const s=await t.json();v.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <h2>${renderPlayerBadge({userId:s.userId,publicId:s.publicId})}</h2>
                <div class="grid-stats">
                    <div><span>Total XP</span><strong>${s.totalXp.toLocaleString()}</strong></div>
                    <div><span>Pokémon Caught</span><strong>${s.pokemonCaught.toLocaleString()}</strong></div>
                    <div><span>Distance Walked</span><strong>${s.kmWalked.toFixed(1)} km</strong></div>
                    <div><span>PokéStops Visited</span><strong>${s.pokestopsVisited.toLocaleString()}</strong></div>
                </div>
                
                <h3>Highlights</h3>
                <div id="modal-pokemon-container">
                    ${s.highlights.map(n=>`<div class="${`pokemon-card${n.typeColors.length>0?" colored":""}${d||!n.sprite?" no-image":""}`}" style="${g(n.typeColors)}">
                                    <img src="${n.sprite}" alt="${n.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${d?`<span class="lite-name-span" style="${g(n.typeColors)}">${n.name}</span>`:n.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${n.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>r.classList.add("hidden")}catch(t){console.error("Failed to open player modal:",t),v.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${t.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>r.classList.add("hidden")}}function c(){v.innerHTML=`
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
        `,r.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{r.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const i=document.querySelector(".header-content"),L=document.querySelector(".container"),T=(i?i.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(E=>{E.style.width=`${T}px`})};var o=e;const t=await fetch("/api/rankings");if(!t.ok)throw new Error("Failed to load rankings from the server.");const s=await t.json(),l=await(await fetch("/api/check-auth-status")).json(),$=document.getElementById("main-title");l.loggedIn&&l.userId?(document.title=`Pokemon GO | #${l.userId}`,$&&($.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:l.userId,publicId:l.publicId})}`)):(document.title="Pokemon GO | Dashboard",$&&($.textContent="Pokémon GO Player Dashboard"));const x=document.getElementById("recent-players-body");x.innerHTML=s.recentPlayers.map(i=>`
            <tr class="clickable-row" data-player-id="${i.publicId}">
                <td>${renderPlayerBadge(i)}</td>
                <td>
                    ${i.buddy?`
                        <img src="${i.buddy.sprite}" alt="${i.buddy.name}" title="${i.buddy.name}">
                        ${d?`<span class="pokemon-name-lite" style="${g(i.buddy.typeColors)}">${i.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${i.kmWalked} km</td>
                <td class="hide-on-mobile">${i.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const k=document.getElementById("strongest-pokemon-body"),w=s.strongestPokemon;k.innerHTML=w.map((i,L)=>`
            <tr class="clickable-pokemon-row" data-index="${L}">
                <td>${L+1}</td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${d?`<span class="pokemon-name-lite" style="${g(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td><strong>${i.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join("");const M=document.getElementById("rarest-pokemon-body"),B=s.rarestPokemon;M.innerHTML=B.map((i,L)=>`
            <tr class="clickable-rarity-row" data-index="${L}">
                <td><strong>${L+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${d?`<span class="pokemon-name-lite" style="${g(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${u(i)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",i=>{const L=i.target.closest(".clickable-row");if(L){const I=L.dataset.playerId;I&&a(I);return}const P=i.target.closest(".clickable-pokemon-row");if(P){const I=P.dataset.index,E=w[I];E&&y(E);return}const T=i.target.closest(".clickable-rarity-row");if(T){const I=T.dataset.index,E=B[I];E&&h(E)}}),p.classList.add("hidden"),b.classList.remove("hidden");const S=document.querySelector(".info-btn");S&&S.addEventListener("click",i=>{i.stopPropagation(),c()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),p.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}r.addEventListener("click",e=>{e.target===r&&(r.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let D=[];async function C(){const p=document.getElementById("events-container"),b="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",r={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function v(m){const f=Date.parse(m)-Date.parse(new Date);if(f<=0)return null;const h=Math.floor(f/(1e3*60*60*24)),u=Math.floor(f/(1e3*60*60)%24),y=Math.floor(f/1e3/60%60);return h>0?`${h}d ${u}h`:u>0?`${u}h ${y}m`:`${y}m`}try{const m=await fetch(b);if(!m.ok)throw new Error("Failed to fetch events");D=await m.json();const f=new Date,h=[],u=[];if(D.forEach(a=>{const c=new Date(a.start),o=new Date(a.end);f>=c&&f<=o?h.push(a):f<c&&u.push(a)}),u.sort((a,c)=>new Date(a.start)-new Date(c.start)),h.sort((a,c)=>new Date(a.end)-new Date(c.end)),h.length===0&&u.length===0){p.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}const y=(a,c)=>{const o=new Date(a.start),e=new Date(a.end),t=c?"Starts in":"Ends in",s=v(c?a.start:a.end),n=r[a.eventType]||r.default;return`
                <div class="event-item" data-event-id="${a.eventID}">
                    <div class="event-dot" style="background-color: ${n}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${a.name}">${a.name}</span>
                        <span class="event-timer">${t} ${s}</span>
                    </div>
                </div>
            `};let g="";h.length>0&&(g+='<h3 class="events-section-header">Ongoing</h3>',g+=h.map(a=>y(a,!1)).join("")),u.length>0&&(g+='<h3 class="events-section-header">Upcoming</h3>',g+=u.map(a=>y(a,!0)).join("")),p.innerHTML=g,p.querySelectorAll(".event-item").forEach(a=>{a.addEventListener("click",()=>{const c=a.getAttribute("data-event-id"),o=D.find(e=>e.eventID===c);o&&j(o,r[o.eventType]||r.default)})});const d=document.getElementById("expand-events-btn");d&&(d.onclick=()=>{R(r)})}catch(m){console.error("Error loading events:",m),p.innerHTML='<p class="error-message">Error loading events.</p>'}}function R(p){const b=document.getElementById("timeline-modal-backdrop"),r=document.getElementById("timeline-scroll-container"),v=document.getElementById("timeline-modal-close-btn");if(!b||!r||!v)return;v.onclick=()=>b.classList.add("hidden"),b.onclick=t=>{t.target===b&&b.classList.add("hidden")};const m=new Date;m.setHours(0,0,0,0);const f=D.filter(t=>new Date(t.end)>=m);let h=new Date(m);f.forEach(t=>{const s=new Date(t.end);s>h&&(h=s)});const u=1440*60*1e3,y=Math.ceil((h-m)/u),g=Math.min(Math.max(14,y),90),d=[];for(let t=0;t<g;t++){const s=new Date(m);s.setDate(m.getDate()+t),d.push(s)}const a=new Date(d[g-1]);a.setHours(23,59,59,999);const c={};f.forEach(t=>{const s=new Date(t.start);new Date(t.end)<m||s>a||(c[t.eventType]||(c[t.eventType]=[]),c[t.eventType].push(t))});let o=`<div class="timeline-grid" style="grid-template-columns: 160px repeat(${g}, 100px);">`;o+='<div class="timeline-header-row">',o+='<div class="timeline-label-header">Event Category</div>';const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];d.forEach((t,s)=>{o+=`
            <div class="${`timeline-date-cell${s===0?" today":""}`}">
                <div>${e[t.getDay()]}</div>
                <div>${t.getDate()}</div>
            </div>
        `}),o+="</div>",Object.keys(c).forEach(t=>{const s=c[t],n=t.replace(/-/g," ");o+='<div class="timeline-row">',o+=`<div class="timeline-row-label">${n}</div>`;for(let l=0;l<g;l++)o+=`<div class="${`timeline-grid-cell${l===0?" today-col":""}`}"></div>`;o+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${g}; grid-template-columns: repeat(${g}, 100px);">`,s.forEach(l=>{const $=new Date(l.start),x=new Date(l.end);let k=0;$>m&&(k=Math.floor(($-m)/(1440*60*1e3)));let w=g;x<a&&(w=Math.ceil((x-m)/(1440*60*1e3))),k<0&&(k=0),w>g&&(w=g),w<=k&&(w=k+1);const M=p[l.eventType]||p.default,B=k*100,S=(w-k)*100-6;o+=`
                <div class="timeline-bar" 
                     style="left: ${B+3}px; width: ${S}px; background-color: ${M};"
                     title="${l.name}"
                     data-event-id="${l.eventID}">
                    ${l.name}
                </div>
            `}),o+="</div>",o+="</div>"}),o+="</div>",r.innerHTML=o,r.querySelectorAll(".timeline-bar").forEach(t=>{t.addEventListener("click",s=>{s.stopPropagation();const n=t.getAttribute("data-event-id"),l=D.find($=>$.eventID===n);l&&j(l,p[l.eventType]||p.default)})}),b.classList.remove("hidden")}function j(p,b){const r=document.getElementById("modal-backdrop"),v=document.getElementById("modal-content");if(!r||!v)return;v.style.setProperty("--event-theme",b);const m=new Date,f=new Date(p.start);new Date(p.end);let h="";if(m<f){const d=Date.parse(p.start)-Date.parse(m),a=Math.floor(d/(1e3*60*60*24)),c=Math.floor(d/(1e3*60*60)%24);h=`Starts in: ${a>0?`${a}d ${c}h`:`${c}h`}`}else{const d=Date.parse(p.end)-Date.parse(m),a=Math.floor(d/(1e3*60*60*24)),c=Math.floor(d/(1e3*60*60)%24);h=`Ends in: ${a>0?`${a}d ${c}h`:`${c}h`}`}let u="";const y=p.extraData||{};if(p.eventType==="pokemon-spotlight-hour"&&y.spotlight){const d=y.spotlight;u=`
            <div class="event-details-grid">
                <div class="event-section-card">
                    <h4>Featured Pokémon</h4>
                    <div style="text-align:center; padding: 15px 0;">
                        <img src="${d.image}" alt="${d.name}" style="width:96px; height:96px; object-fit:contain;">
                        <div style="font-weight:700; font-size:1.2rem; margin-top:5px;">${d.name}</div>
                        ${d.canBeShiny?'<span style="color:#d4af37; font-weight:bold; font-size:0.85rem;">✨ Shiny Available</span>':""}
                    </div>
                </div>
                <div class="event-section-card" style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
                    <div style="font-size:0.9rem; font-weight:700; text-transform:uppercase; color:#718096; margin-bottom:5px;">Active Bonus</div>
                    <div style="font-size:1.5rem; font-weight:800; color:var(--event-theme); line-height:1.2; max-width:220px;">
                        ${d.bonus||"No Extra Bonus"}
                    </div>
                </div>
            </div>
        `}else if((p.eventType==="raid-battles"||p.eventType==="raid-hour"||p.eventType==="raid-day")&&y.raidbattles){const d=y.raidbattles,a=d.bosses||[],c=d.shinies||[];u=`
            <div class="event-details-grid">
                ${a.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${a.map(o=>`
                            <div class="event-tile">
                                <img src="${o.image}" alt="${o.name}">
                                <div class="event-tile-name">${o.name}</div>
                                ${o.canBeShiny?'<span class="shiny-indicator" title="Shiny Available">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${c.length>0?`
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${c.map(o=>`
                            <div class="event-tile">
                                <img src="${o.image}" alt="${o.name}">
                                <div class="event-tile-name">${o.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else if(p.eventType==="community-day"&&y.communityday){const d=y.communityday,a=d.spawns||[],c=d.bonuses||[],o=d.specialresearch||[];u=`
            <div class="event-details-grid">
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

                ${c.length>0?`
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${c.map(e=>`
                            <div class="event-bonus-row">
                                ${e.image?`<img src="${e.image}" alt="bonus icon" class="event-bonus-icon">`:""}
                                <div class="event-bonus-text">${e.text}</div>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${o.length>0?`
                <div class="event-section-card" style="grid-column: 1 / -1;">
                    <h4>Special Research Steps</h4>
                    <div class="research-timeline">
                        ${o.map(e=>`
                            <div class="research-step">
                                <div class="research-step-marker"></div>
                                <div class="research-step-title">${e.name}</div>
                                <div class="research-task-list">
                                    <div style="font-weight:700; margin-bottom:5px; color:#4a5568;">Tasks:</div>
                                    ${e.tasks.map(t=>`
                                        <div class="research-task-item">
                                            <span>${t.text}</span>
                                            <span class="research-reward-pill">
                                                <img src="${t.reward.image}" alt="reward">
                                                <span>${t.reward.text}</span>
                                            </span>
                                        </div>
                                    `).join("")}
                                    <div style="font-weight:700; margin: 8px 0 5px 0; color:#4a5568;">Step Rewards:</div>
                                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                        ${e.rewards.map(t=>`
                                            <span class="research-reward-pill">
                                                <img src="${t.image}" alt="reward">
                                                <span>${t.text}</span>
                                            </span>
                                        `).join("")}
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else{const d=y.generic?.hasSpawns,a=y.generic?.hasFieldResearchTasks;u=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div class="event-section-card" style="text-align:center; padding: 25px;">
                    <div style="font-size:1.1rem; font-weight:600; color:#4a5568; margin-bottom:15px;">
                        Standard Event details and timers are active. 
                    </div>
                    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                        <span style="display:flex; align-items:center; gap:6px; background:#f7fafc; padding:8px 16px; border-radius:30px; border:1px solid #edf2f7; font-weight:600;">
                            ${d?"✅ Wild Spawns Active":"❌ No Special Spawns"}
                        </span>
                        <span style="display:flex; align-items:center; gap:6px; background:#f7fafc; padding:8px 16px; border-radius:30px; border:1px solid #edf2f7; font-weight:600;">
                            ${a?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}v.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${p.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${p.heading}</span>
                <h2 class="event-modal-hero-title">${p.name}</h2>
                <div class="event-timer-large">📅 ${h}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${u}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${p.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const g=document.getElementById("modal-close-btn");g&&(g.onclick=()=>{r.classList.add("hidden")}),r.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",C);setInterval(C,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",b=>{const r=b.target,v=r.closest(".ranking-column");if(!v)return;const m=v.querySelector(".table-container");r.classList.contains("show-more-btn")&&(v.classList.add("expanded"),m&&m.classList.add("expanded")),r.classList.contains("show-less-btn")&&(v.classList.remove("expanded"),m&&m.classList.remove("expanded"))})});
