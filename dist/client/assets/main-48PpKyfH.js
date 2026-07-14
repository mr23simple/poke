import"./loadHeader-DmbNyicL.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const r=document.getElementById("loading-overlay"),v=document.getElementById("rankings-grid"),l=document.getElementById("modal-backdrop"),y=document.getElementById("modal-content"),c={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function w(e){let s=null,d=1/0;for(const n in c){const a=Math.abs(c[n]-e);a<d&&(d=a,s=n)}return s}function m(e){const s=(d,n)=>{if(!n||!n.value||n.value<=1)return"";const a=n.text?`(${n.text})`:"";return`<li><span>${d} ${a}</span><span>1 in ${Math.round(n.value).toLocaleString()}</span></li>`};y.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${b(e)}
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}function b(e){const s=[];let d=!1,n=!1,a=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(s.push('<span class="badge shlundo-badge">Shlundo</span>'),d=n=a=!0):e.isLucky&&e.isPerfect?(s.push('<span class="badge lundo-badge">Lundo</span>'),d=a=!0):e.isShiny&&e.isPerfect?(s.push('<span class="badge shundo-badge">Shundo</span>'),d=n=!0):e.isShiny&&e.isZeroIv&&(s.push('<span class="badge shnundo-badge">Shnundo</span>'),d=n=!0),!n&&e.isShiny&&s.push('<span class="badge shiny-badge">Shiny</span>'),!a&&e.isLucky?s.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&s.push('<span class="badge traded-badge">Traded</span>'),d||(e.isPerfect?s.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&s.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&s.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&s.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&s.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&s.push('<span class="badge mythical-badge">Mythical</span>'),s.join(" ")}function $(e){const s=e.iv.attack,d=e.iv.defense,n=e.iv.stamina,a=e.cpm,g=w(a);y.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${b(e)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${renderPlayerBadge({userId:e.userId,publicId:e.ownerPublicId})}</strong></div>
                        <div><span>CP</span><strong>${e.cp}</strong></div>
                        <div><span>Level</span><strong>${g}</strong></div>
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
                        <span class="stat-value">${d}/15</span>
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const T=document.getElementById("attack-bar");T.style.width=`${s/15*100}%`,T.style.backgroundColor=s===15?"#da7a79":"#f79513";const L=document.getElementById("defense-bar");L.style.width=`${d/15*100}%`,L.style.backgroundColor=d===15?"#da7a79":"#f79513";const B=document.getElementById("stamina-bar");B.style.width=`${n/15*100}%`,B.style.backgroundColor=n===15?"#da7a79":"#f79513"},100)}function u(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const E=localStorage.getItem("liteMode")==="enabled";async function t(e){y.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const s=await fetch(`/api/player-detail/${e}`);if(!s.ok)throw new Error("Could not fetch player details.");const d=await s.json();y.innerHTML=`
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
                    ${d.highlights.map(n=>`<div class="${`pokemon-card${n.typeColors.length>0?" colored":""}${E||!n.sprite?" no-image":""}`}" style="${u(n.typeColors)}">
                                    <img src="${n.sprite}" alt="${n.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${E?`<span class="lite-name-span" style="${u(n.typeColors)}">${n.name}</span>`:n.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${n.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}catch(s){console.error("Failed to open player modal:",s),y.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${s.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}}function o(){y.innerHTML=`
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const i=document.querySelector(".header-content"),k=document.querySelector(".container"),S=(i?i.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(I=>{I.style.width=`${S}px`})};var p=e;const s=await fetch("/api/rankings");if(!s.ok)throw new Error("Failed to load rankings from the server.");const d=await s.json(),a=await(await fetch("/api/check-auth-status")).json(),g=document.getElementById("main-title");a.loggedIn&&a.userId?(document.title=`Pokemon GO | #${a.userId}`,g&&(g.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:a.userId,publicId:a.publicId})}`)):(document.title="Pokemon GO | Dashboard",g&&(g.textContent="Pokémon GO Player Dashboard"));const T=document.getElementById("recent-players-body");T.innerHTML=d.recentPlayers.map(i=>`
            <tr class="clickable-row" data-player-id="${i.publicId}">
                <td>${renderPlayerBadge(i)}</td>
                <td>
                    ${i.buddy?`
                        <img src="${i.buddy.sprite}" alt="${i.buddy.name}" title="${i.buddy.name}">
                        ${E?`<span class="pokemon-name-lite" style="${u(i.buddy.typeColors)}">${i.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${i.kmWalked} km</td>
                <td class="hide-on-mobile">${i.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const L=document.getElementById("strongest-pokemon-body"),B=d.strongestPokemon;L.innerHTML=B.map((i,k)=>`
            <tr class="clickable-pokemon-row" data-index="${k}">
                <td>${k+1}</td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${E?`<span class="pokemon-name-lite" style="${u(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td><strong>${i.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join("");const F=document.getElementById("rarest-pokemon-body"),H=d.rarestPokemon;F.innerHTML=H.map((i,k)=>`
            <tr class="clickable-rarity-row" data-index="${k}">
                <td><strong>${k+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${E?`<span class="pokemon-name-lite" style="${u(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${b(i)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",i=>{const k=i.target.closest(".clickable-row");if(k){const x=k.dataset.playerId;x&&t(x);return}const M=i.target.closest(".clickable-pokemon-row");if(M){const x=M.dataset.index,I=B[x];I&&$(I);return}const S=i.target.closest(".clickable-rarity-row");if(S){const x=S.dataset.index,I=H[x];I&&m(I)}}),r.classList.add("hidden"),v.classList.remove("hidden");const f=document.querySelector(".info-btn");f&&f.addEventListener("click",i=>{i.stopPropagation(),o()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),r.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}l.addEventListener("click",e=>{e.target===l&&(l.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let R=[];function h(r){if(!r)return new Date;const v=r.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);return v?new Date(parseInt(v[1],10),parseInt(v[2],10)-1,parseInt(v[3],10),parseInt(v[4],10),parseInt(v[5],10),parseInt(v[6],10)):new Date(r)}async function A(){const r=document.getElementById("events-container"),v="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",l={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function y(c){const w=h(c).getTime()-new Date().getTime();if(w<=0)return null;const m=Math.floor(w/(1e3*60*60*24)),b=Math.floor(w/(1e3*60*60)%24),$=Math.floor(w/1e3/60%60);return m>0?`${m}d ${b}h`:b>0?`${b}h ${$}m`:`${$}m`}try{const c=await fetch(v);if(!c.ok)throw new Error("Failed to fetch events");R=await c.json();const w=new Date,m=[],b=[];if(R.forEach(t=>{const o=h(t.start),p=h(t.end);w>=o&&w<=p?m.push(t):w<o&&b.push(t)}),b.sort((t,o)=>h(t.start)-h(o.start)),m.sort((t,o)=>h(t.end)-h(o.end)),m.length===0&&b.length===0){r.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}const $=(t,o)=>{const p=h(t.start),e=h(t.end),s=o?"Starts in":"Ends in",d=y(o?t.start:t.end),n=l[t.eventType]||l.default;return`
                <div class="event-item" data-event-id="${t.eventID}">
                    <div class="event-dot" style="background-color: ${n}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${t.name}">${t.name}</span>
                        <span class="event-timer">${s} ${d}</span>
                    </div>
                </div>
            `};let u="";m.length>0&&(u+='<h3 class="events-section-header">Ongoing</h3>',u+=m.map(t=>$(t,!1)).join("")),b.length>0&&(u+='<h3 class="events-section-header">Upcoming</h3>',u+=b.map(t=>$(t,!0)).join("")),r.innerHTML=u,r.querySelectorAll(".event-item").forEach(t=>{t.addEventListener("click",()=>{const o=t.getAttribute("data-event-id"),p=R.find(e=>e.eventID===o);p&&N(p,l[p.eventType]||l.default)})});const E=document.getElementById("expand-events-btn");E&&(E.onclick=()=>{G(l)})}catch(c){console.error("Error loading events:",c),r.innerHTML='<p class="error-message">Error loading events.</p>'}}function G(r){const v=document.getElementById("timeline-modal-backdrop"),l=document.getElementById("timeline-scroll-container"),y=document.getElementById("timeline-modal-close-btn"),c=document.getElementById("expand-events-btn");if(!v||!l||!y)return;const w=()=>{v.classList.add("hidden"),c&&c.setAttribute("aria-expanded","false")};y.onclick=w,v.onclick=a=>{a.target===v&&w()};const m=new Date;m.setHours(0,0,0,0);const b=R.filter(a=>h(a.end)>=m);let $=new Date(m);b.forEach(a=>{const g=h(a.end);g>$&&($=g)});const u=1440*60*1e3,E=Math.ceil(($-m)/u),t=Math.min(Math.max(14,E),90),o=[];for(let a=0;a<t;a++){const g=new Date(m);g.setDate(m.getDate()+a),o.push(g)}const p=new Date(o[t-1]);p.setHours(23,59,59,999);const e={};b.forEach(a=>{const g=h(a.start);h(a.end)<m||g>p||(e[a.eventType]||(e[a.eventType]=[]),e[a.eventType].push(a))});let s=`<div class="timeline-grid" style="grid-template-columns: 160px repeat(${t}, 100px);">`;s+='<div class="timeline-header-row">',s+='<div class="timeline-label-header">Event Category</div>';const d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];o.forEach((a,g)=>{s+=`
            <div class="${`timeline-date-cell${g===0?" today":""}`}">
                <div>${d[a.getDay()]}</div>
                <div>${a.getDate()}</div>
            </div>
        `}),s+="</div>";let n=2;Object.keys(e).forEach(a=>{const g=e[a],T=a.replace(/-/g," ");g.sort((f,i)=>h(f.start)-h(i.start));const L=[],B=g.map(f=>{const i=h(f.start),k=h(f.end),M=i.getFullYear()===k.getFullYear()&&i.getMonth()===k.getMonth()&&i.getDate()===k.getDate();let S=!1;if(M){const C=new Date(i);C.setHours(0,0,0,0);const W=new Date(i);W.setHours(23,59,59,999),S=g.some(O=>{if(O.eventID===f.eventID)return!1;const z=h(O.start);return h(O.end)>=C&&z<=W})}let x=i,I=k;M&&!S&&(x=new Date(i),x.setHours(0,0,0,0),I=new Date(k),I.setHours(23,59,59,999));let D=0;x>m&&(D=(x-m)/(1440*60*1e3));let P=t;I<p&&(P=(I-m)/(1440*60*1e3)),D<0&&(D=0),P>t&&(P=t),P<=D&&(P=D+1/24);let j=-1;for(let C=0;C<L.length;C++)if(D>=L[C]-.01){j=C;break}return j===-1?(L.push(P),j=L.length-1):L[j]=P,{event:f,startCol:D,endCol:P,track:j}}),H=16+Math.max(1,L.length)*34;s+='<div class="timeline-row">',s+=`<div class="timeline-row-label" style="height: ${H}px; grid-row: ${n};">${T}</div>`;for(let f=0;f<t;f++)s+=`<div class="${`timeline-grid-cell${f===0?" today-col":""}`}" style="height: ${H}px; grid-row: ${n};"></div>`;s+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${t}; grid-template-columns: repeat(${t}, 100px); height: ${H}px; grid-row: ${n};">`,B.forEach(({event:f,startCol:i,endCol:k,track:M})=>{const S=r[f.eventType]||r.default,x=i*100,I=(k-i)*100-6,D=10+M*34;s+=`
                <div class="timeline-bar" 
                     style="left: ${x+3}px; width: ${I}px; top: ${D}px; background-color: ${S};"
                     title="${f.name}"
                     data-event-id="${f.eventID}">
                    ${f.name}
                </div>
            `}),s+="</div>",s+="</div>",n++}),s+="</div>",l.innerHTML=s,l.querySelectorAll(".timeline-bar").forEach(a=>{a.addEventListener("click",g=>{g.stopPropagation();const T=a.getAttribute("data-event-id"),L=R.find(B=>B.eventID===T);L&&N(L,r[L.eventType]||r.default)})}),v.classList.remove("hidden"),c&&c.setAttribute("aria-expanded","true")}function N(r,v){const l=document.getElementById("modal-backdrop"),y=document.getElementById("modal-content");if(!l||!y)return;y.style.setProperty("--event-theme",v);const c=new Date,w=h(r.start),m=h(r.end);let b="";if(c<w){const t=w.getTime()-c.getTime(),o=Math.floor(t/(1e3*60*60*24)),p=Math.floor(t/(1e3*60*60)%24);b=`Starts in: ${o>0?`${o}d ${p}h`:`${p}h`}`}else{const t=m.getTime()-c.getTime(),o=Math.floor(t/(1e3*60*60*24)),p=Math.floor(t/(1e3*60*60)%24);b=`Ends in: ${o>0?`${o}d ${p}h`:`${p}h`}`}let $="";const u=r.extraData||{};if(r.eventType==="pokemon-spotlight-hour"&&u.spotlight){const t=u.spotlight;$=`
            <div class="event-details-grid">
                <div class="event-section-card">
                    <h4>Featured Pokémon</h4>
                    <div class="spotlight-pokemon-container">
                        <div class="event-tile spotlight-pokemon-tile">
                            <img src="${t.image}" alt="${t.name}" style="width: 80px; height: 80px;">
                            <div class="event-tile-name" style="font-weight: 700; font-size: 0.95rem;">${t.name}</div>
                            ${t.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                        </div>
                    </div>
                </div>
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div class="spotlight-bonus-container">
                        <div class="event-bonus-row">
                            <span class="spotlight-bonus-icon">🎁</span>
                            <div class="event-bonus-text">${t.bonus||"No Extra Bonus"}</div>
                        </div>
                    </div>
                </div>
            </div>
        `}else if((r.eventType==="raid-battles"||r.eventType==="raid-hour"||r.eventType==="raid-day")&&u.raidbattles){const t=u.raidbattles,o=t.bosses||[],p=t.shinies||[];$=`
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
        `}else if(r.eventType==="community-day"&&u.communityday){const t=u.communityday,o=t.spawns||[],p=t.bonuses||[],e=t.shinies||[],s=t.bonusDisclaimers||[],d=t.specialresearch||[];$=`
            <div class="event-details-grid">
                ${o.length>0||e.length>0?`
                <div class="event-section-card">
                    ${o.length>0?`
                    <h4>Featured Spawns</h4>
                    <div class="event-grid-list" style="margin-bottom: 20px;">
                        ${o.map(n=>`
                            <div class="event-tile">
                                <img src="${n.image}" alt="${n.name}">
                                <div class="event-tile-name">${n.name}</div>
                                ${n.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>`:""}

                    ${e.length>0?`
                    <h4 style="margin-top: 15px; border-top: 1px solid #edf2f7; padding-top: 15px;">New / Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${e.map(n=>`
                            <div class="event-tile">
                                <img src="${n.image}" alt="${n.name}">
                                <div class="event-tile-name">${n.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>`:""}
                </div>`:""}

                ${p.length>0?`
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div style="display:flex; flex-direction:row; flex-wrap:wrap; gap:10px;">
                        ${p.map(n=>`
                            <div class="event-bonus-row">
                                ${n.image?`<img src="${n.image}" alt="bonus icon" class="event-bonus-icon">`:""}
                                <div class="event-bonus-text">${n.text}</div>
                            </div>
                        `).join("")}
                    </div>
                    ${s.length>0?`
                    <div class="bonus-disclaimer" style="font-size:0.75rem; color:#718096; margin-top:12px; border-top:1px solid #edf2f7; padding-top:8px; line-height:1.4;">
                        ${s.map(n=>`<div style="margin-bottom: 4px;">${n}</div>`).join("")}
                    </div>`:""}
                </div>`:""}

                ${d.length>0?`
                <div class="event-section-card" style="grid-column: 1 / -1;">
                    <h4>Special Research Steps</h4>
                    <div class="research-timeline">
                        ${d.map(n=>`
                            <div class="research-step">
                                <div class="research-step-marker"></div>
                                <div class="research-step-title">${n.name}</div>
                                <div class="research-task-list">
                                    <div style="font-weight:700; margin-bottom:5px; color:#4a5568;">Tasks:</div>
                                    ${n.tasks.map(a=>`
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
                                        ${n.rewards.map(a=>`
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
        `}else{const t=u.generic?.hasSpawns,o=u.generic?.hasFieldResearchTasks;$=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div class="event-section-card" style="text-align:center; padding: 25px;">
                    <div style="font-size:1.1rem; font-weight:600; color:#4a5568; margin-bottom:15px;" class="generic-event-desc">
                        Standard Event details and timers are active. 
                    </div>
                    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                        <span class="event-status-pill">
                            ${t?"✅ Wild Spawns Active":"❌ No Special Spawns"}
                        </span>
                        <span class="event-status-pill">
                            ${o?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}y.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${r.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${r.heading}</span>
                <h2 class="event-modal-hero-title">${r.name}</h2>
                <div class="event-timer-large">📅 ${b}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${$}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${r.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const E=document.getElementById("modal-close-btn");E&&(E.onclick=()=>{l.classList.add("hidden")}),l.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",A);setInterval(A,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",v=>{const l=v.target,y=l.closest(".ranking-column");if(!y)return;const c=y.querySelector(".table-container");l.classList.contains("show-more-btn")&&(y.classList.add("expanded"),c&&c.classList.add("expanded")),l.classList.contains("show-less-btn")&&(y.classList.remove("expanded"),c&&c.classList.remove("expanded"))})});
