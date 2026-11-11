import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Portfolio } from "@/components/Portfolio";
import { Founder } from "@/components/Founder";
import { Agency } from "@/components/Agency";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Marquee />
      <Portfolio />
      <Founder />
      <Agency />
      <Services />
      <Process />
      <Contact />
    </main>
  );
}
