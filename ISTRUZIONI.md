# Come si aggiorna Frontiere

Questa è la procedura da seguire, dall'inizio alla fine, ogni volta che un'attività pianificata di Claude aggiorna il
sito. Il titolare è Michele: non è un tecnico e legge in italiano. Tutto ciò che si scrive (rapporti, messaggi dei
commit, messaggio finale) è in italiano semplice.

## Com'è fatto

- `sito/` è il sito pubblicato da Netlify così com'è (nessuna costruzione). `sito/index.html` è tutta l'app.
- I rapporti sono file JSON, uno per periodo:
  - `sito/data/giorni/AAAA-MM-GG.json` (tipo `giorno`)
  - `sito/data/mesi/AAAA-MM.json` (tipo `mese`)
  - `sito/data/anni/AAAA.json` (tipo `anno`)
- `sito/data/indice.json` e `sito/data/archivio/` **non si scrivono a mano**: li rifà `node scripts/indice.mjs`, che
  prima controlla tutti i rapporti e, se trova un errore, lo spiega e non cambia nulla.
- Un rapporto già pubblicato non si cancella e non si riscrive: l'archivio deve restare. Si corregge solo un errore
  di fatto, dicendolo nel messaggio finale.

## Forma di un rapporto

```json
{
  "tipo": "giorno",
  "periodo": "2026-11-12",
  "apertura": "Solo per mese e anno: il quadro generale, 2-4 paragrafi separati da una riga vuota.",
  "sezioni": {
    "tecnologia": { "sintesi": "Solo per mese e anno: il filo della sezione.", "articoli": [ ARTICOLO, ... ] },
    "medicina":   { "articoli": [] },
    "scienza":    { "articoli": [] },
    "ai":         { "articoli": [] }
  }
}
```

Un ARTICOLO:

```json
{
  "titolo": "Chiaro e concreto, senza clamore",
  "quando": "Solo per mese e anno: la data del fatto, es. «14 ottobre 2026»",
  "testo": "Il riassunto dettagliato: 3-5 paragrafi separati da una riga vuota (\\n\\n).",
  "perche": "Perché conta: una o due frasi.",
  "fonti": [ { "nome": "Nature", "url": "https://…" } ],
  "parole": ["da 3 a 8 parole chiave per la ricerca"]
}
```

Le quattro sezioni ci sono sempre. In un giorno senza novità di rilievo una sezione può avere `"articoli": []`:
meglio niente che un riempitivo.

## Come si scrive

- **Dettagliato, non corto.** Ogni `testo` ha da 1.200 a 2.500 caratteri: che cosa è stato scoperto o annunciato, chi
  l'ha fatto, come funziona, i numeri principali, i limiti e che cosa manca ancora. Chi legge non deve aver bisogno
  di aprire la fonte per capire.
- **Con parole proprie.** Mai copiare frasi dalle fonti, nemmeno tradotte; niente citazioni lunghe. Le fonti si
  indicano con il link.
