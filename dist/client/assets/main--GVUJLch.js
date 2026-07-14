import"./loadHeader-DmbNyicL.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const c=document.getElementById("loading-overlay"),g=document.getElementById("rankings-grid"),l=document.getElementById("modal-backdrop"),u=document.getElementById("modal-content"),r={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function k(e){let n=null,d=1/0;for(const t in r){const a=Math.abs(r[t]-e);a<d&&(d=a,n=t)}return n}function m(e){const n=(d,t)=>{if(!t||!t.value||t.value<=1)return"";const a=t.text?`(${t.text})`:"";return`<li><span>${d} ${a}</span><span>1 in ${Math.round(t.value).toLocaleString()}</span></li>`};u.innerHTML=`
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}function h(e){const n=[];let d=!1,t=!1,a=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(n.push('<span class="badge shlundo-badge">Shlundo</span>'),d=t=a=!0):e.isLucky&&e.isPerfect?(n.push('<span class="badge lundo-badge">Lundo</span>'),d=a=!0):e.isShiny&&e.isPerfect?(n.push('<span class="badge shundo-badge">Shundo</span>'),d=t=!0):e.isShiny&&e.isZeroIv&&(n.push('<span class="badge shnundo-badge">Shnundo</span>'),d=t=!0),!t&&e.isShiny&&n.push('<span class="badge shiny-badge">Shiny</span>'),!a&&e.isLucky?n.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&n.push('<span class="badge traded-badge">Traded</span>'),d||(e.isPerfect?n.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&n.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&n.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&n.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&n.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&n.push('<span class="badge mythical-badge">Mythical</span>'),n.join(" ")}function f(e){const n=e.iv.attack,d=e.iv.defense,t=e.iv.stamina,a=e.cpm,E=k(a);u.innerHTML=`
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
                        <div><span>Level</span><strong>${E}</strong></div>
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
                        <span class="stat-value">${d}/15</span>
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const w=document.getElementById("attack-bar");w.style.width=`${n/15*100}%`,w.style.backgroundColor=n===15?"#da7a79":"#f79513";const D=document.getElementById("defense-bar");D.style.width=`${d/15*100}%`,D.style.backgroundColor=d===15?"#da7a79":"#f79513";const M=document.getElementById("stamina-bar");M.style.width=`${t/15*100}%`,M.style.backgroundColor=t===15?"#da7a79":"#f79513"},100)}function v(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const I=localStorage.getItem("liteMode")==="enabled";async function s(e){u.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const n=await fetch(`/api/player-detail/${e}`);if(!n.ok)throw new Error("Could not fetch player details.");const d=await n.json();u.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <h2>${renderPlayerBadge({userId:d.userId,publicId:d.publicId})}</h2>
                <div class="grid-stats">
                    <div><span>Total XP</span><strong>${d.totalXp.toLocaleString()}</strong></div>
                    <div><span>Pokémon Caught</span><strong>${d.pokemonCaught.toLocaleString()}</strong></div>
                    <div><span>Distance Walked</span><strong>${d.kmWalked.toFixed(1)} km</strong></div>
                    <div><span>PokéStops Visited</span><strong>${d.pokestopsVisited.toLocaleString()}</strong></div>
                </div>
                
                <h3>Highlights</h3>
                <div id="modal-pokemon-container">
                    ${d.highlights.map(t=>`<div class="${`pokemon-card${t.typeColors.length>0?" colored":""}${I||!t.sprite?" no-image":""}`}" style="${v(t.typeColors)}">
                                    <img src="${t.sprite}" alt="${t.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${I?`<span class="lite-name-span" style="${v(t.typeColors)}">${t.name}</span>`:t.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${t.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}catch(n){console.error("Failed to open player modal:",n),u.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${n.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}}function o(){u.innerHTML=`
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const i=document.querySelector(".header-content"),y=document.querySelector(".container"),T=(i?i.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(S=>{S.style.width=`${T}px`})};var p=e;const n=await fetch("/api/rankings");if(!n.ok)throw new Error("Failed to load rankings from the server.");const d=await n.json(),a=await(await fetch("/api/check-auth-status")).json(),E=document.getElementById("main-title");a.loggedIn&&a.userId?(document.title=`Pokemon GO | #${a.userId}`,E&&(E.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:a.userId,publicId:a.publicId})}`)):(document.title="Pokemon GO | Dashboard",E&&(E.textContent="Pokémon GO Player Dashboard"));const w=document.getElementById("recent-players-body");w.innerHTML=d.recentPlayers.map(i=>`
            <tr class="clickable-row" data-player-id="${i.publicId}">
                <td>${renderPlayerBadge(i)}</td>
                <td>
                    ${i.buddy?`
                        <img src="${i.buddy.sprite}" alt="${i.buddy.name}" title="${i.buddy.name}">
                        ${I?`<span class="pokemon-name-lite" style="${v(i.buddy.typeColors)}">${i.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${i.kmWalked} km</td>
                <td class="hide-on-mobile">${i.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const D=document.getElementById("strongest-pokemon-body"),M=d.strongestPokemon;D.innerHTML=M.map((i,y)=>`
            <tr class="clickable-pokemon-row" data-index="${y}">
                <td>${y+1}</td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${I?`<span class="pokemon-name-lite" style="${v(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td><strong>${i.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join("");const P=document.getElementById("rarest-pokemon-body"),$=d.rarestPokemon;P.innerHTML=$.map((i,y)=>`
            <tr class="clickable-rarity-row" data-index="${y}">
                <td><strong>${y+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${I?`<span class="pokemon-name-lite" style="${v(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${h(i)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",i=>{const y=i.target.closest(".clickable-row");if(y){const x=y.dataset.playerId;x&&s(x);return}const L=i.target.closest(".clickable-pokemon-row");if(L){const x=L.dataset.index,S=M[x];S&&f(S);return}const T=i.target.closest(".clickable-rarity-row");if(T){const x=T.dataset.index,S=$[x];S&&m(S)}}),c.classList.add("hidden"),g.classList.remove("hidden");const B=document.querySelector(".info-btn");B&&B.addEventListener("click",i=>{i.stopPropagation(),o()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),c.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}l.addEventListener("click",e=>{e.target===l&&(l.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let C=[];function b(c){if(!c)return new Date;const g=c.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);return g?new Date(parseInt(g[1],10),parseInt(g[2],10)-1,parseInt(g[3],10),parseInt(g[4],10),parseInt(g[5],10),parseInt(g[6],10)):new Date(c)}async function j(){const c=document.getElementById("events-container"),g="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",l={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function u(r){const k=b(r).getTime()-new Date().getTime();if(k<=0)return null;const m=Math.floor(k/(1e3*60*60*24)),h=Math.floor(k/(1e3*60*60)%24),f=Math.floor(k/1e3/60%60);return m>0?`${m}d ${h}h`:h>0?`${h}h ${f}m`:`${f}m`}try{const r=await fetch(g);if(!r.ok)throw new Error("Failed to fetch events");C=await r.json();const k=new Date,m=[],h=[];if(C.forEach(s=>{const o=b(s.start),p=b(s.end);k>=o&&k<=p?m.push(s):k<o&&h.push(s)}),h.sort((s,o)=>b(s.start)-b(o.start)),m.sort((s,o)=>b(s.end)-b(o.end)),m.length===0&&h.length===0){c.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}const f=(s,o)=>{const p=b(s.start),e=b(s.end),n=o?"Starts in":"Ends in",d=u(o?s.start:s.end),t=l[s.eventType]||l.default;return`
                <div class="event-item" data-event-id="${s.eventID}">
                    <div class="event-dot" style="background-color: ${t}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${s.name}">${s.name}</span>
                        <span class="event-timer">${n} ${d}</span>
                    </div>
                </div>
            `};let v="";m.length>0&&(v+='<h3 class="events-section-header">Ongoing</h3>',v+=m.map(s=>f(s,!1)).join("")),h.length>0&&(v+='<h3 class="events-section-header">Upcoming</h3>',v+=h.map(s=>f(s,!0)).join("")),c.innerHTML=v,c.querySelectorAll(".event-item").forEach(s=>{s.addEventListener("click",()=>{const o=s.getAttribute("data-event-id"),p=C.find(e=>e.eventID===o);p&&R(p,l[p.eventType]||l.default)})});const I=document.getElementById("expand-events-btn");I&&(I.onclick=()=>{H(l)})}catch(r){console.error("Error loading events:",r),c.innerHTML='<p class="error-message">Error loading events.</p>'}}function H(c){const g=document.getElementById("timeline-modal-backdrop"),l=document.getElementById("timeline-scroll-container"),u=document.getElementById("timeline-modal-close-btn"),r=document.getElementById("expand-events-btn");if(!g||!l||!u)return;const k=()=>{g.classList.add("hidden"),r&&r.setAttribute("aria-expanded","false")};u.onclick=k,g.onclick=t=>{t.target===g&&k()};const m=new Date;m.setHours(0,0,0,0);const h=C.filter(t=>b(t.end)>=m);let f=new Date(m);h.forEach(t=>{const a=b(t.end);a>f&&(f=a)});const v=1440*60*1e3,I=Math.ceil((f-m)/v),s=Math.min(Math.max(14,I),90),o=[];for(let t=0;t<s;t++){const a=new Date(m);a.setDate(m.getDate()+t),o.push(a)}const p=new Date(o[s-1]);p.setHours(23,59,59,999);const e={};h.forEach(t=>{const a=b(t.start);b(t.end)<m||a>p||(e[t.eventType]||(e[t.eventType]=[]),e[t.eventType].push(t))});let n=`<div class="timeline-grid" style="grid-template-columns: 160px repeat(${s}, 100px);">`;n+='<div class="timeline-header-row">',n+='<div class="timeline-label-header">Event Category</div>';const d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];o.forEach((t,a)=>{n+=`
            <div class="${`timeline-date-cell${a===0?" today":""}`}">
                <div>${d[t.getDay()]}</div>
                <div>${t.getDate()}</div>
            </div>
        `}),n+="</div>",Object.keys(e).forEach(t=>{const a=e[t],E=t.replace(/-/g," ");a.sort(($,B)=>b($.start)-b(B.start));const w=[],D=a.map($=>{const B=b($.start),i=b($.end);let y=0;B>m&&(y=(B-m)/(1440*60*1e3));let L=s;i<p&&(L=(i-m)/(1440*60*1e3)),y<0&&(y=0),L>s&&(L=s),L<=y&&(L=y+1/24);let T=-1;for(let x=0;x<w.length;x++)if(y>=w[x]-.01){T=x;break}return T===-1?(w.push(L),T=w.length-1):w[T]=L,{event:$,startCol:y,endCol:L,track:T}}),P=16+Math.max(1,w.length)*34;n+='<div class="timeline-row">',n+=`<div class="timeline-row-label" style="height: ${P}px;">${E}</div>`;for(let $=0;$<s;$++)n+=`<div class="${`timeline-grid-cell${$===0?" today-col":""}`}" style="height: ${P}px;"></div>`;n+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${s}; grid-template-columns: repeat(${s}, 100px); height: ${P}px;">`,D.forEach(({event:$,startCol:B,endCol:i,track:y})=>{const L=c[$.eventType]||c.default,T=B*100,x=(i-B)*100-6,S=10+y*34;n+=`
                <div class="timeline-bar" 
                     style="left: ${T+3}px; width: ${x}px; top: ${S}px; background-color: ${L};"
                     title="${$.name}"
                     data-event-id="${$.eventID}">
                    ${$.name}
                </div>
            `}),n+="</div>",n+="</div>"}),n+="</div>",l.innerHTML=n,l.querySelectorAll(".timeline-bar").forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();const E=t.getAttribute("data-event-id"),w=C.find(D=>D.eventID===E);w&&R(w,c[w.eventType]||c.default)})}),g.classList.remove("hidden"),r&&r.setAttribute("aria-expanded","true")}function R(c,g){const l=document.getElementById("modal-backdrop"),u=document.getElementById("modal-content");if(!l||!u)return;u.style.setProperty("--event-theme",g);const r=new Date,k=b(c.start),m=b(c.end);let h="";if(r<k){const s=k.getTime()-r.getTime(),o=Math.floor(s/(1e3*60*60*24)),p=Math.floor(s/(1e3*60*60)%24);h=`Starts in: ${o>0?`${o}d ${p}h`:`${p}h`}`}else{const s=m.getTime()-r.getTime(),o=Math.floor(s/(1e3*60*60*24)),p=Math.floor(s/(1e3*60*60)%24);h=`Ends in: ${o>0?`${o}d ${p}h`:`${p}h`}`}let f="";const v=c.extraData||{};if(c.eventType==="pokemon-spotlight-hour"&&v.spotlight){const s=v.spotlight;f=`
            <div class="event-details-grid">
                <div class="event-section-card">
                    <h4>Featured Pokémon</h4>
                    <div class="spotlight-pokemon-container">
                        <div class="event-tile spotlight-pokemon-tile">
                            <img src="${s.image}" alt="${s.name}" style="width: 80px; height: 80px;">
                            <div class="event-tile-name" style="font-weight: 700; font-size: 0.95rem;">${s.name}</div>
                            ${s.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                        </div>
                    </div>
                </div>
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div class="spotlight-bonus-container">
                        <div class="event-bonus-row">
                            <span class="spotlight-bonus-icon">🎁</span>
                            <div class="event-bonus-text">${s.bonus||"No Extra Bonus"}</div>
                        </div>
                    </div>
                </div>
            </div>
        `}else if((c.eventType==="raid-battles"||c.eventType==="raid-hour"||c.eventType==="raid-day")&&v.raidbattles){const s=v.raidbattles,o=s.bosses||[],p=s.shinies||[];f=`
            <div class="event-details-grid">
                ${o.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${o.map(e=>`
                            <div class="event-tile">
                                <img src="${e.image}" alt="${e.name}">
                                <div class="event-tile-name">${e.name}</div>
                                ${e.canBeShiny?'<span class="shiny-indicator" title="Shiny Available">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${p.length>0?`
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${p.map(e=>`
                            <div class="event-tile">
                                <img src="${e.image}" alt="${e.name}">
                                <div class="event-tile-name">${e.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else if(c.eventType==="community-day"&&v.communityday){const s=v.communityday,o=s.spawns||[],p=s.bonuses||[],e=s.shinies||[],n=s.bonusDisclaimers||[],d=s.specialresearch||[];f=`
            <div class="event-details-grid">
                ${o.length>0||e.length>0?`
                <div class="event-section-card">
                    ${o.length>0?`
                    <h4>Featured Spawns</h4>
                    <div class="event-grid-list" style="margin-bottom: 20px;">
                        ${o.map(t=>`
                            <div class="event-tile">
                                <img src="${t.image}" alt="${t.name}">
                                <div class="event-tile-name">${t.name}</div>
                                ${t.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>`:""}

                    ${e.length>0?`
                    <h4 style="margin-top: 15px; border-top: 1px solid #edf2f7; padding-top: 15px;">New / Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${e.map(t=>`
                            <div class="event-tile">
                                <img src="${t.image}" alt="${t.name}">
                                <div class="event-tile-name">${t.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>`:""}
                </div>`:""}

                ${p.length>0?`
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div style="display:flex; flex-direction:row; flex-wrap:wrap; gap:10px;">
                        ${p.map(t=>`
                            <div class="event-bonus-row">
                                ${t.image?`<img src="${t.image}" alt="bonus icon" class="event-bonus-icon">`:""}
                                <div class="event-bonus-text">${t.text}</div>
                            </div>
                        `).join("")}
                    </div>
                    ${n.length>0?`
                    <div class="bonus-disclaimer" style="font-size:0.75rem; color:#718096; margin-top:12px; border-top:1px solid #edf2f7; padding-top:8px; line-height:1.4;">
                        ${n.map(t=>`<div style="margin-bottom: 4px;">${t}</div>`).join("")}
                    </div>`:""}
                </div>`:""}

                ${d.length>0?`
                <div class="event-section-card" style="grid-column: 1 / -1;">
                    <h4>Special Research Steps</h4>
                    <div class="research-timeline">
                        ${d.map(t=>`
                            <div class="research-step">
                                <div class="research-step-marker"></div>
                                <div class="research-step-title">${t.name}</div>
                                <div class="research-task-list">
                                    <div style="font-weight:700; margin-bottom:5px; color:#4a5568;">Tasks:</div>
                                    ${t.tasks.map(a=>`
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
                                        ${t.rewards.map(a=>`
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
        `}else{const s=v.generic?.hasSpawns,o=v.generic?.hasFieldResearchTasks;f=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div class="event-section-card" style="text-align:center; padding: 25px;">
                    <div style="font-size:1.1rem; font-weight:600; color:#4a5568; margin-bottom:15px;" class="generic-event-desc">
                        Standard Event details and timers are active. 
                    </div>
                    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                        <span class="event-status-pill">
                            ${s?"✅ Wild Spawns Active":"❌ No Special Spawns"}
                        </span>
                        <span class="event-status-pill">
                            ${o?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}u.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${c.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${c.heading}</span>
                <h2 class="event-modal-hero-title">${c.name}</h2>
                <div class="event-timer-large">📅 ${h}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${f}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${c.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const I=document.getElementById("modal-close-btn");I&&(I.onclick=()=>{l.classList.add("hidden")}),l.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",j);setInterval(j,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",g=>{const l=g.target,u=l.closest(".ranking-column");if(!u)return;const r=u.querySelector(".table-container");l.classList.contains("show-more-btn")&&(u.classList.add("expanded"),r&&r.classList.add("expanded")),l.classList.contains("show-less-btn")&&(u.classList.remove("expanded"),r&&r.classList.remove("expanded"))})});
