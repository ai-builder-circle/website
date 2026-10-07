import { Section } from "@/components/Section";

export function About() {
  return (
    <Section id="about" label="What FORGE is">
      <p className="mt-10 max-w-4xl text-pretty font-display text-3xl font-medium leading-[1.2] tracking-tight text-muted sm:text-5xl">
        FORGE is a small group of young builders who commit to finishing real
        things, and hold each other to it.{" "}
        <span className="text-ink">
          Entry is by proof of work, not by signing up.
        </span>{" "}
        We&rsquo;re small on purpose.
      </p>
    </Section>
  );
}
