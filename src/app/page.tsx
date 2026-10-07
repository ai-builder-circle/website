import Image from "next/image";
import { Section } from "@/components/Section";
import { mailto, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero — copy and reveal animation land in Phase 2 */}
        <section className="flex min-h-svh flex-col items-center justify-center gap-10 px-6 text-center">
          <h1>
            <Image
              src="/brand/forge-lockup-silver.png"
              alt="FORGE — a community of builders"
              width={1358}
              height={275}
              priority
              className="h-auto w-[min(80vw,40rem)]"
            />
          </h1>
          <a
            href={mailto}
            className="rounded-full bg-ember px-7 py-3 font-display text-lg font-semibold text-ink transition-colors hover:bg-[#c23818]"
          >
            Get in touch
          </a>
        </section>

        <Section id="about" title="What FORGE is" />
        <Section id="proof" title="Build Your Way In — GDG DevFest Pretoria 2026" />
        <Section id="builders" title="What our builders do" />
        <Section id="contact" title="Work with us" />
      </main>

      <footer className="border-t border-line px-6 py-12 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/brand/forge-wordmark-silver.png"
            alt="FORGE"
            width={1358}
            height={163}
            className="h-5 w-auto"
          />
          <p className="text-sm text-muted">
            {site.tagline} · {site.location}
          </p>
        </div>
      </footer>
    </>
  );
}
