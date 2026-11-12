import { LandingHero } from "@/components/landing/LandingHero";
import { DemoProof, Benefits, Works, Mentor, FinalCta } from "@/components/landing/Sections";

export default function Home() {
  return (
    <main id="conteudo">
      <LandingHero />
      <DemoProof />
      <Benefits />
      <Works />
      <Mentor />
      <FinalCta />
    </main>
  );
}
