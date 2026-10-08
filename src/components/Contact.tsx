import { ContactButton } from "@/components/ContactButton";
import { Section } from "@/components/Section";
import { mailto, site } from "@/lib/site";

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <p className="mt-10 max-w-3xl text-balance font-display text-3xl font-medium leading-[1.2] tracking-tight text-ink sm:text-5xl">
        Running an event, hiring builders, or want to work with us?
      </p>
      {/* The address is too long for a 20px-bold pill on a phone (and the
          label must stay large for contrast), so the button says "Email us"
          and the address sits beneath it, readable and copyable. */}
      <div className="mt-10 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-6">
        <ContactButton>Email us</ContactButton>
        <a
          href={mailto}
          className="break-all text-silver underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          {site.email}
        </a>
      </div>
    </Section>
  );
}
