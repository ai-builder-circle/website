import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  label: string;
  children?: ReactNode;
};

// Content sections share one rhythm: a small engineered label, then the
// content carries the big type.
export function Section({ id, label, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className="border-t border-line px-6 py-24 sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id={`${id}-label`}
          className="flex items-center gap-4 font-display text-sm font-medium uppercase tracking-[0.25em] text-silver"
        >
          <span aria-hidden className="h-px w-8 bg-silver/60" />
          {label}
        </h2>
        {children}
      </div>
    </section>
  );
}
