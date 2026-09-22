import publications from "@/content/publications.json";
import { Figure } from "./Figure";
import { publicationHref, type Publication } from "./pubs";

const papers = publications as Publication[];
const relatedIds = ["wardhan-2017", "jacobs-2021", "chelly-2001"] as const;

export function Story() {
  const related = relatedIds
    .map((id) => papers.find((p) => p.id === id))
    .filter((p): p is Publication => Boolean(p))
    .map((pub) => {
      const href = publicationHref(pub);
      return href ? { pub, href } : null;
    })
    .filter((item): item is { pub: Publication; href: string } => Boolean(item));

  return (
    <section id="about" className="v2-section" aria-labelledby="story-heading">
      <div className="v2-wrap v2-12">
        <div className="v2-story-copy">
          <h2 id="story-heading" className="v2-display">
            Why pain. Why Pittsburgh.
          </h2>
          <p className="v2-pull" style={{ marginTop: "1.5rem", maxWidth: "18ch" }}>
            Pain matters. Individual needs go further.
          </p>
          <div className="v2-prose" style={{ marginTop: "1.5rem" }}>
            <p>
              Severe postoperative pain can interfere with recovery, including
              a patient&apos;s ability to regain function. Reducing pain is
              important, but pain alone does not determine how many opioid
              pills a patient may need after leaving the hospital.
            </p>
            <p>
              OpAIx was founded to help surgeons make more individualized
              prescribing decisions by considering expected pain alongside the
              other factors that shape opioid needs. Our goal is to support
              recovery while minimizing unused pills after discharge.
            </p>
            <p>
              Developed in Pittsburgh, OpAIx draws on the research experience
              of Co-Founder and CMO Dr. Jacques Chelly. He brings more than 30
              years of clinical research experience, including work at the
              University of Pittsburgh since 2002, exploring postoperative
              opioid needs and alternatives to opioids in acute perioperative
              care.
            </p>
          </div>
          {related.length ? (
            <div className="v2-related">
              <h3 className="v2-related-heading">Related research</h3>
              <ul>
                {related.map(({ pub, href }) => (
                  <li key={pub.id}>
                    <a
                      className="v2-underline"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pub.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <span className="v2-pub-meta v2-nums">
                      {" "}
                      <em>{pub.journal}</em>, {pub.year}.
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="v2-story-visual">
          <Figure
            src="/home/visuals/pacu-bay.jpg"
            alt="Empty recovery bay at dusk, unused bed and a dark monitor, brick buildings outside the window."
            caption="A postoperative recovery bay."
            width={1350}
            height={1800}
            sizes="(min-width: 1024px) 28vw, calc(100vw - 80px)"
          />
        </div>
      </div>
    </section>
  );
}
