import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Solutions } from "@/components/Solutions";
import { Team } from "@/components/Team";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <About />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
