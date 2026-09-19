import { Activity, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              <span className="text-white">
                OpAI<span className="text-cyan-400">x</span>
              </span>
            </div>
            <p className="text-sm mb-4">
              Powering the future of healthcare through advanced AI-powered
              predictive analytics. Based in Pittsburgh, serving healthcare
              providers nationwide.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Pittsburgh, Pennsylvania, USA</span>
            </div>
          </div>

          <div>
            <h3 className="text-white mb-4 text-xl font-semibold leading-[1.4]">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <a
                  href="mailto:contact@opaixllc.com"
                  className="hover:text-cyan-400 transition-colors"
                >
                  contact@opaixllc.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <a
                  href="tel:+14129534374"
                  className="hover:text-cyan-400 transition-colors"
                >
                  +1 (412) 953-4374
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-sm text-center">
          <p>© 2025 OpAIxLLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
