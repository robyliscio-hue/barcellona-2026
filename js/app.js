const map=L.map('map').setView([41.385,2.155],13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);

const routeLayer=L.layerGroup().addTo(map),metroLayer=L.layerGroup().addTo(map),stopsLayer=L.layerGroup().addTo(map),markers=new Map();
const pointKey=(type,id)=>`${type}:${id}`;

function iconFor(item,isTourStop=false){
 if(isTourStop){const v=localStorage.getItem(`visited-${item.id}`)==='1';return L.divIcon({className:'',html:`<div class="number-marker ${v?'visited':''}">${item.id}</div>`,iconSize:[34,34],iconAnchor:[17,17]});}
 return L.divIcon({className:'',html:`<div class="symbol-marker ${item.type||''}">${item.symbol}</div>`,iconSize:[34,34],iconAnchor:[17,17]});
}
function addMarker(item,isTourStop=false){const m=L.marker([item.lat,item.lng],{icon:iconFor(item,isTourStop)}).addTo(stopsLayer);m.bindTooltip(item.name,{direction:'top',offset:[0,-14]});m.on('click',()=>openItem(item,isTourStop));markers.set(pointKey(isTourStop?'stop':'arrival',item.id),m);}
ARRIVAL.forEach(x=>addMarker(x,false));TAPPE.forEach(x=>addMarker(x,true));

METRO_SEGMENTS.forEach(s=>L.polyline(s.coords,{color:s.color,weight:7,opacity:.72,lineCap:'round'}).bindTooltip(s.name,{sticky:true}).addTo(metroLayer));
WALK_SEGMENTS.forEach(c=>L.polyline(c,{color:'#2d67b1',weight:4,opacity:.8,dashArray:'8,8',lineCap:'round'}).addTo(routeLayer));
map.fitBounds(L.latLngBounds([...ARRIVAL.map(x=>[x.lat,x.lng]),...TAPPE.map(x=>[x.lat,x.lng])]).pad(.08));

const gmapsUrl=i=>`https://www.google.com/maps/dir/?api=1&destination=${i.lat},${i.lng}`;

function openItem(item,isTourStop){
 const visited=isTourStop&&localStorage.getItem(`visited-${item.id}`)==='1';
 const audio=item.audio?`<div class="audio-box"><div class="audio-label">🎧 AUDIOGUIDA</div><audio controls preload="metadata"><source src="${item.audio}" type="audio/mpeg"></audio><div class="audio-missing">Se il file non è ancora presente, basta caricare l'MP3 nella cartella audio.</div></div>`:`<div class="audio-box"><div class="audio-label">🎧 AUDIOGUIDA</div><div class="audio-missing">Nessuna audioguida prevista per questo punto.</div></div>`;
 const transit=item.transit?`<div class="transit-box"><strong>🚇 Indicazione</strong><br>${item.transit}</div>`:'';
 document.getElementById('sheetContent').innerHTML=`<div class="hero"><img src="${item.image}" alt="${item.name}" onerror="this.remove();this.parentElement.textContent='FOTO PREDISPOSTA · ${item.name}'"></div><div class="sheet-body"><div class="kicker">${isTourStop?'TAPPA '+item.id:'TRASFERIMENTO'} · ${item.time}</div><div class="sheet-title">${item.name}</div><div class="sheet-text">${item.description}</div>${transit}${audio}<div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${gmapsUrl(item)}">🧭 Portami qui</a><button class="btn secondary" onclick="focusItem('${isTourStop?'stop':'arrival'}','${item.id}')">📍 Mostra in mappa</button>${isTourStop?`<button class="btn visited" onclick="toggleVisited(${item.id})">${visited?'✓ Visitato':'○ Segna come visitato'}</button>`:''}</div>${item.tip?`<div class="tip"><strong>Nota:</strong> ${item.tip}</div>`:''}</div>`;
 document.getElementById('sheetBackdrop').hidden=false;document.getElementById('detailSheet').classList.add('open');
}
function closeSheet(){document.getElementById('sheetBackdrop').hidden=true;document.getElementById('detailSheet').classList.remove('open');}
function focusItem(type,id){const arr=type==='stop'?TAPPE:ARRIVAL,item=arr.find(x=>String(x.id)===String(id));closeSheet();switchView('mapView');setTimeout(()=>{map.invalidateSize();map.setView([item.lat,item.lng],16);markers.get(pointKey(type,id)).openTooltip();},100);}
function toggleVisited(id){const k=`visited-${id}`,now=localStorage.getItem(k)==='1';localStorage.setItem(k,now?'0':'1');const item=TAPPE.find(x=>x.id===id);markers.get(pointKey('stop',id)).setIcon(iconFor(item,true));buildLists();openItem(item,true);}

document.getElementById('closeSheet').onclick=closeSheet;document.getElementById('sheetBackdrop').onclick=closeSheet;
function switchView(id){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.view===id));if(id==='mapView')setTimeout(()=>map.invalidateSize(),50);}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>switchView(t.dataset.view));

function card(item,isTour){const v=isTour&&localStorage.getItem(`visited-${item.id}`)==='1',icon=isTour?item.id:item.symbol;return `<div class="stop-card"><div class="stop-num ${isTour?'':'symbol'} ${v?'visited':''}">${icon}</div><div><div class="stop-title">${item.name}</div><div class="stop-meta">${item.time} · ${item.short}</div></div><button class="stop-open">Apri</button></div>`;}
function buildLists(){const a=document.getElementById('arrivalList'),s=document.getElementById('stopList');a.innerHTML='';s.innerHTML='';ARRIVAL.forEach(i=>{const w=document.createElement('div');w.innerHTML=card(i,false);const c=w.firstElementChild;c.querySelector('.stop-open').onclick=()=>openItem(i,false);a.appendChild(c)});TAPPE.forEach(i=>{const w=document.createElement('div');w.innerHTML=card(i,true);const c=w.firstElementChild;c.querySelector('.stop-open').onclick=()=>openItem(i,true);s.appendChild(c)});}
buildLists();

document.getElementById('toggleRoute').onchange=e=>e.target.checked?routeLayer.addTo(map):map.removeLayer(routeLayer);
document.getElementById('toggleMetro').onchange=e=>e.target.checked?metroLayer.addTo(map):map.removeLayer(metroLayer);
document.getElementById('toggleStops').onchange=e=>e.target.checked?stopsLayer.addTo(map):map.removeLayer(stopsLayer);

let userMarker=null;document.getElementById('locateBtn').onclick=()=>{if(!navigator.geolocation){alert('Geolocalizzazione non supportata.');return;}navigator.geolocation.getCurrentPosition(p=>{const q=[p.coords.latitude,p.coords.longitude];if(userMarker)map.removeLayer(userMarker);userMarker=L.circleMarker(q,{radius:9,weight:3,color:'#fff',fillColor:'#2f7df6',fillOpacity:1}).addTo(map).bindTooltip('Sei qui').openTooltip();switchView('mapView');map.setView(q,16);},()=>alert('Concedi al sito il permesso di localizzazione.'),{enableHighAccuracy:true,timeout:10000});};

if('serviceWorker' in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));