# Copy review — `/home` redesign

Founders: nothing on the new page should ship as a public claim until the items below are checked. `[PROPOSED]` is suggested wording. `[VERIFY]` is a factual claim that needs a yes/no (or a replacement figure).

## Preserve (on the new page)

- contact@opaixllc.com
- +1 (412) 953-4374
- Pittsburgh, Pennsylvania
- Founded 2025
- 1 patent filed
- Leadership bios’ factual content (Lorelee Chelly, Dr. Jacques Chelly, Yan Chelly), trimmed to ≤55 words

## Headline and lede — [PROPOSED]

- [ ] H1: “Pain, predicted before it starts.”
- [ ] Lede: “OpAIx builds clinically grounded models that forecast a patient's pain trajectory, giving anesthesiology and perioperative teams time to intervene earlier — and reasons to prescribe less.”
- [ ] Founded line: “Founded in Pittsburgh by UPMC physicians and AI researchers.” (live site says this; confirm “UPMC physicians and AI researchers” is the preferred affiliation line)
- [ ] Document title: “OpAIx — Predicting pain before it starts”
- [ ] Meta description: “OpAIx builds models that forecast a patient’s pain trajectory so anesthesiology and perioperative teams can intervene earlier and reduce opioid exposure. Pittsburgh, founded 2025.”

## Approach — [PROPOSED] titles, [VERIFY] details

Heading [PROPOSED]: “From reactive to anticipatory care”

1. Pain trajectory forecasting — before the first dose.  
   [VERIFY] Pre-op / intra-op inputs (procedure, peri-op course, clinical history) and the 72-hour horizon used on the schematic chart.
2. Continuous risk monitoring — flags deviation from the predicted course.  
   [VERIFY] Intended settings (PACU / inpatient peri-op). Not a diagnostic device as currently worded.
3. Opioid-sparing decision support — surfaces alternatives when risk is rising.  
   [VERIFY] No automatic order entry; surfaces the site’s existing non-opioid options. Confirm this is the product intent.
4. Outcome measurement — closes the loop on what worked.  
   [VERIFY] Service-line aggregation of predicted vs observed pain and opioid use.

## Evidence strip

- [VERIFY] **“40+” / “Years of clinical research in anesthesiology and pain”** — updated from “30+ / Years of clinical research”. The publication record supplied for this page runs 1980–2024; founders should confirm the “four decades / 40+” phrasing before promotion.
- [VERIFY] “2002” / “Perioperative clinical research program established” — taken from the live bio (University of Pittsburgh, Department of Anesthesiology and Perioperative Medicine, July 2002). Confirm “UPMC” vs “University of Pittsburgh” as the public label.
- [VERIFY] **“Thousands” / “Research subjects enrolled”** — kept from the live bio. Alternative to consider: **“100+ peer-reviewed publications”**. Pick one of these two figures; do not show both in the four-column strip without dropping another cell.
- “1” / “Patent filed” — from the live site. Confirm status (filed vs granted) before investor conversations. The new Jacques bio also mentions “patents in regional anesthesia delivery” (plural) — reconcile with “1 patent filed”.

## Story / about — [PROPOSED]

- [ ] Heading: “Why pain, why Pittsburgh”
- [ ] Pull: “Pain that can be seen coming is pain that can be treated with less opioid.”
- [VERIFY] “in clinical validation with academic partners” — stage-honest replacement for the live claim “our algorithms help thousands of healthcare providers…”. **Do not restore the thousands-of-providers claim unless you can name deployments.**
- [VERIFY] Affiliations listed as text only: University of Pittsburgh, UPMC. Confirm both may be named. **No logos** until permission is confirmed.

## Research

Heading [PROPOSED]: “Research”. Intro [PROPOSED]: “OpAIx is built on four decades of clinical research in perioperative pain led by our co-founder Dr. Jacques Chelly. A selection of the work that informs our models:”

Curated list is the eight papers supplied by the client, in the given order. Six featured; two behind “More publications”. Rerun identifiers with `node scripts/resolve-dois.mjs` (log: `scripts/resolve-dois.log`).

| id | DOI / PubMed | Result |
|---|---|---|
| wardhan-2017 | `10.12688/f1000research.12286.1` | Crossref title/year/journal match (sim 1.000) |
| belfer-2014 | `10.1111/pme.12487` | Crossref match (sim 1.000) |
| dai-2013 | `10.1016/j.jpain.2013.04.004` | Crossref match (sim 1.000) |
| jouguelet-lacoste-2015 | `10.1111/pme.12619` | Crossref match (sim 1.000) |
| jacobs-2021 | `10.1002/cncr.33200` | Crossref match (sim 1.000) |
| chelly-2001 | `10.1054/arth.2001.23622` | Crossref match (sim 1.000) |
| neuman-2022 | PMID `35696684` | Crossref top hits were a 2022 patient summary and 2023 letters (title sim &lt; 0.9 or year 2023). PubMed title/year/journal match. **DOI needs manual confirmation** — `doi` left null. |
| liu-2015 | `10.1111/pme.12652` | Crossref match (sim 1.000) |

