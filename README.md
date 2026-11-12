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
| Frontiere – storico | ogni poche ore, finché serve | scrive i report dei due anni passati; poi si può spegnere |

Ogni attività salva i rapporti in questo repository; Netlify pubblica il sito da solo a ogni salvataggio.
La procedura che Claude segue è in [`ISTRUZIONI.md`](ISTRUZIONI.md): per cambiare fonti, lunghezza o stile dei
riassunti basta chiederlo a Claude, che aggiorna quel file.

## Netlify

Collegare il repository a un sito Netlify nuovo: le impostazioni sono già in `netlify.toml` (cartella pubblicata:
`sito`, nessun comando).

## Sul computer

```sh
npm test          # controlla lo script dell'indice
npm run indice    # controlla i rapporti e rifà indice e archivio
```
