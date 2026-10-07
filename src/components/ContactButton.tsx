import { mailto } from "@/lib/site";

type ContactButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

// Ember is reserved for this button. Its label stays 20px bold: #F0F0F0 on
// #D94020 is ~3.9:1, which passes WCAG AA only as large text (>= 3:1).
export function ContactButton({
  className = "",
  children = "Get in touch",
}: ContactButtonProps) {
  return (
    <a
      href={mailto}
      className={`inline-flex items-center rounded-full bg-ember px-8 py-3.5 font-display text-xl font-bold text-ink transition-colors hover:bg-ember-deep ${className}`}
    >
      {children}
    </a>
  );
}
