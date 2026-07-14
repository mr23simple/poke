import"./loadHeader-DmbNyicL.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const p=document.getElementById("loading-overlay"),k=document.getElementById("rankings-grid"),l=document.getElementById("modal-backdrop"),u=document.getElementById("modal-content"),c={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function $(e){let t=null,s=1/0;for(const i in c){const m=Math.abs(c[i]-e);m<s&&(s=m,t=i)}return t}function y(e){const t=(s,i)=>{if(!i||!i.value||i.value<=1)return"";const m=i.text?`(${i.text})`:"";return`<li><span>${s} ${m}</span><span>1 in ${Math.round(i.value).toLocaleString()}</span></li>`};u.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${v(e)}
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}function v(e){const t=[];let s=!1,i=!1,m=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(t.push('<span class="badge shlundo-badge">Shlundo</span>'),s=i=m=!0):e.isLucky&&e.isPerfect?(t.push('<span class="badge lundo-badge">Lundo</span>'),s=m=!0):e.isShiny&&e.isPerfect?(t.push('<span class="badge shundo-badge">Shundo</span>'),s=i=!0):e.isShiny&&e.isZeroIv&&(t.push('<span class="badge shnundo-badge">Shnundo</span>'),s=i=!0),!i&&e.isShiny&&t.push('<span class="badge shiny-badge">Shiny</span>'),!m&&e.isLucky?t.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&t.push('<span class="badge traded-badge">Traded</span>'),s||(e.isPerfect?t.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&t.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&t.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&t.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&t.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&t.push('<span class="badge mythical-badge">Mythical</span>'),t.join(" ")}function f(e){const t=e.iv.attack,s=e.iv.defense,i=e.iv.stamina,m=e.cpm,x=$(m);u.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div class="pokemon-modal-header">
                <img src="${e.sprite}" alt="${e.name}">
                <div class="pokemon-info">
                    <h2>
                        ${e.name}
                        <span class="badges-container">
                            ${v(e)}
                        </span>
                    </h2>
                    <div class="pokemon-stats-grid">
                        <div><span>Owner</span><strong>${renderPlayerBadge({userId:e.userId,publicId:e.ownerPublicId})}</strong></div>
                        <div><span>CP</span><strong>${e.cp}</strong></div>
                        <div><span>Level</span><strong>${x}</strong></div>
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
                        <span class="stat-value">${i}/15</span>
                    </div>
                </div>
            </div>
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const M=document.getElementById("attack-bar");M.style.width=`${t/15*100}%`,M.style.backgroundColor=t===15?"#da7a79":"#f79513";const E=document.getElementById("defense-bar");E.style.width=`${s/15*100}%`,E.style.backgroundColor=s===15?"#da7a79":"#f79513";const h=document.getElementById("stamina-bar");h.style.width=`${i/15*100}%`,h.style.backgroundColor=i===15?"#da7a79":"#f79513"},100)}function g(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const d=localStorage.getItem("liteMode")==="enabled";async function n(e){u.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const t=await fetch(`/api/player-detail/${e}`);if(!t.ok)throw new Error("Could not fetch player details.");const s=await t.json();u.innerHTML=`
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
                    ${s.highlights.map(i=>`<div class="${`pokemon-card${i.typeColors.length>0?" colored":""}${d||!i.sprite?" no-image":""}`}" style="${g(i.typeColors)}">
                                    <img src="${i.sprite}" alt="${i.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${d?`<span class="lite-name-span" style="${g(i.typeColors)}">${i.name}</span>`:i.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${i.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>l.classList.add("hidden")}catch(t){console.error("Failed to open player modal:",t),u.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${t.message}</p>
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
        `,l.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{l.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const a=document.querySelector(".header-content"),b=document.querySelector(".container"),T=(a?a.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(B=>{B.style.width=`${T}px`})};var o=e;const t=await fetch("/api/rankings");if(!t.ok)throw new Error("Failed to load rankings from the server.");const s=await t.json(),m=await(await fetch("/api/check-auth-status")).json(),x=document.getElementById("main-title");m.loggedIn&&m.userId?(document.title=`Pokemon GO | #${m.userId}`,x&&(x.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:m.userId,publicId:m.publicId})}`)):(document.title="Pokemon GO | Dashboard",x&&(x.textContent="Pokémon GO Player Dashboard"));const M=document.getElementById("recent-players-body");M.innerHTML=s.recentPlayers.map(a=>`
            <tr class="clickable-row" data-player-id="${a.publicId}">
                <td>${renderPlayerBadge(a)}</td>
                <td>
                    ${a.buddy?`
                        <img src="${a.buddy.sprite}" alt="${a.buddy.name}" title="${a.buddy.name}">
                        ${d?`<span class="pokemon-name-lite" style="${g(a.buddy.typeColors)}">${a.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${a.kmWalked} km</td>
                <td class="hide-on-mobile">${a.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const E=document.getElementById("strongest-pokemon-body"),h=s.strongestPokemon;E.innerHTML=h.map((a,b)=>`
            <tr class="clickable-pokemon-row" data-index="${b}">
                <td>${b+1}</td>
                <td class="pokemon-cell">
                    <img src="${a.sprite}" alt="${a.name}">
                    ${d?`<span class="pokemon-name-lite" style="${g(a.typeColors)}">${a.name}</span>`:""}
                </td>
                <td><strong>${a.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:a.userId,publicId:a.ownerPublicId})}</td>
            </tr>
        `).join("");const L=document.getElementById("rarest-pokemon-body"),D=s.rarestPokemon;L.innerHTML=D.map((a,b)=>`
            <tr class="clickable-rarity-row" data-index="${b}">
                <td><strong>${b+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${a.sprite}" alt="${a.name}">
                    ${d?`<span class="pokemon-name-lite" style="${g(a.typeColors)}">${a.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${v(a)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:a.userId,publicId:a.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",a=>{const b=a.target.closest(".clickable-row");if(b){const S=b.dataset.playerId;S&&n(S);return}const I=a.target.closest(".clickable-pokemon-row");if(I){const S=I.dataset.index,B=h[S];B&&f(B);return}const T=a.target.closest(".clickable-rarity-row");if(T){const S=T.dataset.index,B=D[S];B&&y(B)}}),p.classList.add("hidden"),k.classList.remove("hidden");const w=document.querySelector(".info-btn");w&&w.addEventListener("click",a=>{a.stopPropagation(),r()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),p.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}l.addEventListener("click",e=>{e.target===l&&(l.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let P=[];async function C(){const p=document.getElementById("events-container"),k="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",l={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function u(c){const $=Date.parse(c)-Date.parse(new Date);if($<=0)return null;const y=Math.floor($/(1e3*60*60*24)),v=Math.floor($/(1e3*60*60)%24),f=Math.floor($/1e3/60%60);return y>0?`${y}d ${v}h`:v>0?`${v}h ${f}m`:`${f}m`}try{const c=await fetch(k);if(!c.ok)throw new Error("Failed to fetch events");P=await c.json();const $=new Date,y=[],v=[];if(P.forEach(n=>{const r=new Date(n.start),o=new Date(n.end);$>=r&&$<=o?y.push(n):$<r&&v.push(n)}),v.sort((n,r)=>new Date(n.start)-new Date(r.start)),y.sort((n,r)=>new Date(n.end)-new Date(r.end)),y.length===0&&v.length===0){p.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}const f=(n,r)=>{const o=new Date(n.start),e=new Date(n.end),t=r?"Starts in":"Ends in",s=u(r?n.start:n.end),i=l[n.eventType]||l.default;return`
                <div class="event-item" data-event-id="${n.eventID}">
                    <div class="event-dot" style="background-color: ${i}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${n.name}">${n.name}</span>
                        <span class="event-timer">${t} ${s}</span>
                    </div>
                </div>
            `};let g="";y.length>0&&(g+='<h3 class="events-section-header">Ongoing</h3>',g+=y.map(n=>f(n,!1)).join("")),v.length>0&&(g+='<h3 class="events-section-header">Upcoming</h3>',g+=v.map(n=>f(n,!0)).join("")),p.innerHTML=g,p.querySelectorAll(".event-item").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-event-id"),o=P.find(e=>e.eventID===r);o&&j(o,l[o.eventType]||l.default)})});const d=document.getElementById("expand-events-btn");d&&(d.onclick=()=>{R(l)})}catch(c){console.error("Error loading events:",c),p.innerHTML='<p class="error-message">Error loading events.</p>'}}function R(p){const k=document.getElementById("timeline-modal-backdrop"),l=document.getElementById("timeline-scroll-container"),u=document.getElementById("timeline-modal-close-btn");if(!k||!l||!u)return;u.onclick=()=>k.classList.add("hidden"),k.onclick=t=>{t.target===k&&k.classList.add("hidden")};const c=new Date;c.setHours(0,0,0,0);const $=P.filter(t=>new Date(t.end)>=c);let y=new Date(c);$.forEach(t=>{const s=new Date(t.end);s>y&&(y=s)});const v=1440*60*1e3,f=Math.ceil((y-c)/v),g=Math.min(Math.max(14,f),90),d=[];for(let t=0;t<g;t++){const s=new Date(c);s.setDate(c.getDate()+t),d.push(s)}const n=new Date(d[g-1]);n.setHours(23,59,59,999);const r={};$.forEach(t=>{const s=new Date(t.start);new Date(t.end)<c||s>n||(r[t.eventType]||(r[t.eventType]=[]),r[t.eventType].push(t))});let o=`<div class="timeline-grid" style="grid-template-columns: 160px repeat(${g}, 100px);">`;o+='<div class="timeline-header-row">',o+='<div class="timeline-label-header">Event Category</div>';const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];d.forEach((t,s)=>{o+=`
            <div class="${`timeline-date-cell${s===0?" today":""}`}">
                <div>${e[t.getDay()]}</div>
                <div>${t.getDate()}</div>
            </div>
        `}),o+="</div>",Object.keys(r).forEach(t=>{const s=r[t],i=t.replace(/-/g," ");s.sort((h,L)=>new Date(h.start)-new Date(L.start));const m=[],x=s.map(h=>{const L=new Date(h.start),D=new Date(h.end);let w=0;L>c&&(w=(L-c)/(1440*60*1e3));let a=g;D<n&&(a=(D-c)/(1440*60*1e3)),w<0&&(w=0),a>g&&(a=g),a<=w&&(a=w+1/24);let b=-1;for(let I=0;I<m.length;I++)if(w>=m[I]-.01){b=I;break}return b===-1?(m.push(a),b=m.length-1):m[b]=a,{event:h,startCol:w,endCol:a,track:b}}),E=16+Math.max(1,m.length)*34;o+='<div class="timeline-row">',o+=`<div class="timeline-row-label" style="height: ${E}px;">${i}</div>`;for(let h=0;h<g;h++)o+=`<div class="${`timeline-grid-cell${h===0?" today-col":""}`}" style="height: ${E}px;"></div>`;o+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${g}; grid-template-columns: repeat(${g}, 100px); height: ${E}px;">`,x.forEach(({event:h,startCol:L,endCol:D,track:w})=>{const a=p[h.eventType]||p.default,b=L*100,I=(D-L)*100-6,T=10+w*34;o+=`
                <div class="timeline-bar" 
                     style="left: ${b+3}px; width: ${I}px; top: ${T}px; background-color: ${a};"
                     title="${h.name}"
                     data-event-id="${h.eventID}">
                    ${h.name}
                </div>
            `}),o+="</div>",o+="</div>"}),o+="</div>",l.innerHTML=o,l.querySelectorAll(".timeline-bar").forEach(t=>{t.addEventListener("click",s=>{s.stopPropagation();const i=t.getAttribute("data-event-id"),m=P.find(x=>x.eventID===i);m&&j(m,p[m.eventType]||p.default)})}),k.classList.remove("hidden")}function j(p,k){const l=document.getElementById("modal-backdrop"),u=document.getElementById("modal-content");if(!l||!u)return;u.style.setProperty("--event-theme",k);const c=new Date,$=new Date(p.start);new Date(p.end);let y="";if(c<$){const d=Date.parse(p.start)-Date.parse(c),n=Math.floor(d/(1e3*60*60*24)),r=Math.floor(d/(1e3*60*60)%24);y=`Starts in: ${n>0?`${n}d ${r}h`:`${r}h`}`}else{const d=Date.parse(p.end)-Date.parse(c),n=Math.floor(d/(1e3*60*60*24)),r=Math.floor(d/(1e3*60*60)%24);y=`Ends in: ${n>0?`${n}d ${r}h`:`${r}h`}`}let v="";const f=p.extraData||{};if(p.eventType==="pokemon-spotlight-hour"&&f.spotlight){const d=f.spotlight;v=`
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
        `}else if((p.eventType==="raid-battles"||p.eventType==="raid-hour"||p.eventType==="raid-day")&&f.raidbattles){const d=f.raidbattles,n=d.bosses||[],r=d.shinies||[];v=`
            <div class="event-details-grid">
                ${n.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${n.map(o=>`
                            <div class="event-tile">
                                <img src="${o.image}" alt="${o.name}">
                                <div class="event-tile-name">${o.name}</div>
                                ${o.canBeShiny?'<span class="shiny-indicator" title="Shiny Available">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${r.length>0?`
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${r.map(o=>`
                            <div class="event-tile">
                                <img src="${o.image}" alt="${o.name}">
                                <div class="event-tile-name">${o.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else if(p.eventType==="community-day"&&f.communityday){const d=f.communityday,n=d.spawns||[],r=d.bonuses||[],o=d.shinies||[],e=d.bonusDisclaimers||[],t=d.specialresearch||[];v=`
            <div class="event-details-grid">
                ${n.length>0||o.length>0?`
                <div class="event-section-card">
                    ${n.length>0?`
                    <h4>Featured Spawns</h4>
                    <div class="event-grid-list" style="margin-bottom: 20px;">
                        ${n.map(s=>`
                            <div class="event-tile">
                                <img src="${s.image}" alt="${s.name}">
                                <div class="event-tile-name">${s.name}</div>
                                ${s.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>`:""}

                    ${o.length>0?`
                    <h4 style="margin-top: 15px; border-top: 1px solid #edf2f7; padding-top: 15px;">New / Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${o.map(s=>`
                            <div class="event-tile">
                                <img src="${s.image}" alt="${s.name}">
                                <div class="event-tile-name">${s.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>`:""}
                </div>`:""}

                ${r.length>0?`
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div style="display:flex; flex-direction:row; flex-wrap:wrap; gap:10px;">
                        ${r.map(s=>`
                            <div class="event-bonus-row">
                                ${s.image?`<img src="${s.image}" alt="bonus icon" class="event-bonus-icon">`:""}
                                <div class="event-bonus-text">${s.text}</div>
                            </div>
                        `).join("")}
                    </div>
                    ${e.length>0?`
                    <div class="bonus-disclaimer" style="font-size:0.75rem; color:#718096; margin-top:12px; border-top:1px solid #edf2f7; padding-top:8px; line-height:1.4;">
                        ${e.map(s=>`<div style="margin-bottom: 4px;">${s}</div>`).join("")}
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
                                    ${s.tasks.map(i=>`
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
                                        ${s.rewards.map(i=>`
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
        `}else{const d=f.generic?.hasSpawns,n=f.generic?.hasFieldResearchTasks;v=`
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
                            ${n?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}u.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${p.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${p.heading}</span>
                <h2 class="event-modal-hero-title">${p.name}</h2>
                <div class="event-timer-large">📅 ${y}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${v}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${p.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const g=document.getElementById("modal-close-btn");g&&(g.onclick=()=>{l.classList.add("hidden")}),l.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",C);setInterval(C,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",k=>{const l=k.target,u=l.closest(".ranking-column");if(!u)return;const c=u.querySelector(".table-container");l.classList.contains("show-more-btn")&&(u.classList.add("expanded"),c&&c.classList.add("expanded")),l.classList.contains("show-less-btn")&&(u.classList.remove("expanded"),c&&c.classList.remove("expanded"))})});
