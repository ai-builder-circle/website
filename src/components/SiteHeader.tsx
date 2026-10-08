import Image from "next/image";
import { mailto } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 sm:px-10">
        <a href="#top" className="py-2">
          <Image
            src="/brand/forge-wordmark-silver.png"
            alt="FORGE"
            width={1358}
            height={163}
            unoptimized
            className="h-3.5 w-auto"
          />
        </a>
        {/* Ember outline, not fill: small ember-filled text can't reach 4.5:1. */}
        <a
          href={mailto}
          className="rounded-full border border-ember px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-ember"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
