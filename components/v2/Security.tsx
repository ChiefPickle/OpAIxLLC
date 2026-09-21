const columns = [
  {
    title: "HIPAA and de-identification",
    body: "Work that involves protected health information is designed to sit inside a health system’s HIPAA programme. Data used to develop or evaluate models is de-identified where the research protocol allows. This is not a certification badge.",
  },
  {
    title: "IRB oversight for research data",
    body: "When academic partners contribute clinical research data, it is used only under that institution’s IRB-approved protocol and the agreements that come with it.",
  },
  {
    title: "Access to systems",
    body: "Access to systems that hold clinical data is limited to named people, authenticated, and logged. Details of hosting and controls are shared with health-system partners under NDA.",
  },
];

export function Security() {
  return (
    <section id="data" className="v2-section v2-rule" aria-labelledby="security-heading">
      <div className="v2-wrap">
        <h2 id="security-heading" className="v2-display">
          How we handle patient data
        </h2>
        <div className="v2-security" style={{ marginTop: "2.25rem" }}>
          {columns.map((col) => (
            <article key={col.title}>
              <h3>{col.title}</h3>
              <p>{col.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
