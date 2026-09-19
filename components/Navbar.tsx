import { Activity } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3" aria-label="OpAIx home">
          <Activity className="w-12 h-12 text-cyan-400" aria-hidden="true" />
          <span className="text-white text-3xl">
            OpAI<span className="text-cyan-400">x</span>
          </span>
        </a>
      </div>
    </header>
  );
}
