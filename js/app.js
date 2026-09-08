
const map = L.map('map', { zoomControl: true }).setView([41.3875, 2.1580], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = new Map();

function markerIcon(stop){
  const cls = stop.type === 'hotel' ? 'number-marker hotel-marker' : 'number-marker';
  return L.divIcon({
    className: '',
    html: `<div class="${cls}">${stop.id}</div>`,
    iconSize: [34,34],
    iconAnchor: [17,17]
  });
}

TAPPE.forEach(stop => {
  const marker = L.marker([stop.lat, stop.lng], {icon: markerIcon(stop)}).addTo(map);
  marker.bindTooltip(`${stop.id}. ${stop.name}`, {direction:'top', offset:[0,-14]});
  marker.on('click', () => openStop(stop.id));
  markers.set(stop.id, marker);
});

const group = L.featureGroup([...markers.values()]);
map.fitBounds(group.getBounds().pad(0.12));

function gmapsUrl(stop){
  return `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`;
}

function openStop(id){
  const stop = TAPPE.find(x => x.id === id);
  if(!stop) return;

  const audioHtml = stop.audio
    ? `<div class="audio-box">
         <div class="audio-label">🎧 AUDIOGUIDA</div>
         <audio controls preload="metadata">
           <source src="${stop.audio}" type="audio/mpeg">
           Il browser non supporta l'audio HTML5.
         </audio>
         <div class="audio-missing">Se il file non è ancora presente, il player non partirà: basta poi copiare l'MP3 nel percorso indicato.</div>
       </div>`
    : `<div class="audio-box"><div class="audio-label">🎧 AUDIOGUIDA</div><div class="audio-missing">Nessuna audioguida prevista per questo punto.</div></div>`;

  document.getElementById('sheetContent').innerHTML = `
    <div class="hero">
      <img src="${stop.image}" alt="${stop.name}" onerror="this.remove(); this.parentElement.textContent='FOTO PREDISPOSTA · ${stop.name}'">
    </div>
    <div class="sheet-body">
      <div class="kicker">TAPPA ${stop.id} · ${stop.time}</div>
      <div class="sheet-title">${stop.name}</div>
      <div class="sheet-text">${stop.description}</div>
      ${audioHtml}
      <div class="actions">
        <a class="btn primary" target="_blank" rel="noopener" href="${gmapsUrl(stop)}">🧭 Portami qui</a>
        <button class="btn secondary" onclick="focusStop(${stop.id})">📍 Mostra in mappa</button>
      </div>
      <div class="tip"><strong>Nota:</strong> ${stop.tip}</div>
    </div>`;

  document.getElementById('sheetBackdrop').hidden = false;
  document.getElementById('detailSheet').classList.add('open');
  document.getElementById('detailSheet').setAttribute('aria-hidden','false');
}

function closeSheet(){
  document.getElementById('sheetBackdrop').hidden = true;
  document.getElementById('detailSheet').classList.remove('open');
  document.getElementById('detailSheet').setAttribute('aria-hidden','true');
}

function focusStop(id){
  const stop = TAPPE.find(x => x.id === id);
  closeSheet();
  switchView('mapView');
  setTimeout(() => {
    map.invalidateSize();
    map.setView([stop.lat, stop.lng], 17);
    markers.get(id).openTooltip();
  }, 100);
}

document.getElementById('closeSheet').addEventListener('click', closeSheet);
document.getElementById('sheetBackdrop').addEventListener('click', closeSheet);

function switchView(viewId){
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === viewId));
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === viewId));
  if(viewId === 'mapView') setTimeout(() => map.invalidateSize(), 50);
}
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => switchView(t.dataset.view)));

const list = document.getElementById('stopList');
TAPPE.forEach(stop => {
  const div = document.createElement('div');
  div.className = 'stop-card';
  div.innerHTML = `
    <div class="stop-num">${stop.id}</div>
    <div>
      <div class="stop-title">${stop.name}</div>
      <div class="stop-meta">${stop.time} · ${stop.short}</div>
    </div>
    <button class="stop-open">Apri</button>`;
  div.querySelector('.stop-open').addEventListener('click', () => openStop(stop.id));
  list.appendChild(div);
});

let userMarker = null;
document.getElementById('locateBtn').addEventListener('click', () => {
  if(!navigator.geolocation){
    alert("Geolocalizzazione non supportata da questo browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      const p = [pos.coords.latitude, pos.coords.longitude];
      if(userMarker) map.removeLayer(userMarker);
      userMarker = L.circleMarker(p, {
        radius: 9, weight: 3, color: '#fff', fillColor: '#2f7df6', fillOpacity: 1
      }).addTo(map).bindTooltip("Sei qui").openTooltip();
      switchView('mapView');
      map.setView(p, 16);
    },
    () => alert("Non riesco a leggere la posizione. Su smartphone concedi al sito il permesso di localizzazione."),
    {enableHighAccuracy:true, timeout:10000}
  );
});

if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
