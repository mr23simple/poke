import"./loadHeader-csX3ypJB.js";/* empty css                     */document.addEventListener("DOMContentLoaded",async()=>{const l=document.getElementById("loading-overlay"),v=document.getElementById("rankings-grid"),c=document.getElementById("modal-backdrop"),y=document.getElementById("modal-content"),p={1:.094,1.5:.1351374318,2:.16639787,2.5:.192650919,3:.21573247,3.5:.2365726613,4:.25572005,4.5:.2735303812,5:.29024988,5.5:.3060573775,6:.3210876,6.5:.3354450362,7:.34921268,7.5:.3624577511,8:.3752356,8.5:.387592416,9:.39956728,9.5:.4111935514,10:.4225,10.5:.4329264091,11:.44310755,11.5:.4530599591,12:.4627984,12.5:.472336093,13:.48168495,13.5:.4908558003,14:.49985844,14.5:.508701765,15:.51739395,15.5:.5259425113,16:.5343543,16.5:.5426357375,17:.5507927,17.5:.5588305862,18:.5667545,18.5:.5745691333,19:.5822789,19.5:.5898879072,20:.5974,20.5:.6048236651,21:.6121573,21.5:.6194041216,22:.6265671,22.5:.6336491432,23:.64065295,23.5:.6475809666,24:.65443563,24.5:.6612192524,25:.667934,25.5:.6745818959,26:.6811649,26.5:.6876849038,27:.69414365,27.5:.70054287,28:.7068842,28.5:.7131691091,29:.7193991,29.5:.7255756136,30:.7317,30.5:.7377694897,31:.7437366,31.5:.749609799,32:.7553897,32.5:.761080073,33:.7666845,33.5:.772199568,34:.7776309,34.5:.782983635,35:.7882599,35.5:.793460966,36:.7985881,36.5:.803645071,37:.8086304,37.5:.813544863,38:.8183946,38.5:.823179625,39:.7846369743347168,39.5:.7874736085132754,40:.7903000116348267,40.5:.792803968023538,41:.7953000068664551,41.5:.7978038983716224,42:.8003000020980835,42.5:.8028038718775964,43:.8052999973297119,43.5:.8078038508470536,44:.8102999925613403,44.5:.812803835179168,45:.8152999877929688,45.5:.8178037928037928,46:.8203000020980835,46.5:.822803776019539,47:.82530000925064,47.5:.827803755931569,48:.830300023555755,48.5:.832803729034748,49:.835300018787384,49.5:.837803755931569,50:.840300023555755,50.5:.842803729034748,51:.845300018787384,51.5:.847803702398935,52:.850300014019012,52.5:.852803676019539,53:.85530000925064,53.5:.857803649892077,54:.860300004482269,54.5:.862803624012168,55:.865299999713897};function I(e){let n=null,a=1/0;for(const t in p){const s=Math.abs(p[t]-e);s<a&&(a=s,n=t)}return n}function k(e){const n=(a,t)=>{if(!t||!t.value||t.value<=1)return"";const s=t.text?`(${t.text})`:"";return`<li><span>${a} ${s}</span><span>1 in ${Math.round(t.value).toLocaleString()}</span></li>`};y.innerHTML=`
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
        `,c.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{c.classList.add("hidden"),document.body.classList.remove("modal-open")}}function g(e){const n=[];let a=!1,t=!1,s=!1;return e.isShiny&&e.isLucky&&e.isPerfect?(n.push('<span class="badge shlundo-badge">Shlundo</span>'),a=t=s=!0):e.isLucky&&e.isPerfect?(n.push('<span class="badge lundo-badge">Lundo</span>'),a=s=!0):e.isShiny&&e.isPerfect?(n.push('<span class="badge shundo-badge">Shundo</span>'),a=t=!0):e.isShiny&&e.isZeroIv&&(n.push('<span class="badge shnundo-badge">Shnundo</span>'),a=t=!0),!t&&e.isShiny&&n.push('<span class="badge shiny-badge">Shiny</span>'),!s&&e.isLucky?n.push('<span class="badge lucky-badge">Lucky</span>'):e.isTraded&&!e.isLucky&&n.push('<span class="badge traded-badge">Traded</span>'),a||(e.isPerfect?n.push('<span class="badge perfect-badge">Hundo</span>'):e.isZeroIv&&n.push('<span class="badge zero-iv-badge">Nundo</span>')),e.pokemonDisplay?.alignment===1&&n.push('<span class="badge shadow-badge">Shadow</span>'),e.pokemonDisplay?.alignment===2&&n.push('<span class="badge purified-badge">Purified</span>'),e.isLegendary&&n.push('<span class="badge legendary-badge">Legendary</span>'),e.isMythical&&n.push('<span class="badge mythical-badge">Mythical</span>'),n.join(" ")}function w(e){const n=e.iv.attack,a=e.iv.defense,t=e.iv.stamina,s=e.cpm,u=I(s);y.innerHTML=`
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
                        <div><span>Level</span><strong>${u}</strong></div>
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
        `,c.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{c.classList.add("hidden"),document.body.classList.remove("modal-open")},setTimeout(()=>{const S=document.getElementById("attack-bar");S.style.width=`${n/15*100}%`,S.style.backgroundColor=n===15?"#da7a79":"#f79513";const d=document.getElementById("defense-bar");d.style.width=`${a/15*100}%`,d.style.backgroundColor=a===15?"#da7a79":"#f79513";const m=document.getElementById("stamina-bar");m.style.width=`${t/15*100}%`,m.style.backgroundColor=t===15?"#da7a79":"#f79513"},100)}function r(e){return!e||e.length===0?"":`--pokemon-bg: ${e.length===1?e[0]:`linear-gradient(135deg, ${e[0]} 30%, ${e[1]} 70%)`};`}const f=localStorage.getItem("liteMode")==="enabled";async function D(e){y.innerHTML=`
            <button id="modal-close-btn">&times;</button>
            <div style="padding: 40px; text-align: center;">
                <div class="loading-spinner"></div>
                <p>Loading player profile...</p>
            </div>
        `,c.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{c.classList.add("hidden"),document.body.classList.remove("modal-open")};try{const n=await fetch(`/api/player-detail/${e}`);if(!n.ok)throw new Error("Could not fetch player details.");const a=await n.json();y.innerHTML=`
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
                    ${a.highlights.map(t=>`<div class="${`pokemon-card${t.typeColors.length>0?" colored":""}${f||!t.sprite?" no-image":""}`}" style="${r(t.typeColors)}">
                                    <img src="${t.sprite}" alt="${t.name}" loading="lazy">
                                    <p class="pokemon-name">
                                        ${f?`<span class="lite-name-span" style="${r(t.typeColors)}">${t.name}</span>`:t.name}
                                    </p>
                                    <p class="pokemon-cp">CP ${t.cp}</p>
                                </div>`).join("")}
                </div>
            `,document.getElementById("modal-close-btn").onclick=()=>c.classList.add("hidden")}catch(n){console.error("Failed to open player modal:",n),y.innerHTML=`
                <button id="modal-close-btn">&times;</button>
                <p style="padding: 20px; color: #e74c3c;">Error: ${n.message}</p>
            `,document.getElementById("modal-close-btn").onclick=()=>c.classList.add("hidden")}}function o(){y.innerHTML=`
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
        `,c.classList.remove("hidden"),document.body.classList.add("modal-open"),document.getElementById("modal-close-btn").onclick=()=>{c.classList.add("hidden"),document.body.classList.remove("modal-open")}}try{let e=function(){if(window.innerWidth>=1024)return;const i=document.querySelector(".header-content"),B=document.querySelector(".container"),L=(i?i.clientWidth:window.innerWidth)-40;document.querySelectorAll(".ranking-column, .composite-column, .events-card, .activity-card").forEach(T=>{T.style.width=`${L}px`})};var b=e;const n=await fetch("/api/rankings");if(!n.ok)throw new Error("Failed to load rankings from the server.");const a=await n.json(),s=await(await fetch("/api/check-auth-status")).json(),u=document.getElementById("main-title");s.loggedIn&&s.userId?(document.title=`Pokemon GO | #${s.userId}`,u&&(u.innerHTML=`Pokémon GO Player Dashboard | ${renderPlayerBadge({userId:s.userId,publicId:s.publicId})}`)):(document.title="Pokemon GO | Dashboard",u&&(u.textContent="Pokémon GO Player Dashboard"));const S=document.getElementById("recent-players-body");S.innerHTML=a.recentPlayers.map(i=>`
            <tr class="clickable-row" data-player-id="${i.publicId}">
                <td>${renderPlayerBadge(i)}</td>
                <td>
                    ${i.buddy?`
                        <img src="${i.buddy.sprite}" alt="${i.buddy.name}" title="${i.buddy.name}">
                        ${f?`<span class="pokemon-name-lite" style="${r(i.buddy.typeColors)}">${i.buddy.name}</span>`:""}
                    `:"N/A"}
                </td>
                <td class="hide-on-mobile">${i.kmWalked} km</td>
                <td class="hide-on-mobile">${i.pokemonCaught.toLocaleString()}</td>
            </tr>
        `).join("");const d=document.getElementById("strongest-pokemon-body"),m=a.strongestPokemon;d.innerHTML=m.map((i,B)=>`
            <tr class="clickable-pokemon-row" data-index="${B}">
                <td>${B+1}</td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${f?`<span class="pokemon-name-lite" style="${r(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td><strong>${i.cp.toLocaleString()}</strong></td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join("");const M=document.getElementById("rarest-pokemon-body"),x=a.rarestPokemon;M.innerHTML=x.map((i,B)=>`
            <tr class="clickable-rarity-row" data-index="${B}">
                <td><strong>${B+1}</strong></td>
                <td class="pokemon-cell">
                    <img src="${i.sprite}" alt="${i.name}">
                    ${f?`<span class="pokemon-name-lite" style="${r(i.typeColors)}">${i.name}</span>`:""}
                </td>
                <td class="badges-cell">
                    ${g(i)}
                </td>
                <td class="hide-on-mobile">${renderPlayerBadge({userId:i.userId,publicId:i.ownerPublicId})}</td>
            </tr>
        `).join(""),document.getElementById("rankings-grid").addEventListener("click",i=>{const B=i.target.closest(".clickable-row");if(B){const E=B.dataset.playerId;E&&D(E);return}const $=i.target.closest(".clickable-pokemon-row");if($){const E=$.dataset.index,T=m[E];T&&w(T);return}const L=i.target.closest(".clickable-rarity-row");if(L){const E=L.dataset.index,T=x[E];T&&k(T)}}),l.classList.add("hidden"),v.classList.remove("hidden");const j=document.querySelector(".info-btn");j&&j.addEventListener("click",i=>{i.stopPropagation(),o()}),window.addEventListener("resize",e),setTimeout(e,100),setTimeout(e,500)}catch(e){console.error("Failed to initialize public dashboard:",e),l.innerHTML="<p>Could not load ranking data. Please try again later.</p>",document.title="Pokemon GO | Dashboard"}c.addEventListener("click",e=>{e.target===c&&(c.classList.add("hidden"),document.body.classList.remove("modal-open"))})});let A=[],N=!1;function h(l){if(!l)return new Date;const v=l.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);return v?new Date(parseInt(v[1],10),parseInt(v[2],10)-1,parseInt(v[3],10),parseInt(v[4],10),parseInt(v[5],10),parseInt(v[6],10)):new Date(l)}async function G(){const l=document.getElementById("events-container"),v="https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json",c={"community-day":"#1660a9","raid-day":"#e74c3c","raid-battles":"#c0392b",event:"#27ae60","raid-hour":"#c0392b",research:"#1abc9c","timed-research":"#1abc9c","limited-research":"#159e83","live-event":"#d63031","pokemon-go-fest":"#153d94","research-breakthrough":"#795548","special-research":"#13a185","global-challenge":"#0a64b5","go-rocket-takeover":"#1e1e1e","team-go-rocket":"#1e1e1e","giovanni-special-research":"#1e272e","safari-zone":"#3d7141","ticketed-event":"#de3e9b","go-battle-league":"#8e44ad","pokemon-spotlight-hour":"#e58e26","bonus-hour":"#40407a",update:"#2980b9","raid-weekend":"#6f1e51","potential-ultra-unlock":"#2c3e50","location-specific":"#284b92",season:"#38ada9","elite-raids":"#a21416","pokemon-go-tour":"#1d3a74","pokestop-showcase":"#ff9f43",default:"#bdc3c7"};function y(p){const I=h(p).getTime()-new Date().getTime();if(I<=0)return null;const k=Math.floor(I/(1e3*60*60*24)),g=Math.floor(I/(1e3*60*60)%24),w=Math.floor(I/1e3/60%60);return k>0?`${k}d ${g}h`:g>0?`${g}h ${w}m`:`${w}m`}try{const p=await fetch(v);if(!p.ok)throw new Error("Failed to fetch events");A=await p.json();const I=new Date,k=[],g=[];if(A.forEach(t=>{const s=h(t.start),u=h(t.end);I>=s&&I<=u?k.push(t):I<s&&g.push(t)}),g.sort((t,s)=>h(t.start)-h(s.start)),k.sort((t,s)=>h(t.end)-h(s.end)),k.length===0&&g.length===0){l.innerHTML='<p class="no-events">No active or upcoming events found.</p>';return}let w=k,r=g;const f=5,D=k.length+g.length,o=D>f;!N&&o&&(k.length>=f?(w=k.slice(0,f),r=[]):(w=k,r=g.slice(0,f-k.length)));const b=(t,s)=>{const u=h(t.start),S=h(t.end),d=s?"Starts in":"Ends in",m=y(s?t.start:t.end),M=c[t.eventType]||c.default;return`
                <div class="event-item" data-event-id="${t.eventID}">
                    <div class="event-dot" style="background-color: ${M}"></div>
                    <div class="event-info">
                        <span class="event-name" title="${t.name}">${t.name}</span>
                        <span class="event-timer">${d} ${m}</span>
                    </div>
                </div>
            `};let e="";w.length>0&&(e+='<h3 class="events-section-header">Ongoing</h3>',e+=w.map(t=>b(t,!1)).join("")),r.length>0&&(e+='<h3 class="events-section-header">Upcoming</h3>',e+=r.map(t=>b(t,!0)).join("")),o&&(e+=`
                <button id="toggle-events-btn" class="btn btn-block btn-neutral mt-3">
                    ${N?"Show Less":`Show All (${D})`}
                </button>
            `),l.innerHTML=e,l.querySelectorAll(".event-item").forEach(t=>{t.addEventListener("click",()=>{const s=t.getAttribute("data-event-id"),u=A.find(S=>S.eventID===s);u&&q(u,c[u.eventType]||c.default)})});const n=document.getElementById("toggle-events-btn");n&&(n.onclick=()=>{N=!N,G()});const a=document.getElementById("expand-events-btn");a&&(a.onclick=()=>{U(c)})}catch(p){console.error("Error loading events:",p),l.innerHTML='<p class="error-message">Error loading events.</p>'}}function U(l){const v=document.getElementById("timeline-modal-backdrop"),c=document.getElementById("timeline-scroll-container"),y=document.getElementById("timeline-modal-close-btn"),p=document.getElementById("expand-events-btn");if(!v||!c||!y)return;const I=window.innerWidth<=768,k=I?110:160,g=I?70:100,w=()=>{v.close(),p&&p.setAttribute("aria-expanded","false")};y.onclick=w,v.onclick=d=>{d.target===v&&w()};const r=new Date;r.setHours(0,0,0,0);const f=A.filter(d=>h(d.end)>=r);let D=new Date(r);f.forEach(d=>{const m=h(d.end);m>D&&(D=m)});const o=1440*60*1e3,b=Math.ceil((D-r)/o),e=Math.min(Math.max(14,b),90),n=[];for(let d=0;d<e;d++){const m=new Date(r);m.setDate(r.getDate()+d),n.push(m)}const a=new Date(n[e-1]);a.setHours(23,59,59,999);const t={};f.forEach(d=>{const m=h(d.start);h(d.end)<r||m>a||(t[d.eventType]||(t[d.eventType]=[]),t[d.eventType].push(d))});let s=`<div class="timeline-grid" style="grid-template-columns: ${k}px repeat(${e}, ${g}px);">`;s+='<div class="timeline-header-row">',s+='<div class="timeline-label-header">Event Category</div>';const u=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];n.forEach((d,m)=>{s+=`
            <div class="${`timeline-date-cell${m===0?" today":""}`}">
                <div>${u[d.getDay()]}</div>
                <div>${d.getDate()}</div>
            </div>
        `}),s+="</div>";let S=2;Object.keys(t).forEach(d=>{const m=t[d],M=d.replace(/-/g," ");m.sort(($,L)=>h($.start)-h(L.start));const x=[],j=m.map($=>{const L=h($.start),E=h($.end),T=L.getFullYear()===E.getFullYear()&&L.getMonth()===E.getMonth()&&L.getDate()===E.getDate();let F=!1;if(T){const H=new Date(L);H.setHours(0,0,0,0);const V=new Date(L);V.setHours(23,59,59,999),F=m.some(z=>{if(z.eventID===$.eventID)return!1;const _=h(z.start);return h(z.end)>=H&&_<=V})}let R=L,O=E;T&&!F&&(R=new Date(L),R.setHours(0,0,0,0),O=new Date(E),O.setHours(23,59,59,999));let P=0;R>r&&(P=(R-r)/(1440*60*1e3));let C=e;O<a&&(C=(O-r)/(1440*60*1e3)),P<0&&(P=0),C>e&&(C=e),C<=P&&(C=P+1/24);let W=-1;for(let H=0;H<x.length;H++)if(P>=x[H]-.01){W=H;break}return W===-1?(x.push(C),W=x.length-1):x[W]=C,{event:$,startCol:P,endCol:C,track:W}}),B=16+Math.max(1,x.length)*34;s+='<div class="timeline-row">',s+=`<div class="timeline-row-label" style="height: ${B}px; grid-row: ${S};">${M}</div>`;for(let $=0;$<e;$++)s+=`<div class="${`timeline-grid-cell${$===0?" today-col":""}`}" style="height: ${B}px; grid-row: ${S};"></div>`;s+=`<div class="timeline-bar-wrapper" style="grid-column: 2 / span ${e}; grid-template-columns: repeat(${e}, ${g}px); height: ${B}px; grid-row: ${S};">`,j.forEach(({event:$,startCol:L,endCol:E,track:T})=>{const F=l[$.eventType]||l.default,R=L*g,O=(E-L)*g-6,P=10+T*34;s+=`
                <div class="timeline-bar" 
                     style="left: ${R+3}px; width: ${O}px; top: ${P}px; background-color: ${F};"
                     title="${$.name}"
                     data-event-id="${$.eventID}">
                    ${$.name}
                </div>
            `}),s+="</div>",s+="</div>",S++}),s+="</div>",c.innerHTML=s,c.querySelectorAll(".timeline-bar").forEach(d=>{d.addEventListener("click",m=>{m.stopPropagation();const M=d.getAttribute("data-event-id"),x=A.find(j=>j.eventID===M);x&&q(x,l[x.eventType]||l.default)})}),v.showModal(),p&&p.setAttribute("aria-expanded","true")}function q(l,v){const c=document.getElementById("modal-backdrop"),y=document.getElementById("modal-content");if(!c||!y)return;y.style.setProperty("--event-theme",v);const p=new Date,I=h(l.start),k=h(l.end);let g="";if(p<I){const o=I.getTime()-p.getTime(),b=Math.floor(o/(1e3*60*60*24)),e=Math.floor(o/(1e3*60*60)%24);g=`Starts in: ${b>0?`${b}d ${e}h`:`${e}h`}`}else{const o=k.getTime()-p.getTime(),b=Math.floor(o/(1e3*60*60*24)),e=Math.floor(o/(1e3*60*60)%24);g=`Ends in: ${b>0?`${b}d ${e}h`:`${e}h`}`}let w="";const r=l.extraData||{};if(l.eventType==="pokemon-spotlight-hour"&&r.spotlight){const o=r.spotlight;w=`
            <div class="event-details-grid">
                <div class="event-section-card">
                    <h4>Featured Pokémon</h4>
                    <div class="spotlight-pokemon-container">
                        <div class="event-tile spotlight-pokemon-tile">
                            <img src="${o.image}" alt="${o.name}" style="width: 80px; height: 80px;">
                            <div class="event-tile-name" style="font-weight: 700; font-size: 0.95rem;">${o.name}</div>
                            ${o.canBeShiny?'<span class="shiny-indicator">✨</span>':""}
                        </div>
                    </div>
                </div>
                <div class="event-section-card">
                    <h4>Event Bonuses</h4>
                    <div class="spotlight-bonus-container">
                        <div class="event-bonus-row">
                            <span class="spotlight-bonus-icon">🎁</span>
                            <div class="event-bonus-text">${o.bonus||"No Extra Bonus"}</div>
                        </div>
                    </div>
                </div>
            </div>
        `}else if((l.eventType==="raid-battles"||l.eventType==="raid-hour"||l.eventType==="raid-day")&&r.raidbattles){const o=r.raidbattles,b=o.bosses||[],e=o.shinies||[];w=`
            <div class="event-details-grid">
                ${b.length>0?`
                <div class="event-section-card">
                    <h4>Raid Bosses</h4>
                    <div class="event-grid-list">
                        ${b.map(n=>`
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
        `}else if(l.eventType==="community-day"&&r.communityday){const o=r.communityday,b=o.spawns||[],e=o.bonuses||[],n=o.shinies||[],a=o.bonusDisclaimers||[],t=o.specialresearch||[];w=`
            <div class="event-details-grid">
                ${b.length>0||n.length>0?`
                <div class="event-section-card">
                    ${b.length>0?`
                    <h4>Featured Spawns</h4>
                    <div class="event-grid-list" style="margin-bottom: 20px;">
                        ${b.map(s=>`
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
                    ${a.length>0?`
                    <div class="bonus-disclaimer" style="font-size:0.75rem; color:#718096; margin-top:12px; border-top:1px solid #edf2f7; padding-top:8px; line-height:1.4;">
                        ${a.map(s=>`<div style="margin-bottom: 4px;">${s}</div>`).join("")}
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
                                    ${s.tasks.map(u=>`
                                        <div class="research-task-item">
                                            <span>${u.text}</span>
                                            <span class="research-reward-pill">
                                                <img src="${u.reward.image}" alt="reward">
                                                <span>${u.reward.text}</span>
                                            </span>
                                        </div>
                                    `).join("")}
                                    <div style="font-weight:700; margin: 8px 0 5px 0; color:#4a5568;">Step Rewards:</div>
                                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                                        ${s.rewards.map(u=>`
                                            <span class="research-reward-pill">
                                                <img src="${u.image}" alt="reward">
                                                <span>${u.text}</span>
                                            </span>
                                        `).join("")}
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>`:""}
            </div>
        `}else{const o=r.generic?.hasSpawns,b=r.generic?.hasFieldResearchTasks;w=`
            <div class="event-details-grid" style="grid-template-columns: 1fr;">
                <div class="event-section-card" style="text-align:center; padding: 25px;">
                    <div style="font-size:1.1rem; font-weight:600; color:#4a5568; margin-bottom:15px;" class="generic-event-desc">
                        Standard Event details and timers are active. 
                    </div>
                    <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
                        <span class="event-status-pill">
                            ${o?"✅ Wild Spawns Active":"❌ No Special Spawns"}
                        </span>
                        <span class="event-status-pill">
                            ${b?"✅ Field Research Available":"❌ No Special Research Tasks"}
                        </span>
                    </div>
                </div>
            </div>
        `}y.innerHTML=`
        <form method="dialog">
            <button id="modal-close-btn" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30">✕</button>
        </form>
        <div class="event-modal-hero" style="background-image: url('${l.image||"https://cdn.leekduck.com/assets/img/events/default.jpg"}')">
            <div class="event-modal-hero-overlay"></div>
            <div class="event-modal-hero-content">
                <span class="event-modal-badge">${l.heading}</span>
                <h2 class="event-modal-hero-title">${l.name}</h2>
                <div class="event-timer-large">📅 ${g}</div>
            </div>
        </div>
        <div style="padding: 15px;">
            ${w}
            <div style="margin-top: 20px; text-align: right;">
                <a href="${l.link}" target="_blank" class="btn btn-primary">
                    View on Leek Duck ↗
                </a>
            </div>
        </div>
    `;const f=c,D=document.getElementById("modal-close-btn");D&&(D.onclick=o=>{o.preventDefault(),f.close()}),f.onclick=o=>{o.target===f&&f.close()},f.showModal()}document.addEventListener("DOMContentLoaded",G);setInterval(G,300*1e3);document.addEventListener("DOMContentLoaded",()=>{document.getElementById("rankings-grid").addEventListener("click",v=>{const c=v.target,y=c.closest(".ranking-column");if(!y)return;const p=y.querySelector(".table-container");c.classList.contains("show-more-btn")&&(y.classList.add("expanded"),p&&p.classList.add("expanded")),c.classList.contains("show-less-btn")&&(y.classList.remove("expanded"),p&&p.classList.remove("expanded"))})});
