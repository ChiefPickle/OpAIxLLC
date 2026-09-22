import publications from "@/content/publications.json";
import { publicationHref, type Publication } from "./pubs";
import { Reveal } from "./Reveal";

const papers = publications as Publication[];

function see(id: string, short: string) {
  const pub = papers.find((p) => p.id === id);
  if (!pub) return null;
  const href = publicationHref(pub);
  if (!href) return null;
  return { href, short, journal: pub.journal, year: pub.year };
}

const items = [
  {
    n: "1",
    title: "Pain trajectory forecasting: before the first dose.",
    body: "The model estimates how pain is expected to rise and fall over the first 72 hours after surgery from pre-operative and intra-operative information. The point is to give the team a course to plan against before the patient is in recovery, not a score after the fact.",
    detail: "Intended inputs include procedure type, peri-operative course, and clinical history.",
    see: see(
      "belfer-2014",
      "Design and methods of genetic studies on postoperative pain",
    ),
  },
  {
    n: "2",
    title: "Continuous risk monitoring: flags deviation from the predicted course.",
    body: "Once pain scores are recorded, they are compared with the forecast. A rise above the expected band is a prompt to reassess the plan. It is not a diagnosis and it does not replace bedside judgement.",
    detail: "Written for PACU and inpatient peri-operative units.",
    see: see(
      "chelly-2001",
      "Continuous femoral blocks improve recovery after knee arthroplasty",
    ),
  },
  {
    n: "3",
    title: "Opioid-sparing decision support: surfaces alternatives when risk is rising.",
    body: "When the forecast or a deviation implies heavier opioid need, the system can surface the service’s existing non-opioid options and regional techniques. It does not write orders.",
    detail: "Displayed in the peri-operative workflow; no automatic order entry.",
    see: see(
      "jouguelet-lacoste-2015",
      "Low-dose ketamine for postoperative analgesia",
    ),
  },
  {
    n: "4",
    title: "Outcome measurement: closes the loop on what worked.",
    body: "Predicted versus observed pain and opioid use are kept so a department can see which interventions changed the course, and so the model can be checked against what actually happened.",
    detail: "Reported at the service-line level under the site’s data terms.",
    see: see("dai-2013", "Integration of pain score and morphine consumption"),
  },
];

export function Approach() {
  return (
    <section id="approach" className="v2-section v2-rule" aria-labelledby="approach-heading">
      <div className="v2-wrap v2-12">
        <div className="v2-approach-intro">
          <div className="v2-sticky-intro">
            <h2 id="approach-heading" className="v2-display">
              From reactive to anticipatory care
            </h2>
            <p style={{ marginTop: "1.25rem" }}>
              Four steps in the same case: forecast before dosing, watch the
              course, offer alternatives when risk rises, then measure whether
              the intervention held.
            </p>
          </div>
        </div>
        <ol className="v2-approach-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {items.map((item) => (
            <li key={item.n} className="v2-capability">
              <Reveal>
                <h3 className="v2-capability-title">
                  {item.n}. {item.title}
                </h3>
                <p>{item.body}</p>
                <p className="v2-capability-detail">{item.detail}</p>
                {item.see ? (
                  <p className="v2-see">
                    See:{" "}
                    <a
                      className="v2-underline"
                      href={item.see.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.see.short}, {item.see.journal} {item.see.year}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
