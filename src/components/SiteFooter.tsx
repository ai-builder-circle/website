import Image from "next/image";
import { site } from "@/lib/site";

const links = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: site.github },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4">
          <Image
            src="/brand/forge-wordmark-silver.png"
            alt="FORGE"
            width={1358}
            height={163}
            unoptimized
            className="h-5 w-auto self-start"
          />
          <p className="text-sm text-muted">
            {site.tagline} · {site.location}
          </p>
        </div>
        <nav aria-label="FORGE elsewhere">
          <ul className="flex gap-6 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  rel="noopener"
                  className="text-silver underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
