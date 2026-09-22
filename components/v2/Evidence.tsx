const stats = [
  {
    value: "2002",
    label: "Perioperative clinical research program established",
  },
  {
    value: "Thousands",
    label: "Research subjects enrolled",
  },
  {
    value: "1",
    label: "Patent filed",
  },
];

export function Evidence() {
  return (
    <section className="v2-strip" aria-labelledby="evidence-heading">
      <div className="v2-wrap">
        <h2 id="evidence-heading" className="sr-only">
          Selected facts
        </h2>
        <dl className="v2-evidence">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="v2-stat-label">{stat.label}</dt>
              <dd className="v2-stat-value">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
