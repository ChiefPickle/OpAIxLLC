"use client";

import { useState } from "react";
import publications from "@/content/publications.json";
import { highlightChelly, publicationHref, type Publication } from "./pubs";

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
              OpAIx is built on four decades of clinical research in
              perioperative pain led by our co-founder Dr. Jacques Chelly. A
              selection of the work that informs our models:
            </p>
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
            <a className="v2-textlink" href="#">
              Full publication record
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
