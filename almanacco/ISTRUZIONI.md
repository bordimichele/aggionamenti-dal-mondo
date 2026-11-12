# La rassegna del giorno dell'Almanacco

Questa è la procedura dell'attività «Almanacco – rassegna del giorno». Scrive ogni mattina la rassegna della sezione
Notizie del «Mio Almanacco», l'app personale di Michele, che la legge da questa cartella. Michele non è un tecnico e
legge in italiano: tutto ciò che si scrive (rassegna, messaggio del commit, messaggio finale) è in italiano semplice.

Si lavora **solo** in `almanacco/notizie/`. Il resto del repository è un altro sito (Frontiere): non si tocca.

## Le cinque categorie e le fonti

Sono le categorie e i giornali che l'Almanacco usa da sempre. **Si scrive solo a partire da questi giornali** e ogni
link punta a uno di loro. Per vedere che cosa hanno pubblicato di recente, aprire i loro feed (indirizzi qui sotto),
poi leggere gli articoli.

| Categoria (`chiave`) | Giornali e feed |
|---|---|
| Italia (`italia`) | ANSA ([prima pagina](https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml), [politica](https://www.ansa.it/sito/notizie/politica/politica_rss.xml), [cronaca](https://www.ansa.it/sito/notizie/cronaca/cronaca_rss.xml)), [Il Post](https://www.ilpost.it/feed/), [RaiNews](https://www.rainews.it/), [Sky TG24](https://tg24.sky.it/) |
| Mondo (`mondo`) | [ANSA Mondo](https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml), [Il Post Esteri](https://www.ilpost.it/esteri/feed/), [BBC](https://feeds.bbci.co.uk/news/world/rss.xml), [The Guardian](https://www.theguardian.com/world/rss), [Al Jazeera](https://www.aljazeera.com/xml/rss/all.xml), [Reuters](https://www.reuters.com/), [AP](https://apnews.com/), [ISPI](https://www.ispionline.it/) |
| Economia (`economia`) | [ANSA Economia](https://www.ansa.it/sito/notizie/economia/economia_rss.xml), [Il Post Economia](https://www.ilpost.it/economia/feed/), [BBC](https://feeds.bbci.co.uk/news/business/rss.xml), [The Guardian](https://www.theguardian.com/business/rss), [Reuters](https://www.reuters.com/) |
| Tech (`tech`) | [ANSA Tecnologia](https://www.ansa.it/canale_tecnologia/notizie/tecnologia_rss.xml), [Ars Technica](https://feeds.arstechnica.com/arstechnica/index), [The Verge](https://www.theverge.com/rss/index.xml), [The Guardian](https://www.theguardian.com/technology/rss) |
| Clima (`clima`) | [Carbon Brief](https://www.carbonbrief.org/feed/), [The Guardian](https://www.theguardian.com/environment/rss), [BBC](https://feeds.bbci.co.uk/news/science_and_environment/rss.xml), [Inside Climate News](https://insideclimatenews.org/feed/) |

Se un giornale non si apre, si usano gli altri della stessa categoria e lo si dice nel messaggio finale. Se nessuno
si apre, la categoria resta vuota: mai fonti di riserva prese altrove.

## Come si scelgono le notizie

- Le notizie delle **ultime 24 ore** (fino a 36 se è un lunedì o dopo una festa).
- **Da 3 a 5 per categoria**, dalla più importante. Conta di più una notizia ripresa da più giornali dell'elenco
  (era la regola dell'Almanacco: «le storie più riprese»).
- Non ripetere le notizie dei 3 giorni prima (leggere i loro titoli in `almanacco/notizie/giorni/`). Un seguito
  importante sì, dicendo che cosa c'è di nuovo.
- Niente gossip, oroscopi, sport (salvo eventi davvero storici), pubblicità, articoli d'opinione presentati come fatti.

## Come si scrive

- **Dettagliato, non corto.** Ogni `testo` ha da 1.000 a 2.000 caratteri, in 3-4 paragrafi separati da una riga vuota:
  che cosa è successo, chi è coinvolto, il contesto per capirlo, le reazioni principali, che cosa succede adesso.
  Chi legge non deve aver bisogno di aprire il giornale per capire.
- **Con parole proprie.** Mai copiare frasi dai giornali, nemmeno tradotte; niente citazioni lunghe.
- **Solo fatti verificati, dagli articoli aperti davvero.** Nessun link inventato: ogni `url` è una pagina aperta.
  Se i giornali danno numeri diversi, dirlo.
- **Equilibrio.** Sulla politica: le posizioni delle parti con le loro parole riassunte, senza giudizi propri.
  Indiscrezioni e annunci si chiamano così.
- **Titolo** chiaro e concreto, in italiano, senza punti esclamativi.
- **Perché conta:** una o due frasi su che cosa cambia per chi legge (in Italia, quando è il caso).
- **Parole chiave:** da 3 a 8, quelle con cui Michele cercherebbe la notizia nell'archivio (persone, luoghi,
  organizzazioni, temi).

## Forma del file

`almanacco/notizie/giorni/AAAA-MM-GG.json`:

```json
{
  "tipo": "giorno",
  "periodo": "2026-11-12",
  "aggiornamenti": ["07:24"],
  "sezioni": {
    "italia":   { "articoli": [ ARTICOLO, ... ] },
    "mondo":    { "articoli": [] },
    "economia": { "articoli": [] },
    "tech":     { "articoli": [] },
    "clima":    { "articoli": [] }
  }
}
```

Un ARTICOLO:

```json
{
  "titolo": "…",
  "testo": "Primo paragrafo…\n\nSecondo paragrafo…",
  "perche": "Perché conta: una o due frasi.",
  "fonti": [ { "nome": "ANSA", "url": "https://www.ansa.it/…" } ],
  "parole": ["…", "…", "…"]
}
```

Le cinque categorie ci sono sempre, anche vuote. `aggiornamenti` è l'elenco delle ore (a Roma, «HH:MM») in cui la
rassegna è stata scritta o aggiornata: la prima quando nasce, poi una per ogni aggiornamento. L'app lo usa per dire
«aggiornata alle…» e per capire che una ricerca chiesta da Michele è finita. `indice.json` e `archivio/` **non si
scrivono a mano**.

## I passi

1. La data è quella di oggi a Roma. Se `almanacco/notizie/giorni/<oggi>.json` c'è già, non si riscrive: si fa
   l'**aggiornamento** descritto qui sotto.
2. Per ogni categoria: aprire i feed, scegliere le notizie, leggere gli articoli, scrivere.
3. Scrivere il file del giorno, con `"aggiornamenti": ["<ora di adesso>"]`.
4. `node scripts/indice.mjs almanacco/notizie` deve dire «Tutto a posto»; se elenca errori, correggerli.
5. `npm test` deve passare.
6. Un solo commit, con il messaggio «Rassegna dell'Almanacco del 12 novembre 2026». Poi `git pull --rebase origin main`
   e `git push origin main`. Se il rebase va in conflitto su `almanacco/notizie/indice.json` o `archivio/`, tenere i
   file dei giorni di entrambe le parti, rifare `node scripts/indice.mjs almanacco/notizie` e chiudere il rebase.
7. Messaggio finale per Michele, breve: i titoli pubblicati per categoria; i giornali che non si sono aperti; se
   qualcosa non è riuscito, che cosa serve per sbloccarlo.

Un giorno già pubblicato non si cancella e non si riscrive: è l'archivio di Michele. Si corregge solo un errore di
fatto, dicendolo nel messaggio finale.

## Aggiornamento durante il giorno

Succede quando la rassegna di oggi c'è già: di solito l'ha chiesto Michele con «Aggiorna ora» nell'Almanacco (il
messaggio dell'attività lo dice, con l'ora della richiesta).

1. Leggere la rassegna di oggi: titoli e ore in `aggiornamenti` (l'ultima è il punto da cui cercare).
2. Cercare, con le stesse fonti e le stesse regole, le notizie **uscite dopo l'ultimo aggiornamento** che valgono
   davvero: fatti nuovi importanti, non variazioni minori di notizie già scritte. Di solito da 0 a 2 per categoria.
   Un seguito importante di una notizia già scritta diventa una notizia nuova che dice che cosa è cambiato.
3. **Aggiungerle in fondo** alla loro categoria. Le notizie già scritte non si toccano, non si riordinano e non si
   tolgono (l'app riconosce le notizie lette dalla loro posizione).
4. Aggiungere l'ora di adesso in fondo a `aggiornamenti` (se il campo manca, crearlo con l'ora di adesso). Si fa
   **anche se non c'è niente di nuovo**: così l'app sa che il controllo è finito.
5. Proseguire dal passo 4 dei «passi» (controllo, test, commit «Aggiornamento della rassegna dell'Almanacco del
   12 novembre 2026, ore 14:05», pubblicazione). Nel messaggio finale: i titoli aggiunti, oppure «nessuna notizia
   nuova importante».
