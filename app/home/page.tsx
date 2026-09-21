import { Approach } from "@/components/v2/Approach";
import { Contact } from "@/components/v2/Contact";
import { Evidence } from "@/components/v2/Evidence";
import { Hero } from "@/components/v2/Hero";
import { Research } from "@/components/v2/Research";
import { Security } from "@/components/v2/Security";
import { Story } from "@/components/v2/Story";
import { Team } from "@/components/v2/Team";

export default function HomeV2Page() {
  return (
    <main id="content">
      <Hero />
      <Approach />
      <Evidence />
      <Story />
      <Research />
      <Team />
      <Security />
      <Contact />
    </main>
  );
}
