import Image from "next/image";
import { Section } from "@/components/Section";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
};

// Real DevFest photos (desaturated at build time) with a dark gradient so
// they sit into the canvas rather than glare off it.
function Photo({ src, alt, sizes, className = "", position }: PhotoProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-surface ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-canvas/10 to-transparent"
      />
    </div>
  );
}

export function Proof() {
  return (
    <Section id="proof" label="Proof">
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Build Your Way In
            <span className="mt-2 block text-xl font-medium tracking-normal text-silver sm:text-2xl">
              GDG DevFest Pretoria 2026
            </span>
          </h3>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            We ran the career and entrepreneurship session at DevFest
            Pretoria: 110 minutes, a room of developers, and everyone building
            something real before they left.
          </p>
        </div>

        <figure className="self-end border-l border-silver/40 pl-6 sm:pl-8">
          <blockquote className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
            <p>
              &ldquo;Feedback received from the community is that they enjoyed
              the FORGE Build session.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-5 text-sm text-muted">
            <span className="text-silver">Tash</span>, Community Manager, GDG
            Pretoria
          </figcaption>
        </figure>
      </div>

      <div className="mt-14 grid gap-3 sm:mt-20 sm:grid-cols-5 sm:grid-rows-2 sm:gap-4">
        <Photo
          src="/photos/devfest-room.jpg"
          alt="The FORGE session at DevFest Pretoria: a FORGE member presents while rows of developers code on laptops, with a 25-minute “Build it” timer on the big screen."
          sizes="(min-width: 1080px) 420px, (min-width: 640px) 40vw, 100vw"
          className="aspect-[4/5] sm:col-span-2 sm:row-span-2 sm:aspect-auto"
          position="50% 40%"
        />
        <Photo
          src="/photos/devfest-crew.jpg"
          alt="FORGE members at the front of the DevFest Pretoria hall, one speaking into a microphone while the others stand by."
          sizes="(min-width: 1080px) 620px, (min-width: 640px) 60vw, 100vw"
          className="aspect-[3/2] sm:col-span-3"
          position="50% 35%"
        />
        <Photo
          src="/photos/devfest-podium.jpg"
          alt="A FORGE member at the podium beside the GDG DevFest Pretoria banner."
          sizes="(min-width: 1080px) 620px, (min-width: 640px) 60vw, 100vw"
          className="aspect-[3/2] sm:col-span-3"
          position="50% 32%"
        />
      </div>
    </Section>
  );
}
