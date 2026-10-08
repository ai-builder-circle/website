import { Section } from "@/components/Section";

const items = [
  {
    title: "Weekly commitments.",
    body: "Every member commits to one thing a week and shows it the next.",
  },
  {
    title: "Electives.",
    body: "Deep tracks in Data Engineering, Cloud and System Integration.",
  },
  {
    title: "Community sessions.",
    body: "We run hands-on sessions for other communities, like DevFest.",
  },
];

export function Builders() {
  return (
    <Section id="builders" label="What our builders do">
      <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.title} className="flex flex-col bg-canvas p-8 sm:p-10">
            <span
              aria-hidden
              className="font-display text-sm font-medium tracking-[0.2em] text-silver/70"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
