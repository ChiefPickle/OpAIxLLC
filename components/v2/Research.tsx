"use client";

import { useState } from "react";
import publications from "@/content/publications.json";
import { Figure } from "./Figure";
import {
  DR_JACQUES_CHELLY_PUBLICATION_PROFILE,
  highlightChelly,
  publicationHref,
  type Publication,
} from "./pubs";

const papers = publications as Publication[];
const featured = papers.filter((p) => p.featured);
const extra = papers.filter((p) => !p.featured);

function Authors({ text }: { text: string }) {
  return (
    <>
      {highlightChelly(text).map((part, i) =>
        part === "Chelly JE" ? <strong key={i}>Chelly JE</strong> : part,
      )}
    </>
  );
}

function PubRow({ pub, tabIndex }: { pub: Publication; tabIndex?: number }) {
  const href = publicationHref(pub);
  const title = href ? (
    <a
      className="v2-pub-title v2-underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
    >
      {pub.title}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <span className="v2-pub-title">{pub.title}</span>
  );

  return (
    <li className="v2-pub">
      <div className="v2-pub-main">
        {title}
        <p className="v2-pub-meta v2-nums">
          <Authors text={pub.authors} />, <em>{pub.journal}</em>, {pub.year}.
        </p>
        {pub.summary ? (
          <p className="v2-pub-summary">{pub.summary}</p>
        ) : null}
      </div>
      <p className="v2-pub-theme">{pub.theme}</p>
    </li>
  );
}

export function Research() {
  const [open, setOpen] = useState(false);

  return (
    <section id="research" className="v2-section v2-rule" aria-labelledby="research-heading">
      <div className="v2-wrap v2-12">
        <div className="v2-research-intro">
          <div className="v2-sticky-intro">
            <h2 id="research-heading" className="v2-display">
              Research
            </h2>
            <p style={{ marginTop: "1.25rem", maxWidth: "60ch" }}>
              Selected peer-reviewed work in perioperative pain that includes
              publications co-authored by co-founder Dr. Jacques Chelly. Titles
              link to the publisher record; brief summaries below are written
              for this site and are not taken from the articles. They describe
              clinical context only and do not validate OpAIx models.
            </p>
            <Figure
              src="/home/visuals/atlas-record.jpg"
              alt="Bound medical books beside a pencil sketch of a falling ink line that continues as a dashed teal forecast."
              caption="The record the work rests on."
              width={1800}
              height={1350}
              sizes="(min-width: 1024px) 28vw, calc(100vw - 80px)"
            />
          </div>
        </div>
        <div className="v2-research-list">
          <div className="v2-research-stack">
            <ul className="v2-pub-list">
              {featured.map((pub) => (
                <PubRow key={pub.id} pub={pub} />
              ))}
            </ul>
            <div
              className={`v2-more${open ? " is-open" : ""}`}
              {...(!open ? ({ inert: "" } as Record<string, string>) : {})}
            >
              <div className="v2-more-inner">
                <ul className="v2-pub-list">
                  {extra.map((pub) => (
                    <PubRow key={pub.id} pub={pub} tabIndex={open ? undefined : -1} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="v2-research-actions">
            <button
              type="button"
              className="v2-textbtn"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Fewer publications" : "More publications"}
            </button>
            <a
              className="v2-textlink"
              href={DR_JACQUES_CHELLY_PUBLICATION_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Full publication record
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
