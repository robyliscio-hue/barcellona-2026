const ARRIVAL=[
{id:"airport",symbol:"✈",name:"Aeroport Barcelona – Terminal 2",short:"Arrivo a Barcellona",lat:41.30385,lng:2.07428,time:"12:30 circa",type:"airport",description:"Arrivo al Terminal 2. Da qui inizia il trasferimento verso Les Corts con la metropolitana.",transit:"L9 Sud fino a Zona Universitària. Qui cambio sulla L3.",image:"img/aeroport-t2.jpg",audio:null},
{id:"zona-universitaria",symbol:"M",name:"Zona Universitària",short:"Cambio L9 Sud → L3",lat:41.38412,lng:2.11142,time:"dopo l'arrivo",type:"metro",description:"Stazione di interscambio per passare dalla L9 Sud alla L3.",transit:"L3 direzione Trinitat Nova → scendere a Maria Cristina.",image:"img/zona-universitaria.jpg",audio:null},
{id:"maria-cristina",symbol:"M",name:"Maria Cristina",short:"Arrivo in zona hotel",lat:41.38840,lng:2.12637,time:"prima del check-in",type:"metro",description:"Stazione L3 più comoda per raggiungere l'hotel e la zona pranzo/spesa.",transit:"Da qui proseguire a piedi verso pranzo/spesa e hotel.",image:"img/maria-cristina.jpg",audio:null},
{id:"hotel",symbol:"H",name:"Aparthotel Atenea Barcelona",short:"Pranzo/spesa → check-in",lat:41.38605,lng:2.12740,time:"prima parte del pomeriggio",type:"hotel",description:"Punto base del viaggio. Dopo pranzo, spesa e sistemazione degli zaini parte la visita del pomeriggio.",transit:"Da qui a piedi verso Camp Nou.",image:"img/hotel.jpg",audio:null}
];

const TAPPE=[
{id:1,name:"Camp Nou",short:"Visita esterna",lat:41.38090,lng:2.12283,time:"prima tappa del pomeriggio",description:"Visita esterna dello stadio. L'ingresso non è previsto.",tip:"Dopo Camp Nou si prosegue verso la L3 per raggiungere Diagonal.",image:"img/camp-nou.jpg",audio:"audio/camp-nou.mp3"},
{id:2,name:"La Pedrera · Casa Milà",short:"Audioguida esterna",lat:41.39537,lng:2.16196,time:"Passeig de Gràcia",description:"Osservazione esterna della Casa Milà di Antoni Gaudí prima di scendere lungo Passeig de Gràcia.",tip:"Qui colleghiamo il file unico della Pedrera già preparato.",image:"img/pedrera.jpg",audio:"audio/LA PEDRERA 00 COMPLETA.mp3"},
{id:3,name:"Casa Batlló",short:"Visita esterna",lat:41.39170,lng:2.16492,time:"subito dopo La Pedrera",description:"Seconda grande tappa modernista lungo Passeig de Gràcia.",tip:"Da qui si continua a piedi verso Plaça de Catalunya.",image:"img/casa-batllo.jpg",audio:"audio/casa-batllo.mp3"},
{id:4,name:"Plaça de Catalunya",short:"Ingresso nel centro",lat:41.38720,lng:2.17010,time:"tardo pomeriggio",description:"Grande snodo tra Eixample e centro storico. Da qui inizia la discesa verso La Rambla.",tip:"Da questo punto la giornata prosegue soprattutto a piedi.",image:"img/placa-catalunya.jpg",audio:"audio/placa-catalunya.mp3"},
{id:5,name:"Mercat de la Boqueria",short:"Sosta breve",lat:41.38175,lng:2.17154,time:"sosta agile",description:"Passaggio lungo La Rambla con breve sosta alla Boqueria.",tip:"Manteniamo la sosta breve per lasciare tempo alla parte sul mare.",image:"img/boqueria.jpg",audio:"audio/boqueria.mp3"},
{id:6,name:"Plaça Reial · Barri Gòtic",short:"Passeggiata",lat:41.38011,lng:2.17525,time:"centro storico",description:"Ingresso da La Rambla verso Plaça Reial e passeggiata nel Barri Gòtic.",tip:"La Cattedrale resta prevista per domenica.",image:"img/gotico.jpg",audio:"audio/gotico.mp3"},
{id:7,name:"Santa Maria del Mar · El Born",short:"Passaggio verso il porto",lat:41.38384,lng:2.18208,time:"verso sera",description:"Attraversamento del Born con passaggio davanti a Santa Maria del Mar.",tip:"Possiamo aggiungere qui una breve audioguida sul Born.",image:"img/santa-maria-mar.jpg",audio:"audio/santa-maria-mar.mp3"},
{id:8,name:"Port Vell",short:"Passeggiata sul porto",lat:41.37872,lng:2.18551,time:"sera",description:"Passeggiata sul fronte del porto in direzione Barceloneta.",tip:"Il pulsante Portami qui apre Google Maps.",image:"img/port-vell.jpg",audio:"audio/port-vell.mp3"},
{id:9,name:"Platja de la Barceloneta",short:"Mare · passeggiata · cena",lat:41.38077,lng:2.19377,time:"fino a sera",description:"Ultima tappa programmata: spiaggia, eventuale bagno, passeggiata e cena.",tip:"Rientro: Barceloneta L4 → Passeig de Gràcia → L3 → Maria Cristina.",image:"img/barceloneta.jpg",audio:"audio/barceloneta.mp3"}
];

const METRO_SEGMENTS=[
{id:"L9S",name:"L9 Sud · Aeroport T2 → Zona Universitària",color:"#f28c28",coords:[[41.30385,2.07428],[41.31789,2.07402],[41.33123,2.09127],[41.34468,2.10568],[41.35752,2.11870],[41.37522,2.11831],[41.38412,2.11142]]},
{id:"L3-arrivo",name:"L3 · Zona Universitària → Maria Cristina",color:"#239b56",coords:[[41.38412,2.11142],[41.38376,2.11933],[41.38840,2.12637]]},
{id:"L3-centro",name:"L3 · zona hotel → Diagonal",color:"#239b56",coords:[[41.38840,2.12637],[41.39000,2.13690],[41.39210,2.14556],[41.39352,2.15374],[41.39573,2.16054]]}
];

const WALK_SEGMENTS=[
[[41.38840,2.12637],[41.38605,2.12740]],
[[41.38605,2.12740],[41.38090,2.12283]],
[[41.39537,2.16196],[41.39170,2.16492],[41.38720,2.17010]],
[[41.38720,2.17010],[41.38175,2.17154],[41.38011,2.17525],[41.38384,2.18208],[41.37872,2.18551],[41.38077,2.19377]]
];
