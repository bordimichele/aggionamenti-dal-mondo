# Regole per lavorare su questo progetto

- L'utente parla italiano e non scrive codice: testi dell'app, commenti, commit e messaggi in italiano semplice.
- Gli aggiornamenti dei contenuti (giorni, mesi, anni, storico) seguono `ISTRUZIONI.md` e vanno direttamente su `main`.
- `sito/data/indice.json` e `sito/data/archivio/` li scrive solo `node scripts/indice.mjs`.
- I rapporti pubblicati sono l'archivio dell'utente: non si cancellano e non si riscrivono.
- Le modifiche all'app (`sito/index.html`, `scripts/`) si provano con `npm test` e aprendo il sito su uno schermo da
  telefono prima di pubblicare. Nessun framework, nessuna costruzione, nessuna chiave.
- L'app legge i dati da GitHub (`raw.githubusercontent.com`, `FONTI_DATI` in `sito/index.html`), con riserva sulla copia
  del sito: per questo **il repository deve restare pubblico**. Netlify salta la pubblicazione quando cambiano solo i
  dati (`ignore` in `netlify.toml`): ogni pubblicazione costa 15 crediti.
- La cartella `almanacco/` contiene la rassegna quotidiana dell'Almanacco (un'altra app): ha la sua procedura in
  `almanacco/ISTRUZIONI.md`.
