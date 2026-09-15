let currentDay=TRIP_DATA.days[0],currentOpen=null,userMarker=null;
const map=L.map('map',{zoomControl:true}).setView([41.387,2.17],13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
let walkLayer=L.layerGroup().addTo(map),metroLayer=L.layerGroup().addTo(map),stopsLayer=L.layerGroup().addTo(map),
foodLayer=L.layerGroup().addTo(map),wcLayer=L.layerGroup().addTo(map);
const markerMap=new Map();

function setView(viewId){
 document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===viewId));
 document.querySelectorAll('.view-tab').forEach(b=>b.classList.toggle('active',b.dataset.view===viewId));
 if(viewId==='mapView')setTimeout(()=>map.invalidateSize(),50);
}
document.querySelectorAll('.view-tab').forEach(b=>b.onclick=()=>setView(b.dataset.view));

function iconFor(s){
 if(s.n){const v=localStorage.getItem('visited-'+s.id)==='1';return L.divIcon({className:'',html:`<div class="number-marker ${v?'visited':''}">${s.n}</div>`,iconSize:[34,34],iconAnchor:[17,17]});}
 return L.divIcon({className:'',html:`<div class="symbol-marker ${s.kind||''}">${s.icon||'•'}</div>`,iconSize:[34,34],iconAnchor:[17,17]});
}
function renderDay(day){
 currentDay=day;currentOpen=null;
 document.getElementById('dayTitle').textContent=day.title;
 document.getElementById('daySubtitle').textContent=day.subtitle;
 document.querySelectorAll('.day-tab').forEach(b=>b.classList.toggle('active',b.dataset.day===day.id));
 walkLayer.clearLayers();metroLayer.clearLayers();stopsLayer.clearLayers();foodLayer.clearLayers();wcLayer.clearLayers();markerMap.clear();

 day.metro.forEach(x=>L.polyline(x.coords,{color:x.color,weight:7,opacity:.72,lineCap:'round'}).bindTooltip(x.name,{sticky:true}).addTo(metroLayer));
 day.walk.forEach(x=>L.polyline(x,{color:'#2d67b1',weight:4,opacity:.82,dashArray:'8,8',lineCap:'round'}).addTo(walkLayer));

 day.stops.forEach(s=>{
   const m=L.marker([s.lat,s.lng],{icon:iconFor(s)}).addTo(stopsLayer);
   m.bindTooltip(s.name,{direction:'top',offset:[0,-14]});m.on('click',()=>openStop(s));markerMap.set(s.id,m);
 });
 (day.amenities||[]).forEach(a=>{
   if(a.id==='s-rincon' || a.id==='s-donsand') return; // V9: geolocalizzati live in live-map.js
   const emoji=a.type==='wc'?'🚻':(a.type==='fastfood'?'🍔':'🍴');
   const ic=L.divIcon({className:'',html:`<div class="amenity-marker ${a.type}">${emoji}</div>`,iconSize:[34,34],iconAnchor:[17,17]});
   const dest=encodeURIComponent(a.address||a.name);
   const pop=`<div class="amenity-popup"><b>${emoji} ${a.name}</b><div class="small">${a.when||''}</div><div>${a.note||''}</div><a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${dest}">🧭 Portami qui</a></div>`;
   L.marker([a.lat,a.lng],{icon:ic}).bindPopup(pop).bindTooltip(a.name,{direction:'top'}).addTo(a.type==='wc'?wcLayer:foodLayer);
 });

 const pts=day.stops.map(s=>[s.lat,s.lng]);
 if(pts.length)map.fitBounds(L.latLngBounds(pts).pad(.09));
 buildStopList();
}
function buildDayTabs(){
 const el=document.getElementById('dayTabs');
 TRIP_DATA.days.forEach(d=>{const b=document.createElement('button');b.className='day-tab';b.dataset.day=d.id;b.textContent=d.label;b.onclick=()=>renderDay(d);el.appendChild(b)});
}
function buildStopList(){
 const el=document.getElementById('stopList');el.innerHTML='';
 currentDay.stops.forEach(s=>{
   const v=s.n&&localStorage.getItem('visited-'+s.id)==='1';
   const card=document.createElement('div');card.className='stop-card';
   card.innerHTML=`<div class="stop-num ${s.n?'':'symbol'} ${v?'visited':''}">${s.n||s.icon||'•'}</div><div><div class="stop-title">${s.name}</div><div class="stop-meta">${s.time||''}</div>${s.cost?`<span class="badge">${s.cost}</span>`:''}</div><button class="stop-open">Apri</button>`;
   card.querySelector('.stop-open').onclick=()=>openStop(s);el.appendChild(card);
 });
}
function buildExtras(){
 const el=document.getElementById('extraList');el.innerHTML='';
 TRIP_DATA.extras.forEach((x,i)=>{
   const card=document.createElement('div');card.className='stop-card';
   card.innerHTML=`<div class="stop-num symbol">🎧</div><div><div class="stop-title">${x.name}</div><div class="stop-meta">${(AUDIO_LIBRARY[x.audios]||[]).length} tracce</div></div><button class="stop-open">Apri</button>`;
   card.querySelector('.stop-open').onclick=()=>openExtra(x,i);el.appendChild(card);
 });
}
function trackKey(itemId,i){return `listened-${itemId}-${i}`}
function playlistHtml(itemId,audios){
 if(!audios||!audios.length)return `<div class="audio-box"><div class="audio-label">🎧 AUDIOGUIDA</div><div class="stop-meta">Nessuna audioguida associata a questa tappa.</div></div>`;
 return `<div class="audio-box"><div class="audio-label">🎧 AUDIOGUIDA · ${audios.length} ${audios.length===1?'TRACCIA':'TRACCE'}</div><div class="playlist">${audios.map((a,i)=>{const l=localStorage.getItem(trackKey(itemId,i))==='1';return `<button class="track-row ${l?'listened':''}" onclick="selectTrack('${itemId}',${i})"><span class="track-play">▶</span><span class="track-title">${a.title}</span><span class="track-state">${l?'✓':''}</span></button>`}).join('')}</div><div id="activeTrackBox" class="active-track" hidden><div id="activeTrackTitle" class="active-track-title"></div><audio id="mainAudioPlayer" controls preload="metadata"></audio></div></div>`;
}
function openStop(s){
 const audios=s.audios?AUDIO_LIBRARY[s.audios]:[];
 currentOpen={id:s.id,audios,stop:s};
 const visited=s.n&&localStorage.getItem('visited-'+s.id)==='1';
 document.getElementById('sheetContent').innerHTML=`<div class="hero">FOTO PREDISPOSTA · ${s.name}</div><div class="sheet-body"><div class="kicker">${s.n?'TAPPA '+s.n:'LOGISTICA'} · ${s.time||''}</div><div class="sheet-title">${s.name}</div><div class="sheet-text">${s.description||''}</div>${s.transit?`<div class="transit-box"><strong>🚇 Indicazione</strong><br>${s.transit}</div>`:''}${s.cost?`<div class="transit-box"><strong>Accesso:</strong> ${s.cost}</div>`:''}${playlistHtml(s.id,audios)}<div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}">🧭 Portami qui</a><button class="btn secondary" onclick="focusStop('${s.id}')">📍 Mostra in mappa</button>${s.n?`<button class="btn visited" onclick="toggleVisited('${s.id}')">${visited?'✓ Visitato':'○ Segna come visitato'}</button>`:''}</div></div>`;
 showSheet();if(audios.length===1)setTimeout(()=>selectTrack(s.id,0),0);
}
function openExtra(x,i){
 const audios=AUDIO_LIBRARY[x.audios]||[],id='extra-'+i;currentOpen={id,audios,extra:x};
 document.getElementById('sheetContent').innerHTML=`<div class="hero">AUDIO EXTRA</div><div class="sheet-body"><div class="kicker">NON NEL PIANO DEFINITIVO</div><div class="sheet-title">${x.name}</div>${playlistHtml(id,audios)}</div>`;
 showSheet();if(audios.length===1)setTimeout(()=>selectTrack(id,0),0);
}
function showSheet(){document.getElementById('sheetBackdrop').hidden=false;document.getElementById('detailSheet').classList.add('open')}
function closeSheet(){document.getElementById('sheetBackdrop').hidden=true;document.getElementById('detailSheet').classList.remove('open')}
document.getElementById('closeSheet').onclick=closeSheet;document.getElementById('sheetBackdrop').onclick=closeSheet;
function selectTrack(id,i){
 if(!currentOpen||currentOpen.id!==id)return;const a=currentOpen.audios[i],box=document.getElementById('activeTrackBox'),title=document.getElementById('activeTrackTitle'),p=document.getElementById('mainAudioPlayer');
 box.hidden=false;title.textContent=a.title;p.src=encodeURI(a.file);p.onended=()=>{localStorage.setItem(trackKey(id,i),'1'); if(currentOpen.stop)openStop(currentOpen.stop);else openExtra(currentOpen.extra,parseInt(id.replace('extra-','')));};p.play().catch(()=>{});
}
function toggleVisited(id){const k='visited-'+id;localStorage.setItem(k,localStorage.getItem(k)==='1'?'0':'1');const s=currentDay.stops.find(x=>x.id===id);markerMap.get(id).setIcon(iconFor(s));buildStopList();openStop(s)}
function focusStop(id){const s=currentDay.stops.find(x=>x.id===id);closeSheet();setView('mapView');setTimeout(()=>{map.invalidateSize();map.setView([s.lat,s.lng],16);markerMap.get(id).openTooltip()},80)}
document.getElementById('toggleWalk').onchange=e=>e.target.checked?walkLayer.addTo(map):map.removeLayer(walkLayer);
document.getElementById('toggleMetro').onchange=e=>e.target.checked?metroLayer.addTo(map):map.removeLayer(metroLayer);
document.getElementById('toggleStops').onchange=e=>e.target.checked?stopsLayer.addTo(map):map.removeLayer(stopsLayer);
document.getElementById('toggleFood').onchange=e=>e.target.checked?foodLayer.addTo(map):map.removeLayer(foodLayer);
document.getElementById('toggleWc').onchange=e=>e.target.checked?wcLayer.addTo(map):map.removeLayer(wcLayer);
document.getElementById('locateBtn').onclick=()=>{if(!navigator.geolocation){alert('Geolocalizzazione non supportata.');return}navigator.geolocation.getCurrentPosition(p=>{const q=[p.coords.latitude,p.coords.longitude];if(userMarker)map.removeLayer(userMarker);userMarker=L.circleMarker(q,{radius:9,weight:3,color:'#fff',fillColor:'#2f7df6',fillOpacity:1}).addTo(map).bindTooltip('Sei qui').openTooltip();setView('mapView');map.setView(q,16)},()=>alert('Concedi al sito il permesso di localizzazione.'),{enableHighAccuracy:true,timeout:10000})};
buildDayTabs();buildExtras();renderDay(TRIP_DATA.days[0]);
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
