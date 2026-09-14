const TRIP_DATA={
  "days": [
    {
      "id": "sabato",
      "label": "Sab 19",
      "title": "Sabato 19 settembre",
      "subtitle": "Arrivo, Gaudi, Rambla lineare, Gotic, Born e mare",
      "stops": [
        {
          "id": "s-airport",
          "kind": "logistic",
          "icon": "✈",
          "name": "Aeroport Barcelona T2",
          "time": "12:30",
          "lat": 41.30385,
          "lng": 2.07428,
          "description": "Arrivo al Terminal 2. Prima convalida della Hola Barcelona 48h e partenza in metro.",
          "transit": "L9 Sud direzione Zona Universitaria fino al capolinea.",
          "cost": "TRASPORTO"
        },
        {
          "id": "s-zona",
          "kind": "metro",
          "icon": "M",
          "name": "Zona Universitaria",
          "time": "circa 13:30",
          "lat": 41.38572,
          "lng": 2.11113,
          "description": "Cambio tra L9 Sud e L3.",
          "transit": "L3 direzione Trinitat Nova.",
          "cost": "TRASPORTO"
        },
        {
          "id": "s-maria",
          "kind": "metro",
          "icon": "M",
          "name": "Maria Cristina",
          "time": "circa 14:00",
          "lat": 41.38855,
          "lng": 2.1264,
          "description": "Arrivo nella zona dell'hotel. Da qui pranzo economico, piccola spesa e poi check-in.",
          "transit": "A piedi nella zona Les Corts.",
          "cost": "TRASPORTO"
        },
        {
          "id": "s-hotel",
          "kind": "hotel",
          "icon": "H",
          "name": "Aparthotel Atenea Barcelona",
          "time": "15:00-15:30",
          "lat": 41.3863149,
          "lng": 2.1293222,
          "description": "Check-in, sistemazione degli zaini e partenza per il pomeriggio.",
          "cost": "HOTEL"
        },
        {
          "id": "s-pedrera",
          "n": 1,
          "name": "La Pedrera - Casa Mila",
          "time": "15:45/16:00",
          "lat": 41.39536,
          "lng": 2.16197,
          "description": "Da Les Corts L3 a Diagonal. Visita esterna della Pedrera.",
          "cost": "GRATIS - esterno",
          "audios": "pedrera"
        },
        {
          "id": "s-batllo",
          "n": 2,
          "name": "Casa Batllo",
          "time": "circa 16:20",
          "lat": 41.39172,
          "lng": 2.16495,
          "description": "Scendendo a piedi lungo Passeig de Gracia, sosta esterna a Casa Batllo.",
          "cost": "GRATIS - esterno"
        },
        {
          "id": "s-catalunya",
          "n": 3,
          "name": "Placa de Catalunya",
          "time": "16:45/17:00",
          "lat": 41.38702,
          "lng": 2.17005,
          "description": "Piazza di raccordo tra Passeig de Gracia, Rambla e centro storico.",
          "cost": "GRATIS",
          "audios": "catalunya"
        },
        {
          "id": "s-rambla",
          "n": 4,
          "name": "La Rambla",
          "time": "dalle 17:00",
          "lat": 41.3842,
          "lng": 2.1711,
          "description": "Discesa lungo La Rambla verso il mare, seguendo l'itinerario reale della giornata.",
          "cost": "GRATIS",
          "audios": "rambla"
        },
        {
          "id": "s-boqueria",
          "n": 5,
          "name": "Mercat de la Boqueria",
          "time": "circa 17:15",
          "lat": 41.38174,
          "lng": 2.17158,
          "description": "Giro agile nel mercato e piccoli assaggi.",
          "cost": "GRATIS - acquisti a parte",
          "audios": "boqueria"
        },
        {
          "id": "s-reial",
          "n": 6,
          "name": "Placa Reial",
          "time": "17:30/17:45",
          "lat": 41.38011,
          "lng": 2.17524,
          "description": "Deviazione dalla Rambla verso Placa Reial. Dopo la visita si torna sulla Rambla e si continua verso il mare: il Gotic viene visitato solo dopo Colombo e il Port Vell.",
          "cost": "GRATIS",
          "audios": "reial"
        },
        {
          "id": "s-colombo",
          "n": 7,
          "name": "Monumento a Colombo",
          "time": "circa 18:00",
          "lat": 41.37625,
          "lng": 2.17734,
          "description": "Fine della Rambla. Da qui si entra nel Port Vell e si prosegue verso Moll de la Fusta.",
          "cost": "GRATIS - esterno",
          "audios": "portvell"
        },
        {
          "id": "s-portvell-in",
          "n": 8,
          "name": "Port Vell - ingresso da Colombo",
          "time": "18:00/18:15",
          "lat": 41.3778,
          "lng": 2.18105,
          "description": "Dal Monumento a Colombo si entra nel Port Vell e si percorre il tratto iniziale verso Moll de la Fusta, prima di risalire nel Barri Gotic.",
          "cost": "GRATIS"
        },
        {
          "id": "s-gotic",
          "n": 9,
          "name": "Barri Gotic",
          "time": "18:15 circa",
          "lat": 41.38255,
          "lng": 2.17731,
          "description": "Dal Port Vell si risale nel Barri Gotic, usando Placa Sant Jaume come riferimento e senza deviazioni verso la Cattedrale. Si prosegue poi verso Carrer de la Princesa / El Born.",
          "cost": "GRATIS",
          "audios": "gotic"
        },
        {
          "id": "s-born",
          "n": 10,
          "name": "El Born - Santa Maria del Mar",
          "time": "18:45 circa",
          "lat": 41.38385,
          "lng": 2.18209,
          "description": "Attraversamento del Born con passaggio davanti a Santa Maria del Mar. Da qui si scende verso Passeig d'Isabel II sul lato corretto del Port Vell.",
          "cost": "GRATIS - esterno"
        },
        {
          "id": "s-portvell-out",
          "n": 11,
          "name": "Port Vell - verso Barceloneta",
          "time": "19:00 circa",
          "lat": 41.3812,
          "lng": 2.1854,
          "description": "Da Santa Maria del Mar si rientra sul Port Vell gia sul lato corretto e si continua verso Passeig de Joan de Borbo, senza tornare a Colombo.",
          "cost": "GRATIS",
          "audios": "portvell"
        },
        {
          "id": "s-barceloneta",
          "n": 12,
          "name": "Barceloneta e spiaggia",
          "time": "19:30/20:00 -> sera",
          "lat": 41.37895,
          "lng": 2.19223,
          "description": "Mare, spiaggia, passeggiata, aperitivo e cena. Nessun orario rigido.",
          "cost": "GRATIS",
          "audios": "barceloneta"
        },
        {
          "id": "s-rientro-pg",
          "kind": "metro",
          "icon": "M",
          "name": "Passeig de Gracia - cambio",
          "time": "rientro",
          "lat": 41.39162,
          "lng": 2.16498,
          "description": "Rientro dall'ultima tappa verso l'hotel.",
          "transit": "Barceloneta L4 direzione Trinitat Nova -> Passeig de Gracia; cambio L3 direzione Zona Universitaria.",
          "cost": "TRASPORTO"
        },
        {
          "id": "s-rientro-hotel",
          "kind": "hotel",
          "icon": "H",
          "name": "Rientro in hotel",
          "time": "fine giornata",
          "lat": 41.3863149,
          "lng": 2.1293222,
          "description": "Scendere a Maria Cristina e raggiungere l'hotel a piedi.",
          "cost": "HOTEL"
        }
      ],
      "metro": [
        {
          "name": "L9 Sud - Aeroport T2 -> Zona Universitaria",
          "color": "#f28c28",
          "coords": [
            [
              41.30385,
              2.07428
            ],
            [
              41.3128,
              2.073
            ],
            [
              41.3215,
              2.0744
            ],
            [
              41.3308,
              2.0788
            ],
            [
              41.34,
              2.084
            ],
            [
              41.35,
              2.0915
            ],
            [
              41.3595,
              2.0985
            ],
            [
              41.369,
              2.1045
            ],
            [
              41.378,
              2.1087
            ],
            [
              41.38572,
              2.11113
            ]
          ],
          "stations": [
            {
              "name": "Aeroport T2",
              "lat": 41.30385,
              "lng": 2.07428
            },
            {
              "name": "Zona Universitaria",
              "lat": 41.38572,
              "lng": 2.11113
            }
          ]
        },
        {
          "name": "L3 - Zona Universitaria -> Maria Cristina",
          "color": "#239b56",
          "coords": [
            [
              41.38572,
              2.11113
            ],
            [
              41.386,
              2.113
            ],
            [
              41.3867,
              2.115
            ],
            [
              41.38778,
              2.11705
            ],
            [
              41.3881,
              2.12
            ],
            [
              41.3883,
              2.123
            ],
            [
              41.38855,
              2.1264
            ]
          ],
          "stations": [
            {
              "name": "Zona Universitaria",
              "lat": 41.38572,
              "lng": 2.11113
            },
            {
              "name": "Palau Reial",
              "lat": 41.38778,
              "lng": 2.11705
            },
            {
              "name": "Maria Cristina",
              "lat": 41.38855,
              "lng": 2.1264
            }
          ]
        },
        {
          "name": "L3 - Les Corts -> Diagonal",
          "color": "#239b56",
          "coords": [
            [
              41.3842,
              2.13093
            ],
            [
              41.3812,
              2.13588
            ],
            [
              41.3791,
              2.14005
            ],
            [
              41.37842,
              2.14522
            ],
            [
              41.37512,
              2.14932
            ],
            [
              41.3742,
              2.15915
            ],
            [
              41.37528,
              2.16845
            ],
            [
              41.37677,
              2.17502
            ],
            [
              41.38122,
              2.17318
            ],
            [
              41.38635,
              2.16968
            ],
            [
              41.38955,
              2.16735
            ],
            [
              41.39545,
              2.16188
            ]
          ],
          "stations": [
            {
              "name": "Les Corts",
              "lat": 41.3842,
              "lng": 2.13093
            },
            {
              "name": "Placa del Centre",
              "lat": 41.3812,
              "lng": 2.13588
            },
            {
              "name": "Sants Estacio",
              "lat": 41.3791,
              "lng": 2.14005
            },
            {
              "name": "Tarragona",
              "lat": 41.37842,
              "lng": 2.14522
            },
            {
              "name": "Espanya",
              "lat": 41.37512,
              "lng": 2.14932
            },
            {
              "name": "Poble Sec",
              "lat": 41.3742,
              "lng": 2.15915
            },
            {
              "name": "Parallel",
              "lat": 41.37528,
              "lng": 2.16845
            },
            {
              "name": "Drassanes",
              "lat": 41.37677,
              "lng": 2.17502
            },
            {
              "name": "Liceu",
              "lat": 41.38122,
              "lng": 2.17318
            },
            {
              "name": "Catalunya",
              "lat": 41.38635,
              "lng": 2.16968
            },
            {
              "name": "Passeig de Gracia",
              "lat": 41.38955,
              "lng": 2.16735
            },
            {
              "name": "Diagonal",
              "lat": 41.39545,
              "lng": 2.16188
            }
          ]
        },
        {
          "name": "L4 - Barceloneta -> Passeig de Gracia",
          "color": "#f2c500",
          "coords": [
            [
              41.3824,
              2.1854
            ],
            [
              41.38357,
              2.1782
            ],
            [
              41.38957,
              2.17415
            ],
            [
              41.38955,
              2.16735
            ]
          ],
          "stations": [
            {
              "name": "Barceloneta",
              "lat": 41.3824,
              "lng": 2.1854
            },
            {
              "name": "Jaume I",
              "lat": 41.38357,
              "lng": 2.1782
            },
            {
              "name": "Urquinaona",
              "lat": 41.38957,
              "lng": 2.17415
            },
            {
              "name": "Passeig de Gracia",
              "lat": 41.38955,
              "lng": 2.16735
            }
          ]
        },
        {
          "name": "L3 - Passeig de Gracia -> Maria Cristina",
          "color": "#239b56",
          "coords": [
            [
              41.38955,
              2.16735
            ],
            [
              41.38635,
              2.16968
            ],
            [
              41.38122,
              2.17318
            ],
            [
              41.37677,
              2.17502
            ],
            [
              41.37528,
              2.16845
            ],
            [
              41.3742,
              2.15915
            ],
            [
              41.37512,
              2.14932
            ],
            [
              41.37842,
              2.14522
            ],
            [
              41.3791,
              2.14005
            ],
            [
              41.3812,
              2.13588
            ],
            [
              41.3842,
              2.13093
            ],
            [
              41.38855,
              2.1264
            ]
          ],
          "stations": [
            {
              "name": "Passeig de Gracia",
              "lat": 41.38955,
              "lng": 2.16735
            },
            {
              "name": "Catalunya",
              "lat": 41.38635,
              "lng": 2.16968
            },
            {
              "name": "Liceu",
              "lat": 41.38122,
              "lng": 2.17318
            },
            {
              "name": "Drassanes",
              "lat": 41.37677,
              "lng": 2.17502
            },
            {
              "name": "Parallel",
              "lat": 41.37528,
              "lng": 2.16845
            },
            {
              "name": "Poble Sec",
              "lat": 41.3742,
              "lng": 2.15915
            },
            {
              "name": "Espanya",
              "lat": 41.37512,
              "lng": 2.14932
            },
            {
              "name": "Tarragona",
              "lat": 41.37842,
              "lng": 2.14522
            },
            {
              "name": "Sants Estacio",
              "lat": 41.3791,
              "lng": 2.14005
            },
            {
              "name": "Placa del Centre",
              "lat": 41.3812,
              "lng": 2.13588
            },
            {
              "name": "Les Corts",
              "lat": 41.3842,
              "lng": 2.13093
            },
            {
              "name": "Maria Cristina",
              "lat": 41.38855,
              "lng": 2.1264
            }
          ]
        }
      ],
      "walk": [
        [
          [
            41.3884,
            2.12631
          ],
          [
            41.38765,
            2.12655
          ],
          [
            41.3869,
            2.12705
          ],
          [
            41.38605,
            2.12743
          ]
        ],
        [
          [
            41.38605,
            2.12743
          ],
          [
            41.38475,
            2.1276
          ],
          [
            41.3833,
            2.1278
          ]
        ],
        [
          [
            41.3957,
            2.1605
          ],
          [
            41.39536,
            2.16197
          ],
          [
            41.39425,
            2.16275
          ],
          [
            41.3932,
            2.16345
          ],
          [
            41.3922,
            2.16415
          ],
          [
            41.39172,
            2.16495
          ],
          [
            41.39055,
            2.1662
          ],
          [
            41.38925,
            2.16765
          ],
          [
            41.38702,
            2.17005
          ]
        ],
        [
          [
            41.38702,
            2.17005
          ],
          [
            41.38615,
            2.17045
          ],
          [
            41.3851,
            2.17085
          ],
          [
            41.3842,
            2.1711
          ],
          [
            41.3831,
            2.17135
          ],
          [
            41.38195,
            2.17155
          ],
          [
            41.38174,
            2.17158
          ],
          [
            41.38195,
            2.17155
          ],
          [
            41.3811,
            2.17205
          ],
          [
            41.38045,
            2.17265
          ],
          [
            41.38011,
            2.17524
          ],
          [
            41.38045,
            2.17265
          ],
          [
            41.3795,
            2.1737
          ],
          [
            41.3785,
            2.1748
          ],
          [
            41.37745,
            2.1761
          ],
          [
            41.37625,
            2.17734
          ]
        ],
        [
          [
            41.37625,
            2.17734
          ],
          [
            41.3771,
            2.1791
          ],
          [
            41.3781,
            2.1811
          ],
          [
            41.37915,
            2.1822
          ],
          [
            41.3803,
            2.1811
          ],
          [
            41.3811,
            2.1797
          ],
          [
            41.3821,
            2.1783
          ],
          [
            41.38255,
            2.17731
          ],
          [
            41.3831,
            2.1782
          ],
          [
            41.38335,
            2.17945
          ],
          [
            41.38365,
            2.1808
          ],
          [
            41.38385,
            2.18209
          ],
          [
            41.3828,
            2.1831
          ],
          [
            41.38175,
            2.18425
          ],
          [
            41.3812,
            2.1854
          ],
          [
            41.38025,
            2.1871
          ],
          [
            41.37955,
            2.1888
          ],
          [
            41.37895,
            2.1904
          ],
          [
            41.37895,
            2.19223
          ]
        ],
        [
          [
            41.37895,
            2.19223
          ],
          [
            41.3802,
            2.1904
          ],
          [
            41.3812,
            2.188
          ],
          [
            41.3824,
            2.1854
          ]
        ],
        [
          [
            41.3884,
            2.12631
          ],
          [
            41.38765,
            2.12655
          ],
          [
            41.3869,
            2.12705
          ],
          [
            41.38605,
            2.12743
          ]
        ]
      ],
      "amenities": [
        {
          "id": "s-rincon",
          "type": "restaurant",
          "name": "El Rincon Tapas & Bar",
          "lat": 41.38115,
          "lng": 2.1241,
          "address": "Travessera de les Corts, 136, Barcelona",
          "note": "PRANZO SABATO - prima scelta · Travessera de les Corts 136 · €10-20 · verificato",
          "when": "14:00 circa",
          "verified": true
        },
        {
          "id": "s-donsand",
          "type": "restaurant",
          "name": "Don Sandwich Cafeteria",
          "lat": 41.38265,
          "lng": 2.1271,
          "address": "Carrer de Figols, 38, Barcelona",
          "note": "PRANZO SABATO - backup · Carrer de Figols 38 · €10-20 · verificato",
          "when": "14:00 circa",
          "verified": true
        },
        {
          "id": "s-mcd",
          "type": "fastfood",
          "name": "McDonald's Passeig de Gracia",
          "lat": 41.39188450233682,
          "lng": 2.1657942607966985,
          "address": "Passeig de Gracia, 48, Barcelona",
          "note": "FAST FOOD concordato - sul percorso Pedrera -> Casa Batllo -> Catalunya · €1-10",
          "when": "backup",
          "verified": true
        },
        {
          "id": "s-five",
          "type": "fastfood",
          "name": "Five Guys Passeig de Gracia",
          "lat": 41.38975,
          "lng": 2.1681,
          "address": "Passeig de Gracia, 28, Barcelona",
          "note": "FAST FOOD concordato · €10-20",
          "when": "backup",
          "verified": true
        },
        {
          "id": "s-bk",
          "type": "fastfood",
          "name": "Burger King Arago / Passeig de Gracia",
          "lat": 41.39075,
          "lng": 2.16625,
          "address": "Carrer d'Arago, 259, Barcelona",
          "note": "FAST FOOD concordato - backup zona Casa Batllo · €10-20",
          "when": "backup",
          "verified": true
        },
        {
          "id": "s-taberna",
          "type": "restaurant",
          "name": "La Taberna de la Barceloneta",
          "lat": 41.38015,
          "lng": 2.1892,
          "address": "Carrer d'Andrea Doria, 27, Barcelona",
          "note": "CENA SABATO - prima scelta · €10-20",
          "when": "21:00 circa",
          "verified": true
        },
        {
          "id": "wc-plapalau-s",
          "type": "wc",
          "name": "WC pubblico - Pla de Palau",
          "lat": 41.3833,
          "lng": 2.183,
          "address": "Pla de Palau, Barcelona",
          "note": "WC pubblico nell'area Ciutat Vella, utile tra Born e Port Vell.",
          "when": "se serve"
        },
        {
          "id": "wc-born-s",
          "type": "wc",
          "name": "WC pubblico stagionale - Passeig del Born",
          "lat": 41.3842,
          "lng": 2.1835,
          "address": "Carrer del Rec / Passeig del Born, Barcelona",
          "note": "Servizio stagionale indicato fino al 30 settembre; da verificare sul posto.",
          "when": "se serve"
        },
        {
          "id": "wc-barcel-s",
          "type": "wc",
          "name": "WC pubblico - Passeig Maritim Barceloneta",
          "lat": 41.3782,
          "lng": 2.1938,
          "address": "Passeig Maritim de la Barceloneta, Barcelona",
          "note": "WC pubblico / servizio spiaggia nell'area Barceloneta.",
          "when": "se serve"
        }
      ],
      "walkRoutes": [
        {
          "name": "Maria Cristina -> pranzo -> hotel",
          "points": [
            [
              41.38855,
              2.1264
            ],
            [
              41.38115,
              2.1241
            ],
            [
              41.3863149,
              2.1293222
            ]
          ]
        },
        {
          "name": "Hotel -> Les Corts metro",
          "points": [
            [
              41.3863149,
              2.1293222
            ],
            [
              41.3842,
              2.13093
            ]
          ]
        },
        {
          "name": "Diagonal -> Pedrera -> Batllo -> Catalunya",
          "points": [
            [
              41.39545,
              2.16188
            ],
            [
              41.39536,
              2.16197
            ],
            [
              41.39172,
              2.16495
            ],
            [
              41.38702,
              2.17005
            ]
          ]
        },
        {
          "name": "Rambla -> Boqueria -> Placa Reial -> Colombo",
          "points": [
            [
              41.38702,
              2.17005
            ],
            [
              41.38174,
              2.17158
            ],
            [
              41.38011,
              2.17524
            ],
            [
              41.37625,
              2.17734
            ]
          ]
        },
        {
          "name": "Colombo -> Port Vell -> Gotic -> Born -> Barceloneta",
          "points": [
            [
              41.37625,
              2.17734
            ],
            [
              41.3778,
              2.18105
            ],
            [
              41.38255,
              2.17731
            ],
            [
              41.38385,
              2.18209
            ],
            [
              41.3812,
              2.1854
            ],
            [
              41.37895,
              2.19223
            ]
          ]
        },
        {
          "name": "Barceloneta -> metro",
          "points": [
            [
              41.37895,
              2.19223
            ],
            [
              41.3824,
              2.1854
            ]
          ]
        },
        {
          "name": "Maria Cristina -> hotel",
          "points": [
            [
              41.38855,
              2.1264
            ],
            [
              41.3863149,
              2.1293222
            ]
          ]
        }
      ]
    },
    {
      "id": "domenica",
      "label": "Dom 20",
      "title": "Domenica 20 settembre",
      "subtitle": "Sagrada, Monumental, Glories, Cattedrale, Ciutadella e mare",
      "stops": [
        {
          "id": "d-hotel",
          "kind": "hotel",
          "icon": "H",
          "name": "Hotel - partenza",
          "time": "08:45/09:00",
          "lat": 41.3863149,
          "lng": 2.1293222,
          "description": "Dopo colazione si raggiunge Les Corts L3 per iniziare la mattina.",
          "cost": "HOTEL"
        },
        {
          "id": "d-sagrada",
          "n": 1,
          "name": "Sagrada Familia",
          "time": "09:30-10:15",
          "lat": 41.40363,
          "lng": 2.17436,
          "description": "Visita esterna di circa 40-45 minuti con la nostra audioguida, partendo dalla facciata della Nativita e percorrendo il perimetro.",
          "cost": "GRATIS - esterno",
          "audios": "sagrada"
        },
        {
          "id": "d-monumental",
          "n": 2,
          "name": "La Monumental",
          "time": "10:25-10:45",
          "lat": 41.40052,
          "lng": 2.17937,
          "description": "Breve sosta esterna di circa 15-20 minuti all'ex arena monumentale. Nessun ingresso previsto.",
          "cost": "GRATIS - esterno"
        },
        {
          "id": "d-glories",
          "n": 3,
          "name": "Placa de les Glories - Torre Glories - Disseny Hub",
          "time": "11:05-11:50",
          "lat": 41.40399,
          "lng": 2.18789,
          "description": "Blocco dedicato alla Barcellona contemporanea: Torre Glories, Placa de les Glories e Disseny Hub, tutti dall'esterno.",
          "cost": "GRATIS - esterni"
        },
        {
          "id": "d-jaume",
          "kind": "metro",
          "icon": "M",
          "name": "Jaume I - zona pranzo",
          "time": "12:15 circa",
          "lat": 41.38357,
          "lng": 2.1782,
          "description": "Arrivo diretto nella zona del pranzo e della Cattedrale.",
          "cost": "TRASPORTO"
        },
        {
          "id": "d-cattedrale",
          "n": 4,
          "name": "Cattedrale di Barcellona",
          "time": "14:00",
          "lat": 41.38396,
          "lng": 2.1762,
          "description": "Prenotazione confermata. Arrivo davanti all'ingresso entro le 13:30-13:40; visita interna prevista per circa 60-75 minuti.",
          "cost": "A PAGAMENTO - prenotata",
          "audios": "cattedrale"
        },
        {
          "id": "d-urquinaona",
          "kind": "metro",
          "icon": "M",
          "name": "Urquinaona",
          "time": "15:20 circa",
          "lat": 41.38957,
          "lng": 2.17415,
          "description": "Una fermata L4 da Jaume I; eventuale sosta rapida a 100 Montaditos, poi cambio L1.",
          "cost": "TRASPORTO"
        },
        {
          "id": "d-arc",
          "n": 5,
          "name": "Arc de Triomf",
          "time": "15:35/15:45",
          "lat": 41.39105,
          "lng": 2.18069,
          "description": "Foto all'Arc de Triomf e inizio della passeggiata lungo Passeig de Lluis Companys verso Ciutadella.",
          "cost": "GRATIS",
          "audios": "arc"
        },
        {
          "id": "d-ciutadella",
          "n": 6,
          "name": "Parc de la Ciutadella",
          "time": "16:00 circa",
          "lat": 41.38812,
          "lng": 2.18745,
          "description": "Passeggiata rilassata nel parco per circa 45-60 minuti.",
          "cost": "GRATIS",
          "audios": "ciutadella"
        },
        {
          "id": "d-portolimpic",
          "n": 7,
          "name": "Port Olimpic",
          "time": "16:45/17:00",
          "lat": 41.3852,
          "lng": 2.2011,
          "description": "Uscita lato mare della Ciutadella e prosecuzione verso Nova Icaria.",
          "cost": "GRATIS"
        },
        {
          "id": "d-nova",
          "n": 8,
          "name": "Platja de Nova Icaria",
          "time": "17:00-20:00",
          "lat": 41.39022,
          "lng": 2.20335,
          "description": "Blocco mare e spiaggia di circa tre ore, se meteo e condizioni del mare lo permettono.",
          "cost": "GRATIS"
        },
        {
          "id": "d-barceloneta",
          "n": 9,
          "name": "Barceloneta",
          "time": "20:00 -> sera",
          "lat": 41.37895,
          "lng": 2.19223,
          "description": "Passeggiata sul lungomare e cena flessibile. Per sicurezza entrare in metro entro circa le 23:15.",
          "cost": "GRATIS",
          "audios": "barceloneta"
        },
        {
          "id": "d-rientro",
          "kind": "hotel",
          "icon": "H",
          "name": "Rientro in hotel",
          "time": "entro fine servizio",
          "lat": 41.3863149,
          "lng": 2.1293222,
          "description": "Barceloneta L4 -> Passeig de Gracia; cambio L3 -> Maria Cristina -> hotel.",
          "cost": "HOTEL"
        }
      ],
      "metro": [
        {
          "name": "L3 - Les Corts -> Sants Estacio",
          "color": "#239b56",
          "coords": [
            [
              41.3842,
              2.13093
            ],
            [
              41.3812,
              2.13588
            ],
            [
              41.3791,
              2.14005
            ]
          ],
          "stations": [
            {
              "name": "Les Corts",
              "lat": 41.3842,
              "lng": 2.13093
            },
            {
              "name": "Placa del Centre",
              "lat": 41.3812,
              "lng": 2.13588
            },
            {
              "name": "Sants Estacio",
              "lat": 41.3791,
              "lng": 2.14005
            }
          ]
        },
        {
          "name": "L5 - Sants Estacio -> Sagrada Familia",
          "color": "#2f63b6",
          "coords": [
            [
              41.3791,
              2.14005
            ],
            [
              41.381,
              2.1445
            ],
            [
              41.3837,
              2.149
            ],
            [
              41.387,
              2.153
            ],
            [
              41.3905,
              2.157
            ],
            [
              41.394,
              2.161
            ],
            [
              41.397,
              2.1655
            ],
            [
              41.4,
              2.17
            ],
            [
              41.40363,
              2.17436
            ]
          ],
          "stations": [
            {
              "name": "Sants Estacio",
              "lat": 41.3791,
              "lng": 2.14005
            },
            {
              "name": "Sagrada Familia",
              "lat": 41.40363,
              "lng": 2.17436
            }
          ]
        },
        {
          "name": "L2 - Sagrada Familia -> Monumental",
          "color": "#8b5ca8",
          "coords": [
            [
              41.40363,
              2.17436
            ],
            [
              41.40052,
              2.17937
            ]
          ],
          "stations": [
            {
              "name": "Sagrada Familia",
              "lat": 41.40363,
              "lng": 2.17436
            },
            {
              "name": "Monumental",
              "lat": 41.40052,
              "lng": 2.17937
            }
          ]
        },
        {
          "name": "L2 - Monumental -> Clot",
          "color": "#8b5ca8",
          "coords": [
            [
              41.40052,
              2.17937
            ],
            [
              41.403,
              2.182
            ],
            [
              41.4057,
              2.1845
            ],
            [
              41.40825,
              2.18708
            ]
          ],
          "stations": [
            {
              "name": "Monumental",
              "lat": 41.40052,
              "lng": 2.17937
            },
            {
              "name": "Clot",
              "lat": 41.40825,
              "lng": 2.18708
            }
          ]
        },
        {
          "name": "L1 - Clot -> Glories",
          "color": "#d71920",
          "coords": [
            [
              41.40825,
              2.18708
            ],
            [
              41.40399,
              2.18789
            ]
          ],
          "stations": [
            {
              "name": "Clot",
              "lat": 41.40825,
              "lng": 2.18708
            },
            {
              "name": "Glories",
              "lat": 41.40399,
              "lng": 2.18789
            }
          ]
        },
        {
          "name": "L1 - Glories -> Urquinaona",
          "color": "#d71920",
          "coords": [
            [
              41.40399,
              2.18789
            ],
            [
              41.4015,
              2.186
            ],
            [
              41.3985,
              2.184
            ],
            [
              41.395,
              2.1822
            ],
            [
              41.39105,
              2.18069
            ],
            [
              41.38957,
              2.17415
            ]
          ],
          "stations": [
            {
              "name": "Glories",
              "lat": 41.40399,
              "lng": 2.18789
            },
            {
              "name": "Arc de Triomf",
              "lat": 41.39105,
              "lng": 2.18069
            },
            {
              "name": "Urquinaona",
              "lat": 41.38957,
              "lng": 2.17415
            }
          ]
        },
        {
          "name": "L4 - Urquinaona -> Jaume I",
          "color": "#f2c500",
          "coords": [
            [
              41.38957,
              2.17415
            ],
            [
              41.38357,
              2.1782
            ]
          ],
          "stations": [
            {
              "name": "Urquinaona",
              "lat": 41.38957,
              "lng": 2.17415
            },
            {
              "name": "Jaume I",
              "lat": 41.38357,
              "lng": 2.1782
            }
          ]
        },
        {
          "name": "L4 - Jaume I -> Urquinaona",
          "color": "#f2c500",
          "coords": [
            [
              41.38357,
              2.1782
            ],
            [
              41.38957,
              2.17415
            ]
          ],
          "stations": [
            {
              "name": "Jaume I",
              "lat": 41.38357,
              "lng": 2.1782
            },
            {
              "name": "Urquinaona",
              "lat": 41.38957,
              "lng": 2.17415
            }
          ]
        },
        {
          "name": "L1 - Urquinaona -> Arc de Triomf",
          "color": "#d71920",
          "coords": [
            [
              41.38957,
              2.17415
            ],
            [
              41.39105,
              2.18069
            ]
          ],
          "stations": [
            {
              "name": "Urquinaona",
              "lat": 41.38957,
              "lng": 2.17415
            },
            {
              "name": "Arc de Triomf",
              "lat": 41.39105,
              "lng": 2.18069
            }
          ]
        },
        {
          "name": "L4 - Barceloneta -> Passeig de Gracia",
          "color": "#f2c500",
          "coords": [
            [
              41.3824,
              2.1854
            ],
            [
              41.38357,
              2.1782
            ],
            [
              41.38957,
              2.17415
            ],
            [
              41.38955,
              2.16735
            ]
          ],
          "stations": [
            {
              "name": "Barceloneta",
              "lat": 41.3824,
              "lng": 2.1854
            },
            {
              "name": "Jaume I",
              "lat": 41.38357,
              "lng": 2.1782
            },
            {
              "name": "Urquinaona",
              "lat": 41.38957,
              "lng": 2.17415
            },
            {
              "name": "Passeig de Gracia",
              "lat": 41.38955,
              "lng": 2.16735
            }
          ]
        },
        {
          "name": "L3 - Passeig de Gracia -> Maria Cristina",
          "color": "#239b56",
          "coords": [
            [
              41.38955,
              2.16735
            ],
            [
              41.38635,
              2.16968
            ],
            [
              41.38122,
              2.17318
            ],
            [
              41.37677,
              2.17502
            ],
            [
              41.37528,
              2.16845
            ],
            [
              41.3742,
              2.15915
            ],
            [
              41.37512,
              2.14932
            ],
            [
              41.37842,
              2.14522
            ],
            [
              41.3791,
              2.14005
            ],
            [
              41.3812,
              2.13588
            ],
            [
              41.3842,
              2.13093
            ],
            [
              41.38855,
              2.1264
            ]
          ],
          "stations": [
            {
              "name": "Passeig de Gracia",
              "lat": 41.38955,
              "lng": 2.16735
            },
            {
              "name": "Catalunya",
              "lat": 41.38635,
              "lng": 2.16968
            },
            {
              "name": "Liceu",
              "lat": 41.38122,
              "lng": 2.17318
            },
            {
              "name": "Drassanes",
              "lat": 41.37677,
              "lng": 2.17502
            },
            {
              "name": "Parallel",
              "lat": 41.37528,
              "lng": 2.16845
            },
            {
              "name": "Poble Sec",
              "lat": 41.3742,
              "lng": 2.15915
            },
            {
              "name": "Espanya",
              "lat": 41.37512,
              "lng": 2.14932
            },
            {
              "name": "Tarragona",
              "lat": 41.37842,
              "lng": 2.14522
            },
            {
              "name": "Sants Estacio",
              "lat": 41.3791,
              "lng": 2.14005
            },
            {
              "name": "Placa del Centre",
              "lat": 41.3812,
              "lng": 2.13588
            },
            {
              "name": "Les Corts",
              "lat": 41.3842,
              "lng": 2.13093
            },
            {
              "name": "Maria Cristina",
              "lat": 41.38855,
              "lng": 2.1264
            }
          ]
        }
      ],
      "walk": [
        [
          [
            41.38605,
            2.12743
          ],
          [
            41.38475,
            2.1276
          ],
          [
            41.3833,
            2.1278
          ]
        ],
        [
          [
            41.40363,
            2.17436
          ],
          [
            41.40435,
            2.17495
          ],
          [
            41.40405,
            2.1761
          ],
          [
            41.4031,
            2.17655
          ],
          [
            41.40255,
            2.17555
          ],
          [
            41.40295,
            2.17455
          ],
          [
            41.40363,
            2.17436
          ]
        ],
        [
          [
            41.40399,
            2.18789
          ],
          [
            41.40355,
            2.1888
          ],
          [
            41.40285,
            2.18855
          ],
          [
            41.4027,
            2.1873
          ],
          [
            41.40345,
            2.1866
          ],
          [
            41.40399,
            2.18789
          ]
        ],
        [
          [
            41.38357,
            2.1782
          ],
          [
            41.3837,
            2.17745
          ],
          [
            41.38396,
            2.1762
          ]
        ],
        [
          [
            41.38396,
            2.1762
          ],
          [
            41.3837,
            2.17745
          ],
          [
            41.38357,
            2.1782
          ]
        ],
        [
          [
            41.39105,
            2.18069
          ],
          [
            41.3902,
            2.182
          ],
          [
            41.38935,
            2.18335
          ],
          [
            41.38855,
            2.1848
          ],
          [
            41.38812,
            2.18745
          ],
          [
            41.3871,
            2.189
          ],
          [
            41.38625,
            2.1911
          ],
          [
            41.3852,
            2.1935
          ],
          [
            41.3852,
            2.2011
          ],
          [
            41.3871,
            2.2023
          ],
          [
            41.39022,
            2.20335
          ],
          [
            41.3891,
            2.2015
          ],
          [
            41.3874,
            2.1995
          ],
          [
            41.3855,
            2.1974
          ],
          [
            41.3835,
            2.1956
          ],
          [
            41.3815,
            2.1938
          ],
          [
            41.37895,
            2.19223
          ]
        ],
        [
          [
            41.37895,
            2.19223
          ],
          [
            41.3802,
            2.1904
          ],
          [
            41.3812,
            2.188
          ],
          [
            41.3824,
            2.1854
          ]
        ],
        [
          [
            41.3884,
            2.12631
          ],
          [
            41.38765,
            2.12655
          ],
          [
            41.3869,
            2.12705
          ],
          [
            41.38605,
            2.12743
          ]
        ]
      ],
      "amenities": [
        {
          "id": "d-taperia",
          "type": "restaurant",
          "name": "La Taperia Barcelona",
          "lat": 41.38371,
          "lng": 2.17857,
          "address": "Placa de l'Angel, 5, Barcelona",
          "note": "PRANZO DOMENICA - prima scelta · Placa de l'Angel 5 · €10-20 · posizione verificata",
          "when": "12:15-13:05",
          "verified": true
        },
        {
          "id": "d-100m",
          "type": "fastfood",
          "name": "100 Montaditos Urquinaona",
          "lat": 41.38955,
          "lng": 2.1741,
          "address": "Placa d'Urquinaona, 1, Barcelona",
          "note": "FAST FOOD SPAGNOLO concordato - facoltativo, direttamente sulla direttrice · €1-10",
          "when": "dopo Cattedrale",
          "verified": true
        },
        {
          "id": "d-taberna",
          "type": "restaurant",
          "name": "La Taberna de la Barceloneta",
          "lat": 41.38015,
          "lng": 2.1892,
          "address": "Carrer d'Andrea Doria, 27, Barcelona",
          "note": "CENA DOMENICA - prima scelta · €10-20",
          "when": "20:30 circa",
          "verified": true
        },
        {
          "id": "d-samsara",
          "type": "restaurant",
          "name": "Samsara Barcelona",
          "lat": 41.38,
          "lng": 2.1885,
          "address": "Carrer de Guitert, 58, Barcelona",
          "note": "CENA DOMENICA - backup · €10-20",
          "when": "backup",
          "verified": true
        },
        {
          "id": "wc-ciuta",
          "type": "wc",
          "name": "WC - Parc de la Ciutadella",
          "lat": 41.3882,
          "lng": 2.1877,
          "address": "Parc de la Ciutadella, Barcelona",
          "note": "Nel parco risultano servizi igienici, inclusi servizi accessibili.",
          "when": "se serve"
        },
        {
          "id": "wc-palau-d",
          "type": "wc",
          "name": "WC pubblico - Pla de Palau",
          "lat": 41.3833,
          "lng": 2.183,
          "address": "Pla de Palau, Barcelona",
          "note": "WC pubblico permanente in Ciutat Vella.",
          "when": "se serve"
        },
        {
          "id": "wc-barcel-d",
          "type": "wc",
          "name": "WC pubblico - Passeig Maritim Barceloneta",
          "lat": 41.3782,
          "lng": 2.1938,
          "address": "Passeig Maritim de la Barceloneta, Barcelona",
          "note": "WC pubblico / servizio spiaggia nell'area Barceloneta.",
          "when": "se serve"
        }
      ],
      "walkRoutes": [
        {
          "name": "Hotel -> Les Corts metro",
          "points": [
            [
              41.3863149,
              2.1293222
            ],
            [
              41.3842,
              2.13093
            ]
          ]
        },
        {
          "name": "Giro esterno Sagrada Familia",
          "points": [
            [
              41.40363,
              2.17436
            ],
            [
              41.40435,
              2.17495
            ],
            [
              41.40405,
              2.1761
            ],
            [
              41.4031,
              2.17655
            ],
            [
              41.40255,
              2.17555
            ],
            [
              41.40363,
              2.17436
            ]
          ]
        },
        {
          "name": "Glories -> Torre Glories -> Disseny Hub",
          "points": [
            [
              41.40399,
              2.18789
            ],
            [
              41.40355,
              2.1888
            ],
            [
              41.40285,
              2.18855
            ],
            [
              41.40399,
              2.18789
            ]
          ]
        },
        {
          "name": "Jaume I -> pranzo -> Cattedrale",
          "points": [
            [
              41.38357,
              2.1782
            ],
            [
              41.38371,
              2.17857
            ],
            [
              41.38396,
              2.1762
            ]
          ]
        },
        {
          "name": "Arc -> Ciutadella -> Port Olimpic -> Nova Icaria -> Barceloneta",
          "points": [
            [
              41.39105,
              2.18069
            ],
            [
              41.38812,
              2.18745
            ],
            [
              41.3852,
              2.2011
            ],
            [
              41.39022,
              2.20335
            ],
            [
              41.37895,
              2.19223
            ]
          ]
        },
        {
          "name": "Barceloneta -> metro",
          "points": [
            [
              41.37895,
              2.19223
            ],
            [
              41.3824,
              2.1854
            ]
          ]
        },
        {
          "name": "Maria Cristina -> hotel",
          "points": [
            [
              41.38855,
              2.1264
            ],
            [
              41.3863149,
              2.1293222
            ]
          ]
        }
      ]
    },
    {
      "id": "lunedi",
      "label": "Lun 21",
      "title": "Lunedi 21 settembre",
      "subtitle": "Check-out, Camp Nou esterno e aeroporto",
      "stops": [
        {
          "id": "l-hotel",
          "kind": "hotel",
          "icon": "H",
          "name": "Hotel - check-out",
          "time": "09:15-09:30",
          "lat": 41.3863149,
          "lng": 2.1293222,
          "description": "Colazione tranquilla, check-out e partenza con i tre zaini. Non si torna piu in hotel.",
          "cost": "HOTEL"
        },
        {
          "id": "l-campnou",
          "n": 1,
          "name": "Camp Nou",
          "time": "09:30-10:10 circa",
          "lat": 41.3809,
          "lng": 2.12283,
          "description": "Giro esterno e fotografie per circa 30-40 minuti, senza tour interno.",
          "cost": "GRATIS - esterno",
          "audios": "campnou"
        },
        {
          "id": "l-collblanc",
          "kind": "metro",
          "icon": "M",
          "name": "Collblanc L9 Sud",
          "time": "circa 10:10",
          "lat": 41.37575,
          "lng": 2.1191,
          "description": "Dal Camp Nou raggiungere a piedi Collblanc.",
          "transit": "L9 Sud direzione Aeroport T1, senza altri cambi. Scendere ad Aeroport T2.",
          "cost": "TRASPORTO"
        },
        {
          "id": "l-airport",
          "kind": "logistic",
          "icon": "✈",
          "name": "Aeroport Barcelona T2",
          "time": "10:50-11:00",
          "lat": 41.30385,
          "lng": 2.07428,
          "description": "Arrivo al Terminal 2 con circa due ore di margine prima del volo delle 13:05.",
          "cost": "AEROPORTO"
        }
      ],
      "metro": [
        {
          "name": "L9 Sud - Collblanc -> Aeroport T2",
          "color": "#f28c28",
          "coords": [
            [
              41.37575,
              2.1191
            ],
            [
              41.37,
              2.112
            ],
            [
              41.363,
              2.104
            ],
            [
              41.355,
              2.096
            ],
            [
              41.346,
              2.0885
            ],
            [
              41.337,
              2.0815
            ],
            [
              41.328,
              2.0765
            ],
            [
              41.319,
              2.0735
            ],
            [
              41.3105,
              2.073
            ],
            [
              41.30385,
              2.07428
            ]
          ],
          "stations": [
            {
              "name": "Collblanc",
              "lat": 41.37575,
              "lng": 2.1191
            },
            {
              "name": "Aeroport T2",
              "lat": 41.30385,
              "lng": 2.07428
            }
          ]
        }
      ],
      "walk": [
        [
          [
            41.38605,
            2.12743
          ],
          [
            41.3809,
            2.12283
          ],
          [
            41.37561,
            2.11847
          ]
        ]
      ],
      "amenities": [
        {
          "id": "l-fast-camp",
          "type": "fastfood",
          "name": "Fast food - area Camp Nou / Collblanc",
          "lat": 41.3764,
          "lng": 2.1197,
          "address": "Collblanc, Barcelona",
          "note": "Punto opzionale: NON e una sosta prevista dalla guida. Usare solo se serve prima della L9 Sud.",
          "when": "eventuale",
          "verified": false
        },
        {
          "id": "l-fast-t2",
          "type": "fastfood",
          "name": "Fast food / ristoro - Aeroport T2",
          "lat": 41.30385,
          "lng": 2.07428,
          "address": "Barcelona El Prat Airport Terminal 2",
          "note": "Opzione pratica dopo l'arrivo al Terminal 2; scelta sul posto.",
          "when": "prima del volo",
          "verified": false
        },
        {
          "id": "wc-airport",
          "type": "wc",
          "name": "WC - Aeroport T2",
          "lat": 41.30385,
          "lng": 2.07428,
          "address": "Barcelona El Prat Airport Terminal 2",
          "note": "Servizi igienici disponibili in aeroporto.",
          "when": "arrivo T2"
        }
      ],
      "walkRoutes": [
        {
          "name": "Hotel -> Camp Nou -> Collblanc",
          "points": [
            [
              41.3863149,
              2.1293222
            ],
            [
              41.3809,
              2.12283
            ],
            [
              41.37575,
              2.1191
            ]
          ]
        }
      ]
    }
  ],
  "extras": [
    {
      "name": "Arenas de Barcelona",
      "audios": "arenas"
    },
    {
      "name": "Placa Espanya",
      "audios": "espanya"
    },
    {
      "name": "Font Magica e Montjuic",
      "audios": "fontmagica"
    },
    {
      "name": "Palau Nacional",
      "audios": "palau"
    }
  ]
};
const AUDIO_LIBRARY={
  "pedrera": [
    {
      "title": "LA PEDRERA 00 COMPLETA",
      "file": "audio/La Pedrera/LA PEDRERA 00 COMPLETA.mp3"
    }
  ],
  "catalunya": [
    {
      "title": "00A - Introduzione a Placa de Catalunya",
      "file": "audio/Placa de Catalunya/00A - Introduzione a Placa de Catalunya.mp3"
    },
    {
      "title": "00B - Come nasce la piazza",
      "file": "audio/Placa de Catalunya/00B - Come nasce la piazza.mp3"
    },
    {
      "title": "00C - Guardiamoci intorno",
      "file": "audio/Placa de Catalunya/00C - Guardiamoci intorno.mp3"
    },
    {
      "title": "00D - Statue fontane e monumenti",
      "file": "audio/Placa de Catalunya/00D - Statue fontane e monumenti.mp3"
    },
    {
      "title": "00E - Il cuore moderno di Barcellona",
      "file": "audio/Placa de Catalunya/00E - Il cuore moderno di Barcellona.mp3"
    },
    {
      "title": "00F - Verso la Barcellona antica",
      "file": "audio/Placa de Catalunya/00F - Verso la Barcellona antica.mp3"
    }
  ],
  "rambla": [
    {
      "title": "00A - Introduzione a La Rambla",
      "file": "audio/La Rambla/00A - Introduzione a La Rambla.mp3"
    },
    {
      "title": "00B - Da Placa de Catalunya alla Rambla alta",
      "file": "audio/La Rambla/00B - Da Placa de Catalunya alla Rambla alta.mp3"
    },
    {
      "title": "00C - Font de Canaletes",
      "file": "audio/La Rambla/00C - Font de Canaletes.mp3"
    },
    {
      "title": "00D - Passeggiando verso la Boqueria",
      "file": "audio/La Rambla/00D - Passeggiando verso la Boqueria.mp3"
    },
    {
      "title": "00E - Mercat de la Boqueria",
      "file": "audio/La Rambla/00E - Mercat de la Boqueria.mp3"
    },
    {
      "title": "00F - Il mosaico di Joan Miro",
      "file": "audio/La Rambla/00F - Il mosaico di Joan Miro.mp3"
    },
    {
      "title": "00G - Gran Teatre del Liceu",
      "file": "audio/La Rambla/00G - Gran Teatre del Liceu.mp3"
    },
    {
      "title": "00H - Dalla Rambla a Placa Reial e ritorno",
      "file": "audio/La Rambla/00H - Dalla Rambla a Placa Reial e ritorno.mp3"
    },
    {
      "title": "00I - La Rambla bassa",
      "file": "audio/La Rambla/00I - La Rambla bassa.mp3"
    },
    {
      "title": "00L - Cristoforo Colombo e la fine della Rambla",
      "file": "audio/La Rambla/00L - Cristoforo Colombo e la fine della Rambla.mp3"
    }
  ],
  "boqueria": [
    {
      "title": "00A - Introduzione alla Boqueria",
      "file": "audio/Mercat de la Boqueria/00A - Introduzione alla Boqueria.mp3"
    },
    {
      "title": "00B - La storia del mercato",
      "file": "audio/Mercat de la Boqueria/00B - La storia del mercato.mp3"
    },
    {
      "title": "00C - Entriamo nella Boqueria",
      "file": "audio/Mercat de la Boqueria/00C - Entriamo nella Boqueria.mp3"
    },
    {
      "title": "00D - Passeggiando tra i banchi",
      "file": "audio/Mercat de la Boqueria/00D - Passeggiando tra i banchi.mp3"
    },
    {
      "title": "00E - Sapori della Catalogna",
      "file": "audio/Mercat de la Boqueria/00E - Sapori della Catalogna.mp3"
    },
    {
      "title": "00F - La Boqueria dei barcellonesi",
      "file": "audio/Mercat de la Boqueria/00F - La Boqueria dei barcellonesi.mp3"
    },
    {
      "title": "00G - Ultimo sguardo e ritorno sulla Rambla",
      "file": "audio/Mercat de la Boqueria/00G - Ultimo sguardo e ritorno sulla Rambla.mp3"
    }
  ],
  "reial": [
    {
      "title": "PLACA REIAL",
      "file": "audio/Placa Reial/PLACA REIAL.mp3"
    }
  ],
  "gotic": [
    {
      "title": "00A - Introduzione al Barri Gotic",
      "file": "audio/Barri Gotic/00A - Introduzione al Barri Gotic.mp3"
    },
    {
      "title": "00B - Da Placa Reial entriamo nel Barri Gotic",
      "file": "audio/Barri Gotic/00B - Da Placa Reial entriamo nel Barri Gotic.mp3"
    },
    {
      "title": "00C - Camminando nel Barri Gotic",
      "file": "audio/Barri Gotic/00C - Camminando nel Barri Gotic.mp3"
    },
    {
      "title": "00D - Placa Sant Jaume",
      "file": "audio/Barri Gotic/00D - Placa Sant Jaume.mp3"
    },
    {
      "title": "00E - Dal Barri Gotic verso El Born",
      "file": "audio/Barri Gotic/00E - Dal Barri Gotic verso El Born.mp3"
    }
  ],
  "portvell": [
    {
      "title": "PORT VELL E MONUMENTO A COLOMBO",
      "file": "audio/Port Vell e Monumento a Colombo/PORT VELL E MONUMENTO A COLOMBO.mp3"
    }
  ],
  "barceloneta": [
    {
      "title": "00A - Dal Port Vell alla Barceloneta",
      "file": "audio/Barceloneta/00A - Dal Port Vell alla Barceloneta.mp3"
    },
    {
      "title": "00B - Benvenuti alla Barceloneta",
      "file": "audio/Barceloneta/00B - Benvenuti alla Barceloneta.mp3"
    },
    {
      "title": "00C - Come nasce il quartiere",
      "file": "audio/Barceloneta/00C - Come nasce il quartiere.mp3"
    },
    {
      "title": "00D - Le strade della Barceloneta",
      "file": "audio/Barceloneta/00D - Le strade della Barceloneta.mp3"
    },
    {
      "title": "00E - Un quartiere di pescatori e operai",
      "file": "audio/Barceloneta/00E - Un quartiere di pescatori e operai.mp3"
    },
    {
      "title": "00F - Verso il mare",
      "file": "audio/Barceloneta/00F - Verso il mare.mp3"
    },
    {
      "title": "00G - La spiaggia della Barceloneta",
      "file": "audio/Barceloneta/00G - La spiaggia della Barceloneta.mp3"
    },
    {
      "title": "00H - Barcellona e il Mediterraneo",
      "file": "audio/Barceloneta/00H - Barcellona e il Mediterraneo.mp3"
    }
  ],
  "sagrada": [
    {
      "title": "00 - Introduzione alla Sagrada Familia",
      "file": "audio/Sagrada_familia/00_Sagrada_Familia_Introduzione.mp3"
    },
    {
      "title": "01 - Arrivo alla Sagrada Familia",
      "file": "audio/Sagrada_familia/01_Arrivo_Sagrada_Familia.mp3"
    },
    {
      "title": "02 - Facciata della Nativita",
      "file": "audio/Sagrada_familia/02_La_Facciata_della_Nativita.mp3"
    },
    {
      "title": "03 - Caccia ai particolari",
      "file": "audio/Sagrada_familia/03_La_Caccia_ai_Particolari.mp3"
    },
    {
      "title": "04 - Abside: la Sagrada cambia forma",
      "file": "audio/Sagrada_familia/04_Abside_La_Sagrada_Cambia_forma.mp3"
    },
    {
      "title": "05 - Facciata della Passione",
      "file": "audio/Sagrada_familia/05_Passione.mp3"
    },
    {
      "title": "06 - Quadrato Magico",
      "file": "audio/Sagrada_familia/06_Giuda_Quadrato_Magico.mp3"
    },
    {
      "title": "07 - Ultimo sguardo",
      "file": "audio/Sagrada_familia/07_Ultimo_Sguardo.mp3"
    }
  ],
  "cattedrale": [
    {
      "title": "00A - Verso la Cattedrale",
      "file": "audio/Cattedrale di Barcellona/00A - Verso la Cattedrale 2.mp3"
    },
    {
      "title": "00B - Una storia lunga secoli",
      "file": "audio/Cattedrale di Barcellona/00B - Una storia lunga secoli.mp3"
    },
    {
      "title": "00C - Davanti alla Cattedrale",
      "file": "audio/Cattedrale di Barcellona/00C - Davanti alla Cattedrale.mp3"
    },
    {
      "title": "00D - Prima di entrare",
      "file": "audio/Cattedrale di Barcellona/00D - Prima di entrare.mp3"
    }
  ],
  "arc": [
    {
      "title": "00A - Arriviamo all Arc de Triomf",
      "file": "audio/Arc de Triomf/00A - Arriviamo all Arc de Triomf.mp3"
    },
    {
      "title": "00B - L Esposizione Universale del 1888",
      "file": "audio/Arc de Triomf/00B - L Esposizione Universale del 1888.mp3"
    },
    {
      "title": "00C - Osserviamo l Arc de Triomf",
      "file": "audio/Arc de Triomf/00C - Osserviamo l Arc de Triomf.mp3"
    },
    {
      "title": "00D - I simboli e le decorazioni",
      "file": "audio/Arc de Triomf/00D - I simboli e le decorazioni.mp3"
    },
    {
      "title": "00E - Attraversiamo l Arc de Triomf",
      "file": "audio/Arc de Triomf/00E - Attraversiamo l Arc de Triomf.mp3"
    },
    {
      "title": "00F - Passeig de Lluis Companys e prosecuzione",
      "file": "audio/Arc de Triomf/00F - Passeig de Lluis Companys e prosecuzione.mp3"
    }
  ],
  "ciutadella": [
    {
      "title": "00A - Dall Arc de Triomf al Parc de la Ciutadella",
      "file": "audio/Parc de la Ciutadella/00A - Dall Arc de Triomf al Parc de la Ciutadella.mp3"
    },
    {
      "title": "00B - Benvenuti al Parc de la Ciutadella",
      "file": "audio/Parc de la Ciutadella/00B - Benvenuti al Parc de la Ciutadella.mp3"
    },
    {
      "title": "00C - Da fortezza militare a parco pubblico",
      "file": "audio/Parc de la Ciutadella/00C - Da fortezza militare a parco pubblico.mp3"
    },
    {
      "title": "00D - L Esposizione Universale del 1888",
      "file": "audio/Parc de la Ciutadella/00D - L Esposizione Universale del 1888.mp3"
    },
    {
      "title": "00E - Castell dels Tres Dragons e edifici storici",
      "file": "audio/Parc de la Ciutadella/00E - Il Castell dels Tres Dragons e gli edifici storici.mp3"
    },
    {
      "title": "00F - Il lago e il mammut",
      "file": "audio/Parc de la Ciutadella/00F - Il lago e il mammut.mp3"
    },
    {
      "title": "00G - La Cascada Monumental",
      "file": "audio/Parc de la Ciutadella/00G - La Cascada Monumental.mp3"
    },
    {
      "title": "00H - Il Parlamento della Catalogna e il parco di oggi",
      "file": "audio/Parc de la Ciutadella/00H - Il Parlamento della Catalogna e il parco di oggi.mp3"
    },
    {
      "title": "00I - Lasciamo il Parc de la Ciutadella",
      "file": "audio/Parc de la Ciutadella/00I - Lasciamo il Parc de la Ciutadella.mp3"
    }
  ],
  "campnou": [
    {
      "title": "00A - Introduzione al Camp Nou",
      "file": "audio/Camp Nou/00A - Introduzione al Camp Nou.mp3"
    },
    {
      "title": "00B - La nascita del Camp Nou",
      "file": "audio/Camp Nou/00B - La nascita del Camp Nou.mp3"
    },
    {
      "title": "00C - Uno stadio diventato leggenda",
      "file": "audio/Camp Nou/00C - Uno stadio diventato leggenda.mp3"
    },
    {
      "title": "00D - Mes que un club",
      "file": "audio/Camp Nou/00D - Mes que un club.mp3"
    },
    {
      "title": "00E - I grandi campioni",
      "file": "audio/Camp Nou/00E - I grandi campioni.mp3"
    },
    {
      "title": "00F - Il nuovo Camp Nou",
      "file": "audio/Camp Nou/00F - Il nuovo Camp Nou.mp3"
    },
    {
      "title": "00G - Guardiamo il Camp Nou",
      "file": "audio/Camp Nou/00G - Guardiamo il Camp Nou.mp3"
    },
    {
      "title": "00H - Dal Camp Nou verso laeroporto",
      "file": "audio/Camp Nou/00H - Dal Camp Nou verso laeroporto.mp3"
    }
  ],
  "arenas": [
    {
      "title": "ARENAS_DE_BARCELONA_00",
      "file": "audio/Arenas de Barcelona/ARENAS_DE_BARCELONA_00.mp3"
    },
    {
      "title": "ARENAS_TERRAZZA_00G - Inizio del giro panoramico",
      "file": "audio/Arenas de Barcelona/ARENAS_TERRAZZA_00G - Inizio del giro panoramico.mp3"
    },
    {
      "title": "ARENAS_TERRAZZA_00H - Montjuic e il Palau Nacional",
      "file": "audio/Arenas de Barcelona/ARENAS_TERRAZZA_00H - Montjuic e il Palau Nacional.mp3"
    },
    {
      "title": "ARENAS_TERRAZZA_00I - Verso il centro di Barcellona",
      "file": "audio/Arenas de Barcelona/ARENAS_TERRAZZA_00I - Verso il centro di Barcellona.mp3"
    },
    {
      "title": "ARENAS_TERRAZZA_00J - Tibidabo Sants e conclusione",
      "file": "audio/Arenas de Barcelona/ARENAS_TERRAZZA_00J - Tibidabo Sants e conclusione.mp3"
    }
  ],
  "fontmagica": [
    {
      "title": "FONT_MAGICA_MONTJUIC_00_PERCORSO",
      "file": "audio/Font Magica e Montjuic/FONT_MAGICA_MONTJUIC_00_PERCORSO.mp3"
    },
    {
      "title": "FONT_MAGICA_MONTJUIC_00F - Il panorama di Barcellona da Montjuic",
      "file": "audio/Font Magica e Montjuic/FONT_MAGICA_MONTJUIC_00F - Il panorama di Barcellona da Montjuic.mp3"
    },
    {
      "title": "FONT_MAGICA_MONTJUIC_00F-2 - Guardiamo oltre Placa dEspanya",
      "file": "audio/Font Magica e Montjuic/FONT_MAGICA_MONTJUIC_00F-2 - Guardiamo oltre Placa dEspanya.mp3"
    },
    {
      "title": "FONT_MAGICA_MONTJUIC_00F-3 - Tibidabo e la citta tra due montagne",
      "file": "audio/Font Magica e Montjuic/FONT_MAGICA_MONTJUIC_00F-3 - Tibidabo e la citta tra due montagne.mp3"
    },
    {
      "title": "FONT_MAGICA_MONTJUIC_04_CONCLUSIONE",
      "file": "audio/Font Magica e Montjuic/FONT_MAGICA_MONTJUIC_04_CONCLUSIONE.mp3"
    }
  ],
  "palau": [
    {
      "title": "01 - Palau Nacional",
      "file": "audio/Palau Nacional/01 - Palau Nacional.mp3"
    },
    {
      "title": "02 - La terrazza panoramica",
      "file": "audio/Palau Nacional/02 - La terrazza panoramica.mp3"
    },
    {
      "title": "03 - Barcellona davanti a noi",
      "file": "audio/Palau Nacional/03 - Barcellona davanti a noi.mp3"
    },
    {
      "title": "04 - Proseguiamo su Montjuic",
      "file": "audio/Palau Nacional/04 - Proseguiamo su Montjuic.mp3"
    }
  ],
  "espanya": [
    {
      "title": "00_PLACA_ESPANYA",
      "file": "audio/PLACA ESPANYA/00_PLACA_ESPANYA.mp3"
    }
  ]
};