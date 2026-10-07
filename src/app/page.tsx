import Image from "next/image";
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Proof />
        <Section id="builders" label="What our builders do" />
        <Section id="contact" label="Contact" />
      </main>

      <footer className="border-t border-line px-6 py-12 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/brand/forge-wordmark-silver.png"
            alt="FORGE"
            width={1358}
            height={163}
            unoptimized
            className="h-5 w-auto self-start"
          />
          <p className="text-sm text-muted">
            {site.tagline} · {site.location}
          </p>
        </div>
      </footer>
    </>
  );
}