- **Solo fatti verificati.** Ogni notizia va letta alla fonte (lo studio, il comunicato, l'articolo), non dedotta da
  un titolo. Dove si può, tra le fonti c'è quella originale (articolo scientifico, annuncio ufficiale) oltre al
  giornale. Niente che non si riesca a verificare; nessun link inventato: ogni `url` è una pagina aperta davvero.
- **Dire che cos'è.** Studio pubblicato dopo revisione, preprint, annuncio di un'azienda, prova su animali, fase 1/2/3
  con quanti pazienti: va scritto, perché cambia quanto ci si può fidare.
- **Niente clamore.** «Rivoluzionario» solo se lo è. Per la medicina: nessun consiglio di cura.
- **Innovazioni, non cronaca.** Scoperte, risultati, prodotti e tecnologie nuove. Non borsa, nomine, polemiche,
  indiscrezioni, a meno che cambino davvero la direzione di un settore.
- Parole chiave: i nomi con cui Michele cercherebbe la notizia (tecnologia, malattia, azienda, strumento), in italiano
  più i termini inglesi d'uso (es. «CRISPR», «LLM»).

## Dove si cerca

Sono i punti di partenza, non un recinto: se la notizia importante è altrove, si va lì.

- **Tecnologia:** MIT Technology Review, IEEE Spectrum, Ars Technica, Wired, The Verge, TechCrunch, Nature Electronics.
- **Medicina:** New England Journal of Medicine, The Lancet, JAMA, BMJ, Nature Medicine, STAT, comunicati di FDA ed EMA.
- **Scienza:** Nature, Science, PNAS, Cell, Physical Review Letters, Quanta Magazine, New Scientist, Scientific American,
  NASA, ESA, CERN.
- **AI:** blog e articoli di ricerca dei laboratori (Anthropic, Google DeepMind, OpenAI, Meta AI, Mistral), arXiv,
  Nature Machine Intelligence, MIT Technology Review, The Batch, Import AI, Stanford HAI.

## Aggiornamento di ogni giorno

1. La data è quella di oggi a Roma. Se `sito/data/giorni/<oggi>.json` c'è già, non si rifà: ci si ferma dicendolo.
2. Leggere i titoli degli ultimi 5 giorni per non ripetere notizie già date (un seguito importante sì, dicendo che
   cosa c'è di nuovo).
3. Cercare, sezione per sezione, le novità delle ultime 24-48 ore. Scegliere le più importanti: di solito 2-4 per
   sezione.
4. Scrivere `sito/data/giorni/<oggi>.json`.
5. Fare la «Chiusura» qui sotto.

## Report del mese (il primo del mese, per il mese appena finito)

1. Se `sito/data/mesi/<mese>.json` c'è già, fermarsi.
2. Rileggere tutti i giorni di quel mese e fare una ricerca in più per controllare che non manchi nulla di grosso.
3. Scegliere le cose più importanti, innovative e dirompenti: 5-8 articoli per sezione, dal più importante. Ogni
   articolo è riscritto con il senno di poi (che cosa è successo dopo, che peso ha avuto), non copiato dal giorno.
4. `apertura`: il mese in 2-4 paragrafi. `sintesi` di ogni sezione: il filo che lega le notizie.
5. A gennaio, dopo il mese di dicembre, fare anche il **report dell'anno** appena finito in `sito/data/anni/<anno>.json`:
   si parte dai dodici report mensili, 8-12 articoli per sezione, `apertura` di 4-6 paragrafi che dice che anno è
   stato e che cosa lascia.
6. «Chiusura».

## Storico (i due anni passati)

`storico/da-fare.json` elenca i periodi ancora da scrivere, dal più recente.

1. Se l'elenco è vuoto: lo storico è finito. Dirlo nel messaggio finale, ricordando a Michele che può spegnere
   l'attività «Frontiere – storico», e fermarsi.
2. Prendere i **primi 2** periodi dell'elenco (un anno conta per 2: in quel giro si fa solo l'anno). Un anno si scrive
   solo se i suoi mesi presenti in elenco sono già fatti; altrimenti si passa al mese successivo.
3. Per ogni periodo, cercare che cosa è successo allora in ogni sezione (rassegne di fine mese e fine anno delle
   riviste, più le fonti originali) e scrivere il report con le stesse regole di qui sopra. Valgono solo fatti di quel
   periodo, con fonti; nel `testo` si può dire, quando si sa, come è andata a finire.
4. Togliere dall'elenco i periodi fatti e fare la «Chiusura».

## Chiusura (sempre)

1. `node scripts/indice.mjs` deve dire «Tutto a posto». Se elenca errori, correggerli nei rapporti.
2. `npm test` deve passare.
3. Un solo commit, con un messaggio tipo «Aggiornamento del 12 novembre 2026», poi `git push origin main`
   (Netlify pubblica da solo). Prima del push: `git pull --rebase origin main`.
   Se nel frattempo un'altra attività ha pubblicato e `indice.json` o `archivio/` vanno in conflitto: tenere i
   rapporti di entrambe, rifare `node scripts/indice.mjs` e chiudere il rebase con i file rigenerati.
4. Se il push su `main` viene rifiutato: spingere un ramo `aggiornamento-<periodo>`, aprire una pull request con
   `gh api` e unirla con `gh api -X PUT repos/<proprietario>/<repo>/pulls/<numero>/merge`. Se nemmeno questo riesce,
   lasciare la pull request aperta e dirlo.
5. Messaggio finale per Michele, breve: che cosa è stato pubblicato (i titoli, per sezione) e, se qualcosa non è
   riuscito, che cosa serve per sbloccarlo.

Non si tocca altro: né `sito/index.html`, né gli script, né questa procedura, a meno che Michele lo chieda.
