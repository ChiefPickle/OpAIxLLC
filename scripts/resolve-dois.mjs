#!/usr/bin/env node
/**
 * Resolve DOIs (Crossref) then PMIDs (PubMed) for content/publications.json.
 * Accepts a match only when title similarity ≥ 0.9 (case-insensitive),
 * year matches, and journal/container-title matches. Never guesses.
 *
 * Usage: node scripts/resolve-dois.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const JSON_PATH = path.join(ROOT, "content/publications.json");
const LOG_PATH = path.join(ROOT, "scripts/resolve-dois.log");

const MAILTO = "mailto:contact@opaixllc.com";
const UA = `OpAIxLLC-doi-resolver/1.0 (${MAILTO})`;
const THRESHOLD = 0.9;

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => i);
  for (let j = 1; j <= n; j++) {
    let prev = j - 1;
    dp[0] = j;
    for (let i = 1; i <= m; i++) {
      const tmp = dp[i];
      dp[i] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, dp[i], dp[i - 1]);
      prev = tmp;
    }
  }
  return dp[m];
}

function similarity(a, b) {
  const A = normalize(a);
  const B = normalize(b);
  if (!A || !B) return 0;
  if (A === B) return 1;
  const dist = levenshtein(A, B);
  return 1 - dist / Math.max(A.length, B.length);
}

function journalMatches(stored, container) {
  const names = Array.isArray(container) ? container : [container];
  return names.some((name) => similarity(stored, name) >= THRESHOLD);
}

function yearFromWork(work) {
  const parts =
    work["published-print"]?.["date-parts"]?.[0] ||
    work.published?.["date-parts"]?.[0] ||
    work["published-online"]?.["date-parts"]?.[0] ||
    work.issued?.["date-parts"]?.[0];
  return parts ? Number(parts[0]) : null;
}

function titleFromWork(work) {
  const t = work.title;
  if (Array.isArray(t)) return t[0] || "";
  return t || "";
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getJson(url, extraHeaders = {}) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json", ...extraHeaders },
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

async function getText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

async function resolveCrossref(entry, log) {
  const q = encodeURIComponent(entry.title);
  const url = `https://api.crossref.org/works?query.bibliographic=${q}&rows=3`;
  log.push(`\n[${entry.id}] Crossref ${url}`);
  const data = await getJson(url);
  const items = data.message?.items || [];
  log.push(`[${entry.id}] Crossref returned ${items.length} item(s)`);

  for (const work of items) {
    const title = titleFromWork(work);
    const year = yearFromWork(work);
    const journal = work["container-title"] || [];
    const titleSim = similarity(entry.title, title);
    const yearOk = year === entry.year;
    const journalOk = journalMatches(entry.journal, journal);
    log.push(
      `[${entry.id}] candidate doi=${work.DOI || "n/a"} year=${year} titleSim=${titleSim.toFixed(3)} journalOk=${journalOk} title=${JSON.stringify(title)} journal=${JSON.stringify(journal)}`,
    );
    if (titleSim >= THRESHOLD && yearOk && journalOk && work.DOI) {
      return work.DOI;
    }
  }
  return null;
}

function parseEsearchIds(xml) {
  const ids = [];
  const re = /<Id>(\d+)<\/Id>/g;
  let m;
  while ((m = re.exec(xml))) ids.push(m[1]);
  return ids;
}

async function resolvePubmed(entry, log) {
  const term = encodeURIComponent(`${entry.title}[Title]`);
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=5&term=${term}`;
  log.push(`[${entry.id}] PubMed search ${searchUrl}`);
  const xml = await getText(searchUrl);
  const ids = parseEsearchIds(xml);
  log.push(`[${entry.id}] PubMed ids: ${ids.join(", ") || "(none)"}`);
  if (!ids.length) return null;

  const sumUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`;
  const summary = await getJson(sumUrl);
  const result = summary.result || {};

  for (const id of ids) {
    const rec = result[id];
    if (!rec) continue;
    const title = rec.title || "";
    const year = Number(String(rec.pubdate || "").slice(0, 4));
    const journal = rec.fulljournalname || rec.source || "";
    const titleSim = similarity(entry.title, title);
    const yearOk = year === entry.year;
    const journalOk = journalMatches(entry.journal, journal);
    log.push(
      `[${entry.id}] PMID ${id} year=${year} titleSim=${titleSim.toFixed(3)} journalOk=${journalOk} title=${JSON.stringify(title)} journal=${JSON.stringify(journal)}`,
    );
    if (titleSim >= THRESHOLD && yearOk && journalOk) {
      return id;
    }
  }
  return null;
}

async function main() {
  const papers = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
  if (!Array.isArray(papers)) {
    throw new Error("content/publications.json must be an array");
  }

  const log = [
    `resolve-dois run ${new Date().toISOString()}`,
    `threshold=${THRESHOLD} source=${path.relative(ROOT, JSON_PATH)}`,
  ];

  for (const entry of papers) {
    entry.doi = null;
    entry.pubmed = null;
    try {
      const doi = await resolveCrossref(entry, log);
      await sleep(1100);
      if (doi) {
        entry.doi = doi;
        log.push(`[${entry.id}] ACCEPTED DOI ${doi}`);
        continue;
      }
      log.push(`[${entry.id}] no Crossref match; trying PubMed`);
      const pmid = await resolvePubmed(entry, log);
      await sleep(400);
      if (pmid) {
        entry.pubmed = pmid;
        log.push(`[${entry.id}] ACCEPTED PMID ${pmid}`);
      } else {
        log.push(`[${entry.id}] UNRESOLVED — leave doi and pubmed null`);
      }
    } catch (err) {
      log.push(`[${entry.id}] ERROR ${err instanceof Error ? err.message : String(err)}`);
      log.push(`[${entry.id}] UNRESOLVED`);
    }
  }

  fs.writeFileSync(JSON_PATH, `${JSON.stringify(papers, null, 2)}\n`);
  fs.writeFileSync(LOG_PATH, `${log.join("\n")}\n`);
  console.log(log.join("\n"));
  console.log(`\nWrote ${path.relative(ROOT, JSON_PATH)} and ${path.relative(ROOT, LOG_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
