const factors = [
  {
    n: "01",
    title: "Expected postoperative pain trajectory",
    body: "How pain is expected to change throughout recovery.",
  },
  {
    n: "02",
    title: "Type of surgery",
    body: "The procedure and its associated recovery needs.",
  },
  {
    n: "03",
    title: "Patient and family medical history",
    body: "The individual’s medical background and relevant family history.",
  },
  {
    n: "04",
    title: "Opioid use before surgery",
    body: "The patient’s history of opioid use before the procedure.",
  },
  {
    n: "05",
    title: "Opioid use during hospitalization",
    body: "The amount of opioid medication used during the hospital stay.",
  },
  {
    n: "06",
    title: "Patient education",
    body: "Guidance on which medication to take at different levels of pain.",
  },
  {
    n: "07",
    title: "Overall pain management approach",
    body: "The broader treatment plan, including non-opioid strategies.",
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="v2-section v2-rule"
      aria-labelledby="approach-heading"
    >
      <div className="v2-wrap">
        <h2 id="approach-heading" className="v2-display v2-section-title">
          From one-size-fits-all prescriptions to individualized prescribing
        </h2>
        <p className="v2-lede" style={{ marginTop: "1.25rem" }}>
          Opioid needs after discharge depend on more than pain alone.
          OpAIx&apos;s approach considers the patient&apos;s clinical context,
          treatment history, and recovery to support a more individualized
          estimate.
        </p>
        <ol className="v2-factors">
          {factors.map((factor) => (
            <li key={factor.n} className="v2-factor">
              <span className="v2-factor-n v2-nums" aria-hidden="true">
                {factor.n}
              </span>
              <div>
                <h3>{factor.title}</h3>
                <p>{factor.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
