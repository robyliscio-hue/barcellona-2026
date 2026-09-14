
(function(){
  /*
   V8
   METRO:
     - no OpenRailwayMap technical layer
     - no hand-made metro lines
     - route=subway relations from OSM/Overpass, coloured by line
     - all route stop nodes visible and labelled
   WALKING:
     - no hand-made walking polylines
     - route calculated by FOSSGIS OSRM foot profile over OSM streets/paths
  */

  const metroReal=L.layerGroup().addTo(map);
  const walkingReal=L.layerGroup().addTo(map);
  const liveFood=L.layerGroup().addTo(map);

  const METRO_COLORS={
    'L1':'#d71920',
    'L2':'#8f5ba6',
    'L3':'#2f9e44',
    'L4':'#f2cf00',
    'L5':'#2457a6',
    'L6':'#7a3f95',
    'L7':'#8b6f47',
    'L8':'#e88f20',
    'L9':'#ef8b22','L9N':'#ef8b22','L9S':'#ef8b22','L9 Nord':'#ef8b22','L9 Sud':'#ef8b22',
    'L10':'#4aa8b8','L10N':'#4aa8b8','L10S':'#4aa8b8',
    'L11':'#a8c832',
    'L12':'#b28a5a'
  };

  const USED_STATIONS=[
    'Aeroport T2','Zona Universitària','Zona Universitaria','Maria Cristina','Les Corts',
    'Sants Estació','Sants Estacio','Sagrada Família','Sagrada Familia','Monumental',
    'Clot','Glòries','Glories','Urquinaona','Jaume I','Arc de Triomf',
    'Barceloneta','Passeig de Gràcia','Passeig de Gracia','Collblanc'
  ];
  const usedKey=new Set(USED_STATIONS.map(x=>norm(x)));

  function norm(s){
    return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  }
  function lineRef(rel){
    const t=rel.tags||{};
    let r=String(t.ref||'').trim();
    if(!r && t.name){
      const m=String(t.name).match(/\bL\s*\d{1,2}[NS]?\b/i);
      if(m) r=m[0].replace(/\s+/g,'').toUpperCase();
    }
    return r;
  }
  function baseLine(r){
    if(/^L9/i.test(r)) return 'L9';
    if(/^L10/i.test(r)) return 'L10';
    return r;
  }
  function isMetroRef(r){
    return /^L(?:[1-9]|1[0-2])(?:N|S)?$/i.test(r) || /^L(?:9|10)\s+(?:Nord|Sud)$/i.test(r);
  }
  function colorFor(r){return METRO_COLORS[r]||METRO_COLORS[baseLine(r)]||'#555';}

  const status=L.control({position:'bottomleft'});
  status.onAdd=function(){
    const d=L.DomUtil.create('div','live-status');
    d.id='liveStatus';
    d.innerHTML='Caricamento metro e percorsi pedonali reali...';
    return d;
  };
  status.addTo(map);

  const OVERPASS='https://overpass-api.de/api/interpreter';
  function overpass(q){
    return fetch(OVERPASS,{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
      body:'data='+encodeURIComponent(q)
    }).then(r=>{if(!r.ok)throw new Error('Overpass '+r.status);return r.json();});
  }

  async function loadMetro(){
    // Route relations + their member nodes. We intentionally draw ONLY route=subway
    // geometry, not the entire railway infrastructure.
    const q=`[out:json][timeout:60];
      rel["route"="subway"](41.25,1.95,41.55,2.35)->.routes;
      (.routes; node(r.routes););
      out body geom;`;
    const data=await overpass(q);

    const nodes=new Map();
    data.elements.filter(e=>e.type==='node').forEach(n=>nodes.set(n.id,n));
    const rels=data.elements.filter(e=>e.type==='relation' && e.tags && e.tags.route==='subway');

    // collect line membership for stop nodes
    const stopLines=new Map();
    rels.forEach(rel=>{
      const ref=lineRef(rel);
      if(!isMetroRef(ref)) return;
      (rel.members||[]).forEach(m=>{
        if(m.type!=='node') return;
        const role=(m.role||'').toLowerCase();
        if(!/stop|platform/.test(role)) return;
        if(!stopLines.has(m.ref)) stopLines.set(m.ref,new Set());
        stopLines.get(m.ref).add(ref);
      });
    });

    // Draw each subway route relation in its actual line colour.
    // Duplicate inbound/outbound relations are harmless; low opacity avoids over-heavy lines.
    rels.forEach(rel=>{
      const ref=lineRef(rel);
      if(!isMetroRef(ref)) return;
      const col=colorFor(ref);
      (rel.members||[]).forEach(m=>{
        if(m.type!=='way' || !Array.isArray(m.geometry) || m.geometry.length<2) return;
        const coords=m.geometry.filter(g=>g.lat!=null&&g.lon!=null).map(g=>[g.lat,g.lon]);
        if(coords.length<2) return;
        L.polyline(coords,{
          color:col,weight:5,opacity:.78,lineCap:'round',lineJoin:'round',
          interactive:false
        }).addTo(metroReal);
      });
    });

    // Route stop nodes: every station encountered in all metro relations.
    const plotted=new Set();
    stopLines.forEach((lines,id)=>{
      const n=nodes.get(id);
      if(!n || n.lat==null || n.lon==null) return;
      const name=(n.tags&&(n.tags.name||n.tags['name:ca']||n.tags['name:es']))||'Fermata metro';
      const key=norm(name);
      const coordKey=key+'|'+n.lat.toFixed(4)+'|'+n.lon.toFixed(4);
      if(plotted.has(coordKey)) return;
      plotted.add(coordKey);

      const refs=[...lines].sort();
      const main=refs[0]||'';
      const used=usedKey.has(key);
      const badges=refs.map(r=>`<span class="line-badge" style="background:${colorFor(r)}">${r}</span>`).join('');
      const html=`<div class="metro-stop-v8 ${used?'used':''}">
        <span class="metro-symbol">M</span>
        <span class="metro-name">${used?'★ ':''}${name}</span>
        <span class="metro-lines">${badges}</span>
      </div>`;
      const icon=L.divIcon({className:'',html,iconSize:[used?190:160,32],iconAnchor:[14,16]});
      L.marker([n.lat,n.lon],{icon})
       .bindPopup(`<div class="amenity-popup"><b>🚇 ${name}</b><div class="small">${refs.join(' · ')}</div><div>${used?'Fermata prevista nel nostro itinerario.':'Fermata disponibile, non prevista nel piano.'}</div></div>`)
       .addTo(metroReal);
    });
  }

  const FOOT='https://routing.openstreetmap.de/routed-foot/route/v1/driving/';
  function routeFoot(points){
    const coords=points.map(p=>`${p[1]},${p[0]}`).join(';');
    return fetch(`${FOOT}${coords}?overview=full&geometries=geojson&steps=false`)
      .then(r=>{if(!r.ok)throw new Error('Foot router '+r.status);return r.json();})
      .then(j=>{
        if(j.code!=='Ok'||!j.routes||!j.routes.length)throw new Error('No route');
        return j.routes[0];
      });
  }

  async function loadWalkingForDay(day){
    walkingReal.clearLayers();
    const routes=day.walkRoutes||[];
    for(let i=0;i<routes.length;i++){
      const r=routes[i];
      try{
        const data=await routeFoot(r.points);
        const latlngs=data.geometry.coordinates.map(c=>[c[1],c[0]]);
        L.polyline(latlngs,{
          color:'#1976d2',weight:5,opacity:.82,dashArray:'8 7',
          lineCap:'round',lineJoin:'round'
        }).bindTooltip(`A piedi: ${r.name} · ${(data.distance/1000).toFixed(1)} km`)
          .addTo(walkingReal);
      }catch(e){
        // No invented fallback line: if routing fails we show only endpoint markers.
        r.points.forEach((p,idx)=>{
          if(idx===0||idx===r.points.length-1)
            L.circleMarker(p,{radius:3,color:'#1976d2',weight:2,fillOpacity:0})
             .bindTooltip(`Percorso pedonale da caricare: ${r.name}`).addTo(walkingReal);
        });
      }
      // Public server policy: do not hammer it.
      await new Promise(res=>setTimeout(res,1050));
    }
  }

  async function loadFood(){
    const q=`[out:json][timeout:35];
      nwr["amenity"="fast_food"](41.30,2.07,41.415,2.215);
      out center tags;`;
    const data=await overpass(q);
    data.elements.forEach(el=>{
      const tg=el.tags||{}; if(!tg.name)return;
      const c=el.lat!=null?[el.lat,el.lon]:(el.center?[el.center.lat,el.center.lon]:null);
      if(!c)return;
      const addr=[tg['addr:street'],tg['addr:housenumber']].filter(Boolean).join(' ');
      const dest=encodeURIComponent(addr?`${tg.name}, ${addr}, Barcelona`:`${tg.name}, Barcelona`);
      const ic=L.divIcon({className:'',html:'<div class="amenity-marker fastfood">🍔</div>',iconSize:[38,38],iconAnchor:[19,19]});
      L.marker(c,{icon:ic}).bindTooltip(tg.name,{direction:'top'})
       .bindPopup(`<div class="amenity-popup"><b>🍔 ${tg.name}</b><div class="small">Fast food reale da OpenStreetMap</div>${addr?`<div>${addr}</div>`:''}<a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${dest}">🧭 Portami qui</a></div>`)
       .addTo(liveFood);
    });
  }

  // Disable/remove old schematic layers completely.
  if(map.hasLayer(metroLayer)) map.removeLayer(metroLayer);
  if(map.hasLayer(walkLayer)) map.removeLayer(walkLayer);

  const oldMetro=document.getElementById('toggleMetro');
  if(oldMetro){oldMetro.checked=false;oldMetro.disabled=true;const l=oldMetro.closest('label');if(l)l.style.display='none';}
  const oldWalk=document.getElementById('toggleWalk');
  if(oldWalk){oldWalk.checked=false;oldWalk.disabled=true;const l=oldWalk.closest('label');if(l)l.style.display='none';}

  // Re-purpose visible toggles.
  const realMetroToggle=document.getElementById('toggleRealMetro');
  if(realMetroToggle){
    const lab=realMetroToggle.closest('label');
    if(lab) lab.lastChild.textContent=' Metro reale + fermate';
    realMetroToggle.onchange=e=>e.target.checked?metroReal.addTo(map):map.removeLayer(metroReal);
  }
  const foodToggle=document.getElementById('toggleLiveFood');
  if(foodToggle) foodToggle.onchange=e=>e.target.checked?liveFood.addTo(map):map.removeLayer(liveFood);

  // Add a proper walking toggle next to existing controls.
  const controls=document.querySelector('.map-toggles');
  if(controls && !document.getElementById('toggleWalkingReal')){
    const lab=document.createElement('label');
    lab.innerHTML='<input type="checkbox" id="toggleWalkingReal" checked> Percorsi a piedi reali';
    controls.insertBefore(lab,controls.firstChild);
    lab.querySelector('input').onchange=e=>e.target.checked?walkingReal.addTo(map):map.removeLayer(walkingReal);
  }

  function currentDay(){
    if(typeof currentDayId!=='undefined') return TRIP_DATA.days.find(d=>d.id===currentDayId)||TRIP_DATA.days[0];
    const active=document.querySelector('.day-tab.active');
    return TRIP_DATA.days.find(d=>d.id===(active&&active.dataset.day))||TRIP_DATA.days[0];
  }

  // Patch day selection: app.js renderDay is global in this site.
  const originalRender=window.renderDay;
  if(typeof originalRender==='function'){
    window.renderDay=function(dayId){
      originalRender(dayId);
      if(map.hasLayer(walkingReal)) loadWalkingForDay(TRIP_DATA.days.find(d=>d.id===dayId));
    };
  }

  Promise.allSettled([loadMetro(),loadFood()]).then(results=>{
    const m=results[0].status==='fulfilled', f=results[1].status==='fulfilled';
    const el=document.getElementById('liveStatus');
    el.innerHTML=m?'✓ Metro tematizzata reale caricata'+(f?' · fast food caricati':''):'⚠ Metro live non disponibile';
  });

  // walking for initial day
  loadWalkingForDay(currentDay());
})();
