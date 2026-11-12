// Prova lo script che controlla i rapporti e costruisce indice e archivio.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { costruisci, controlla, SEZIONI } from "../scripts/indice.mjs";

const articolo = (titolo) => ({
  titolo, testo: "Testo dettagliato. ".repeat(40), perche: "Cambia le cose.",
  fonti: [{ nome: "Nature", url: "https://www.nature.com/articles/x" }], parole: ["uno", "due", "tre"],
});
export const rapporto = (tipo, periodo) => ({
  tipo, periodo, ...(tipo === "giorno" ? {} : { apertura: "Il quadro del periodo." }),
  sezioni: Object.fromEntries(SEZIONI.map((s) => [s, { ...(tipo === "giorno" ? {} : { sintesi: "Sintesi." }), articoli: [articolo(`${s} ${periodo}`)] }])),
});
function cartella(rapporti) {
  const d = mkdtempSync(join(tmpdir(), "frontiere-"));
  for (const [dir, r] of rapporti) { mkdirSync(join(d, dir), { recursive: true }); writeFileSync(join(d, dir, r.periodo + ".json"), JSON.stringify(r)); }
  return d;
}

test("costruisce indice e archivio, dal più recente", () => {
  const d = cartella([["giorni", rapporto("giorno", "2026-11-11")], ["giorni", rapporto("giorno", "2026-11-12")], ["mesi", rapporto("mese", "2026-10")], ["anni", rapporto("anno", "2025")]]);
  const { errori, indice } = costruisci(d);
  assert.deepEqual(errori, []);
  assert.deepEqual(indice.giorni, ["2026-11-12", "2026-11-11"]);
  assert.deepEqual(indice.archivio, ["2026-11", "2026-10", "2025"]);
  assert.equal(indice.articoli, 16);
  const nov = JSON.parse(readFileSync(join(d, "archivio", "2026-11.json"), "utf8"));
  assert.equal(nov.length, 8);
  assert.equal(nov[0].id, "giorno-2026-11-11-tecnologia-1");
});

test("un giorno senza novità in una sezione va bene, un mese no", () => {
  const g = rapporto("giorno", "2026-11-12"); g.sezioni.medicina.articoli = [];
  assert.deepEqual(controlla(g, "giorno", "2026-11-12.json"), []);
  const m = rapporto("mese", "2026-10"); m.sezioni.medicina.articoli = [];
  assert.equal(controlla(m, "mese", "2026-10.json").length, 1);
});

test("rifiuta i rapporti sbagliati senza toccare l'indice", () => {
  const r = rapporto("giorno", "2026-11-12");
  r.sezioni.ai.articoli[0].testo = "Corto.";
  r.sezioni.ai.articoli[0].fonti = [{ nome: "Sito", url: "http://insicuro.example" }];
  delete r.sezioni.scienza;
  const d = cartella([["giorni", r]]);
  const { errori } = costruisci(d);
  assert.equal(errori.length, 3);
  assert.ok(!existsSync(join(d, "indice.json")));
});
