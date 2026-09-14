
/*
 V6 - livelli geografici LIVE da OpenStreetMap/Overpass.
 Non ridisegna la rete metro: legge route=metro e relative stazioni OSM.
 I fast food sono POI reali amenity=fast_food presenti nella bbox dell'itinerario.
*/
(function(){
 const realMetro=L.layerGroup().addTo(map);
 const liveFood=L.layerGroup().addTo(map);
 const info=L.control({position:'bottomleft'});
 info.onAdd=function(){const d=L.DomUtil.create('div','live-status');d.id='liveStatus';d.innerHTML='Caricamento dati geografici reali...';return d};
 info.addTo(map);

 const colors={L1:'#e31b23',L2:'#8b5ca8',L3:'#239b56',L4:'#f2c500',L5:'#2f63b6',L9:'#f28c28','L9 Sud':'#f28c28'};
 const used=new Set(['L1','L2','L3','L4','L5','L9 Sud','L9S']);
 const overpass='https://overpass-api.de/api/interpreter';

 function q(s){return fetch(overpass,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:'data='+encodeURIComponent(s)}).then(r=>r.json())}
 function center(el){
   if(el.lat!=null)return [el.lat,el.lon];
   if(el.center)return [el.center.lat,el.center.lon];
   return null;
 }
 async function loadMetro(){
   // Tutta la rete metro di Barcellona nella bbox utile, comprese stazioni non usate.
   const query=`[out:json][timeout:45];
   rel["route"="subway"](41.27,2.02,41.48,2.28)->.r;
   (.r;way(r.r);node(r.r););
   out body center;`;
   const data=await q(query);
   const byId=new Map(data.elements.map(e=>[e.type+'/'+e.id,e]));
   const rels=data.elements.filter(e=>e.type==='relation'&&e.tags&&e.tags.route==='subway');
   rels.forEach(rel=>{
     const ref=(rel.tags.ref||rel.tags.name||'Metro').replace(/\s+/g,' ').trim();
     const col=colors[ref]||('#'+(rel.tags.colour||'777777').replace('#',''));
     (rel.members||[]).filter(m=>m.type==='way').forEach(m=>{
       const w=byId.get('way/'+m.ref); if(!w||!w.nodes)return;
       const coords=w.nodes.map(id=>byId.get('node/'+id)).filter(Boolean).map(n=>[n.lat,n.lon]);
       if(coords.length>1)L.polyline(coords,{color:col,weight:used.has(ref)?5:3,opacity:used.has(ref)?.82:.48})
          .bindTooltip(`${ref} - rete metro reale OSM`).addTo(realMetro);
     });
     (rel.members||[]).filter(m=>m.type==='node'&&(m.role||'').match(/stop|platform/)).forEach(m=>{
       const n=byId.get('node/'+m.ref); if(!n)return;
       const name=(n.tags&&n.tags.name)||'Stazione metro';
       L.circleMarker([n.lat,n.lon],{radius:used.has(ref)?4:3,color:col,weight:2,fillColor:'#fff',fillOpacity:1})
        .bindTooltip(`${name} · ${ref}`,{direction:'top'}).addTo(realMetro);
     });
   });
 }
 async function loadFood(){
   // Tutti i fast food mappati OSM nelle zone attraversate dal viaggio.
   const query=`[out:json][timeout:35];
   nwr["amenity"="fast_food"](41.30,2.07,41.415,2.215);
   out center tags;`;
   const data=await q(query);
   data.elements.forEach(el=>{
     const c=center(el), tg=el.tags||{}; if(!c||!tg.name)return;
     const brand=tg.brand||tg.name, cuisine=tg.cuisine?` · ${tg.cuisine.replaceAll(';',', ')}`:'';
     const addr=[tg['addr:street'],tg['addr:housenumber']].filter(Boolean).join(' ');
     const dest=encodeURIComponent(addr?`${tg.name}, ${addr}, Barcelona`:`${tg.name}, Barcelona`);
     const ic=L.divIcon({className:'',html:'<div class="amenity-marker fastfood">🍔</div>',iconSize:[38,38],iconAnchor:[19,19]});
     L.marker(c,{icon:ic}).bindPopup(`<div class="amenity-popup"><b>🍔 ${tg.name}</b><div class="small">Fast food reale da OpenStreetMap${cuisine}</div>${addr?`<div>${addr}</div>`:''}<a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${dest}">🧭 Portami qui</a></div>`)
      .bindTooltip(tg.name).addTo(liveFood);
   });
 }
 Promise.allSettled([loadMetro(),loadFood()]).then(r=>{
   const ok=r.filter(x=>x.status==='fulfilled').length;
   document.getElementById('liveStatus').innerHTML=ok===2?'✓ Metro e fast food caricati da dati cartografici reali':'⚠ Alcuni dati live non disponibili: resta visibile la guida offline';
 });
 document.getElementById('toggleRealMetro').onchange=e=>e.target.checked?realMetro.addTo(map):map.removeLayer(realMetro);
 document.getElementById('toggleLiveFood').onchange=e=>e.target.checked?liveFood.addTo(map):map.removeLayer(liveFood);
 // Nasconde per default la vecchia metro schematica: rimane disponibile col toggle "Metro".
 if(map.hasLayer(metroLayer)){map.removeLayer(metroLayer);document.getElementById('toggleMetro').checked=false;}
})();
