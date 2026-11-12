# Frontiere

Un sito personale che ogni giorno raccoglie e riassume le novità di **tecnologia, medicina, scienza e AI**, con il
report del mese, il report dell'anno e un archivio in cui cercare per parole chiave.

- **Oggi**: i riassunti del giorno, sezione per sezione (con le frecce si torna ai giorni passati).
- **Mese** e **Anno**: le cose più importanti e dirompenti del periodo.
- **Archivio**: tutti gli articoli di tutti i report, con la barra di ricerca. Toccando una parola chiave sotto un
  articolo si cercano gli altri sullo stesso tema.

## Come funziona

Le ricerche le fa Claude con le attività pianificate (nessuna chiave, nessun costo oltre all'abbonamento):

| Attività | Quando | Cosa fa |
|---|---|---|
| Frontiere – ogni giorno | ogni mattina | cerca le novità e scrive il giorno |
| Frontiere – report del mese | il primo del mese | scrive il report del mese finito; a gennaio anche quello dell'anno |

Ogni attività salva i rapporti in questo repository e l'app li legge direttamente da qui (per questo il repository è
pubblico: contiene solo notizie). Netlify ripubblica il sito solo quando cambia l'app, non a ogni rapporto: ogni
pubblicazione costa 15 crediti Netlify e il piano gratuito ne ha 300 al mese.

Lo storico dei due anni passati (`storico/da-fare.json`, parte «Storico» di `ISTRUZIONI.md`) è in pausa: l'attività
che lo scriveva è stata eliminata. Per riprenderlo basta chiederlo a Claude.
La procedura che Claude segue è in [`ISTRUZIONI.md`](ISTRUZIONI.md): per cambiare fonti, lunghezza o stile dei
riassunti basta chiederlo a Claude, che aggiorna quel file.

## Netlify

Le impostazioni sono in `netlify.toml` (cartella pubblicata: `sito`, nessun comando, salta le pubblicazioni dei soli
dati).

## La rassegna dell'Almanacco

La cartella `almanacco/notizie/` contiene la rassegna quotidiana della sezione Notizie del «Mio Almanacco», scritta
dall'attività «Almanacco – rassegna del giorno» secondo `almanacco/ISTRUZIONI.md`. L'Almanacco la legge da qui.

## Sul computer

```sh
npm test          # controlla lo script dell'indice
npm run indice    # controlla i rapporti e rifà indice e archivio
```
