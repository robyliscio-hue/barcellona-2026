
(function(){
  // V7: niente polilinee metro disegnate a mano.
  // Il tracciato ferroviario reale viene da OpenRailwayMap.
  // Le stazioni metro vengono lette da OpenStreetMap/Overpass.

  const realMetro = L.layerGroup().addTo(map);
  const liveFood = L.layerGroup().addTo(map);

  // Infrastruttura ferroviaria reale come layer georeferenziato.
  const railwayTiles = L.tileLayer(
    'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      opacity: 0.72,
      attribution: 'Rail layer © OpenRailwayMap contributors, data © OpenStreetMap contributors'
    }
  ).addTo(map);

  const lineColors = {
    'L1':'#e31b23',
    'L2':'#8b5ca8',
    'L3':'#239b56',
    'L4':'#f2c500',
    'L5':'#2f63b6',
    'L9':'#f28c28',
    'L9N':'#f28c28',
    'L9S':'#f28c28',
    'L9 Nord':'#f28c28',
    'L9 Sud':'#f28c28',
    'L10':'#55c8d8',
    'L10N':'#55c8d8',
    'L10S':'#55c8d8',
    'L11':'#9acd32'
  };

  const usedStations = new Set([
    'Aeroport T2','Zona Universitària','Zona Universitaria','Maria Cristina','Les Corts',
    'Sants Estació','Sants Estacio','Sagrada Família','Sagrada Familia','Monumental',
    'Clot','Glòries','Glories','Urquinaona','Jaume I','Arc de Triomf',
    'Barceloneta','Passeig de Gràcia','Passeig de Gracia','Collblanc'
  ]);

  const status = L.control({position:'bottomleft'});
  status.onAdd = function(){
    const d=L.DomUtil.create('div','live-status');
    d.id='liveStatus';
    d.innerHTML='Caricamento rete metro e fermate reali...';
    return d;
  };
  status.addTo(map);

  const overpass='https://overpass-api.de/api/interpreter';

  function queryOverpass(q){
    return fetch(overpass,{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
      body:'data='+encodeURIComponent(q)
    }).then(r=>{
      if(!r.ok) throw new Error('Overpass '+r.status);
      return r.json();
    });
  }

  function normalizeLineRef(tags){
    let ref=(tags && (tags.ref || tags['ref:IFOPT'] || tags.line)) || '';
    ref=String(ref).trim();
    return ref;
  }

  async function loadStations(){
    // Prende tutte le stazioni/fermate metro nell'area metropolitana,
    // comprese quelle non previste dal nostro itinerario.
    const q=`[out:json][timeout:45];
    (
      nwr["railway"="station"]["station"="subway"](41.25,1.95,41.55,2.35);
      nwr["railway"="subway_entrance"](41.25,1.95,41.55,2.35);
      nwr["public_transport"="station"]["subway"="yes"](41.25,1.95,41.55,2.35);
    );
    out center tags;`;

    const data=await queryOverpass(q);
    const seen=new Set();

    data.elements.forEach(el=>{
      const tg=el.tags||{};
      const name=tg.name || tg['name:ca'] || tg['name:es'];
      if(!name) return;

      const c = el.lat!=null ? [el.lat,el.lon] :
                el.center ? [el.center.lat,el.center.lon] : null;
      if(!c) return;

      // Riduce i duplicati di ingressi multipli: stesso nome e coordinate ravvicinate
      const k=name.toLowerCase().replace(/\s+/g,' ');
      if(seen.has(k) && tg.railway==='subway_entrance') return;
      if(tg.railway==='station' || tg.public_transport==='station') seen.add(k);

      const ref=normalizeLineRef(tg);
      const refs=ref ? ref.split(/[;,/]/).map(x=>x.trim()).filter(Boolean) : [];
      const mainRef=refs.find(x=>lineColors[x]) || refs[0] || '';
      const col=lineColors[mainRef] || '#505b66';
      const used=usedStations.has(name);

      let html='<div class="metro-station '+(used?'used':'')+'" style="border-color:'+col+'">';
      html += '<span class="metro-dot" style="background:'+col+'"></span>';
      html += '<span class="metro-label">'+(used?'★ ':'')+name+'</span>';
      if(ref) html += '<span class="metro-ref">'+ref+'</span>';
      html += '</div>';

      const icon=L.divIcon({
        className:'',
        html:html,
        iconSize: used ? [155,30] : [130,26],
        iconAnchor:[12,13]
      });

      const popup = `<div class="amenity-popup">
        <b>🚇 ${name}</b>
        ${ref?`<div class="small">Linea/e: ${ref}</div>`:''}
        <div>${used?'Fermata usata nel nostro itinerario.':'Fermata disponibile: non prevista nel piano, ma utile come riferimento.'}</div>
        <a target="_blank" rel="noopener"
           href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name+' metro Barcelona')}">
           Apri in Google Maps
        </a>
      </div>`;

      L.marker(c,{icon}).bindPopup(popup).bindTooltip(name,{direction:'top'}).addTo(realMetro);
    });
  }

  async function loadFood(){
    const q=`[out:json][timeout:35];
      nwr["amenity"="fast_food"](41.30,2.07,41.415,2.215);
      out center tags;`;
    const data=await queryOverpass(q);

    data.elements.forEach(el=>{
      const tg=el.tags||{};
      if(!tg.name) return;
      const c=el.lat!=null?[el.lat,el.lon]:(el.center?[el.center.lat,el.center.lon]:null);
      if(!c) return;

      const addr=[tg['addr:street'],tg['addr:housenumber']].filter(Boolean).join(' ');
      const cuisine=tg.cuisine ? ' · '+tg.cuisine.replaceAll(';',', ') : '';
      const dest=encodeURIComponent(addr?`${tg.name}, ${addr}, Barcelona`:`${tg.name}, Barcelona`);
      const ic=L.divIcon({
        className:'',
        html:'<div class="amenity-marker fastfood">🍔</div>',
        iconSize:[38,38], iconAnchor:[19,19]
      });

      L.marker(c,{icon:ic})
        .bindTooltip(tg.name,{direction:'top'})
        .bindPopup(`<div class="amenity-popup">
          <b>🍔 ${tg.name}</b>
          <div class="small">Fast food mappato su OpenStreetMap${cuisine}</div>
          ${addr?`<div>${addr}</div>`:''}
          <a target="_blank" rel="noopener"
             href="https://www.google.com/maps/dir/?api=1&destination=${dest}">🧭 Portami qui</a>
        </div>`)
        .addTo(liveFood);
    });
  }

  Promise.allSettled([loadStations(),loadFood()]).then(results=>{
    const stationOK=results[0].status==='fulfilled';
    const foodOK=results[1].status==='fulfilled';
    const el=document.getElementById('liveStatus');
    if(stationOK && foodOK){
      el.innerHTML='✓ Layer ferroviario reale + fermate metro + fast food caricati';
    }else if(stationOK){
      el.innerHTML='✓ Metro caricata · ⚠ fast food live non disponibili';
    }else{
      el.innerHTML='⚠ Fermate metro live non disponibili · resta il layer ferroviario reale';
    }
  });

  // Toggle Metro reale = infrastruttura + stazioni
  const metroToggle=document.getElementById('toggleRealMetro');
  if(metroToggle){
    metroToggle.onchange=e=>{
      if(e.target.checked){
        railwayTiles.addTo(map);
        realMetro.addTo(map);
      }else{
        map.removeLayer(railwayTiles);
        map.removeLayer(realMetro);
      }
    };
  }

  const foodToggle=document.getElementById('toggleLiveFood');
  if(foodToggle){
    foodToggle.onchange=e=>e.target.checked?liveFood.addTo(map):map.removeLayer(liveFood);
  }

  // Elimina dalla vista la vecchia metro schematica.
  if(map.hasLayer(metroLayer)) map.removeLayer(metroLayer);
  const old=document.getElementById('toggleMetro');
  if(old){
    old.checked=false;
    old.disabled=true;
    const lab=old.closest('label');
    if(lab) lab.style.display='none';
  }
})();
