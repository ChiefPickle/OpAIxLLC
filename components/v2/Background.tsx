export function Background() {
  return (
    <section
      id="background"
      className="v2-section v2-rule"
      aria-labelledby="background-heading"
    >
      <div className="v2-wrap">
        <h2 id="background-heading" className="v2-display v2-section-title">
          Why discharge prescriptions need to change
        </h2>
        <div className="v2-prose" style={{ marginTop: "1.5rem" }}>
          <p>
            Patients leaving the hospital may receive more opioid pills than
            they need. Unused medication can create opportunities for misuse,
            accidental exposure, and diversion within households and the wider
            community.
          </p>
          <p>
            Medication take-back programs aim to reduce this surplus, but
            collecting unused pills addresses the problem after they have
            already been prescribed.
          </p>
          <p>
            OpAIx focuses on the prescribing decision itself: helping surgeons
            estimate how many opioid pills an individual patient may need after
            discharge. The goal is to support appropriate pain management while
            minimizing leftover medication and the risk of diversion.
          </p>
        </div>
      </div>
    </section>
  );
}
