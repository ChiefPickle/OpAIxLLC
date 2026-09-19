import { MapPin } from "lucide-react";

const stats = [
  { value: "2025", label: "Founded in Pittsburgh" },
  { value: "TBD", label: "Seed Funding" },
  { value: "4", label: "Team Members" },
  { value: "1", label: "Patents Filed" },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-cyan-700 mb-4">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">Pittsburgh, Pennsylvania</span>
          </div>
          <h2 id="about-heading" className="mb-6">
            About <span className="text-cyan-700">OpAIx</span>
          </h2>
          <p className="text-gray-600 max-w-3xl">
            We&apos;re on a mission to revolutionize healthcare through the
            power of artificial intelligence. Entrusted in Pittsburgh&apos;s
            thriving tech and medical ecosystem, we combine world-class AI
            research with deep clinical expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h3 className="mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4">
              OpAIx was born from a clear realization: decades of patient care
              and pain research revealed an urgent need to predict and prevent
              pain before it fully develops. With a focus on addressing the US
              opioid crisis, we leverage AI to transform pain prediction and
              early intervention. Founded in 2025 by physicians and AI
              researchers from UPMC, our mission is to bridge cutting-edge
              artificial intelligence with practical, real-world medicine.
            </p>
            <p className="text-gray-600 mb-4">
              Pittsburgh stands at the forefront of innovation. With
              world-renowned medical and computer science centers and leading
              academic institutions, the city offers an ideal ecosystem for
              developing and validating predictive healthcare solutions.
            </p>
            <p className="text-gray-600">
              Today, our algorithms help thousands of healthcare providers
              identify at-risk patients and intervene early, transforming
              reactive medicine into proactive care. We&apos;re proud to be at
              the forefront of the predictive medicine revolution.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4 sm:gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-center bg-white rounded-xl border border-slate-200/80 px-6 py-8 sm:px-8 sm:py-10 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              >
                <dt className="order-2 mt-4 text-lg sm:text-xl text-gray-600 leading-snug">
                  {stat.label}
                </dt>
                <dd className="order-1 text-5xl sm:text-6xl font-semibold tracking-tight text-cyan-700 leading-none tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bg-white p-12 rounded-xl text-center">
          <h3 className="mb-6">Our Mission</h3>
          <p className="text-gray-700 text-xl max-w-4xl mx-auto">
            &quot;To empower healthcare providers with AI-driven insights that
            predict health outcomes, enabling earlier interventions and
            transforming reactive medicine into{" "}
            <span className="text-cyan-700">proactive care</span>.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
