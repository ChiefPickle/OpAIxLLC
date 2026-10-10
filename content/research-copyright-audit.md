# Research content copyright audit

Date: 2026-10-10. Scope: public OpAIx site (`app/(site)`, `content/publications.json`, `public/home`, agent markdown mirrors).

## Method

Reviewed React pages, JSON data, agent markdown (`lib/agent/markdown.ts`), JSON-LD, and assets under `public/home/`. Distinguished bibliographic citations (titles, authors, journal, year, outbound DOI/PubMed links) from reproduced publisher material.

## Reproduced article content

| Finding | Action |
| --- | --- |
| No article abstracts, block quotes, or passage copies in source | None required |
| No journal figures, tables, cover scans, or article PDFs in `public/` | None required |
| No publisher or university logos beside research lists | None required |
| No on-site license or permission files for third-party article text | N/A |

## Site-authored material (retained)

- Original section copy in `Story`, `Approach`, `Hero`, `Team` (no article text).
- Illustrative visuals: `public/home/visuals/atlas-record.jpg`, `pacu-bay.jpg`, `pittsburgh.jpg`; team portraits under `public/home/team/`. These are not journal figures; **portrait and stock-style image rights should be confirmed separately** (see COPY-REVIEW.md).
- `NeedField` / chart components use synthetic data, not published figures.

## Bibliographic references (retained)

All eight entries in `content/publications.json` remain as citations with external links. DOI for Neuman 2022 set to `10.7326/M22-0320` after PubMed verification (2026-10-10).

## Changes in this pass

1. Added original one-sentence summaries per paper (not copied from abstracts).
2. Replaced inaccurate “led by Dr. Chelly” framing with “includes publications co-authored by” and clarified summaries do not validate OpAIx models.
3. Fixed “Full publication record” → verified Google Scholar profile for Jacques E. Chelly, University of Pittsburgh: `https://scholar.google.com/citations?user=8L-8DMQAAAAJ&hl=en`.
4. Structured data (`JsonLd`) now emits `sameAs` whenever a DOI or PubMed URL is available (previously required a DOI).

## Manual follow-up

- Confirm commercial use of team photos and section photography if not already documented.
- Book mention in team bio (*Peripheral Nerve Blocks: A Color Atlas*, Lippincott Williams & Wilkins): bibliographic reference to Dr. Chelly’s authorship only; no cover image on site.
- F1000Research and other open-access articles may allow reuse under specific licenses; this site does **not** republish their full text—only citations and original summaries.
