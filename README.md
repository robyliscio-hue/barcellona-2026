# Prototipo Barcellona 2026 – Sabato 19

## Prova veloce su PC
Aprire `index.html` con un browser connesso a Internet.
La cartografia Leaflet/OpenStreetMap viene caricata online.

Nota: la geolocalizzazione funziona correttamente soprattutto quando il sito è servito in HTTPS
(per esempio da GitHub Pages), non sempre aprendo direttamente il file locale.

## Pubblicazione su GitHub Pages
1. Crea un repository, per esempio `barcellona-2026`.
2. Copia tutti i file e le cartelle di questo ZIP nella root del repository.
3. Commit + push su `main`.
4. GitHub → Settings → Pages.
5. Source: Deploy from a branch.
6. Branch: `main`, cartella `/ (root)`.
7. Salva.

## Collegare gli MP3
Copia i file nella cartella `audio/` con i nomi indicati in `js/tappe.js`.

Esempio:
- `audio/la-pedrera.mp3`
- `audio/casa-batllo.mp3`

Puoi anche cambiare il nome del file direttamente nel campo `audio` della tappa.

## Aggiungere le foto
Copia le immagini nella cartella `img/` con i nomi predisposti:
- `pedrera.jpg`
- `casa-batllo.jpg`
- `camp-nou.jpg`
- ecc.

Finché una foto non esiste, compare automaticamente un riquadro segnaposto.

## Privacy
`index.html` contiene:
`<meta name="robots" content="noindex,nofollow,noarchive">`

Questo chiede ai motori di ricerca di non indicizzare il sito, ma GitHub Pages resta tecnicamente pubblico:
chi possiede l'URL può aprirlo.
