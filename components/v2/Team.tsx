import Image from "next/image";

const team = [
  {
    name: "Lorelee Chelly",
    role: "Co-Founder & CEO",
    credentials: "",
    photo: "/home/team/lorelee.webp",
    bio: "Focused on building AI tools that make clinicians more effective and elevate the accuracy and speed of patient care. She turns complex data and machine-learning research into solutions clinicians can actually use, improving decision-making, streamlining diagnostics, and enabling better outcomes at scale.",
  },
  {
    name: "Dr. Jacques Chelly",
    role: "Co-Founder & CMO",
    credentials: "Anesthesiology, University of Pittsburgh",
    photo: "/home/team/jacques.webp",
    bio: (
      <>
        Dr. Chelly has over 30 years of clinical research. Since 2002 he has
        led the University of Pittsburgh’s anesthesiology clinical research
        program, which has enrolled thousands of subjects. Author of{" "}
        <em>Peripheral Nerve Blocks: A Color Atlas</em> (Lippincott Williams
        &amp; Wilkins) and holder of patents in regional anesthesia delivery.
      </>
    ),
  },
  {
    name: "Yan Chelly",
    role: "Advisor, CPO AI & ML",
    credentials: "",
    photo: "/home/team/yan.webp",
    bio: "AI & ML product leader with two decades of building and scaling data-driven products. Specialized in transforming complex machine-learning research into commercially successful, user-centric solutions. Known for shipping fast, aligning cross-functional teams, and driving measurable business impact across enterprise and consumer platforms.",
  },
];

export function Team() {
  return (
    <section id="team" className="v2-section v2-rule" aria-labelledby="team-heading">
      <div className="v2-wrap">
        <h2 id="team-heading" className="v2-display">
          Leadership
        </h2>
        <div className="v2-team" style={{ marginTop: "2.5rem" }}>
          {team.map((member) => (
            <article key={member.name}>
              <div className="v2-portrait-wrap">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  width={720}
                  height={900}
                  className="v2-portrait"
                  sizes="(min-width: 768px) 30vw, 100vw"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <h3 className="v2-name">{member.name}</h3>
              <p className="v2-role">{member.role}</p>
              {member.credentials ? <p className="v2-creds">{member.credentials}</p> : null}
              <p className="v2-bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
