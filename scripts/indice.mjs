#!/usr/bin/env node
// Controlla tutti i rapporti e ricostruisce l'indice e l'archivio per la ricerca.
// Uso: node scripts/indice.mjs [cartella dei dati]   (se manca: sito/data)
// Se un rapporto ha un errore lo dice in italiano ed esce con codice 1, senza toccare nulla.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const SEZIONI = ["tecnologia", "medicina", "scienza", "ai"];
const TIPI = {
  giorno: { cartella: "giorni", forma: /^\d{4}-\d{2}-\d{2}$/ },
  mese: { cartella: "mesi", forma: /^\d{4}-\d{2}$/ },
  anno: { cartella: "anni", forma: /^\d{4}$/ },
};
// Lunghezza minima del testo di un articolo: i riassunti devono essere dettagliati.
export const TESTO_MINIMO = 500;

const testoPieno = (v) => typeof v === "string" && v.trim().length > 0;

/** Restituisce l'elenco degli errori di un rapporto (vuoto se va bene). */
export function controlla(rapporto, tipo, nomeFile) {
  const err = [];
  const dove = `${TIPI[tipo].cartella}/${nomeFile}`;
  const periodo = nomeFile.replace(/\.json$/, "");
  if (!TIPI[tipo].forma.test(periodo)) err.push(`${dove}: il nome del file non è una data valida`);
  if (rapporto.tipo !== tipo) err.push(`${dove}: "tipo" deve essere "${tipo}"`);
  if (rapporto.periodo !== periodo) err.push(`${dove}: "periodo" deve essere "${periodo}"`);
  if (tipo !== "giorno" && !testoPieno(rapporto.apertura)) err.push(`${dove}: manca "apertura" (il quadro generale del periodo)`);
  const sez = rapporto.sezioni;
  if (!sez || typeof sez !== "object") return [...err, `${dove}: manca "sezioni"`];
  for (const nome of Object.keys(sez)) if (!SEZIONI.includes(nome)) err.push(`${dove}: sezione sconosciuta "${nome}"`);
  for (const nome of SEZIONI) {
    const s = sez[nome];
    if (!s || !Array.isArray(s.articoli)) { err.push(`${dove}: manca la sezione "${nome}" con i suoi "articoli"`); continue; }
    if (tipo !== "giorno" && !testoPieno(s.sintesi)) err.push(`${dove} › ${nome}: manca "sintesi"`);
    if (tipo !== "giorno" && s.articoli.length === 0) err.push(`${dove} › ${nome}: nessun articolo`);
    s.articoli.forEach((a, i) => {
      const qui = `${dove} › ${nome} › articolo ${i + 1}`;
      if (!testoPieno(a.titolo)) err.push(`${qui}: manca "titolo"`);
      if (!testoPieno(a.testo) || a.testo.trim().length < TESTO_MINIMO) err.push(`${qui}: "testo" troppo corto (minimo ${TESTO_MINIMO} caratteri)`);
      if (!testoPieno(a.perche)) err.push(`${qui}: manca "perche" (perché conta)`);
      if (!Array.isArray(a.fonti) || a.fonti.length === 0) err.push(`${qui}: serve almeno una fonte`);
      for (const f of a.fonti || []) {
        if (!testoPieno(f.nome) || !/^https:\/\/\S+$/.test(f.url || "")) err.push(`${qui}: ogni fonte vuole "nome" e un "url" che inizia con https://`);
      }
      if (!Array.isArray(a.parole) || a.parole.length < 3 || !a.parole.every(testoPieno)) err.push(`${qui}: servono almeno 3 parole chiave`);
    });
  }
  return err;
}

/** Legge i rapporti, li controlla e scrive indice.json e archivio/*.json. Restituisce un riepilogo. */
export function costruisci(dati) {
  const errori = [];
  const indice = { giorni: [], mesi: [], anni: [], archivio: [], articoli: 0 };
  const archivio = new Map(); // nome del file → articoli

  for (const [tipo, { cartella }] of Object.entries(TIPI)) {
    const dir = join(dati, cartella);
    const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
    for (const f of files) {
      let r;
      try { r = JSON.parse(readFileSync(join(dir, f), "utf8")); }
      catch (e) { errori.push(`${cartella}/${f}: il file non è un JSON valido (${e.message})`); continue; }
      const err = controlla(r, tipo, f);
      if (err.length) { errori.push(...err); continue; }
      indice[cartella].push(r.periodo);
      const file = tipo === "anno" ? r.periodo : r.periodo.slice(0, 7);
      if (!archivio.has(file)) archivio.set(file, []);
      for (const sezione of SEZIONI) {
        r.sezioni[sezione].articoli.forEach((a, i) => {
          archivio.get(file).push({
            id: `${tipo}-${r.periodo}-${sezione}-${i + 1}`,
            tipo, periodo: r.periodo, sezione,
            titolo: a.titolo.trim(), testo: a.testo.trim(), perche: a.perche.trim(),
            ...(testoPieno(a.quando) ? { quando: a.quando.trim() } : {}),
            fonti: a.fonti, parole: a.parole.map((p) => p.trim()),
          });
        });
      }
    }
  }
  if (errori.length) return { errori };

  for (const k of ["giorni", "mesi", "anni"]) indice[k].sort().reverse();
  const dirArch = join(dati, "archivio");
  rmSync(dirArch, { recursive: true, force: true });
  mkdirSync(dirArch, { recursive: true });
  for (const [file, articoli] of [...archivio].sort().reverse()) {
    writeFileSync(join(dirArch, `${file}.json`), JSON.stringify(articoli));
    indice.archivio.push(file);
    indice.articoli += articoli.length;
  }
  indice.aggiornato = new Date().toISOString();
  writeFileSync(join(dati, "indice.json"), JSON.stringify(indice, null, 1) + "\n");
  return { errori, indice };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dati = process.argv[2] || join(dirname(fileURLToPath(import.meta.url)), "..", "sito", "data");
  const { errori, indice } = costruisci(dati);
  if (errori.length) {
    console.error(`Trovati ${errori.length} errori, non ho cambiato nulla:\n- ` + errori.join("\n- "));
    process.exit(1);
  }
  console.log(`Tutto a posto: ${indice.giorni.length} giorni, ${indice.mesi.length} mesi, ${indice.anni.length} anni, ${indice.articoli} articoli in archivio.`);
}
