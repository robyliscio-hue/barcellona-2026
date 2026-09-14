# Barcellona 2026 - mappa interattiva aggiornata

Allineata alla guida SABATO_LINEARE.

- Sabato: Rambla -> Plaça Reial -> Colombo -> Port Vell -> Gotic -> Born/Santa Maria del Mar -> Port Vell -> Barceloneta.
- Domenica: Park Güell eliminato; Sagrada -> La Monumental -> Glòries/Torre Glòries/Disseny Hub -> Jaume I/pranzo -> Cattedrale -> Arc de Triomf -> Ciutadella -> mare.
- Metro domenica aggiornata con L3, L5, L2, L1 e L4.
- Lunedì invariato: hotel -> Camp Nou -> Collblanc L9 Sud -> Aeroport T2.
- Audioguide, stato ascoltato e stato visitato mantenuti.
- Cache PWA aggiornata.


## V6 - dati geografici reali
- Hotel corretto sulle coordinate pubblicate dal sito ufficiale Aparthotel Atenea.
- Nuovo layer "Metro reale": carica da OpenStreetMap/Overpass le route subway e le stazioni reali.
- Mostra anche stazioni non previste nell'itinerario.
- Nuovo layer "Fast food reali": carica tutti i POI amenity=fast_food mappati nelle zone del viaggio.
- La vecchia metro schematica resta come fallback offline ma e' disattivata all'avvio.
- I dati live richiedono connessione; mappa, guida e audio continuano a funzionare offline secondo la cache esistente.


## V7 - layer metro + tutte le fermate
- Rimossi dalla visualizzazione tutti i tracciati metro costruiti a mano.
- Aggiunto layer georeferenziato OpenRailwayMap per la geometria ferroviaria reale.
- Tutte le stazioni/fermate metro dell'area vengono caricate da OpenStreetMap/Overpass.
- Le fermate effettivamente usate dall'itinerario sono marcate con ★.
- Le altre fermate restano visibili come riferimento, come richiesto.
- I fast food reali restano disponibili come layer separato.


## V8 - metro tematizzata e percorsi pedonali reali
- Rimosso OpenRailwayMap: non viene più mostrata l'infrastruttura tecnica ferroviaria.
- Le linee metro vengono lette esclusivamente dalle relazioni OpenStreetMap route=subway e colorate per linea (L1 rossa, L2 viola, L3 verde, L4 gialla, L5 blu, L9 arancione, ecc.).
- Tutte le fermate presenti nelle relazioni metro sono visibili; quelle del viaggio hanno il simbolo ★.
- Rimossi i vecchi percorsi pedonali disegnati a mano.
- I percorsi a piedi vengono calcolati live dal profilo pedonale FOSSGIS/OSRM usando strade e sentieri OpenStreetMap.
- Nessuna linea retta inventata viene mostrata come fallback se il routing pedonale non e' disponibile.
- Hotel corretto alle coordinate pubblicate; Maria Cristina ripristinata separatamente.
