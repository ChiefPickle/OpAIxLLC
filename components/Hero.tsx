import { HeroWave } from "@/components/HeroWave";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen overflow-hidden bg-slate-900"
    >
      <HeroWave>
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full" aria-hidden="true" />
              <span className="text-sm">Innovating in Leading Medicine AI</span>
            </div>
            <h1 id="hero-heading" className="mb-6 text-white">
              Predicting Health,
              <br />
              <span className="text-cyan-400">Saving Lives</span>
            </h1>
            <p className="text-gray-300 mb-8 max-w-2xl">
              We harness the power of artificial intelligence to transform
              healthcare outcomes. Our predictive models help physicians identify
              risks earlier and deliver more personalized care.
            </p>
          </div>
        </div>
      </HeroWave>
    </section>
  );
}
