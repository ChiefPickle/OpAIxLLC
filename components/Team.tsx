import Image from "next/image";

const team = [
  {
    name: "Lorelee Chelly",
    role: "Co-Founder & CEO",
    photo: "/team/lorelee.jpg",
    bio: "Focused on building AI tools that make clinicians more effective and elevate the accuracy and speed of patient care. She turns complex data and machine-learning research into solutions clinicians can actually use, improving decision-making, streamlining diagnostics, and enabling better outcomes at scale.",
  },
  {
    name: "Dr. Jacques Chelly",
    role: "Co-Founder & CMO",
    photo: "/team/jacques.jpg",
    bio: "Dr. Chelly has over 30 years of clinical research experience and developed the Department of Anesthesiology and Perioperative Medicine\u2019s Clinical Research Program, which has enrolled thousands of research subjects since July 2002.",
  },
  {
    name: "Yan Chelly",
    role: "Advisor - CPO AI & ML",
    photo: "/team/yan.png",
    bio: "AI & ML product leader with two decades of building and scaling data-driven products. Specialized in transforming complex machine-learning research into commercially successful, user-centric solutions. Known for shipping fast, aligning cross-functional teams, and driving measurable business impact across enterprise and consumer platforms.",
  },
];

export function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="team-heading" className="mb-4">
            Leadership Team
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Meet the visionaries behind OpAIx — a team of physicians,
            researchers, and entrepreneurs united by a passion for transforming
            healthcare.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <article
              key={member.name}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-200">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role} at OpAIx`}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-semibold leading-[1.4]">
                  {member.name}
                </h3>
                <div className="text-cyan-700 text-sm mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
