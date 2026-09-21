# OpAIx /home design plan

Subject: a 2025 Pittsburgh clinical-AI group, founded by UPMC physicians and researchers, building models that forecast a patient’s pain course so anesthesiology teams can intervene earlier and use fewer opioids. Readers are CMIOs, perioperative chiefs, innovation offices, research partners, and seed investors. They need to decide whether this is a serious clinical programme, not whether the site looks like a startup.

## Tokens

Colour (scoped to `.opaix-v2` only; Tailwind v3 CSS variables, not a v4 `@theme` migration):

| Token | Hex | Role |
|---|---|---|
| paper | `#F8F8F5` | Page. Cool paper, not cream. |
| ink | `#10233B` | Headlines, hero/footer dark blocks. |
| slate | `#47546A` | Body. AA on paper (~7.4:1). |
| hairline | `#D9DFE6` | Rules only. |
| signal | `#0E8A8C` | Links, focus, forecast line. Never a wash, never a headline word. |
| band | `rgba(14,138,140,0.14)` | Forecast confidence fill only. |

Type: Newsreader 400/500 for display (optical sizing on, tracking −0.015em at ≥40px, lh 1.05). Inter 400/500/600 for UI and body, `tnum` + `cv11` on figures. Body 1.0625rem / 1.6 / ≤68ch. Sentence case. No all-caps labels, no eyebrows, no middle-dot meta, no arrows on links.

Layout: 12 columns, 1200px, 24px gutters, left-aligned. Section padding 128px / 80px. Sections divided by 1px hairlines, not alternating bands. Radius 4px controls, 8px images. No shadows except a 1px sticky-nav hairline after 8px scroll.

## Wireframe

```
[ skip to content ]
NAV  OpAIx (mark+Newsreader)          Approach  Research  Team  Contact
-----+--------------------------------+-------------------------------
     |  H1 Pain, predicted            |   SVG chart-paper grid
     |  before it starts.             |   observed (ink) | now
     |  lede ≤60ch                    |   forecast (signal, dashed)
     |  [Talk to the team]  Research  |   confidence band + annotation
     |  Founded in Pittsburgh…        |
-----+--------------------------------+-------------------------------
     | sticky intro                   |  1  forecasting
     | From reactive to               |  ---
     | anticipatory care              |  2  monitoring
     |                                |  ---
     |                                |  3  opioid-sparing support
     |                                |  ---
     |                                |  4  outcome measurement
-----+--------------------------------+-------------------------------
     |  30+    |  2002   |  Thousands  |  1 patent
-----+--------------------------------+-------------------------------
     | Why pain, why Pittsburgh       |  Affiliations (text)
     | pull + body                    |
-----+--------------------------------+-------------------------------
     | Research                       |  list or honest empty state
-----+--------------------------------+-------------------------------
     | Leadership   [ 4:5  ] [ 4:5  ] [ 4:5  ]
-----+--------------------------------+-------------------------------
     | How we handle patient data     |  three hairline columns
-----+--------------------------------+-------------------------------
INK  | Start a conversation…          |  form (name, org, role, email, message)
-----+--------------------------------+-------------------------------
INK  | OpAIx  Pittsburgh              |  Contact  |  Privacy  Terms
     | © 2026 OpAIx LLC
```

## Principles

1. One loud object: the prediction chart. Everything else is journal quiet.
2. Checkable claims only. If it cannot be verified, it is not on the page.
3. Structure encodes care sequence (1–4) and time (the chart). No cards, no icon tiles, no glow.

## Critique against frontend-design.mdc defaults

| Default tell | This plan | Change made |
|---|---|---|
| Cream `#F4F1EA` + terracotta serif | Paper `#F8F8F5` (cool, slightly green-grey) + ink + one hospital-teal signal | Kept brief’s paper; refused warm-clay accent. |
| Near-black + acid green | Paper-first; ink only for contact/footer | Hero is paper + chart grid, not a dark navy ribbon. |
| Broadsheet: zero radius, dense columns | 4px/8px radii as specified; 128px section rhythm | Hairlines kept because they separate clinical sections, not because of a newspaper kit. |
| SaaS identical cards + icon squares + shadows | Approach is a ruled list; no icons; no card lift | Dropped optional per-item micro-charts so the hero chart stays the only diagram. |
| ALL-CAPS eyebrow, middle dots, `→`, two-tone headline | Sentence-case nav; single-colour Newsreader h1 | No “Innovating in Leading Medicine AI”; no teal word in the headline. |
| Fade/slide every section | Two auto animations only: hero timeline + evidence count-up | No scroll reveals, no glow canvas, no glass. |

Inter is a generic face; the brief requires it for text and tabular figures, so it stays. Distinctiveness sits in Newsreader at display sizes plus the chart as the first thing a CMIO sees.

Removed accessory (Chanel pass): small SVG spark-charts beside each approach row. They would compete with the hero chart.

AA note: `--color-signal` `#0E8A8C` on paper is 3.92:1, short of 4.5:1 for 15px links. Chart stroke and focus rings keep `#0E8A8C`. Link and hover titles use `--color-signal-text` `#0C7E7F` (same hue, 4.58:1).
