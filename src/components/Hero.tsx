import Image from "next/image";
import { ContactButton } from "@/components/ContactButton";

// The page's one motion moment: the wordmark wipes in like a bar coming off
// the anvil, then the CTA rises in. The statement is deliberately static: it
// is the largest element on phones (the LCP), and hiding it behind a fade
// pushed LCP to ~3s. `motion-safe:` gives reduced-motion users a static hero.
export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,#181818,transparent)]"
      />

      <div className="relative flex flex-col items-center">
        <h1 className="motion-safe:animate-forge-wipe">
          <Image
            src="/brand/forge-wordmark-silver.png"
            alt="FORGE"
            width={1358}
            height={163}
            preload
            unoptimized
            className="h-auto w-[min(84vw,44rem)]"
          />
        </h1>

        <p className="mt-10 max-w-xl text-balance text-lg leading-relaxed text-muted sm:mt-12 sm:text-xl">
          <span className="block text-ink">
            A community of builders in Johannesburg.
          </span>{" "}
          Invite-only. You get in by what you&rsquo;ve built.
        </p>

        <ContactButton className="mt-10 motion-safe:animate-forge-rise motion-safe:[animation-delay:600ms] sm:mt-12" />
      </div>
    </section>
  );
}
