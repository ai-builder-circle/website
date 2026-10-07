import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children?: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-line px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id={`${id}-title`}
          className="font-display text-3xl font-semibold tracking-tight text-silver sm:text-4xl"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
