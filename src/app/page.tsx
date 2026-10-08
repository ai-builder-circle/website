import { About } from "@/components/About";
import { Builders } from "@/components/Builders";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <About />
        <Proof />
        <Builders />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
