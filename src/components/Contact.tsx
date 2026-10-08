import { ContactButton } from "@/components/ContactButton";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <p className="mt-10 max-w-3xl text-balance font-display text-3xl font-medium leading-[1.2] tracking-tight text-ink sm:text-5xl">
        Running an event, hiring builders, or want to work with us?
      </p>
      <ContactButton className="mt-10 max-w-full break-all sm:mt-12">
        {site.email}
      </ContactButton>
    </Section>
  );
}
