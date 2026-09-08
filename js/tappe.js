
const TAPPE = [
  {
    id: 1,
    name: "Aparthotel Atenea Barcelona",
    short: "Hotel · partenza dopo il check-in",
    lat: 41.3860, lng: 2.1273,
    type: "hotel",
    time: "15:30 circa",
    description: "Punto di partenza del pomeriggio. Dopo check-in e sistemazione degli zaini, partenza a piedi verso Camp Nou.",
    tip: "Il marker verde identifica l'hotel, così rimane subito riconoscibile sulla mappa.",
    image: "img/hotel.jpg",
    audio: null
  },
  {
    id: 2,
    name: "Camp Nou",
    short: "Visita esterna",
    lat: 41.381194, lng: 2.120420,
    time: "15:45–16:20",
    description: "Sosta esterna allo stadio. Dopo la visita, rientro verso Les Corts e trasferimento in metro L3 fino a Diagonal.",
    tip: "Per il viaggio vero possiamo aggiungere qui una mini-audioguida dedicata allo stadio.",
    image: "img/camp-nou.jpg",
    audio: "audio/camp-nou.mp3"
  },
  {
    id: 3,
    name: "La Pedrera · Casa Milà",
    short: "Audioguida esterna",
    lat: 41.395336, lng: 2.161967,
    time: "16:30–16:45 circa",
    description: "Arrivo da Diagonal. Osservazione esterna della Casa Milà di Antoni Gaudí prima di iniziare la discesa lungo Passeig de Gràcia.",
    tip: "Questo è già predisposto per collegare il file MP3 unico della Pedrera che abbiamo preparato.",
    image: "img/pedrera.jpg",
    audio: "audio/la-pedrera.mp3"
  },
  {
    id: 4,
    name: "Casa Batlló",
    short: "Visita esterna",
    lat: 41.391719, lng: 2.164997,
    time: "16:50–17:05 circa",
    description: "Seconda grande tappa modernista lungo Passeig de Gràcia. La visita prevista è dall'esterno.",
    tip: "Foto e audioguida potranno essere aggiunte senza modificare il resto della mappa.",
    image: "img/casa-batllo.jpg",
    audio: "audio/casa-batllo.mp3"
  },
  {
    id: 5,
    name: "Plaça de Catalunya",
    short: "Ingresso nel centro storico",
    lat: 41.387612, lng: 2.170462,
    time: "17:20–17:30",
    description: "Grande snodo tra Eixample e centro storico. Da qui inizia la discesa lungo La Rambla verso il mare.",
    tip: "Da questo punto la giornata prosegue prevalentemente a piedi.",
    image: "img/placa-catalunya.jpg",
    audio: "audio/placa-catalunya.mp3"
  },
  {
    id: 6,
    name: "Mercat de la Boqueria",
    short: "Sosta breve · La Rambla",
    lat: 41.38174, lng: 2.17158,
    time: "17:45 circa",
    description: "Sosta agile lungo La Rambla per vedere il mercato e fare eventualmente qualche piccolo assaggio.",
    tip: "Manteniamo la sosta breve per lasciare più tempo al mare.",
    image: "img/boqueria.jpg",
    audio: "audio/boqueria.mp3"
  },
  {
    id: 7,
    name: "Plaça Reial · Barri Gòtic",
    short: "Passeggiata nel centro storico",
    lat: 41.38010, lng: 2.17524,
    time: "18:00 circa",
    description: "Ingresso da La Rambla verso Plaça Reial e poi passeggiata nel Barri Gòtic, senza deviare verso la Cattedrale prevista per domenica.",
    tip: "Nel sito definitivo possiamo inserire più micro-punti all'interno del Gòtic senza affollare la mappa principale.",
    image: "img/gotico.jpg",
    audio: "audio/gotico.mp3"
  },
  {
    id: 8,
    name: "Santa Maria del Mar · El Born",
    short: "Passaggio verso il porto",
    lat: 41.38389, lng: 2.18210,
    time: "18:35–18:45",
    description: "Attraversamento del Born con passaggio davanti a Santa Maria del Mar, quindi discesa verso Passeig d'Isabel II e Port Vell.",
    tip: "Qui potremo collegare una breve audioguida di contesto sul Born e sulla basilica.",
    image: "img/santa-maria-mar.jpg",
    audio: "audio/santa-maria-mar.mp3"
  },
  {
    id: 9,
    name: "Port Vell",
    short: "Passeggiata sul porto",
    lat: 41.37875, lng: 2.18558,
    time: "19:00 circa",
    description: "Passeggiata sul fronte del porto in direzione Barceloneta e Passeig de Joan de Borbó.",
    tip: "Il pulsante “Portami qui” apre Google Maps per la navigazione effettiva.",
    image: "img/port-vell.jpg",
    audio: "audio/port-vell.mp3"
  },
  {
    id: 10,
    name: "Platja de la Barceloneta",
    short: "Mare · passeggiata · cena",
    lat: 41.38083, lng: 2.19375,
    time: "19:30/20:00 → sera",
    description: "Ultima tappa programmata: spiaggia, passeggiata, eventuale bagno, aperitivo e cena. Da qui nessun orario rigido.",
    tip: "Per il rientro: Barceloneta L4 → Passeig de Gràcia → cambio L3 → Maria Cristina.",
    image: "img/barceloneta.jpg",
    audio: "audio/barceloneta.mp3"
  }
];
