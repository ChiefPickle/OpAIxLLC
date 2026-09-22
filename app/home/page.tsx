import { Approach } from "@/components/v2/Approach";
import { Background } from "@/components/v2/Background";
import { Contact } from "@/components/v2/Contact";
import { Evidence } from "@/components/v2/Evidence";
import { PlaceBand } from "@/components/v2/Figure";
import { Hero } from "@/components/v2/Hero";
import { Research } from "@/components/v2/Research";
import { Security } from "@/components/v2/Security";
import { Story } from "@/components/v2/Story";
import { Team } from "@/components/v2/Team";

export default function HomeV2Page() {
  return (
    <main id="content">
      <Hero />
      <Background />
      <Approach />
      <Evidence />
      <PlaceBand />
      <Story />
      <Research />
      <Team />
      <Security />
      <Contact />
    </main>
  );
}
