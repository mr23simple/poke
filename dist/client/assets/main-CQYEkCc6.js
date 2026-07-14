import"./loadHeader-DmbNyicL.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const r=document.getElementById("loading-overlay"),v=document.getElementById("rankings-grid"),o=document.getElementById("modal-backdrop"),b=document.getElementById("modal-content"),p={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function k(e){let n=null,d=1/0;for(const t in p){const a=Math.abs(p[t]-e);a<d&&(d=a,n=t)}return n}function x(e){const n=(d,t)=>{if(!t||!t.value||t.value<=1)return"";const a=t.text?`(${t.text})`:"";return`<li><span>${d} ${a}</span><span>1 in ${Math.round(t.value).toLocaleString()}</span></li>`};b.innerHTML=`
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
                    ${n("Perfect IVs",e.rarity.breakdown.iv)}
                    ${n("Shiny",e.rarity.breakdown.shiny)}
                    ${n("Lucky",e.rarity.breakdown.lucky)}
                    ${n("Origin",e.rarity.breakdown.origin)}
                </ul>
            </div>
        `,o.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{o.classList.add("hidden"),document.body.classList.remove("modal-open")}}function g(e){const n=[];let d=!1,t=!1,a=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(n.push('<span class="badge shlundo-badge">Shlundo</span>'),d=t=a=!0):e.isLucky&&e.isPerfect?(n.push('<span class="badge lundo-badge">Lundo</span>'),d=a=!0):e.isShiny&&e.isPerfect?(n.push('<span class="badge shundo-badge">Shundo</span>'),d=t=!0):e.isShiny&&e.isZeroIv&&(n.push('<span class="badge shnundo-badge">Shnundo</span>'),d=t=!0),!t&&e.isShiny&&n.push('<span class="badge shiny-badge">Shiny</span>'),!a&&e.isLucky?n.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&n.push('<span class="badge traded-badge">Traded</span>'),d||(e.isPerfect?n.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&n.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&n.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&n.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&n.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&n.push('<span class="badge mythical-badge">Mythical</span>'),n.join(" ")}function w(e){const n=e.iv.attack,d=e.iv.defense,t=e.iv.stamina,a=e.cpm,M=k(a);b.innerHTML=`
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
                        <div><span>Level</span><strong>${M}</strong></div>
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
        `,o.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{o.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const S=document.getElementById("attack-bar");S.style.width=`${n/15*100}%`,S.style.backgroundColor=n===15?"#da7a79":"#f79513";const m=document.getElementById("defense-bar");m.style.width=`${d/15*100}%`,m.style.backgroundColor=d===15?"#da7a79":"#f79513";const u=document.getElementById("stamina-bar");u.style.width=`${t/15*100}%`,u.style.backgroundColor=t===15?"#da7a79":"#f79513"},100)}function l(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const I=localStorage.getItem("liteMode")==="enabled";async function s(e){b.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,o.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{o.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const n=await fetch(`/api/player-detail/${e}`);if(!n.ok)throw new Error("Could not fetch player details.");const d=await n.json();b.innerHTML=`
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
                    ${d.highlights.map(t=>`<div class="${`pokemon-card${t.typeColors.length>0?" colored":""}${I||!t.sprite?" no-image":""}`}" style="${l(t.typeColors)}">
                                    <img src="${t.sprite}" alt="${t.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${I?`<span class="lite-name-span" style="${l(t.typeColors)}">${t.name}</span>`:t.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${t.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>o.classList.add("hidden")}catch(n){console.error("Failed to open player modal:",n),b.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${n.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>o.classList.add("hidden")}}function c(){b.innerHTML=`
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
        `,o.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{o.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const i=document.querySelector(".header-content"),T=document.querySelector(".container"),$=(i?i.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(B=>{B.style.width=`${$}px`})};var h=e;const n=await fetch("/api/rankings");if(!n.ok)throw new Error("Failed to load rankings from the server.");const d=await n.json(),a=await(await fetch("/api/check-auth-status")).json(),M=document.getElementById("main-title");a.loggedIn&&a.userId?(document.title=`Pokemon GO | #${a.userId}`,M&&(M.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:a.userId,publicId:a.publicId})}`)):(document.title="Pokemon GO | Dashboard",M&&(M.textContent="Pokémon GO Player Dashboard"));const S=document.getElementById("recent-players-body");S.innerHTML=d.recentPlayers.map(i=>`
            <tr class="clickable-row" data-player-id="${i.publicId}">
                <td>${renderPlayerBadge(i)}</td>
                <td>
                    ${i.buddy?`
                        <img src="${i.buddy.sprite}" alt="${i.buddy.name}" title="${i.buddy.name}">
                        ${I?`<span class="pokemon-name-lite" style="${l(i.buddy.typeColors)}">${i.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${i.kmWalked} km</td>
                <td class="hide-on-mobile">${i.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const m=document.getElementById("strongest-pokemon-body"),u=d.strongestPokemon;m.innerHTML=u.map((i,T)=>`
            <tr class="clickable-pokemon-row" data-index="${T}">
                <td>${T+1}</td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${I?`<span class="pokemon-name-lite" style="${l(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td><strong>${i.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join("");const C=document.getElementById("rarest-pokemon-body"),E=d.rarestPokemon;C.innerHTML=E.map((i,T)=>`
            <tr class="clickable-rarity-row" data-index="${T}">
                <td><strong>${T+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${I?`<span class="pokemon-name-lite" style="${l(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${g(i)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",i=>{const T=i.target.closest(".clickable-row");if(T){const L=T.dataset.playerId;L&&s(L);return}const f=i.target.closest(".clickable-pokemon-row");if(f){const L=f.dataset.index,B=u[L];B&&w(B);return}const $=i.target.closest(".clickable-rarity-row");if($){const L=$.dataset.index,B=E[L];B&&x(B)}}),r.classList.add("hidden"),v.classList.remove("hidden");const j=document.querySelector(".info-btn");j&&j.addEventListener("click",i=>{i.stopPropagation(),c()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),r.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}o.addEventListener("click",e=>{e.target===o&&(o.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let F=[];function y(r){if(!r)return new Date;const v=r.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);return v?new Date(parseInt(v[1],10),parseInt(v[2],10)-1,parseInt(v[3],10),parseInt(v[4],10),parseInt(v[5],10),parseInt(v[6],10)):new Date(r)}async function G(){const r=document.getElementById("events-container"),v="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",o={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function b(p){const k=y(p).getTime()-new Date().getTime();if(k<=0)return null;const x=Math.floor(k/(1e3*60*60*24)),g=Math.floor(k/(1e3*60*60)%24),w=Math.floor(k/1e3/60%60);return x>0?`${x}d ${g}h`:g>0?`${g}h ${w}m`:`${w}m`}try{const p=await fetch(v);if(!p.ok)throw new Error("Failed to fetch events");F=await p.json();const k=new Date,x=[],g=[];if(F.forEach(s=>{const c=y(s.start),h=y(s.end);k>=c&&k<=h?x.push(s):k<c&&g.push(s)}),g.sort((s,c)=>y(s.start)-y(c.start)),x.sort((s,c)=>y(s.end)-y(c.end)),x.length===0&&g.length===0){r.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}const w=(s,c)=>{const h=y(s.start),e=y(s.end),n=c?"Starts in":"Ends in",d=b(c?s.start:s.end),t=o[s.eventType]||o.default;return`
                <div class="event-item" data-event-id="${s.eventID}">
                    <div class="event-dot" style="background-color: ${t}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${s.name}">${s.name}</span>
                        <span class="event-timer">${n} ${d}</span>
                    </div>
                </div>
            `};let l="";x.length>0&&(l+='<h3 class="events-section-header">Ongoing</h3>',l+=x.map(s=>w(s,!1)).join("")),g.length>0&&(l+='<h3 class="events-section-header">Upcoming</h3>',l+=g.map(s=>w(s,!0)).join("")),r.innerHTML=l,r.querySelectorAll(".event-item").forEach(s=>{s.addEventListener("click",()=>{const c=s.getAttribute("data-event-id"),h=F.find(e=>e.eventID===c);h&&V(h,o[h.eventType]||o.default)})});const I=document.getElementById("expand-events-btn");I&&(I.onclick=()=>{_(o)})}catch(p){console.error("Error loading events:",p),r.innerHTML='<p class="error-message">Error loading events.</p>'}}function _(r){const v=document.getElementById("timeline-modal-backdrop"),o=document.getElementById("timeline-scroll-container"),b=document.getElementById("timeline-modal-close-btn"),p=document.getElementById("expand-events-btn");if(!v||!o||!b)return;const k=window.innerWidth<=768,x=k?110:160,g=k?70:100,w=()=>{v.classList.add("hidden"),p&&p.setAttribute("aria-expanded","false")};b.onclick=w,v.onclick=m=>{m.target===v&&w()};const l=new Date;l.setHours(0,0,0,0);const I=F.filter(m=>y(m.end)>=l);let s=new Date(l);I.forEach(m=>{const u=y(m.end);u>s&&(s=u)});const c=1440*60*1e3,h=Math.ceil((s-l)/c),e=Math.min(Math.max(14,h),90),n=[];for(let m=0;m<e;m++){const u=new Date(l);u.setDate(l.getDate()+m),n.push(u)}const d=new Date(n[e-1]);d.setHours(23,59,59,999);const t={};I.forEach(m=>{const u=y(m.start);y(m.end)<l||u>d||(t[m.eventType]||(t[m.eventType]=[]),t[m.eventType].push(m))});let a=`<div class="timeline-grid" style="grid-template-columns: ${x}px repeat(${e}, ${g}px);">`;a+='<div class="timeline-header-row">',a+='<div class="timeline-label-header">Event Category</div>';const M=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];n.forEach((m,u)=>{a+=`
            <div class="${`timeline-date-cell${u===0?" today":""}`}">
                <div>${M[m.getDay()]}</div>
                <div>${m.getDate()}</div>
            </div>
        `}),a+="</div>";let S=2;Object.keys(t).forEach(m=>{const u=t[m],C=m.replace(/-/g," ");u.sort((f,$)=>y(f.start)-y($.start));const E=[],j=u.map(f=>{const $=y(f.start),L=y(f.end),B=$.getFullYear()===L.getFullYear()&&$.getMonth()===L.getMonth()&&$.getDate()===L.getDate();let A=!1;if(B){const H=new Date($);H.setHours(0,0,0,0);const z=new Date($);z.setHours(23,59,59,999),A=u.some(N=>{if(N.eventID===f.eventID)return!1;const q=y(N.start);return y(N.end)>=H&&q<=z})}let R=$,O=L;B&&!A&&(R=new Date($),R.setHours(0,0,0,0),O=new Date(L),O.setHours(23,59,59,999));let D=0;R>l&&(D=(R-l)/(1440*60*1e3));let P=e;O<d&&(P=(O-l)/(1440*60*1e3)),D<0&&(D=0),P>e&&(P=e),P<=D&&(P=D+1/24);let W=-1;for(let H=0;H<E.length;H++)if(D>=E[H]-.01){W=H;break}return W===-1?(E.push(P),W=E.length-1):E[W]=P,{event:f,startCol:D,endCol:P,track:W}}),T=16+Math.max(1,E.length)*34;a+='<div class="timeline-row">',a+=`<div class="timeline-row-label" style="height: ${T}px; grid-row: ${S};">${C}</div>`;for(let f=0;f<e;f++)a+=`<div class="${`timeline-grid-cell${f===0?" today-col":""}`}" style="height: ${T}px; grid-row: ${S};"></div>`;a+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${e}; grid-template-columns: repeat(${e}, ${g}px); height: ${T}px; grid-row: ${S};">`,j.forEach(({event:f,startCol:$,endCol:L,track:B})=>{const A=r[f.eventType]||r.default,R=$*g,O=(L-$)*g-6,D=10+B*34;a+=`
                <div class="timeline-bar" 
                     style="left: ${R+3}px; width: ${O}px; top: ${D}px; background-color: ${A};"
                     title="${f.name}"
                     data-event-id="${f.eventID}">
                    ${f.name}
                </div>
            `}),a+="</div>",a+="</div>",S++}),a+="</div>",o.innerHTML=a,o.querySelectorAll(".timeline-bar").forEach(m=>{m.addEventListener("click",u=>{u.stopPropagation();const C=m.getAttribute("data-event-id"),E=F.find(j=>j.eventID===C);E&&V(E,r[E.eventType]||r.default)})}),v.classList.remove("hidden"),p&&p.setAttribute("aria-expanded","true")}function V(r,v){const o=document.getElementById("modal-backdrop"),b=document.getElementById("modal-content");if(!o||!b)return;b.style.setProperty("--event-theme",v);const p=new Date,k=y(r.start),x=y(r.end);let g="";if(p<k){const s=k.getTime()-p.getTime(),c=Math.floor(s/(1e3*60*60*24)),h=Math.floor(s/(1e3*60*60)%24);g=`Starts in: ${c>0?`${c}d ${h}h`:`${h}h`}`}else{const s=x.getTime()-p.getTime(),c=Math.floor(s/(1e3*60*60*24)),h=Math.floor(s/(1e3*60*60)%24);g=`Ends in: ${c>0?`${c}d ${h}h`:`${h}h`}`}let w="";const l=r.extraData||{};if(r.eventType==="pokemon-spotlight-hour"&&l.spotlight){const s=l.spotlight;w=`
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
        `}else if((r.eventType==="raid-battles"||r.eventType==="raid-hour"||r.eventType==="raid-day")&&l.raidbattles){const s=l.raidbattles,c=s.bosses||[],h=s.shinies||[];w=`
            <div class="event-details-grid">
                ${c.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${c.map(e=>`
                            <div class="event-tile">
                                <img src="${e.image}" alt="${e.name}">
                                <div class="event-tile-name">${e.name}</div>
                                ${e.canBeShiny?'<span class="shiny-indicator" title="Shiny Available">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${h.length>0?`
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${h.map(e=>`
                            <div class="event-tile">
                                <img src="${e.image}" alt="${e.name}">
                                <div class="event-tile-name">${e.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else if(r.eventType==="community-day"&&l.communityday){const s=l.communityday,c=s.spawns||[],h=s.bonuses||[],e=s.shinies||[],n=s.bonusDisclaimers||[],d=s.specialresearch||[];w=`
            <div class="event-details-grid">
                ${c.length>0||e.length>0?`
                <div class="event-section-card">
                    ${c.length>0?`
                    <h4>Featured Spawns</h4>
                    <div class="event-grid-list" style="margin-bottom: 20px;">
                        ${c.map(t=>`
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

                ${h.length>0?`
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div style="display:flex; flex-direction:row; flex-wrap:wrap; gap:10px;">
                        ${h.map(t=>`
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
        `}else{const s=l.generic?.hasSpawns,c=l.generic?.hasFieldResearchTasks;w=`
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
                            ${c?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}b.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${r.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${r.heading}</span>
                <h2 class="event-modal-hero-title">${r.name}</h2>
                <div class="event-timer-large">📅 ${g}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${w}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${r.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const I=document.getElementById("modal-close-btn");I&&(I.onclick=()=>{o.classList.add("hidden")}),o.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",G);setInterval(G,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",v=>{const o=v.target,b=o.closest(".ranking-column");if(!b)return;const p=b.querySelector(".table-container");o.classList.contains("show-more-btn")&&(b.classList.add("expanded"),p&&p.classList.add("expanded")),o.classList.contains("show-less-btn")&&(b.classList.remove("expanded"),p&&p.classList.remove("expanded"))})});