- [ ] **Google Scholar URL TODO.** “Full publication record” is `href="#"` until you send Dr. Chelly’s profile URL. Do not guess it.
- [ ] Confirm the intro’s “four decades” against the 40+ evidence line.

Title links use the visible title plus a screen-reader-only “ (opens in a new tab)” so the accessible name is `<title> (opens in a new tab)` without a conflicting `aria-label`. Approach “See:” links use the same pattern.

## Quality (production, desktop Lighthouse 13)

`/home`: performance 100, accessibility 100, best-practices 100, SEO 66. The SEO score is only `is-crawlable` (intentional `noindex, nofollow` on `/home`). `/`: 100 / 100 / 100 / 100, unchanged.

Approach “See:” links (one per capability, short title from the stored paper):

1. Predicting pain → belfer-2014
2. Earlier intervention → chelly-2001
3. Opioid-sparing care → jouguelet-lacoste-2015
4. Measuring outcomes → dai-2013

## Team

- [ ] Lorelee Chelly — Co-Founder & CEO. Bio kept from the live site (55 words). LinkedIn omitted (none on the live site).
- [ ] Dr. Jacques Chelly — Co-Founder & CMO. Credentials line: “Anesthesiology, University of Pittsburgh”. [VERIFY] add MD / PhD if you want them public; they are not stated on the live site beyond “Dr.”
  - [PROPOSED] appended: “Author of *Peripheral Nerve Blocks: A Color Atlas* (Lippincott Williams & Wilkins) and holder of patents in regional anesthesia delivery.”
  - Trim log (to stay ≤55 words, now 47): cut “clinical research experience” → “clinical research”; cut “he has conducted his research at the University of Pittsburgh, where he developed the Department of Anesthesiology and Perioperative Medicine’s Clinical Research Program. Since its establishment in July 2002, the program has enrolled thousands of research subjects.” Replaced with “Since 2002 he has led the University of Pittsburgh’s anesthesiology clinical research program, which has enrolled thousands of subjects.”
- [ ] Yan Chelly — Advisor, CPO AI & ML. Bio kept. LinkedIn omitted.
- [ ] Confirm portrait usage rights for the three photos (reused from `/public/team`, not moved).

## Security — [VERIFY] every paragraph

The page states practice, not certification:

- [VERIFY] PHI / model-development data is de-identified where the protocol allows; work is designed to sit inside a health system’s HIPAA programme. The live “HIPAA Compliant” chip was **not** copied as a certification badge.
- [VERIFY] Academic research data is used only under the partner’s IRB-approved protocol.
- [VERIFY] Named-person access, authentication, and access logs on systems that hold clinical data.

If any of these is not true, replace the paragraph before promotion. Do not restore “HIPAA Compliant” as a chip.

## Contact — [PROPOSED]

- [ ] Heading: “Start a conversation about your perioperative program”
- [ ] Audience line: clinical leaders, research partners, investors
- [ ] Success copy: “Message sent — we'll reply within two business days.” [VERIFY] that SLA
- [ ] Form delivery: set `FORMSPREE_FORM_ID` or `RESEND_API_KEY` + `CONTACT_TO_EMAIL`. Until then the form returns an error and leaves email/phone visible. Do not fake a send.

## Legal pages — [VERIFY] entire drafts

`/home/privacy` and `/home/terms` are short drafts from stated company facts (Pittsburgh LLC, contact form, no medical advice). They are **not** counsel-approved.

- [ ] Governing law: Pennsylvania? Confirm.
- [ ] Who is the privacy contact? Currently contact@opaixllc.com
- [ ] Is research data processed by OpAIx or only by academic partners?
- [ ] Effective date

## Omitted from `/home` (still on `/` until swap)

| Live copy | Why it is gone |
|---|---|
| “TBD Seed Funding” | Unverifiable / unfinished |
| “4 Team Members” | Headcount is not a clinical claim |
| “24/7 On-Duty” | Unverifiable operations claim |
| “Expert Support” | Slogan |
| “Innovating in Leading Medicine AI” | Eyebrow slogan |
| Mission quote box | Slogan, not a checkable claim |
| Glow ribbon, two-tone headlines, icon cards | Template chrome |
| “help thousands of healthcare providers” | Not evidenced on the live site |
| Pulse / Activity mark | Replaced by the forecast-line mark |
| Legal / Privacy in the live footer (already removed on `/`) | New legal column exists only on `/home` |

## LinkedIn

No LinkedIn URLs were on the live site. None were invented. Send URLs if they should appear under each name.
