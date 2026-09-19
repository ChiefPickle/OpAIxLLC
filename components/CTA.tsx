import { Clock, Shield, Users } from "lucide-react";

const badges = [
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: Clock, label: "24/7 On-Duty" },
  { icon: Users, label: "Expert Support" },
];

export function CTA() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="py-20 bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 id="cta-heading" className="mb-4">
            Ready to Transform Patient Care?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Join leading healthcare providers who trust OpAIx to improve patient
            outcomes through intelligent predictive analytics.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="mailto:contact@opaixllc.com"
              className="px-8 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-white rounded-lg transition-colors cursor-pointer"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mt-16 text-center max-w-none">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                </div>
                <div className="text-sm text-gray-400">{badge.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
