import"./loadHeader-ChBvZhyc.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const c=document.getElementById("loading-overlay"),u=document.getElementById("rankings-grid"),d=document.getElementById("modal-backdrop"),y=document.getElementById("modal-content"),p={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function L(e){let n=null,a=1/0;for(const t in p){const s=Math.abs(p[t]-e);s<a&&(a=s,n=t)}return n}function f(e){const n=(a,t)=>{if(!t||!t.value||t.value<=1)return"";const s=t.text?`(${t.text})`:"";return`<li><span>${a} ${s}</span><span>1 in ${Math.round(t.value).toLocaleString()}</span></li>`};y.innerHTML=`
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
        `,d.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{d.classList.add("hidden"),document.body.classList.remove("modal-open")}}function g(e){const n=[];let a=!1,t=!1,s=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(n.push('<span class="badge shlundo-badge">Shlundo</span>'),a=t=s=!0):e.isLucky&&e.isPerfect?(n.push('<span class="badge lundo-badge">Lundo</span>'),a=s=!0):e.isShiny&&e.isPerfect?(n.push('<span class="badge shundo-badge">Shundo</span>'),a=t=!0):e.isShiny&&e.isZeroIv&&(n.push('<span class="badge shnundo-badge">Shnundo</span>'),a=t=!0),!t&&e.isShiny&&n.push('<span class="badge shiny-badge">Shiny</span>'),!s&&e.isLucky?n.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&n.push('<span class="badge traded-badge">Traded</span>'),a||(e.isPerfect?n.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&n.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&n.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&n.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&n.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&n.push('<span class="badge mythical-badge">Mythical</span>'),n.join(" ")}function $(e){const n=e.iv.attack,a=e.iv.defense,t=e.iv.stamina,s=e.cpm,I=L(s);y.innerHTML=`
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
                        <div><span>Level</span><strong>${I}</strong></div>
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
                        <span class="stat-value">${a}/15</span>
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
        `,d.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{d.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const T=document.getElementById("attack-bar");T.style.width=`${n/15*100}%`,T.style.backgroundColor=n===15?"#da7a79":"#f79513";const o=document.getElementById("defense-bar");o.style.width=`${a/15*100}%`,o.style.backgroundColor=a===15?"#da7a79":"#f79513";const m=document.getElementById("stamina-bar");m.style.width=`${t/15*100}%`,m.style.backgroundColor=t===15?"#da7a79":"#f79513"},100)}function r(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const x=localStorage.getItem("liteMode")==="enabled";async function l(e){y.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,d.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{d.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const n=await fetch(`/api/player-detail/${e}`);if(!n.ok)throw new Error("Could not fetch player details.");const a=await n.json();y.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <h2>${renderPlayerBadge({userId:a.userId,publicId:a.publicId})}</h2>
                <div class="grid-stats">
                    <div><span>Total XP</span><strong>${a.totalXp.toLocaleString()}</strong></div>
                    <div><span>Pokémon Caught</span><strong>${a.pokemonCaught.toLocaleString()}</strong></div>
                    <div><span>Distance Walked</span><strong>${a.kmWalked.toFixed(1)} km</strong></div>
                    <div><span>PokéStops Visited</span><strong>${a.pokestopsVisited.toLocaleString()}</strong></div>
                </div>
                
                <h3>Highlights</h3>
                <div id="modal-pokemon-container">
                    ${a.highlights.map(t=>`<div class="${`pokemon-card${t.typeColors.length>0?" colored":""}${x||!t.sprite?" no-image":""}`}" style="${r(t.typeColors)}">
                                    <img src="${t.sprite}" alt="${t.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${x?`<span class="lite-name-span" style="${r(t.typeColors)}">${t.name}</span>`:t.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${t.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>d.classList.add("hidden")}catch(n){console.error("Failed to open player modal:",n),y.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${n.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>d.classList.add("hidden")}}function v(){y.innerHTML=`
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
        `,d.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{d.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const i=document.querySelector(".header-content"),S=document.querySelector(".container"),k=(i?i.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(D=>{D.style.width=`${k}px`})};var w=e;const n=await fetch("/api/rankings");if(!n.ok)throw new Error("Failed to load rankings from the server.");const a=await n.json(),s=await(await fetch("/api/check-auth-status")).json(),I=document.getElementById("main-title");s.loggedIn&&s.userId?(document.title=`Pokemon GO | #${s.userId}`,I&&(I.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:s.userId,publicId:s.publicId})}`)):(document.title="Pokemon GO | Dashboard",I&&(I.textContent="Pokémon GO Player Dashboard"));const T=document.getElementById("recent-players-body");T.innerHTML=a.recentPlayers.map(i=>`
            <tr class="clickable-row" data-player-id="${i.publicId}">
                <td>${renderPlayerBadge(i)}</td>
                <td>
                    ${i.buddy?`
                        <img src="${i.buddy.sprite}" alt="${i.buddy.name}" title="${i.buddy.name}">
                        ${x?`<span class="pokemon-name-lite" style="${r(i.buddy.typeColors)}">${i.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${i.kmWalked} km</td>
                <td class="hide-on-mobile">${i.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const o=document.getElementById("strongest-pokemon-body"),m=a.strongestPokemon;o.innerHTML=m.map((i,S)=>`
            <tr class="clickable-pokemon-row" data-index="${S}">
                <td>${S+1}</td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${x?`<span class="pokemon-name-lite" style="${r(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td><strong>${i.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join("");const M=document.getElementById("rarest-pokemon-body"),B=a.rarestPokemon;M.innerHTML=B.map((i,S)=>`
            <tr class="clickable-rarity-row" data-index="${S}">
                <td><strong>${S+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${x?`<span class="pokemon-name-lite" style="${r(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${g(i)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",i=>{const S=i.target.closest(".clickable-row");if(S){const E=S.dataset.playerId;E&&l(E);return}const b=i.target.closest(".clickable-pokemon-row");if(b){const E=b.dataset.index,D=m[E];D&&$(D);return}const k=i.target.closest(".clickable-rarity-row");if(k){const E=k.dataset.index,D=B[E];D&&f(D)}}),c.classList.add("hidden"),u.classList.remove("hidden");const j=document.querySelector(".info-btn");j&&j.addEventListener("click",i=>{i.stopPropagation(),v()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),c.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}d.addEventListener("click",e=>{e.target===d&&(d.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let A=[],N=!1;function h(c){if(!c)return new Date;const u=c.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);return u?new Date(parseInt(u[1],10),parseInt(u[2],10)-1,parseInt(u[3],10),parseInt(u[4],10),parseInt(u[5],10),parseInt(u[6],10)):new Date(c)}async function G(){const c=document.getElementById("events-container"),u="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",d={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function y(p){const L=h(p).getTime()-new Date().getTime();if(L<=0)return null;const f=Math.floor(L/(1e3*60*60*24)),g=Math.floor(L/(1e3*60*60)%24),$=Math.floor(L/1e3/60%60);return f>0?`${f}d ${g}h`:g>0?`${g}h ${$}m`:`${$}m`}try{const p=await fetch(u);if(!p.ok)throw new Error("Failed to fetch events");A=await p.json();const L=new Date,f=[],g=[];if(A.forEach(t=>{const s=h(t.start),I=h(t.end);L>=s&&L<=I?f.push(t):L<s&&g.push(t)}),g.sort((t,s)=>h(t.start)-h(s.start)),f.sort((t,s)=>h(t.end)-h(s.end)),f.length===0&&g.length===0){c.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}let $=f,r=g;const x=5,l=f.length+g.length,v=l>x;!N&&v&&(f.length>=x?($=f.slice(0,x),r=[]):($=f,r=g.slice(0,x-f.length)));const w=(t,s)=>{const I=h(t.start),T=h(t.end),o=s?"Starts in":"Ends in",m=y(s?t.start:t.end),M=d[t.eventType]||d.default;return`
                <div class="event-item" data-event-id="${t.eventID}">
                    <div class="event-dot" style="background-color: ${M}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${t.name}">${t.name}</span>
                        <span class="event-timer">${o} ${m}</span>
                    </div>
                </div>
            `};let e="";$.length>0&&(e+='<h3 class="events-section-header">Ongoing</h3>',e+=$.map(t=>w(t,!1)).join("")),r.length>0&&(e+='<h3 class="events-section-header">Upcoming</h3>',e+=r.map(t=>w(t,!0)).join("")),v&&(e+=`
                <button id="toggle-events-btn" class="toggle-events-btn">
                    ${N?"Show Less":`Show All (${l})`}
                </button>
            `),c.innerHTML=e,c.querySelectorAll(".event-item").forEach(t=>{t.addEventListener("click",()=>{const s=t.getAttribute("data-event-id"),I=A.find(T=>T.eventID===s);I&&q(I,d[I.eventType]||d.default)})});const n=document.getElementById("toggle-events-btn");n&&(n.onclick=()=>{N=!N,G()});const a=document.getElementById("expand-events-btn");a&&(a.onclick=()=>{U(d)})}catch(p){console.error("Error loading events:",p),c.innerHTML='<p class="error-message">Error loading events.</p>'}}function U(c){const u=document.getElementById("timeline-modal-backdrop"),d=document.getElementById("timeline-scroll-container"),y=document.getElementById("timeline-modal-close-btn"),p=document.getElementById("expand-events-btn");if(!u||!d||!y)return;const L=window.innerWidth<=768,f=L?110:160,g=L?70:100,$=()=>{u.classList.add("hidden"),p&&p.setAttribute("aria-expanded","false")};y.onclick=$,u.onclick=o=>{o.target===u&&$()};const r=new Date;r.setHours(0,0,0,0);const x=A.filter(o=>h(o.end)>=r);let l=new Date(r);x.forEach(o=>{const m=h(o.end);m>l&&(l=m)});const v=1440*60*1e3,w=Math.ceil((l-r)/v),e=Math.min(Math.max(14,w),90),n=[];for(let o=0;o<e;o++){const m=new Date(r);m.setDate(r.getDate()+o),n.push(m)}const a=new Date(n[e-1]);a.setHours(23,59,59,999);const t={};x.forEach(o=>{const m=h(o.start);h(o.end)<r||m>a||(t[o.eventType]||(t[o.eventType]=[]),t[o.eventType].push(o))});let s=`<div class="timeline-grid" style="grid-template-columns: ${f}px repeat(${e}, ${g}px);">`;s+='<div class="timeline-header-row">',s+='<div class="timeline-label-header">Event Category</div>';const I=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];n.forEach((o,m)=>{s+=`
            <div class="${`timeline-date-cell${m===0?" today":""}`}">
                <div>${I[o.getDay()]}</div>
                <div>${o.getDate()}</div>
            </div>
        `}),s+="</div>";let T=2;Object.keys(t).forEach(o=>{const m=t[o],M=o.replace(/-/g," ");m.sort((b,k)=>h(b.start)-h(k.start));const B=[],j=m.map(b=>{const k=h(b.start),E=h(b.end),D=k.getFullYear()===E.getFullYear()&&k.getMonth()===E.getMonth()&&k.getDate()===E.getDate();let F=!1;if(D){const H=new Date(k);H.setHours(0,0,0,0);const V=new Date(k);V.setHours(23,59,59,999),F=m.some(z=>{if(z.eventID===b.eventID)return!1;const _=h(z.start);return h(z.end)>=H&&_<=V})}let R=k,O=E;D&&!F&&(R=new Date(k),R.setHours(0,0,0,0),O=new Date(E),O.setHours(23,59,59,999));let P=0;R>r&&(P=(R-r)/(1440*60*1e3));let C=e;O<a&&(C=(O-r)/(1440*60*1e3)),P<0&&(P=0),C>e&&(C=e),C<=P&&(C=P+1/24);let W=-1;for(let H=0;H<B.length;H++)if(P>=B[H]-.01){W=H;break}return W===-1?(B.push(C),W=B.length-1):B[W]=C,{event:b,startCol:P,endCol:C,track:W}}),S=16+Math.max(1,B.length)*34;s+='<div class="timeline-row">',s+=`<div class="timeline-row-label" style="height: ${S}px; grid-row: ${T};">${M}</div>`;for(let b=0;b<e;b++)s+=`<div class="${`timeline-grid-cell${b===0?" today-col":""}`}" style="height: ${S}px; grid-row: ${T};"></div>`;s+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${e}; grid-template-columns: repeat(${e}, ${g}px); height: ${S}px; grid-row: ${T};">`,j.forEach(({event:b,startCol:k,endCol:E,track:D})=>{const F=c[b.eventType]||c.default,R=k*g,O=(E-k)*g-6,P=10+D*34;s+=`
                <div class="timeline-bar" 
                     style="left: ${R+3}px; width: ${O}px; top: ${P}px; background-color: ${F};"
                     title="${b.name}"
                     data-event-id="${b.eventID}">
                    ${b.name}
                </div>
            `}),s+="</div>",s+="</div>",T++}),s+="</div>",d.innerHTML=s,d.querySelectorAll(".timeline-bar").forEach(o=>{o.addEventListener("click",m=>{m.stopPropagation();const M=o.getAttribute("data-event-id"),B=A.find(j=>j.eventID===M);B&&q(B,c[B.eventType]||c.default)})}),u.classList.remove("hidden"),p&&p.setAttribute("aria-expanded","true")}function q(c,u){const d=document.getElementById("modal-backdrop"),y=document.getElementById("modal-content");if(!d||!y)return;y.style.setProperty("--event-theme",u);const p=new Date,L=h(c.start),f=h(c.end);let g="";if(p<L){const l=L.getTime()-p.getTime(),v=Math.floor(l/(1e3*60*60*24)),w=Math.floor(l/(1e3*60*60)%24);g=`Starts in: ${v>0?`${v}d ${w}h`:`${w}h`}`}else{const l=f.getTime()-p.getTime(),v=Math.floor(l/(1e3*60*60*24)),w=Math.floor(l/(1e3*60*60)%24);g=`Ends in: ${v>0?`${v}d ${w}h`:`${w}h`}`}let $="";const r=c.extraData||{};if(c.eventType==="pokemon-spotlight-hour"&&r.spotlight){const l=r.spotlight;$=`
            <div class="event-details-grid">
                <div class="event-section-card">
                    <h4>Featured Pokémon</h4>
                    <div class="spotlight-pokemon-container">
                        <div class="event-tile spotlight-pokemon-tile">
                            <img src="${l.image}" alt="${l.name}" style="width: 80px; height: 80px;">
                            <div class="event-tile-name" style="font-weight: 700; font-size: 0.95rem;">${l.name}</div>
                            ${l.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                        </div>
                    </div>
                </div>
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div class="spotlight-bonus-container">
                        <div class="event-bonus-row">
                            <span class="spotlight-bonus-icon">🎁</span>
                            <div class="event-bonus-text">${l.bonus||"No Extra Bonus"}</div>
                        </div>
                    </div>
                </div>
            </div>
        `}else if((c.eventType==="raid-battles"||c.eventType==="raid-hour"||c.eventType==="raid-day")&&r.raidbattles){const l=r.raidbattles,v=l.bosses||[],w=l.shinies||[];$=`
            <div class="event-details-grid">
                ${v.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${v.map(e=>`
                            <div class="event-tile">
                                <img src="${e.image}" alt="${e.name}">
                                <div class="event-tile-name">${e.name}</div>
                                ${e.canBeShiny?'<span class="shiny-indicator" title="Shiny Available">✨</span>':""}
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}

                ${w.length>0?`
                <div class="event-section-card">
                    <h4>Featured Shinies</h4>
                    <div class="event-grid-list">
                        ${w.map(e=>`
                            <div class="event-tile">
                                <img src="${e.image}" alt="${e.name}">
                                <div class="event-tile-name">${e.name}</div>
                                <span class="shiny-indicator">✨</span>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else if(c.eventType==="community-day"&&r.communityday){const l=r.communityday,v=l.spawns||[],w=l.bonuses||[],e=l.shinies||[],n=l.bonusDisclaimers||[],a=l.specialresearch||[];$=`
            <div class="event-details-grid">
                ${v.length>0||e.length>0?`
                <div class="event-section-card">
                    ${v.length>0?`
                    <h4>Featured Spawns</h4>
                    <div class="event-grid-list" style="margin-bottom: 20px;">
                        ${v.map(t=>`
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

                ${w.length>0?`
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div style="display:flex; flex-direction:row; flex-wrap:wrap; gap:10px;">
                        ${w.map(t=>`
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

                ${a.length>0?`
                <div class="event-section-card" style="grid-column: 1 / -1;">
                    <h4>Special Research Steps</h4>
                    <div class="research-timeline">
                        ${a.map(t=>`
                            <div class="research-step">
                                <div class="research-step-marker"></div>
                                <div class="research-step-title">${t.name}</div>
                                <div class="research-task-list">
                                    <div style="font-weight:700; margin-bottom:5px; color:#4a5568;">Tasks:</div>
                                    ${t.tasks.map(s=>`
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
                                        ${t.rewards.map(s=>`
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
        `}else{const l=r.generic?.hasSpawns,v=r.generic?.hasFieldResearchTasks;$=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div class="event-section-card" style="text-align:center; padding: 25px;">
                    <div style="font-size:1.1rem; font-weight:600; color:#4a5568; margin-bottom:15px;" class="generic-event-desc">
                        Standard Event details and timers are active. 
                    </div>
                    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                        <span class="event-status-pill">
                            ${l?"✅ Wild Spawns Active":"❌ No Special Spawns"}
                        </span>
                        <span class="event-status-pill">
                            ${v?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}y.innerHTML=`
        <button id="modal-close-btn">&times;</button>
        <div class="event-modal-hero" style="background-image: url('${c.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${c.heading}</span>
                <h2 class="event-modal-hero-title">${c.name}</h2>
                <div class="event-timer-large">📅 ${g}</div>
            </div>
        </div>
        <div style="padding: 0 5px 15px 5px;">
            ${$}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${c.link}" target="_blank" style="display:inline-block; background:var(--event-theme); color:#fff; text-decoration:none; padding:10px 20px; border-radius:8px; font-weight:700; font-size:0.9rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const x=document.getElementById("modal-close-btn");x&&(x.onclick=()=>{d.classList.add("hidden")}),d.classList.remove("hidden")}document.addEventListener("DOMContentLoaded",G);setInterval(G,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",u=>{const d=u.target,y=d.closest(".ranking-column");if(!y)return;const p=y.querySelector(".table-container");d.classList.contains("show-more-btn")&&(y.classList.add("expanded"),p&&p.classList.add("expanded")),d.classList.contains("show-less-btn")&&(y.classList.remove("expanded"),p&&p.classList.remove("expanded"))})});
