import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = `${site.name} — ${site.tagline}`;
const description =
  "A community of builders in Johannesburg. Invite-only. You get in by what you've built.";

// Link preview for LinkedIn/WhatsApp. Declared explicitly (not via the
// opengraph-image file convention) because Turbopack ignores .alt.txt files.
// Generated, with the icons in this folder, by scripts/brand-assets.mts.
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "FORGE — a community of builders",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    locale: "en_ZA",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas font-sans text-ink">
        {children}
        {/* Vercel Web Analytics: cookie-free page views. Only in builds on
            Vercel (VERCEL=1), where /_vercel/insights exists; local and CI
            builds would otherwise request a script that 404s. */}
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
