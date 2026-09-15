
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
  const plannedFoodReal=L.layerGroup().addTo(map);

  // POI pianificati: niente coordinate stimate.
  // Vengono risolti live su OSM per nome/indirizzo e gli stessi punti
  // vengono poi usati sia per i marker sia per il routing pedonale.
  const PLANNED_POIS={
    's-rincon':{
      name:'EL RINCÓN TAPAS &BAR',
      street:'Travessera de les Corts', house:'136',
      label:'PRANZO SABATO - prima scelta', type:'restaurant'
    },
    's-donsand':{
      name:'Don Sandwich Cafeteria',
      street:'Carrer de Fígols', house:'38',
      label:'PRANZO SABATO - backup', type:'restaurant'
    }
  };
  const resolvedPOI={};

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

  function elementCenter(el){
    if(el.lat!=null && el.lon!=null) return [el.lat,el.lon];
    if(el.center && el.center.lat!=null) return [el.center.lat,el.center.lon];
    if(Array.isArray(el.geometry) && el.geometry.length){
      const pts=el.geometry.filter(g=>g.lat!=null&&g.lon!=null);
      if(pts.length){
        const lat=pts.reduce((a,g)=>a+g.lat,0)/pts.length;
        const lon=pts.reduce((a,g)=>a+g.lon,0)/pts.length;
        return [lat,lon];
      }
    }
    return null;
  }

  async function resolvePlannedPOI(id,def){
    // Preferisce il locale nominato; fallback all'indirizzo civico reale OSM.
    const q=`[out:json][timeout:30];
      (
        nwr["name"="${def.name.replaceAll('"','\\\\"')}"](41.36,2.09,41.40,2.15);
        nwr["addr:street"="${def.street.replaceAll('"','\\\\"')}"]["addr:housenumber"="${def.house}"](41.36,2.09,41.40,2.15);
      );
      out center tags geom;`;
    const data=await overpass(q);
    if(!data.elements || !data.elements.length) throw new Error('POI non trovato: '+def.name);

    const exactName=data.elements.find(e=>norm((e.tags||{}).name)===norm(def.name));
    const exactAddr=data.elements.find(e=>{
      const t=e.tags||{};
      return norm(t['addr:street'])===norm(def.street) && String(t['addr:housenumber']||'').trim()===def.house;
    });
    const chosen=exactName || exactAddr || data.elements[0];
    const c=elementCenter(chosen);
    if(!c) throw new Error('POI senza coordinate: '+def.name);

    resolvedPOI[id]=c;
    return {coord:c,tags:chosen.tags||{}};
  }

  async function loadPlannedFoodReal(){
    plannedFoodReal.clearLayers();
    for(const [id,def] of Object.entries(PLANNED_POIS)){
      try{
        const r=await resolvePlannedPOI(id,def);
        const c=r.coord;
        const t=r.tags||{};
        const addr=[t['addr:street']||def.street,t['addr:housenumber']||def.house].filter(Boolean).join(' ');
        const icon=L.divIcon({
          className:'',
          html:'<div class="amenity-marker restaurant planned-real">🍴</div>',
          iconSize:[42,42],iconAnchor:[21,21]
        });
        L.marker(c,{icon})
          .bindTooltip(`${def.label}: ${def.name}`,{direction:'top'})
          .bindPopup(`<div class="amenity-popup">
            <b>🍴 ${def.name}</b>
            <div class="small">${def.label}</div>
            <div>${addr}, Barcelona</div>
            <div><b>Posizione:</b> ricavata live dal POI/numero civico OpenStreetMap</div>
            <a target="_blank" rel="noopener"
               href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(def.name+', '+addr+', Barcelona')}">🧭 Portami qui</a>
          </div>`)
          .addTo(plannedFoodReal);
      }catch(e){
        console.warn(e);
      }
      await new Promise(res=>setTimeout(res,400));
    }
  }

  function renderMetroData(data){
    metroReal.clearLayers();
    // Route relations + their member nodes.
    // Rendering from the supplied snapshot/cache: no network call here.
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
      const html=used
        ? `<div class="metro-stop-v11 used"><span class="metro-symbol">M</span><span class="metro-lines">${badges}</span></div>`
        : `<div class="metro-stop-v11 minor" title="Fermata metro"></div>`;
      const icon=L.divIcon({
        className:'',
        html,
        iconSize:used?[68,28]:[9,9],
        iconAnchor:used?[14,14]:[4,4]
      });
      L.marker([n.lat,n.lon],{icon})
       .bindPopup(`<div class="amenity-popup"><b>🚇 ${name}</b><div class="small">${refs.join(' · ')}</div><div>${used?'Fermata prevista nel nostro itinerario.':'Fermata disponibile, non prevista nel piano.'}</div></div>`)
       .addTo(metroReal);
    });
  }

  const METRO_CACHE_KEY='barcellona.metro.osm.v11';
  const METRO_ENDPOINTS=[
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.nchc.org.tw/api/interpreter'
  ];

  function readMetroCache(){
    try{
      const raw=localStorage.getItem(METRO_CACHE_KEY);
      if(!raw) return null;
      const obj=JSON.parse(raw);
      return obj && obj.data && obj.data.elements ? obj : null;
    }catch(e){ return null; }
  }
  function writeMetroCache(data){
    try{
      localStorage.setItem(METRO_CACHE_KEY,JSON.stringify({savedAt:Date.now(),data}));
    }catch(e){ console.warn('Cache metro non scrivibile',e); }
  }
  async function fetchMetroSnapshot(){
    const q=`[out:json][timeout:60];
      rel["route"="subway"](41.25,1.95,41.55,2.35)->.routes;
      (.routes; node(r.routes););
      out body geom;`;
    let lastErr=null;
    for(const endpoint of METRO_ENDPOINTS){
      try{
        const r=await fetch(endpoint,{
          method:'POST',
          headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
          body:'data='+encodeURIComponent(q)
        });
        if(!r.ok) throw new Error('HTTP '+r.status);
        const data=await r.json();
        if(!data.elements || !data.elements.length) throw new Error('risposta vuota');
        return data;
      }catch(e){ lastErr=e; }
    }
    throw lastErr||new Error('Metro non disponibile');
  }
  async function loadMetro(){
    const cached=readMetroCache();
    if(cached){
      renderMetroData(cached.data);
      // Refresh opportunistico e silenzioso: la mappa resta comunque disponibile.
      fetchMetroSnapshot().then(data=>{writeMetroCache(data);renderMetroData(data);}).catch(()=>{});
      return {source:'cache',savedAt:cached.savedAt};
    }
    const data=await fetchMetroSnapshot();
    writeMetroCache(data);
    renderMetroData(data);
    return {source:'network',savedAt:Date.now()};
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

    // Costruiamo le route del giorno senza alterare TRIP_DATA.
    let routes=(day.walkRoutes||[]).map(r=>({name:r.name,points:r.points.map(p=>[p[0],p[1]])}));

    if(day.id==='sabato'){
      // Rimuove il vecchio tratto con coordinate del ristorante stimate.
      routes=routes.filter(r=>r.name!=='Maria Cristina -> pranzo -> hotel');

      const maria=[41.38855,2.12640];
      const hotel=[41.3863149,2.1293222];

      if(resolvedPOI['s-rincon']){
        routes.unshift({
          name:'Maria Cristina -> EL RINCÓN -> hotel (pranzo principale)',
          points:[maria,resolvedPOI['s-rincon'],hotel],
          primary:true
        });
      }
      if(resolvedPOI['s-donsand']){
        routes.unshift({
          name:'Maria Cristina -> Don Sandwich -> hotel (backup pranzo)',
          points:[maria,resolvedPOI['s-donsand'],hotel],
          backup:true
        });
      }
    }

    for(let i=0;i<routes.length;i++){
      const r=routes[i];
      try{
        const data=await routeFoot(r.points);
        const latlngs=data.geometry.coordinates.map(c=>[c[1],c[0]]);
        L.polyline(latlngs,{
          color:r.backup?'#6f7d8a':'#1976d2',
          weight:r.primary?6:5,
          opacity:r.backup?.62:.84,
          dashArray:r.backup?'4 8':'8 7',
          lineCap:'round',lineJoin:'round'
        }).bindTooltip(`A piedi: ${r.name} · ${(data.distance/1000).toFixed(1)} km`)
          .addTo(walkingReal);
      }catch(e){
        r.points.forEach((p,idx)=>{
          if(idx===0||idx===r.points.length-1)
            L.circleMarker(p,{radius:3,color:'#1976d2',weight:2,fillOpacity:0})
             .bindTooltip(`Percorso pedonale da caricare: ${r.name}`).addTo(walkingReal);
        });
      }
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
  // I due ristoranti del sabato non vengono più mostrati con coordinate statiche:
  // il layer 'Mangiare' resta disponibile per gli altri POI pianificati.


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
  const plannedToggle=document.getElementById('toggleFood');
  if(plannedToggle){
    plannedToggle.onchange=e=>{
      if(e.target.checked){
        foodLayer.addTo(map);
        plannedFoodReal.addTo(map);
      }else{
        map.removeLayer(foodLayer);
        map.removeLayer(plannedFoodReal);
      }
    };
  }

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

  Promise.allSettled([loadMetro(),loadFood(),loadPlannedFoodReal()]).then(async results=>{
    const m=results[0].status==='fulfilled', f=results[1].status==='fulfilled', p=results[2].status==='fulfilled';
    const el=document.getElementById('liveStatus');
    if(m){
      const src=results[0].value && results[0].value.source==='cache' ? 'cache locale' : 'dati OSM';
      el.innerHTML='✓ Metro caricata da '+src+(f?' · fast food caricati':'')+(p?' · ristoranti pianificati geolocalizzati':'');
    }else{
      el.innerHTML='Metro: serve una prima connessione per creare la cache locale';
    }
    await loadWalkingForDay(currentDay());
  });
})();
