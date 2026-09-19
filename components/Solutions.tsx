import { Activity, Brain, ChartColumn, Shield } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "Predictive Diagnostics",
    description:
      "Advanced machine learning models that analyze patient data to predict potential health conditions before symptoms appear.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Continuous AI-powered monitoring systems that track vital signs and alert healthcare providers to anomalies instantly.",
  },
  {
    icon: Shield,
    title: "Patient Safety",
    description:
      "AI-driven solutions for safer care and better patient outcomes.",
  },
  {
    icon: ChartColumn,
    title: "Outcome Optimization",
    description:
      "Deep analytics platform that tracks treatment efficacy and helps optimize patient care pathways for better outcomes.",
  },
];

export function Solutions() {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="solutions-heading" className="mb-4">
            AI-Powered{" "}
            <span className="text-cyan-700">Healthcare Solutions</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our suite of predictive tools empowers healthcare providers to make
            data-driven decisions and deliver proactive patient care.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-cyan-600" aria-hidden="true" />
                </div>
                <h3 className="mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
