import"./loadHeader-DmbNyicL.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const r=document.getElementById("loading-overlay"),u=document.getElementById("rankings-grid"),l=document.getElementById("modal-backdrop"),h=document.getElementById("modal-content"),c={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function k(e){let n=null,d=1/0;for(const t in c){const i=Math.abs(c[t]-e);i<d&&(d=i,n=t)}return n}function m(e){const n=(d,t)=>{if(!t||!t.value||t.value<=1)return"";const i=t.text?`(${t.text})`:"";return`<li><span>${d} ${i}</span><span>1 in ${Math.round(t.value).toLocaleString()}</span></li>`};h.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${y(e)}
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}function y(e){const n=[];let d=!1,t=!1,i=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(n.push('<span class="badge shlundo-badge">Shlundo</span>'),d=t=i=!0):e.isLucky&&e.isPerfect?(n.push('<span class="badge lundo-badge">Lundo</span>'),d=i=!0):e.isShiny&&e.isPerfect?(n.push('<span class="badge shundo-badge">Shundo</span>'),d=t=!0):e.isShiny&&e.isZeroIv&&(n.push('<span class="badge shnundo-badge">Shnundo</span>'),d=t=!0),!t&&e.isShiny&&n.push('<span class="badge shiny-badge">Shiny</span>'),!i&&e.isLucky?n.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&n.push('<span class="badge traded-badge">Traded</span>'),d||(e.isPerfect?n.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&n.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&n.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&n.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&n.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&n.push('<span class="badge mythical-badge">Mythical</span>'),n.join(" ")}function f(e){const n=e.iv.attack,d=e.iv.defense,t=e.iv.stamina,i=e.cpm,T=k(i);h.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${y(e)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${renderPlayerBadge({userId:e.userId,publicId:e.ownerPublicId})}</strong></div>
                        <div><span>CP</span><strong>${e.cp}</strong></div>
                        <div><span>Level</span><strong>${T}</strong></div>
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const w=document.getElementById("attack-bar");w.style.width=`${n/15*100}%`,w.style.backgroundColor=n===15?"#da7a79":"#f79513";const S=document.getElementById("defense-bar");S.style.width=`${d/15*100}%`,S.style.backgroundColor=d===15?"#da7a79":"#f79513";const C=document.getElementById("stamina-bar");C.style.width=`${t/15*100}%`,C.style.backgroundColor=t===15?"#da7a79":"#f79513"},100)}function g(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const E=localStorage.getItem("liteMode")==="enabled";async function s(e){h.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const n=await fetch(`/api/player-detail/${e}`);if(!n.ok)throw new Error("Could not fetch player details.");const d=await n.json();h.innerHTML=`
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
                    ${d.highlights.map(t=>`<div class="${`pokemon-card${t.typeColors.length>0?" colored":""}${E||!t.sprite?" no-image":""}`}" style="${g(t.typeColors)}">
                                    <img src="${t.sprite}" alt="${t.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${E?`<span class="lite-name-span" style="${g(t.typeColors)}">${t.name}</span>`:t.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${t.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}catch(n){console.error("Failed to open player modal:",n),h.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${n.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}}function o(){h.innerHTML=`
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const a=document.querySelector(".header-content"),x=document.querySelector(".container"),B=(a?a.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach($=>{$.style.width=`${B}px`})};var p=e;const n=await fetch("/api/rankings");if(!n.ok)throw new Error("Failed to load rankings from the server.");const d=await n.json(),i=await(await fetch("/api/check-auth-status")).json(),T=document.getElementById("main-title");i.loggedIn&&i.userId?(document.title=`Pokemon GO | #${i.userId}`,T&&(T.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:i.userId,publicId:i.publicId})}`)):(document.title="Pokemon GO | Dashboard",T&&(T.textContent="Pokémon GO Player Dashboard"));const w=document.getElementById("recent-players-body");w.innerHTML=d.recentPlayers.map(a=>`
            <tr class="clickable-row" data-player-id="${a.publicId}">
                <td>${renderPlayerBadge(a)}</td>
                <td>
                    ${a.buddy?`
                        <img src="${a.buddy.sprite}" alt="${a.buddy.name}" title="${a.buddy.name}">
                        ${E?`<span class="pokemon-name-lite" style="${g(a.buddy.typeColors)}">${a.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${a.kmWalked} km</td>
                <td class="hide-on-mobile">${a.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const S=document.getElementById("strongest-pokemon-body"),C=d.strongestPokemon;S.innerHTML=C.map((a,x)=>`
            <tr class="clickable-pokemon-row" data-index="${x}">
                <td>${x+1}</td>
                <td class="pokemon-cell">
                    <img src="${a.sprite}" alt="${a.name}">
                    ${E?`<span class="pokemon-name-lite" style="${g(a.typeColors)}">${a.name}</span>`:""}
                </td>
                <td><strong>${a.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:a.userId,publicId:a.ownerPublicId})}</td>
            </tr>
        `).join("");const H=document.getElementById("rarest-pokemon-body"),b=d.rarestPokemon;H.innerHTML=b.map((a,x)=>`
            <tr class="clickable-rarity-row" data-index="${x}">
                <td><strong>${x+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${a.sprite}" alt="${a.name}">
                    ${E?`<span class="pokemon-name-lite" style="${g(a.typeColors)}">${a.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${y(a)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:a.userId,publicId:a.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",a=>{const x=a.target.closest(".clickable-row");if(x){const I=x.dataset.playerId;I&&s(I);return}const D=a.target.closest(".clickable-pokemon-row");if(D){const I=D.dataset.index,$=C[I];$&&f($);return}const B=a.target.closest(".clickable-rarity-row");if(B){const I=B.dataset.index,$=b[I];$&&m($)}}),r.classList.add("hidden"),u.classList.remove("hidden");const L=document.querySelector(".info-btn");L&&L.addEventListener("click",a=>{a.stopPropagation(),o()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),r.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}l.addEventListener("click",e=>{e.target===l&&(l.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let R=[];function v(r){if(!r)return new Date;const u=r.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);return u?new Date(parseInt(u[1],10),parseInt(u[2],10)-1,parseInt(u[3],10),parseInt(u[4],10),parseInt(u[5],10),parseInt(u[6],10)):new Date(r)}async function W(){const r=document.getElementById("events-container"),u="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",l={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function h(c){const k=v(c).getTime()-new Date().getTime();if(k<=0)return null;const m=Math.floor(k/(1e3*60*60*24)),y=Math.floor(k/(1e3*60*60)%24),f=Math.floor(k/1e3/60%60);return m>0?`${m}d ${y}h`:y>0?`${y}h ${f}m`:`${f}m`}try{const c=await fetch(u);if(!c.ok)throw new Error("Failed to fetch events");R=await c.json();const k=new Date,m=[],y=[];if(R.forEach(s=>{const o=v(s.start),p=v(s.end);k>=o&&k<=p?m.push(s):k<o&&y.push(s)}),y.sort((s,o)=>v(s.start)-v(o.start)),m.sort((s,o)=>v(s.end)-v(o.end)),m.length===0&&y.length===0){r.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}const f=(s,o)=>{const p=v(s.start),e=v(s.end),n=o?"Starts in":"Ends in",d=h(o?s.start:s.end),t=l[s.eventType]||l.default;return`
                <div class="event-item" data-event-id="${s.eventID}">
                    <div class="event-dot" style="background-color: ${t}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${s.name}">${s.name}</span>
                        <span class="event-timer">${n} ${d}</span>
                    </div>
                </div>
            `};let g="";m.length>0&&(g+='<h3 class="events-section-header">Ongoing</h3>',g+=m.map(s=>f(s,!1)).join("")),y.length>0&&(g+='<h3 class="events-section-header">Upcoming</h3>',g+=y.map(s=>f(s,!0)).join("")),r.innerHTML=g,r.querySelectorAll(".event-item").forEach(s=>{s.addEventListener("click",()=>{const o=s.getAttribute("data-event-id"),p=R.find(e=>e.eventID===o);p&&A(p,l[p.eventType]||l.default)})});const E=document.getElementById("expand-events-btn");E&&(E.onclick=()=>{z(l)})}catch(c){console.error("Error loading events:",c),r.innerHTML='<p class="error-message">Error loading events.</p>'}}function z(r){const u=document.getElementById("timeline-modal-backdrop"),l=document.getElementById("timeline-scroll-container"),h=document.getElementById("timeline-modal-close-btn"),c=document.getElementById("expand-events-btn");if(!u||!l||!h)return;const k=()=>{u.classList.add("hidden"),c&&c.setAttribute("aria-expanded","false")};h.onclick=k,u.onclick=t=>{t.target===u&&k()};const m=new Date;m.setHours(0,0,0,0);const y=R.filter(t=>v(t.end)>=m);let f=new Date(m);y.forEach(t=>{const i=v(t.end);i>f&&(f=i)});const g=1440*60*1e3,E=Math.ceil((f-m)/g),s=Math.min(Math.max(14,E),90),o=[];for(let t=0;t<s;t++){const i=new Date(m);i.setDate(m.getDate()+t),o.push(i)}const p=new Date(o[s-1]);p.setHours(23,59,59,999);const e={};y.forEach(t=>{const i=v(t.start);v(t.end)<m||i>p||(e[t.eventType]||(e[t.eventType]=[]),e[t.eventType].push(t))});let n=`<div class="timeline-grid" style="grid-template-columns: 160px repeat(${s}, 100px);">`;n+='<div class="timeline-header-row">',n+='<div class="timeline-label-header">Event Category</div>';const d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];o.forEach((t,i)=>{n+=`
            <div class="${`timeline-date-cell${i===0?" today":""}`}">
                <div>${d[t.getDay()]}</div>
                <div>${t.getDate()}</div>
            </div>
        `}),n+="</div>",Object.keys(e).forEach(t=>{const i=e[t],T=t.replace(/-/g," ");i.sort((b,L)=>v(b.start)-v(L.start));const w=[],S=i.map(b=>{const L=v(b.start),a=v(b.end),x=L.getFullYear()===a.getFullYear()&&L.getMonth()===a.getMonth()&&L.getDate()===a.getDate();let D=!1;if(x){const P=new Date(L);P.setHours(0,0,0,0);const F=new Date(L);F.setHours(23,59,59,999),D=i.some(O=>{if(O.eventID===b.eventID)return!1;const N=v(O.start);return v(O.end)>=P&&N<=F})}let B=L,I=a;x&&!D&&(B=new Date(L),B.setHours(0,0,0,0),I=new Date(a),I.setHours(23,59,59,999));let $=0;B>m&&($=(B-m)/(1440*60*1e3));let M=s;I<p&&(M=(I-m)/(1440*60*1e3)),$<0&&($=0),M>s&&(M=s),M<=$&&(M=$+1/24);let j=-1;for(let P=0;P<w.length;P++)if($>=w[P]-.01){j=P;break}return j===-1?(w.push(M),j=w.length-1):w[j]=M,{event:b,startCol:$,endCol:M,track:j}}),H=16+Math.max(1,w.length)*34;n+='<div class="timeline-row">',n+=`<div class="timeline-row-label" style="height: ${H}px;">${T}</div>`;for(let b=0;b<s;b++)n+=`<div class="${`timeline-grid-cell${b===0?" today-col":""}`}" style="height: ${H}px;"></div>`;n+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${s}; grid-template-columns: repeat(${s}, 100px); height: ${H}px;">`,S.forEach(({event:b,startCol:L,endCol:a,track:x})=>{const D=r[b.eventType]||r.default,B=L*100,I=(a-L)*100-6,$=10+x*34;n+=`
                <div class="timeline-bar" 
                     style="left: ${B+3}px; width: ${I}px; top: ${$}px; background-color: ${D};"
                     title="${b.name}"
                     data-event-id="${b.eventID}">
                    ${b.name}
                </div>
            `}),n+="</div>",n+="</div>"}),n+="</div>",l.innerHTML=n,l.querySelectorAll(".timeline-bar").forEach(t=>{t.addEventListener("click",i=>{i.stopPropagation();const T=t.getAttribute("data-event-id"),w=R.find(S=>S.eventID===T);w&&A(w,r[w.eventType]||r.default)})}),u.classList.remove("hidden"),c&&c.setAttribute("aria-expanded","true")}function A(r,u){const l=document.getElementById("modal-backdrop"),h=document.getElementById("modal-content");if(!l||!h)return;h.style.setProperty("--event-theme",u);const c=new Date,k=v(r.start),m=v(r.end);let y="";if(c<k){const s=k.getTime()-c.getTime(),o=Math.floor(s/(1e3*60*60*24)),p=Math.floor(s/(1e3*60*60)%24);y=`Starts in: ${o>0?`${o}d ${p}h`:`${p}h`}`}else{const s=m.getTime()-c.getTime(),o=Math.floor(s/(1e3*60*60*24)),p=Math.floor(s/(1e3*60*60)%24);y=`Ends in: ${o>0?`${o}d ${p}h`:`${p}h`}`}let f="";const g=r.extraData||{};if(r.eventType==="pokemon-spotlight-hour"&&g.spotlight){const s=g.spotlight;f=`
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
        `}else if((r.eventType==="raid-battles"||r.eventType==="raid-hour"||r.eventType==="raid-day")&&g.raidbattles){const s=g.raidbattles,o=s.bosses||[],p=s.shinies||[];f=`
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
        `}else if(r.eventType==="community-day"&&g.communityday){const s=g.communityday,o=s.spawns||[],p=s.bonuses||[],e=s.shinies||[],n=s.bonusDisclaimers||[],d=s.specialresearch||[];f=`
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
                                    ${t.tasks.map(i=>`
                                        <div class="research-task-item">
                                            <span>${i.text}</span>
                                            <span class="research-reward-pill">
                                                <img src="${i.reward.image}" alt="reward">
                                                <span>${i.reward.text}</span>
                                            </span>
                                        </div>
                                    `).join("")}
                                    <div style="font-weight:700; margin: 8px 0 5px 0; color:#4a5568;">Step Rewards:</div>
                                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                        ${t.rewards.map(i=>`
                                            <span class="research-reward-pill">
                                                <img src="${i.image}" alt="reward">
                                                <span>${i.text}</span>
                                            </span>
                                        `).join("")}
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else{const s=g.generic?.hasSpawns,o=g.generic?.hasFieldResearchTasks;f=`
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
        `}h.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${r.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${r.heading}</span>
                <h2 class="event-modal-hero-title">${r.name}</h2>
                <div class="event-timer-large">📅 ${y}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${f}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${r.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const E=document.getElementById("modal-close-btn");E&&(E.onclick=()=>{l.classList.add("hidden")}),l.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",W);setInterval(W,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",u=>{const l=u.target,h=l.closest(".ranking-column");if(!h)return;const c=h.querySelector(".table-container");l.classList.contains("show-more-btn")&&(h.classList.add("expanded"),c&&c.classList.add("expanded")),l.classList.contains("show-less-btn")&&(h.classList.remove("expanded"),c&&c.classList.remove("expanded"))})});
