export function Story() {
  return (
    <section id="about" className="v2-section" aria-labelledby="story-heading">
      <div className="v2-wrap v2-12">
        <div className="v2-story-copy">
          <h2 id="story-heading" className="v2-display">
            Why pain, why Pittsburgh
          </h2>
          <p className="v2-pull" style={{ marginTop: "1.5rem" }}>
            Pain that can be seen coming is pain that can be treated with less
            opioid.
          </p>
          <div className="v2-prose" style={{ marginTop: "1.5rem" }}>
            <p>
              Years of peri-operative care made a practical problem obvious:
              pain is still managed after it is already severe, and opioids
              remain the default once that happens. OpAIx was founded in 2025
              to put a forecast in front of that moment — so anesthesiology
              and peri-operative teams can change the plan while there is
              still time, and have a reason to use less opioid.
            </p>
            <p>
              The work sits in Pittsburgh because that is where the clinical
              research already was. Dr. Jacques Chelly has run peri-operative
              studies at the University of Pittsburgh since 2002, inside the
              Department of Anesthesiology and Perioperative Medicine’s
              clinical research program. The company was started by physicians
              and AI researchers from UPMC to turn that research setting into
              a model that can be checked against real cases.
            </p>
            <p>
              The models are in clinical validation with academic partners.
            </p>
          </div>
        </div>
        <aside className="v2-affiliations" aria-labelledby="affiliations-heading">
          <h3 id="affiliations-heading">Affiliations</h3>
          <ul>
            <li>University of Pittsburgh</li>
            <li>UPMC</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
